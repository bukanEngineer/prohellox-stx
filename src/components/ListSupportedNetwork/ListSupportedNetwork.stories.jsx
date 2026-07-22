import React from "react";
import { ListSupportedNetwork } from "./ListSupportedNetwork.jsx";

export default {
  title: "Patterns/List/Supported Network",
  component: ListSupportedNetwork,
  args: { isNew: false },
  parameters: { layout: "padded" },
  argTypes: {
    overflow: { control: "text" },
    isNew: { control: "boolean" },
  },
};

const dot = (c) => (
  <span style={{
    display: "block", width: 20, height: 20, borderRadius: "50%",
    background: c, border: "1.5px solid var(--surface)",
  }} />
);
const marks = [dot("#627EEA"), dot("#8247E5"), dot("#2775CA"), dot("#26A17B")];

export const Default = { args: { networks: marks.slice(0, 3) } };
export const WithOverflow = { args: { networks: marks.slice(0, 3), overflow: 4 } };
export const New = { args: { networks: marks.slice(0, 2), isNew: true } };
export const Single = { args: { networks: marks.slice(0, 1) } };
