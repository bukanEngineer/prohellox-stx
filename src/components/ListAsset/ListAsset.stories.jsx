import React from "react";
import { ListAsset } from "./ListAsset.jsx";
import { AssetMark } from "../AssetMark/AssetMark.jsx";

const Net = ({ label, bg }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%",
      background: bg,
      color: "var(--text-inverse)",
      fontSize: 9,
      fontWeight: 700,
    }}
  >
    {label}
  </span>
);

const networks = [
  <Net key="e" label="E" bg="var(--brand-stable-deep-ivy)" />,
  <Net key="p" label="P" bg="var(--brand-credible-blue)" />,
  <Net key="a" label="A" bg="var(--status-critical)" />,
];

export default {
  title: "Patterns/List/Asset",
  component: ListAsset,
  parameters: { layout: "padded" },
  argTypes: {
    variant: { control: "inline-radio", options: ["stablecoin", "fiat"] },
    platform: { control: "inline-radio", options: ["desktop", "mobile"] },
    showAction: { control: "boolean" },
  },
  args: {
    symbol: "XSGD",
    subtitle: "1:1 to SGD",
    balance: "1,123,456,789.00",
    balanceSub: "~2,032 SGD",
    icon: <AssetMark asset="XSGD" />,
    variant: "stablecoin",
    platform: "desktop",
    networks,
    networkOverflow: 3,
    networkIsNew: true,
    showAction: true,
  },
  decorators: [
    (S) => (
      <div style={{ maxWidth: 560, border: "1px solid var(--border)", borderRadius: 8, padding: 12 }}>
        <S />
      </div>
    ),
  ],
};

export const Stablecoin = {};

export const Fiat = {
  args: {
    variant: "fiat",
    symbol: "SGD",
    subtitle: "Singapore Dollar",
    balance: "1,123,456,789.00",
    balanceSub: "Balance",
    icon: <AssetMark asset="SGD" />,
  },
};

export const MobileStablecoin = {
  args: { platform: "mobile", balance: "22,345,672.87" },
  decorators: [
    (S) => (
      <div style={{ maxWidth: 360, border: "1px solid var(--border)", borderRadius: 8, padding: 12 }}>
        <S />
      </div>
    ),
  ],
};

export const List = {
  decorators: [(S) => <div style={{ maxWidth: 560 }}><S /></div>],
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, border: "1px solid var(--border)", borderRadius: 8, padding: 12 }}>
      <ListAsset
        symbol="XSGD"
        subtitle="1:1 to SGD"
        balance="22,345,672.87"
        balanceSub="~2,032 SGD"
        icon={<AssetMark asset="XSGD" />}
        networks={networks}
        networkOverflow={3}
        networkIsNew
      />
      <ListAsset
        variant="fiat"
        symbol="SGD"
        subtitle="Singapore Dollar"
        balance="1,123,456,789.00"
        balanceSub="Balance"
        icon={<AssetMark asset="SGD" />}
      />
    </div>
  ),
};
