import React from "react";
import { Icon } from "../Icon/Icon.jsx";
import "./EstimatedBalance.css";

export function EstimatedBalance({
  label = "Estimated Balance",
  amount = "2,081.23",
  currency = "SGD",
  showInfo = true,
  className = "",
  ...rest
}) {
  const cls = ["estimated-balance", className].filter(Boolean).join(" ");
  return (
    <div className={cls} {...rest}>
      <div className="estimated-balance__title">
        <span className="estimated-balance__label">{label}</span>
        {showInfo && <Icon name="info" size={18} className="estimated-balance__info" />}
      </div>
      <div className="estimated-balance__amount">
        <span className="estimated-balance__value">{amount}</span>
        {currency && <span className="estimated-balance__currency">{currency}</span>}
      </div>
    </div>
  );
}
