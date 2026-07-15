import React, { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Tag } from "../Tag/Tag.jsx";
import "./Tooltip.css";

export function Tooltip({
  label,
  title,
  content,
  tag,
  links,
  side = "top",
  children,
  defaultOpen = false,
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [rect, setRect] = useState(null);
  const triggerRef = useRef(null);
  const closeTimer = useRef();

  const openTip = () => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  };
  // Small delay so the pointer can travel from trigger to bubble (for links).
  const closeTip = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 80);
  };

  // Track the trigger's viewport rect while open so the portaled bubble follows
  // scroll/resize. Rendering into document.body keeps it clear of clipping
  // ancestors (e.g. a table's overflow:auto wrapper).
  useLayoutEffect(() => {
    if (!open || !triggerRef.current) return;
    const update = () => {
      if (triggerRef.current) setRect(triggerRef.current.getBoundingClientRect());
    };
    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [open]);

  const body = content ?? label;
  const hasLinks = Array.isArray(links) && links.length > 0;
  const isRich = Boolean(title || tag || hasLinks || content);

  // Nothing to show — render the trigger untouched (backward-compatible).
  if (!body && !title && !tag && !hasLinks) return children;

  const bubble = (
    <span role="tooltip" className="tooltip__bubble">
      {(title || tag) && (
        <span className="tooltip__header">
          {title && <span className="tooltip__title">{title}</span>}
          {tag && (
            <Tag tone={tag.tone || "neutral"} shape={tag.shape || "default"}>
              {tag.label}
            </Tag>
          )}
        </span>
      )}
      {body && <span className="tooltip__content">{body}</span>}
      {hasLinks && (
        <span className="tooltip__links">
          {links.map((link, i) => (
            <button
              key={i}
              type="button"
              className="tooltip__link"
              onClick={link.onClick}
            >
              {link.label}
            </button>
          ))}
        </span>
      )}
    </span>
  );

  return (
    <span
      className="tooltip"
      ref={triggerRef}
      onMouseEnter={openTip}
      onMouseLeave={closeTip}
      onFocus={openTip}
      onBlur={closeTip}
    >
      {children}
      {open && rect && typeof document !== "undefined" &&
        createPortal(
          <span
            className="tooltip tooltip--portal"
            data-open="true"
            data-side={side}
            data-rich={isRich || undefined}
            style={{ position: "fixed", top: rect.top, left: rect.left, width: rect.width, height: rect.height }}
            onMouseEnter={openTip}
            onMouseLeave={closeTip}
          >
            {bubble}
          </span>,
          document.body
        )}
    </span>
  );
}
