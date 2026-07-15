import React, { useState } from "react";
import { Switch } from "./Switch.jsx";

export default {
  title: "Atoms/Switch",
  component: Switch,
  parameters: { layout: "padded" },
  args: { label: "Two-factor authentication", disabled: false },
};

export const Off = {};
export const On = { args: { defaultChecked: true } };
export const WithSubtext = {
  args: {
    label: "Email notifications",
    sub: "Receive transaction confirmations to your inbox.",
    defaultChecked: true,
  },
};
export const Disabled = { args: { disabled: true } };
export const SelectedDisabled = { args: { defaultChecked: true, disabled: true } };

export const SettingsList = {
  render: () => {
    const [a, setA] = useState(true);
    const [b, setB] = useState(false);
    const [c, setC] = useState(true);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 480 }}>
        <Switch label="Two-factor authentication" sub="Required for transactions over S$10,000." checked={a} onChange={(e) => setA(e.target.checked)} />
        <Switch label="Marketing emails" sub="Product updates and announcements." checked={b} onChange={(e) => setB(e.target.checked)} />
        <Switch label="Allow API access" checked={c} onChange={(e) => setC(e.target.checked)} />
      </div>
    );
  },
};
