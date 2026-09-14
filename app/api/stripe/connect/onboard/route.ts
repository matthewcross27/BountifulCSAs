import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { farms } from "@/lib/db/schema";
import { stripe } from "@/lib/stripe";
import { DEMO_FARM_ID } from "@/lib/farm";

function appUrl() {
  return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
}

// Accounts v2 (not the legacy `type: "express"` v1 API - see
// .agents/skills/stripe-best-practices/references/connect.md). Marketplace/destination-charge
// shape: dashboard "express" + a Recipient configuration requesting stripe_transfers, with the
// platform owning fees and negative-balance liability (required for Express dashboard).
export async function POST() {
  const farm = await db.select().from(farms).where(eq(farms.id, DEMO_FARM_ID)).get();
  if (!farm) {
    return NextResponse.json({ error: "Farm not found" }, { status: 404 });
  }

  let accountId = farm.stripeConnectedAccountId;
  if (!accountId) {
    const account = await stripe.v2.core.accounts.create({
      display_name: farm.name,
      contact_email: farm.contactEmail,
      dashboard: "express",
      identity: { country: "us" },
      configuration: {
        recipient: {
          capabilities: {
            stripe_balance: { stripe_transfers: { requested: true } },
          },
        },
      },
      defaults: {
        currency: "usd",
        responsibilities: {
          fees_collector: "application",
          losses_collector: "application",
        },
      },
      metadata: { farmId: farm.id },
    });
    accountId = account.id;
    await db.update(farms).set({ stripeConnectedAccountId: accountId }).where(eq(farms.id, farm.id));
  }

  const accountLink = await stripe.v2.core.accountLinks.create({
    account: accountId,
    use_case: {
      type: "account_onboarding",
      account_onboarding: {
        configurations: ["recipient"],
        refresh_url: `${appUrl()}/api/stripe/connect/refresh`,
        return_url: `${appUrl()}/api/stripe/connect/return`,
      },
    },
  });

  return NextResponse.json({ url: accountLink.url });
}
