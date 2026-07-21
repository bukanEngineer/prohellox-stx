import React from "react";
import "./Steps.css";

/** Segmented progress bar for linear, user-driven flows (onboarding, KYC, quizzes). */
export function HorizontalSteps({
  total = 3,
  current = 1,
  showCount = true,
  label = "Text",
  className = "",
  ...rest
}) {
  const steps = Math.min(Math.max(total, 2), 7);
  const cls = ["h-steps", className].filter(Boolean).join(" ");
  return (
    <div className={cls} {...rest}>
      <div
        className="h-steps__track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={steps}
        aria-valuenow={current}
      >
        {Array.from({ length: steps }).map((_, i) => (
          <span
            key={i}
            className={"h-steps__segment" + (i < current ? " is-filled" : "")}
          />
        ))}
      </div>
      {showCount && (
        <span className="h-steps__count">
          {current}/{steps} {label}
        </span>
      )}
    </div>
  );
}

/** Read-only, system-driven status timeline (e.g. request/transfer history). */
export function VerticalSteps({ items = [], className = "", ...rest }) {
  const cls = ["v-steps", className].filter(Boolean).join(" ");
  return (
    <ol className={cls} {...rest}>
      {items.map((item, i) => {
        const status = item.status || "inactive";
        const isFirst = i === 0;
        const isLast = i === items.length - 1;
        const prevCompleted = i > 0 && items[i - 1].status === "completed";
        // A bare failed dot is never acceptable — always surface an explanatory note.
        const note = item.note || (status === "failed" ? "Failed" : undefined);
        return (
          <li key={i} className={`v-steps__item is-${status}`}>
            <span className="v-steps__line">
              {!isFirst && (
                <span
                  className={"v-steps__connector" + (prevCompleted ? " is-done" : "")}
                  aria-hidden="true"
                />
              )}
              <span className="v-steps__dot" aria-hidden="true" />
              {!isLast && (
                <span
                  className={"v-steps__connector" + (status === "completed" ? " is-done" : "")}
                  aria-hidden="true"
                />
              )}
            </span>
            <span className="v-steps__content">
              <span className="v-steps__title">{item.title}</span>
              {item.timestamp && <span className="v-steps__timestamp">{item.timestamp}</span>}
              {note && <span className="v-steps__note">{note}</span>}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

/** Compact step header for content living inside a card (e.g. transfer method selection). */
export function BadgeSteps({ step = 1, title, description, className = "", ...rest }) {
  const cls = ["badge-steps", className].filter(Boolean).join(" ");
  return (
    <div className={cls} {...rest}>
      <span className="badge-steps__counter" aria-hidden="true">{step}</span>
      <span className="badge-steps__content">
        {title && <span className="badge-steps__title">{title}</span>}
        {description && <span className="badge-steps__description">{description}</span>}
      </span>
    </div>
  );
}
