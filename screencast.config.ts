// A type-only import, so this file loads whether or not screencast-axi is
// resolvable from here - `npx -p screencast-axi` included.
import type { ScreencastConfig } from "screencast-axi";

export default {
  // `next dev` takes the next free port when 3000 is busy, which is routine in
  // a worktree pool, so the port is overridable without editing this file.
  baseUrl: process.env.SCREENCAST_BASE_URL ?? "http://localhost:3000",
  scenarios: ["scenarios/*.ts"],
  outDir: "public/demo",

  // A true 16:9 frame. The landing page's demo slot is `aspect-ratio: 16/9`,
  // and anything else letterboxes inside it. 1280x720 is also exactly
  // `deliverables.width`, so the take is written 1:1 rather than rescaled.
  viewport: { width: 1280, height: 720 },

  deliverables: {
    width: 1280,
    // Flat app UI with no camera motion: 24fps is indistinguishable from 30
    // here and buys about a fifth of the file, which matters for a binary
    // that lives in git.
    fps: 24,
  },

  overlay: {
    // Ridgefoot's gold (`--sun-500`). The ripple has to read against the
    // dashboard's cream page and its green buttons alike.
    accent: "#E4A93C",
    hideSelectors: [
      // The Next dev-tools badge and route announcer. Both are dev-only chrome
      // and neither belongs in a marketing clip.
      "nextjs-portal",
      "next-route-announcer",
    ],
    caption: {
      // Dark green rather than the default near-black: it is the same surface
      // as the dashboard's own inverse cards.
      background: "rgba(27, 47, 30, 0.93)",
      color: "#FBF5E9",
      // Custom properties reach into the overlay's shadow root, so the caption
      // is set in the app's own body face with a stack behind it.
      fontFamily: "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
      fontSize: 19,
      offset: 36,
    },
  },

  timeouts: {
    // `next dev` compiles a route on first request, so the opening navigation
    // and the first visit to each view can genuinely take a few seconds.
    settleMs: 6_000,
    actionMs: 20_000,
  },
} satisfies ScreencastConfig;
