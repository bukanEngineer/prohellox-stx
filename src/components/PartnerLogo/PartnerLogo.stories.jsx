import React from "react";
import { PartnerLogo } from "./PartnerLogo.jsx";

export default {
  title: "Patterns/Partner Logo",
  component: PartnerLogo,
  parameters: { layout: "padded" },
  argTypes: {
    name: { control: "text" },
    size: { control: { type: "range", min: 20, max: 64, step: 2 } },
    monochrome: { control: "boolean" },
  },
  args: { name: "standard-chartered", size: 32 },
};

export const Fallback = {
  args: { name: "some-unlisted-partner" },
  parameters: { docs: { description: { story: "For names not in the registry, PartnerLogo renders a monochrome wordmark pill so layouts stay intact while licensed assets are pending." } } },
};

export const Coins = {
  render: () => (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
      {PartnerLogo.coins.map((slug) => <PartnerLogo key={slug} name={slug} size={32} />)}
    </div>
  ),
};

export const Banks = {
  render: () => (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
      {PartnerLogo.banks.map((slug) => <PartnerLogo key={slug} name={slug} size={40} />)}
    </div>
  ),
};

export const Blockchains = {
  render: () => (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
      {PartnerLogo.chains.map((slug) => <PartnerLogo key={slug} name={slug} size={32} />)}
    </div>
  ),
};

export const Partners = {
  render: () => (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
      {PartnerLogo.partners.map((slug) => <PartnerLogo key={slug} name={slug} size={32} />)}
    </div>
  ),
};
