import React from "react";
import { MultiSelect } from "./MultiSelect.jsx";

export default {
  title: "Components/Multi Select",
  component: MultiSelect,
  args: { disabled: false },
  parameters: { layout: "padded" },
  decorators: [(S) => <div style={{ maxWidth: 360, minHeight: 360 }}><S /></div>],
};

const networks = [
  { value: "eth", label: "Ethereum" },
  { value: "polygon", label: "Polygon" },
  { value: "arbitrum", label: "Arbitrum" },
  { value: "base", label: "Base" },
  { value: "solana", label: "Solana", disabled: true },
];

export const Default = { args: { label: "Supported networks", options: networks, placeholder: "Select networks" } };
export const WithValue = { args: { label: "Supported networks", options: networks, defaultValue: ["eth", "base"] } };
export const WithHelper = { args: { label: "Supported networks", options: networks, helper: "Choose one or more networks for this asset." } };
export const Error = { args: { label: "Supported networks", options: networks, error: "Select at least one network." } };
export const Disabled = { args: { label: "Supported networks", options: networks, defaultValue: ["eth"], disabled: true } };
