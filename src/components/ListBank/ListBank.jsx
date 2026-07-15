import React from "react";
import "./ListBank.css";
import { Tag } from "../Tag/Tag.jsx";

export function ListBank({
  name = "John Doe",
  account,
  swift,
  logo,
  variant = "unverified",
  onAction,
  actionLabel,
  className = "",
  ...rest
}) {
  const isVerified = variant === "verified";
  const isRejected = variant === "rejected";
  const cls = ["list-bank", `list-bank--${variant}`, className]
    .filter(Boolean)
    .join(" ");

  const label = actionLabel || (isRejected ? "Resubmit" : "Verify");

  return (
    <div className={cls} {...rest}>
      <div className="list-bank__main">
        {logo != null && <span className="list-bank__logo">{logo}</span>}
        <div className="list-bank__text">
          <span className="list-bank__name">{name}</span>
          {account && <span className="list-bank__sub">{account}</span>}
          {isVerified && swift && (
            <span className="list-bank__sub">{swift}</span>
          )}
          {isRejected && (
            <Tag tone="critical" shape="default" className="list-bank__tag">
              Rejected
            </Tag>
          )}
        </div>
      </div>
      {!isVerified && (
        <button type="button" className="list-bank__link" onClick={onAction}>
          {label}
        </button>
      )}
    </div>
  );
}
