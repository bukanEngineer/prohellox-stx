import React, { useState } from "react";
import { BottomSheetBlockchain } from "./BottomSheetBlockchain.jsx";
import { AssetMark } from "../AssetMark/AssetMark.jsx";
import { Button } from "../Button/Button.jsx";

export default {
  title: "Patterns/Bottom Sheet/Blockchain",
  component: BottomSheetBlockchain,
  parameters: { layout: "centered" },
  argTypes: {
    open: { control: "boolean" },
    title: { control: "text" },
    selectedId: { control: "text" },
    onClose: { action: "onClose" },
    onSelect: { action: "onSelect" },
  },
  args: {
    open: false,
    title: "Select Blockchain",
  },
};

const chains = [
  { id: "ethereum", name: "Ethereum", description: "0x12ab…34cd", mark: <AssetMark asset="ETH" size={32} /> },
  { id: "polygon", name: "Polygon", description: "0x98fe…76ba", mark: <AssetMark asset="POLYGON" size={32} /> },
  { id: "solana", name: "Solana", description: "7Hn3…k9Qz", mark: <AssetMark asset="SOLANA" size={32} /> },
  { id: "avalanche", name: "Avalanche", description: "0x55aa…11ff", mark: <AssetMark asset="AVAX" size={32} /> },
  { id: "metamask", name: "MetaMask", description: "Connected", mark: <AssetMark asset="METAMASK" size={32} /> },
];

function Demo(props) {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("ethereum");
  return (
    <>
      <Button onClick={() => setOpen(true)}>Select blockchain</Button>
      <BottomSheetBlockchain
        open={open}
        onClose={() => setOpen(false)}
        chains={chains}
        selectedId={selectedId}
        onSelect={(c) => {
          setSelectedId(c.id);
          setOpen(false);
        }}
        {...props}
      />
    </>
  );
}

export const Default = { render: () => <Demo /> };

export const Open = {
  render: () => (
    <BottomSheetBlockchain
      open
      onClose={() => {}}
      chains={chains}
      selectedId="ethereum"
    />
  ),
};
