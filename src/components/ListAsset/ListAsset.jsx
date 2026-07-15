import React from "react";
import "./ListAsset.css";
import { ListSupportedNetwork } from "../ListSupportedNetwork/ListSupportedNetwork.jsx";

export function ListAsset({
  symbol = "XSGD",
  subtitle = "1:1 to SGD",
  balance = "0.00",
  balanceSub,
  icon,
  variant = "stablecoin",
  platform = "desktop",
  networks,
  networkOverflow = 0,
  networkIsNew = false,
  actions,
  onAdd,
  onSend,
  showAction = true,
  className = "",
  ...rest
}) {
  const isMobile = platform === "mobile";
  const cls = [
    "list-asset",
    `list-asset--${platform}`,
    `list-asset--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const hasNetworks =
    variant === "stablecoin" &&
    ((networks && networks.length > 0) || networkOverflow > 0 || networkIsNew);

  return (
    <div className={cls} {...rest}>
      <div className="list-asset__lead">
        {icon != null && <span className="list-asset__icon">{icon}</span>}
        <div className="list-asset__currency">
          <span className="list-asset__symbol">{symbol}</span>
          {subtitle && <span className="list-asset__subtitle">{subtitle}</span>}
        </div>
      </div>

      <div className="list-asset__balance">
        <span className="list-asset__balance-value numeric">{balance}</span>
        {balanceSub && (
          <span className="list-asset__balance-sub">{balanceSub}</span>
        )}
      </div>

      {hasNetworks && (
        <ListSupportedNetwork
          className="list-asset__networks"
          networks={networks || []}
          overflow={networkOverflow}
          isNew={networkIsNew}
        />
      )}

      {showAction && !isMobile && (
        <div className="list-asset__actions">
          {actions != null ? (
            actions
          ) : (
            <>
              <button
                type="button"
                className="list-asset__icon-btn"
                aria-label="Add"
                onClick={onAdd}
              >
                <span className="material-symbols-rounded">add</span>
              </button>
              <button
                type="button"
                className="list-asset__icon-btn"
                aria-label="Send"
                onClick={onSend}
              >
                <span className="material-symbols-rounded">arrow_outward</span>
              </button>
            </>
          )}
        </div>
      )}

      {isMobile && (
        <span className="list-asset__chevron material-symbols-rounded" aria-hidden="true">
          arrow_forward_ios
        </span>
      )}
    </div>
  );
}
