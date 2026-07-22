import React from "react";
import { Input } from "./Input.jsx";

export default {
  title: "Components/Input",
  component: Input,
  parameters: { layout: "padded" },
  args: { disabled: false },
  argTypes: {
    label: { control: "text" },
    helper: { control: "text" },
    error: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    size: { control: "inline-radio", options: ["large", "small"] },
  },
  decorators: [(Story) => <div style={{ maxWidth: 360 }}><Story /></div>],
};

export const Default = {
  args: {
    label: "Email",
    helper: "We'll send your verification code here.",
    placeholder: "hello@straitsx.com",
  },
};

export const Password = {
  args: { label: "Password", type: "password", defaultValue: "ferret-cobalt-mountain" },
};

export const Search = {
  args: { type: "search", placeholder: "Search transactions" },
};

export const WithTrailingButton = {
  args: {
    label: "Promo code",
    placeholder: "Enter code",
    trailingButton: { label: "Apply", onClick: () => {} },
  },
};

export const ErrorState = {
  args: {
    label: "Wallet address",
    defaultValue: "0xa1B…f2",
    error: "Address checksum doesn't match.",
  },
};

export const Disabled = {
  args: { label: "Account number", defaultValue: "0123 4567 8901", disabled: true },
};

export const Small = {
  args: {
    label: "Email",
    size: "small",
    placeholder: "hello@straitsx.com",
    helper: "Compact 36px field.",
  },
};

export const Sizes = {
  render: () => (
    <div style={{ display: "grid", gap: 16, maxWidth: 360 }}>
      <Input size="large" label="Large (48px)" placeholder="hello@straitsx.com" />
      <Input size="small" label="Small (36px)" placeholder="hello@straitsx.com" />
    </div>
  ),
};

export const States = {
  render: () => (
    <div style={{ display: "grid", gap: 16, maxWidth: 360 }}>
      <Input label="Enabled" placeholder="hello@straitsx.com" />
      <Input label="Hovered" className="is-hovered" placeholder="hello@straitsx.com" />
      <Input label="Focused" className="is-focused" placeholder="hello@straitsx.com" />
      <Input label="Error" defaultValue="0xa1B…f2" error="Address checksum doesn't match." />
      <Input label="Disabled" defaultValue="0123 4567 8901" disabled />
      <Input label="Small" size="small" placeholder="Compact 36px field" />
    </div>
  ),
};

export const Composition = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 560 }}>
      <Input label="Email" placeholder="hello@straitsx.com" />
      <Input label="Wallet address" defaultValue="0xa1B…f2" error="Address checksum doesn't match." />
      <Input label="Account number" defaultValue="0123 4567 8901" disabled />
    </div>
  ),
};
