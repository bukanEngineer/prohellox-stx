import React from "react";
import "./Tag.css";

/**
 * Tag / chip. Two variants:
 *   • "outlined" (default) — status tag; `tone` (neutral, positive, critical,
 *     warning, info) sets the color.
 *   • "new" — solid brand emphasis (for "New", "Beta", etc.); `tone` is ignored.
 *
 * `clickable` turns the tag into a selectable filter chip (rendered as a
 * <button>); when `selected` it takes the brand highlight. `removable` adds a
 * trailing close affordance.
 */
export function Tag({
  variant = "outlined",
  tone = "neutral",
  size = "large",
  icon,
  removable = false,
  onRemove,
  clickable = false,
  selected = false,
  disabled = false,
  onClick,
  className = "",
  children,
  ...rest
}) {
  const cls = [
    "tag",
    `tag--${variant}`,
    variant === "outlined" && `tag--${tone}`,
    `tag--${size}`,
    clickable && "tag--clickable",
    clickable && selected && "is-selected",
    disabled && "is-disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Leading icon: a string is treated as a Material Symbol name, any other
  // ReactNode is rendered as-is.
  const leadingIcon =
    icon == null ? null : typeof icon === "string" ? (
      <span className="material-symbols-rounded tag__icon" aria-hidden="true">{icon}</span>
    ) : (
      <span className="tag__icon" aria-hidden="true">{icon}</span>
    );

  const handleRemove = (e) => {
    e.stopPropagation();
    if (disabled) return;
    onRemove && onRemove(e);
  };

  const closeBtn = removable ? (
    <button
      type="button"
      className="tag__remove"
      aria-label="Remove"
      onClick={handleRemove}
      disabled={disabled}
      tabIndex={disabled ? -1 : 0}
    >
      <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true" fill="none">
        <path d="M3 3 L9 9 M9 3 L3 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </button>
  ) : null;

  const inner = (
    <>
      {leadingIcon}
      <span className="tag__label">{children}</span>
      {closeBtn}
    </>
  );

  // Clickable tags render as a button for proper semantics.
  if (clickable) {
    return (
      <button
        type="button"
        className={cls}
        aria-pressed={selected}
        disabled={disabled}
        onClick={disabled ? undefined : onClick}
        {...rest}
      >
        {inner}
      </button>
    );
  }

  return (
    <span className={cls} {...rest}>
      {inner}
    </span>
  );
}
