import React from "react";
import "./StatusIcon.css";

export function StatusIcon({
  variant = "success",
  icon,
  size = 36,
  className = "",
  ...rest
}) {
  const defaultIcon = variant === "needApproval" ? "hourglass_top" : "check";
  const cls = ["status-icon", `status-icon--${variant}`, className]
    .filter(Boolean)
    .join(" ");
  return (
    <span
      className={cls}
      style={{ "--status-icon-size": `${size}px` }}
      role="img"
      {...rest}
    >
      <span className="material-symbols-rounded">{icon || defaultIcon}</span>
    </span>
  );
}
