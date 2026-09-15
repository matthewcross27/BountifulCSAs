export function BountifulMark() {
  return (
    <span style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
      <span
        aria-hidden="true"
        style={{
          width: 26,
          height: 26,
          border: "var(--stroke-bold) solid var(--border-strong)",
          borderRadius: "var(--radius-pill)",
          background: "var(--leaf-100)",
          boxShadow: "2px 2px 0 var(--ink-900)",
          display: "block",
        }}
      />
      <span
        style={{
          fontFamily: "var(--type-display-family)",
          fontWeight: "var(--weight-display)",
          fontSize: "var(--text-md)",
          letterSpacing: "-0.03em",
          color: "var(--text-strong)",
        }}
      >
        Bountiful
      </span>
    </span>
  );
}
