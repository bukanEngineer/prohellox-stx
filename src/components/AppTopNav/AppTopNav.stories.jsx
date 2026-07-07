import React from "react";
import { AppTopNav } from "./AppTopNav.jsx";
import { Button } from "../Button/Button.jsx";
import { LinkButton } from "../LinkButton/LinkButton.jsx";

export default {
  title: "Compositions/App Top Nav",
  component: AppTopNav,
  parameters: { layout: "fullscreen" },
  argTypes: {
    variant: { control: "inline-radio", options: ["app", "marketing"] },
    account: {
      control: "inline-radio",
      options: ["personal", "business", "sandbox"],
    },
    platform: { control: "inline-radio", options: ["desktop", "mobile"] },
    notifications: { control: { type: "number", min: 0, max: 99 } },
  },
};

const LINKS = [
  { id: "home", label: "Home", href: "#", active: true },
  { id: "balances", label: "Balances", href: "#" },
  { id: "transfer", label: "Transfer", href: "#" },
  { id: "activity", label: "Activity", href: "#" },
];

export const DesktopPersonal = {
  args: {
    account: "personal",
    platform: "desktop",
    links: LINKS,
    notifications: 3,
    user: { name: "John Doe", initials: "JD" },
    onProfileClick: () => {},
    onMenuClick: () => {},
  },
};

export const DesktopBusiness = {
  args: {
    account: "business",
    platform: "desktop",
    links: LINKS,
    notifications: 12,
    user: { name: "John Doe", company: "ABC Pte. Ltd.", initials: "AB" },
    onProfileClick: () => {},
  },
};

export const DesktopSandbox = {
  args: {
    account: "sandbox",
    platform: "desktop",
    links: LINKS,
    notifications: 0,
    user: { name: "John Doe", company: "ABC Pte. Ltd.", initials: "AB" },
    onProfileClick: () => {},
  },
};

export const Mobile = {
  args: {
    account: "business",
    platform: "mobile",
    notifications: 3,
    user: { name: "John Doe", company: "ABC Pte. Ltd.", initials: "AB" },
    onMenuClick: () => {},
    onProfileClick: () => {},
  },
};

export const MobilePersonal = {
  args: {
    account: "personal",
    platform: "mobile",
    notifications: 3,
    user: { name: "John Doe", initials: "JD" },
    onMenuClick: () => {},
    onProfileClick: () => {},
  },
};

export const MobileSandbox = {
  args: {
    account: "sandbox",
    platform: "mobile",
    notifications: 0,
    user: { name: "John Doe", company: "ABC Pte. Ltd.", initials: "AB" },
    onMenuClick: () => {},
    onProfileClick: () => {},
  },
};

const MARKETING_LINKS = [
  { label: "Products", href: "#products", children: true },
  { label: "Stablecoins", href: "#xsgd" },
  { label: "Developers", href: "#docs" },
  { label: "Company", href: "#about" },
  { label: "Blog", href: "#blog" },
];

export const MarketingLight = {
  args: {
    variant: "marketing",
    links: MARKETING_LINKS,
    activeHref: "#xsgd",
    actions: (
      <>
        <Button variant="tertiary" size="sm">Sign in</Button>
        <Button variant="primary" size="sm">Open account</Button>
      </>
    ),
  },
};

export const MarketingDark = {
  args: {
    variant: "marketing",
    appearance: "dark",
    links: MARKETING_LINKS,
    activeHref: "#xsgd",
    actions: (
      <>
        <LinkButton onDark size="md" as="a" href="#signin">Sign in</LinkButton>
        <Button variant="primary" size="md">Open account</Button>
      </>
    ),
  },
  parameters: { backgrounds: { default: "ivy" } },
};
