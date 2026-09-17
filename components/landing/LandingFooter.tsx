export function LandingFooter() {
  return (
    <footer
      className="landing-shell"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "var(--space-3)",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: "var(--space-5)",
        paddingBottom: "var(--space-8)",
        borderTop: "var(--stroke) solid var(--border-hairline)",
        color: "var(--text-muted)",
        fontSize: "var(--text-sm)",
      }}
    >
      <span>Bountiful - CSA software for regenerative farms</span>
      <a className="landing-footer-link" href="mailto:hello@bountifulcsas.com" style={{ color: "var(--text-muted)" }}>
        hello@bountifulcsas.com
      </a>
    </footer>
  );
}
