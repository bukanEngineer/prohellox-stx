import React, { useId } from "react";
import "./SelectionBox.css";

export function SelectionBox({
  type = "radio",
  selected = false,
  disabled = false,
  label,
  description,
  icon,
  indicator = "control",
  name,
  value,
  onChange,
  id: idProp,
  className = "",
  ...rest
}) {
  const autoId = useId();
  const id = idProp || autoId;

  const cls = [
    "selbox",
    `selbox--${type}`,
    `selbox--indicator-${indicator}`,
    selected && "is-selected",
    disabled && "is-disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleChange = (e) => {
    if (disabled) return;
    // radios select (true); checks toggle.
    const next = type === "check" ? !selected : true;
    onChange && onChange(next, e);
  };

  const renderIndicator = () => {
    if (indicator === "icon") {
      return (
        <span className="selbox__indicator selbox__indicator--icon" aria-hidden="true">
          <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
            <path
              d="M3 8.5 L6.5 12 L13 4.5"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      );
    }
    if (type === "check") {
      return (
        <span className="selbox__indicator selbox__box selbox__box--check" aria-hidden="true">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
            <path
              d="M3 8.5 L6.5 12 L13 4.5"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      );
    }
    return <span className="selbox__indicator selbox__box selbox__box--radio" aria-hidden="true" />;
  };

  return (
    <label htmlFor={id} className={cls} {...rest}>
      <input
        type={type === "check" ? "checkbox" : "radio"}
        id={id}
        name={name}
        value={value}
        checked={selected}
        disabled={disabled}
        onChange={handleChange}
        className="selbox__input"
      />
      {renderIndicator()}
      {icon && <span className="selbox__icon" aria-hidden="true">{icon}</span>}
      <span className="selbox__content">
        {label && <span className="selbox__label">{label}</span>}
        {description && <span className="selbox__desc">{description}</span>}
      </span>
    </label>
  );
}
