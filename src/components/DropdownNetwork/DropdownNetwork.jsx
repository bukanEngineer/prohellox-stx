import React from "react";
import "./DropdownNetwork.css";

export function DropdownNetwork({
  options = [],
  value,
  onSelect,
  className = "",
  ...rest
}) {
  return (
    <ul className={"dropdown-network " + className} role="listbox" {...rest}>
      {options.map((o) => {
        const selected = o.value === value;
        return (
          <li
            key={o.value}
            role="option"
            aria-selected={selected}
            aria-disabled={o.disabled || undefined}
            className={
              "dropdown-network__row" +
              (selected ? " is-selected" : "") +
              (o.disabled ? " is-disabled" : "")
            }
            onClick={() => !o.disabled && onSelect && onSelect(o.value, o)}
          >
            <span className="dropdown-network__mark" aria-hidden="true">
              {o.logo || (
                <span className="dropdown-network__initials">
                  {(o.name || o.value || "?").slice(0, 2).toUpperCase()}
                </span>
              )}
            </span>
            <span className="dropdown-network__text">
              <span className="dropdown-network__name">{o.name ?? o.value}</span>
              {o.secondary && (
                <span className="dropdown-network__secondary">{o.secondary}</span>
              )}
            </span>
            {o.tag && (
              <span
                className={
                  "dropdown-network__tag is-" + (o.tag.variant || "positive")
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
