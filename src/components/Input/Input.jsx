import React, { useId, useState } from "react";
import "./Input.css";

export function Input({
  label,
  helper,
  error,
  prefix,
  suffix,
  type = "text",
  size = "large",
  disabled = false,
  id: idProp,
  className = "",
  value,
  defaultValue,
  onChange,
  trailingButton, // { label, onClick, disabled? }
  ...inputProps
}) {
  const autoId = useId();
  const id = idProp || autoId;
  const isError = !!error;
  const isPassword = type === "password";
  const isSearch = type === "search";

  const [reveal, setReveal] = useState(false);
  const [internal, setInternal] = useState(defaultValue ?? "");
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internal;
  const handleChange = (e) => {
    if (!isControlled) setInternal(e.target.value);
    onChange && onChange(e);
  };

  const wrapCls = [
    "input",
    `input--${size === "small" ? "small" : "large"}`,
    isError && "is-error",
    disabled && "is-disabled",
    trailingButton && "input--with-button",
    className,
  ].filter(Boolean).join(" ");

  const effectiveType = isPassword ? (reveal ? "text" : "password") : type;

  const handleClear = () => {
    if (isControlled) {
      onChange && onChange({ target: { value: "" } });
    } else {
      setInternal("");
    }
  };

  const showClear = !!currentValue && !disabled;

  return (
    <div className="field">
      {label && <label htmlFor={id} className="field__label">{label}</label>}
      <div className={wrapCls}>
        {isSearch && (
          <span className="material-symbols-rounded input__lead" aria-hidden="true">search</span>
        )}
        {prefix && !isSearch && <span className="input__prefix">{prefix}</span>}
        <input
          id={id}
          type={effectiveType}
          disabled={disabled}
          value={currentValue}
          onChange={handleChange}
          {...inputProps}
        />
        {showClear && (
          <button
            type="button"
            className="input__icon-btn"
            onClick={handleClear}
            aria-label="Clear"
          >
            <span className="material-symbols-rounded">close</span>
          </button>
        )}
        {isPassword && !disabled && (
          <button
            type="button"
            className="input__icon-btn"
            onClick={() => setReveal((r) => !r)}
            aria-label={reveal ? "Hide password" : "Show password"}
          >
            <span className="material-symbols-rounded">{reveal ? "visibility_off" : "visibility"}</span>
          </button>
        )}
        {suffix && !isSearch && !isPassword && <span className="input__suffix">{suffix}</span>}
        {trailingButton && (
          <button
            type="button"
            className="input__trailing-btn"
            onClick={trailingButton.onClick}
            disabled={disabled || trailingButton.disabled}
          >
            {trailingButton.label}
          </button>
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
