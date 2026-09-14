"use client";

import * as React from "react";
import {
  CalendarDays, Package, Users, Receipt, Landmark, Store, Sprout, MessagesSquare, CloudSun, Mail, Menu, X,
} from "lucide-react";
import { IconButton } from "../core/IconButton";
import "./Shell.css";

export type ViewId = "week" | "box" | "members" | "money" | "payments" | "farmstore" | "season";

const NAV: { id: ViewId; label: string; icon: React.ComponentType<{ style?: React.CSSProperties }>; disabled?: boolean }[] = [
  { id: "week", label: "This week", icon: CalendarDays },
  { id: "box", label: "Box planner", icon: Package },
  { id: "members", label: "Members", icon: Users },
  { id: "money", label: "Money", icon: Receipt },
  { id: "payments", label: "Payments", icon: Landmark },
  { id: "farmstore", label: "Farmstore", icon: Store, disabled: true },
  { id: "season", label: "Season recap", icon: Sprout, disabled: true },
];

export interface ShellProps {
  view: ViewId;
  onView: (id: ViewId) => void;
  children: React.ReactNode;
  onHelp: () => void;
}

const NAV_ID = "dashboard-nav";

export function Shell({ view, onView, children, onHelp }: ShellProps) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const toggleRef = React.useRef<HTMLButtonElement>(null);
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const wasOpen = React.useRef(false);

  React.useEffect(() => {
    if (drawerOpen) {
      wasOpen.current = true;
      closeRef.current?.focus();
    } else if (wasOpen.current) {
      wasOpen.current = false;
      toggleRef.current?.focus();
    }
  }, [drawerOpen]);

  React.useEffect(() => {
    if (!drawerOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setDrawerOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [drawerOpen]);

  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => { if (mq.matches) setDrawerOpen(false); };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const navigate = (id: ViewId) => { onView(id); setDrawerOpen(false); };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--surface-page)", fontFamily: "var(--type-body-family)" }}>
      <div
        className={`dashboard-backdrop${drawerOpen ? " open" : ""}`}
        aria-hidden="true"
        onClick={() => setDrawerOpen(false)}
        style={{ display: "none", position: "fixed", inset: 0, zIndex: 55, background: "rgba(35, 31, 24, 0.35)" }}
      />

      <nav
        id={NAV_ID}
        className={`dashboard-nav${drawerOpen ? " open" : ""}`}
        style={{
          width: 240, flex: "none", background: "var(--surface-inverse)", color: "var(--text-on-dark)",
          padding: "var(--space-6) var(--space-4)", display: "flex", flexDirection: "column", gap: "var(--space-7)",
        }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-3)" }}>
          <div style={{ fontFamily: "var(--type-display-family)", fontWeight: "var(--weight-display)", letterSpacing: "var(--tracking-display)", fontSize: "var(--text-lg)", padding: "0 var(--space-2)" }}>
            <span style={{ borderBottom: "3px solid var(--sun-500)", paddingBottom: 2 }}>Bountiful</span> CSAs
          </div>
          <button
            ref={closeRef}
            type="button"
            className="dashboard-nav-close"
            aria-label="Close navigation"
            onClick={() => setDrawerOpen(false)}
            style={{
              display: "none", flex: "none", width: 36, height: 36, alignItems: "center", justifyContent: "center",
              borderRadius: "var(--radius-md)", border: "none", background: "transparent", cursor: "pointer",
              color: "rgba(251,245,233,0.72)",
            }}>
            <X style={{ width: 20, height: 20 }} />
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {NAV.map((n) => {
            const active = n.id === view;
            const Icon = n.icon;
            const tooltipId = `${n.id}-tooltip`;
            return (
              <span key={n.id} className="dashboard-nav-item" style={{ position: "relative" }}>
                <button
                  type="button"
                  onClick={n.disabled ? undefined : () => navigate(n.id)}
                  aria-disabled={n.disabled || undefined}
                  aria-describedby={n.disabled ? tooltipId : undefined}
                  style={{
                    display: "flex", alignItems: "center", gap: "var(--space-3)",
                    minHeight: 44, padding: "0 var(--space-3)", border: "none",
                    cursor: n.disabled ? "not-allowed" : "pointer",
                    borderRadius: "var(--radius-md)", textAlign: "left", width: "100%",
                    background: active ? "rgba(251,245,233,0.14)" : "transparent",
                    color: active ? "var(--paper-000)" : "rgba(251,245,233,0.72)",
                    opacity: n.disabled ? 0.45 : 1,
                    fontSize: "var(--text-base)", fontWeight: active ? "var(--weight-bold)" : "var(--weight-medium)",
                    transition: "background var(--dur-fast) var(--ease-settle)",
                  }}>
                  <Icon style={{ width: 20, height: 20 }} />
                  {n.label}
                </button>
                {n.disabled ? (
                  <span id={tooltipId} role="tooltip" className="dashboard-nav-tooltip">
                    Coming soon
                  </span>
                ) : null}
              </span>
            );
          })}
        </div>

        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
          <button type="button" onClick={() => { onHelp(); setDrawerOpen(false); }}
            style={{
              display: "flex", alignItems: "center", gap: "var(--space-3)", minHeight: 44,
              padding: "0 var(--space-3)", borderRadius: "var(--radius-md)", cursor: "pointer",
              background: "var(--sun-500)", border: "2px solid var(--ink-900)", boxShadow: "var(--shadow-sticker)",
              color: "var(--ink-900)", fontSize: "var(--text-base)", fontWeight: "var(--weight-bold)",
            }}>
            <MessagesSquare style={{ width: 20, height: 20 }} />
            Ask Bountiful
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", padding: "var(--space-2) var(--space-3)", color: "rgba(251,245,233,0.72)", fontSize: "var(--text-sm)" }}>
            <span style={{ width: 30, height: 30, borderRadius: "50%", background: "var(--leaf-600)", color: "var(--paper-000)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--type-data-family)", fontSize: "var(--text-xs)" }}>JR</span>
            Jamie · Ridgefoot
          </div>
        </div>
      </nav>

      <main inert={drawerOpen || undefined} style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <header style={{
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-4)",
          padding: "var(--space-4) var(--gutter)", borderBottom: "1px solid var(--border-hairline)",
          background: "var(--paper-000)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
            <IconButton
              ref={toggleRef}
              className="dashboard-nav-toggle"
              label={drawerOpen ? "Close navigation" : "Open navigation"}
              variant="outline"
              aria-expanded={drawerOpen}
              aria-controls={NAV_ID}
              onClick={() => setDrawerOpen((o) => !o)}
              style={{ display: "none" }}
            >
              {drawerOpen ? <X style={{ width: 20, height: 20 }} /> : <Menu style={{ width: 20, height: 20 }} />}
            </IconButton>
            <span style={{ fontSize: "var(--text-2xs)", fontWeight: "var(--weight-bold)", textTransform: "uppercase", letterSpacing: "var(--tracking-stamp)", color: "var(--leaf-700)", border: "1.5px solid var(--leaf-300)", borderRadius: "var(--radius-xs)", padding: "4px 8px" }}>WEEK 12</span>
            <span style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>2026 season · week of July 14 · pickup Tuesday</span>
          </div>
          <div style={{ display: "flex", gap: "var(--space-2)" }}>
            <IconButton label="Weather" variant="outline"><CloudSun style={{ width: 20, height: 20 }} /></IconButton>
            <IconButton label="Notes from members" variant="outline"><Mail style={{ width: 20, height: 20 }} /></IconButton>
          </div>
        </header>
        <div style={{ flex: 1, padding: "var(--gutter)", maxWidth: "var(--page-max)", width: "100%" }}>{children}</div>
      </main>
    </div>
  );
}
