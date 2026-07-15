import React from "react";
import "./Badge.css";

export function Badge({ tone = "brand", size = "md", dot = false, max = 99, children, className = "", ...rest }) {
  const cls = [
    "badge",
    `badge--${size}`,
    tone !== "brand" && `badge--${tone}`,
    dot && "badge--dot",
    className,
  ].filter(Boolean).join(" ");
  const content = dot
    ? null
    : typeof children === "number" && children > max
      ? `${max}+`
      : children;
  return <span className={cls} {...rest}>{content}</span>;
}

Badge.Wrap = function BadgeWrap({ badge, children }) {
  return (
    <span className="badge-wrap">
      {children}
      {badge}
    </span>
  );
};
