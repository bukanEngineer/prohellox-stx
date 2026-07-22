import React from "react";
import { PageTitle } from "./PageTitle.jsx";
import { Breadcrumb } from "../Breadcrumb/Breadcrumb.jsx";
import { Button } from "../Button/Button.jsx";

export default {
  title: "Components/Page Title",
  component: PageTitle,
  parameters: { layout: "padded" },
  decorators: [(S) => <div style={{ maxWidth: 960 }}><S /></div>],
  argTypes: {
    title: { control: "text" },
    subtitle: { control: "text" },
    className: { control: "text" },
  },
  args: {
    title: "Transaction History",
    subtitle: "All transactions across XSGD, XIDR, and XUSD.",
  },
};

export const Default = {
  args: { title: "Transaction History", subtitle: "All transactions across XSGD, XIDR, and XUSD." },
};

export const WithActions = {
  args: {
    title: "Transaction History",
    subtitle: "All transactions across XSGD, XIDR, and XUSD.",
    actions: (
      <>
        <Button variant="secondary" size="md">Export CSV</Button>
        <Button variant="primary" size="md">New transfer</Button>
      </>
    ),
  },
};

export const WithBreadcrumb = {
  args: {
    title: "Tx 0x9a1b…",
    breadcrumb: <Breadcrumb items={[{ label: "Home", href: "#" }, { label: "Transaction History", href: "#" }, { label: "Tx 0x9a1b…" }]} />,
  },
};

export const Mobile = {
  decorators: [(S) => <div style={{ width: 375 }}><S /></div>],
  args: {
    title: "Transaction History",
    subtitle: "All transactions across XSGD, XIDR, and XUSD.",
    actions: (
      <>
        <Button variant="secondary" size="md">Export CSV</Button>
        <Button variant="primary" size="md">New transfer</Button>
      </>
    ),
  },
};
