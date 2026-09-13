"use client";

import * as React from "react";

export interface SelectOption { value: string; label: string }

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<string | SelectOption>;
  placeholder?: string;
  invalid?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Select({
  value, onChange, options = [], placeholder, disabled = false, invalid = false, size = "md", style, ...rest
}: SelectProps) {
  const [focus, setFocus] = React.useState(false);
  const h = size === "sm" ? "var(--control-h-sm)" : size === "lg" ? "var(--control-h-lg)" : "var(--control-h)";
  return (
    <div style={{ position: "relative", ...style }}>
      <select
        value={value} onChange={onChange} disabled={disabled}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={{
          appearance: "none", width: "100%", height: h,
          padding: "0 var(--space-8) 0 var(--space-3)",
          background: disabled ? "var(--surface-sunken)" : "var(--paper-000)",
          border: "1.5px solid " + (invalid ? "var(--berry-500)" : focus ? "var(--leaf-600)" : "var(--border-default)"),
          borderRadius: "var(--radius-md)",
          boxShadow: focus ? "var(--ring-focus)" : "none",
          fontFamily: "var(--type-body-family)", fontSize: "var(--text-base)",
          color: value ? "var(--text-strong)" : "var(--text-faint)",
          opacity: disabled ? 0.45 : 1, outline: "none", cursor: disabled ? "not-allowed" : "pointer",
        }}
        {...rest}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((o) => {
          const opt = typeof o === "string" ? { value: o, label: o } : o;
          return <option key={opt.value} value={opt.value}>{opt.label}</option>;
        })}
      </select>
      <span aria-hidden="true" style={{ position: "absolute", right: "var(--space-3)", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--text-muted)", fontSize: "var(--text-xs)" }}>▾</span>
    </div>
  );
}
