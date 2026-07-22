import React from "react";
import { CardStatus } from "./CardStatus.jsx";

export default {
  title: "Components/Card/Status",
  component: CardStatus,
  parameters: { layout: "padded" },
  argTypes: {
    status: { control: "select", options: ["success", "needApproval", "warning", "error"] },
    title: { control: "text" },
    description: { control: "text" },
    className: { control: "text" },
  },
  args: {
    status: "success",
    title: "Transfer Completed",
  },
};

export const AwaitingApproval = {
  args: {
    status: "needApproval",
    title: "Bank Transfer Awaiting Approval",
    description:
      "Your transfer is submitted and awaiting approval (up to 2 hours). Once approved, it may take 2-5 business days for the funds to be transferred.",
    sections: [
      {
        title: "Recipient Details",
        items: [
          { label: "Recipient Name", value: "Hendra Kwik" },
          { label: "Bank Name", value: "BRI" },
          { label: "Account Number", value: "123948121" },
        ],
      },
      {
        title: "Amount Details",
        items: [
          { label: "Transfer Amount", value: "100,000 XSGD" },
          { label: "Transfer Fee", value: "Rp16,000", info: true },
        ],
      },
    ],
    total: { label: "Net Amount", value: "40 XSGD" },
    footerLink: { text: "View Transaction Details", onClick: () => {} },
  },
};

export const Success = {
  args: {
    status: "success",
    title: "Transfer Completed",
    description: "Your funds have been transferred successfully.",
    sections: [
      {
        title: "Amount Details",
        items: [{ label: "Transfer Amount", value: "100,000 XSGD" }],
      },
    ],
    total: { label: "Net Amount", value: "100,000 XSGD" },
    footerLink: { text: "View Transaction Details", onClick: () => {} },
  },
};
