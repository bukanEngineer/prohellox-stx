import React, { useState } from "react";
import { Radio, RadioGroup } from "./Radio.jsx";

export default {
  title: "Atoms/Radio",
  component: Radio,
  args: { label: "XSGD", disabled: false, error: false },
  argTypes: {
    label: { control: "text" },
    sub: { control: "text" },
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
    name: { control: "text" },
    value: { control: "text" },
    onChange: { action: "onChange" },
  },
  parameters: { layout: "padded" },
};

export const Default = { args: { label: "XSGD", name: "stablecoin" } };
export const Selected = { args: { label: "XSGD", defaultChecked: true, name: "stablecoin" } };
export const Disabled = { args: { label: "XUSD", disabled: true, name: "stablecoin" } };
export const SelectedDisabled = { args: { label: "XSGD", defaultChecked: true, disabled: true, name: "stablecoin" } };

export const Group = {
  render: () => {
    const [v, setV] = useState("xsgd");
    return (
      <RadioGroup
        name="coin"
        legend="Select stablecoin"
        value={v}
        onChange={setV}
        options={[
          { value: "xsgd", label: "XSGD", sub: "Singapore Dollar — pegged 1:1" },
          { value: "xidr", label: "XIDR", sub: "Indonesian Rupiah — pegged 1:1" },
          { value: "xusd", label: "XUSD", sub: "US Dollar — pegged 1:1" },
        ]}
      />
    );
  },
};
