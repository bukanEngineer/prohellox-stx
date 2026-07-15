import React from "react";
import { Icon } from "../Icon/Icon.jsx";
import { IconButton } from "../IconButton/IconButton.jsx";
import "./CardAsset.css";

export function CardAsset({
  title = "My Assets",
  assets = [],
  banner,
  onRefresh,
  onAdd,
  onSend,
  className = "",
  ...rest
}) {
  const cls = ["card-asset", className].filter(Boolean).join(" ");
  return (
    <section className={cls} {...rest}>
      <header className="card-asset__header">
        <div className="card-asset__title">
          <span>{title}</span>
          {onRefresh && (
            <button type="button" className="card-asset__refresh" onClick={onRefresh} aria-label="Refresh">
              <Icon name="refresh" size={20} />
            </button>
          )}
        </div>
      </header>

      {banner && (
        <div className="card-asset__banner" role="status">
          <Icon name="info" size={24} className="card-asset__banner-icon" />
          <p className="card-asset__banner-text">{banner}</p>
        </div>
      )}

      <ul className="card-asset__list">
        {assets.map((a, i) => (
          <li key={a.symbol || i} className="card-asset__row">
            <div className="card-asset__coin">
              <Coin logo={a.logo} symbol={a.symbol} />
              <div className="card-asset__currency">
                <span className="card-asset__symbol">{a.symbol}</span>
                {a.subtitle && <span className="card-asset__subtitle">{a.subtitle}</span>}
              </div>
            </div>

            <div className="card-asset__balance">
              <span className="card-asset__amount num">{a.balance}</span>
              {a.fiat && <span className="card-asset__fiat">{a.fiat}</span>}
            </div>

            {a.networks && a.networks.length > 0 && (
              <div className="card-asset__networks">
                {a.networks.slice(0, 4).map((n, j) => (
                  <Network key={n.name || j} logo={n.logo} name={n.name} />
                ))}
                {a.networks.length > 4 && (
                  <span className="card-asset__networks-more">+{a.networks.length - 4}</span>
                )}
              </div>
            )}

            <div className="card-asset__actions">
              <IconButton variant="secondary" size="sm" icon="add" label="Add" onClick={onAdd ? () => onAdd(a) : undefined} />
              <IconButton variant="secondary" size="sm" icon="arrow_outward" label="Send" onClick={onSend ? () => onSend(a) : undefined} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Coin({ logo, symbol }) {
  if (logo) return <span className="card-asset__coin-logo">{logo}</span>;
  return (
    <span className="card-asset__coin-logo card-asset__coin-logo--placeholder" aria-hidden="true">
      {(symbol || "?").slice(0, 2)}
    </span>
  );
}

function Network({ logo, name }) {
  return (
    <span className="card-asset__network" title={name}>
      {logo || <span className="card-asset__network-initial" aria-hidden="true">{(name || "?").charAt(0)}</span>}
    </span>
  );
}
