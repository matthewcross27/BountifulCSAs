import * as React from "react";

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  htmlFor?: string;
  children: React.ReactNode;
}

export function Field({ label, hint, error, required = false, htmlFor, children, style, ...rest }: FieldProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", ...style }} {...rest}>
      {label ? (
        <label htmlFor={htmlFor} style={{ fontSize: "var(--text-sm)", fontWeight: "var(--weight-semibold)", color: "var(--text-strong)" }}>
          {label}
          {required ? <span style={{ color: "var(--clay-600)", marginLeft: 4 }}>·</span> : null}
        </label>
      ) : null}
      {children}
      {error ? (
        <span style={{ fontSize: "var(--text-sm)", color: "var(--berry-600)" }}>{error}</span>
      ) : hint ? (
        <span style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>{hint}</span>
      ) : null}
    </div>
  );
}
