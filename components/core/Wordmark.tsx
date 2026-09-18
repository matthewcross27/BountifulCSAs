import type { CSSProperties } from "react";

export interface WordmarkProps {
  /** Overrides the inherited type size; the mark otherwise scales with context. */
  fontSize?: string;
  style?: CSSProperties;
}

/**
 * The product's mark: "Bountiful CSAs", with the sun rule under "Bountiful".
 * Shared by the dashboard shell and the public landing header so the two cannot
 * drift - change it here, and both move together.
 */
export function Wordmark({ fontSize = "var(--text-lg)", style }: WordmarkProps) {
  return (
    <span
      style={{
        fontFamily: "var(--type-display-family)",
        fontWeight: "var(--weight-display)",
        letterSpacing: "var(--tracking-display)",
        fontSize,
        ...style,
      }}
    >
      <span style={{ borderBottom: "3px solid var(--sun-500)", paddingBottom: 2 }}>Bountiful</span> CSAs
    </span>
  );
}
