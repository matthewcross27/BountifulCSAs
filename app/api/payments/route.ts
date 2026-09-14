import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { farms, paymentEvents } from "@/lib/db/schema";
import { DEMO_FARM_ID } from "@/lib/farm";

// Farmer-facing payments view data source. Reads only from the local PaymentEvent
// mirror (webhook-populated) and the Farm's cached onboarding flags - no live Stripe
// API calls on page load (task requirement #6).
export async function GET() {
  const farm = await db.select().from(farms).where(eq(farms.id, DEMO_FARM_ID)).get();
  const events = await db
    .select()
    .from(paymentEvents)
    .where(eq(paymentEvents.farmId, DEMO_FARM_ID))
    .orderBy(desc(paymentEvents.occurredAt))
    .limit(50);

  return NextResponse.json({
    farm: farm
      ? {
          connected: Boolean(farm.stripeConnectedAccountId),
          transfersActive: farm.transfersCapabilityStatus === "active",
          transfersCapabilityStatus: farm.transfersCapabilityStatus,
        }
      : null,
    events,
  });
}
