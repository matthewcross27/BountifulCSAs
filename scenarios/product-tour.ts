// A type-only import: erased when this file is compiled, so it loads whether
// or not the project has screencast-axi installed - under npx included.
import type { Director, Scenario } from "screencast-axi";

/**
 * The phone beat.
 *
 * Playwright fixes the video canvas at context creation, so calling
 * `setViewportSize(390x844)` part-way through a 1280x720 take does not reframe
 * the clip - it pins the page to the top-left corner and fills the remaining
 * 70% of every frame with grey. The mobile layout is therefore shown the way a
 * phone actually gets it: the same dashboard loaded into a 390px-wide frame,
 * which is what `Shell.css`'s `<1024px` drawer breakpoint keys on. A media
 * query inside an iframe is evaluated against the iframe's own viewport, so
 * this is the real mobile layout, not a desktop squeezed narrow.
 */
const PHONE_FRAME_ID = "screencast-phone";

async function mountPhone(d: Director): Promise<void> {
  await d.page.evaluate((frameId: string) => {
    const host = document.createElement("div");
    host.id = "screencast-phone-host";
    // Sits under the recorder's own overlay (z-index 2147483647) so the drawn
    // pointer and the caption still render on top of it.
    host.style.cssText =
      "position:fixed;inset:0;z-index:999999;background:#F4EBD9;" +
      "display:flex;align-items:center;justify-content:center;" +
      // Leaves the bottom strip clear so the caption never lands on the phone.
      "padding-bottom:104px;opacity:0;transition:opacity 420ms ease;";

    const bezel = document.createElement("div");
    bezel.style.cssText =
      "width:390px;height:580px;border:10px solid #231F18;border-radius:36px;" +
      "overflow:hidden;background:#FBF5E9;box-shadow:0 26px 60px rgba(35,31,24,.28);";

    const frame = document.createElement("iframe");
    frame.id = frameId;
    frame.src = "/dashboard";
    frame.style.cssText = "width:390px;height:580px;border:0;display:block;";

    bezel.appendChild(frame);
    host.appendChild(bezel);
    document.body.appendChild(host);
    requestAnimationFrame(() => {
      host.style.opacity = "1";
    });
  }, PHONE_FRAME_ID);
}

/**
 * Drops the outer document's drawn pointer for the phone beat.
 *
 * The overlay tracks `mousemove`, and a document gets no `mousemove` while the
 * cursor is inside a child frame - so from the moment the pointer crosses into
 * the phone, the outer arrow freezes at the frame's edge while the iframe's own
 * overlay (the init script runs in every frame) draws the one that is actually
 * tracking. Both on screen at once is two cursors; the iframe's is the correct
 * one, so the outer arrow is the one to lose. `display` is set on the node
 * rather than called through `setPointerVisible`, because every later
 * `mousemove` over the backdrop would put the class back.
 */
async function hideOuterPointer(d: Director): Promise<void> {
  await d.page.evaluate(() => {
    const host = document.getElementById("__screencast_overlay");
    const pointer = host?.shadowRoot?.querySelector<HTMLElement>(".pointer");
    if (pointer) pointer.style.display = "none";
  });
}

export default {
  id: "product-tour",
  title: "Bountiful CSAs: a week on the farmer dashboard",
  description:
    "One week of a CSA season run from the farmer dashboard: building the box, the member list, the weekly note, the money, a pricing decision, and the same thing on a phone.",

  // The narration, in order. Each line goes on screen exactly once - the take
  // is rejected otherwise, which is what keeps this list and the recording in
  // step with each other.
  steps: [
    "Tuesday morning. The whole week on one screen.",
    "148 shares sold, $4,218 collected, two of this week's jobs already handled.",
    "This week's box starts from what actually came out of the field.",
    "Forgot to log the sorrel? Add it, and every member sees it.",
    "Swaps are on by default. Turn them off the week you can't cover them.",
    "Every household, the waitlist and all three pickup sites - one list.",
    "Twelve people waiting on a share. Nobody living in a spreadsheet.",
    "Find one household without scrolling past the other 147.",
    "The Thursday note that used to eat an evening.",
    "Write it once. It goes to all 148.",
    "Sent.",
    "The money, already reconciled - payment plans, sliding scale, all of it.",
    "Two cards declined. Retry both without chasing anybody.",
    "And the part software usually can't do: ask.",
    "Next season's price. One tap sets up renewal.",
    "The decision is waiting on your week when you come back in.",
    "All of it works from the barn.",
    "Same season. One thumb.",
  ],

  async run(d) {
    // --- 1. This week -----------------------------------------------------
    await d.goto("/dashboard");
    await d.step(0, 4000);
    await d.step(1, 4700);

    // --- 2. Box planner: build the box ------------------------------------
    await d.click("nav button:has-text('Box planner')");
    await d.step(2, 5100);

    await d.step(3, 900);
    await d.type("input[placeholder^='Add something']", "Sorrel");
    await d.press("Enter");
    await d.beat(1600);

    await d.step(4, 1600);
    // The real checkbox is visually hidden behind a styled pill, so the click
    // goes to the wrapping label - the part that is actually on screen.
    await d.click(
      d.page.locator("label").filter({ hasText: "Let members swap two items" }).first()
    );
    await d.beat(1500);

    // --- 3. Members: tabs and search --------------------------------------
    await d.click("nav button:has-text('Members')");
    await d.step(5, 5300);

    await d.step(6, 400);
    await d.click("[role=tab]:has-text('Waitlist')");
    await d.beat(1400);
    await d.click("[role=tab]:has-text('Pickup sites')");
    await d.beat(1400);
    await d.click("[role=tab]:has-text('Members')");
    await d.beat(700);

    await d.step(7, 500);
    await d.type("input[placeholder='Find a household']", "Dana");
    await d.beat(1800);
    await d.type("input[placeholder='Find a household']", "", { clear: true });
    await d.beat(600);

    // --- 4. Send a note, end to end ---------------------------------------
    await d.step(8, 1900);
    await d.click("button:has-text('Send a note')");
    await d.beat(900);

    await d.step(9, 500);
    await d.type("#note-subject", "This week's pickup time");
    await d.type(
      "#note-body",
      "Pickup moves to 4-6pm on Thursday - the barn lane will be muddy after Monday's rain."
    );
    await d.beat(900);
    await d.click("button:has-text('Send note')");
    await d.step(10, 1000);
    await d.click("button:has-text('Done')");
    await d.beat(800);

    // --- 5. Money ---------------------------------------------------------
    await d.click("nav button:has-text('Money')");
    await d.step(11, 5500);

    await d.step(12, 1600);
    await d.click("button:has-text('Retry both')");
    await d.beat(2000);

    // The left nav is a flex column in a `min-height: 100vh` row rather than a
    // sticky rail, so on a view taller than the viewport its footer - the Ask
    // Bountiful button - sits below the fold. Clicking it cold makes Playwright
    // scroll it into view, and an instant jump reads as a broken layout. This
    // scroll is deliberate, eased, and shows the rest of the Money screen on
    // the way down.
    await d.scrollBy(340);
    await d.beat(1200);

    // --- 6. Ask Bountiful: the pricing decision ---------------------------
    await d.step(13, 600);
    await d.click("nav button:has-text('Ask Bountiful')");
    await d.beat(2400);

    await d.step(14, 700);
    await d.click("[role=button]:has-text('Raise to $30')");
    await d.beat(2800);
    await d.click("aside button[aria-label='Close']");
    await d.beat(600);

    // Back to the top for the same reason, before the nav is clicked again.
    await d.scrollBy(-340);
    await d.beat(400);

    await d.step(15, 900);
    await d.click("nav button:has-text('This week')");
    // The decision lands in a "Recent decisions" card at the foot of the week
    // view, which is below the fold - so the caption's payoff is only true if
    // the take actually goes and looks at it.
    await d.scrollBy(520);
    await d.beat(1100);
    // The card is the last thing on the page, so it cannot be scrolled clear of
    // the caption bar - and the caption would be sitting on the one line it is
    // talking about. Clearing it hands the frame to the card.
    await d.caption(null);
    await d.beat(2200);

    // --- 7. The same dashboard, at a phone viewport -----------------------
    await mountPhone(d);
    await hideOuterPointer(d);
    const phone = d.page.frameLocator(`#${PHONE_FRAME_ID}`);
    await d.waitFor(phone.getByRole("button", { name: "Open navigation" }));
    await d.step(16, 3300);

    await d.step(17, 500);
    await d.click(phone.getByRole("button", { name: "Open navigation" }));
    await d.beat(1500);
    await d.click(phone.getByRole("button", { name: "Box planner", exact: true }));
    await d.beat(2200);
  },
} satisfies Scenario;
