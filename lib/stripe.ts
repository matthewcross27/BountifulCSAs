import Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY;
if (!secretKey) {
  throw new Error("STRIPE_SECRET_KEY is not set");
}
if (!secretKey.startsWith("sk_test_")) {
  throw new Error("STRIPE_SECRET_KEY must be a test-mode key (sk_test_...)");
}

export const stripe = new Stripe(secretKey);

export const TAKE_RATE_PERCENT = 10;
