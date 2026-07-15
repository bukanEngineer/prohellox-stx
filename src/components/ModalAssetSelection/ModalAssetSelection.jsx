import React from "react";
import { Modal } from "../Modal/Modal.jsx";
import "./ModalAssetSelection.css";

export function ModalAssetSelection({
  open,
  onClose,
  title = "Transfer In",
  description,
  label = "Select Asset:",
  assets = [],
  onSelect,
  className = "",
}) {
  const header = (
    <span className="asset-sel__header">
      <span className="asset-sel__title">{title}</span>
      {description && <span className="asset-sel__desc">{description}</span>}
    </span>
  );

  return (
    <Modal open={open} onClose={onClose} size="small" title={header} className={"asset-sel " + className}>
      {label && <p className="asset-sel__label">{label}</p>}
      <ul className="asset-sel__list">
        {assets.map((a) => (
          <li key={a.id ?? a.symbol}>
            <button
              type="button"
              className="asset-sel__item"
              onClick={() => onSelect && onSelect(a)}
            >
              <span className="asset-sel__mark" aria-hidden="true">
                {a.mark || (a.symbol ? a.symbol.slice(0, 2) : "")}
              </span>
              <span className="asset-sel__text">
                <span className="asset-sel__symbol">{a.symbol}</span>
                {a.subtitle && <span className="asset-sel__subtitle">{a.subtitle}</span>}
              </span>
              <span className="material-symbols-rounded asset-sel__chevron" aria-hidden="true">
                arrow_forward_ios
              </span>
            </button>
          </li>
        ))}
      </ul>
    </Modal>
  );
}
