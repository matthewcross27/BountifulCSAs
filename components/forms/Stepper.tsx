"use client";

import * as React from "react";

export interface StepperProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  unit?: string;
}

interface NudgeProps {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
  disabled?: boolean;
}

function Nudge({ children, onClick, label, disabled }: NudgeProps) {
  const [press, setPress] = React.useState(false);
  return (
    <button type="button" aria-label={label} onClick={onClick} disabled={disabled}
      onMouseDown={() => setPress(true)} onMouseUp={() => setPress(false)} onMouseLeave={() => setPress(false)}
      style={{
        width: 38, height: 38, flex: "none", border: "none", background: "transparent",
        color: disabled ? "var(--text-faint)" : "var(--text-strong)",
        fontSize: "var(--text-lg)", lineHeight: 1, cursor: disabled ? "not-allowed" : "pointer",
        borderRadius: "var(--radius-sm)", transform: press ? "translateY(1px)" : "none",
      }}>{children}</button>
  );
}

export function Stepper({ value = 0, onChange, min = 0, max = 99, unit, style, ...rest }: StepperProps) {
  const set = (v: number) => onChange && onChange(Math.min(max, Math.max(min, v)));
  return (
    <div style={{
      display: "inline-flex", alignItems: "center",
      border: "1.5px solid var(--border-default)", borderRadius: "var(--radius-md)",
      background: "var(--paper-000)", ...style,
    }} {...rest}>
      <Nudge label="One fewer" onClick={() => set(value - 1)} disabled={value <= min}>−</Nudge>
      <span style={{
        minWidth: 54, textAlign: "center", fontFamily: "var(--type-data-family)",
        fontSize: "var(--text-base)", color: "var(--text-strong)",
        borderLeft: "1px solid var(--border-hairline)", borderRight: "1px solid var(--border-hairline)",
        padding: "9px 6px",
      }}>{value}{unit ? <span style={{ color: "var(--text-muted)", fontSize: "var(--text-xs)" }}> {unit}</span> : null}</span>
      <Nudge label="One more" onClick={() => set(value + 1)} disabled={value >= max}>+</Nudge>
    </div>
  );
}
