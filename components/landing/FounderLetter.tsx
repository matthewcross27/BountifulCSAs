import type { CSSProperties } from "react";

const PARAGRAPHS = [
  "I spent a season living with organic market gardeners in Portugal, and I saw how little time a farm has. The growing was the easy part to love. It was the business side - the signups, the invoices, the endless texts - that pulled attention away from the field, day after day.",
  "A CSA is one of the best openings an independent farm has: more leverage than wholesale, steadier demand than market days, and a community that's committed to the mission. But starting one, or running one well, costs the hours you don't have.",
  "So I'm building Bountiful to make that work as close to invisible as I can get it. The season's paperwork stays in the background, so you can get back to what you do best.",
];

const STAMP: CSSProperties = {
  fontFamily: "var(--type-data-family)",
  fontSize: 11.5,
  letterSpacing: "var(--tracking-stamp)",
  textTransform: "uppercase",
};

export function FounderLetter() {
  return (
    <section
      aria-labelledby="letter-heading"
      style={{
        position: "relative",
        background: "var(--surface-card)",
        borderTop: "var(--stroke) solid var(--border-hairline)",
        borderBottom: "var(--stroke) solid var(--border-hairline)",
        boxShadow: "var(--shadow-md)",
      }}
    >
      <div
        style={{
          // em, not rem: the sheet scales with the letter's own type size, so the
          // measure stays ~67 characters at every width instead of running long
          // in the middle of the range.
          fontSize: "var(--text-fluid-letter)",
          maxWidth: "min(36em, 100%)",
          margin: "0 auto",
          padding: "clamp(2.75rem, 5.5vw, 5.25rem) var(--gutter) clamp(2.5rem, 5vw, 4.5rem)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: "var(--space-3)",
            paddingBottom: "var(--space-3)",
            borderBottom: "var(--stroke) solid var(--border-hairline)",
          }}
        >
          <h2 id="letter-heading" style={{ ...STAMP, color: "var(--clay-700)" }}>
            An open letter to the growers
          </h2>
          <span style={{ ...STAMP, color: "var(--text-muted)" }}>Bountiful &middot; before the 2026 season</span>
        </div>
        <div aria-hidden="true" style={{ borderTop: "var(--stroke) solid var(--border-hairline)", marginTop: 2 }} />

        <div
          style={{
            borderLeft: "var(--stroke) solid var(--clay-100)",
            paddingLeft: "clamp(1.25rem, 2.4vw, 2.125rem)",
            marginTop: "clamp(1.75rem, 3.5vw, 2.75rem)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-6)",
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: "var(--type-note-family)",
              fontSize: "clamp(1.5rem, 2.4vw, 1.875rem)",
              lineHeight: 1.25,
              color: "var(--clay-700)",
            }}
          >
            Dear grower,
          </p>

          {PARAGRAPHS.map((text) => (
            <p
              key={text.slice(0, 24)}
              style={{
                margin: 0,
                fontSize: "var(--text-fluid-letter)",
                lineHeight: 1.7,
                color: "var(--text-body)",
              }}
            >
              {text}
            </p>
          ))}

          <p
            style={{
              margin: 0,
              fontSize: "var(--text-fluid-letter)",
              lineHeight: 1.7,
              color: "var(--text-muted)",
            }}
          >
            And only for farms growing sustainably, ethically, and regeneratively. That&rsquo;s the whole list.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-end",
              gap: "var(--space-6)",
              paddingTop: "var(--space-1)",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span
                style={{
                  fontFamily: "var(--type-note-family)",
                  fontSize: "clamp(1.875rem, 3vw, 2.5rem)",
                  lineHeight: 1,
                  color: "var(--text-strong)",
                }}
              >
                Matt
              </span>
              <span aria-hidden="true" style={{ width: 112, height: 0, borderBottom: "var(--stroke) solid var(--border-default)" }} />
              <span style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)", paddingTop: 6 }}>founder, Bountiful</span>
            </div>
            <p style={{ margin: 0, fontFamily: "var(--type-note-family)", fontSize: 19, color: "var(--clay-700)" }}>
              Portugal, the season this started.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
