import React from "react";
import "./InlineCrossAsset.css";

export function InlineCrossAsset({
  from = "XUSD",
  to = "USD",
  fromIcon,
  toIcon,
  caption = "Your XUSD will be converted 1:1 to USD",
  className = "",
  ...rest
}) {
  const cls = ["inline-cross-asset", className].filter(Boolean).join(" ");
  return (
    <div className={cls} {...rest}>
      <div className="inline-cross-asset__row">
        <span className="inline-cross-asset__asset">
          {fromIcon != null && (
            <span className="inline-cross-asset__icon">{fromIcon}</span>
          )}
          <span className="inline-cross-asset__symbol">{from}</span>
        </span>
        <span
          className="inline-cross-asset__arrow material-symbols-rounded"
          aria-hidden="true"
        >
          arrow_forward
        </span>
        <span className="inline-cross-asset__asset">
          {toIcon != null && (
            <span className="inline-cross-asset__icon">{toIcon}</span>
          )}
          <span className="inline-cross-asset__symbol">{to}</span>
        </span>
      </div>
      {caption && <p className="inline-cross-asset__caption">{caption}</p>}
    </div>
  );
}
