import React from "react";
import { CardChecklist } from "./CardChecklist.jsx";

export default {
  title: "Components/Card/Checklist",
  component: CardChecklist,
  parameters: { layout: "padded" },
  argTypes: {
    title: { control: "text" },
    active: { control: "text" },
    progress: { control: { type: "range", min: 0, max: 100, step: 1 } },
    className: { control: "text" },
    onTabChange: { action: "onTabChange" },
  },
  args: {
    title: "Start your journey with StraitsX",
    progress: 0,
  },
};

const tabs = [
  { value: "buy", label: "Buy Stablecoin" },
  { value: "sell", label: "Sell Stablecoin" },
];

export const Buy = {
  args: {
    title: "Start your journey with StraitsX",
    tabs,
    active: "buy",
    progress: 40,
    items: [
      { title: "Verify your identity to unlock transfers.", status: "done", linkText: "Learn how", onLink: () => {} },
      {
        title: "Transfer from your bank and receive XSGD or XUSD instantly at 1:1.",
        status: "active",
        linkText: "Learn how",
        onLink: () => {},
      },
      { title: "Swap into the stablecoin you need.", status: "locked", linkText: "Learn how" },
    ],
  },
  decorators: [(S) => <div style={{ maxWidth: 808 }}><S /></div>],
};

export const Sell = {
  args: {
    title: "Start your journey with StraitsX",
    tabs,
    active: "sell",
    progress: 67,
    items: [
      { title: "Whitelist your blockchain address.", status: "done", linkText: "Learn how", onLink: () => {} },
      {
        title: "Transfer in stablecoin from your whitelisted blockchain address.",
        status: "active",
        linkText: "Learn how",
        onLink: () => {},
      },
      { title: "Withdraw to your bank account.", status: "locked", linkText: "Learn how" },
    ],
  },
  decorators: [(S) => <div style={{ maxWidth: 808 }}><S /></div>],
};
