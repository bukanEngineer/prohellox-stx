import React from "react";
import { QR } from "./QR.jsx";

export default {
  title: "Atoms/QR",
  component: QR,
  parameters: { layout: "centered" },
  argTypes: {
    value: { control: "text" },
    size: { control: { type: "number", min: 64, max: 512, step: 8 } },
    label: { control: "text" },
    sub: { control: "text" },
    className: { control: "text" },
  },
  args: {
    value: "0xA1B2C3D4E5F60718293AeCb98765FaB1234567890",
    size: 200,
    label: "Deposit XSGD",
  },
};

export const Default = {
  args: {
    value: "0xA1B2C3D4E5F60718293AeCb98765FaB1234567890",
    label: "Deposit XSGD",
    sub: "0xA1B2C3D4E5F60718293AeCb98765FaB1234567890",
  },
};

export const Small = { args: { value: "https://straitsx.com/pay/abc123", size: 140, label: "Scan to pay" } };
export const NoLabel = { args: { value: "hello world", size: 200 } };
