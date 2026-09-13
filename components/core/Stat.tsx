import * as React from "react";

export interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: React.ReactNode;
  unit?: string;
  sub?: string;
  tone?: "default" | "good" | "bad";
}

export function Stat({ label, value, unit, sub, tone = "default", style, ...rest }: StatProps) {
  const color = tone === "good" ? "var(--leaf-700)" : tone === "bad" ? "var(--berry-600)" : "var(--text-strong)";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, ...style }} {...rest}>
      <span style={{ fontSize: "var(--text-2xs)", fontWeight: "var(--weight-bold)", textTransform: "uppercase", letterSpacing: "var(--tracking-stamp)", color: "var(--text-faint)" }}>{label}</span>
      <span style={{ display: "flex", alignItems: "baseline", gap: 5, fontFamily: "var(--type-data-family)", fontSize: "var(--text-xl)", fontWeight: "var(--weight-medium)", color, lineHeight: 1.1 }}>
        {value}
        {unit ? <span style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>{unit}</span> : null}
      </span>
      {sub ? <span style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>{sub}</span> : null}
    </div>
  );
}
