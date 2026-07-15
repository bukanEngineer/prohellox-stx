import React, { useState } from "react";
import { Tag } from "./Tag.jsx";

export default {
  title: "Atoms/Tag",
  component: Tag,
  parameters: { layout: "centered" },
  argTypes: {
    variant: { control: "inline-radio", options: ["outlined", "new"], table: { defaultValue: { summary: "outlined" } } },
    tone: { control: "inline-radio", options: ["neutral", "positive", "critical", "warning", "info"], table: { defaultValue: { summary: "neutral" } } },
    size: { control: "inline-radio", options: ["large", "small"], table: { defaultValue: { summary: "large" } } },
    icon: { control: "text" },
    removable: { control: "boolean", table: { defaultValue: { summary: "false" } } },
    onRemove: { action: "removed", table: { category: "Events" } },
    clickable: { control: "boolean", table: { defaultValue: { summary: "false" } } },
    selected: { control: "boolean", table: { defaultValue: { summary: "false" } } },
    disabled: { control: "boolean", table: { defaultValue: { summary: "false" } } },
    onClick: { action: "clicked", table: { category: "Events" } },
    children: { control: "text" },
  },
  args: {
    variant: "outlined",
    tone: "positive",
    size: "large",
    removable: false,
    clickable: false,
    selected: false,
    disabled: false,
    children: "Verified",
  },
};

export const Positive = { args: { tone: "positive", children: "Verified" } };
export const Critical = { args: { tone: "critical", children: "Failed" } };
export const Warning = { args: { tone: "warning", children: "Pending" } };
export const Info = { args: { tone: "info", children: "Information" } };
export const Neutral = { args: { tone: "neutral", children: "Not Verified" } };
export const New = { args: { variant: "new", children: "New" } };

export const AllTones = {
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Tag tone="positive">Verified</Tag>
      <Tag tone="critical">Failed</Tag>
      <Tag tone="warning">Pending</Tag>
      <Tag tone="info">Information</Tag>
      <Tag tone="neutral">Not Verified</Tag>
      <Tag variant="new">New</Tag>
    </div>
  ),
};

export const WithIcon = {
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
      <Tag tone="positive" icon="check_circle">Verified</Tag>
      <Tag tone="critical" icon="error">Failed</Tag>
      <Tag tone="warning" icon="schedule">Pending</Tag>
      <Tag tone="info" icon="info">Information</Tag>
      <Tag variant="new" size="small" icon="star">New</Tag>
    </div>
  ),
};

export const Sizes = {
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
      <Tag size="large" tone="info">Large</Tag>
      <Tag size="small" tone="info">Small</Tag>
      <Tag size="large" variant="new">Large new</Tag>
      <Tag size="small" variant="new">Small new</Tag>
    </div>
  ),
};

export const Removable = {
  parameters: { layout: "padded" },
  render: () => {
    const [tags, setTags] = useState(["Singapore", "Indonesia", "Vietnam"]);
    return (
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        {tags.map((t) => (
          <Tag key={t} tone="neutral" removable onRemove={() => setTags((prev) => prev.filter((x) => x !== t))}>
            {t}
          </Tag>
        ))}
        <Tag tone="neutral" removable disabled>Locked</Tag>
        {tags.length === 0 && <span style={{ color: "var(--text-secondary)" }}>All removed</span>}
      </div>
    );
  },
};

export const Clickable = {
  parameters: { layout: "padded" },
  render: () => {
    const opts = ["All", "Deposits", "Withdrawals", "Swaps"];
    const [active, setActive] = useState("All");
    return (
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        {opts.map((o) => (
          <Tag
            key={o}
            tone="neutral"
            clickable
            selected={active === o}
            onClick={() => setActive(o)}
          >
            {o}
          </Tag>
        ))}
        <Tag tone="neutral" clickable disabled>Disabled</Tag>
      </div>
    );
  },
};

export const ClickableSelectedStates = {
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
      <Tag tone="neutral" clickable>Enabled</Tag>
      <Tag tone="neutral" clickable selected>Selected</Tag>
      <Tag tone="neutral" clickable disabled>Disabled</Tag>
    </div>
  ),
};
