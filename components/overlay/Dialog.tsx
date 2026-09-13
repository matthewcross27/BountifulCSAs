"use client";

import * as React from "react";

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  eyebrow?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  width?: number;
}

export function Dialog({ open, onClose, title, eyebrow, children, footer, width = 520 }: DialogProps) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" && onClose) onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 50,
        background: "rgba(35, 31, 24, 0.35)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "var(--space-6)",
      }}
    >
      <div
        role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: width,
          background: "var(--surface-card)",
          border: "1px solid var(--border-hairline)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-lg)",
          padding: "var(--space-6)",
        }}
      >
        {eyebrow ? (
          <div style={{ fontSize: "var(--text-2xs)", fontWeight: "var(--weight-bold)", textTransform: "uppercase", letterSpacing: "var(--tracking-stamp)", color: "var(--text-faint)", marginBottom: 6 }}>{eyebrow}</div>
        ) : null}
        {title ? (
          <h2 style={{ fontFamily: "var(--type-heading-family)", fontSize: "var(--text-xl)", fontWeight: "var(--weight-bold)", letterSpacing: "var(--tracking-display)", color: "var(--text-strong)", margin: "0 0 var(--space-3)" }}>{title}</h2>
        ) : null}
        <div style={{ fontSize: "var(--text-base)", color: "var(--text-body)" }}>{children}</div>
        {footer ? (
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "var(--space-3)", marginTop: "var(--space-6)" }}>{footer}</div>
        ) : null}
      </div>
    </div>
  );
}
