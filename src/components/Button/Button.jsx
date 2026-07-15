import React from "react";
import "./Button.css";

export function Button({
  variant = "primary",
  size = "lg",
  disabled = false,
  type = "button",
  className = "",
  children,
  ...rest
}) {
  const cls = [
    "btn",
    `btn--${variant}`,
    `btn--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <button type={type} className={cls} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}
