import { WaitlistForm } from "./WaitlistForm";

export function ClosingCta() {
  return (
    <section
      className="landing-shell"
      aria-labelledby="closing-heading"
      style={{ paddingBottom: "var(--space-9)" }}
    >
      <div
        style={{
          position: "relative",
          border: "var(--stroke-bold) solid var(--border-strong)",
          borderRadius: "var(--radius-xl)",
          overflow: "hidden",
          background: "var(--surface-inverse)",
          boxShadow: "var(--shadow-lg)",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(rgba(156, 190, 132, 0.22) 1px, transparent 1.2px)",
            backgroundSize: "var(--pattern-seed-size)",
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(90% 120% at 12% 0%, rgba(156, 190, 132, 0.22) 0%, rgba(31, 61, 35, 0) 70%)",
            pointerEvents: "none",
          }}
        />
        <div className="landing-cta-grid" style={{ position: "relative", padding: "clamp(1.75rem, 4vw, 3.25rem)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            <h2
              id="closing-heading"
              style={{ fontSize: "clamp(1.75rem, 3.4vw, 2.625rem)", color: "var(--paper-000)", letterSpacing: "-0.03em" }}
            >
              Get in before the first season.
            </h2>
            <p style={{ margin: 0, color: "var(--leaf-100)", fontSize: "var(--text-md)", lineHeight: "var(--leading-relaxed)", maxWidth: "42ch" }}>
              Early farms get setup help, a say in what we build next, and founding pricing when we open.
            </p>
          </div>
          <WaitlistForm idPrefix="closing-waitlist" tone="dark" layout="inline" submitLabel="Join the waitlist" />
        </div>
      </div>
    </section>
  );
}
