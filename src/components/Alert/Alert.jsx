import React from "react";
import "./Alert.css";

const ICONS = {
  positive: "check_circle",
  critical: "error",
  warning: "warning",
  info: "info",
  neutral: "info",
};

export function Alert({
  tone = "info",
  title,
  children,
  icon,
  onDismiss,
  actions,
  actionPlacement = "bottom",
  className = "",
  ...rest
}) {
  const cls = [
    "alert",
    `alert--${tone}`,
    `alert--actions-${actionPlacement}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const symbol = icon ?? ICONS[tone] ?? "info";
  return (
    <div role="alert" className={cls} {...rest}>
      {symbol && (
        <span className="material-symbols-rounded alert__icon" aria-hidden="true">
          {symbol}
        </span>
      )}
      <div className="alert__body">
        {title && <div className="alert__title">{title}</div>}
        {children && <div className="alert__text">{children}</div>}
        {actions && actionPlacement === "bottom" && (
          <div className="alert__actions">{actions}</div>
        )}
      </div>
      {actions && actionPlacement === "right" && (
        <div className="alert__actions alert__actions--right">{actions}</div>
      )}
      {onDismiss && (
        <button type="button" className="alert__close" onClick={onDismiss} aria-label="Dismiss">
          <span className="material-symbols-rounded">close</span>
        </button>
      )}
    </div>
  );
}
