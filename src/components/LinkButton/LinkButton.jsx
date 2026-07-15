import React from "react";
import "./LinkButton.css";

export function LinkButton({
  as: Tag = "button",
  size = "md",
  onDark = false,
  trailingIcon,
  leadingIcon,
  disabled = false,
  className = "",
  children,
  ...rest
}) {
  const cls = [
    "link-btn",
    `link-btn--${size}`,
    onDark && "link-btn--onDark",
    className,
  ].filter(Boolean).join(" ");
  const props = Tag === "button" ? { type: "button", disabled } : {};
  return (
    <Tag className={cls} {...props} {...rest}>
      {leadingIcon && <span className="material-symbols-rounded">{leadingIcon}</span>}
      {children}
      {trailingIcon && <span className="material-symbols-rounded">{trailingIcon}</span>}
    </Tag>
  );
}
