import React, { useState } from "react";
import { BottomSheet } from "./BottomSheet.jsx";
import { Button } from "../Button/Button.jsx";

export default {
  title: "Components/Bottom Sheet",
  component: BottomSheet,
  parameters: { layout: "centered" },
  argTypes: {
    open: { control: "boolean" },
    title: { control: "text" },
    dismissable: { control: "boolean" },
    hideClose: { control: "boolean" },
    onClose: { action: "onClose" },
  },
  args: {
    open: false,
    title: "Send to",
    dismissable: true,
    hideClose: false,
  },
};

function Demo({ title = "Send to" }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open bottom sheet</Button>
      <BottomSheet open={open} onClose={() => setOpen(false)} title={title}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <p style={{ font: "var(--body-medium)", color: "var(--text-secondary)", margin: 0 }}>
            Choose how you&apos;d like to send funds.
          </p>
          <Button>Bank transfer</Button>
          <Button variant="secondary">Stablecoin wallet</Button>
          <Button variant="tertiary">QR code</Button>
        </div>
      </BottomSheet>
    </>
  );
}

export const Default = { render: () => <Demo /> };

export const WithFooter = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open with footer</Button>
        <BottomSheet
          open={open}
          onClose={() => setOpen(false)}
          title="Confirm transfer"
          footer={
            <>
              <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => setOpen(false)}>Confirm</Button>
            </>
          }
        >
          <p style={{ font: "var(--body-medium)", color: "var(--text-secondary)", margin: 0 }}>
            You are about to send 1,250 XSGD to John Doe. This action cannot be undone.
          </p>
        </BottomSheet>
      </>
    );
  },
};

export const HideClose = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open without close</Button>
        <BottomSheet
          open={open}
          onClose={() => setOpen(false)}
          title="Select an option"
          hideClose
          footer={
            <Button variant="primary" onClick={() => setOpen(false)}>Done</Button>
          }
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Button variant="secondary">Bank transfer</Button>
            <Button variant="secondary">Stablecoin wallet</Button>
          </div>
        </BottomSheet>
      </>
    );
  },
};
