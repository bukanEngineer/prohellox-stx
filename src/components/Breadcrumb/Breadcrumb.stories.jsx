import React from "react";
import { Breadcrumb } from "./Breadcrumb.jsx";

export default {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  parameters: { layout: "padded" },
  argTypes: {
    separator: { control: "text" },
  },
  args: {
    separator: "/",
  },
};

export const Default = {
  args: {
    items: [
      { label: "Home", href: "#" },
      { label: "Transaction History", href: "#" },
      { label: "Tx 0x9a1b…" },
    ],
  },
};

export const TwoLevels = {
  args: { items: [{ label: "Settings", href: "#" }, { label: "Security" }] },
};

export const FourItems = {
  args: {
    items: [
      { label: "Home", href: "#" },
      { label: "Wallet", href: "#" },
      { label: "Transactions", href: "#" },
      { label: "Tx 0x9a1b…" },
    ],
  },
};

export const FiveItems = {
  args: {
    items: [
      { label: "Home", href: "#" },
      { label: "Wallet", href: "#" },
      { label: "Transactions", href: "#" },
      { label: "Deposits", href: "#" },
      { label: "Tx 0x9a1b…" },
    ],
  },
};

export const SixItems = {
  args: {
    items: [
      { label: "Home", href: "#" },
      { label: "Wallet", href: "#" },
      { label: "Transactions", href: "#" },
      { label: "Deposits", href: "#" },
      { label: "2026", href: "#" },
      { label: "Tx 0x9a1b…" },
    ],
  },
};
