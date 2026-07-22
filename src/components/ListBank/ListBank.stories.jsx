import React from "react";
import { ListBank } from "./ListBank.jsx";

const Logo = () => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 40,
      height: 24,
      borderRadius: 4,
      background: "var(--surface-secondary)",
      font: "var(--label-small)",
      color: "var(--text-secondary)",
    }}
  >
    DBS
  </span>
);

export default {
  title: "Patterns/List/Bank",
  component: ListBank,
  parameters: { layout: "padded" },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["unverified", "verified", "rejected"],
    },
  },
  args: {
    name: "John Doe",
    account: "DBS - 0053105977203",
    logo: <Logo />,
    variant: "unverified",
  },
  decorators: [
    (S) => (
      <div style={{ maxWidth: 360, border: "1px solid var(--border)", borderRadius: 8 }}>
        <S />
      </div>
    ),
  ],
};

export const Unverified = {};
export const Verified = {
  args: { variant: "verified", account: "DBS - 0053105977213", swift: "UOVBSGSG" },
};
export const Rejected = { args: { variant: "rejected" } };

export const List = {
  decorators: [(S) => <div style={{ maxWidth: 360 }}><S /></div>],
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", border: "1px solid var(--border)", borderRadius: 8 }}>
      <ListBank logo={<Logo />} name="John Doe" account="DBS - 0053105977203" />
      <ListBank logo={<Logo />} name="Jane Lim" account="DBS - 0053105977213" swift="UOVBSGSG" variant="verified" />
      <ListBank logo={<Logo />} name="Acme Pte Ltd" account="DBS - 0053105977299" variant="rejected" />
    </div>
  ),
};
