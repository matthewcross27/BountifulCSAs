<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project structure

Next.js 16 (App Router, TypeScript) app. Tech stack rationale lives in
`data/bountifulcsas-platform-design/report.md` Section 6 (outside this worktree, in firstmate's
data directory) — Postgres/Neon, Drizzle, Clerk, Inngest, Stripe, etc. The farmer dashboard UI
and Stripe Connect payments/billing (see below) are implemented; Clerk auth, Inngest jobs, and
the buyer storefront are not yet built.

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

## Payments (Stripe Connect)

- Architecture (Connect Express, destination charges, Billing subscriptions with
  `transfer_data`, 10% `application_fee_percent`, webhook-mirrored `PaymentEvent`) follows
  `data/bountifulcsas-platform-design/report.md` Section 3. Code lives in `lib/stripe.ts`,
  `lib/db/*`, `app/api/stripe/*`, `app/api/payments`, and `components/dashboard/Payments.tsx`.
- **Use Accounts v2, not the legacy `type: "express"` v1 API** - this Stripe account rejects v1
  account creation entirely. See `.agents/skills/stripe-best-practices/references/connect.md`
  and `.agents/skills/connect-recommend/references/account-types.md` (installed via
  `npx skills add stripe/ai`, tracked in `skills-lock.json`) for the v2 dimension model
  (`dashboard`/`fees_collector`/`losses_collector`) and the legacy-type mapping. Express maps to
  `dashboard: "express"` + `fees_collector`/`losses_collector: "application"` + a `recipient`
  configuration requesting `stripe_balance.stripe_transfers` - not a `merchant` configuration.
  Capability readiness is `configuration.recipient.capabilities.stripe_balance.stripe_transfers
  .status === "active"`, not the v1 `charges_enabled`/`payouts_enabled` fields.
- **Local dev database is SQLite via Drizzle** (`lib/db/schema.ts`, `data/dev.sqlite3`, gitignored),
  not the report's Postgres/Neon - no Postgres/Neon credentials exist in this environment yet.
  Schema is a straightforward subset of the report's model (`Farm`, `BoxType`,
  `BuyerSubscription`, `PaymentEvent`), swappable to `drizzle-orm/node-postgres` later since the
  query API is the same. `npm run db:push` applies schema changes; `npm run db:seed` creates the
  single demo farm (`lib/farm.ts` `DEMO_FARM_ID`, no auth/multi-tenant routing exists yet) and its
  two `BoxType`s with real Stripe test-mode Products/Prices.
- **Express hosted onboarding cannot be completed non-interactively.** Stripe's hosted onboarding
  page is hCaptcha-protected (blocks headless Playwright) and the Accounts v2 API explicitly
  rejects platform-submitted ToS acceptance when `dashboard: "express"` ("requirement collection
  is owned by Stripe") - both are intentional anti-fraud controls, not integration bugs. A real
  human must click through `POST /api/stripe/connect/onboard`'s returned URL in an actual browser
  once per connected account to reach `stripe_transfers.status === "active"`; there is no test-mode
  API bypass for Express/Recipient accounts. Everything up to that point (account + account-link
  creation, the `/return` status sync, destination-charge subscription creation, refunds with
  `reverse_transfer`/`refund_application_fee`, and webhook-driven `PaymentEvent` mirroring) is
  implemented and independently verifiable once an account is manually onboarded in test mode.
- `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET` / `DATABASE_PATH` / `NEXT_PUBLIC_APP_URL` live in
  `.env.local` (gitignored, test-mode key). For local webhook testing:
  `stripe listen --forward-to localhost:3000/api/stripe/webhook`.

## Maintaining this file

Keep this file for knowledge useful to almost every future agent session in this project.
Do not repeat what the codebase already shows; point to the authoritative file or command instead.
Prefer rewriting or pruning existing entries over appending new ones.
When updating this file, preserve this bar for all agents and keep entries concise.
