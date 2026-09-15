import { Card } from "../core/Card";

const PROBLEMS = [
  {
    eyebrow: "Signups",
    title: "They live in your inbox",
    body: "Names in email, money in three apps, shares in a spreadsheet you're afraid to sort.",
  },
  {
    eyebrow: "Planting",
    title: "Every bed is a guess",
    body: "You seed for the share count you hope for, then eat the gap in either direction.",
  },
  {
    eyebrow: "Payments",
    title: "Somebody has to chase",
    body: "Half-paid shares, missed renewals, and a reminder you rewrite from scratch every week.",
  },
];

export function ProblemSection() {
  return (
    <section className="landing-shell landing-section" aria-labelledby="problem-heading">
      <h2 id="problem-heading" style={{ fontSize: "var(--text-fluid-section)", maxWidth: "24ch" }}>
        The season doesn&rsquo;t wait for your admin to catch up.
      </h2>
      <div className="landing-cards-3" style={{ marginTop: "var(--space-7)" }}>
        {PROBLEMS.map((p) => (
          <Card key={p.eyebrow} interactive style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            <span
              style={{
                fontFamily: "var(--type-data-family)",
                fontSize: "var(--text-2xs)",
                letterSpacing: "var(--tracking-stamp)",
                textTransform: "uppercase",
                color: "var(--clay-600)",
              }}
            >
              {p.eyebrow}
            </span>
            <h3 style={{ fontSize: "var(--text-lg)" }}>{p.title}</h3>
            <p style={{ margin: 0, color: "var(--text-muted)" }}>{p.body}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
