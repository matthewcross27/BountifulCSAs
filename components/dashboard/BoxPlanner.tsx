"use client";

import * as React from "react";
import { Send, Plus } from "lucide-react";
import { Card } from "../core/Card";
import { Button } from "../core/Button";
import { Tag } from "../core/Tag";
import type { TagProps } from "../core/Tag";
import { Badge } from "../core/Badge";
import { Stepper } from "../forms/Stepper";
import { Switch } from "../forms/Switch";
import { Input } from "../forms/Input";

const HARVEST: { crop: TagProps["crop"]; name: string; unit: string; start: number }[] = [
  { crop: "green", name: "Rainbow chard", unit: "bunch", start: 1 },
  { crop: "root", name: "Carrots", unit: "lb", start: 1 },
  { crop: "fruit", name: "Sungold tomatoes", unit: "pt", start: 1 },
  { crop: "allium", name: "Garlic", unit: "heads", start: 2 },
  { crop: "herb", name: "Dill", unit: "bunch", start: 1 },
  { crop: "green", name: "Little gem lettuce", unit: "heads", start: 2 },
  { crop: "root", name: "New potatoes", unit: "lb", start: 0 },
  { crop: "pantry", name: "Cornmeal", unit: "bag", start: 0 },
];

export interface BoxPlannerProps {
  onPublish: () => void;
}

export function BoxPlanner({ onPublish }: BoxPlannerProps) {
  const [qty, setQty] = React.useState<Record<string, number>>(() =>
    Object.fromEntries(HARVEST.map((h) => [h.name, h.start]))
  );
  const [auto, setAuto] = React.useState(true);
  const inBox = HARVEST.filter((h) => qty[h.name] > 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "var(--space-4)", flexWrap: "wrap" }}>
        <div>
          <h1 style={{ fontSize: "var(--text-2xl)", margin: 0 }}>Build Tuesday&apos;s box</h1>
          <p style={{ margin: "6px 0 0", color: "var(--text-muted)", fontSize: "var(--text-md)" }}>
            Set a quantity, or leave it at zero to keep something out of the box this week.
          </p>
        </div>
        <div style={{ display: "flex", gap: "var(--space-3)", alignItems: "center" }}>
          <Badge tone="warn">Draft</Badge>
          <Button onClick={onPublish} iconLeft={<Send style={{ width: 18, height: 18 }} />}>Publish this box</Button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "var(--space-5)", alignItems: "start" }}>
        <Card eyebrow="LOGGED AT HARVEST" title="What came out of the field">
          <div style={{ display: "flex", flexDirection: "column" }}>
            {HARVEST.map((h) => (
              <div key={h.name} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-4)",
                padding: "var(--space-3) 0", borderBottom: "1px solid var(--border-hairline)",
                opacity: qty[h.name] > 0 ? 1 : 0.6,
              }}>
                <Tag crop={h.crop}>{h.name}</Tag>
                <Stepper value={qty[h.name]} unit={h.unit} onChange={(v) => setQty({ ...qty, [h.name]: v })} />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginTop: "var(--space-4)", padding: "var(--space-4)", border: "var(--rule-twine)", borderRadius: "var(--radius-md)" }}>
            <Plus style={{ width: 18, height: 18, color: "var(--text-faint)" }} />
            <Input placeholder="Add something you didn't log — e.g. sorrel" onChange={() => {}} style={{ flex: 1, border: "none", background: "transparent" }} />
          </div>
        </Card>

        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
          <Card variant="sticker" title="What members will see" style={{ transform: "rotate(-0.5deg)" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
              {inBox.map((h) => <Tag key={h.name} crop={h.crop}>{h.name} · {qty[h.name]} {h.unit}</Tag>)}
            </div>
            <p style={{ fontFamily: "var(--type-note-family)", fontSize: 22, color: "var(--clay-600)", margin: "var(--space-4) 0 0" }}>
              {inBox.length} things — a good week
            </p>
          </Card>

          <Card title="Let Bountiful handle it">
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              <Switch checked={auto} onChange={() => setAuto(!auto)}
                label="Publish the box automatically" hint="Sunday night, from what you logged at harvest." />
              <Switch checked onChange={() => {}} label="Let members swap two items" hint="Swaps close Monday at noon." />
              <Switch checked onChange={() => {}} label="Write the weekly note for me" hint="You can edit it before it sends." />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
