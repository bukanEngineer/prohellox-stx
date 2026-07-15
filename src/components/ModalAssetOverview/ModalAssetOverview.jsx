import React from "react";
import { Modal } from "../Modal/Modal.jsx";
import "./ModalAssetOverview.css";

export function ModalAssetOverview({
  open,
  onClose,
  mark,
  symbol,
  subtitle,
  methods = [],
  networks = [],
  banks,
  networkLabel = "Supported Network",
  onSelectMethod,
  className = "",
}) {
  const header = (
    <div className="asset-ov__header">
      <span className="asset-ov__mark" aria-hidden="true">
        {mark || (symbol ? symbol.slice(0, 2) : "")}
      </span>
      <span className="asset-ov__heading">
        <span className="asset-ov__symbol">{symbol}</span>
        {subtitle && <span className="asset-ov__subtitle">{subtitle}</span>}
      </span>
    </div>
  );

  return (
    <Modal open={open} onClose={onClose} size="small" title={header} className={"asset-ov " + className}>
      <p className="asset-ov__section-label">Available Method:</p>
      <ul className="asset-ov__methods">
        {methods.map((m) => (
          <li key={m.id}>
            <button
              type="button"
              className="asset-ov__method"
              onClick={() => onSelectMethod && onSelectMethod(m)}
            >
              <span className="asset-ov__method-icon" aria-hidden="true">
                {m.icon || <span className="material-symbols-rounded">swap_horiz</span>}
              </span>
              <span className="asset-ov__method-text">
                <span className="asset-ov__method-title">{m.title}</span>
                {m.description && (
                  <span className="asset-ov__method-desc">{m.description}</span>
                )}
              </span>
              <span className="material-symbols-rounded asset-ov__chevron" aria-hidden="true">
                chevron_right
              </span>
            </button>
          </li>
        ))}
      </ul>

      {(networks.length > 0 || banks) && (
        <div className="asset-ov__support">
          <span className="asset-ov__support-link">{networkLabel}</span>
          {networks.length > 0 && (
            <div className="asset-ov__support-group">
              <span className="asset-ov__support-key">Blockchain:</span>
              <div className="asset-ov__networks">
                {networks.map((n, i) => (
                  <span className="asset-ov__network" key={n.label ?? i}>
                    <span className="asset-ov__network-mark" aria-hidden="true">
                      {n.mark || (n.label ? n.label.slice(0, 1) : "")}
                    </span>
                    {n.label}
                  </span>
                ))}
              </div>
            </div>
          )}
          {banks && (
            <div className="asset-ov__support-group">
              <span className="asset-ov__support-key">Bank:</span>
              <span className="asset-ov__support-value">{banks}</span>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}
