"use client";

import * as React from "react";
import {
  CalendarDays, Package, Users, Receipt, Store, Sprout, MessagesSquare, CloudSun, Mail,
} from "lucide-react";
import { IconButton } from "../core/IconButton";

export type ViewId = "week" | "box" | "members" | "money" | "farmstore" | "season";

const NAV: { id: ViewId; label: string; icon: React.ComponentType<{ style?: React.CSSProperties }> }[] = [
  { id: "week", label: "This week", icon: CalendarDays },
  { id: "box", label: "Box planner", icon: Package },
  { id: "members", label: "Members", icon: Users },
  { id: "money", label: "Money", icon: Receipt },
  { id: "farmstore", label: "Farmstore", icon: Store },
  { id: "season", label: "Season recap", icon: Sprout },
];

export interface ShellProps {
  view: ViewId;
  onView: (id: ViewId) => void;
  children: React.ReactNode;
  onHelp: () => void;
}

export function Shell({ view, onView, children, onHelp }: ShellProps) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--surface-page)", fontFamily: "var(--type-body-family)" }}>
      <nav style={{
        width: 240, flex: "none", background: "var(--surface-inverse)", color: "var(--text-on-dark)",
        padding: "var(--space-6) var(--space-4)", display: "flex", flexDirection: "column", gap: "var(--space-7)",
      }}>
        <div style={{ fontFamily: "var(--type-display-family)", fontWeight: "var(--weight-display)", letterSpacing: "var(--tracking-display)", fontSize: "var(--text-lg)", padding: "0 var(--space-2)" }}>
          <span style={{ borderBottom: "3px solid var(--sun-500)", paddingBottom: 2 }}>Bountiful</span> CSAs
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {NAV.map((n) => {
            const active = n.id === view;
            const Icon = n.icon;
            return (
              <button key={n.id} type="button" onClick={() => onView(n.id)}
                style={{
                  display: "flex", alignItems: "center", gap: "var(--space-3)",
                  minHeight: 44, padding: "0 var(--space-3)", border: "none", cursor: "pointer",
                  borderRadius: "var(--radius-md)", textAlign: "left",
                  background: active ? "rgba(251,245,233,0.14)" : "transparent",
                  color: active ? "var(--paper-000)" : "rgba(251,245,233,0.72)",
                  fontSize: "var(--text-base)", fontWeight: active ? "var(--weight-bold)" : "var(--weight-medium)",
                  transition: "background var(--dur-fast) var(--ease-settle)",
                }}>
                <Icon style={{ width: 20, height: 20 }} />
                {n.label}
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
          <button type="button" onClick={onHelp}
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

      <main style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <header style={{
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-4)",
          padding: "var(--space-4) var(--gutter)", borderBottom: "1px solid var(--border-hairline)",
          background: "var(--paper-000)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
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
