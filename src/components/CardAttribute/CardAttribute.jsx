import React from "react";
import { Icon } from "../Icon/Icon.jsx";
import { Tag } from "../Tag/Tag.jsx";
import { Button } from "../Button/Button.jsx";
import "./CardAttribute.css";

export function CardAttribute({
  title = "Transaction Details",
  status,
  attributes = [],
  actions,
  onCopy,
  className = "",
  ...rest
}) {
  const cls = ["card-attribute", className].filter(Boolean).join(" ");
  return (
    <section className={cls} {...rest}>
      <header className="card-attribute__head">
        <h3 className="card-attribute__title">{title}</h3>
        {status && <Tag tone={status.tone || "positive"}>{status.label}</Tag>}
      </header>

      <div className="card-attribute__divider" />

      <dl className="card-attribute__grid">
        {attributes.map((attr, i) => (
          <div
            key={attr.label || i}
            className={"card-attribute__item" + (attr.columns === 2 || attr.columns === "full" ? " is-full" : "")}
          >
            <dt className="card-attribute__label">
              {attr.label}
              {attr.info && <Icon name="info" size={20} className="card-attribute__info" />}
            </dt>
            <dd className="card-attribute__value-row">
              {attr.link ? (
                <a className="card-attribute__link" href={attr.link} target="_blank" rel="noreferrer">
                  {attr.value}
                </a>
              ) : (
                <span className="card-attribute__value">{attr.value}</span>
              )}
              {attr.copyable && (
                <button
                  type="button"
                  className="card-attribute__copy"
                  aria-label="Copy"
                  onClick={onCopy ? () => onCopy(attr) : undefined}
                >
                  <Icon name="content_copy" size={20} />
                </button>
              )}
            </dd>
          </div>
        ))}
      </dl>

      {actions && (
        <>
          <div className="card-attribute__divider" />
          <div className="card-attribute__actions">
            <Button variant="secondary" size="sm" onClick={actions.onReject}>
              {actions.rejectLabel || "Reject"}
            </Button>
            <Button variant="primary" size="sm" onClick={actions.onApprove}>
              {actions.approveLabel || "Approve"}
            </Button>
          </div>
        </>
      )}
    </section>
  );
}
