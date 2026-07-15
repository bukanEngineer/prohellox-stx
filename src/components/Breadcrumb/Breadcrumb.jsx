import React from "react";
import "./Breadcrumb.css";

export function Breadcrumb({ items = [], separator = "/", className = "" }) {
  // Material Symbols are referenced by alphabetic names (e.g. "chevron_right").
  // Anything else (like "/") renders as a plain text separator.
  const isSymbol = typeof separator === "string" && /^[a-z_]+$/.test(separator);
  const sepCls =
    "breadcrumb__sep" + (isSymbol ? " material-symbols-rounded" : "");
  return (
    <nav aria-label="Breadcrumb" className={"breadcrumb " + className}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        const cls = "breadcrumb__item" + (isLast ? " is-current" : "");
        return (
          <React.Fragment key={i}>
            {isLast ? (
              <span className={cls} aria-current="page">{item.label}</span>
            ) : item.href ? (
              <a className={cls} href={item.href} onClick={item.onClick}>{item.label}</a>
            ) : (
              <button type="button" className={cls} onClick={item.onClick}>{item.label}</button>
            )}
            {!isLast && (
              <span className={sepCls} aria-hidden="true">{separator}</span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
