import React from "react";
import { DropdownBlockchain } from "./DropdownBlockchain.jsx";
import { AssetMark } from "../AssetMark/AssetMark.jsx";

export default {
  title: "Patterns/Dropdown/Blockchain",
  component: DropdownBlockchain,
  parameters: { layout: "padded" },
  decorators: [(S) => <div style={{ maxWidth: 328 }}><S /></div>],
  argTypes: {
    value: { control: "text" },
    className: { control: "text" },
    onSelect: { action: "onSelect" },
  },
  args: {
    value: "ethereum",
  },
};

const chains = [
  { value: "ethereum", name: "Ethereum", logo: <AssetMark asset="ETH" size={24} /> },
  { value: "polygon", name: "Polygon", logo: <AssetMark asset="POLYGON" size={24} /> },
  { value: "solana", name: "Solana", logo: <AssetMark asset="SOLANA" size={24} /> },
  { value: "avalanche", name: "Avalanche", logo: <AssetMark asset="AVAX" size={24} /> },
];

export const Default = { args: { options: chains, value: "ethereum" } };

export const WithAddresses = {
  args: {
    value: "ethereum",
    options: chains.map((c, i) => ({
      ...c,
      address: [
        "0x12ab…34cd",
        "0x98fe…76ba",
        "7Hn3…k9Qz",
        "0x55aa…11ff",
      ][i],
    })),
  },
};

export const WithStatus = {
  args: {
    value: "ethereum",
    options: [
      { value: "ethereum", name: "Ethereum", address: "0x12ab…34cd", logo: <AssetMark asset="ETH" size={24} />, tag: { label: "Connected", variant: "positive" } },
      { value: "solana", name: "Solana", logo: <AssetMark asset="SOLANA" size={24} />, tag: { label: "New", variant: "information" } },
      { value: "metamask", name: "MetaMask", address: "0x12ab…34cd", logo: <AssetMark asset="METAMASK" size={24} /> },
      { value: "walletconnect", name: "WalletConnect", logo: <AssetMark asset="WALLETCONNECT" size={24} /> },
    ],
  },
};

export const InitialsFallback = {
  args: { value: "ethereum", options: chains.map(({ logo, ...c }) => c) },
};
