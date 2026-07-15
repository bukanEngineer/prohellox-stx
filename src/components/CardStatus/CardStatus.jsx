import React from "react";
import { StatusIcon } from "../StatusIcon/StatusIcon.jsx";
import { Icon } from "../Icon/Icon.jsx";
import { LinkButton } from "../LinkButton/LinkButton.jsx";
import "./CardStatus.css";

export function CardStatus({
  status = "success",
  statusIcon,
  title,
  description,
  sections = [],
  total,
  footerLink,
  className = "",
  ...rest
}) {
  const cls = ["card-status", className].filter(Boolean).join(" ");
  return (
    <div className={cls} {...rest}>
      <section className="card-status__card">
        <header className="card-status__head">
          <StatusIcon variant={status} icon={statusIcon} size={36} />
          {title && <h3 className="card-status__title">{title}</h3>}
        </header>

        {description && <p className="card-status__desc">{description}</p>}

        {sections.map((section, i) => (
          <div key={section.title || i} className="card-status__section">
            {section.title && <p className="card-status__section-title">{section.title}</p>}
            <dl className="card-status__items">
              {section.items.map((item, j) => (
                <div key={item.label || j} className="card-status__item">
                  <dt className="card-status__item-label">
                    {item.label}
                    {item.info && <Icon name="info" size={16} className="card-status__info" />}
                  </dt>
                  <dd className="card-status__item-value">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}

        {total && (
          <div className="card-status__total-wrap">
            <div className="card-status__divider" />
            <div className="card-status__total">
              <span className="card-status__total-label">{total.label}</span>
              <span className="card-status__total-value">{total.value}</span>
            </div>
          </div>
        )}
      </section>

      {footerLink && (
        <LinkButton trailingIcon="arrow_forward" onClick={footerLink.onClick}>
          {footerLink.text}
        </LinkButton>
      )}
    </div>
  );
}
