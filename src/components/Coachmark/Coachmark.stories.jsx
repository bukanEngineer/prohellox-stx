import React, { useRef, useState } from "react";
import { Coachmark } from "./Coachmark.jsx";
import { Button } from "../Button/Button.jsx";

export default {
  title: "Components/Coachmark",
  component: Coachmark,
  parameters: { layout: "fullscreen" },
  argTypes: {
    title: { control: "text" },
    body: { control: "text" },
    open: { control: "boolean" },
    onDismiss: { action: "onDismiss" },
    onNext: { action: "onNext" },
  },
  args: {
    title: "Mint new stablecoins",
    body: "Convert SGD from your bank account into XSGD.",
    open: true,
  },
};

export const Default = {
  render: () => {
    const ref = useRef(null);
    const [open, setOpen] = useState(true);
    return (
      <div style={{ padding: 64 }}>
        <Button ref={ref} onClick={() => setOpen(true)}>Mint</Button>
        <Coachmark
          target={ref}
          open={open}
          onDismiss={() => setOpen(false)}
          title="Mint new stablecoins"
          body="Convert SGD from your bank account into XSGD — instantly and at zero fee."
          step={1}
          totalSteps={3}
          onNext={() => setOpen(false)}
        />
      </div>
    );
  },
};

function PlacementDemo({ placement }) {
  const ref = useRef(null);
  const [open, setOpen] = useState(true);
  return (
    <div
      style={{
        height: 480,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button ref={ref} onClick={() => setOpen(true)}>Target</Button>
      <Coachmark
        target={ref}
        open={open}
        onDismiss={() => setOpen(false)}
        placement={placement}
        title={`Beak ${placement}`}
        body={`This coachmark is placed to the ${placement} of its target, with a beak pointing back at it.`}
        step={1}
        totalSteps={3}
        onNext={() => setOpen(false)}
      />
    </div>
  );
}

export const Top = { render: () => <PlacementDemo placement="top" /> };
export const Left = { render: () => <PlacementDemo placement="left" /> };
export const Right = { render: () => <PlacementDemo placement="right" /> };

export const WithDotsAndClose = {
  render: () => {
    const ref = useRef(null);
    const [open, setOpen] = useState(true);
    const [step, setStep] = useState(2);
    return (
      <div style={{ padding: 64 }}>
        <Button ref={ref} onClick={() => { setStep(2); setOpen(true); }}>Earn</Button>
        <Coachmark
          target={ref}
          open={open}
          onDismiss={() => setOpen(false)}
          title="Try the Earn feature"
          body="Park your stablecoins and earn yield, with no lock-up period."
          step={step}
          totalSteps={4}
          onNext={() => setStep((s) => Math.min(4, s + 1))}
          onPrev={() => setStep((s) => Math.max(1, s - 1))}
        />
      </div>
    );
  },
};

export const Tour = {
  render: () => {
    const a = useRef(null);
    const b = useRef(null);
    const c = useRef(null);
    const refs = [a, b, c];
    const tips = [
      { title: "Mint", body: "Top up XSGD instantly from your bank." },
      { title: "Send", body: "Send stablecoins to any wallet, on or off-chain." },
      { title: "Earn", body: "Park stablecoins and earn yield." },
    ];
    const [i, setI] = useState(0);
    return (
      <div style={{ display: "flex", gap: 12, padding: 64 }}>
        <Button ref={a}>Mint</Button>
        <Button ref={b} variant="secondary">Send</Button>
        <Button ref={c} variant="secondary">Earn</Button>
        <Coachmark
          target={refs[i]}
          open={i < tips.length}
          onDismiss={() => setI(tips.length)}
          onNext={() => setI((x) => x + 1)}
          onPrev={() => setI((x) => x - 1)}
          step={i + 1}
          totalSteps={tips.length}
          title={tips[i]?.title}
          body={tips[i]?.body}
        />
      </div>
    );
  },
};
