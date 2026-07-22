import React, { useState } from "react";
import { DateInput } from "./DateInput.jsx";

export default {
  title: "Components/Date Input",
  component: DateInput,
  args: { range: false, disabled: false, label: "Date of birth" },
  parameters: { layout: "padded" },
  decorators: [(S) => <div style={{ maxWidth: 320 }}><S /></div>],
  argTypes: {
    label: { control: "text" },
    helper: { control: "text" },
    error: { control: "text" },
    size: { control: "select", options: ["large", "small"] },
    range: { control: "boolean" },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
    onChange: { action: "onChange" },
  },
};

export const Default = { args: { label: "Date of birth" } };
export const WithValue = { args: { label: "Date of birth", defaultValue: "1990-04-15" } };
export const WithHelper = { args: { label: "Date of birth", helper: "We use this to verify your identity." } };
export const Error = { args: { label: "Date of birth", error: "Must be 18 or older." } };
export const Disabled = { args: { label: "Date of birth", defaultValue: "1990-04-15", disabled: true } };
export const Small = { args: { label: "Date of birth", size: "small", defaultValue: "1990-04-15" } };
export const Range = {
  render: () => {
    const [range, setRange] = useState({ start: "2026-01-01", end: "2026-03-31" });
    return (
      <DateInput
        label="Statement period"
        range
        startValue={range.start}
        endValue={range.end}
        onRangeChange={setRange}
        helper="Pick a start and end date."
      />
    );
  },
};
