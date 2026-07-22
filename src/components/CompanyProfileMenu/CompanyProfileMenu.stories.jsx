import React from "react";
import { CompanyProfileMenu } from "./CompanyProfileMenu.jsx";

export default {
  title: "Components/Company Profile Menu",
  component: CompanyProfileMenu,
  args: { switchCompany: false },
  parameters: { layout: "padded" },
  decorators: [(S) => <div style={{ minHeight: 320 }}><S /></div>],
  argTypes: {
    switchCompany: { control: "boolean" },
    onSwitch: { action: "onSwitch" },
    onAction: { action: "onAction" },
    className: { control: "text" },
  },
};

const companies = [
  { id: "abc", name: "ABC Pte. Ltd", type: "Business Account", selected: true },
  { id: "xyz", name: "XYZ Pte. Ltd", type: "Business Account" },
];

export const Default = { args: {} };

export const WithSwitchCompany = {
  args: { switchCompany: true, companies },
};

export const SwitchOnly = {
  args: { switchCompany: true, companies, actions: [] },
};
