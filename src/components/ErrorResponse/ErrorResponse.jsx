import React from "react";
import "./ErrorResponse.css";

export function ErrorResponse({ code, title, body, actions, className = "" }) {
  return (
    <section className={"error " + className} role="alert">
      {code && <div className="error__code">{code}</div>}
      {title && <div className="error__title">{title}</div>}
      {body && <div className="error__body">{body}</div>}
      {actions && <div className="error__actions">{actions}</div>}
    </section>
  );
}
