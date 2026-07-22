import React, { useState } from "react";
import { BottomSheetNetwork } from "./BottomSheetNetwork.jsx";
import { Button } from "../Button/Button.jsx";

export default {
  title: "Patterns/Bottom Sheet/Network",
  component: BottomSheetNetwork,
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
    title: "Select Network",
  },
};

const networks = [
  { id: "ethereum", name: "Ethereum", description: "ERC-20" },
  { id: "polygon", name: "Polygon", description: "Polygon PoS" },
  { id: "avalanche", name: "Avalanche C-Chain", description: "AVAX C-Chain" },
  { id: "arbitrum", name: "Arbitrum", description: "Arbitrum One" },
  { id: "hedera", name: "Hedera", description: "HTS" },
];

function Demo(props) {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("polygon");
  return (
    <>
      <Button onClick={() => setOpen(true)}>Select network</Button>
      <BottomSheetNetwork
        open={open}
        onClose={() => setOpen(false)}
        networks={networks}
        selectedId={selectedId}
        onSelect={(n) => {
          setSelectedId(n.id);
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
    <BottomSheetNetwork
      open
      onClose={() => {}}
      networks={networks}
      selectedId="polygon"
    />
  ),
};
