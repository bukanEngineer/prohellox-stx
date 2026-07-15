import React from "react";
import { BottomSheet } from "../BottomSheet/BottomSheet.jsx";
import "./BottomSheetNetwork.css";

export function BottomSheetNetwork({
  open,
  onClose,
  title = "Select Network",
  networks = [],
  selectedId,
  onSelect,
  className = "",
}) {
  return (
    <BottomSheet open={open} onClose={onClose} title={title} className={"bsn " + className}>
      <ul className="bsn__list">
        {networks.map((n) => {
          const selected = n.id === selectedId;
          return (
            <li key={n.id ?? n.name}>
              <button
                type="button"
                className={"bsn__item" + (selected ? " is-selected" : "")}
                onClick={() => onSelect && onSelect(n)}
                aria-pressed={selected}
              >
                <span className="bsn__mark" aria-hidden="true">
                  {n.mark || (n.name ? n.name.slice(0, 1) : "")}
                </span>
                <span className="bsn__text">
                  <span className="bsn__name">{n.name}</span>
                  {n.description && <span className="bsn__desc">{n.description}</span>}
                </span>
                <span className="material-symbols-rounded bsn__check" aria-hidden="true">
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
