import Image from "next/image";
import { BrowserFrame } from "./BrowserFrame";

const SMALL_SHOTS = [
  {
    src: "/screenshots/box-planner.png",
    alt: "The Bountiful box planner: this week's box items with quantities, a running share count, and a publish action.",
    note: "It starts from what came out of the field, not a template.",
  },
  {
    src: "/screenshots/payments.png",
    alt: "The Bountiful payments view: a connected Stripe account with recent charges, amounts, and platform fees.",
    note: "Deposits land in your account, not a platform wallet.",
  },
];

export function LookInside() {
  return (
    <section id="inside" className="landing-shell landing-section" aria-labelledby="inside-heading">
      <h2 id="inside-heading" style={{ fontSize: "var(--text-fluid-section)" }}>
        A look inside
      </h2>
      <p style={{ margin: "var(--space-2) 0 0", color: "var(--text-muted)", maxWidth: "56ch", fontSize: "var(--text-md)" }}>
        Screens from the working build - the weekly dashboard, the box planner, and payments that
        land in your own account.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)", marginTop: "var(--space-7)" }}>
        <BrowserFrame>
          <Image
            src="/screenshots/dashboard.png"
            alt="The Bountiful weekly dashboard: this week's box, member count, pickup sites, and the note going out to members."
            width={2880}
            height={1620}
            sizes="(max-width: 1248px) 100vw, 1152px"
            style={{ display: "block", width: "100%", height: "auto" }}
          />
        </BrowserFrame>

        <div className="landing-pair">
          {SMALL_SHOTS.map((shot) => (
            <div key={shot.src} style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              <div
                style={{
                  border: "var(--stroke) solid var(--border-strong)",
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                  boxShadow: "var(--shadow-md)",
                }}
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={2560}
                  height={1920}
                  sizes="(max-width: 680px) 100vw, 566px"
                  style={{ display: "block", width: "100%", height: "auto" }}
                />
              </div>
              <p style={{ margin: 0, fontFamily: "var(--type-note-family)", fontSize: 19, color: "var(--clay-700)" }}>
                {shot.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
