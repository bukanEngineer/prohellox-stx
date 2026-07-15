import React, { useState } from "react";
import { Table } from "./Table.jsx";
import { Tag } from "../Tag/Tag.jsx";
import { Pagination } from "../Pagination/Pagination.jsx";
import { Button } from "../Button/Button.jsx";
import { IconButton } from "../IconButton/IconButton.jsx";
import { ToastProvider, useToast } from "../Toast/Toast.jsx";

export default {
  title: "Components/Table",
  component: Table,
  args: { zebra: false },
  parameters: { layout: "padded" },
};

const rows = [
  { id: 1, date: "2026-05-22", ref: "TX-1029384", to: "John Doe",      asset: "XSGD", amount: 1250.0,  status: "Completed" },
  { id: 2, date: "2026-05-20", ref: "TX-1029301", to: "Acme Pte. Ltd.", asset: "XSGD", amount: 8400.5,  status: "Completed" },
  { id: 3, date: "2026-05-19", ref: "TX-1029220", to: "Mei Lin",        asset: "XIDR", amount: 2200000, status: "Pending"   },
  { id: 4, date: "2026-05-18", ref: "TX-1029108", to: "0xa1B…f2",       asset: "XUSD", amount: 500.0,   status: "Failed"    },
];

const tone = { Completed: "positive", Pending: "warning", Failed: "critical" };

const columns = [
  { key: "date", header: "Date" },
  { key: "ref", header: "Reference", render: (r) => <code style={{ fontFamily: "var(--font-mono)" }}>{r.ref}</code> },
  { key: "to", header: "To / From" },
  { key: "asset", header: "Asset" },
  { key: "amount", header: "Amount", numeric: true, render: (r) => r.amount.toLocaleString(undefined, { minimumFractionDigits: 2 }) },
  { key: "status", header: "Status", render: (r) => <Tag tone={tone[r.status] || "neutral"}>{r.status}</Tag> },
];

export const Default = { args: { columns, rows } };
export const Zebra = { args: { columns, rows, zebra: true } };
export const Empty = { args: { columns, rows: [] } };

/* ── Cell variants: 2-line, inline button, copy-link, leading/trailing icon ── */
function CopyReferenceCell({ value }) {
  const [copied, setCopied] = useState(false);
  const toast = useToast();

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.show({ tone: "positive", message: "Copied to clipboard" });
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
      <code style={{ fontFamily: "var(--font-mono)" }}>{value}</code>
      <IconButton
        icon={copied ? "check" : "content_copy"}
        variant="tertiary"
        size="sm"
        label={copied ? "Copied" : "Copy reference"}
        onClick={copy}
      />
    </span>
  );
}

export const CellVariants = {
  decorators: [(S) => <ToastProvider><S /></ToastProvider>],
  render: () => {
    const cellRows = [
      { id: 1, name: "John Doe", email: "john@acme.co", ref: "TX-1029384", network: "Ethereum", chain: "Mainnet" },
      { id: 2, name: "Acme Pte. Ltd.", email: "ops@acme.co", ref: "TX-1029301", network: "Polygon", chain: "PoS" },
      { id: 3, name: "Mei Lin", email: "mei@example.sg", ref: "TX-1029220", network: "Solana", chain: "Mainnet" },
    ];
    const cellColumns = [
      {
        key: "recipient",
        header: "Recipient",
        render: (r) => (
          <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span style={{ font: "var(--body-bold-medium)", color: "var(--text-primary)" }}>{r.name}</span>
            <span style={{ font: "var(--body-small)", color: "var(--text-secondary)" }}>{r.email}</span>
          </span>
        ),
      },
      {
        key: "reference",
        header: "Reference",
        render: (r) => <CopyReferenceCell value={r.ref} />,
      },
      {
        key: "network",
        header: "Network",
        render: (r) => (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <span className="material-symbols-rounded" style={{ color: "var(--text-secondary)", fontSize: 18 }}>hub</span>
            <span>{r.network}</span>
            <span className="material-symbols-rounded" style={{ color: "var(--text-secondary)", fontSize: 18 }}>chevron_right</span>
          </span>
        ),
      },
      {
        key: "action",
        header: "Action",
        align: "right",
        render: () => (
          <Button variant="secondary" size="sm">View</Button>
        ),
      },
    ];
    return <Table columns={cellColumns} rows={cellRows} />;
  },
};

/* ── Fixed header: pins the header row while the body scrolls vertically ── */
export const FixedHeader = {
  render: () => {
    const manyRows = Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      date: `2026-05-${String(22 - (i % 22)).padStart(2, "0")}`,
      ref: `TX-10293${84 - i}`,
      to: ["John Doe", "Acme Pte. Ltd.", "Mei Lin", "0xa1B…f2"][i % 4],
      asset: ["XSGD", "XIDR", "XUSD"][i % 3],
      amount: 1250 + i * 37.5,
      status: ["Completed", "Pending", "Failed"][i % 3],
    }));
    return <Table columns={columns} rows={manyRows} scrollY={320} />;
  },
};

/* ── Fixed columns: pins leading/trailing columns while the body scrolls horizontally ── */
export const FixedColumns = {
  render: () => {
    const wideColumns = [
      { key: "date", header: "Date", width: 160, fixed: "left" },
      { key: "ref", header: "Reference", width: 180, render: (r) => <code style={{ fontFamily: "var(--font-mono)" }}>{r.ref}</code> },
      { key: "to", header: "To / From", width: 220 },
      { key: "asset", header: "Asset", width: 160 },
      { key: "network", header: "Network", width: 180 },
      { key: "chain", header: "Chain", width: 160 },
      { key: "memo", header: "Memo", width: 240 },
      { key: "amount", header: "Amount", numeric: true, width: 160, render: (r) => r.amount.toLocaleString(undefined, { minimumFractionDigits: 2 }) },
      { key: "status", header: "Status", width: 160, fixed: "right", render: (r) => <Tag tone={tone[r.status] || "neutral"}>{r.status}</Tag> },
    ];
    const wideRows = rows.map((r) => ({ ...r, network: "Ethereum", chain: "Mainnet", memo: "Invoice #4471" }));
    return <Table columns={wideColumns} rows={wideRows} scrollX={1400} />;
  },
};

/* ── Sortable headers: Table only tracks/displays sort state; the consumer
 * sorts the rows it passes in. ── */
export const Sortable = {
  render: () => {
    const sortableColumns = columns.map((c) =>
      ["date", "amount"].includes(c.key) ? { ...c, sortable: true } : c
    );
    const [sort, setSort] = useState({ key: "date", direction: "desc" });

    const sortedRows = [...rows].sort((a, b) => {
      if (!sort) return 0;
      const { key, direction } = sort;
      const mult = direction === "asc" ? 1 : -1;
      return a[key] > b[key] ? mult : a[key] < b[key] ? -mult : 0;
    });

    return <Table columns={sortableColumns} rows={sortedRows} sort={sort} onSortChange={setSort} />;
  },
};

export const WithPagination = {
  render: () => {
    const [p, setP] = useState(1);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Table columns={columns} rows={rows} />
        <Pagination page={p} totalPages={12} pageSize={4} total={48} onChange={setP} showSummary />
      </div>
    );
  },
};
