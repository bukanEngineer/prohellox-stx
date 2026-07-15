import React, { useId, useRef, useState, useEffect } from "react";
import "./FieldBank.css";

export function FieldBank({
  label = "Bank Account",
  placeholder = "Select Account",
  helper,
  error,
  options = [],
  value,
  defaultValue,
  onChange,
  addAction, // { label, onClick }
  disabled = false,
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

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const selectedOption = options.find((o) => o.value === selected);

  const commit = (val, opt) => {
    if (opt && opt.disabled) return;
    if (!isControlled) setInternal(val);
    onChange && onChange(val, opt);
    setOpen(false);
  };

  const renderMark = (o) => (
    <span className="fieldbank__mark" aria-hidden="true">
      {o.logo || (
        <span className="fieldbank__initials">
          {(o.name || o.value || "?").slice(0, 2).toUpperCase()}
        </span>
      )}
    </span>
  );

  const wrapCls = [
    "fieldbank",
    open && "is-open",
    isError && "is-error",
    disabled && "is-disabled",
  ].filter(Boolean).join(" ");

  return (
    <div className={"field " + className} ref={rootRef}>
      <div className="fieldbank__header">
        {label && (
          <span className="field__label" id={`${id}-label`}>{label}</span>
        )}
        {addAction && (
          <button
            type="button"
            className="fieldbank__link"
            onClick={addAction.onClick}
          >
            {addAction.label}
          </button>
        )}
      </div>

      <div className={wrapCls}>
        <button
          type="button"
          className="fieldbank__control"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby={label ? `${id}-label` : undefined}
          onClick={() => setOpen((o) => !o)}
        >
          {selectedOption ? (
            <>
              {renderMark(selectedOption)}
              <span className="fieldbank__text">
                <span className="fieldbank__name">
                  {selectedOption.name ?? selectedOption.value}
                </span>
                {selectedOption.account && (
                  <span className="fieldbank__secondary">{selectedOption.account}</span>
                )}
                {selectedOption.swift && (
                  <span className="fieldbank__secondary">{selectedOption.swift}</span>
                )}
              </span>
            </>
          ) : (
            <span className="fieldbank__placeholder">{placeholder}</span>
          )}
          <span
            className="material-symbols-rounded fieldbank__chevron"
            aria-hidden="true"
          >
            expand_more
          </span>
        </button>

        {open && !disabled && (
          <ul className="fieldbank__menu" role="listbox">
            {options.map((o) => {
              const on = o.value === selected;
              return (
                <li
                  key={o.value}
                  role="option"
                  aria-selected={on}
                  aria-disabled={o.disabled || undefined}
                  className={
                    "fieldbank__option" +
                    (on ? " is-selected" : "") +
                    (o.disabled ? " is-disabled" : "")
                  }
                  onClick={() => commit(o.value, o)}
                >
                  {renderMark(o)}
                  <span className="fieldbank__text">
                    <span className="fieldbank__name">{o.name ?? o.value}</span>
                    {o.account && (
                      <span className="fieldbank__secondary">{o.account}</span>
                    )}
                    {o.swift && (
                      <span className="fieldbank__secondary">{o.swift}</span>
                    )}
                    {o.status && (
                      <span className="fieldbank__tags">
                        <span
                          className={"fieldbank__tag is-" + (o.status.variant || "critical")}
                        >
                          {o.status.label}
                        </span>
                      </span>
                    )}
                  </span>
                  {o.action && (
                    <span
                      className="fieldbank__link"
                      role="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        o.action.onClick && o.action.onClick();
                      }}
                    >
                      {o.action.label}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {(helper || error) && (
        <span className={"field__helper" + (isError ? " is-error" : "")}>
          {error || helper}
        </span>
      )}
    </div>
  );
}
