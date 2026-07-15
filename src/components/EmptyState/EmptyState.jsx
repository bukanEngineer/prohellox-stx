import React from "react";
import "./EmptyState.css";

export function EmptyState({ title, sub, compact = false, className = "" }) {
  const cls = ["empty", compact && "is-compact", className].filter(Boolean).join(" ");
  return (
    <div className={cls}>
      {title && <div className="empty__title">{title}</div>}
      {sub && <div className="empty__sub">{sub}</div>}
    </div>
  );
}
