import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import type Stripe from "stripe";
import { db } from "@/lib/db/client";
import { farms, paymentEvents } from "@/lib/db/schema";
import { stripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";

async function farmIdForAccount(stripeAccountId: string | null | undefined) {
  if (!stripeAccountId) return null;
  const farm = await db.select().from(farms).where(eq(farms.stripeConnectedAccountId, stripeAccountId)).get();
  return farm?.id ?? null;
}

// Mirrors the Stripe events the farmer dashboard needs into PaymentEvent, so the
// payments view reads from Postgres[-shaped local SQLite] instead of calling Stripe
// live on every page load (report Section 3).
async function recordEvent(event: Stripe.Event, farmId: string | null, opts: {
  objectId?: string | null;
  amountCents?: number | null;
  applicationFeeCents?: number | null;
  currency?: string | null;
  status?: string | null;
}) {
  await db
    .insert(paymentEvents)
    .values({
      id: `pe_${event.id}`,
      farmId,
      type: event.type,
      stripeEventId: event.id,
      stripeObjectId: opts.objectId ?? null,
      amountCents: opts.amountCents ?? null,
      applicationFeeCents: opts.applicationFeeCents ?? null,
      currency: opts.currency ?? null,
      status: opts.status ?? null,
      occurredAt: new Date(event.created * 1000).toISOString(),
      raw: event.data.object as unknown as Record<string, unknown>,
      createdAt: new Date().toISOString(),
    })
    .onConflictDoNothing({ target: paymentEvents.stripeEventId });
}

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json({ error: "STRIPE_WEBHOOK_SECRET is not set" }, { status: 500 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown error";
    return NextResponse.json({ error: `Invalid signature: ${message}` }, { status: 400 });
  }

  switch (event.type) {
    case "charge.succeeded":
    case "charge.failed": {
      const charge = event.data.object as Stripe.Charge;
      const farmId = await farmIdForAccount(
        typeof charge.transfer_data?.destination === "string" ? charge.transfer_data.destination : null,
      );
      await recordEvent(event, farmId, {
        objectId: charge.id,
        amountCents: charge.amount,
        applicationFeeCents: charge.application_fee_amount,
        currency: charge.currency,
        status: charge.status,
      });
      break;
    }
    case "charge.refunded": {
      const charge = event.data.object as Stripe.Charge;
      const farmId = await farmIdForAccount(
        typeof charge.transfer_data?.destination === "string" ? charge.transfer_data.destination : null,
      );
      await recordEvent(event, farmId, {
        objectId: charge.id,
        amountCents: charge.amount_refunded,
        applicationFeeCents: charge.application_fee_amount,
        currency: charge.currency,
        status: "refunded",
      });
      break;
    }
    case "payout.paid":
    case "payout.failed": {
      const payout = event.data.object as Stripe.Payout;
      const farmId = await farmIdForAccount(event.account);
      await recordEvent(event, farmId, {
        objectId: payout.id,
        amountCents: payout.amount,
        currency: payout.currency,
        status: payout.status,
      });
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
