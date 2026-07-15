import React from "react";
import "./Card.css";

export function Card({ shadow = false, className = "", title, body, children, ...rest }) {
  const cls = [
    "card",
    shadow && `card--shadow-${shadow}`,
    className,
  ].filter(Boolean).join(" ");
  return (
    <section className={cls} {...rest}>
      {title && <h3 className="card__title">{title}</h3>}
      {body && <p className="card__body">{body}</p>}
      {children}
    </section>
  );
}
