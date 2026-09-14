import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { farms, boxTypes, buyerSubscriptions } from "@/lib/db/schema";
import { stripe, TAKE_RATE_PERCENT } from "@/lib/stripe";
import { DEMO_FARM_ID } from "@/lib/farm";

// Test-mode entry point for "a buyer subscribes to a box type" (acceptance criterion
// #2). There is no buyer storefront yet (see AGENTS.md / report Section 6 roadmap) -
// this exists to create a real Stripe Subscription end-to-end for testing, using
// Stripe's documented test PaymentMethod IDs (e.g. pm_card_visa) in place of a real
// card-collection UI. Not linked from the farmer dashboard.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const boxTypeId = body?.boxTypeId as string | undefined;
  const buyerEmail = body?.buyerEmail as string | undefined;
  const testPaymentMethod = (body?.testPaymentMethod as string | undefined) ?? "pm_card_visa";

  if (!boxTypeId || !buyerEmail) {
    return NextResponse.json({ error: "boxTypeId and buyerEmail are required" }, { status: 400 });
  }

  const farm = await db.select().from(farms).where(eq(farms.id, DEMO_FARM_ID)).get();
  if (!farm?.stripeConnectedAccountId) {
    return NextResponse.json({ error: "Farm has not completed Stripe onboarding" }, { status: 409 });
  }

  const boxType = await db.select().from(boxTypes).where(eq(boxTypes.id, boxTypeId)).get();
  if (!boxType?.stripePriceId) {
    return NextResponse.json({ error: "Box type has no Stripe price" }, { status: 404 });
  }

  const customer = await stripe.customers.create({ email: buyerEmail });
  // Attaching a Stripe test-mode PaymentMethod token (e.g. pm_card_visa) mints a new,
  // customer-attached PaymentMethod with its own id - that id is what must be used below,
  // not the original token.
  const attached = await stripe.paymentMethods.attach(testPaymentMethod, { customer: customer.id });
  await stripe.customers.update(customer.id, {
    invoice_settings: { default_payment_method: attached.id },
  });

  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ price: boxType.stripePriceId }],
    application_fee_percent: TAKE_RATE_PERCENT,
    transfer_data: { destination: farm.stripeConnectedAccountId },
    default_payment_method: attached.id,
    payment_behavior: "error_if_incomplete",
    expand: ["latest_invoice.payments"],
  });

  await db.insert(buyerSubscriptions).values({
    id: randomUUID(),
    farmId: farm.id,
    boxTypeId: boxType.id,
    buyerEmail,
    stripeCustomerId: customer.id,
    stripeSubscriptionId: subscription.id,
    status: subscription.status === "active" ? "active" : "past_due",
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json({ subscriptionId: subscription.id, status: subscription.status });
}
