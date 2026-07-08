import React from "react";
import { TopNavProfileMenu } from "./TopNavProfileMenu.jsx";

export default {
  title: "Components/Top Nav Profile Menu",
  component: TopNavProfileMenu,
  parameters: { layout: "padded" },
  decorators: [(S) => <div style={{ minHeight: 240 }}><S /></div>],
  argTypes: {
    account: { control: "inline-radio", options: ["personal", "business", "sandbox"] },
  },
};

export const Personal = {
  args: {
    account: "personal",
    onAction: () => {},
  },
};

export const Business = {
  args: {
    account: "business",
    onAction: () => {},
  },
};

export const Sandbox = {
  args: {
    account: "sandbox",
    onAction: () => {},
  },
};
