"use client";

import * as React from "react";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "prefix"> {
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  invalid?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Input({
  value, onChange, placeholder, type = "text", prefix, suffix,
  invalid = false, disabled = false, size = "md", style, ...rest
}: InputProps) {
  const [focus, setFocus] = React.useState(false);
  const h = size === "sm" ? "var(--control-h-sm)" : size === "lg" ? "var(--control-h-lg)" : "var(--control-h)";
  const mono = type === "number" || prefix === "$";

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "var(--space-2)",
      height: h, padding: "0 var(--space-3)",
      background: disabled ? "var(--surface-sunken)" : "var(--paper-000)",
      border: "1.5px solid " + (invalid ? "var(--berry-500)" : focus ? "var(--leaf-600)" : "var(--border-default)"),
      borderRadius: "var(--radius-md)",
      boxShadow: focus ? "var(--ring-focus)" : "none",
      opacity: disabled ? 0.45 : 1,
      transition: "border-color var(--dur-fast) var(--ease-settle), box-shadow var(--dur-fast) var(--ease-settle)",
      ...style,
    }}>
      {prefix ? <span style={{ color: "var(--text-muted)", fontFamily: "var(--type-data-family)", fontSize: "var(--text-sm)" }}>{prefix}</span> : null}
      <input
        type={type} value={value} onChange={onChange} placeholder={placeholder} disabled={disabled}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={{
          flex: 1, minWidth: 0, border: "none", outline: "none", background: "transparent",
          fontFamily: mono ? "var(--type-data-family)" : "var(--type-body-family)",
          fontSize: "var(--text-base)", color: "var(--text-strong)",
        }}
        {...rest}
      />
      {suffix ? <span style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)" }}>{suffix}</span> : null}
    </div>
  );
}
