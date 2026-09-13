"use client";

import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "quiet" | "sticker";
  size?: "sm" | "md" | "lg";
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
}

const SIZES: Record<
  NonNullable<ButtonProps["size"]>,
  { height: string; padding: string; fontSize: string; radius: string; gap: string }
> = {
  sm: { height: "var(--control-h-sm)", padding: "0 var(--space-3)", fontSize: "var(--text-sm)", radius: "var(--radius-sm)", gap: "6px" },
  md: { height: "var(--control-h)", padding: "0 var(--space-5)", fontSize: "var(--text-base)", radius: "var(--radius-md)", gap: "8px" },
  lg: { height: "var(--control-h-lg)", padding: "0 var(--space-6)", fontSize: "var(--text-md)", radius: "var(--radius-md)", gap: "10px" },
};

function skin(variant: NonNullable<ButtonProps["variant"]>, hover: boolean): React.CSSProperties {
  switch (variant) {
    case "secondary":
      return { background: hover ? "var(--action-secondary-hover)" : "var(--action-secondary)", color: "var(--text-on-accent)", border: "1.5px solid transparent" };
    case "outline":
      return { background: hover ? "var(--action-quiet-hover)" : "transparent", color: "var(--text-strong)", border: "2px solid var(--border-strong)" };
    case "quiet":
      return { background: hover ? "var(--action-quiet-hover)" : "transparent", color: "var(--text-body)", border: "1.5px solid transparent" };
    case "sticker":
      return { background: hover ? "var(--sun-300)" : "var(--sun-500)", color: "var(--ink-900)", border: "2px solid var(--border-strong)" };
    default:
      return { background: hover ? "var(--action-primary-hover)" : "var(--action-primary)", color: "var(--text-on-accent)", border: "1.5px solid transparent" };
  }
}

export function Button({
  children, variant = "primary", size = "md", iconLeft, iconRight,
  fullWidth = false, disabled = false, type = "button", onClick, style, ...rest
}: ButtonProps) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const s = SIZES[size] || SIZES.md;
  const sticker = variant === "sticker";

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{
        display: fullWidth ? "flex" : "inline-flex",
        width: fullWidth ? "100%" : undefined,
        alignItems: "center",
        justifyContent: "center",
        gap: s.gap,
        height: s.height,
        padding: s.padding,
        borderRadius: s.radius,
        fontFamily: "var(--type-body-family)",
        fontSize: s.fontSize,
        fontWeight: "var(--weight-semibold)",
        lineHeight: 1,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        pointerEvents: disabled ? "none" : undefined,
        boxShadow: sticker ? (press ? "1px 1px 0 var(--ink-900)" : "var(--shadow-sticker)") : "none",
        transform: press ? "translateY(1px)" : "none",
        transition: "background var(--dur-fast) var(--ease-settle), transform var(--dur-fast) var(--ease-settle), box-shadow var(--dur-fast) var(--ease-settle)",
        ...skin(variant, hover && !disabled),
        ...style,
      }}
      {...rest}
    >
      {iconLeft}
      <span>{children}</span>
      {iconRight}
    </button>
  );
}
