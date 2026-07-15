import React from "react";
import { FieldBlockchain } from "./FieldBlockchain.jsx";

export default {
  title: "Components/Field/Blockchain",
  component: FieldBlockchain,
  args: { disabled: false },
  parameters: { layout: "padded" },
  decorators: [(S) => <div style={{ maxWidth: 400, minHeight: 420 }}><S /></div>],
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

const wallets = [
  { value: "mm", name: "Metamask", address: "0x934ddab12av012345c1ertf897fec124f2gyb1", logo: mark("M", "var(--status-warning)") },
  {
    value: "w2", name: "Wallet 2", address: "0x934ddab12av012345c1ertf897fec124f2gyb1",
    logo: mark("W", "var(--text-secondary)"),
    status: { label: "Pending", variant: "warning" },
  },
  {
    value: "w3", name: "Wallet 3", address: "0x934ddab12av012345c1ertf897fec124f2gyb1",
    logo: mark("W", "var(--text-secondary)"),
    action: { label: "Verify", onClick: () => {} },
  },
];

export const Unfilled = {
  args: { options: wallets, addAction: { label: "Add Wallet", onClick: () => {} } },
};
export const Filled = {
  args: { options: wallets, defaultValue: "mm", addAction: { label: "Add Wallet", onClick: () => {} } },
};
export const WithHelper = {
  args: { options: wallets, defaultValue: "mm", helper: "Tokens will be sent to this wallet address." },
};
export const Error = {
  args: { options: wallets, error: "Select a verified wallet." },
};
export const Disabled = {
  args: { options: wallets, defaultValue: "mm", disabled: true },
};
export const InitialsFallback = {
  args: { options: wallets.map(({ logo, ...w }) => w), defaultValue: "mm" },
};
