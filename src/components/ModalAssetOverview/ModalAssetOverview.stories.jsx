import React, { useState } from "react";
import { ModalAssetOverview } from "./ModalAssetOverview.jsx";
import { Button } from "../Button/Button.jsx";
import { PartnerLogo } from "../PartnerLogo/PartnerLogo.jsx";

export default {
  title: "Patterns/Modal/Asset Overview",
  component: ModalAssetOverview,
  parameters: { layout: "centered" },
  argTypes: {
    open: { control: "boolean" },
    symbol: { control: "text" },
    subtitle: { control: "text" },
    networkLabel: { control: "text" },
    onClose: { action: "onClose" },
    onSelectMethod: { action: "onSelectMethod" },
  },
  args: {
    open: false,
    symbol: "XSGD",
    subtitle: "1:1 to SGD",
    networkLabel: "Supported Network",
  },
};

const methods = [
  {
    id: "in",
    title: "Transfer In",
    description: "Receive crypto from my external wallet or bank transfer",
    icon: <span className="material-symbols-rounded">add</span>,
  },
  {
    id: "out",
    title: "Transfer Out",
    description: "Send crypto to my blockchain address or bank account",
    icon: <span className="material-symbols-rounded">arrow_outward</span>,
  },
];

const networks = [
  { label: "Ethereum", mark: <PartnerLogo name="ethereum" size={16} monochrome={false} /> },
  { label: "Polygon", mark: <PartnerLogo name="polygon" size={16} monochrome={false} /> },
  { label: "Avalanche C-Chain", mark: <PartnerLogo name="avalanche" size={16} monochrome={false} /> },
  { label: "Arbitrum", mark: <PartnerLogo name="arbitrum" size={16} monochrome={false} /> },
  { label: "Hedera", mark: <PartnerLogo name="hedera" size={16} monochrome={false} /> },
  { label: "Ripple", mark: <PartnerLogo name="ripple" size={16} monochrome={false} /> },
];

function Demo(props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open asset overview</Button>
      <ModalAssetOverview open={open} onClose={() => setOpen(false)} {...props} />
    </>
  );
}

export const Stablecoin = {
  render: () => (
    <Demo
      mark={<PartnerLogo name="xsgd" size={36} />}
      symbol="XSGD"
      subtitle="1:1 to SGD"
      methods={methods}
      networks={networks}
      banks="FAST, MEPS, SWIFT"
    />
  ),
};

export const Fiat = {
  render: () => (
    <Demo
      symbol="SGD"
      subtitle="Singapore Dollar"
      methods={methods}
      banks="FAST, MEPS, SWIFT"
    />
  ),
};

export const Open = {
  render: () => (
    <ModalAssetOverview
      open
      onClose={() => {}}
      mark={<PartnerLogo name="xsgd" size={36} />}
      symbol="XSGD"
      subtitle="1:1 to SGD"
      methods={methods}
      networks={networks}
      banks="FAST, MEPS, SWIFT"
    />
  ),
};
