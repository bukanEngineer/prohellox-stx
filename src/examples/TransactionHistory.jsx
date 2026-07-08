import React, { useState } from "react";
import { Sidebar, DEFAULT_NAV_ITEMS } from "../components/Sidebar/Sidebar.jsx";
import { TopNavigation } from "../components/TopNavigation/TopNavigation.jsx";
import { PageTitle } from "../components/PageTitle/PageTitle.jsx";
import { Breadcrumb } from "../components/Breadcrumb/Breadcrumb.jsx";
import { Tabs } from "../components/Tabs/Tabs.jsx";
import { Table } from "../components/Table/Table.jsx";
import { Pagination } from "../components/Pagination/Pagination.jsx";
import { Tag } from "../components/Tag/Tag.jsx";
import { Button } from "../components/Button/Button.jsx";
import { Input } from "../components/Input/Input.jsx";
import { Menu } from "../components/Menu/Menu.jsx";
import { IconButton } from "../components/IconButton/IconButton.jsx";
import "./TransactionHistory.css";

const ALL_ROWS = Array.from({ length: 48 }).map((_, i) => {
  const statuses = ["Completed", "Completed", "Completed", "Pending", "Failed"];
  const assets = ["XSGD", "XSGD", "XIDR", "XUSD"];
  const counterparties = ["John Doe", "Acme Pte. Ltd.", "Mei Lin", "0xa1B…f2", "Standard Chartered Bank", "Hana Bank"];
  return {
    id: i + 1,
    date: `2026-05-${String(28 - (i % 28)).padStart(2, "0")}`,
    ref: `TX-10${(29000 + i * 13).toString().slice(-5)}`,
    to: counterparties[i % counterparties.length],
    asset: assets[i % assets.length],
    amount: ((i % 7) + 1) * 125.5 + (i % 3) * 1000,
    status: statuses[i % statuses.length],
  };
});

const tone = { Completed: "positive", Pending: "warning", Failed: "critical" };

export function TransactionHistory() {
  const [page, setPage] = useState(1);
  const [tab, setTab] = useState("all");
  const pageSize = 8;

  const filtered = tab === "all" ? ALL_ROWS : ALL_ROWS.filter((r) => r.status.toLowerCase() === tab);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const rows = filtered.slice((page - 1) * pageSize, page * pageSize);

  const columns = [
    { key: "date", header: "Date" },
    { key: "ref", header: "Reference", render: (r) => <code style={{ fontFamily: "var(--font-mono)" }}>{r.ref}</code> },
    { key: "to", header: "Counterparty" },
    { key: "asset", header: "Asset" },
    { key: "amount", header: "Amount", numeric: true, render: (r) => r.amount.toLocaleString(undefined, { minimumFractionDigits: 2 }) },
    { key: "status", header: "Status", render: (r) => <Tag tone={tone[r.status] || "neutral"}>{r.status}</Tag> },
    {
      key: "actions",
      header: "",
      render: (_r) => (
        <Menu trigger={({ onClick }) => <IconButton icon="more_vert" size="sm" onClick={onClick} label="Row actions" />} align="right">
          <Menu.Item icon="visibility">View details</Menu.Item>
          <Menu.Item icon="download">Download receipt</Menu.Item>
          <Menu.Divider />
          <Menu.Item icon="report" tone="critical">Report issue</Menu.Item>
        </Menu>
      ),
    },
  ];

  return (
    <div className="ex-pa" data-screen-label="02 Transaction history">
      <Sidebar items={DEFAULT_NAV_ITEMS} active="history" onSelect={() => {}} />
      <main className="ex-pa__main">
        <div className="ex-pa__head">
          <TopNavigation
            account="business"
            notifications={2}
            user={{ name: "John Doe", company: "ABC Pte. Ltd." }}
          />
        </div>
        <PageTitle
          breadcrumb={<Breadcrumb items={[{ label: "Home", href: "#" }, { label: "Transaction History" }]} />}
          title="Transaction History"
          subtitle="All inbound and outbound transactions across XSGD, XIDR and XUSD."
          actions={
            <>
              <Button variant="secondary" size="md">Export CSV</Button>
              <Button variant="primary" size="md">New transfer</Button>
            </>
          }
        />

        <div className="ex-pa__col">
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ maxWidth: 320, flex: 1 }}>
              <Input type="search" placeholder="Search by reference, counterparty or amount" />
            </div>
            <Menu trigger={({ onClick }) => <Button variant="secondary" size="md" onClick={onClick}>Filters</Button>} align="left">
              <Menu.Label>Asset</Menu.Label>
              <Menu.Item>XSGD</Menu.Item>
              <Menu.Item>XIDR</Menu.Item>
              <Menu.Item>XUSD</Menu.Item>
              <Menu.Divider />
              <Menu.Label>Date</Menu.Label>
              <Menu.Item>Last 30 days</Menu.Item>
              <Menu.Item>Last 90 days</Menu.Item>
              <Menu.Item>Custom range…</Menu.Item>
            </Menu>
          </div>

          <Tabs
            activeTab={tab}
            onTabChange={(t) => { setTab(t); setPage(1); }}
            items={[
              { id: "all", label: "All" },
              { id: "completed", label: "Completed" },
              { id: "pending", label: "Pending" },
              { id: "failed", label: "Failed" },
            ]}
          />

          <Table columns={columns} rows={rows} />

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Pagination
              page={page}
              totalPages={totalPages}
              pageSize={pageSize}
              total={filtered.length}
              onChange={setPage}
              showSummary
            />
          </div>
        </div>
      </main>
    </div>
  );
}
