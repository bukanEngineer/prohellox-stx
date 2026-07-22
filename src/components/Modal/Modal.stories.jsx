import React, { useState } from "react";
import { Modal } from "./Modal.jsx";
import { Button } from "../Button/Button.jsx";

export default {
  title: "Components/Modal",
  component: Modal,
  parameters: { layout: "centered" },
  argTypes: {
    open: { control: "boolean" },
    size: { control: "select", options: ["small", "large"] },
    title: { control: "text" },
    dismissable: { control: "boolean" },
    onClose: { action: "onClose" },
  },
  args: {
    open: false,
    size: "small",
    title: "Confirm transfer",
    dismissable: true,
  },
};

function Demo({ size = "small", title = "Confirm transfer" }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal
        open={open}
        size={size}
        onClose={() => setOpen(false)}
        title={title}
        footer={
          <>
            <Button variant="secondary" size="lg" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary" size="lg" onClick={() => setOpen(false)}>Confirm</Button>
          </>
        }
      >
        You are about to send <strong>1,250 XSGD</strong> to <strong>John Doe</strong>. This action cannot be undone.
      </Modal>
    </>
  );
}

export const Small = { render: () => <Demo size="small" title="Discard draft?" /> };
export const Large = { render: () => <Demo size="large" title="Customer Knowledge Assessment" /> };

export const HideClose = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open modal (no close)</Button>
        <Modal
          open={open}
          size="small"
          hideClose
          onClose={() => setOpen(false)}
          title="Confirm transfer"
          footer={
            <>
              <Button variant="secondary" size="lg" onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="primary" size="lg" onClick={() => setOpen(false)}>Confirm</Button>
            </>
          }
        >
          This modal hides the header close button — use the footer actions to dismiss it.
        </Modal>
      </>
    );
  },
};

export const NonDismissable = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open modal (non-dismissable)</Button>
        <Modal
          open={open}
          size="small"
          dismissable={false}
          onClose={() => setOpen(false)}
          title="Action required"
          footer={
            <Button variant="primary" size="lg" onClick={() => setOpen(false)}>Acknowledge</Button>
          }
        >
          Scrim clicks and the Escape key are disabled — you must use an explicit action to continue.
        </Modal>
      </>
    );
  },
};

export const Illustration = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open illustration modal</Button>
        <Modal
          open={open}
          size="small"
          variant="illustration"
          onClose={() => setOpen(false)}
          title="You're all set!"
          illustration={
            <span className="material-symbols-rounded" style={{ fontSize: 64, color: "var(--primary)" }}>
              verified
            </span>
          }
          footer={<Button variant="primary" size="lg" onClick={() => setOpen(false)}>Got it</Button>}
        >
          Your account has been verified. You can now transact across all supported stablecoins.
        </Modal>
      </>
    );
  },
};

export const NewFeature = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open new-feature modal</Button>
        <Modal
          open={open}
          size="large"
          variant="new-feature"
          onClose={() => setOpen(false)}
          title="Introducing instant swaps"
          media={
            <div
              style={{
                height: 220,
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-secondary)",
                font: "var(--label-large)",
              }}
            >
              Screenshot / media
            </div>
          }
          footer={
            <Button variant="primary" size="lg" onClick={() => setOpen(false)}>Get Started</Button>
          }
        >
          Swap between stablecoins instantly with zero spread for the first 30 days.
        </Modal>
      </>
    );
  },
};
