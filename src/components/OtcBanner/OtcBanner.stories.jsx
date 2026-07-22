import React from "react";
import { OtcBanner } from "./OtcBanner.jsx";

export default {
  title: "Patterns/OTC Banner",
  component: OtcBanner,
  parameters: { layout: "padded" },
  argTypes: {
    title: { control: "text" },
    amount: { control: "text" },
    ctaLabel: { control: "text" },
    href: { control: "text" },
    onCtaClick: { action: "onCtaClick" },
  },
  args: {
    title: "StraitsX OTC Desk",
    amount: "100,000 USD",
    ctaLabel: "Request for a Quote",
  },
  decorators: [(S) => <div style={{ maxWidth: 420 }}><S /></div>],
};

export const Default = {};

export const CustomAmount = {
  args: { amount: "1,000,000 USD" },
};

export const CustomTitle = {
  args: {
    title: "Institutional Liquidity",
    ctaLabel: "Talk to sales",
  },
};
