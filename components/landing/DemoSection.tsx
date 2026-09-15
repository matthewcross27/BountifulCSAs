import { BrowserFrame } from "./BrowserFrame";

// ---------------------------------------------------------------------------
// The demo video goes here. Drop the finished file under `public/demo/` and set
// DEMO_VIDEO_SRC to its path (e.g. "/demo/season-walkthrough.mp4"); optionally
// set DEMO_VIDEO_POSTER the same way. The framed poster panel below is replaced
// by a real <video controls> and nothing else on the page needs to change.
// ---------------------------------------------------------------------------
const DEMO_VIDEO_SRC: string | null = null;
const DEMO_VIDEO_POSTER: string | null = null;

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
          See a season run in two minutes
        </h2>
        <span style={{ fontFamily: "var(--type-note-family)", fontSize: 19, color: "var(--clay-700)" }}>
          walkthrough, no signup needed
        </span>
      </div>

      <BrowserFrame colorDots urlLabel="bountifulcsas.com / demo">
        {DEMO_VIDEO_SRC ? (
          <video
            controls
            preload="metadata"
            poster={DEMO_VIDEO_POSTER ?? undefined}
            style={{ display: "block", width: "100%", aspectRatio: "16 / 9", background: "var(--leaf-900)" }}
          >
            <source src={DEMO_VIDEO_SRC} type="video/mp4" />
          </video>
        ) : (
          <div
            style={{
              aspectRatio: "16 / 9",
              minHeight: 220,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "var(--space-4)",
              padding: "var(--space-6)",
              textAlign: "center",
              background: "linear-gradient(180deg, var(--leaf-800) 0%, var(--leaf-900) 100%)",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: 76,
                height: 76,
                borderRadius: "var(--radius-pill)",
                border: "var(--stroke-bold) solid var(--sun-100)",
                background: "rgba(251, 235, 198, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "var(--shadow-lg)",
              }}
            >
              <span
                style={{
                  display: "block",
                  width: 0,
                  height: 0,
                  marginLeft: 5,
                  borderLeft: "20px solid var(--sun-100)",
                  borderTop: "13px solid transparent",
                  borderBottom: "13px solid transparent",
                }}
              />
            </span>
            <p style={{ margin: 0, color: "var(--sun-300)", fontSize: "var(--text-md)", maxWidth: "36ch" }}>
              We&rsquo;re filming the walkthrough now. It lands here before signups open.
            </p>
          </div>
        )}
      </BrowserFrame>
    </section>
  );
}
