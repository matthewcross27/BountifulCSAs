import { Wordmark } from "../core/Wordmark";

export function LandingHeader() {
  return (
    <header className="landing-shell landing-header">
      {/* The product's own mark, shared with the dashboard shell so the two cannot drift. */}
      <Wordmark fontSize="var(--text-md)" style={{ color: "var(--text-strong)" }} />
      <nav className="landing-nav" aria-label="Page sections">
        <div className="landing-nav-links">
          <a className="landing-nav-link" href="#practices">Our standard</a>
          <a className="landing-nav-link" href="#how">How it works</a>
          <a className="landing-nav-link" href="#inside">Inside</a>
        </div>
        <a
          href="#join"
          style={{
            display: "inline-flex",
            alignItems: "center",
            minHeight: 44,
            padding: "0 var(--space-5)",
            borderRadius: "var(--radius-md)",
            background: "var(--action-primary)",
            color: "var(--text-on-accent)",
            fontSize: "var(--text-sm)",
            fontWeight: "var(--weight-semibold)",
            lineHeight: 1,
            textDecoration: "none",
            boxShadow: "var(--shadow-md), var(--shadow-inset)",
          }}
        >
          Join the waitlist
        </a>
      </nav>
    </header>
  );
}
