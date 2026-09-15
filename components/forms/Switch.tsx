import * as React from "react";

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: React.ReactNode;
  hint?: string;
  disabled?: boolean;
}

export function Switch({ checked = false, onChange, label, hint, disabled = false, style, ...rest }: SwitchProps) {
  return (
    <label style={{
      display: "flex", alignItems: "center", gap: "var(--space-4)", justifyContent: "space-between",
      cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.45 : 1, ...style,
    }}>
      <span>
        <span style={{ display: "block", fontSize: "var(--text-base)", fontWeight: "var(--weight-medium)", color: "var(--text-strong)" }}>{label}</span>
        {hint ? <span style={{ display: "block", fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>{hint}</span> : null}
      </span>
      <input type="checkbox" role="switch" checked={checked} onChange={onChange} disabled={disabled}
        {...rest}
        className="switch-input"
        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }} />
      <span aria-hidden="true" className="switch-track" style={{
        width: 46, height: 26, flex: "none", borderRadius: "var(--radius-pill)",
        background: checked ? "var(--leaf-600)" : "var(--paper-400)",
        border: "1.5px solid " + (checked ? "var(--leaf-700)" : "var(--border-default)"),
        padding: 2, display: "flex", alignItems: "center",
        transition: "background var(--dur-base) var(--ease-settle)",
      }}>
        <span style={{
          width: 18, height: 18, borderRadius: "50%", background: "var(--paper-000)",
          boxShadow: "var(--shadow-sm)",
          transform: checked ? "translateX(20px)" : "translateX(0)",
          transition: "transform var(--dur-base) var(--ease-settle)",
        }} />
      </span>
    </label>
  );
}
