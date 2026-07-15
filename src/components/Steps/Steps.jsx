import React from "react";
import "./Steps.css";

export function Steps({
  items = [],
  current = 0,
  onSelect,
  orientation = "horizontal",
  className = "",
}) {
  const cls = [
    "steps",
    orientation === "vertical" && "steps--vertical",
    className,
  ].filter(Boolean).join(" ");
  return (
    <div className={cls} role="list">
      {items.map((item, i) => {
        const state = item.failed
          ? "failed"
          : i < current ? "done" : i === current ? "active" : "todo";
        const stepCls = [
          "steps__step",
          `is-${state}`,
          onSelect && "is-clickable",
        ].filter(Boolean).join(" ");
        const StepTag = onSelect ? "button" : "div";
        return (
          <React.Fragment key={i}>
            <StepTag
              type={onSelect ? "button" : undefined}
              className={stepCls}
              onClick={onSelect ? () => onSelect(i) : undefined}
              aria-current={state === "active" ? "step" : undefined}
              style={onSelect ? { background: "transparent", border: 0, padding: 0, font: "inherit", color: "inherit", textAlign: "inherit" } : undefined}
            >
              <span className="steps__dot">
                {state === "done" ? <span className="material-symbols-rounded">check</span>
                  : state === "failed" ? <span className="material-symbols-rounded">close</span>
                  : i + 1}
              </span>
              <span className="steps__label">{item.label}</span>
              {item.sub && <span className="steps__sub">{item.sub}</span>}
            </StepTag>
            {i < items.length - 1 && (
              <span className={"steps__connector" + (state === "done" ? " is-done" : "")} aria-hidden="true" />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export function BadgeSteps({
  current = 0,
  total = 0,
  label,
  tone = "default",
  className = "",
}) {
  const cls = [
    "badge-steps",
    tone === "failed" && "badge-steps--failed",
    className,
  ].filter(Boolean).join(" ");
  return (
    <div className={cls}>
      <span className="badge-steps__count">{current}/{total}</span>
      {label && <span className="badge-steps__label">{label}</span>}
    </div>
  );
}
