"use client";

import * as React from "react";
import { Landmark } from "lucide-react";
import { Card } from "../core/Card";
import { Button } from "../core/Button";
import { Badge } from "../core/Badge";
import type { BadgeProps } from "../core/Badge";
import { Stat } from "../core/Stat";
import { Callout } from "../core/Callout";

type PaymentEvent = {
  id: string;
  type: string;
  stripeObjectId: string | null;
  amountCents: number | null;
  applicationFeeCents: number | null;
  currency: string | null;
  status: string | null;
  occurredAt: string;
};

type PaymentsData = {
  farm: {
    connected: boolean;
    transfersActive: boolean;
    transfersCapabilityStatus: string | null;
  } | null;
  events: PaymentEvent[];
};

function formatCents(cents: number | null, currency: string | null) {
  if (cents === null) return "-";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: (currency ?? "usd").toUpperCase(),
  }).format(cents / 100);
}

function eventLabel(type: string): string {
  switch (type) {
    case "charge.succeeded": return "Box payment";
    case "charge.failed": return "Payment failed";
    case "charge.refunded": return "Refund";
    case "payout.paid": return "Payout";
    case "payout.failed": return "Payout failed";
    default: return type;
  }
}

function eventTone(type: string, status: string | null): NonNullable<BadgeProps["tone"]> {
  if (type === "charge.failed" || type === "payout.failed") return "bad";
  if (type === "charge.refunded") return "warn";
  if (status === "paid" || status === "succeeded") return "good";
  return "neutral";
}

export function Payments() {
  const [data, setData] = React.useState<PaymentsData | null>(null);
  const [connecting, setConnecting] = React.useState(false);

  const load = React.useCallback(() => {
    fetch("/api/payments")
      .then((res) => res.json())
      .then(setData)
      .catch(() => setData({ farm: null, events: [] }));
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  const onConnect = async () => {
    setConnecting(true);
    try {
      const res = await fetch("/api/stripe/connect/onboard", { method: "POST" });
      const body = await res.json();
      if (body.url) window.location.href = body.url;
    } finally {
      setConnecting(false);
    }
  };

  const totals = React.useMemo(() => {
    const events = data?.events ?? [];
    const collected = events
      .filter((e) => e.type === "charge.succeeded")
      .reduce((sum, e) => sum + (e.amountCents ?? 0), 0);
    const refunded = events
      .filter((e) => e.type === "charge.refunded")
      .reduce((sum, e) => sum + (e.amountCents ?? 0), 0);
    const lastPayout = events.find((e) => e.type === "payout.paid" || e.type === "payout.failed");
    return { collected, refunded, lastPayout };
  }, [data]);

  const farm = data?.farm;
  const fullyOnboarded = farm?.transfersActive ?? false;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      <div>
        <h1 style={{ fontSize: "var(--text-2xl)", margin: 0 }}>Payments</h1>
        <p style={{ margin: "6px 0 0", color: "var(--text-muted)", fontSize: "var(--text-md)" }}>
          What buyers paid, what Bountiful took, and what lands in your bank.
        </p>
      </div>

      {!farm?.connected ? (
        <Callout tone="warn" title="Connect your bank to get paid"
          icon={<Landmark style={{ width: 18, height: 18 }} />}
          action={<Button size="sm" onClick={onConnect} disabled={connecting}>
            {connecting ? "Redirecting…" : "Connect with Stripe"}
          </Button>}>
          Bountiful uses Stripe to handle your payouts securely. It takes a few minutes and you
          won&apos;t need to log into Stripe again after that.
        </Callout>
      ) : !fullyOnboarded ? (
        <Callout tone="warn" title="Finish setting up your payouts"
          icon={<Landmark style={{ width: 18, height: 18 }} />}
          action={<Button size="sm" onClick={onConnect} disabled={connecting}>
            {connecting ? "Redirecting…" : "Finish setup"}
          </Button>}>
          Stripe still needs a bit more information before money can reach your account.
        </Callout>
      ) : (
        <Callout tone="good" title="You&apos;re set up to get paid"
          icon={<Landmark style={{ width: 18, height: 18 }} />}>
          Bountiful takes 10% of each box charge; the rest transfers to your connected account automatically.
        </Callout>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-4)" }}>
        <Card><Stat label="COLLECTED" value={formatCents(totals.collected, "usd")} tone="good" sub="from mirrored charges" /></Card>
        <Card><Stat label="REFUNDED" value={formatCents(totals.refunded, "usd")} tone={totals.refunded ? "bad" : "default"} /></Card>
        <Card>
          <Stat
            label="LAST PAYOUT"
            value={totals.lastPayout ? formatCents(totals.lastPayout.amountCents, totals.lastPayout.currency) : "-"}
            sub={totals.lastPayout ? new Date(totals.lastPayout.occurredAt).toLocaleDateString() : "None yet"}
          />
        </Card>
      </div>

      <Card title="Recent activity" style={{ padding: 0 }}>
        {!data ? (
          <p style={{ margin: "var(--space-6)", color: "var(--text-muted)" }}>Loading…</p>
        ) : data.events.length === 0 ? (
          <p style={{ margin: "var(--space-6)", color: "var(--text-muted)" }}>
            Nothing yet - charges, refunds, and payouts will show up here as they happen.
          </p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "var(--text-base)" }}>
            <tbody>
              {data.events.map((e) => (
                <tr key={e.id}>
                  <td style={{ padding: "var(--space-4) var(--space-6)", borderTop: "1px solid var(--border-hairline)" }}>
                    <div style={{ fontWeight: "var(--weight-semibold)", color: "var(--text-strong)" }}>{eventLabel(e.type)}</div>
                    <div style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>
                      {new Date(e.occurredAt).toLocaleString()}
                    </div>
                  </td>
                  <td style={{ padding: "var(--space-4) 0", borderTop: "1px solid var(--border-hairline)", textAlign: "right", fontFamily: "var(--type-data-family)", color: "var(--text-strong)" }}>
                    {formatCents(e.amountCents, e.currency)}
                  </td>
                  <td style={{ padding: "var(--space-4) var(--space-6)", borderTop: "1px solid var(--border-hairline)", textAlign: "right" }}>
                    <Badge tone={eventTone(e.type, e.status)}>{e.status ?? eventLabel(e.type)}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
