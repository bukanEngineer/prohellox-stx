import React, { useState } from "react";
import { Card } from "../Card/Card.jsx";
import { EmptyState } from "../EmptyState/EmptyState.jsx";
import "./TransferPanel.css";

const DEFAULT_TABS = [
  { id: "in", label: "Transfer In" },
  { id: "out", label: "Transfer Out" },
  { id: "swap", label: "Swap" },
];

export function TransferPanel({
  tabs = DEFAULT_TABS,
  defaultTab,
  activeTab,
  onTabChange,
  children,
}) {
  const [internal, setInternal] = useState(defaultTab || tabs[0]?.id);
  const current = activeTab ?? internal;
  const handleSelect = (id) => {
    if (activeTab === undefined) setInternal(id);
    onTabChange && onTabChange(id);
  };
  return (
    <Card shadow={1} className="transfer">
      <div className="tabs" role="tablist">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={current === t.id}
            className={"tab" + (current === t.id ? " is-active" : "")}
            onClick={() => handleSelect(t.id)}
            type="button"
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="transfer__body">
        {children ?? (
          <EmptyState
            title="Verify your account and complete the assessment to transact."
            sub="You won't be able to initiate any transactions until verification is completed."
          />
        )}
      </div>
    </Card>
  );
}
