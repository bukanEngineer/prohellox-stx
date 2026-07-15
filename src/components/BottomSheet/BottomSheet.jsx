import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import "./BottomSheet.css";

export function BottomSheet({
  open,
  onClose,
  title,
  children,
  footer,
  dismissable = true,
  hideClose = false,
  className = "",
}) {
  useEffect(() => {
    if (!open || !dismissable) return undefined;
    const onKey = (e) => { if (e.key === "Escape") onClose && onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, dismissable, onClose]);

  if (!open) return null;
  const handleScrim = (e) => {
    if (!dismissable) return;
    if (e.target === e.currentTarget) onClose && onClose();
  };

  return createPortal(
    <div className="bsheet-scrim" role="presentation" onClick={handleScrim}>
      <div className={"bsheet " + className} role="dialog" aria-modal="true" aria-labelledby={title ? "bsheet-title" : undefined}>
        <div className="bsheet__handle" aria-hidden="true" />
        {(title || !hideClose) && (
          <div className="bsheet__head">
            {title && <div id="bsheet-title" className="bsheet__title">{title}</div>}
            {!hideClose && (
              <button type="button" className="bsheet__close" onClick={onClose} aria-label="Close">
                <span className="material-symbols-rounded">close</span>
              </button>
            )}
          </div>
        )}
        <div className="bsheet__body">{children}</div>
        {footer && <div className="bsheet__foot">{footer}</div>}
      </div>
    </div>,
    document.body
  );
}
