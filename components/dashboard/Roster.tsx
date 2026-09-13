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

const MEMBERS: { name: string; share: string; site: string; status: [NonNullable<BadgeProps["tone"]>, string]; since: string }[] = [
  { name: "Dana Whitfield", share: "Full · weekly", site: "Ridgefoot barn", status: ["good", "Paid through October"], since: "2021" },
  { name: "The Alvarez household", share: "Full · biweekly", site: "Tuesday market", status: ["bad", "Card declined"], since: "2024" },
  { name: "Marcus Pell", share: "Half · weekly", site: "Ridgefoot barn", status: ["good", "Paid in full"], since: "2019" },
  { name: "Nour Haddad", share: "Full · weekly", site: "Home delivery", status: ["warn", "Payment plan · 3 left"], since: "2026" },
  { name: "Ruthie Kane", share: "Half · weekly", site: "Tuesday market", status: ["good", "Sliding scale · $19"], since: "2023" },
  { name: "Owen Baptiste", share: "Full · weekly", site: "Ridgefoot barn", status: ["info", "Vacation hold · 2 wks"], since: "2022" },
];

export interface RosterProps {
  onNote: () => void;
}

export function Roster({ onNote }: RosterProps) {
  const [tab, setTab] = React.useState("members");
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
          <Button onClick={onNote} iconLeft={<Mail style={{ width: 18, height: 18 }} />}>Send a note</Button>
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

        <div style={{ padding: "var(--space-4) var(--space-5)", display: "flex", gap: "var(--space-3)", alignItems: "center" }}>
          <Input placeholder="Find a household" onChange={() => {}} style={{ maxWidth: 280 }} />
          <span style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>Showing 6 of 148</span>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "var(--text-base)" }}>
          <thead>
            <tr>
              {["Household", "Share", "Pickup", "Money", "Member since", ""].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "var(--space-3) var(--space-5)", background: "var(--surface-sunken)", fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "var(--tracking-stamp)", color: "var(--text-muted)", fontWeight: "var(--weight-bold)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MEMBERS.map((m) => (
              <tr key={m.name}>
                <td style={{ padding: "var(--space-4) var(--space-5)", borderBottom: "1px solid var(--border-hairline)", fontWeight: "var(--weight-semibold)", color: "var(--text-strong)" }}>{m.name}</td>
                <td style={{ padding: "var(--space-4) var(--space-5)", borderBottom: "1px solid var(--border-hairline)", color: "var(--text-body)" }}>{m.share}</td>
                <td style={{ padding: "var(--space-4) var(--space-5)", borderBottom: "1px solid var(--border-hairline)", color: "var(--text-body)" }}>{m.site}</td>
                <td style={{ padding: "var(--space-4) var(--space-5)", borderBottom: "1px solid var(--border-hairline)" }}><Badge tone={m.status[0]}>{m.status[1]}</Badge></td>
                <td style={{ padding: "var(--space-4) var(--space-5)", borderBottom: "1px solid var(--border-hairline)", fontFamily: "var(--type-data-family)", fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>{m.since}</td>
                <td style={{ padding: "var(--space-3) var(--space-5)", borderBottom: "1px solid var(--border-hairline)", textAlign: "right" }}>
                  <IconButton label={"Message " + m.name}><MessageSquare style={{ width: 18, height: 18 }} /></IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
