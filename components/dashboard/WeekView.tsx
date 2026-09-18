import { Send, Package, CreditCard, Users, Truck, Check, CloudRain, Sprout } from "lucide-react";
import { Card } from "../core/Card";
import { Button } from "../core/Button";
import { Badge } from "../core/Badge";
import { Tag } from "../core/Tag";
import { Stat } from "../core/Stat";
import { Callout } from "../core/Callout";
import type { TagProps } from "../core/Tag";
import type { AssistantDecision } from "./Assistant";

const BOX: { crop: TagProps["crop"]; name: string; qty: string }[] = [
  { crop: "green", name: "Rainbow chard", qty: "1 bunch" },
  { crop: "root", name: "Carrots", qty: "1 lb" },
  { crop: "fruit", name: "Sungold tomatoes", qty: "1 pt" },
  { crop: "allium", name: "Garlic", qty: "2 heads" },
  { crop: "herb", name: "Dill", qty: "1 bunch" },
  { crop: "green", name: "Little gem lettuce", qty: "2 heads" },
];

const TODO = [
  { icon: Package, text: "Publish Tuesday's box", meta: "148 members are waiting on the list", done: false, primary: true },
  { icon: CreditCard, text: "Two payments need a retry", meta: "Jamie R. and the Alvarez household", done: false },
  { icon: Users, text: "Welcome 3 new members", meta: "We already sent their pickup instructions", done: true },
  { icon: Truck, text: "Confirm Tuesday market van", meta: "Bountiful texted Dana yesterday", done: true },
];

export interface WeekViewProps {
  published: boolean;
  onPlan: () => void;
  onPublish: () => void;
  decisions?: AssistantDecision[];
}

export function WeekView({ published, onPlan, onPublish, decisions = [] }: WeekViewProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "var(--space-4)", flexWrap: "wrap" }}>
        <div>
          <h1 style={{ fontSize: "var(--text-2xl)", margin: 0 }}>Morning, Jamie. Week 12 goes out Tuesday.</h1>
          <p style={{ margin: "6px 0 0", color: "var(--text-muted)", fontSize: "var(--text-md)" }}>
            Six things are in the box. Two members need a nudge about money. Everything else is handled.
          </p>
        </div>
        <Button size="lg" iconLeft={<Send style={{ width: 18, height: 18 }} />} onClick={onPublish}>Publish this box</Button>
      </div>

      <div className="dash-stat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--space-4)" }}>
        <Card><Stat label="MEMBERS" value="148" sub="of 160 shares sold" /></Card>
        <Card><Stat label="COLLECTED THIS WEEK" value="$4,218" tone="good" sub="Tuesday and Friday sites" /></Card>
        <Card><Stat label="NEEDS A RETRY" value="$57" tone="bad" sub="2 households" /></Card>
        <Card><Stat label="BOXES TO PACK" value="148" sub="112 barn · 36 market" /></Card>
      </div>

      <div className="dash-two-col" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "var(--space-5)", alignItems: "start" }}>
        <Card eyebrow="WEEK 12 · DRAFT" title="Tuesday's box"
          action={<Button size="sm" variant="outline" onClick={onPlan}>Edit the box</Button>}
          note="last of the garlic — sorry!">
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
            {BOX.map((b) => (
              <div key={b.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-3)", paddingBottom: "var(--space-3)", borderBottom: "1px solid var(--border-hairline)" }}>
                <Tag crop={b.crop}>{b.name}</Tag>
                <span style={{ fontFamily: "var(--type-data-family)", fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>{b.qty}</span>
              </div>
            ))}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-3)" }}>
              <span style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>Members can swap two items until Monday noon.</span>
              {published ? <Badge tone="good">Published</Badge> : <Badge tone="warn">Not published yet</Badge>}
            </div>
          </div>
        </Card>

        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
          <Card eyebrow="NEEDS DOING" title="Four things, two of them already done">
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              {TODO.map((t) => {
                const Icon = t.done ? Check : t.icon;
                return (
                  <div key={t.text} style={{ display: "flex", gap: "var(--space-3)", alignItems: "flex-start" }}>
                    <span style={{
                      width: 30, height: 30, flex: "none", borderRadius: "var(--radius-sm)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: t.done ? "var(--leaf-100)" : t.primary ? "var(--sun-100)" : "var(--surface-sunken)",
                      color: t.done ? "var(--leaf-700)" : "var(--text-body)",
                    }}>
                      <Icon style={{ width: 17, height: 17 }} />
                    </span>
                    <span>
                      <span style={{ display: "block", fontSize: "var(--text-base)", fontWeight: "var(--weight-semibold)", color: t.done ? "var(--text-muted)" : "var(--text-strong)", textDecoration: t.done ? "line-through" : "none" }}>{t.text}</span>
                      <span style={{ display: "block", fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>{t.meta}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>

          <Callout tone="info" title="Rain Monday night"
            icon={<CloudRain style={{ width: 18, height: 18 }} />}
            action={<Button size="sm" variant="quiet">Tell members</Button>}>
            Pickup at the barn may be muddy. We drafted a note you can send in one tap.
          </Callout>

          <Card variant="sunken">
            <div style={{ display: "flex", gap: "var(--space-3)", alignItems: "flex-start" }}>
              <Sprout style={{ width: 20, height: 20, color: "var(--leaf-700)" }} />
              <div>
                <div style={{ fontWeight: "var(--weight-semibold)", color: "var(--text-strong)" }}>12 shares left for the season</div>
                <div style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>Bountiful will email your waitlist of 12 on Friday unless you&apos;d rather it didn&apos;t.</div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {decisions.length > 0 ? (
        <Card eyebrow="ASK BOUNTIFUL" title="Recent decisions">
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
            {decisions.map((d) => (
              <div key={d.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-3)", paddingBottom: "var(--space-3)", borderBottom: "1px solid var(--border-hairline)" }}>
                <span style={{ fontSize: "var(--text-base)", color: "var(--text-strong)" }}>{d.summary}</span>
                <span style={{ fontFamily: "var(--type-data-family)", fontSize: "var(--text-sm)", color: "var(--text-muted)", flex: "none" }}>{d.at}</span>
              </div>
            ))}
          </div>
        </Card>
      ) : null}
    </div>
  );
}
