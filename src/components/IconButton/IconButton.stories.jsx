import React from "react";
import { IconButton } from "./IconButton.jsx";

export default {
  title: "Atoms/Icon Button",
  component: IconButton,
  parameters: { layout: "centered" },
  argTypes: {
    icon: { control: "text" },
    variant: { control: "inline-radio", options: ["primary", "secondary", "tertiary"] },
    shape: { control: "inline-radio", options: ["circle", "square"] },
    size: { control: "inline-radio", options: ["lg", "sm"] },
    disabled: { control: "boolean" },
  },
  args: { icon: "notifications", label: "Notifications", disabled: false },
};

export const Primary = { args: { variant: "primary" } };
export const Secondary = { args: { variant: "secondary" } };
export const Tertiary = { args: { variant: "tertiary" } };

export const AllSizes = {
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <IconButton icon="search" variant="secondary" size="lg" label="Search lg" />
      <IconButton icon="search" variant="secondary" size="sm" label="Search sm" />
    </div>
  ),
};

export const Disabled = { args: { variant: "primary", disabled: true, icon: "notifications", label: "Notifications" } };

/* Interaction states forced via state-class hooks so Chromatic can snapshot
 * hover / pressed without driving real pointer events. */
export const States = {
  parameters: { layout: "padded" },
  render: () => {
    const variants = ["primary", "secondary", "tertiary"];
    const colHead = { font: "var(--label-small)", color: "var(--text-secondary)" };
    return (
      <div style={{ display: "grid", gridTemplateColumns: "auto repeat(4, max-content)", gap: 16, alignItems: "center" }}>
        <span />
        <span style={colHead}>Enabled</span>
        <span style={colHead}>Hovered</span>
        <span style={colHead}>Pressed</span>
        <span style={colHead}>Disabled</span>
        {variants.map((v) => (
          <React.Fragment key={v}>
            <span style={{ ...colHead, textTransform: "capitalize" }}>{v}</span>
            <IconButton icon="notifications" variant={v} label={`${v} enabled`} />
            <IconButton icon="notifications" variant={v} className="is-hovered" label={`${v} hovered`} />
            <IconButton icon="notifications" variant={v} className="is-pressed" label={`${v} pressed`} />
            <IconButton icon="notifications" variant={v} disabled label={`${v} disabled`} />
          </React.Fragment>
        ))}
      </div>
    );
  },
};

export const Showcase = {
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <IconButton icon="close" variant="tertiary" label="Close" />
      <IconButton icon="more_vert" variant="tertiary" label="More" />
      <IconButton icon="notifications" variant="secondary" label="Notifications" />
      <IconButton icon="settings" variant="secondary" shape="square" label="Settings" />
      <IconButton icon="arrow_forward" variant="primary" label="Next" />
      <IconButton icon="check" variant="primary" shape="square" label="Confirm" />
    </div>
  ),
};
