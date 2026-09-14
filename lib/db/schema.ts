import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const farms = sqliteTable("farms", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  contactEmail: text("contact_email").notNull(),
  stripeConnectedAccountId: text("stripe_connected_account_id"),
  // Accounts v2: configuration.recipient.capabilities.stripe_balance.stripe_transfers.status
  // (active/pending/restricted/...). This is the field that determines whether the account
  // can receive destination-charge transfers - the v1 `charges_enabled`/`payouts_enabled`
  // booleans don't apply to recipient-only accounts. See .agents/skills/stripe-best-practices.
  transfersCapabilityStatus: text("transfers_capability_status"),
  createdAt: text("created_at").notNull(),
});

export const boxTypes = sqliteTable("box_types", {
  id: text("id").primaryKey(),
  farmId: text("farm_id").notNull().references(() => farms.id),
  name: text("name").notNull(),
  priceCents: integer("price_cents").notNull(),
  billingFrequency: text("billing_frequency", { enum: ["week", "month"] }).notNull(),
  stripeProductId: text("stripe_product_id"),
  stripePriceId: text("stripe_price_id"),
  createdAt: text("created_at").notNull(),
});

export const buyerSubscriptions = sqliteTable("buyer_subscriptions", {
  id: text("id").primaryKey(),
  farmId: text("farm_id").notNull().references(() => farms.id),
  boxTypeId: text("box_type_id").notNull().references(() => boxTypes.id),
  buyerEmail: text("buyer_email").notNull(),
  stripeCustomerId: text("stripe_customer_id").notNull(),
  stripeSubscriptionId: text("stripe_subscription_id").notNull(),
  status: text("status", { enum: ["active", "paused", "canceled", "past_due"] }).notNull(),
  createdAt: text("created_at").notNull(),
});

export const paymentEvents = sqliteTable("payment_events", {
  id: text("id").primaryKey(),
  farmId: text("farm_id").references(() => farms.id),
  type: text("type").notNull(),
  stripeEventId: text("stripe_event_id").notNull().unique(),
  stripeObjectId: text("stripe_object_id"),
  amountCents: integer("amount_cents"),
  applicationFeeCents: integer("application_fee_cents"),
  currency: text("currency"),
  status: text("status"),
  occurredAt: text("occurred_at").notNull(),
  raw: text("raw", { mode: "json" }),
  createdAt: text("created_at").notNull(),
});
