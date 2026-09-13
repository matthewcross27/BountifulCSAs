"use client";

import * as React from "react";

export interface CardProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  children?: React.ReactNode;
  title?: React.ReactNode;
  eyebrow?: string;
  action?: React.ReactNode;
  note?: string;
  variant?: "plain" | "sticker" | "sunken";
  interactive?: boolean;
}

export function Card({
  children, title, eyebrow, action, note, variant = "plain", interactive = false, style, ...rest
}: CardProps) {
  const [hover, setHover] = React.useState(false);
  const sticker = variant === "sticker";
  const sunken = variant === "sunken";

  return (
    <section
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: sunken ? "var(--surface-sunken)" : "var(--surface-card)",
        backgroundImage: sunken ? "var(--pattern-seed)" : undefined,
        backgroundSize: sunken ? "var(--pattern-seed-size)" : undefined,
        border: sticker ? "2px solid var(--border-strong)" : "1px solid var(--border-hairline)",
        borderRadius: sticker ? "var(--radius-md)" : "var(--radius-lg)",
        boxShadow: sticker ? "var(--shadow-sticker)" : (interactive && hover ? "var(--shadow-md)" : "var(--shadow-sm)"),
        transform: interactive && hover && !sticker ? "translateY(-1px)" : "none",
        transition: "box-shadow var(--dur-fast) var(--ease-settle), transform var(--dur-fast) var(--ease-settle)",
        padding: "var(--space-6)",
        cursor: interactive ? "pointer" : "default",
        ...style,
      }}
      {...rest}
    >
      {(eyebrow || title || action) && (
        <header style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "var(--space-4)", marginBottom: "var(--space-4)" }}>
          <div>
            {eyebrow ? (
              <div style={{ fontSize: "var(--text-2xs)", fontWeight: "var(--weight-bold)", textTransform: "uppercase", letterSpacing: "var(--tracking-stamp)", color: "var(--text-faint)", marginBottom: 6 }}>{eyebrow}</div>
            ) : null}
            {title ? (
              <h3 style={{ fontFamily: "var(--type-heading-family)", fontSize: "var(--text-lg)", fontWeight: "var(--weight-bold)", letterSpacing: "var(--tracking-display)", color: "var(--text-strong)", margin: 0 }}>{title}</h3>
            ) : null}
          </div>
          {action}
        </header>
      )}
      {children}
      {note ? (
        <p style={{ fontFamily: "var(--type-note-family)", fontSize: 22, lineHeight: 1.25, color: "var(--clay-600)", margin: "var(--space-4) 0 0" }}>{note}</p>
      ) : null}
    </section>
  );
}
