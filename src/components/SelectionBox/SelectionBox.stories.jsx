import React, { useState } from "react";
import { SelectionBox } from "./SelectionBox.jsx";

export default {
  title: "Components/Selection Box",
  component: SelectionBox,
  parameters: { layout: "padded" },
  argTypes: {
    type: { control: "inline-radio", options: ["radio", "check"] },
    selected: { control: "boolean" },
    disabled: { control: "boolean" },
    label: { control: "text" },
    description: { control: "text" },
  },
  args: {
    type: "radio",
    selected: false,
    disabled: false,
    label: "Bank transfer",
    description: "Arrives in 1-2 business days",
  },
};

const Stack = ({ children }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 420 }}>{children}</div>
);

const WalletIcon = (
  <svg viewBox="0 0 20 20" width="20" height="20" fill="none">
    <rect x="2.5" y="5" width="15" height="11" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M2.5 9 H17.5" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="13.5" cy="12.5" r="1.2" fill="currentColor" />
  </svg>
);

export const Playground = {};

/* ── Radio rows (single-select group) ── */
export const RadioRows = {
  render: () => {
    const [value, setValue] = useState("bank");
    const opts = [
      { value: "bank", label: "Bank transfer", description: "Arrives in 1-2 business days" },
      { value: "card", label: "Debit / credit card", description: "Instant, 1.5% fee" },
      { value: "wallet", label: "StraitsX wallet", description: "Pay from your XSGD balance" },
    ];
    return (
      <Stack>
        {opts.map((o) => (
          <SelectionBox
            key={o.value}
            type="radio"
            name="payment"
            value={o.value}
            label={o.label}
            description={o.description}
            selected={value === o.value}
            onChange={() => setValue(o.value)}
          />
        ))}
      </Stack>
    );
  },
};

/* ── Check rows (multi-select) ── */
export const CheckRows = {
  render: () => {
    const [sel, setSel] = useState({ news: true });
    const toggle = (k) => setSel((p) => ({ ...p, [k]: !p[k] }));
    return (
      <Stack>
        <SelectionBox type="check" label="Product updates" description="New features & releases"
          selected={!!sel.news} onChange={() => toggle("news")} />
        <SelectionBox type="check" label="Security alerts" description="Important account activity"
          selected={!!sel.security} onChange={() => toggle("security")} />
        <SelectionBox type="check" label="Marketing emails" description="Offers & promotions"
          selected={!!sel.marketing} onChange={() => toggle("marketing")} />
      </Stack>
    );
  },
};

/* ── Radio with icon selection type (Figma radioType = Icon) ──
 * The icon replaces the radio circle but the row still behaves as a
 * single-select radio — interaction is driven by `type`, not the icon. */
export const RadioWithIcon = {
  render: () => {
    const [value, setValue] = useState("a");
    return (
      <Stack>
        <SelectionBox type="radio" name="acct" value="a" icon={WalletIcon}
          label="Main wallet" description="•••• 4821" selected={value === "a"} onChange={() => setValue("a")} />
        <SelectionBox type="radio" name="acct" value="b" icon={WalletIcon}
          label="Savings wallet" description="•••• 9930" selected={value === "b"} onChange={() => setValue("b")} />
      </Stack>
    );
  },
};

/* ── Selected & disabled states ── */
export const States = {
  render: () => (
    <Stack>
      <SelectionBox type="radio" label="Default" description="Unselected, enabled" />
      <SelectionBox type="radio" label="Selected" description="Highlighted border + background" selected />
      <SelectionBox type="radio" label="Disabled" description="Not interactive" disabled />
      <SelectionBox type="radio" label="Selected + disabled" description="Locked choice" selected disabled />
      <SelectionBox type="check" label="Check selected" selected />
      <SelectionBox type="check" label="Check disabled" disabled />
      <SelectionBox type="check" label="Check selected + disabled" description="Locked multi-select" selected disabled />
      <SelectionBox type="radio" icon={WalletIcon} label="Icon selected" selected />
      <SelectionBox type="radio" icon={WalletIcon} label="Icon disabled" description="Not interactive" disabled />
    </Stack>
  ),
};
