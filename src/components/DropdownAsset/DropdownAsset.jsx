import React from "react";
import "./DropdownAsset.css";

export function DropdownAsset({
  options = [],
  value,
  onSelect,
  className = "",
  ...rest
}) {
  return (
    <ul className={"dropdown-asset " + className} role="listbox" {...rest}>
      {options.map((o) => {
        const selected = o.value === value;
        return (
          <li
            key={o.value}
            role="option"
            aria-selected={selected}
            aria-disabled={o.disabled || undefined}
            className={
              "dropdown-asset__row" +
              (selected ? " is-selected" : "") +
              (o.disabled ? " is-disabled" : "")
            }
            onClick={() => !o.disabled && onSelect && onSelect(o.value, o)}
          >
            <span className="dropdown-asset__mark" aria-hidden="true">
              {o.logo || (
                <span className="dropdown-asset__initials">
                  {(o.name || o.value || "?").slice(0, 2).toUpperCase()}
                </span>
              )}
            </span>
            <span className="dropdown-asset__text">
              <span className="dropdown-asset__name">{o.name ?? o.value}</span>
              {o.secondary && (
                <span className="dropdown-asset__secondary">{o.secondary}</span>
              )}
            </span>
            {o.balance != null && (
              <span className="dropdown-asset__balance">{o.balance}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
