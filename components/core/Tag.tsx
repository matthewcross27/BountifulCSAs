"use client";

import * as React from "react";

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  crop?: "root" | "green" | "fruit" | "allium" | "herb" | "pantry";
  selected?: boolean;
  onRemove?: (e: React.MouseEvent) => void;
}

const CROP: Record<NonNullable<TagProps["crop"]>, string> = {
  root: "var(--crop-root)", green: "var(--crop-green)", fruit: "var(--crop-fruit)",
  allium: "var(--crop-allium)", herb: "var(--crop-herb)", pantry: "var(--crop-pantry)",
};

export function Tag({ children, crop, selected = false, onRemove, onClick, style, onKeyDown, ...rest }: TagProps) {
  const [hover, setHover] = React.useState(false);
  const interactive = !!onClick;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    onKeyDown?.(e);
    if (interactive && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick?.(e as unknown as React.MouseEvent<HTMLSpanElement>);
    }
  };

  return (
    <span
      onClick={onClick}
      onKeyDown={interactive ? handleKeyDown : onKeyDown}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        background: selected ? "var(--surface-accent)" : (hover && interactive ? "var(--action-quiet-hover)" : "var(--surface-card)"),
        border: "1.5px solid " + (selected ? "var(--border-accent)" : "var(--border-hairline)"),
        borderRadius: "var(--radius-pill)",
        padding: "5px 12px 5px " + (crop ? "9px" : "12px"),
        fontFamily: "var(--type-body-family)",
        fontSize: "var(--text-sm)",
        fontWeight: "var(--weight-medium)",
        color: "var(--text-strong)",
        cursor: interactive ? "pointer" : "default",
        transition: "background var(--dur-fast) var(--ease-settle)",
        ...style,
      }}
      {...rest}
    >
      {crop ? <i style={{ width: 9, height: 9, borderRadius: "50%", background: CROP[crop] || CROP.pantry, flex: "none" }} /> : null}
      {children}
      {onRemove ? (
        <button
          type="button" aria-label="Remove" onClick={(e) => { e.stopPropagation(); onRemove(e); }}
          style={{ border: "none", background: "none", padding: 0, marginLeft: 2, cursor: "pointer", color: "var(--text-faint)", fontSize: "var(--text-base)", lineHeight: 1 }}
        >×</button>
      ) : null}
    </span>
  );
}
