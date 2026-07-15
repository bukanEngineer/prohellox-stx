import React, { useContext, useState } from "react";
import { ToastContext } from "../Toast/Toast.jsx";
import "./Copybox.css";

export function Copybox({
  value = "",
  multiline = false,
  size = "large",
  label,
  helper,
  info,
  error,
  action = true,
  buttonVariant = "text",
  logo,
  icon,
  truncate = false,
  className = "",
  ...rest
}) {
  const [copied, setCopied] = useState(false);
  const toast = useContext(ToastContext);
  const isError = !!error;
  const lead = logo || icon;
  const iconOnly = buttonVariant === "icon";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast?.show({ tone: "positive", message: "Copied" });
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  const wrapCls = [
    "copybox",
    action && "copybox--action",
    multiline && "copybox--multiline",
    size === "sm" && "copybox--sm",
    isError && "is-error",
    copied && "is-copied",
    className,
  ].filter(Boolean).join(" ");

  const doTruncate = truncate && !multiline && typeof value === "string" && value.length > 20;
  const renderValue = () => {
    if (!doTruncate) return value;
    const head = value.slice(0, 10);
    const tail = value.slice(-8);
    return (
      <>
        <span className="copybox__trunc-start">{head}</span>
        <span className="copybox__trunc-ellipsis">…</span>
        <span className="copybox__trunc-end">{tail}</span>
      </>
    );
  };

  return (
    <div className="field" {...rest}>
      {(label || info) && (
        <span className="field__label copybox__label">
          {label}
          {info && (
            <span className="copybox__info" tabIndex={0} aria-label={info} title={info}>
              <span className="material-symbols-rounded">info</span>
            </span>
          )}
        </span>
      )}
      <div className={wrapCls}>
        <div className="copybox__body">
          {lead && <span className="copybox__lead" aria-hidden="true">{lead}</span>}
          <span className="copybox__value" title={doTruncate ? value : undefined}>
            {renderValue()}
          </span>
        </div>
        {action && (
          <button
            type="button"
            className="copybox__btn"
            onClick={copy}
            aria-label={copied ? "Copied" : "Copy"}
          >
            <span className="material-symbols-rounded">{copied ? "check" : "content_copy"}</span>
            {!iconOnly && (copied ? "Copied" : "Copy")}
          </button>
        )}
      </div>
      {(helper || error) && (
        <span className={"field__helper" + (isError ? " is-error" : "")}>{error || helper}</span>
      )}
    </div>
  );
}
