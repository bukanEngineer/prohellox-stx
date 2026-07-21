import React from "react";
import { Select } from "./Select.jsx";

export default {
  title: "Components/Select",
  component: Select,
  args: { disabled: false },
  argTypes: {
    disabled: { control: "boolean" },
    size: { control: "inline-radio", options: ["large", "small"] },
  },
  parameters: { layout: "padded" },
  decorators: [(S) => <div style={{ maxWidth: 360 }}><S /></div>],
};

const currencies = [
  { value: "xsgd", label: "XSGD — Singapore Dollar" },
  { value: "xidr", label: "XIDR — Indonesian Rupiah" },
  { value: "xusd", label: "XUSD — US Dollar" },
];

export const Default = { args: { label: "Currency", options: currencies } };
export const Small = { args: { label: "Currency", size: "small", options: currencies, defaultValue: "xsgd" } };
export const WithValue = { args: { label: "Currency", options: currencies, defaultValue: "xsgd" } };
export const WithHelper = { args: { label: "Currency", helper: "Pick the stablecoin you want to mint.", options: currencies } };
export const Error = { args: { label: "Currency", error: "Please select a currency.", options: currencies } };
export const Disabled = { args: { label: "Currency", disabled: true, options: currencies, defaultValue: "xsgd" } };
