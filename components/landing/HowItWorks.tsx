const STEPS = [
  { title: "Set your shares", body: "Sizes, price, pickup sites, season length. Ten minutes, once." },
  { title: "Open signup", body: "Members join and pay on a page with your farm's name on it. Renewals run themselves." },
  { title: "Plan, pack, send", body: "See what each week needs, build the box, and send one note to everyone getting it." },
];

export function HowItWorks() {
  return (
    <section id="how" className="landing-shell landing-section" aria-labelledby="how-heading">
      <h2 id="how-heading" style={{ fontSize: "var(--text-fluid-section)" }}>
        Three steps to a season you can see
      </h2>
      <div className="landing-cards-3" style={{ marginTop: "var(--space-7)", gap: "var(--space-6)" }}>
        {STEPS.map((step, i) => (
          <div key={step.title} style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
            <span
              aria-hidden="true"
              style={{
                width: 46,
                height: 46,
                border: "var(--stroke-bold) solid var(--border-strong)",
                borderRadius: "var(--radius-pill)",
                background: "var(--leaf-100)",
                boxShadow: "var(--shadow-sticker-leaf)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--type-display-family)",
                fontWeight: "var(--weight-display)",
                fontSize: "var(--text-lg)",
                color: "var(--leaf-900)",
              }}
            >
              {i + 1}
            </span>
            <h3 style={{ fontSize: "var(--text-lg)" }}>{step.title}</h3>
            <p style={{ margin: 0, color: "var(--text-muted)" }}>{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
