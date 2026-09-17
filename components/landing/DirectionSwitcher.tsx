import Link from "next/link";
import type { Direction } from "./directions";
import { DIRECTIONS } from "./directions";

/**
 * TEMPORARY: the visual-direction picker. Delete this file, directions.ts,
 * directions.css and the `variant` prop in app/page.tsx to remove the explorer.
 */
export function DirectionSwitcher({ active }: { active: Direction | null }) {
  return (
    <div
      role="group"
      aria-label="Visual direction (temporary)"
      style={{
        position: "fixed",
        right: "var(--space-4)",
        bottom: "var(--space-4)",
        zIndex: 80,
        display: "flex",
        alignItems: "center",
        gap: 4,
        padding: 4,
        background: "var(--paper-000)",
        border: "var(--stroke) solid var(--ink-900)",
        borderRadius: "var(--radius-pill)",
        boxShadow: "3px 3px 0 var(--ink-900)",
      }}
    >
      {([null, ...DIRECTIONS] as (Direction | null)[]).map((d) => {
        const on = d === active;
        return (
          <Link
            key={d ?? "default"}
            href={d ? `/?ui=${d}` : "/"}
            aria-current={on ? "true" : undefined}
            style={{
              display: "inline-flex",
              alignItems: "center",
              minHeight: 32,
              padding: "0 var(--space-3)",
              borderRadius: "var(--radius-pill)",
              background: on ? "var(--action-primary)" : "transparent",
              color: on ? "var(--text-on-accent)" : "var(--text-muted)",
              fontFamily: "var(--type-body-family)",
              fontSize: "var(--text-xs)",
              fontWeight: "var(--weight-semibold)",
              textDecoration: "none",
              textTransform: "capitalize",
            }}
          >
            {d ?? "current"}
          </Link>
        );
      })}
    </div>
  );
}
