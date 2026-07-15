import React from "react";
import "./Icon.css";

export function Icon({
  name,
  size = 24,
  filled = false,
  color,
  className = "",
  style,
  ...rest
}) {
  const cls = ["icon", filled && "icon--filled", className].filter(Boolean).join(" ");
  return (
    <span
      className={cls}
      aria-hidden="true"
      style={{ fontSize: size, color, ...style }}
      {...rest}
    >
      {name}
    </span>
  );
}
