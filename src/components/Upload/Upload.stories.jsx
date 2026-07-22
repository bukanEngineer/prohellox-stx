import React from "react";
import { Upload } from "./Upload.jsx";

export default {
  title: "Components/Upload",
  component: Upload,
  args: { multiple: false, disabled: false },
  argTypes: {
    label: { control: "text" },
    hint: { control: "text" },
    multiple: { control: "boolean" },
    disabled: { control: "boolean" },
    error: { control: "text" },
    onChange: { action: "onChange" },
  },
  parameters: { layout: "padded" },
  decorators: [(S) => <div style={{ maxWidth: 480 }}><S /></div>],
};

export const Default = { args: { label: "Proof of identity" } };
export const Multiple = { args: { label: "Supporting documents", multiple: true } };
export const Error = { args: { label: "Proof of identity", error: "File must be smaller than 10 MB." } };
export const Disabled = { args: { label: "Proof of identity", disabled: true } };

export const Prefilled = {
  args: {
    label: "Proof of identity",
    files: [
      { name: "passport-front.pdf", size: 1_240_000 },
      { name: "passport-back.pdf", size: 980_000 },
    ],
    multiple: true,
  },
};

// Inline SVG data URI so the thumbnail renders without a network/object URL.
const sampleImage =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='96' height='96'>" +
      "<rect width='96' height='96' fill='%2300d37e'/>" +
      "<rect x='18' y='30' width='60' height='40' rx='4' fill='%23002b2a'/>" +
      "<circle cx='34' cy='44' r='6' fill='%2379ffca'/>" +
      "</svg>"
  );

export const Uploaded = {
  args: {
    label: "Proof of identity",
    multiple: true,
    files: [
      // Image file → renders a thumbnail preview.
      { name: "selfie.png", size: 842_000, type: "image/png", preview: sampleImage },
      // Non-image file → renders a document placeholder icon.
      { name: "address-proof.pdf", size: 1_180_000, type: "application/pdf" },
    ],
  },
};
