import React from "react";
import { HorizontalSteps, VerticalSteps, BadgeSteps } from "./Steps.jsx";

export default {
  title: "Components/Steps",
  component: HorizontalSteps,
  parameters: { layout: "padded" },
  argTypes: {
    total: { control: { type: "number", min: 2, max: 7 } },
    current: { control: { type: "number", min: 1 } },
    showCount: { control: "boolean" },
    label: { control: "text" },
  },
  args: {
    total: 3,
    current: 1,
    showCount: true,
    label: "Text",
  },
};

export const Horizontal = {
  args: { total: 7, current: 4, label: "Questions" },
};

export const HorizontalStepCounts = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {[2, 3, 4, 5, 6, 7].map((n) => (
        <HorizontalSteps key={n} total={n} current={Math.ceil(n / 2)} label="Text" />
      ))}
    </div>
  ),
};

const historyItems = [
  { title: "Request Resolved", timestamp: "19 Feb 2025 | 03:46", status: "completed" },
  { title: "Under Review by StraitsX", timestamp: "19 Feb 2025 | 03:46", status: "completed" },
  { title: "Information submitted by “agent name/email”", timestamp: "19 Feb 2025 | 03:46", status: "completed" },
  { title: "Awaiting Response", timestamp: "19 Feb 2025 | 03:46", status: "active" },
  { title: "Request Created", timestamp: "19 Feb 2025 | 03:46", status: "inactive" },
];

export const Vertical = {
  render: () => <VerticalSteps items={historyItems} />,
};

export const VerticalFailed = {
  render: () => (
    <VerticalSteps
      items={[
        { title: "Request Resolved", timestamp: "19 Feb 2025 | 03:46", status: "completed" },
        { title: "Verification Failed", timestamp: "19 Feb 2025 | 03:46", status: "failed", note: "Document image was unreadable" },
        { title: "Request Created", timestamp: "19 Feb 2025 | 03:46", status: "inactive" },
      ]}
    />
  ),
};

export const Badge = {
  render: () => (
    <BadgeSteps step={1} title="Select Transfer Method" description="Select Transfer Method" />
  ),
};
