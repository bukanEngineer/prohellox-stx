import React from "react";
import { CardSteps } from "./CardSteps.jsx";

export default {
  title: "Components/Card/Steps",
  component: CardSteps,
  parameters: { layout: "padded" },
  argTypes: {
    step: { control: { type: "number", min: 1, max: 10, step: 1 } },
    title: { control: "text" },
    helperText: { control: "text" },
    className: { control: "text" },
  },
  args: {
    step: 1,
    title: "Select Transfer Method",
  },
};

export const SelectionBox = {
  render: () => (
    <div style={{ maxWidth: 600 }}>
      <CardSteps step={1} title="Select Transfer Method" helperText="Your USD will be converted 1:1 for XUSD">
        <CardSteps.Options
          selected="blockchain"
          onSelect={() => {}}
          options={[
            { id: "blockchain", label: "Blockchain Transfer", icon: "account_balance" },
            { id: "bank", label: "Bank Transfer", icon: "account_balance" },
          ]}
        />
      </CardSteps>
    </div>
  ),
};

export const PlainContent = {
  render: () => (
    <div style={{ maxWidth: 600 }}>
      <CardSteps step={2} title="Enter Recipient Details">
        <p style={{ font: "var(--body-medium)", color: "var(--text-secondary)", margin: 0 }}>
          Provide the recipient&apos;s bank account information to continue.
        </p>
      </CardSteps>
    </div>
  ),
};
