import React from "react";
import { DropdownNetwork } from "./DropdownNetwork.jsx";

export default {
  title: "Patterns/Dropdown/Network",
  component: DropdownNetwork,
  parameters: { layout: "padded" },
  decorators: [(S) => <div style={{ maxWidth: 328 }}><S /></div>],
  argTypes: {
    value: { control: "text" },
    className: { control: "text" },
    onSelect: { action: "onSelect" },
  },
  args: {
    value: "eth",
  },
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
  { value: "polygon", name: "Polygon", logo: mark("P", "#8247e5") },
  { value: "arbitrum", name: "Arbitrum", logo: mark("A", "#2d374b") },
  { value: "bsc", name: "BNB Smart Chain", logo: mark("B", "var(--status-warning)") },
];

export const Default = { args: { options: networks, value: "eth" } };

export const WithNewTag = {
  args: {
    value: "eth",
    options: [
      ...networks,
      { value: "solana", name: "Solana", logo: mark("S", "var(--text-primary)"), tag: { label: "New", variant: "positive" } },
    ],
  },
};

export const WithSecondary = {
  args: {
    value: "eth",
    options: [
      { value: "eth", name: "Ethereum", secondary: "Last Used", logo: mark("E", "var(--status-information)") },
      { value: "polygon", name: "Polygon", logo: mark("P", "#8247e5") },
    ],
  },
};

export const InitialsFallback = {
  args: { value: "eth", options: networks.map(({ logo, ...n }) => n) },
};
