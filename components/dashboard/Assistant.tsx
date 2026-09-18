"use client";

import * as React from "react";
import { Sprout } from "lucide-react";
import { Button } from "../core/Button";
import { Tag } from "../core/Tag";

const SCRIPT = [
  { from: "bountiful", text: "Morning, Jamie. Want me to set up next season while you're in the field?" },
  { from: "jamie", text: "yeah — same as this year" },
  { from: "bountiful", text: "Done in the background: 160 shares, Tuesday barn and Friday market, sliding scale with the same three tiers. I'll ask your 148 members to renew on Feb 1 and hold their pickup spots." },
  { from: "bountiful", text: "One thing I can't guess: what should a full share cost in 2027?" },
];

const PRICE_DECISIONS = [
  {
    id: "keep",
    label: "Keep $28.50",
    reply: "Got it - I'll keep full shares at $28.50 for 2027, and let your 148 members know when renewal opens Feb 1.",
    summary: "Kept the full-share price at $28.50 for 2027",
  },
  {
    id: "raise",
    label: "Raise to $30",
    reply: "Got it - I'll set full shares to $30 for 2027, and let your 148 members know when renewal opens Feb 1.",
    summary: "Raised the full-share price to $30 for 2027",
  },
  {
    id: "later",
    label: "I'll decide later",
    reply: "No problem - I'll leave the price where it is for now and check back with you before renewal opens Feb 1.",
    summary: "Put off the 2027 full-share pricing decision",
  },
] as const;

export interface AssistantDecision {
  id: string;
  summary: string;
  at: string;
}

export interface AssistantProps {
  onClose: () => void;
  onDecision: (entry: AssistantDecision) => void;
}

export function Assistant({ onClose, onDecision }: AssistantProps) {
  const [step, setStep] = React.useState(3);
  const [decisionId, setDecisionId] = React.useState<string | null>(null);
  const instanceId = React.useId();
  const visible = SCRIPT.slice(0, step + 1);
  const decision = PRICE_DECISIONS.find((d) => d.id === decisionId) ?? null;

  function chooseDecision(choice: (typeof PRICE_DECISIONS)[number]) {
    if (decisionId) return;
    setDecisionId(choice.id);
    onDecision({
      id: `${choice.id}-${instanceId}`,
      summary: choice.summary,
      at: new Date().toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }),
    });
  }

  return (
    <aside className="dashboard-assistant" style={{
      position: "fixed", right: "var(--space-6)", bottom: "var(--space-6)", width: 380, maxWidth: "calc(100vw - var(--space-6) * 2)", zIndex: 40,
      background: "var(--surface-card)", border: "2px solid var(--border-strong)",
      borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-lg)", overflow: "hidden",
      fontFamily: "var(--type-body-family)",
    }}>
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-3)", padding: "var(--space-4) var(--space-5)", background: "var(--surface-inverse)", color: "var(--text-on-dark)" }}>
        <span style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", fontFamily: "var(--type-display-family)", fontWeight: "var(--weight-bold)" }}>
          <Sprout style={{ width: 18, height: 18 }} />
          Ask Bountiful
        </span>
        <button type="button" onClick={onClose} aria-label="Close" style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", fontSize: "var(--text-lg)", lineHeight: 1 }}>×</button>
      </header>

      <div style={{ padding: "var(--space-5)", display: "flex", flexDirection: "column", gap: "var(--space-3)", maxHeight: 320, overflowY: "auto" }}>
        {visible.map((m, i) => (
          <div key={i} style={{
            alignSelf: m.from === "jamie" ? "flex-end" : "flex-start",
            maxWidth: "86%",
            background: m.from === "jamie" ? "var(--leaf-700)" : "var(--surface-sunken)",
            color: m.from === "jamie" ? "var(--text-on-accent)" : "var(--text-body)",
            borderRadius: m.from === "jamie" ? "var(--radius-md) var(--radius-md) var(--radius-xs) var(--radius-md)" : "var(--radius-md) var(--radius-md) var(--radius-md) var(--radius-xs)",
            padding: "var(--space-3) var(--space-4)", fontSize: "var(--text-base)",
          }}>{m.text}</div>
        ))}
        {decision ? (
          <div style={{
            alignSelf: "flex-start", maxWidth: "86%",
            background: "var(--surface-sunken)", color: "var(--text-body)",
            borderRadius: "var(--radius-md) var(--radius-md) var(--radius-md) var(--radius-xs)",
            padding: "var(--space-3) var(--space-4)", fontSize: "var(--text-base)",
          }}>{decision.reply}</div>
        ) : null}
      </div>

      <div style={{ padding: "var(--space-4) var(--space-5)", borderTop: "1px solid var(--border-hairline)", display: "flex", flexWrap: "wrap", gap: "var(--space-2)", alignItems: "center" }}>
        {PRICE_DECISIONS.map((choice) => (
          <Tag
            key={choice.id}
            selected={decisionId === choice.id}
            onClick={decisionId ? undefined : () => chooseDecision(choice)}
          >
            {choice.label}
          </Tag>
        ))}
        <Button size="sm" variant="quiet" onClick={() => setStep(Math.min(SCRIPT.length - 1, step + 1))} style={{ marginLeft: "auto" }}>Type instead</Button>
      </div>
    </aside>
  );
}
