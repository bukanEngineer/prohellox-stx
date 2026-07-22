import React, { useId } from "react";
import { SelectionBox } from "../SelectionBox/SelectionBox.jsx";
import "./CardSteps.css";

export function CardSteps({ step = 1, title, helperText, children, className = "", ...rest }) {
  const cls = ["card-steps", className].filter(Boolean).join(" ");
  return (
    <section className={cls} {...rest}>
      <div className="card-steps__head">
        <span className="card-steps__counter num">{step}</span>
        <p className="card-steps__title">{title}</p>
      </div>
      {(children || helperText) && (
        <div className="card-steps__content">
          {children}
          {helperText && <p className="card-steps__helper">{helperText}</p>}
        </div>
      )}
    </section>
  );
}

function resolveIcon(icon) {
  if (!icon) return undefined;
  if (typeof icon === "string") {
    return <span className="material-symbols-rounded">{icon}</span>;
  }
  return icon;
}

CardSteps.Options = function CardStepsOptions({
  options = [],
  selected,
  onSelect,
  name: nameProp,
  className = "",
}) {
  const autoName = useId();
  const name = nameProp || autoName;
  const cls = ["card-steps__options", className].filter(Boolean).join(" ");

  return (
    <div className={cls} role="radiogroup">
      {options.map((opt) => (
        <SelectionBox
          key={opt.id}
          type="radio"
          name={name}
          value={opt.id}
          label={opt.label}
          description={opt.description}
          icon={resolveIcon(opt.icon)}
          selected={opt.id === selected}
          disabled={opt.disabled}
          onChange={() => onSelect?.(opt.id)}
        />
      ))}
    </div>
  );
};
