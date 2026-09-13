"use client";

import * as React from "react";

export interface TabItem { value: string; label: string; count?: number }

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  tabs: Array<string | TabItem>;
  value: string;
  onChange: (next: string) => void;
}

export function Tabs({ tabs = [], value, onChange, style, ...rest }: TabsProps) {
  return (
    <div role="tablist" style={{
      display: "flex", gap: "var(--space-1)", alignItems: "flex-end",
      borderBottom: "1px solid var(--border-hairline)", ...style,
    }} {...rest}>
      {tabs.map((t) => {
        const tab = typeof t === "string" ? { value: t, label: t } : t;
        const active = tab.value === value;
        return (
          <button
            key={tab.value} role="tab" aria-selected={active} type="button"
            onClick={() => onChange && onChange(tab.value)}
            style={{
              border: "none", background: "transparent", cursor: "pointer",
              padding: "var(--space-3) var(--space-4)",
              fontFamily: "var(--type-body-family)", fontSize: "var(--text-base)",
              fontWeight: active ? "var(--weight-bold)" : "var(--weight-medium)",
              color: active ? "var(--text-strong)" : "var(--text-muted)",
              borderBottom: "3px solid " + (active ? "var(--clay-600)" : "transparent"),
              marginBottom: -1,
              display: "flex", alignItems: "center", gap: 7,
              transition: "color var(--dur-fast) var(--ease-settle)",
            }}
          >
            {tab.label}
            {tab.count != null ? (
              <span style={{
                fontFamily: "var(--type-data-family)", fontSize: "var(--text-2xs)",
                background: active ? "var(--clay-100)" : "var(--surface-sunken)",
                color: active ? "var(--clay-700)" : "var(--text-muted)",
                borderRadius: "var(--radius-pill)", padding: "2px 7px",
              }}>{tab.count}</span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
