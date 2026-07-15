import React, { useId, useRef, useEffect } from "react";
import "./Checkbox.css";

export function Checkbox({
  label,
  sub,
  checked,
  defaultChecked,
  indeterminate = false,
  disabled = false,
  error = false,
  onChange,
  id: idProp,
  className = "",
  ...inputProps
}) {
  const id = useId();
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);
  const cls = [
    "control",
    sub && "has-sub",
    disabled && "is-disabled",
    error && "is-error",
    className,
  ].filter(Boolean).join(" ");
  return (
    <label htmlFor={idProp || id} className={cls} data-indeterminate={indeterminate || undefined}>
      <input
        ref={ref}
        type="checkbox"
        id={idProp || id}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={onChange}
        {...inputProps}
      />
      <span className="checkbox__box" aria-hidden="true">
        <svg viewBox="0 0 16 16" fill="none">
          <path d="M3 8.5 L6.5 12 L13 4.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      {label && (
        <span className="control__label">
          {label}
          {sub && <span className="control__sub">{sub}</span>}
        </span>
      )}
    </label>
  );
}
