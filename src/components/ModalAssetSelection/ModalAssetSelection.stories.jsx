import React, { useState } from "react";
import { ModalAssetSelection } from "./ModalAssetSelection.jsx";
import { Button } from "../Button/Button.jsx";
import { PartnerLogo } from "../PartnerLogo/PartnerLogo.jsx";

export default {
  title: "Patterns/Modal/Asset Selection",
  component: ModalAssetSelection,
  parameters: { layout: "centered" },
  argTypes: {
    open: { control: "boolean" },
    title: { control: "text" },
    description: { control: "text" },
    label: { control: "text" },
    onClose: { action: "onClose" },
    onSelect: { action: "onSelect" },
  },
  args: {
    open: false,
    title: "Transfer In",
    label: "Select Asset:",
  },
};

const stablecoins = [
  { id: "xsgd", symbol: "XSGD", subtitle: "1:1 to SGD", mark: <PartnerLogo name="xsgd" size={32} /> },
  { id: "xusd", symbol: "XUSD", subtitle: "1:1 to USD", mark: <PartnerLogo name="xusd" size={32} /> },
  { id: "usdc", symbol: "USDC", mark: <PartnerLogo name="usdc" size={32} /> },
  { id: "usdt", symbol: "USDT", mark: <PartnerLogo name="usdt" size={32} /> },
];

const fiat = [
  { id: "sgd", symbol: "SGD" },
  { id: "usd", symbol: "USD" },
];

function Demo(props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open asset selection</Button>
      <ModalAssetSelection open={open} onClose={() => setOpen(false)} {...props} />
    </>
  );
}

export const TransferIn = {
  render: () => (
    <Demo
      title="Transfer In"
      description="Deposit funds from your blockchain wallet or bank account"
      assets={stablecoins}
    />
  ),
};

export const TransferOut = {
  render: () => (
    <Demo
      title="Transfer Out"
      description="Withdraw funds to your blockchain wallet or bank account"
      assets={stablecoins}
    />
  ),
};

export const Fiat = {
  render: () => (
    <Demo
      title="Transfer In"
      description="Deposit funds from your bank account"
      assets={fiat}
    />
  ),
};

export const Open = {
  render: () => (
    <ModalAssetSelection
      open
      onClose={() => {}}
      title="Transfer In"
      description="Deposit funds from your blockchain wallet or bank account"
      assets={stablecoins}
    />
  ),
};
