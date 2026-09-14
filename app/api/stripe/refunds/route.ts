import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

// Issues a refund from the platform account against the original destination charge.
// reverse_transfer claws back the farm's share of the charge; refund_application_fee
// invokes Stripe's built-in proportional reversal of the platform's application fee -
// there is no custom fee-clawback logic here (report Section 3 / task requirement #4).
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const chargeId = body?.chargeId as string | undefined;
  const amountCents = body?.amountCents as number | undefined;

  if (!chargeId) {
    return NextResponse.json({ error: "chargeId is required" }, { status: 400 });
  }

  const refund = await stripe.refunds.create({
    charge: chargeId,
    amount: amountCents,
    reverse_transfer: true,
    refund_application_fee: true,
  });

  return NextResponse.json({ refundId: refund.id, status: refund.status });
}
