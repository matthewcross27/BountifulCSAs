import * as React from "react";

export interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  title?: string;
  tone?: "good" | "warn" | "bad" | "info";
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

const TONES: Record<NonNullable<CalloutProps["tone"]>, [string, string, string]> = {
  good: ["var(--status-good-bg)", "var(--leaf-700)", "var(--leaf-300)"],
  warn: ["var(--status-warn-bg)", "var(--sun-600)", "var(--sun-300)"],
  bad: ["var(--status-bad-bg)", "var(--berry-600)", "var(--berry-500)"],
  info: ["var(--status-info-bg)", "var(--sky-600)", "var(--sky-500)"],
};

export function Callout({ children, title, tone = "info", icon, action, style, ...rest }: CalloutProps) {
  const [bg, fg, edge] = TONES[tone] || TONES.info;
  return (
    <div
      style={{
        display: "flex", alignItems: "flex-start", gap: "var(--space-3)",
        background: bg, border: "1.5px solid " + edge, borderRadius: "var(--radius-md)",
        padding: "var(--space-4) var(--space-5)", color: "var(--text-body)", ...style,
      }}
      {...rest}
    >
      {icon ? <span style={{ color: fg, display: "flex", flex: "none", marginTop: 1 }}>{icon}</span> : null}
      <div style={{ flex: 1, minWidth: 0 }}>
        {title ? (
          <div style={{ fontFamily: "var(--type-heading-family)", fontWeight: "var(--weight-bold)", fontSize: "var(--text-base)", color: "var(--text-strong)", marginBottom: 2 }}>{title}</div>
        ) : null}
        <div style={{ fontSize: "var(--text-sm)", lineHeight: "var(--leading-normal)" }}>{children}</div>
      </div>
      {action ? <div style={{ flex: "none" }}>{action}</div> : null}
    </div>
  );
}
