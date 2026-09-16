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
- `components/dashboard/{Shell,WeekView,BoxPlanner,Roster,Money,Payments,Assistant}.tsx` are the
  screens, ported faithfully from a Claude Design prototype (mock data and copy intentionally
  unchanged except where noted here). `Payments` is a real feature - see below. The Farmstore/
  Season recap placeholder copy was rewritten to farmer-facing language. `WeekView`, `BoxPlanner`,
  `Roster`, and `Money`'s switches, search/filter inputs, tabs, add-item form, and action buttons
  (Money's Retry both/Export, Roster's per-row message icon) - inert in the prototype - are now
  wired to real (still in-memory, no-backend) `useState`; `Roster`'s Waitlist/Pickup sites tabs
  added their own mock row data for this, and its per-row message icon opens the existing
  NoteComposer dialog pre-scoped to that row via a `composerScope` state (`recipientOptions`
  includes waitlist/pickup-site rows, not just members, so every tab's icon resolves). `Farmstore`
  and `Season recap` are a deliberate empty state, not implemented views; their nav items are
  visible-but-disabled
  (`aria-disabled`, not the native `disabled` attribute, to keep them in tab order) with a
  CSS-only `:hover`/`:focus-within` tooltip (`Shell.css` `.dashboard-nav-tooltip`) reading
  "Coming soon".
- `Shell.tsx` is the only place in the app with a breakpoint: below 1024px the left nav becomes a
  fixed-position drawer (`Shell.css`, class-toggled via a `drawerOpen` state) opened by a header
  hamburger button, closed by backdrop click/Escape/nav-item activation. Its responsive rule set
  is a plain imported `.css` file, not `<style jsx>` - styled-jsx's client-side style-tag registry
  re-runs on hydration in this app (dev-mode StrictMode double-effect), which caused a real
  flash-of-open-drawer bug on page load; a statically-imported stylesheet doesn't re-register and
  has no flash. Reuse this pattern (plain `.css` import) for any future responsive/breakpoint CSS
  here rather than reintroducing `<style jsx>`. Also note: `<style jsx>`/`<style jsx global>`
  scoping only tags JSX elements written directly in that file - classes passed as a prop into a
  child component (e.g. `IconButton`) never receive the scoping attribute and scoped rules won't
  match them.
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
  once per connected account to reach `stripe_transfers.status === "active"`, filling in (test-mode
  fake values are fine): ToS acceptance, entity type ("Individual" is simplest), business URL, and
  an external bank account. There is no test-mode API bypass for any of these on a recipient
  configuration. Account links are single-use and expire quickly - mint a fresh one
  (`POST /api/stripe/connect/onboard`) if a prior attempt didn't visibly land.
- **Verified end-to-end in test mode** (2026-09-14, account `acct_1UFb4rLnaG0lKs1a`): onboarding to
  `stripe_transfers.status === "active"`; `POST /api/stripe/subscriptions` created a real
  Subscription whose invoice charge split exactly 90/25.65 to the connected account's balance and
  10%/2.85 as the platform's `application_fee_amount` (confirmed via the connected account's
  `balanceTransactions`, not just the Charge object); `POST /api/stripe/refunds` fully refunded it
  and the connected account's balance transactions showed the transfer clawed back and the fee
  credited back, netting to exactly $0; both `charge.succeeded` and `charge.refunded` webhooks
  mirrored correctly into farm-scoped `PaymentEvent` rows, visible live in the dashboard's Payments
  view. One bug fixed during this run: `stripe.paymentMethods.attach(token, ...)` on a Stripe
  test-mode PM token (e.g. `pm_card_visa`) returns a *new* PaymentMethod id - `app/api/stripe/
  subscriptions/route.ts` must use the returned id, not the original token, for
  `invoice_settings.default_payment_method`/`default_payment_method`.
- `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET` / `DATABASE_PATH` / `NEXT_PUBLIC_APP_URL` live in
  `.env.local` (gitignored, test-mode key). For local webhook testing:
  `stripe listen --forward-to localhost:3000/api/stripe/webhook`.

## Demo video (screencast-axi)

- The landing page's demo clip is produced by `screencast-axi` (pinned devDependency) from
  `screencast.config.ts` + `scenarios/product-tour.ts`; deliverables land in `public/demo/`
  (mp4/webm/poster + `manifest.json`) and are committed. `npm run demo:rehearse` is the cheap
  loop - it checks every selector without encoding; `npm run demo:record` shoots the take.
  Run `npm run db:push && npm run db:seed` and `next dev` first, and pass
  `SCREENCAST_BASE_URL` when dev did not get port 3000.
- Both scripts need `NODE_OPTIONS=--import=tsx`: Node 22.14 crashes in its `require(esm)`
  interop when the tool registers `tsx` lazily, mid-run, to read a `.ts` config. Registering it
  up front takes the working path. Drop the flag when this project's Node moves past 22.14.
- Playwright fixes the video canvas at context creation, so `setViewportSize()` mid-take does
  not reframe a clip - it pins the page to a corner and greys the rest. The phone beat therefore
  loads `/dashboard` into a 390px-wide iframe (a media query inside an iframe reads the iframe's
  own viewport, so the `<1024px` drawer layout is the real one). Reuse that approach rather than
  resizing. The scenario's comments carry the rest of the reasoning, including why the outer
  document's drawn cursor has to be suppressed once the pointer enters the frame.

## Maintaining this file

Keep this file for knowledge useful to almost every future agent session in this project.
Do not repeat what the codebase already shows; point to the authoritative file or command instead.
Prefer rewriting or pruning existing entries over appending new ones.
When updating this file, preserve this bar for all agents and keep entries concise.
