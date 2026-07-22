import React, { useState } from "react";
import { Checkbox } from "./Checkbox.jsx";

export default {
  title: "Atoms/Checkbox",
  component: Checkbox,
  parameters: { layout: "padded" },
  args: { label: "I agree to the terms", indeterminate: false, disabled: false, error: false },
  argTypes: {
    label: { control: "text" },
    sub: { control: "text" },
    indeterminate: { control: "boolean" },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
    checked: { control: "boolean" },
    onChange: { action: "onChange" },
  },
};

export const Default = {};
export const Checked = { args: { defaultChecked: true } };
export const WithSubtext = { args: { label: "Send me product updates", sub: "Monthly newsletter, no marketing." } };
export const Indeterminate = { args: { indeterminate: true, label: "Select all" } };
export const Error = { args: { error: true, label: "Required field" } };
export const Disabled = { args: { disabled: true, defaultChecked: true } };

export const Group = {
  render: () => {
    const [picks, setPicks] = useState({ xsgd: true, xidr: false, xusd: false });
    const toggle = (k) => setPicks((p) => ({ ...p, [k]: !p[k] }));
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Checkbox label="XSGD" checked={picks.xsgd} onChange={() => toggle("xsgd")} />
        <Checkbox label="XIDR" checked={picks.xidr} onChange={() => toggle("xidr")} />
        <Checkbox label="XUSD" checked={picks.xusd} onChange={() => toggle("xusd")} />
      </div>
    );
  },
};
