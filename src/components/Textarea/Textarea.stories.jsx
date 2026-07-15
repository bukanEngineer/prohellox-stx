import React from "react";
import { Textarea } from "./Textarea.jsx";

export default {
  title: "Components/Textarea",
  component: Textarea,
  args: { showCount: false, disabled: false },
  parameters: { layout: "padded" },
  decorators: [(S) => <div style={{ maxWidth: 480 }}><S /></div>],
};

export const Default = { args: { label: "Reason for transfer", placeholder: "Type a note for your records…" } };
export const WithCounter = { args: { label: "Reason for transfer", maxLength: 280, showCount: true, defaultValue: "Monthly rent." } };
export const Error = { args: { label: "Reason for transfer", error: "This field is required." } };
export const Disabled = { args: { label: "Reason for transfer", disabled: true, defaultValue: "Monthly rent." } };

export const States = {
  render: () => (
    <div style={{ display: "grid", gap: 16, maxWidth: 480 }}>
      <Textarea label="Enabled" placeholder="Type a note…" />
      <Textarea label="Hovered" state="hovered" placeholder="Type a note…" />
      <Textarea label="Focused" state="focused" placeholder="Type a note…" />
      <Textarea label="Error" error="This field is required." />
      <Textarea label="Disabled" disabled defaultValue="Monthly rent." />
    </div>
  ),
};
