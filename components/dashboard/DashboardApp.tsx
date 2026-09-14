"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Shell } from "./Shell";
import type { ViewId } from "./Shell";
import { WeekView } from "./WeekView";
import { BoxPlanner } from "./BoxPlanner";
import { Roster } from "./Roster";
import { Money } from "./Money";
import { Payments } from "./Payments";
import { Assistant } from "./Assistant";
import type { AssistantDecision } from "./Assistant";
import { Card } from "../core/Card";
import { Callout } from "../core/Callout";
import { Button } from "../core/Button";
import { Dialog } from "../overlay/Dialog";

const VIEW_IDS: ViewId[] = ["week", "box", "members", "money", "payments", "farmstore", "season"];

export function DashboardApp() {
  const searchParams = useSearchParams();
  const requestedView = searchParams.get("view");
  const initialView = VIEW_IDS.includes(requestedView as ViewId) ? (requestedView as ViewId) : "week";
  const [view, setView] = React.useState<ViewId>(initialView);
  const [assistant, setAssistant] = React.useState(false);
  const [publishing, setPublishing] = React.useState(false);
  const [published, setPublished] = React.useState(false);
  const [decisions, setDecisions] = React.useState<AssistantDecision[]>([]);

  const logDecision = (entry: AssistantDecision) => setDecisions((prev) => [entry, ...prev]);

  const screen =
    view === "box" ? <BoxPlanner onPublish={() => setPublishing(true)} /> :
    view === "members" ? <Roster onNote={() => setAssistant(true)} /> :
    view === "money" ? <Money /> :
    view === "payments" ? <Payments /> :
    view === "farmstore" || view === "season" ? (
      <Card variant="sunken" title={view === "farmstore" ? "Farmstore" : "Season recap"}>
        <p style={{ margin: 0, color: "var(--text-muted)" }}>
          Not drawn yet — this surface wasn&apos;t part of the brief. Ask and I&apos;ll build it from the same parts.
        </p>
      </Card>
    ) :
    <WeekView onPlan={() => setView("box")} onPublish={() => setPublishing(true)} decisions={decisions} />;

  return (
    <>
      <Shell view={view} onView={setView} onHelp={() => setAssistant(true)}>
        {published ? (
          <div style={{ marginBottom: "var(--space-5)" }}>
            <Callout tone="good" title="Week 12 is out"
              icon={<CheckCircle2 style={{ width: 18, height: 18 }} />}
              action={<Button size="sm" variant="quiet" onClick={() => setPublished(false)}>Dismiss</Button>}>
              148 members got the list. You can still edit it until Monday noon.
            </Callout>
          </div>
        ) : null}
        {screen}
      </Shell>

      <Dialog open={publishing} onClose={() => setPublishing(false)} eyebrow="WEEK 12" title="Publish Tuesday's box?"
        footer={<>
          <Button variant="quiet" onClick={() => setPublishing(false)}>Not yet</Button>
          <Button onClick={() => { setPublishing(false); setPublished(true); }}>Publish</Button>
        </>}>
        148 members will get the list tonight at 6pm. You can still edit it until Monday noon.
      </Dialog>

      {assistant ? <Assistant onClose={() => setAssistant(false)} onDecision={logDecision} /> : null}
    </>
  );
}
