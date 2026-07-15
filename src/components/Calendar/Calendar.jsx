import React, { useState } from "react";
import { IconButton } from "../IconButton/IconButton.jsx";
import "./Calendar.css";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function isSameDay(a, b) {
  return !!a && !!b
    && a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate();
}

function addMonths(date, delta) {
  return new Date(date.getFullYear(), date.getMonth() + delta, 1);
}

function buildWeeks(viewMonth) {
  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const startOffset = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells = [];
  for (let i = startOffset - 1; i >= 0; i--) {
    cells.push({ date: new Date(year, month - 1, daysInPrevMonth - i), outside: true });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: new Date(year, month, d), outside: false });
  }
  while (cells.length % 7 !== 0) {
    const last = cells[cells.length - 1].date;
    cells.push({ date: new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1), outside: true });
  }

  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

export function Calendar({ mode = "single", value, defaultMonth, onSelect, numberOfMonths = 1, className = "" }) {
  const isRange = mode === "range";
  const from = isRange ? value?.from : undefined;
  const to = isRange ? value?.to : undefined;
  const single = isRange ? undefined : value;

  const [viewMonth, setViewMonth] = useState(() => {
    const base = (isRange ? from : single) || defaultMonth || new Date();
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });
  const today = new Date();
  const goto = (delta) => setViewMonth((m) => addMonths(m, delta));
  const months = Array.from({ length: numberOfMonths }, (_, i) => addMonths(viewMonth, i));

  const handleDayClick = (date) => {
    if (!isRange) {
      onSelect && onSelect(date);
      return;
    }
    if (!from || (from && to)) {
      onSelect && onSelect({ from: date, to: undefined });
    } else if (date < from) {
      onSelect && onSelect({ from: date, to: from });
    } else {
      onSelect && onSelect({ from, to: date });
    }
  };

  const renderDay = ({ date, outside }) => {
    const isToday = isSameDay(date, today);
    let selected, rangeStart, rangeEnd, inRange;
    if (isRange) {
      rangeStart = isSameDay(date, from);
      rangeEnd = isSameDay(date, to);
      inRange = !!from && !!to && date > from && date < to;
      selected = rangeStart || rangeEnd;
    } else {
      selected = isSameDay(date, single);
    }
    return (
      <button
        key={date.toISOString()}
        type="button"
        role="gridcell"
        className={[
          "calendar__day",
          outside && "is-outside",
          selected && "is-selected",
          inRange && "is-in-range",
          rangeStart && "is-range-start",
          rangeEnd && "is-range-end",
          isToday && !selected && "is-today",
        ].filter(Boolean).join(" ")}
        aria-current={isToday ? "date" : undefined}
        aria-selected={selected}
        onClick={() => handleDayClick(date)}
      >
        {date.getDate()}
      </button>
    );
  };

  return (
    <div className={"calendar " + (numberOfMonths > 1 ? "calendar--multi " : "") + className}>
      <div className="calendar__months">
        {months.map((month, i) => (
          <div className="calendar__month" key={`${month.getFullYear()}-${month.getMonth()}`}>
            <div className="calendar__header">
              {i === 0 ? (
                <IconButton icon="chevron_left" variant="tertiary" size="sm" label="Previous month" onClick={() => goto(-1)} />
              ) : (
                <span className="calendar__nav-spacer" aria-hidden="true" />
              )}
              <span className="calendar__title">
                {MONTH_NAMES[month.getMonth()]} {month.getFullYear()}
              </span>
              {i === months.length - 1 ? (
                <IconButton icon="chevron_right" variant="tertiary" size="sm" label="Next month" onClick={() => goto(1)} />
              ) : (
                <span className="calendar__nav-spacer" aria-hidden="true" />
              )}
            </div>

            <div className="calendar__weekdays" aria-hidden="true">
              {WEEKDAYS.map((w) => (
                <span key={w} className="calendar__weekday">{w}</span>
              ))}
            </div>

            <div role="grid" aria-label={`${MONTH_NAMES[month.getMonth()]} ${month.getFullYear()}`}>
              {buildWeeks(month).map((week, wi) => (
                <div className="calendar__week" role="row" key={wi}>
                  {week.map(renderDay)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
