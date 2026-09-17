"use client";

import * as React from "react";
import { AlertCircle, ChevronDown } from "lucide-react";
import { Button } from "../core/Button";
import { Field } from "../forms/Field";
import { Input } from "../forms/Input";
import { Select } from "../forms/Select";
import { Textarea } from "../forms/Textarea";
import { FIELD_LIMITS, HONEYPOT_FIELD, SHARE_COUNT_OPTIONS } from "@/lib/waitlist";

export interface WaitlistFormProps {
  /** Unique per instance: both forms on the page render the same field names. */
  idPrefix: string;
  /** "card" sits on cream, "dark" on the closing section's deep green. */
  tone?: "card" | "dark";
  /** "inline" keeps email and button on one row where there is width for it. */
  layout?: "stacked" | "inline";
  submitLabel?: string;
}

type Status = "idle" | "submitting" | "done" | "error";

const EMPTY = { email: "", farmName: "", shareCount: "", growingPractices: "", region: "" };

const subscribeNever = () => () => {};

export function WaitlistForm({
  idPrefix,
  tone = "card",
  layout = "stacked",
  submitLabel = "Save my spot",
}: WaitlistFormProps) {
  const dark = tone === "dark";
  const [values, setValues] = React.useState(EMPTY);
  const [honeypot, setHoneypot] = React.useState("");
  const [status, setStatus] = React.useState<Status>("idle");
  const [error, setError] = React.useState("");
  const [detailsOpen, setDetailsOpen] = React.useState(false);
  // False on the server and through the hydrating render, true afterwards.
  // useSyncExternalStore rather than a setState-in-effect, which react-hooks
  // rejects; nothing ever changes, so the subscribe callback is a no-op.
  const hydrated = React.useSyncExternalStore(subscribeNever, () => true, () => false);

  const set = (key: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setValues((prev) => ({ ...prev, [key]: e.target.value }));

  const emailInvalid = status === "error" && !values.email.trim();
  const errorId = `${idPrefix}-error`;
  const detailsId = `${idPrefix}-details`;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    if (!values.email.trim()) {
      setStatus("error");
      setError("Please enter your email address.");
      return;
    }

    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, [HONEYPOT_FIELD]: honeypot }),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!res.ok || !data?.ok) {
        setStatus("error");
        setError(data?.error ?? "Something went wrong on our end. Please try again in a moment.");
        return;
      }
      setStatus("done");
    } catch {
      setStatus("error");
      setError("We couldn't reach the server. Please check your connection and try again.");
    }
  }

  if (status === "done") {
    return (
      <p
        role="status"
        className="landing-sprout"
        style={{
          margin: 0,
          fontFamily: "var(--type-note-family)",
          fontSize: 22,
          lineHeight: 1.3,
          color: dark ? "var(--leaf-100)" : "var(--leaf-700)",
        }}
      >
        You&rsquo;re on the list - talk soon.
      </p>
    );
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}
    >
      {/* Spam guard: off-screen and aria-hidden, so only a bot ever fills it in. */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clipPath: "inset(50%)", whiteSpace: "nowrap" }}
      >
        <label htmlFor={`${idPrefix}-${HONEYPOT_FIELD}`}>Leave this field empty</label>
        <input
          id={`${idPrefix}-${HONEYPOT_FIELD}`}
          name={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div
        className={layout === "inline" ? "landing-form-row" : undefined}
        style={layout === "inline" ? undefined : { display: "flex", flexDirection: "column", gap: "var(--space-3)" }}
      >
        <Field
          className={`landing-form-email${dark ? " landing-field-dark" : ""}`}
          label="Email address"
          htmlFor={`${idPrefix}-email`}
        >
          <Input
            id={`${idPrefix}-email`}
            name="email"
            type="email"
            size="lg"
            autoComplete="email"
            placeholder="you@yourfarm.com"
            maxLength={FIELD_LIMITS.email}
            value={values.email}
            onChange={set("email")}
            invalid={emailInvalid}
            aria-invalid={emailInvalid || undefined}
            aria-describedby={status === "error" ? errorId : undefined}
          />
        </Field>
        <Button
          // Not a submit button until hydration: a press before the React handler
          // exists would otherwise fire a default GET that puts the grower's email
          // in the URL bar, history, and referrer while storing nothing. Switching
          // the type rather than disabling keeps the page's primary call to action
          // from server-rendering greyed out for every visitor.
          type={hydrated ? "submit" : "button"}
          className="landing-form-submit"
          variant="sticker"
          size="lg"
          fullWidth={layout === "stacked"}
          disabled={status === "submitting"}
          style={dark ? { borderColor: "var(--sun-100)", boxShadow: "var(--shadow-sticker-cream)" } : undefined}
        >
          {status === "submitting" ? "Saving..." : submitLabel}
        </Button>
      </div>

      <noscript>
        <p
          style={{
            margin: 0,
            fontSize: "var(--text-sm)",
            lineHeight: "var(--leading-relaxed)",
            color: dark ? "var(--leaf-100)" : "var(--text-muted)",
          }}
        >
          This form needs JavaScript to send. With it switched off, email{" "}
          <a href="mailto:hello@bountifulcsas.com" style={{ color: "inherit" }}>
            hello@bountifulcsas.com
          </a>{" "}
          and we&rsquo;ll add you to the list by hand.
        </p>
      </noscript>

      {status === "error" ? (
        <p
          id={errorId}
          role="alert"
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "var(--space-2)",
            margin: 0,
            fontSize: "var(--text-sm)",
            fontWeight: "var(--weight-semibold)",
            color: dark ? "var(--sun-100)" : "var(--berry-600)",
          }}
        >
          <AlertCircle aria-hidden="true" style={{ width: 16, height: 16, flex: "none", marginTop: 2 }} />
          <span>{error}</span>
        </p>
      ) : null}

      <div>
        <button
          type="button"
          className="landing-disclosure"
          aria-expanded={detailsOpen}
          aria-controls={detailsId}
          onClick={() => setDetailsOpen((open) => !open)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "var(--space-2)",
            background: "none",
            border: "none",
            padding: "var(--space-1) 0",
            cursor: "pointer",
            fontFamily: "var(--type-body-family)",
            fontSize: "var(--text-sm)",
            fontWeight: "var(--weight-semibold)",
            color: dark ? "var(--leaf-100)" : "var(--text-link)",
            textDecoration: "underline",
            textUnderlineOffset: 3,
          }}
        >
          <ChevronDown
            aria-hidden="true"
            style={{
              width: 15,
              height: 15,
              transform: detailsOpen ? "rotate(180deg)" : "none",
              transition: "transform var(--dur-fast) var(--ease-settle)",
            }}
          />
          Tell us about your farm (optional)
        </button>

        {detailsOpen ? (
          <div id={detailsId} className="landing-optional-grid" style={{ marginTop: "var(--space-4)" }}>
            <Field label="Farm name" htmlFor={`${idPrefix}-farm`} className={dark ? "landing-field-dark" : undefined}>
              <Input
                id={`${idPrefix}-farm`}
                name="farmName"
                autoComplete="organization"
                placeholder="Ridgefoot Farm"
                maxLength={FIELD_LIMITS.farmName}
                value={values.farmName}
                onChange={set("farmName")}
              />
            </Field>
            <Field label="Region or state" htmlFor={`${idPrefix}-region`} className={dark ? "landing-field-dark" : undefined}>
              <Input
                id={`${idPrefix}-region`}
                name="region"
                autoComplete="address-level1"
                placeholder="Hudson Valley, NY"
                maxLength={FIELD_LIMITS.region}
                value={values.region}
                onChange={set("region")}
              />
            </Field>
            <Field label="Shares you run (or plan to)" htmlFor={`${idPrefix}-shares`} className={dark ? "landing-field-dark" : undefined}>
              <Select
                id={`${idPrefix}-shares`}
                name="shareCount"
                placeholder="Pick a range"
                options={[...SHARE_COUNT_OPTIONS]}
                value={values.shareCount}
                onChange={set("shareCount")}
              />
            </Field>
            <Field
              className={`landing-optional-wide${dark ? " landing-field-dark" : ""}`}
              label="How do you grow?"
              hint="No-spray, certified organic, pasture-raised, how you treat the soil - however you'd say it."
              htmlFor={`${idPrefix}-practices`}
            >
              <Textarea
                id={`${idPrefix}-practices`}
                name="growingPractices"
                rows={3}
                maxLength={FIELD_LIMITS.growingPractices}
                value={values.growingPractices}
                onChange={set("growingPractices")}
              />
            </Field>
          </div>
        ) : null}
      </div>
    </form>
  );
}
