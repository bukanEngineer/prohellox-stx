import React from "react";
import { Icon } from "../Icon/Icon.jsx";
import { LinkButton } from "../LinkButton/LinkButton.jsx";
import "./CardChecklist.css";

export function CardChecklist({
  title = "Start your journey with StraitsX",
  tabs = [],
  active,
  onTabChange,
  progress = 0,
  items = [],
  className = "",
  ...rest
}) {
  const cls = ["card-checklist", className].filter(Boolean).join(" ");
  return (
    <section className={cls} {...rest}>
      <h3 className="card-checklist__title">{title}</h3>

      {tabs.length > 0 && (
        <div className="card-checklist__tabs" role="tablist">
          {tabs.map((t) => (
            <button
              key={t.value}
              type="button"
              role="tab"
              aria-selected={t.value === active}
              className={"card-checklist__tab" + (t.value === active ? " is-active" : "")}
              onClick={onTabChange ? () => onTabChange(t.value) : undefined}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}

      <div className="card-checklist__progress">
        <div className="card-checklist__progress-track">
          <div
            className="card-checklist__progress-fill"
            style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
          />
        </div>
        <span className="card-checklist__progress-pct num">{progress}%</span>
      </div>

      <ul className="card-checklist__list">
        {items.map((item, i) => (
          <li
            key={item.title || i}
            className={"card-checklist__item" + (item.status === "active" ? " is-active" : "")}
          >
            <ChecklistMark status={item.status} />
            <div className="card-checklist__item-body">
              <p className="card-checklist__item-title">{item.title}</p>
              {item.description && <p className="card-checklist__item-desc">{item.description}</p>}
              {item.linkText && (
                <LinkButton size="sm" trailingIcon="arrow_forward" onClick={item.onLink}>
                  {item.linkText}
                </LinkButton>
              )}
            </div>
            <Icon
              name={item.status === "locked" ? "lock" : "chevron_right"}
              size={20}
              className="card-checklist__item-trailing"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

function ChecklistMark({ status }) {
  const icon = status === "done" ? "check_circle" : status === "locked" ? "lock" : "radio_button_unchecked";
  return (
    <span className={"card-checklist__mark card-checklist__mark--" + (status || "active")} aria-hidden="true">
      <span className="material-symbols-rounded">{icon}</span>
    </span>
  );
}
