import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

async function main() {
  // Imported dynamically, after loadEnvConfig runs: static imports are hoisted
  // above this call, which would read process.env before .env.local is loaded.
  const { eq } = await import("drizzle-orm");
  const { db } = await import("../lib/db/client");
  const { farms, boxTypes } = await import("../lib/db/schema");
  const { stripe } = await import("../lib/stripe");
  const { DEMO_FARM_ID } = await import("../lib/farm");

  const now = new Date().toISOString();

  const existingFarm = await db.select().from(farms).where(eq(farms.id, DEMO_FARM_ID)).get();
  if (!existingFarm) {
    await db.insert(farms).values({
      id: DEMO_FARM_ID,
      name: "Ridgefoot Farm",
      contactEmail: "jamie@ridgefootfarm.example",
      createdAt: now,
    });
    console.log(`Seeded farm ${DEMO_FARM_ID}`);
  } else {
    console.log(`Farm ${DEMO_FARM_ID} already exists`);
  }

  const demoBoxTypes: { id: string; name: string; priceCents: number; billingFrequency: "week" | "month" }[] = [
    { id: "box_small", name: "Small Share", priceCents: 2850, billingFrequency: "week" },
    { id: "box_large", name: "Large Share", priceCents: 4200, billingFrequency: "week" },
  ];

  for (const bt of demoBoxTypes) {
    const existing = await db.select().from(boxTypes).where(eq(boxTypes.id, bt.id)).get();
    if (existing) {
      console.log(`Box type ${bt.id} already exists`);
      continue;
    }

    const product = await stripe.products.create({
      name: `${bt.name} (Ridgefoot Farm)`,
      metadata: { farmId: DEMO_FARM_ID, boxTypeId: bt.id },
    });
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: bt.priceCents,
      currency: "usd",
      recurring: { interval: bt.billingFrequency === "week" ? "week" : "month" },
    });

    await db.insert(boxTypes).values({
      id: bt.id,
      farmId: DEMO_FARM_ID,
      name: bt.name,
      priceCents: bt.priceCents,
      billingFrequency: bt.billingFrequency,
      stripeProductId: product.id,
      stripePriceId: price.id,
      createdAt: now,
    });
    console.log(`Seeded box type ${bt.id} -> Stripe price ${price.id}`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
