import React from "react";
import { Icon } from "../Icon/Icon.jsx";
import { Button } from "../Button/Button.jsx";
import { IconButton } from "../IconButton/IconButton.jsx";
import { InputCurrency } from "../InputCurrency/InputCurrency.jsx";
import "./CardSwap.css";

export function CardSwap({
  title = "Swap",
  from = {},
  to = {},
  rate = "1 XSGD ≈ 0.7233 USDT",
  highlight,
  footnote = "No fees · Rate refreshes every minute.",
  buttonLabel = "Swap",
  onSwap,
  onReverse,
  className = "",
  ...rest
}) {
  const cls = ["card-swap", className].filter(Boolean).join(" ");
  return (
    <section className={cls} {...rest}>
      <p className="card-swap__title">{title}</p>

      <Leg label="From" leg={from} />

      <div className="card-swap__rate-row">
        <div className="card-swap__rate-col">
          {rate && <span className="card-swap__rate">{rate}</span>}
          {highlight && (
            <span className="card-swap__highlight">
              <Icon name="check_circle" size={18} className="card-swap__highlight-icon" />
              {highlight}
            </span>
          )}
        </div>
        <IconButton variant="secondary" size="sm" icon="swap_vert" label="Reverse" onClick={onReverse} />
      </div>

      <Leg label="To" leg={to} />

      <Button variant="primary" size="lg" className="card-swap__btn" onClick={onSwap}>
        {buttonLabel}
      </Button>

      {footnote && <p className="card-swap__footnote">{footnote}</p>}
    </section>
  );
}

function Leg({ label, leg }) {
  return (
    <div className="card-swap__leg">
      <div className="card-swap__leg-labels">
        <span className="card-swap__leg-label">{label}</span>
        {leg.balance && <span className="card-swap__leg-balance">Balance: {leg.balance}</span>}
      </div>
      <InputCurrency
        position="suffix"
        placeholder="0"
        value={leg.amount}
        onChange={leg.onAmountChange ? (e) => leg.onAmountChange(e.target.value) : undefined}
        readOnly={!leg.onAmountChange}
        linkButton={leg.onMax ? { label: "Max", onClick: leg.onMax } : undefined}
        asset={{
          value: leg.currency,
          symbol: leg.currency,
          logo: leg.logo,
          options: leg.options,
          onChange: leg.onCurrencyChange,
        }}
      />
    </div>
  );
}
