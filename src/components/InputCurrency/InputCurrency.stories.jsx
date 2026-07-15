import React from "react";
import { InputCurrency } from "./InputCurrency.jsx";
import { AssetMark } from "../AssetMark/AssetMark.jsx";

export default {
  title: "Components/InputCurrency",
  component: InputCurrency,
  args: { disabled: false },
  parameters: { layout: "padded" },
  decorators: [(Story) => <div style={{ maxWidth: 400 }}><Story /></div>],
};

const assetOptions = [
  { value: "eth", symbol: "Eth", logo: <AssetMark asset="ETH" size={24} /> },
  { value: "usdc", symbol: "USDC", logo: <AssetMark asset="USDC" size={24} /> },
  { value: "usdt", symbol: "USDT", logo: <AssetMark asset="USDT" size={24} /> },
];

const stablecoinCashOptions = [
  { value: "xsgd", symbol: "XSGD", logo: <AssetMark asset="XSGD" size={24} />, group: "stablecoin" },
  { value: "xusd", symbol: "XUSD", logo: <AssetMark asset="XUSD" size={24} />, group: "stablecoin" },
  { value: "usdc", symbol: "USDC", logo: <AssetMark asset="USDC" size={24} />, group: "stablecoin" },
  { value: "usdt", symbol: "USDT", logo: <AssetMark asset="USDT" size={24} />, group: "stablecoin" },
  { value: "sgd", symbol: "SGD", logo: <AssetMark asset="SGD" size={24} />, group: "cash" },
  { value: "usd", symbol: "USD", logo: <AssetMark asset="USD" size={24} />, group: "cash" },
];

export const Suffix = {
  args: {
    position: "suffix",
    placeholder: "0.00",
    defaultValue: "0.11",
    linkButton: { label: "Max" },
    asset: { defaultValue: "eth", options: assetOptions },
  },
};

export const Prefix = {
  args: {
    label: "Label",
    position: "prefix",
    placeholder: "0.00",
    defaultValue: "0.11",
    asset: { defaultValue: "eth", options: assetOptions },
  },
};

export const GroupedByCategory = {
  args: {
    label: "Amount",
    position: "suffix",
    placeholder: "0.00",
    defaultValue: "0.11",
    linkButton: { label: "Max" },
    asset: { defaultValue: "xsgd", options: stablecoinCashOptions },
  },
};

export const StaticSymbol = {
  args: {
    label: "Annual revenue",
    position: "prefix",
    defaultValue: "250,000.00",
    asset: { symbol: "S$", dropdown: false },
  },
};

export const WithHelper = {
  args: {
    label: "Amount",
    position: "suffix",
    placeholder: "0.00",
    helper: "Available balance: 1,300 ETH",
    linkButton: { label: "Max" },
    asset: { defaultValue: "eth", options: assetOptions },
  },
};

export const ErrorState = {
  args: {
    label: "Amount",
    position: "suffix",
    defaultValue: "0.11",
    error: "Amount exceeds available balance.",
    asset: { defaultValue: "eth", options: assetOptions },
  },
};

export const Disabled = {
  args: {
    label: "Amount",
    position: "suffix",
    defaultValue: "0.11",
    disabled: true,
    asset: { defaultValue: "eth", options: assetOptions },
  },
};
