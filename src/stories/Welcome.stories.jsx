import React from "react";
import { Logomark } from "../components/Logomark/Logomark.jsx";

export default {
  title: "Introduction",
  parameters: {
    layout: "fullscreen",
    options: { showPanel: false },
  },
};

const Pre = ({ children }) => (
  <pre
    style={{
      font: "13px/1.55 var(--font-mono)",
      background: "#F6F7F9",
      border: "1px solid var(--border)",
      borderRadius: 8,
      padding: 16,
      margin: "12px 0 24px",
      overflowX: "auto",
    }}
  >
    {children}
  </pre>
);

const Section = ({ title, children }) => (
  <section style={{ marginTop: 32 }}>
    <h2 style={{ font: "var(--title-large)", color: "#002B2A", margin: "0 0 8px" }}>{title}</h2>
    {children}
  </section>
);

export const Welcome = {
  render: () => (
    <div style={{ maxWidth: 820, padding: "48px 56px", color: "#002B2A" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
        <Logomark size={56} />
        <div>
          <div style={{ font: "var(--label-medium)", color: "#054948", textTransform: "uppercase", letterSpacing: "0.12em" }}>
            Design System
          </div>
          <h1 style={{ font: "700 36px/1.1 var(--font-display)", margin: "4px 0 0", letterSpacing: "-0.01em" }}>
            StraitsX
          </h1>
        </div>
      </div>

      <p style={{ font: "var(--body-large)", color: "var(--text-secondary)", margin: 0 }}>
        A React + plain-CSS design system rebuilt from the official StraitsX brand guidelines and the internal{" "}
        <strong>FDS 3</strong> Figma file. This Storybook is the canonical view of every token and component
        shipped from the package; <strong>Chromatic</strong> runs against it on every pull request to catch
        unintended visual regressions.
      </p>

      <Section title="What's inside">
        <ul style={{ font: "var(--body-medium)", color: "var(--text-primary)", paddingLeft: 20, lineHeight: 1.7 }}>
          <li><strong>Tokens</strong> — colours (primary, secondary, stablecoin, semantic, surface), typography, spacing, radii, elevation.</li>
          <li><strong>Components</strong> — Button, Tag, Input, Card, EmptyState.</li>
          <li><strong>Composition</strong> — Sidebar, TopNavigation, OtcBanner.</li>
          <li><strong>Examples</strong> — the full Personal Account dashboard, composed from the above.</li>
        </ul>
      </Section>

      <Section title="Using the package">
        <Pre>{`import "prohellox-designsystem/global.css";
import { Button, Tag, Card } from "prohellox-designsystem";

export default function Example() {
  return (
    <Card shadow={1} title="Welcome">
      <Tag tone="positive">Verified</Tag>
      <Button variant="primary">Continue</Button>
    </Card>
  );
}`}</Pre>
        <p style={{ font: "var(--body-medium)", color: "var(--text-secondary)" }}>
          All components consume CSS custom properties (<code style={{ fontFamily: "var(--font-mono)" }}>--*</code>).
          Override them in your own stylesheet to re-theme without forking.
        </p>
      </Section>

      <Section title="Brand voice — quick reference">
        <ul style={{ font: "var(--body-medium)", color: "var(--text-primary)", paddingLeft: 20, lineHeight: 1.7 }}>
          <li>Plain, confident, security-first. Sentence case. No emoji.</li>
          <li><strong style={{ color: "#00D37E" }}>Vibrant Green</strong> #00D37E for highlights;{" "}
            <strong style={{ color: "#054948" }}>Secure Teal</strong> #054948 and{" "}
            <strong style={{ color: "#002B2A" }}>Stable Deep Ivy</strong> #002B2A for structure and text.
          </li>
          <li>Red Hat Display Bold for headings / labels / buttons. Hanken Grotesk for body. Red Hat Mono for numerics.</li>
          <li>Pill buttons (radius 999), 8-px cards, 12-px inputs. Material Symbols Rounded for icons.</li>
        </ul>
      </Section>
    </div>
  ),
};
