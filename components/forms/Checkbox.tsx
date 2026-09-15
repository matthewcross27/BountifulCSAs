"use client";

import * as React from "react";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: React.ReactNode;
  hint?: string;
  disabled?: boolean;
}

export function Checkbox({ checked = false, onChange, label, hint, disabled = false, style, ...rest }: CheckboxProps) {
  const [hover, setHover] = React.useState(false);
  return (
    <label
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: "flex", alignItems: "flex-start", gap: "var(--space-3)",
        cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.45 : 1,
        padding: "var(--space-2)", margin: "calc(var(--space-2) * -1)",
        borderRadius: "var(--radius-sm)",
        background: hover && !disabled ? "var(--action-quiet-hover)" : "transparent",
        transition: "background var(--dur-fast) var(--ease-settle)",
        ...style,
      }}
    >
      <input
        type="checkbox" checked={checked} onChange={onChange} disabled={disabled}
        className="checkbox-input"
        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
        {...rest}
      />
      <span aria-hidden="true" className="checkbox-box" style={{
        width: 22, height: 22, flex: "none", marginTop: 1,
        borderRadius: "var(--radius-xs)",
        border: "2px solid " + (checked ? "var(--leaf-700)" : "var(--border-default)"),
        background: checked ? "var(--leaf-700)" : "var(--paper-000)",
        color: "var(--paper-000)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 13, fontWeight: 700, lineHeight: 1,
        transition: "background var(--dur-fast) var(--ease-settle), border-color var(--dur-fast) var(--ease-settle)",
      }}>{checked ? "✓" : ""}</span>
      <span>
        <span style={{ display: "block", fontSize: "var(--text-base)", color: "var(--text-strong)", fontWeight: "var(--weight-medium)" }}>{label}</span>
        {hint ? <span style={{ display: "block", fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>{hint}</span> : null}
      </span>
    </label>
  );
}
