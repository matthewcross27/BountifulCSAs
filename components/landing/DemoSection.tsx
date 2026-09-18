import { BrowserFrame } from "./BrowserFrame";

// The recorded product tour. Deliverables come from `npm run demo:record`
// (screencast-axi) and are committed under public/demo; see AGENTS.md.
const POSTER = "/demo/product-tour.webp";
const SOURCES = [
  { src: "/demo/product-tour.webm", type: "video/webm" },
  { src: "/demo/product-tour.mp4", type: "video/mp4" },
];

export function DemoSection() {
  return (
    <section className="landing-shell" aria-labelledby="demo-heading" style={{ paddingBottom: "var(--space-9)" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "baseline",
          gap: "var(--space-3)",
          marginBottom: "var(--space-5)",
        }}
      >
        <h2 id="demo-heading" style={{ fontSize: "clamp(1.5rem, 2.6vw, 2rem)" }}>
          See a season run in under two minutes
        </h2>
        <span style={{ fontFamily: "var(--type-note-family)", fontSize: 19, color: "var(--clay-700)" }}>
          walkthrough, no signup needed
        </span>
      </div>

      <BrowserFrame colorDots urlLabel="bountifulcsas.com / demo">
        {/* preload="none": the poster is all a visitor gets until they press play,
            so the 3MB tour costs nothing to anyone who scrolls past. */}
        <video
          controls
          preload="none"
          poster={POSTER}
          playsInline
          aria-label="Product tour: a week of a CSA season run from the Bountiful farmer dashboard"
          style={{ display: "block", width: "100%", aspectRatio: "16 / 9", background: "var(--leaf-900)" }}
        >
          {SOURCES.map((s) => (
            <source key={s.src} src={s.src} type={s.type} />
          ))}
        </video>
      </BrowserFrame>
    </section>
  );
}
