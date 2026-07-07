import React from "react";
import { AppTopNav } from "../components/AppTopNav/AppTopNav.jsx";
import { Button } from "../components/Button/Button.jsx";
import { LinkButton } from "../components/LinkButton/LinkButton.jsx";
import { Tag } from "../components/Tag/Tag.jsx";
import { Logomark } from "../components/Logomark/Logomark.jsx";
import "./MarketingHero.css";

export function MarketingHero() {
  const links = [
    { label: "Products", href: "#products", children: true },
    { label: "Stablecoins", href: "#xsgd" },
    { label: "Developers", href: "#docs" },
    { label: "Company", href: "#about" },
    { label: "Blog", href: "#blog" },
  ];
  return (
    <div className="ex-marketing" data-screen-label="06 Marketing hero">
      <AppTopNav
        variant="marketing"
        appearance="dark"
        links={links}
        activeHref="#xsgd"
        actions={
          <>
            <LinkButton onDark size="md" as="a" href="#signin">Sign in</LinkButton>
            <Button variant="primary" size="md">Open account</Button>
          </>
        }
      />

      <section className="ex-marketing__hero">
        <div className="ex-marketing__hero-text">
          <Tag tone="brand" className="ex-marketing__eyebrow">Regulated by MAS</Tag>
          <h1 className="ex-marketing__h1">
            Payments<br />
            Infrastructure<br />
            for <span className="ex-marketing__h1-accent">Digital Assets</span>
          </h1>
          <p className="ex-marketing__lede">
            We enable fast and safe access to digital asset markets and decentralised finance applications through the StraitsX APIs and stablecoins for individuals and businesses.
          </p>
          <div className="ex-marketing__cta-row">
            <Button variant="primary" size="lg">Open an account</Button>
            <Button variant="secondary" size="lg" style={{ borderColor: "rgba(255,255,255,0.4)", color: "#fff" }}>Talk to sales</Button>
          </div>
          <div className="ex-marketing__proof">
            <div>
              <div className="ex-marketing__stat">$2.4B+</div>
              <div className="ex-marketing__stat-sub">processed annually</div>
            </div>
            <div>
              <div className="ex-marketing__stat">100%</div>
              <div className="ex-marketing__stat-sub">backed by liquid reserves</div>
            </div>
            <div>
              <div className="ex-marketing__stat">3</div>
              <div className="ex-marketing__stat-sub">stablecoins issued</div>
            </div>
          </div>
        </div>

        <div className="ex-marketing__hero-art">
          <div className="ex-marketing__card">
            <div className="ex-marketing__card-head">
              <div>
                <div className="ex-marketing__card-label">Your XSGD balance</div>
                <div className="ex-marketing__card-balance">125,480.<span style={{ fontSize: "0.6em", opacity: 0.7 }}>50</span></div>
              </div>
              <Logomark size={48} />
            </div>
            <div className="ex-marketing__card-row">
              <span>Pending</span><span>S$ 12,400.00</span>
            </div>
            <div className="ex-marketing__card-row">
              <span>Available</span><span>S$ 113,080.50</span>
            </div>
            <div className="ex-marketing__card-foot">
              <Tag tone="positive">● Verified</Tag>
              <span>1 XSGD = 1 SGD</span>
            </div>
          </div>
          <div className="ex-marketing__chip ex-marketing__chip--xsgd">XSGD</div>
          <div className="ex-marketing__chip ex-marketing__chip--xidr">XIDR</div>
          <div className="ex-marketing__chip ex-marketing__chip--xusd">XUSD</div>
        </div>
      </section>
    </div>
  );
}
