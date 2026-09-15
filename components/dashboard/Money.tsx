"use client";

import * as React from "react";
import { CreditCard } from "lucide-react";
import { Card } from "../core/Card";
import { Button } from "../core/Button";
import { Badge } from "../core/Badge";
import type { BadgeProps } from "../core/Badge";
import { Stat } from "../core/Stat";
import { Callout } from "../core/Callout";
import { Switch } from "../forms/Switch";

const ROWS: [string, string, string, [NonNullable<BadgeProps["tone"]>, string]][] = [
  ["Dana Whitfield", "Full share · paid in full", "$740.00", ["good", "Cleared"]],
  ["Nour Haddad", "Payment plan · 3 of 6", "$123.33", ["warn", "Due Jul 20"]],
  ["The Alvarez household", "Full share · monthly", "$28.50", ["bad", "Declined"]],
  ["Ruthie Kane", "Sliding scale · solidarity tier", "$19.00", ["good", "Cleared"]],
  ["Marcus Pell", "Half share · paid in full", "$494.00", ["good", "Cleared"]],
];

export function Money() {
  const [retryCards, setRetryCards] = React.useState(true);
  const [sendReceipts, setSendReceipts] = React.useState(true);
  const [textMe, setTextMe] = React.useState(false);
  const [retryStatus, setRetryStatus] = React.useState<"idle" | "retrying" | "queued">("idle");
  const [exportStatus, setExportStatus] = React.useState<"idle" | "exporting" | "done">("idle");

  const handleRetryBoth = () => {
    setRetryStatus("retrying");
    setTimeout(() => setRetryStatus("queued"), 900);
  };

  const handleExport = () => {
    setExportStatus("exporting");
    setTimeout(() => setExportStatus("done"), 700);
    setTimeout(() => setExportStatus("idle"), 2500);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      <div>
        <h1 style={{ fontSize: "var(--text-2xl)", margin: 0 }}>Money</h1>
        <p style={{ margin: "6px 0 0", color: "var(--text-muted)", fontSize: "var(--text-md)" }}>
          Season to date, and the two things worth a look.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--space-4)" }}>
        <Card><Stat label="SEASON TO DATE" value="$86,410" tone="good" sub="of $94,000 committed" /></Card>
        <Card><Stat label="THIS WEEK" value="$4,218" sub="148 boxes" /></Card>
        <Card><Stat label="NEEDS A RETRY" value="$57" tone="bad" sub="2 households" /></Card>
        <Card><Stat label="SOLIDARITY FUND" value="$1,240" sub="covers 4 sliding-scale shares" /></Card>
      </div>

      <Callout tone={retryStatus === "queued" ? "good" : "bad"}
        title={retryStatus === "queued" ? "Retry queued for both cards" : "Two cards were declined this week"}
        icon={<CreditCard style={{ width: 18, height: 18 }} />}
        action={
          <Button size="sm" variant="outline" disabled={retryStatus !== "idle"} onClick={handleRetryBoth}>
            {retryStatus === "retrying" ? "Retrying…" : retryStatus === "queued" ? "Retry queued" : "Retry both"}
          </Button>
        }>
        {retryStatus === "queued"
          ? "Bountiful will try again Friday and let you know either way."
          : "Both boxes are still theirs. Bountiful will try again Friday and let you know either way."}
      </Callout>

      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "var(--space-5)", alignItems: "start" }}>
        <Card title="Share payments"
          action={
            <Button size="sm" variant="quiet" disabled={exportStatus !== "idle"} onClick={handleExport}>
              {exportStatus === "exporting" ? "Preparing…" : exportStatus === "done" ? "Exported ✓" : "Export"}
            </Button>
          }
          style={{ padding: 0 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "var(--text-base)" }}>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r[0]}>
                  <td style={{ padding: "var(--space-4) var(--space-6)", borderTop: "1px solid var(--border-hairline)" }}>
                    <div style={{ fontWeight: "var(--weight-semibold)", color: "var(--text-strong)" }}>{r[0]}</div>
                    <div style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>{r[1]}</div>
                  </td>
                  <td style={{ padding: "var(--space-4) 0", borderTop: "1px solid var(--border-hairline)", textAlign: "right", fontFamily: "var(--type-data-family)", color: "var(--text-strong)" }}>{r[2]}</td>
                  <td style={{ padding: "var(--space-4) var(--space-6)", borderTop: "1px solid var(--border-hairline)", textAlign: "right" }}><Badge tone={r[3][0]}>{r[3][1]}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
          <Card eyebrow="SLIDING SCALE" title="Pay what fits" note="4 households on the solidarity tier">
            <p style={{ margin: "0 0 var(--space-4)", fontSize: "var(--text-base)", color: "var(--text-body)" }}>
              Every share costs the farm the same. Members choose a tier; the fund covers the gap.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              {[["Solidarity", "$19.00"], ["True cost", "$28.50"], ["Supporter", "$36.00"]].map(([t, p]) => (
                <div key={t} style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--text-base)" }}>
                  <span style={{ color: "var(--text-body)" }}>{t}</span>
                  <span style={{ fontFamily: "var(--type-data-family)", color: "var(--text-strong)" }}>{p}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card title="Background jobs">
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              <Switch checked={retryCards} onChange={() => setRetryCards(!retryCards)}
                label="Retry declined cards" hint="Once on Friday, once the following Tuesday." />
              <Switch checked={sendReceipts} onChange={() => setSendReceipts(!sendReceipts)}
                label="Send receipts for me" />
              <Switch checked={textMe} onChange={() => setTextMe(!textMe)}
                label="Text me when money lands" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
