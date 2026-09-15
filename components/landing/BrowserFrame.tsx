import type { ReactNode } from "react";

export interface BrowserFrameProps {
  children: ReactNode;
  /** Shown in the chrome bar; omit for the plain grey-dot frame. */
  urlLabel?: string;
  /** Traffic lights in brand color, as on the design's demo frame. */
  colorDots?: boolean;
}

const DOT = { width: 9, height: 9, borderRadius: "var(--radius-pill)", display: "block" } as const;

export function BrowserFrame({ children, urlLabel, colorDots = false }: BrowserFrameProps) {
  const dots = colorDots
    ? ["var(--clay-600)", "var(--sun-500)", "var(--leaf-500)"]
    : ["var(--ink-300)", "var(--ink-300)", "var(--ink-300)"];

  return (
    <div
      style={{
        border: "var(--stroke-bold) solid var(--border-strong)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        background: "var(--surface-card)",
        boxShadow: "var(--shadow-lg)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 7,
          height: 34,
          padding: "0 var(--space-4)",
          background: "var(--surface-kraft)",
          borderBottom: "var(--stroke-bold) solid var(--border-strong)",
        }}
      >
        {dots.map((background, i) => (
          <span key={i} style={{ ...DOT, background }} />
        ))}
        {urlLabel ? (
          <span
            style={{
              marginLeft: "var(--space-2)",
              fontFamily: "var(--type-data-family)",
              fontSize: "var(--text-2xs)",
              color: "var(--text-muted)",
            }}
          >
            {urlLabel}
          </span>
        ) : null}
      </div>
      {children}
    </div>
  );
}
