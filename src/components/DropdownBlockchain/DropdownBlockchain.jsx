import React from "react";
import "./DropdownBlockchain.css";

export function DropdownBlockchain({
  options = [],
  value,
  onSelect,
  className = "",
  ...rest
}) {
  return (
    <ul className={"dropdown-blockchain " + className} role="listbox" {...rest}>
      {options.map((o) => {
        const selected = o.value === value;
        return (
          <li
            key={o.value}
            role="option"
            aria-selected={selected}
            aria-disabled={o.disabled || undefined}
            className={
              "dropdown-blockchain__row" +
              (selected ? " is-selected" : "") +
              (o.disabled ? " is-disabled" : "")
            }
            onClick={() => !o.disabled && onSelect && onSelect(o.value, o)}
          >
            <span className="dropdown-blockchain__mark" aria-hidden="true">
              {o.logo || (
                <span className="dropdown-blockchain__initials">
                  {(o.name || o.value || "?").slice(0, 2).toUpperCase()}
                </span>
              )}
            </span>
            <span className="dropdown-blockchain__text">
              <span className="dropdown-blockchain__name">{o.name ?? o.value}</span>
              {(o.address || o.secondary) && (
                <span className="dropdown-blockchain__secondary">
                  {o.address ?? o.secondary}
                </span>
              )}
            </span>
            {o.tag && (
              <span
                className={
                  "dropdown-blockchain__tag is-" + (o.tag.variant || "positive")
                }
              >
                {o.tag.label}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
