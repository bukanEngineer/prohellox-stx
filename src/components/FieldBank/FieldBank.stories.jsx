import React from "react";
import { FieldBank } from "./FieldBank.jsx";

export default {
  title: "Components/Field/Bank",
  component: FieldBank,
  args: { disabled: false },
  parameters: { layout: "padded" },
  decorators: [(S) => <div style={{ maxWidth: 400, minHeight: 420 }}><S /></div>],
};

const bankLogo = (label, bg) => (
  <span
    style={{
      minWidth: 44, height: 24, padding: "0 6px", borderRadius: 4, background: bg,
      color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center",
      font: "var(--label-small)",
    }}
  >
    {label}
  </span>
);

const banks = [
  { value: "dbs", name: "John Doe", account: "DBS - 0053105977213", swift: "DBSSSGSG", logo: bankLogo("DBS", "#ed1c24") },
  { value: "uob", name: "John Doe", account: "UOB - 0053105977203", logo: bankLogo("UOB", "#005baa") },
  {
    value: "ocbc", name: "John Doe", account: "OCBC - 0053105977199",
    logo: bankLogo("OCBC", "#e30613"),
    status: { label: "Rejected", variant: "critical" },
    action: { label: "Resubmit", onClick: () => {} },
    disabled: true,
  },
];

export const Unfilled = {
  args: { options: banks, addAction: { label: "Add Account", onClick: () => {} } },
};
export const Filled = {
  args: { options: banks, defaultValue: "dbs", addAction: { label: "Add Account", onClick: () => {} } },
};
export const WithHelper = {
  args: { options: banks, defaultValue: "dbs", helper: "Funds will be sent to this account." },
};
export const Error = {
  args: { options: banks, error: "Select a verified bank account." },
};
export const Disabled = {
  args: { options: banks, defaultValue: "dbs", disabled: true },
};
export const InitialsFallback = {
  args: { options: banks.map(({ logo, ...b }) => b), defaultValue: "uob" },
};
