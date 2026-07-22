import React from "react";
import { CardAttribute } from "./CardAttribute.jsx";

export default {
  title: "Components/Card/Attribute",
  component: CardAttribute,
  parameters: { layout: "padded" },
  argTypes: {
    title: { control: "text" },
    onCopy: { action: "onCopy" },
    className: { control: "text" },
  },
  args: {
    title: "Transaction Details",
  },
};

const attributes = [
  { label: "Transaction ID", value: "a3502840-5a54-4d00-bc26-899d778901ca", copyable: true, columns: 2 },
  {
    label: "Transaction Hash",
    value: "0x3bc9f12f63c2bdcbb0fcd3360c56cf6f67043217f12ebda7d522c53d011de045",
    link: "#",
    columns: 2,
  },
  { label: "Transaction Type", value: "Bank Transfer Out" },
  { label: "Network", value: "Polygon" },
  { label: "Created Date", value: "28 Jun 2023, 15:17", info: true },
  { label: "Completed Date", value: "28 Jun 2023, 15:18", info: true },
  { label: "Details", value: "-", columns: 2 },
];

export const Completed = {
  args: {
    title: "Transaction Details",
    status: { label: "Completed", tone: "positive" },
    attributes,
  },
  decorators: [(S) => <div style={{ maxWidth: 714 }}><S /></div>],
};

export const WithActions = {
  args: {
    title: "Transaction Details",
    status: { label: "Pending", tone: "warning" },
    attributes,
    actions: { onReject: () => {}, onApprove: () => {} },
  },
  decorators: [(S) => <div style={{ maxWidth: 714 }}><S /></div>],
};
