import React from "react";
import { BottomSheet } from "../BottomSheet/BottomSheet.jsx";
import "./BottomSheetBlockchain.css";

export function BottomSheetBlockchain({
  open,
  onClose,
  title = "Select Blockchain",
  chains = [],
  selectedId,
  onSelect,
  className = "",
}) {
  return (
    <BottomSheet open={open} onClose={onClose} title={title} className={"bsc " + className}>
      <ul className="bsc__list">
        {chains.map((c) => {
          const selected = c.id === selectedId;
          return (
            <li key={c.id ?? c.name}>
              <button
                type="button"
                className={"bsc__item" + (selected ? " is-selected" : "")}
                onClick={() => onSelect && onSelect(c)}
                aria-pressed={selected}
              >
                <span className="bsc__mark" aria-hidden="true">
                  {c.mark || (c.name ? c.name.slice(0, 1) : "")}
                </span>
                <span className="bsc__text">
                  <span className="bsc__name">{c.name}</span>
                  {c.description && <span className="bsc__desc">{c.description}</span>}
                </span>
                <span className="material-symbols-rounded bsc__check" aria-hidden="true">
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
