import React from "react";
import "./ListBlockchain.css";
import { Tag } from "../Tag/Tag.jsx";

export function ListBlockchain({
  name = "Wallet",
  address,
  meta,
  icon,
  variant = "verifiedPrivateWallet",
  onAction,
  actionLabel = "Verify",
  className = "",
  ...rest
}) {
  const isPending = variant === "pending";
  const isVerify = variant === "verify";
  const cls = ["list-blockchain", `list-blockchain--${variant}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cls} {...rest}>
      <div className="list-blockchain__main">
        {icon != null && <span className="list-blockchain__icon">{icon}</span>}
        <div className="list-blockchain__text">
          <span className="list-blockchain__name">{name}</span>
          {address && <span className="list-blockchain__sub">{address}</span>}
          {meta && <span className="list-blockchain__sub">{meta}</span>}
        </div>
      </div>

      {isPending && (
        <Tag tone="warning" className="list-blockchain__tag">
          Pending
        </Tag>
      )}

      {isVerify && (
        <button
          type="button"
          className="list-blockchain__link"
          onClick={onAction}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
