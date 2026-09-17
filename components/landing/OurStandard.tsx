import { Badge } from "../core/Badge";

const CRITERIA = [
  {
    title: "No-spray or certified organic.",
    body: "No synthetic pesticides or herbicides on the ground your members eat from.",
  },
  {
    title: "Soil left better than you found it.",
    body: "Cover cropping, rotation, compost, minimal tillage - regeneration as practice, not a label.",
  },
  {
    title: "Fair to the people and animals on it.",
    body: "Paid labor, humane husbandry, honest claims to your members.",
  },
];

export function OurStandard() {
  return (
    <section id="practices" className="landing-shell landing-section" aria-labelledby="standard-heading">
      <div
        style={{
          position: "relative",
          border: "var(--stroke-bold) solid var(--border-strong)",
          borderRadius: "var(--radius-xl)",
          overflow: "hidden",
          background: "var(--surface-sunken)",
          boxShadow: "var(--shadow-lg)",
        }}
      >
        <div
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, backgroundImage: "var(--pattern-furrow)", pointerEvents: "none" }}
        />
        <div className="landing-standard-grid" style={{ position: "relative", padding: "var(--section-pad-fluid)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            <Badge stamp style={{ alignSelf: "flex-start", color: "var(--clay-700)" }}>Our standard</Badge>
            <h2 id="standard-heading" style={{ fontSize: "var(--text-fluid-panel)", maxWidth: "26ch" }}>
              Software for farms that farm the right way.
            </h2>
            <p style={{ margin: 0, color: "var(--text-body)", fontSize: "var(--text-md)", lineHeight: "var(--leading-relaxed)", maxWidth: "46ch" }}>
              Bountiful isn&rsquo;t for anyone with a box to ship. We build for small independent farms
              growing sustainably, ethically, and regeneratively, because we shape the software
              around their seasons.
            </p>
            <p style={{ margin: 0, fontFamily: "var(--type-note-family)", fontSize: 20, color: "var(--clay-700)" }}>
              Certification helps, practice matters more. Tell us how you grow.
            </p>
          </div>

          <ul style={{ display: "grid", gap: "var(--space-3)", alignContent: "start", margin: 0, padding: 0, listStyle: "none" }}>
            {CRITERIA.map((c) => (
              <li
                key={c.title}
                style={{
                  display: "flex",
                  gap: "var(--space-3)",
                  alignItems: "flex-start",
                  border: "var(--stroke) solid var(--border-accent)",
                  borderRadius: "var(--radius-md)",
                  background: "var(--surface-card)",
                  padding: "var(--space-4) var(--space-5)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: 22,
                    height: 22,
                    flex: "none",
                    borderRadius: "var(--radius-pill)",
                    background: "var(--leaf-100)",
                    border: "var(--stroke) solid var(--leaf-700)",
                    display: "block",
                  }}
                />
                <p style={{ margin: 0, color: "var(--text-body)" }}>
                  <strong style={{ color: "var(--leaf-900)" }}>{c.title}</strong> {c.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
