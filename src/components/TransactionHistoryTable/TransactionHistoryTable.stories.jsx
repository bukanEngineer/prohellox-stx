import React from "react";
import { TransactionHistoryTable } from "./TransactionHistoryTable.jsx";

export default {
  title: "Patterns/Transaction History Table",
  component: TransactionHistoryTable,
  parameters: { layout: "padded" },
  argTypes: {
    type: { control: "select", options: ["funding", "otc", "swap"] },
    empty: { control: "text" },
  },
  args: {
    type: "funding",
    empty: "No transactions yet.",
  },
};

const fundingRows = [
  {
    id: "174...bfb19",
    date: "22 Oct 2024, 12:03",
    amount: "1,000,000 USD",
    network: "Polygon",
    wallet: "0x77dce4813eC15650e57E1b999c197aad00bEc",
    status: "Pending",
  },
  {
    id: "182...a0c41",
    date: "21 Oct 2024, 09:47",
    amount: "250,000 USD",
    network: "Ethereum",
    wallet: "0x9aB2f4C1d6E7A0b3C4d5E6f7890123456789aBcd",
    status: "Completed",
  },
  {
    id: "190...77f02",
    date: "20 Oct 2024, 18:12",
    amount: "75,500 USD",
    network: "Arbitrum",
    wallet: "0x1f2e3d4c5b6a79808172635445362718091a2b3c",
    status: "Action Needed",
  },
];

const otcRows = [
  {
    id: "174...bfb19",
    date: "22 Oct 2024, 12:03",
    amountToBuy: "100,000 USDT",
    amountToSell: "129,630 XSGD",
    pair: "XSGD/USDT",
    rate: "0.7714",
    status: "Processing",
  },
  {
    id: "165...3ad88",
    date: "22 Oct 2024, 10:21",
    amountToBuy: "50,000 USDC",
    amountToSell: "64,900 XSGD",
    pair: "XSGD/USDC",
    rate: "0.7704",
    status: "Completed",
  },
  {
    id: "159...91b04",
    date: "21 Oct 2024, 16:58",
    amountToBuy: "20,000 USDT",
    amountToSell: "25,950 XSGD",
    pair: "XSGD/USDT",
    rate: "0.7707",
    status: "Cancelled",
  },
];

const swapRows = [
  {
    id: "174...bfb19",
    date: "22 Oct 2024, 12:03",
    details: "Swap from USDT to USDC",
    pair: "USDT/USDC",
    sell: "132.00 USDT",
    buy: "131.80 USDC",
    price: "1 USDT ≈ 0.9985 USDC",
    fee: "0.00",
    status: "Completed",
  },
  {
    id: "168...2cd77",
    date: "21 Oct 2024, 14:30",
    details: "Swap from XSGD to USDC",
    pair: "XSGD/USDC",
    sell: "500.00 XSGD",
    buy: "385.20 USDC",
    price: "1 XSGD ≈ 0.7704 USDC",
    fee: "0.50",
    status: "Processing",
  },
];

export const Funding = {
  render: () => <TransactionHistoryTable type="funding" rows={fundingRows} />,
};

export const OTC = {
  render: () => <TransactionHistoryTable type="otc" rows={otcRows} />,
};

export const Swap = {
  render: () => <TransactionHistoryTable type="swap" rows={swapRows} />,
};

export const Empty = {
  render: () => <TransactionHistoryTable type="funding" rows={[]} />,
};
