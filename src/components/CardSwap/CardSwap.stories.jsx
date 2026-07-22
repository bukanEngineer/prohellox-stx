import React, { useState } from "react";
import { CardSwap } from "./CardSwap.jsx";
import { AssetMark } from "../AssetMark/AssetMark.jsx";

export default {
  title: "Patterns/Card/Swap",
  component: CardSwap,
  parameters: { layout: "centered" },
  argTypes: {
    title: { control: "text" },
    rate: { control: "text" },
    highlight: { control: "text" },
    footnote: { control: "text" },
    buttonLabel: { control: "text" },
    onSwap: { action: "onSwap" },
    onReverse: { action: "onReverse" },
  },
  args: {
    title: "Swap",
    rate: "1 XSGD ≈ 0.7233 USDT",
    footnote: "No fees · Rate refreshes every minute.",
    buttonLabel: "Swap",
  },
};

const CURRENCY_OPTIONS = [
  { value: "XSGD", symbol: "XSGD", logo: <AssetMark asset="XSGD" size={24} /> },
  { value: "XUSD", symbol: "XUSD", logo: <AssetMark asset="XUSD" size={24} /> },
  { value: "USDC", symbol: "USDC", logo: <AssetMark asset="USDC" size={24} /> },
  { value: "USDT", symbol: "USDT", logo: <AssetMark asset="USDT" size={24} /> },
];

export const Default = {
  args: {
    from: { amount: "20", currency: "XUSD", balance: "1,300 XUSD", onMax: () => {}, options: CURRENCY_OPTIONS },
    to: { amount: "25.46", currency: "XSGD", balance: "1,000 XSGD", options: CURRENCY_OPTIONS },
    rate: "1 XSGD ≈ 0.7233 USDT",
    onSwap: () => {},
    onReverse: () => {},
  },
};

export const Interactive = {
  render: () => {
    function InteractiveSwap() {
      const [fromAmount, setFromAmount] = useState("20");
      const [fromCurrency, setFromCurrency] = useState("XUSD");
      const [toCurrency, setToCurrency] = useState("XSGD");

      return (
        <CardSwap
          from={{
            amount: fromAmount,
            currency: fromCurrency,
            balance: "1,300 " + fromCurrency,
            onMax: () => setFromAmount("1300"),
            onAmountChange: setFromAmount,
            options: CURRENCY_OPTIONS,
            onCurrencyChange: setFromCurrency,
          }}
          to={{
            amount: (Number(fromAmount || 0) * 1.273).toFixed(2),
            currency: toCurrency,
            balance: "1,000 " + toCurrency,
            options: CURRENCY_OPTIONS,
            onCurrencyChange: setToCurrency,
          }}
          rate={`1 ${toCurrency} ≈ 0.7233 ${fromCurrency}`}
          onSwap={() => {}}
          onReverse={() => {}}
        />
      );
    }
    return <InteractiveSwap />;
  },
};

export const BestRateSecured = {
  args: {
    from: { amount: "100", currency: "XUSD", balance: "1,300 XUSD", onMax: () => {}, options: CURRENCY_OPTIONS },
    to: { amount: "127.30", currency: "XSGD", balance: "1,000 XSGD", options: CURRENCY_OPTIONS },
    rate: "1 XSGD ≈ 0.7233 USDT",
    highlight: "Best rates secured",
    onSwap: () => {},
    onReverse: () => {},
  },
};
