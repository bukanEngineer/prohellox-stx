import React from "react";
import { Toast, ToastProvider, useToast } from "./Toast.jsx";
import { Button } from "../Button/Button.jsx";

export default {
  title: "Components/Toast",
  component: Toast,
  parameters: { layout: "centered" },
  argTypes: {
    tone: { control: "select", options: ["positive", "critical", "warning", "info"] },
    title: { control: "text" },
    onDismiss: { action: "onDismiss" },
  },
  args: {
    tone: "positive",
    title: "Success",
  },
};

export const Default = {
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
      <Toast tone="positive">This is a message</Toast>
      <Toast tone="warning">This is a message</Toast>
      <Toast tone="critical">This is a message</Toast>
      <Toast tone="info">This is a message</Toast>
    </div>
  ),
};

function Trigger() {
  const { show } = useToast();
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <Button size="sm" onClick={() => show({ tone: "positive", title: "Saved", message: "Your settings have been updated." })}>Show success</Button>
      <Button size="sm" variant="secondary" onClick={() => show({ tone: "critical", title: "Transfer failed", message: "Insufficient balance." })}>Show error</Button>
    </div>
  );
}

export const WithProvider = {
  render: () => (
    <ToastProvider>
      <Trigger />
    </ToastProvider>
  ),
};
