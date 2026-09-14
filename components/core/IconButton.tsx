"use client";

import * as React from "react";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  label: string;
  size?: "sm" | "md" | "lg";
  variant?: "quiet" | "outline" | "filled";
  disabled?: boolean;
}

const SIZES: Record<NonNullable<IconButtonProps["size"]>, number> = { sm: 32, md: 40, lg: 44 };

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton({
  children, label, size = "md", variant = "quiet", disabled = false, onClick, style, ...rest
}, ref) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const px = SIZES[size] || SIZES.md;
  const filled = variant === "filled";

  return (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{
        width: px, height: px,
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        borderRadius: "var(--radius-md)",
        border: variant === "outline" ? "1.5px solid var(--border-default)" : "1.5px solid transparent",
        background: filled
          ? (hover ? "var(--action-primary-hover)" : "var(--action-primary)")
          : (hover ? "var(--action-quiet-hover)" : "transparent"),
        color: filled ? "var(--text-on-accent)" : "var(--text-body)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        transform: press ? "translateY(1px)" : "none",
        transition: "background var(--dur-fast) var(--ease-settle), transform var(--dur-fast) var(--ease-settle)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
});
