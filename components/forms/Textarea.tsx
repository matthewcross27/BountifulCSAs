"use client";

import * as React from "react";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  invalid?: boolean;
}

/** Multi-line sibling of Input - same border, radius, and focus ring. */
export function Textarea({
  value, onChange, placeholder, rows = 3, invalid = false, disabled = false, style, ...rest
}: TextareaProps) {
  const [focus, setFocus] = React.useState(false);

  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      style={{
        width: "100%",
        padding: "var(--space-3)",
        background: disabled ? "var(--surface-sunken)" : "var(--paper-000)",
        border: "1.5px solid " + (invalid ? "var(--berry-500)" : focus ? "var(--leaf-600)" : "var(--border-default)"),
        borderRadius: "var(--radius-md)",
        boxShadow: focus ? "var(--ring-focus)" : "none",
        opacity: disabled ? 0.45 : 1,
        fontFamily: "var(--type-body-family)",
        fontSize: "var(--text-base)",
        lineHeight: "var(--leading-normal)",
        color: "var(--text-strong)",
        outline: "none",
        resize: "vertical",
        transition: "border-color var(--dur-fast) var(--ease-settle), box-shadow var(--dur-fast) var(--ease-settle)",
        ...style,
      }}
      {...rest}
    />
  );
}
