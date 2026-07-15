import React from "react";
import "./IconButton.css";

export function IconButton({
  icon,
  variant = "tertiary",
  shape = "circle",
  size = "lg",
  label,
  disabled = false,
  className = "",
  type = "button",
  ...rest
}) {
  const cls = [
    "icon-btn",
    `icon-btn--${variant}`,
    `icon-btn--${shape}`,
    `icon-btn--${size}`,
    className,
  ].filter(Boolean).join(" ");
  return (
    <button type={type} className={cls} disabled={disabled} aria-label={label} {...rest}>
      <span className="material-symbols-rounded" aria-hidden="true">{icon}</span>
    </button>
  );
}
