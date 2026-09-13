import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  tone?: "good" | "warn" | "bad" | "info" | "neutral";
  stamp?: boolean;
}

const TONES: Record<NonNullable<BadgeProps["tone"]>, [string, string]> = {
  good: ["var(--status-good-bg)", "var(--status-good-fg)"],
  warn: ["var(--status-warn-bg)", "var(--status-warn-fg)"],
  bad: ["var(--status-bad-bg)", "var(--status-bad-fg)"],
  info: ["var(--status-info-bg)", "var(--status-info-fg)"],
  neutral: ["var(--surface-sunken)", "var(--text-muted)"],
};

export function Badge({ children, tone = "neutral", stamp = false, style, ...rest }: BadgeProps) {
  const [bg, fg] = TONES[tone] || TONES.neutral;
  return (
    <span
      style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        background: stamp ? "transparent" : bg,
        color: fg,
        border: stamp ? "1.5px solid currentColor" : "1px solid transparent",
        borderRadius: stamp ? "var(--radius-xs)" : "var(--radius-pill)",
        padding: stamp ? "4px 8px" : "3px 10px",
        fontFamily: "var(--type-body-family)",
        fontSize: stamp ? "var(--text-2xs)" : "var(--text-xs)",
        fontWeight: "var(--weight-bold)",
        textTransform: stamp ? "uppercase" : "none",
        letterSpacing: stamp ? "var(--tracking-stamp)" : "var(--tracking-normal)",
        lineHeight: 1.2,
        whiteSpace: "nowrap",
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
