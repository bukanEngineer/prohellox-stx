import React, { useId, useRef, useState, useEffect } from "react";
import "./FieldNetwork.css";

export function FieldNetwork({
  label = "Network",
  placeholder = "Select Network",
  helper,
  error,
  options = [],
  value,
  defaultValue,
  onChange,
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

  const wrapCls = [
    "fieldnetwork",
    open && "is-open",
    isError && "is-error",
    disabled && "is-disabled",
  ].filter(Boolean).join(" ");

  return (
    <div className={"field " + className} ref={rootRef}>
      {label && (
        <span className="field__label" id={`${id}-label`}>{label}</span>
      )}
      <div className={wrapCls}>
        <button
          type="button"
          className="fieldnetwork__control"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby={label ? `${id}-label` : undefined}
          onClick={() => setOpen((o) => !o)}
        >
          {selectedOption && (
            <span className="fieldnetwork__mark" aria-hidden="true">
              {selectedOption.logo || (
                <span className="fieldnetwork__initials">
                  {(selectedOption.name || selectedOption.value).slice(0, 2).toUpperCase()}
                </span>
              )}
            </span>
          )}
          <span
            className={
              "fieldnetwork__value" + (selectedOption ? "" : " is-placeholder")
            }
          >
            {selectedOption ? selectedOption.name ?? selectedOption.value : placeholder}
          </span>
          <span
            className="material-symbols-rounded fieldnetwork__chevron"
            aria-hidden="true"
          >
            expand_more
          </span>
        </button>

        {open && !disabled && (
          <ul className="fieldnetwork__menu" role="listbox">
            {options.map((o) => {
              const on = o.value === selected;
              return (
                <li
                  key={o.value}
                  role="option"
                  aria-selected={on}
                  aria-disabled={o.disabled || undefined}
                  className={
                    "fieldnetwork__option" +
                    (on ? " is-selected" : "") +
                    (o.disabled ? " is-disabled" : "")
                  }
                  onClick={() => commit(o.value, o)}
                >
                  <span className="fieldnetwork__mark" aria-hidden="true">
                    {o.logo || (
                      <span className="fieldnetwork__initials">
                        {(o.name || o.value).slice(0, 2).toUpperCase()}
                      </span>
                    )}
                  </span>
                  <span className="fieldnetwork__opt-text">
                    <span className="fieldnetwork__opt-name">{o.name ?? o.value}</span>
                    {o.secondary && (
                      <span className="fieldnetwork__opt-secondary">{o.secondary}</span>
                    )}
                  </span>
                  {o.tag && (
                    <span
                      className={
                        "fieldnetwork__tag is-" + (o.tag.variant || "positive")
                      }
                    >
                      {o.tag.label}
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
