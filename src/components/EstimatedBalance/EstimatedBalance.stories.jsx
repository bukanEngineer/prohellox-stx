import React from "react";
import { EstimatedBalance } from "./EstimatedBalance.jsx";

export default {
  title: "Patterns/Estimated Balance",
  component: EstimatedBalance,
  parameters: { layout: "padded" },
  argTypes: {
    label: { control: "text" },
    amount: { control: "text" },
    currency: { control: "text" },
    showInfo: { control: "boolean" },
  },
  args: {
    label: "Estimated Balance",
    amount: "2,081.23",
    currency: "SGD",
    showInfo: true,
  },
};

export const Default = {};

export const USD = { args: { amount: "1,452,990.00", currency: "USD" } };

export const NoInfo = { args: { showInfo: false } };
