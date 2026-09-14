import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { farms } from "@/lib/db/schema";
import { stripe } from "@/lib/stripe";
import { DEMO_FARM_ID } from "@/lib/farm";

function appUrl() {
  return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
}

// Stripe redirects here when an onboarding link expires mid-flow; we mint a fresh
// link and send the farmer straight back into hosted onboarding.
export async function GET() {
  const farm = await db.select().from(farms).where(eq(farms.id, DEMO_FARM_ID)).get();
  if (!farm?.stripeConnectedAccountId) {
    return NextResponse.redirect(`${appUrl()}/dashboard?payments=error`);
  }

  const accountLink = await stripe.v2.core.accountLinks.create({
    account: farm.stripeConnectedAccountId,
    use_case: {
      type: "account_onboarding",
      account_onboarding: {
        configurations: ["recipient"],
        refresh_url: `${appUrl()}/api/stripe/connect/refresh`,
        return_url: `${appUrl()}/api/stripe/connect/return`,
      },
    },
  });

  return NextResponse.redirect(accountLink.url);
}
