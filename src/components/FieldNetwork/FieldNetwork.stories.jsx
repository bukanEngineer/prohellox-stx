import React from "react";
import { FieldNetwork } from "./FieldNetwork.jsx";

export default {
  title: "Patterns/Field/Network",
  component: FieldNetwork,
  args: { disabled: false },
  parameters: { layout: "padded" },
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    helper: { control: "text" },
    error: { control: "text" },
    disabled: { control: "boolean" },
    onChange: { action: "onChange" },
  },
  decorators: [(S) => <div style={{ maxWidth: 400, minHeight: 360 }}><S /></div>],
};

const mark = (label, bg) => (
  <span
    style={{
      width: 24, height: 24, borderRadius: 999, background: bg, color: "#fff",
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      font: "var(--label-small)",
    }}
  >
    {label}
  </span>
);

const networks = [
  { value: "eth", name: "Ethereum", logo: mark("E", "var(--status-information)") },
  { value: "bsc", name: "BNB Smart Chain", logo: mark("B", "var(--status-warning)") },
  { value: "polygon", name: "Polygon", logo: mark("P", "#8247e5") },
  { value: "solana", name: "Solana", logo: mark("S", "var(--text-primary)"), tag: { label: "New", variant: "positive" } },
];

export const Unfilled = { args: { options: networks } };
export const Filled = { args: { options: networks, defaultValue: "eth" } };
export const WithHelper = { args: { options: networks, helper: "Select the network for this transfer." } };
export const Error = { args: { options: networks, error: "Please select a network." } };
export const Disabled = { args: { options: networks, defaultValue: "eth", disabled: true } };
export const InitialsFallback = { args: { options: networks.map(({ logo, ...n }) => n), defaultValue: "bsc" } };
