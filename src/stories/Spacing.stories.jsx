import React from "react";
import "./tokens.css";

export default {
  title: "Foundations/Spacing & Elevation",
  parameters: { layout: "padded" },
};

export const SpacingScale = {
  name: "Spacing scale",
  render: () => (
    <div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 16 }}>
        {[4, 8, 12, 16, 24, 32, 40, 64].map((n) => (
          <div key={n} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{ width: n, height: n, background: "#002B2A" }} />
            <div className="tk-meta">{n}</div>
          </div>
        ))}
      </div>
      <p style={{ font: "var(--body-small)", color: "var(--text-secondary)", marginTop: 14 }}>
        4-px base grid. Inline gaps live in the 4–16 range; section gaps 24–64.
      </p>
    </div>
  ),
};

export const Radius = {
  render: () => (
    <div style={{ display: "flex", gap: 20, alignItems: "flex-end" }}>
      {[
        { v: 4, bg: "#00D37E", label: "Sub-details" },
        { v: 8, bg: "#054948", label: "Alert · Card" },
        { v: 12, bg: "#054948", label: "Input · Dialog" },
        { v: 16, bg: "#054948", label: "Panels" },
        { v: 999, bg: "#00D37E", label: "Button · Tag · Badge" },
      ].map((r) => (
        <div key={r.v} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{ width: 96, height: 60, background: r.bg, borderRadius: r.v }} />
          <div style={{ font: "var(--label-medium)" }}>{r.v}</div>
          <div className="tk-meta">{r.label}</div>
        </div>
      ))}
    </div>
  ),
};

export const Shadows = {
  render: () => (
    <div style={{ background: "#F6F7F9", padding: 32, borderRadius: 12 }}>
      <div style={{ display: "flex", gap: 24 }}>
        {[
          { name: "shadow-1", role: "Raised card", shadow: "0 1px 3px 0 rgba(10,13,18,0.10), 0 1px 2px 0 rgba(10,13,18,0.06)" },
          { name: "shadow-2", role: "Menu · popover", shadow: "0 12px 16px -4px rgba(10,13,18,0.08), 0 4px 6px -2px rgba(10,13,18,0.03)" },
          { name: "shadow-3", role: "Dialog", shadow: "0 20px 24px -4px rgba(10,13,18,0.08), 0 8px 8px -4px rgba(10,13,18,0.03)" },
        ].map((s) => (
          <div key={s.name} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <div style={{ width: "100%", height: 88, background: "#fff", borderRadius: 8, boxShadow: s.shadow }} />
            <div style={{ font: "var(--label-medium)" }}>{s.name}</div>
            <div className="tk-meta">{s.role}</div>
          </div>
        ))}
      </div>
    </div>
  ),
  globals: {
    backgrounds: {
      value: "muted"
    }
  },
};
