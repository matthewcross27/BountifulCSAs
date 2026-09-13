<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project structure

Next.js 16 (App Router, TypeScript) app. Tech stack rationale lives in
`data/bountifulcsas-platform-design/report.md` Section 6 (outside this worktree, in firstmate's
data directory) — Postgres/Neon, Drizzle, Clerk, Inngest, Stripe, etc. Only the farmer dashboard
UI is implemented so far; everything else in that report is not yet built.

- `/dashboard` is the farmer-facing entry route (redirected to from `/`). It mounts
  `components/dashboard/DashboardApp.tsx`, which owns view-switching, the publish-box dialog, and
  the assistant panel — all in-memory `useState`, no backend yet.
- `components/dashboard/{Shell,WeekView,BoxPlanner,Roster,Money,Assistant}.tsx` are the six
  screens, ported faithfully from a Claude Design prototype (mock data and copy intentionally
  unchanged). `Farmstore` and `Season recap` are a deliberate empty state, not implemented views.
- `components/{core,forms,navigation,overlay}/*.tsx` are the shared design-system components
  (Button, Card, Switch, Dialog, etc.), each typed against the prop contract of the same-named
  source `.d.ts` in the original design export.
- Design tokens (colors, typography, spacing, shape, motion, texture) live in `app/tokens/*.css`,
  imported by `app/globals.css`. Every component reads them via `var(--...)`; don't hardcode colors
  or spacing — add or adjust a token instead.
- The four brand fonts (Bricolage Grotesque, Karla, Caveat, DM Mono) are loaded via
  `next/font/google` in `app/layout.tsx`, wired to the same `--font-display` / `--font-sans` /
  `--font-hand` / `--font-mono` custom properties `app/tokens/typography.css` expects.
- Icons are `lucide-react` components, not the prototype's `data-lucide` attribute convention.
- A few component `.d.ts`-derived prop interfaces (`Card.title`, `Input`/`Select.size`,
  `Stepper`/`Tabs.onChange`) collide with the native HTML attribute of the same name when
  extending `React.HTMLAttributes`/`InputHTMLAttributes`/etc.; each is fixed with a minimal
  `Omit<..., "propName">` on the extended interface rather than changing the prop's effective
  name or type.

## Maintaining this file

Keep this file for knowledge useful to almost every future agent session in this project.
Do not repeat what the codebase already shows; point to the authoritative file or command instead.
Prefer rewriting or pruning existing entries over appending new ones.
When updating this file, preserve this bar for all agents and keep entries concise.
