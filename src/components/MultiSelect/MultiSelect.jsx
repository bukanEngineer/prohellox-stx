import React, { useId, useRef, useState, useEffect, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import "./MultiSelect.css";

export function MultiSelect({
  label,
  helper,
  error,
  options = [],
  placeholder = "Select…",
  disabled = false,
  value,
  defaultValue = [],
  onChange,
  id: idProp,
  className = "",
}) {
  const autoId = useId();
  const id = idProp || autoId;
  const isError = !!error;
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue);
  const selected = isControlled ? value : internal;
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const controlRef = useRef(null);
  const menuRef = useRef(null);
  const [menuRect, setMenuRect] = useState(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (
        rootRef.current && !rootRef.current.contains(e.target) &&
        menuRef.current && !menuRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  // Menu is portaled to <body> so it can escape clipping ancestors (e.g. a
  // Modal's overflow:hidden wrapper); position it against the control's
  // viewport rect instead of relying on CSS absolute positioning.
  useLayoutEffect(() => {
    if (!open) return undefined;
    const el = controlRef.current;
    if (!el) return undefined;
    const measure = () => setMenuRect(el.getBoundingClientRect());
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [open]);

  const commit = (next) => {
    if (!isControlled) setInternal(next);
    onChange && onChange(next);
  };
  const toggle = (val) =>
    commit(selected.includes(val) ? selected.filter((v) => v !== val) : [...selected, val]);
  const remove = (val) => commit(selected.filter((v) => v !== val));
  const clearAll = (e) => {
    e.stopPropagation();
    commit([]);
  };

  const labelFor = (val) => options.find((o) => o.value === val)?.label ?? val;

  const wrapCls = [
    "multiselect",
    open && "is-open",
    isError && "is-error",
    disabled && "is-disabled",
  ].filter(Boolean).join(" ");

  return (
    <div className={"field " + className} ref={rootRef}>
      {label && <span className="field__label" id={`${id}-label`}>{label}</span>}
      <div className={wrapCls}>
        <button
          ref={controlRef}
          type="button"
          className="multiselect__control"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby={label ? `${id}-label` : undefined}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="multiselect__values">
            {selected.length === 0 ? (
              <span className="multiselect__placeholder">{placeholder}</span>
            ) : (
              selected.map((val) => (
                <span className="multiselect__chip" key={val}>
                  {labelFor(val)}
                  <span
                    className="material-symbols-rounded multiselect__chip-x"
                    role="button"
                    aria-label={`Remove ${labelFor(val)}`}
                    onClick={(e) => { e.stopPropagation(); if (!disabled) remove(val); }}
                  >
                    close
                  </span>
                </span>
              ))
            )}
          </span>
          {selected.length > 0 && !disabled && (
            <span
              className="material-symbols-rounded multiselect__clear"
              role="button"
              aria-label="Clear all"
              onClick={clearAll}
            >
              close
            </span>
          )}
          <span className="material-symbols-rounded multiselect__chevron" aria-hidden="true">
            expand_more
          </span>
        </button>

        {open && !disabled && menuRect && createPortal(
          <ul
            ref={menuRef}
            className="multiselect__menu"
            role="listbox"
            aria-multiselectable="true"
            style={{
              top: menuRect.bottom + 4,
              left: menuRect.left,
              width: menuRect.width,
            }}
          >
            {options.map((o) => {
              const on = selected.includes(o.value);
              return (
                <li
                  key={o.value}
                  role="option"
                  aria-selected={on}
                  className={"multiselect__option" + (on ? " is-selected" : "")}
                  aria-disabled={o.disabled || undefined}
                  onClick={() => !o.disabled && toggle(o.value)}
                >
                  <span className="multiselect__check material-symbols-rounded" aria-hidden="true">
                    {on ? "check_box" : "check_box_outline_blank"}
                  </span>
                  {o.label}
                </li>
              );
            })}
          </ul>,
          document.body
        )}
      </div>
      {(helper || error) && (
        <span className={"field__helper" + (isError ? " is-error" : "")}>{error || helper}</span>
      )}
    </div>
  );
}
