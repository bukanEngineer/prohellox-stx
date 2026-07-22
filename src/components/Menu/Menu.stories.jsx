import React, { useState } from "react";
import { Menu } from "./Menu.jsx";
import { IconButton } from "../IconButton/IconButton.jsx";
import { Button } from "../Button/Button.jsx";

export default {
  title: "Components/Menu",
  component: Menu,
  parameters: { layout: "centered" },
  argTypes: {
    align: { control: "select", options: ["left", "right"] },
    placement: { control: "select", options: ["top", "bottom"] },
    defaultOpen: { control: "boolean" },
    className: { control: "text" },
  },
  args: {
    align: "left",
    placement: "bottom",
    defaultOpen: false,
  },
};

export const FromIconButton = {
  render: () => (
    <Menu trigger={({ onClick }) => <IconButton icon="more_vert" variant="secondary" onClick={onClick} label="More" />}>
      <Menu.Item icon="download" onSelect={() => {}}>Download statement</Menu.Item>
      <Menu.Item icon="share" onSelect={() => {}}>Share</Menu.Item>
      <Menu.Divider />
      <Menu.Item icon="delete" tone="critical" onSelect={() => {}}>Delete</Menu.Item>
    </Menu>
  ),
};

export const Sectioned = {
  render: () => (
    <Menu align="right" trigger={({ onClick }) => <Button variant="secondary" onClick={onClick}>Filters</Button>}>
      <Menu.Label>Status</Menu.Label>
      <Menu.Item icon="check_circle">Active</Menu.Item>
      <Menu.Item icon="schedule">Pending</Menu.Item>
      <Menu.Divider />
      <Menu.Label>Currency</Menu.Label>
      <Menu.Item>XSGD</Menu.Item>
      <Menu.Item>XIDR</Menu.Item>
      <Menu.Item>XUSD</Menu.Item>
    </Menu>
  ),
};

export const SingleSelect = {
  render: () => {
    const [value, setValue] = useState("xsgd");
    return (
      <Menu trigger={({ onClick }) => <Button variant="secondary" onClick={onClick}>Currency</Button>}>
        <Menu.Label>Currency</Menu.Label>
        {["xsgd", "xidr", "xusd"].map((c) => (
          <Menu.Item
            key={c}
            selectable="single"
            selected={value === c}
            onSelect={() => setValue(c)}
          >
            {c.toUpperCase()}
          </Menu.Item>
        ))}
      </Menu>
    );
  },
};

export const MultiSelect = {
  render: () => {
    const [sel, setSel] = useState(["active"]);
    const toggle = (k) =>
      setSel((s) => (s.includes(k) ? s.filter((x) => x !== k) : [...s, k]));
    const opts = [
      { k: "active", label: "Active" },
      { k: "pending", label: "Pending" },
      { k: "failed", label: "Failed" },
    ];
    return (
      <Menu trigger={({ onClick }) => <Button variant="secondary" onClick={onClick}>Status</Button>}>
        <Menu.Label>Status</Menu.Label>
        {opts.map((o) => (
          <Menu.Item
            key={o.k}
            selectable="multiple"
            selected={sel.includes(o.k)}
            onSelect={() => toggle(o.k)}
          >
            {o.label}
          </Menu.Item>
        ))}
      </Menu>
    );
  },
};

export const WithDisabledItem = {
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ minHeight: 220 }}>
      <Menu defaultOpen trigger={({ onClick }) => <IconButton icon="more_vert" variant="secondary" onClick={onClick} label="More" />}>
        <Menu.Item icon="download" onSelect={() => {}}>Download statement</Menu.Item>
        <Menu.Item icon="share" disabled onSelect={() => {}}>Share (disabled)</Menu.Item>
        <Menu.Divider />
        <Menu.Item icon="delete" tone="critical" disabled onSelect={() => {}}>Delete (disabled)</Menu.Item>
      </Menu>
    </div>
  ),
};

export const WithSecondaryText = {
  render: () => (
    <Menu trigger={({ onClick }) => <IconButton icon="more_vert" variant="secondary" onClick={onClick} label="More" />}>
      <Menu.Item icon="account_balance" secondary="DBS •••• 8829" trailing="Default">Primary account</Menu.Item>
      <Menu.Item icon="credit_card" secondary="Visa •••• 4012" trailing="2m ago">Card</Menu.Item>
      <Menu.Divider />
      <Menu.Item icon="add">Add payment method</Menu.Item>
    </Menu>
  ),
};
