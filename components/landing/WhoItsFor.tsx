export function WhoItsFor() {
  return (
    <section id="fit" className="landing-shell" aria-labelledby="fit-heading" style={{ paddingBottom: "var(--space-9)" }}>
      <h2 id="fit-heading" style={{ fontSize: "var(--text-fluid-panel)", marginBottom: "var(--space-6)" }}>
        Who it&rsquo;s for
      </h2>
      <div className="landing-pair">
        <div
          style={{
            border: "1px solid var(--border-accent)",
            borderRadius: "var(--radius-lg)",
            background: "var(--surface-accent)",
            boxShadow: "var(--shadow-sm)",
            padding: "var(--space-6)",
            display: "flex",
            flexDirection: "column",
            gap: 7,
          }}
        >
          <h3 style={{ fontSize: "var(--text-md)", color: "var(--leaf-900)" }}>A good fit if</h3>
          <p style={{ margin: 0, color: "var(--text-body)" }}>
            You take the signups yourself, at a scale where every member is still a name you
            know rather than a row in a report.
          </p>
        </div>
        <div
          style={{
            border: "1px solid var(--border-hairline)",
            borderRadius: "var(--radius-lg)",
            background: "var(--surface-card)",
            boxShadow: "var(--shadow-sm)",
            padding: "var(--space-6)",
            display: "flex",
            flexDirection: "column",
            gap: 7,
          }}
        >
          <h3 style={{ fontSize: "var(--text-md)" }}>Not yet if</h3>
          <p style={{ margin: 0, color: "var(--text-muted)" }}>
            You&rsquo;re wholesale-first, multi-farm aggregating, or need a full online farmstand today.
          </p>
        </div>
      </div>
    </section>
  );
}
