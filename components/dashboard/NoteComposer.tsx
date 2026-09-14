"use client";

import * as React from "react";
import { CheckCircle2 } from "lucide-react";
import { Dialog } from "../overlay/Dialog";
import { Field } from "../forms/Field";
import { Select } from "../forms/Select";
import type { SelectOption } from "../forms/Select";
import { Input } from "../forms/Input";
import { Button } from "../core/Button";
import { Callout } from "../core/Callout";

export interface NoteComposerProps {
  onClose: () => void;
  recipientOptions: SelectOption[];
  initialScope: string;
}

export function NoteComposer({ onClose, recipientOptions, initialScope }: NoteComposerProps) {
  const [scope, setScope] = React.useState(initialScope);
  const [subject, setSubject] = React.useState("");
  const [body, setBody] = React.useState("");
  const [sent, setSent] = React.useState(false);

  const recipientLabel = recipientOptions.find((o) => o.value === scope)?.label ?? "";

  const handleClose = () => {
    onClose();
  };

  const handleSend = () => {
    setSent(true);
  };

  return (
    <Dialog
      open
      onClose={handleClose}
      eyebrow="MEMBERS"
      title={sent ? "Note sent" : "Send a note"}
      footer={
        sent ? (
          <Button onClick={handleClose}>Done</Button>
        ) : (
          <>
            <Button variant="quiet" onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSend} disabled={!body.trim()}>Send note</Button>
          </>
        )
      }
    >
      {sent ? (
        <Callout tone="good" icon={<CheckCircle2 style={{ width: 18, height: 18 }} />}>
          Your note is on its way to {recipientLabel.toLowerCase()}.
        </Callout>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          <Field label="Send to" htmlFor="note-scope">
            <Select
              id="note-scope"
              value={scope}
              onChange={(e) => setScope(e.target.value)}
              options={recipientOptions}
            />
          </Field>
          <Field label="Subject" htmlFor="note-subject">
            <Input
              id="note-subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. This week's pickup time"
            />
          </Field>
          <Field label="Message" htmlFor="note-body" required>
            <textarea
              id="note-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your note..."
              rows={6}
              style={{
                width: "100%",
                resize: "vertical",
                padding: "var(--space-3)",
                background: "var(--paper-000)",
                border: "1.5px solid var(--border-default)",
                borderRadius: "var(--radius-md)",
                fontFamily: "var(--type-body-family)",
                fontSize: "var(--text-base)",
                color: "var(--text-strong)",
                outline: "none",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "var(--leaf-600)";
                e.currentTarget.style.boxShadow = "var(--ring-focus)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "var(--border-default)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </Field>
        </div>
      )}
    </Dialog>
  );
}
