import React from "react";
import "./DropdownBank.css";

export function DropdownBank({
  options = [],
  value,
  onSelect,
  className = "",
  ...rest
}) {
  return (
    <ul className={"dropdown-bank " + className} role="listbox" {...rest}>
      {options.map((o) => {
        const selected = o.value === value;
        return (
          <li
            key={o.value}
            role="option"
            aria-selected={selected}
            aria-disabled={o.disabled || undefined}
            className={
              "dropdown-bank__row" +
              (selected ? " is-selected" : "") +
              (o.disabled ? " is-disabled" : "")
            }
            onClick={() => !o.disabled && onSelect && onSelect(o.value, o)}
          >
            <span className="dropdown-bank__mark" aria-hidden="true">
              {o.logo || (
                <span className="dropdown-bank__initials">
                  {(o.name || o.value || "?").slice(0, 2).toUpperCase()}
                </span>
              )}
            </span>
            <span className="dropdown-bank__text">
              <span className="dropdown-bank__name">{o.name ?? o.value}</span>
              {(o.account || o.secondary) && (
                <span className="dropdown-bank__secondary">
                  {o.account ?? o.secondary}
                </span>
              )}
            </span>
            {o.tag && (
              <span
                className={
                  "dropdown-bank__tag is-" + (o.tag.variant || "positive")
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
