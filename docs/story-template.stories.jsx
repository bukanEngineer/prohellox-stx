/**
 * Story template — copy this file when creating a new component story.
 *
 * Naming: ComponentName.stories.jsx (co-located with the component)
 * Format: CSF3 (Component Story Format)
 *
 * Categories (pick one for `title`):
 *   Atoms/        — smallest building blocks (Button, Icon, Tag, Badge)
 *   Components/   — generic composed UI pieces (Input, Modal, Table, Sidebar)
 *   Patterns/     — assembled with domain data (Field/Bank, Dropdown/Asset, CardSwap)
 *   Examples/     — full-page demos
 */
import React from "react";
// import { ComponentName } from "./ComponentName.jsx";

export default {
  title: "Components/ComponentName",
  // component: ComponentName,
  parameters: { layout: "padded" }, // "padded" | "centered" | "fullscreen"
  argTypes: {
    label: { control: "text" },
    disabled: { control: "boolean" },
    size: { control: "select", options: ["sm", "md", "lg"] },
    onChange: { action: "changed" },
  },
  args: {
    label: "Example",
    disabled: false,
    size: "md",
  },
};

// Simplest story — renders with default args, controls panel fully interactive
export const Default = {};

// Override specific args for a variant
export const Disabled = { args: { disabled: true } };

// Use render when the component needs state or wrapping
export const WithState = {
  render: (args) => {
    const [value, setValue] = React.useState("");
    return null; // <ComponentName {...args} value={value} onChange={setValue} />
  },
};
