import { Badge } from "../core/Badge";
import { WaitlistForm } from "./WaitlistForm";

export function Hero() {
  return (
    <section
      className="landing-shell"
      aria-labelledby="hero-heading"
      style={{ paddingTop: "var(--space-7)", paddingBottom: "var(--section-y-fluid)" }}
    >
      <div className="landing-hero-grid">
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "var(--space-3)" }}>
            <Badge stamp tone="good">Regenerative farms only</Badge>
            <span style={{ fontFamily: "var(--type-note-family)", fontSize: 19, color: "var(--clay-700)" }}>
              - by design, not by filter
            </span>
          </div>

          <h1
            id="hero-heading"
            style={{
              fontSize: "var(--text-fluid-hero)",
              letterSpacing: "-0.03em",
              lineHeight: "var(--leading-tight)",
              maxWidth: "26ch",
            }}
          >
            Your job is to grow good food and restore the land - not to manage spreadsheets and invoices.
          </h1>

          <p
            style={{
              margin: 0,
              fontSize: "var(--text-fluid-lede)",
              lineHeight: "var(--leading-relaxed)",
              color: "var(--text-body)",
              maxWidth: "52ch",
            }}
          >
            Bountiful runs the business side of your CSA - signups, recurring payments, how much to
            plant, and the weekly note to members - so the admin stops taking the hours the field needs.
          </p>
        </div>

        <div style={{ position: "relative" }}>
          {/* The kraft sheet peeking out behind the card. */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: "18px -10px -18px 14px",
              background: "var(--surface-sunken)",
              border: "var(--stroke) solid var(--border-hairline)",
              borderRadius: "var(--radius-organic)",
              transform: "rotate(0.8deg)",
            }}
          />
          <div
            id="join"
            style={{
              position: "relative",
              background: "var(--surface-card)",
              border: "var(--stroke-bold) solid var(--border-strong)",
              borderRadius: "var(--radius-md)",
              boxShadow: "var(--shadow-sticker), var(--shadow-lg)",
              padding: "var(--space-6)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-4)",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "var(--space-3)" }}>
                <h2 style={{ fontSize: "var(--text-xl)" }}>Join the waitlist</h2>
                <span style={{ fontFamily: "var(--type-data-family)", fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>
                  2026 season
                </span>
              </div>
              <p style={{ margin: 0, fontSize: "var(--text-base)", color: "var(--text-muted)" }}>
                One email when we open to new farms. Nothing else, ever.
              </p>
            </div>

            <WaitlistForm idPrefix="hero-waitlist" submitLabel="Save my spot" />

            <div
              style={{
                borderTop: "var(--rule-twine)",
                paddingTop: "var(--space-3)",
                display: "flex",
                flexWrap: "wrap",
                gap: "var(--space-1) var(--space-5)",
              }}
            >
              <span style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>
                Built for farms running 20-200 shares.
              </span>
              <span style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>
                Setup help and founding pricing for early farms.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
