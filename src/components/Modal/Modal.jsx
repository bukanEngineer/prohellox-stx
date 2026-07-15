import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import "./Modal.css";

export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  size = "small",
  variant = "default",
  illustration,
  media,
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

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  if (!open) return null;

  const handleScrim = (e) => {
    if (!dismissable) return;
    if (e.target === e.currentTarget) onClose && onClose();
  };

  const isIllustration = variant === "illustration";
  const isNewFeature = variant === "new-feature";
  const centered = isIllustration || isNewFeature;

  return createPortal(
    <div className="modal-scrim" role="presentation" onClick={handleScrim}>
      <div
        className={[
          "modal",
          `modal--${size}`,
          `modal--v-${variant}`,
          className,
        ].filter(Boolean).join(" ")}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
      >
        {/* new-feature: top media/screenshot block spans the modal width */}
        {isNewFeature && media && (
          <div className="modal__media">{media}</div>
        )}

        {centered ? (
          <>
            {/* illustration variant: bare close icon, top-right, no title row */}
            {isIllustration && !hideClose && (
              <div className="modal__head--icon-only">
                <button
                  type="button"
                  className="modal__close"
                  onClick={onClose}
                  aria-label="Close"
                >
                  <span className="material-symbols-rounded">close</span>
                </button>
              </div>
            )}
            {isIllustration && (illustration || title) && (
              <div className="modal__illustration-wrap">
                {illustration && <div className="modal__illustration">{illustration}</div>}
                {title && <div id="modal-title" className="modal__title">{title}</div>}
              </div>
            )}
            {isNewFeature && title && (
              <div className="modal__title-row">
                <div id="modal-title" className="modal__title">{title}</div>
              </div>
            )}
            {children !== undefined && children !== null && (
              <div className="modal__body modal__body--centered">{children}</div>
            )}
            {footer && <div className="modal__foot">{footer}</div>}
          </>
        ) : (
          <>
            {(title || !hideClose) && (
              <div className="modal__head">
                {title && <div id="modal-title" className="modal__title">{title}</div>}
                {!hideClose && (
                  <button type="button" className="modal__close" onClick={onClose} aria-label="Close">
                    <span className="material-symbols-rounded">close</span>
                  </button>
                )}
              </div>
            )}
            <div className="modal__body">{children}</div>
            {footer && <div className="modal__foot">{footer}</div>}
          </>
        )}
      </div>
    </div>,
    document.body
  );
}
