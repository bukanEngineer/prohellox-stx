import React from "react";
import { DropdownBank } from "./DropdownBank.jsx";
import { AssetMark } from "../AssetMark/AssetMark.jsx";

export default {
  title: "Patterns/Dropdown/Bank",
  component: DropdownBank,
  parameters: { layout: "padded" },
  decorators: [(S) => <div style={{ maxWidth: 328 }}><S /></div>],
  argTypes: {
    value: { control: "text" },
    className: { control: "text" },
    onSelect: { action: "onSelect" },
  },
  args: {
    value: "dbs",
  },
};

const banks = [
  { value: "dbs", name: "DBS Bank", logo: <AssetMark label="DBS" color="var(--brand-secure-teal)" size={24} /> },
  { value: "uob", name: "UOB", logo: <AssetMark label="UOB" color="var(--brand-credible-blue)" size={24} /> },
  { value: "scb", name: "Standard Chartered", logo: <AssetMark label="SC" color="var(--status-positive)" size={24} /> },
  { value: "ocbc", name: "OCBC", logo: <AssetMark label="OC" color="var(--brand-wealthy-gold)" size={24} /> },
];

export const Default = { args: { options: banks, value: "dbs" } };

export const WithAccountNumbers = {
  args: {
    value: "dbs",
    options: banks.map((b, i) => ({
      ...b,
      account: ["•••• 1234", "•••• 9981", "•••• 4420", "•••• 0073"][i],
    })),
  },
};

export const WithStatus = {
  args: {
    value: "dbs",
    options: [
      { value: "dbs", name: "DBS Bank", account: "•••• 1234", logo: <AssetMark label="DBS" color="var(--brand-secure-teal)" size={24} />, tag: { label: "Verified", variant: "positive" } },
      { value: "uob", name: "UOB", account: "•••• 9981", logo: <AssetMark label="UOB" color="var(--brand-credible-blue)" size={24} />, tag: { label: "Pending", variant: "warning" } },
    ],
  },
};

export const InitialsFallback = {
  args: { value: "dbs", options: banks.map(({ logo, ...b }) => b) },
};
