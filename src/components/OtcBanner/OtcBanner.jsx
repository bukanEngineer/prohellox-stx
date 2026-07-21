import React from "react";
import "./OtcBanner.css";

const patternA = new URL("./assets/pattern-141.svg", import.meta.url);
const patternB = new URL("./assets/pattern-143.svg", import.meta.url);
const patternC = new URL("./assets/pattern-142.svg", import.meta.url);
const patternD = new URL("./assets/pattern-145.svg", import.meta.url);
const arrow = new URL("./assets/arrow.svg", import.meta.url);

export function OtcBanner({
  title = "StraitsX OTC Desk",
  amount = "100,000 USD",
  body,
  ctaLabel = "Request for a Quote",
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
      <div className="otc__deco" aria-hidden="true">
        <div className="otc__pattern otc__pattern--a"><img src={patternA} alt="" /></div>
        <div className="otc__pattern otc__pattern--b"><img src={patternB} alt="" /></div>
        <div className="otc__pattern otc__pattern--c"><img src={patternC} alt="" /></div>
        <div className="otc__pattern otc__pattern--d"><img src={patternD} alt="" /></div>
      </div>
      <div className="otc__text">
        <div className="otc__title">{title}</div>
        <p className="otc__body">{body || defaultBody}</p>
      </div>
      {href ? (
        <a className="otc__cta" href={href}>
          {ctaLabel}
          <img className="otc__cta-arrow" src={arrow} alt="" aria-hidden="true" />
        </a>
      ) : (
        <button type="button" className="otc__cta" onClick={onCtaClick}>
          {ctaLabel}
          <img className="otc__cta-arrow" src={arrow} alt="" aria-hidden="true" />
        </button>
      )}
    </section>
  );
}
