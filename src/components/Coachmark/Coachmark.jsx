import React, { useEffect, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "../Button/Button.jsx";
import "./Coachmark.css";

export function Coachmark({
  target,
  open = true,
  onDismiss,
  onNext,
  onPrev,
  title,
  body,
  step,        // e.g. 2
  totalSteps,  // e.g. 4
  nextLabel = "Next",
  doneLabel = "Got it",
  prevLabel = "Back",
  placement = "bottom",
  className = "",
}) {
  const [rect, setRect] = useState(null);

  useLayoutEffect(() => {
    if (!open) return undefined;
    const el = target?.current;
    if (!el) return undefined;
    const measure = () => setRect(el.getBoundingClientRect());
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [open, target]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === "Escape") onDismiss && onDismiss(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onDismiss]);

  if (!open || !rect) return null;

  const pad = 6;
  const spotStyle = {
    top: rect.top - pad,
    left: rect.left - pad,
    width: rect.width + pad * 2,
    height: rect.height + pad * 2,
  };

  const pop = { top: 0, left: 0 };
  if (placement === "bottom") {
    pop.top = rect.bottom + 12;
    pop.left = Math.max(8, Math.min(rect.left, window.innerWidth - 296));
  } else if (placement === "top") {
    pop.top = rect.top - 12 - 140;
    pop.left = Math.max(8, Math.min(rect.left, window.innerWidth - 296));
  } else if (placement === "right") {
    pop.top = rect.top;
    pop.left = rect.right + 12;
  } else if (placement === "left") {
    pop.top = rect.top;
    pop.left = rect.left - 12 - 280;
  }
  const isLast = totalSteps != null && step != null && step >= totalSteps;

  return createPortal(
    <>
      <button type="button" className="coachmark-scrim" aria-label="Dismiss" onClick={onDismiss} />
      <div className="coachmark-spot" style={spotStyle} aria-hidden="true" />
      <div
        className={"coachmark " + className}
        style={pop}
        data-placement={placement}
        role="dialog"
        aria-live="polite"
      >
        <span className="coachmark__beak" data-placement={placement} aria-hidden="true" />
        {(title || onDismiss) && (
          <div className="coachmark__head">
            {title && <div className="coachmark__title">{title}</div>}
            {onDismiss && (
              <button
                type="button"
                className="coachmark__close"
                onClick={onDismiss}
                aria-label="Dismiss"
              >
                <span className="material-symbols-rounded" aria-hidden="true">close_small</span>
              </button>
            )}
          </div>
        )}
        {body && <div className="coachmark__body">{body}</div>}
        <div className="coachmark__foot">
          {step != null && totalSteps != null ? (
            <div className="coachmark__dots" role="tablist" aria-label={`Step ${step} of ${totalSteps}`}>
              {Array.from({ length: totalSteps }).map((_, i) => (
                <span
                  key={i}
                  className="coachmark__dot"
                  data-active={i + 1 === step || undefined}
                  aria-current={i + 1 === step ? "step" : undefined}
                />
              ))}
            </div>
          ) : (
            <span />
          )}
          <div className="coachmark__actions">
            {onPrev && step > 1 && <Button variant="tertiary" size="sm" onClick={onPrev}>{prevLabel}</Button>}
            <Button variant="primary" size="sm" onClick={isLast ? onDismiss : onNext || onDismiss}>
              {isLast ? doneLabel : nextLabel}
            </Button>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}
