import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import "./Toast.css";

const ICONS = { positive: "check_circle", critical: "error", warning: "warning", info: "info" };

export function Toast({ tone = "positive", title, children, onDismiss, className = "", ...rest }) {
  const cls = ["toast", tone !== "positive" && `toast--${tone}`, className].filter(Boolean).join(" ");
  return (
    <div role="status" className={cls} {...rest}>
      <span className="material-symbols-rounded toast__icon" aria-hidden="true">{ICONS[tone] || "check_circle"}</span>
      <div className="toast__body">
        {title && <div className="toast__title">{title}</div>}
        {children && <div className="toast__text">{children}</div>}
      </div>
      {onDismiss && (
        <button type="button" className="toast__close" onClick={onDismiss} aria-label="Dismiss">
          <span className="material-symbols-rounded">close</span>
        </button>
      )}
    </div>
  );
}

/* ─────────── ToastProvider + useToast hook ─────────── */
export const ToastContext = React.createContext(null);

let __id = 0;

const MIN_DURATION = 3000;
const MAX_DURATION = 7000;
const clampDuration = (ms) => Math.min(MAX_DURATION, Math.max(MIN_DURATION, ms));

export function ToastProvider({ children, duration = 5000 }) {
  const [items, setItems] = useState([]);
  const timers = useRef({});

  const dismiss = useCallback((id) => {
    setItems((prev) => prev.filter((t) => t.id !== id));
    if (timers.current[id]) {
      clearTimeout(timers.current[id]);
      delete timers.current[id];
    }
  }, []);

  const show = useCallback((toast) => {
    const id = ++__id;
    const t = { id, ...toast };
    // Only one toast at a time — a new one replaces the current, clearing its timer.
    Object.values(timers.current).forEach(clearTimeout);
    timers.current = {};
    setItems([t]);
    timers.current[id] = setTimeout(() => dismiss(id), clampDuration(toast.duration ?? duration));
    return id;
  }, [dismiss, duration]);

  useEffect(() => () => {
    Object.values(timers.current).forEach(clearTimeout);
  }, []);

  return (
    <ToastContext.Provider value={{ show, dismiss }}>
      {children}
      <div className="toast-region" role="region" aria-label="Notifications">
        {items.map((t) => (
          <Toast key={t.id} tone={t.tone} title={t.title}>
            {t.message}
          </Toast>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside a <ToastProvider>");
  return ctx;
}
