import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { farms } from "@/lib/db/schema";
import { stripe } from "@/lib/stripe";
import { DEMO_FARM_ID } from "@/lib/farm";

function appUrl() {
  return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
}

// Stripe redirects here after the farmer finishes (or exits) hosted onboarding. This
// is the source of truth for onboarding status: it fetches the v2 Account directly
// rather than waiting on a webhook, so the dashboard reflects reality immediately.
export async function GET() {
  const farm = await db.select().from(farms).where(eq(farms.id, DEMO_FARM_ID)).get();
  if (farm?.stripeConnectedAccountId) {
    const account = await stripe.v2.core.accounts.retrieve(farm.stripeConnectedAccountId, {
      include: ["configuration.recipient"],
    });
    const status =
      account.configuration?.recipient?.capabilities?.stripe_balance?.stripe_transfers?.status ?? null;
    await db.update(farms).set({ transfersCapabilityStatus: status }).where(eq(farms.id, farm.id));
  }

  return NextResponse.redirect(`${appUrl()}/dashboard?view=payments`);
}
