import React, { useEffect, useId, useRef, useState } from "react";
import { Calendar } from "../Calendar/Calendar.jsx";
import "../Input/Input.css";
import "./DateInput.css";

const DATE_FMT = new Intl.DateTimeFormat("en-SG", { day: "numeric", month: "long", year: "numeric" });
const RANGE_DATE_FMT = new Intl.DateTimeFormat("en-US", { day: "2-digit", month: "short", year: "numeric" });

function parseISO(value) {
  if (!value) return undefined;
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return undefined;
  return new Date(y, m - 1, d);
}

function toISO(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * Date input — click to open a Calendar popover (shadcn-style date picker),
 * styled to match StraitsX inputs. Values are "yyyy-mm-dd" strings, same as
 * the native date input this replaces.
 *
 * Size axis: "large" (48px, default) | "small" (36px) — matches Input.
 *
 * Single mode: `value`/`defaultValue` + `onChange` (receives a
 *   `{ target: { value } }` shape for drop-in compatibility).
 *
 * Date-range mode (`range`): pick a start then end day in one calendar
 *   popover. Control via `startValue`/`endValue`/`onRangeChange`.
 *
 *   <DateInput label="Date of birth" onChange={(e) => ...} />
 *   <DateInput label="Period" range startValue="2026-01-01" endValue="2026-03-31"
 *     onRangeChange={({ start, end }) => …} />
 */
export function DateInput({
  label,
  helper,
  error,
  size = "large",
  range = false,
  placeholder,
  value,
  defaultValue,
  onChange,
  startValue,
  endValue,
  onRangeChange,
  disabled = false,
  id: idProp,
  className = "",
}) {
  const id = useId();
  const isError = !!error;
  const sizeCls = `input--${size === "small" ? "small" : "large"}`;

  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const selectedDate = parseISO(currentValue);
  const startDate = parseISO(startValue);
  const endDate = parseISO(endValue);

  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onClickAway = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onClickAway);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickAway);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const handleSelect = (date) => {
    const iso = toISO(date);
    if (!isControlled) setInternalValue(iso);
    onChange && onChange({ target: { value: iso } });
    setOpen(false);
  };

  const handleRangeSelect = ({ from, to }) => {
    onRangeChange && onRangeChange({
      start: from ? toISO(from) : undefined,
      end: to ? toISO(to) : undefined,
    });
    if (from && to) setOpen(false);
  };

  let displayText = placeholder || (range ? "Pick a date range" : "Pick a date");
  let isPlaceholder = true;
  if (range && (startDate || endDate)) {
    displayText = startDate && endDate
      ? `${RANGE_DATE_FMT.format(startDate)} - ${RANGE_DATE_FMT.format(endDate)}`
      : `${RANGE_DATE_FMT.format(startDate || endDate)} - …`;
    isPlaceholder = false;
  } else if (!range && selectedDate) {
    displayText = DATE_FMT.format(selectedDate);
    isPlaceholder = false;
  }

  const wrapCls = [
    "input",
    sizeCls,
    isError && "is-error",
    disabled && "is-disabled",
    open && "is-focused",
    "date-input__trigger",
    className,
  ].filter(Boolean).join(" ");

  return (
    <div className="field">
      {label && <label htmlFor={idProp || id} className="field__label">{label}</label>}
      <div className="date-input__wrap" ref={wrapRef}>
        <button
          id={idProp || id}
          type="button"
          className={wrapCls}
          disabled={disabled}
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="dialog"
          aria-expanded={open}
        >
          <span className="material-symbols-rounded input__lead" aria-hidden="true">calendar_today</span>
          <span className={"date-input__value" + (isPlaceholder ? " is-placeholder" : "")}>
            {displayText}
          </span>
        </button>
        {open && (
          <div className="date-input__popover">
            {range ? (
              <Calendar
                mode="range"
                numberOfMonths={2}
                value={{ from: startDate, to: endDate }}
                defaultMonth={startDate}
                onSelect={handleRangeSelect}
              />
            ) : (
              <Calendar value={selectedDate} defaultMonth={selectedDate} onSelect={handleSelect} />
            )}
          </div>
        )}
      </div>
      {(helper || error) && (
        <span className={"field__helper" + (isError ? " is-error" : "")}>{error || helper}</span>
      )}
    </div>
  );
}
