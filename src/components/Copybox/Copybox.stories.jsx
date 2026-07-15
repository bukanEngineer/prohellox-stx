import React from "react";
import { Copybox } from "./Copybox.jsx";
import { ToastProvider } from "../Toast/Toast.jsx";

export default {
  title: "Components/Copybox",
  component: Copybox,
  args: { multiline: false, action: true, truncate: false },
  parameters: { layout: "padded" },
  argTypes: {
    value: { control: "text" },
    label: { control: "text" },
    helper: { control: "text" },
    info: { control: "text" },
    error: { control: "text" },
    multiline: { control: "boolean" },
    action: { control: "boolean" },
    truncate: { control: "boolean" },
    size: { control: "inline-radio", options: ["large", "sm"] },
    buttonVariant: { control: "inline-radio", options: ["text", "icon"] },
  },
  decorators: [(S) => <ToastProvider><div style={{ maxWidth: 480 }}><S /></div></ToastProvider>],
};

export const WalletAddress = {
  args: {
    label: "Wallet address",
    value: "0xA1B2C3D4E5F60718293AeCb98765FaB1234567890",
  },
};

export const ApiKey = {
  args: { label: "API key", value: "sx_live_5f4d7a2e9b3c1f8d0a6e2b5c8d4e7f1a" },
};

export const Multiline = {
  args: {
    label: "Recovery phrase",
    multiline: true,
    value: "ocean velvet harbour pivot satellite trumpet anchor blossom keyboard pinnacle vintage canopy",
  },
};

export const NoAction = {
  args: {
    label: "Transaction reference",
    action: false,
    value: "TXN-2026-0042-XSGD",
    helper: "Display only — nothing to copy.",
  },
};

export const Error = {
  args: {
    label: "Wallet address",
    value: "0xA1B2C3D4E5F60718293AeCb98765FaB1234567890",
    error: "This address failed checksum validation.",
  },
};

export const NoActionError = {
  args: {
    label: "Transaction reference",
    action: false,
    value: "TXN-2026-0042-XSGD",
    error: "This reference could not be verified.",
  },
};

export const IconButton = {
  args: {
    label: "API key",
    buttonVariant: "icon",
    value: "sx_live_5f4d7a2e9b3c1f8d0a6e2b5c8d4e7f1a",
  },
};

export const IconButtonError = {
  args: {
    label: "Wallet address",
    buttonVariant: "icon",
    value: "0xA1B2C3D4E5F60718293AeCb98765FaB1234567890",
    error: "This address failed checksum validation.",
  },
};

export const WithLogo = {
  args: {
    label: "Ethereum address",
    info: "Funds sent to this address are credited to your wallet.",
    icon: <span className="material-symbols-rounded">currency_bitcoin</span>,
    value: "0xA1B2C3D4E5F60718293AeCb98765FaB1234567890",
  },
};

export const Truncated = {
  args: {
    label: "Wallet address",
    truncate: true,
    value: "0xA1B2C3D4E5F60718293AeCb98765FaB1234567890",
    helper: "Long value is middle-truncated; full value copies.",
  },
};

export const Sizes = {
  render: () => (
    <div style={{ display: "grid", gap: 16, maxWidth: 480 }}>
      <Copybox label="Large (48px)" size="large" value="0xA1B2C3D4E5F60718293AeCb98765FaB1234567890" />
      <Copybox label="Small (36px)" size="sm" value="0xA1B2C3D4E5F60718293AeCb98765FaB1234567890" />
    </div>
  ),
};
