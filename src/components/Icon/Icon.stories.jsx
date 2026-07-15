import React from "react";
import { Icon } from "./Icon.jsx";

export default {
  title: "Atoms/Icon",
  component: Icon,
  parameters: { layout: "padded" },
  argTypes: {
    name: { control: "text" },
    size: { control: { type: "range", min: 12, max: 96, step: 2 } },
    filled: { control: "boolean" },
    color: { control: "color" },
  },
  args: { name: "home", size: 24, filled: false },
};

export const Default = {};
export const Filled = { args: { filled: true } };
export const BrandColor = { args: { name: "check_circle", color: "var(--primary)", size: 32 } };

const COMMON = [
  "home", "account_circle", "notifications", "settings", "support_agent",
  "credit_card", "swap_horiz", "savings", "receipt_long", "description",
  "developer_mode", "badge", "group", "help", "flag",
  "search", "close", "check", "expand_more", "arrow_forward",
  "content_copy", "download", "share", "delete", "edit",
  "visibility", "visibility_off", "info", "warning", "error",
  "cloud_upload", "qr_code", "lock", "lock_open", "tune",
];

export const Showcase = {
  args: {},
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 16 }}>
      {COMMON.map((name) => (
        <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: 12, border: "1px solid var(--border)", borderRadius: 8 }}>
          <Icon name={name} size={28} />
          <code style={{ font: "var(--body-small)", color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>{name}</code>
        </div>
      ))}
    </div>
  ),
};
