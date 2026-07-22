import React from "react";
import { ImportantNotes } from "./ImportantNotes.jsx";

export default {
  title: "Components/Important Notes",
  component: ImportantNotes,
  parameters: { layout: "padded" },
  decorators: [(S) => <div style={{ maxWidth: 720 }}><S /></div>],
  argTypes: {
    tone: { control: "select", options: ["neutral", "warning", "critical", "positive"] },
    title: { control: "text" },
    className: { control: "text" },
  },
  args: {
    tone: "neutral",
    title: "Important",
  },
};

export const Regulatory = {
  args: {
    tone: "neutral",
    title: "Important Risk Warnings Regarding Digital Payment Tokens",
    children: (
      <>
        Cryptocurrency and digital payment tokens are highly volatile. You may lose all the money you put into them.
        StraitsX is regulated by the Monetary Authority of Singapore under the Payment Services Act.
      </>
    ),
  },
};

export const KycReminder = {
  args: {
    tone: "warning",
    title: "Verify your account",
    children: "Until verification is complete, your transaction limits are restricted to S$1,000 per month.",
  },
};

export const WithoutTitle = {
  args: {
    tone: "neutral",
    title: null,
    children: "This callout omits the title and renders body content only.",
  },
};
