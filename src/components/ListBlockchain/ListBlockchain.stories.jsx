import React from "react";
import { ListBlockchain } from "./ListBlockchain.jsx";

const ChainIcon = ({ label = "Ξ", bg = "var(--brand-stable-deep-ivy)" }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%",
      background: bg,
      color: "var(--text-inverse)",
      fontSize: 12,
      fontWeight: 700,
    }}
  >
    {label}
  </span>
);

const ADDRESS = "0x934ddab12av012345c1ertf897fec124f2gyb1";

export default {
  title: "Patterns/List/Blockchain",
  component: ListBlockchain,
  parameters: { layout: "padded" },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["verifiedPrivateWallet", "verifiedCustodial", "pending", "verify"],
    },
  },
  args: {
    name: "Metamask",
    address: ADDRESS,
    icon: <ChainIcon label="M" bg="var(--status-warning)" />,
    variant: "verifiedPrivateWallet",
    meta: "Last Used",
  },
  decorators: [
    (S) => (
      <div style={{ maxWidth: 400, border: "1px solid var(--border)", borderRadius: 8 }}>
        <S />
      </div>
    ),
  ],
};

export const VerifiedPrivateWallet = {};
export const VerifiedCustodial = {
  args: { variant: "verifiedCustodial", name: "Wallet 3", meta: undefined, icon: <ChainIcon /> },
};
export const Pending = {
  args: { variant: "pending", name: "Wallet 2", meta: undefined, icon: <ChainIcon /> },
};
export const Verify = {
  args: { variant: "verify", name: "Wallet 3", meta: undefined, icon: <ChainIcon /> },
};

export const List = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", border: "1px solid var(--border)", borderRadius: 8 }}>
      <ListBlockchain variant="verifiedPrivateWallet" name="Metamask" address={ADDRESS} meta="Last Used" icon={<ChainIcon label="M" bg="var(--status-warning)" />} />
      <ListBlockchain variant="verifiedCustodial" name="Wallet 3" address={ADDRESS} icon={<ChainIcon />} />
      <ListBlockchain variant="pending" name="Wallet 2" address={ADDRESS} icon={<ChainIcon />} />
      <ListBlockchain variant="verify" name="Wallet 3" address={ADDRESS} icon={<ChainIcon />} />
    </div>
  ),
};
