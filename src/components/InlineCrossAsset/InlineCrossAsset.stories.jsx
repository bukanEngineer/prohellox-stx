import React from "react";
import { InlineCrossAsset } from "./InlineCrossAsset.jsx";

const Coin = ({ label, bg }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%",
      background: bg,
      color: "var(--text-inverse)",
      fontSize: 8,
      fontWeight: 700,
    }}
  >
    {label}
  </span>
);

const xsgd = <Coin label="XS" bg="var(--brand-xsgd)" />;
const sgd = <Coin label="SG" bg="var(--status-critical)" />;
const xusd = <Coin label="XU" bg="var(--brand-xusd)" />;
const usd = <Coin label="US" bg="var(--brand-credible-blue)" />;

export default {
  title: "Patterns/Inline Cross Asset",
  component: InlineCrossAsset,
  parameters: { layout: "padded" },
  argTypes: {
    from: { control: "text" },
    to: { control: "text" },
    caption: { control: "text" },
  },
  args: {
    from: "XUSD",
    to: "USD",
    fromIcon: xusd,
    toIcon: usd,
    caption: "Your XUSD will be converted 1:1 to USD",
  },
  decorators: [(S) => <div style={{ maxWidth: 320 }}><S /></div>],
};

export const XusdToUsd = {};
export const UsdToXusd = {
  args: { from: "USD", to: "XUSD", fromIcon: usd, toIcon: xusd, caption: "Your USD will be credited 1:1 to XUSD" },
};
export const SgdToXsgd = {
  args: { from: "SGD", to: "XSGD", fromIcon: sgd, toIcon: xsgd, caption: "Your SGD will be credited 1:1 to XSGD" },
};
export const XsgdToSgd = {
  args: { from: "XSGD", to: "SGD", fromIcon: xsgd, toIcon: sgd, caption: "Your XSGD will be converted 1:1 to SGD" },
};
