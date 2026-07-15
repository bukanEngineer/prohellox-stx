import React from "react";
import { BottomSheet } from "../BottomSheet/BottomSheet.jsx";
import "./BottomSheetBank.css";

export function BottomSheetBank({
  open,
  onClose,
  title = "Select Bank",
  banks = [],
  selectedId,
  onSelect,
  className = "",
}) {
  return (
    <BottomSheet open={open} onClose={onClose} title={title} className={"bsb " + className}>
      <ul className="bsb__list">
        {banks.map((b) => {
          const selected = b.id === selectedId;
          return (
            <li key={b.id ?? b.name}>
              <button
                type="button"
                className={"bsb__item" + (selected ? " is-selected" : "")}
                onClick={() => onSelect && onSelect(b)}
                aria-pressed={selected}
              >
                <span className="bsb__mark" aria-hidden="true">
                  {b.mark || (b.name ? b.name.slice(0, 1) : "")}
                </span>
                <span className="bsb__text">
                  <span className="bsb__name">{b.name}</span>
                  {b.description && <span className="bsb__desc">{b.description}</span>}
                </span>
                <span className="material-symbols-rounded bsb__check" aria-hidden="true">
                  {selected ? "radio_button_checked" : "radio_button_unchecked"}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </BottomSheet>
  );
}
