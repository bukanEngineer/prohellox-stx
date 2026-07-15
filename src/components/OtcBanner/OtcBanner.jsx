import React from "react";
import "./OtcBanner.css";

export function OtcBanner({
  title = "StraitsX OTC Desk",
  amount = "50,000 USD",
  body,
  ctaLabel = "Request Quote",
  onCtaClick,
  href,
}) {
  const defaultBody = (
    <>
      We offer deep liquidity to institutions and high net-worth individuals. Starting from{" "}
      <span className="num">{amount}</span>.
    </>
  );
  return (
    <section className="otc">
      <div className="otc__text">
        <div className="otc__title">{title}</div>
        <p className="otc__body">{body || defaultBody}</p>
        {href ? (
          <a className="otc__cta" href={href}>
            {ctaLabel}
            <span className="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
          </a>
        ) : (
          <button type="button" className="otc__cta" onClick={onCtaClick}>
            {ctaLabel}
            <span className="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
          </button>
        )}
      </div>
      <svg viewBox="0 0 200 160" className="otc__deco" fill="none" aria-hidden="true">
        <path d="M-20 130 Q60 60 220 80 L220 200 L-20 200 Z" fill="#00D37E" opacity="0.18" />
        <path d="M0 120 Q80 50 240 70" stroke="#00D37E" strokeWidth="8" strokeLinecap="round" />
        <path d="M40 160 Q140 90 250 110" stroke="#00D37E" strokeWidth="8" strokeLinecap="round" opacity="0.75" />
        <path d="M80 200 Q170 140 260 160" stroke="#00D37E" strokeWidth="8" strokeLinecap="round" opacity="0.5" />
      </svg>
    </section>
  );
}
