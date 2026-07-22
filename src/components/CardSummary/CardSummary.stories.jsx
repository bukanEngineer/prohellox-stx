import React from "react";
import { CardSummary } from "./CardSummary.jsx";

export default {
  title: "Components/Card/Summary",
  component: CardSummary,
  parameters: { layout: "centered" },
  argTypes: {
    title: { control: "text" },
    className: { control: "text" },
  },
  args: {
    title: "Transfer Details",
  },
};

export const TransferDetails = {
  args: {
    title: "Transfer Details",
    conversion: {
      from: { label: "SGD" },
      to: { label: "XSGD" },
      note: "Your SGD will be converted 1:1 to XSGD",
    },
    items: [
      { label: "Processing Time", value: "Instant" },
      { label: "Minimum Amount", value: "10 SGD" },
      { label: "Transfer Limit", value: "200,000 SGD" },
      { label: "Transfer Fee", value: "Free", info: true },
    ],
    netAmount: { label: "Net Amount", value: "495 SGD" },
    note: {
      title: "Important Notes:",
      body: "We currently support only selected Singapore banks and do not accept GIRO or SWIFT transfers.",
    },
    button: { label: "I've Transferred", onClick: () => {} },
  },
};

export const Minimal = {
  args: {
    title: "Transfer Details",
    items: [
      { label: "Processing Time", value: "Instant" },
      { label: "Transfer Fee", value: "Free", info: true },
    ],
    netAmount: { label: "Net Amount", value: "495 SGD" },
  },
};
