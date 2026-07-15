import React, { useId, useRef, useState, useEffect } from "react";
import "./FieldBlockchain.css";

export function FieldBlockchain({
  label = "Blockchain Wallet",
  placeholder = "Select Wallet",
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
    <span className="fieldblockchain__mark" aria-hidden="true">
      {o.logo || (
        <span className="fieldblockchain__initials">
          {(o.name || o.value || "?").slice(0, 2).toUpperCase()}
        </span>
      )}
    </span>
  );

  const wrapCls = [
    "fieldblockchain",
    open && "is-open",
    isError && "is-error",
    disabled && "is-disabled",
  ].filter(Boolean).join(" ");

  return (
    <div className={"field " + className} ref={rootRef}>
      <div className="fieldblockchain__header">
        {label && (
          <span className="field__label" id={`${id}-label`}>{label}</span>
        )}
        {addAction && (
          <button
            type="button"
            className="fieldblockchain__link"
            onClick={addAction.onClick}
          >
            {addAction.label}
          </button>
        )}
      </div>

      <div className={wrapCls}>
        <button
          type="button"
          className="fieldblockchain__control"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby={label ? `${id}-label` : undefined}
          onClick={() => setOpen((o) => !o)}
        >
          {selectedOption ? (
            <>
              {renderMark(selectedOption)}
              <span className="fieldblockchain__text">
                <span className="fieldblockchain__name">
                  {selectedOption.name ?? selectedOption.value}
                </span>
                {selectedOption.address && (
                  <span className="fieldblockchain__secondary">
                    {selectedOption.address}
                  </span>
                )}
              </span>
            </>
          ) : (
            <span className="fieldblockchain__placeholder">{placeholder}</span>
          )}
          <span
            className="material-symbols-rounded fieldblockchain__chevron"
            aria-hidden="true"
          >
            expand_more
          </span>
        </button>

        {open && !disabled && (
          <ul className="fieldblockchain__menu" role="listbox">
            {options.map((o) => {
              const on = o.value === selected;
              return (
                <li
                  key={o.value}
                  role="option"
                  aria-selected={on}
                  aria-disabled={o.disabled || undefined}
                  className={
                    "fieldblockchain__option" +
                    (on ? " is-selected" : "") +
                    (o.disabled ? " is-disabled" : "")
                  }
                  onClick={() => commit(o.value, o)}
                >
                  {renderMark(o)}
                  <span className="fieldblockchain__text">
                    <span className="fieldblockchain__name">{o.name ?? o.value}</span>
                    {o.address && (
                      <span className="fieldblockchain__secondary">{o.address}</span>
                    )}
                    {o.meta && (
                      <span className="fieldblockchain__secondary">{o.meta}</span>
                    )}
                  </span>
                  {o.status && (
                    <span
                      className={
                        "fieldblockchain__tag is-" + (o.status.variant || "warning")
                      }
                    >
                      {o.status.label}
                    </span>
                  )}
                  {o.action && (
                    <span
                      className="fieldblockchain__link"
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
