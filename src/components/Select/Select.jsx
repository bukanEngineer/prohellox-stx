import React, { useId, useState } from "react";
import { Menu } from "../Menu/Menu.jsx";
import "./Select.css";

export function Select({
  label,
  helper,
  error,
  options = [],
  placeholder = "Select…",
  size = "large",
  disabled = false,
  value,
  defaultValue,
  onChange,
  id: idProp,
  className = "",
  ...rest
}) {
  const autoId = useId();
  const id = idProp || autoId;
  const isError = !!error;
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue ?? "");
  const selectedValue = isControlled ? value : internal;
  const selectedOption = options.find((o) => o.value === selectedValue);

  const select = (option) => {
    if (!isControlled) setInternal(option.value);
    onChange && onChange(option.value, option);
  };

  const clear = (e) => {
    e.stopPropagation();
    if (!isControlled) setInternal("");
    onChange && onChange("", null);
  };

  return (
    <div className={"field " + className}>
      {label && (
        <span className="field__label" id={`${id}-label`}>{label}</span>
      )}
      <Menu
        className="select-menu"
        trigger={({ onClick, open }) => (
          <button
            type="button"
            id={id}
            disabled={disabled}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-labelledby={label ? `${id}-label` : undefined}
            onClick={onClick}
            className={[
              "select",
              `select--${size === "small" ? "small" : "large"}`,
              isError && "is-error",
              disabled && "is-disabled",
            ].filter(Boolean).join(" ")}
            {...rest}
          >
            <span className="select__value">
              {selectedOption ? (
                selectedOption.label
              ) : (
                <span className="select__placeholder">{placeholder}</span>
              )}
            </span>
            {selectedOption && !disabled && (
              <span
                className="material-symbols-rounded select__clear"
                role="button"
                aria-label="Clear selection"
                onClick={clear}
              >
                close
              </span>
            )}
            <span className="material-symbols-rounded select__chevron" aria-hidden="true">expand_more</span>
          </button>
        )}
      >
        {options.map((o) => (
          <Menu.Item
            key={o.value}
            selectable="single"
            selected={o.value === selectedValue}
            disabled={o.disabled}
            onSelect={() => select(o)}
          >
            {o.label}
          </Menu.Item>
        ))}
      </Menu>
      {(helper || error) && (
        <span className={"field__helper" + (isError ? " is-error" : "")}>{error || helper}</span>
      )}
    </div>
  );
}
