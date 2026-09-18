"use client";

import * as React from "react";
import { Download, Mail, MessageSquare } from "lucide-react";
import { Card } from "../core/Card";
import { Button } from "../core/Button";
import { Badge } from "../core/Badge";
import type { BadgeProps } from "../core/Badge";
import { Tabs } from "../navigation/Tabs";
import { Input } from "../forms/Input";
import { IconButton } from "../core/IconButton";
import { NoteComposer } from "./NoteComposer";

const TAB_SCOPES: { value: string; label: string }[] = [
  { value: "members", label: "All members (148)" },
  { value: "waitlist", label: "Waitlist (12)" },
  { value: "sites", label: "Pickup sites (3)" },
];

const MEMBERS: { name: string; share: string; site: string; status: [NonNullable<BadgeProps["tone"]>, string]; since: string }[] = [
  { name: "Dana Whitfield", share: "Full · weekly", site: "Ridgefoot barn", status: ["good", "Paid through October"], since: "2021" },
  { name: "The Alvarez household", share: "Full · biweekly", site: "Tuesday market", status: ["bad", "Card declined"], since: "2024" },
  { name: "Marcus Pell", share: "Half · weekly", site: "Ridgefoot barn", status: ["good", "Paid in full"], since: "2019" },
  { name: "Nour Haddad", share: "Full · weekly", site: "Home delivery", status: ["warn", "Payment plan · 3 left"], since: "2026" },
  { name: "Ruthie Kane", share: "Half · weekly", site: "Tuesday market", status: ["good", "Sliding scale · $19"], since: "2023" },
  { name: "Owen Baptiste", share: "Full · weekly", site: "Ridgefoot barn", status: ["info", "Vacation hold · 2 wks"], since: "2022" },
];

const WAITLIST: { name: string; share: string; site: string; status: [NonNullable<BadgeProps["tone"]>, string]; since: string }[] = [
  { name: "Priya Anand", share: "Full · weekly (requested)", site: "Ridgefoot barn", status: ["info", "Waiting since Jun"], since: "2026" },
  { name: "The Okafor household", share: "Half · weekly (requested)", site: "Tuesday market", status: ["info", "Waiting since Jun"], since: "2026" },
  { name: "Liam Foster", share: "Full · weekly (requested)", site: "Home delivery", status: ["info", "Waiting since Jul"], since: "2026" },
];

const SITES: { name: string; share: string; site: string; status: [NonNullable<BadgeProps["tone"]>, string]; since: string }[] = [
  { name: "Ridgefoot barn", share: "112 households", site: "Tue & Fri, 3-7pm", status: ["good", "Active"], since: "2019" },
  { name: "Tuesday market", share: "24 households", site: "Tue, 4-6:30pm", status: ["good", "Active"], since: "2021" },
  { name: "Home delivery", share: "12 households", site: "Wed routes", status: ["good", "Active"], since: "2023" },
];

const TAB_ROWS: Record<string, typeof MEMBERS> = { members: MEMBERS, waitlist: WAITLIST, sites: SITES };
const TAB_TOTALS: Record<string, number> = { members: 148, waitlist: 12, sites: 3 };

export function Roster() {
  const [tab, setTab] = React.useState("members");
  const [query, setQuery] = React.useState("");
  const [composerOpen, setComposerOpen] = React.useState(false);
  const [composerScope, setComposerScope] = React.useState(tab);

  const rows = TAB_ROWS[tab];
  const filtered = query.trim()
    ? rows.filter((r) => r.name.toLowerCase().includes(query.trim().toLowerCase()))
    : rows;

  const recipientOptions = [
    ...TAB_SCOPES,
    ...[...MEMBERS, ...WAITLIST, ...SITES].map((m) => ({ value: "member:" + m.name, label: m.name })),
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "var(--space-4)", flexWrap: "wrap" }}>
        <div>
          <h1 style={{ fontSize: "var(--text-2xl)", margin: 0 }}>Members</h1>
          <p style={{ margin: "6px 0 0", color: "var(--text-muted)", fontSize: "var(--text-md)" }}>
            148 households this season. Twelve on the waitlist, waiting on you.
          </p>
        </div>
        <div style={{ display: "flex", gap: "var(--space-3)" }}>
          <Button variant="outline" iconLeft={<Download style={{ width: 18, height: 18 }} />}>Pickup sheet</Button>
          <Button onClick={() => { setComposerScope(tab); setComposerOpen(true); }} iconLeft={<Mail style={{ width: 18, height: 18 }} />}>Send a note</Button>
        </div>
      </div>

      <Card style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "var(--space-4) var(--space-5) 0" }}>
          <Tabs value={tab} onChange={setTab} tabs={[
            { value: "members", label: "Members", count: 148 },
            { value: "waitlist", label: "Waitlist", count: 12 },
            { value: "sites", label: "Pickup sites", count: 3 },
          ]} />
        </div>

        <div className="dash-wrap-row" style={{ padding: "var(--space-4) var(--space-5)", display: "flex", gap: "var(--space-3)", alignItems: "center" }}>
          <Input placeholder="Find a household" value={query} onChange={(e) => setQuery(e.target.value)} style={{ maxWidth: 280, flex: "1 1 200px" }} />
          <span style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>Showing {filtered.length} of {TAB_TOTALS[tab]}</span>
        </div>

        <table className="dash-table" style={{ width: "100%", borderCollapse: "collapse", fontSize: "var(--text-base)" }}>
          <thead>
            <tr>
              {["Household", "Share", "Pickup", "Money", "Member since", ""].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "var(--space-3) var(--space-5)", background: "var(--surface-sunken)", fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "var(--tracking-stamp)", color: "var(--text-muted)", fontWeight: "var(--weight-bold)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((m) => (
              <tr key={m.name}>
                <td data-label="" style={{ padding: "var(--space-4) var(--space-5)", borderBottom: "1px solid var(--border-hairline)", fontWeight: "var(--weight-semibold)", color: "var(--text-strong)" }}>{m.name}</td>
                <td data-label="Share" style={{ padding: "var(--space-4) var(--space-5)", borderBottom: "1px solid var(--border-hairline)", color: "var(--text-body)" }}>{m.share}</td>
                <td data-label="Pickup" style={{ padding: "var(--space-4) var(--space-5)", borderBottom: "1px solid var(--border-hairline)", color: "var(--text-body)" }}>{m.site}</td>
                <td data-label="Money" style={{ padding: "var(--space-4) var(--space-5)", borderBottom: "1px solid var(--border-hairline)" }}><Badge tone={m.status[0]}>{m.status[1]}</Badge></td>
                <td data-label="Member since" style={{ padding: "var(--space-4) var(--space-5)", borderBottom: "1px solid var(--border-hairline)", fontFamily: "var(--type-data-family)", fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>{m.since}</td>
                <td data-label="" style={{ padding: "var(--space-3) var(--space-5)", borderBottom: "1px solid var(--border-hairline)", textAlign: "right" }}>
                  <IconButton label={"Message " + m.name}
                    onClick={() => { setComposerScope("member:" + m.name); setComposerOpen(true); }}>
                    <MessageSquare style={{ width: 18, height: 18 }} />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {composerOpen ? (
        <NoteComposer
          onClose={() => setComposerOpen(false)}
          recipientOptions={recipientOptions}
          initialScope={composerScope}
        />
      ) : null}
    </div>
  );
}
