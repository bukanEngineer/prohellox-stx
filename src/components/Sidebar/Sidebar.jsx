import React, { useState, useRef, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { Logo } from "../Logo/Logo.jsx";
import { CompanyProfileMenu } from "../CompanyProfileMenu/CompanyProfileMenu.jsx";
import "./Sidebar.css";

export const DEFAULT_NAV_ITEMS = [
  { id: "home", icon: "home", label: "Home" },
  {
    id: "mint", icon: "account_balance_wallet", label: "Mint", tag: "New",
    subItems: [
      { id: "mint-buy", label: "Buy" },
      { id: "mint-sell", label: "Sell" },
    ],
  },
  { id: "history", icon: "receipt_long", label: "Transaction History" },
  { id: "statement", icon: "description", label: "Account Statement" },
  { id: "devtools", icon: "developer_mode", label: "Developer Tools" },
  { id: "team", icon: "badge", label: "Team" },
  { id: "settings", icon: "tune", label: "Settings" },
  { id: "support", icon: "support_agent", label: "Support" },
];

const ACCOUNT_LABEL = {
  personal: "Personal Account",
  business: "Business Account",
  sandbox: "Sandbox",
};

/**
 * Left navigation (Figma "Sidebar - Base"). Account-type variants, optional
 * company-profile dropdown, expandable nav items with sub-items, "New" tags,
 * and the MAS regulatory badge.
 *
 * Items with `subItems` toggle open/closed on click. Set
 * `autoSelectFirstSubItem: true` on an item to also call `onSelect` with its
 * first sub-item's id the moment it's opened — useful when a group has no
 * route of its own and should land on its first child. Omit it (default
 * false) to keep plain expand/collapse with no selection. Both behaviors can
 * be mixed across items in the same `items` array.
 *
 * Pass `loading` to replace the nav items with animated skeleton
 * placeholders (e.g. while nav config is being fetched). `loadingCount`
 * controls how many placeholder rows render (default 8).
 *
 *   <Sidebar
 *     account="business"
 *     company={{ name: "ABC Pte. Ltd", type: "Company" }}
 *     onCompanyClick={() => ...}
 *     items={DEFAULT_NAV_ITEMS}
 *     active="home"
 *     activeSubItem="mint-buy"
 *     onSelect={(id) => ...}
 *   />
 */
export function Sidebar({
  account = "personal",
  company,
  onCompanyClick,
  companies,
  companyActions,
  onSwitchCompany,
  onCompanyAction,
  defaultMenuOpen = false,
  items = DEFAULT_NAV_ITEMS,
  active,
  activeSubItem,
  hoveredItem, // id of a nav item to render in its hovered state (stories/Chromatic)
  onSelect,
  loading = false,
  loadingCount = 8,
}) {
  const isSandbox = account === "sandbox";
  const hasMenu = !!(companies || companyActions);
  const [menuOpen, setMenuOpen] = useState(defaultMenuOpen);
  const companyTriggerRef = useRef(null);
  const [companyMenuRect, setCompanyMenuRect] = useState(null);

  // Popover is portaled to <body> so it can escape .sidebar__top's
  // overflow-y: auto (which, per the CSS overflow spec, also forces
  // overflow-x to compute as auto and clip this sideways-opening menu).
  useLayoutEffect(() => {
    if (!menuOpen) return undefined;
    const el = companyTriggerRef.current;
    if (!el) return undefined;
    const measure = () => setCompanyMenuRect(el.getBoundingClientRect());
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [menuOpen]);
  const [expanded, setExpanded] = useState(() => {
    const init = {};
    items.forEach((i) => {
      if (i.subItems && (i.id === active || i.subItems.some((s) => s.id === activeSubItem))) init[i.id] = true;
    });
    return init;
  });
  const toggle = (id) => setExpanded((e) => ({ ...e, [id]: !e[id] }));

  return (
    <aside className={"sidebar" + (isSandbox ? " is-sandbox" : "")}>
      <div className="sidebar__scroll">
        <div className="sidebar__top">
          <div className="sidebar__brand">
            <Logo size={172} tone={isSandbox ? "white" : "default"} />
            <div className="sidebar__brand-sub">{ACCOUNT_LABEL[account] || ACCOUNT_LABEL.personal}</div>
          </div>

          {company && (
            <div className="sidebar__company-wrap">
              <button
                ref={companyTriggerRef}
                type="button"
                className={"sidebar__company" + (menuOpen ? " is-open" : "")}
                onClick={() => { if (hasMenu) setMenuOpen((o) => !o); else if (onCompanyClick) onCompanyClick(); }}
                aria-haspopup={hasMenu || onCompanyClick ? "menu" : undefined}
                aria-expanded={hasMenu ? menuOpen : undefined}
              >
                <span className="sidebar__company-text">
                  <span className="sidebar__company-name">{company.name}</span>
                  <span className="sidebar__company-type">{company.type}</span>
                </span>
                {(hasMenu || onCompanyClick) && (
                  <span className={"material-symbols-rounded sidebar__company-chevron" + (menuOpen ? " is-open" : "")} aria-hidden="true">expand_more</span>
                )}
              </button>
              {hasMenu && menuOpen && companyMenuRect && createPortal(
                <div
                  className="sidebar__company-menu"
                  style={{
                    top: companyMenuRect.top,
                    left: companyMenuRect.right + 8,
                  }}
                >
                  <CompanyProfileMenu
                    switchCompany={!!companies}
                    companies={companies || []}
                    actions={companyActions || undefined}
                    onSwitch={(id) => { setMenuOpen(false); onSwitchCompany && onSwitchCompany(id); }}
                    onAction={(id) => { setMenuOpen(false); onCompanyAction && onCompanyAction(id); }}
                  />
                </div>,
                document.body
              )}
            </div>
          )}

          <nav className="sidebar__nav" aria-label="Main">
            {loading
              ? Array.from({ length: loadingCount }, (_, i) => (
                  <div
                    key={i}
                    className="nav-item-skeleton"
                    style={{ "--skeleton-width": `${55 + ((i * 17) % 35)}%` }}
                    aria-hidden="true"
                  >
                    <span className="nav-item-skeleton__icon" />
                    <span className="nav-item-skeleton__label" />
                  </div>
                ))
              : items.map((item) => {
                  const hasSub = item.subItems && item.subItems.length > 0;
                  const isOpen = !!expanded[item.id];
                  const isActive = active === item.id && !(hasSub && item.subItems.some((s) => s.id === activeSubItem));
                  return (
                    <div key={item.id} className="sidebar__group">
                      <button
                        type="button"
                        className={"nav-item" + (isActive ? " is-active" : "") + (hoveredItem === item.id ? " is-hovered" : "")}
                        aria-expanded={hasSub ? isOpen : undefined}
                        onClick={() => {
                          if (hasSub) {
                            const willOpen = !isOpen;
                            toggle(item.id);
                            if (willOpen && item.autoSelectFirstSubItem && onSelect) onSelect(item.subItems[0].id);
                          } else if (onSelect) onSelect(item.id);
                        }}
                      >
                        <span className="material-symbols-rounded" aria-hidden="true">{item.icon}</span>
                        <span className="nav-item__label">{item.label}</span>
                        {item.tag && <span className="nav-item__tag">{item.tag}</span>}
                        {hasSub && (
                          <span className={"material-symbols-rounded nav-item__chevron" + (isOpen ? " is-open" : "")} aria-hidden="true">
                            keyboard_arrow_down
                          </span>
                        )}
                      </button>
                      {hasSub && isOpen && (
                        <div className="sidebar__subnav">
                          {item.subItems.map((sub) => (
                            <button
                              key={sub.id}
                              type="button"
                              className={"subitem" + (activeSubItem === sub.id ? " is-active" : "")}
                              onClick={() => onSelect && onSelect(sub.id)}
                            >
                              {sub.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
          </nav>
        </div>

        <div className="sidebar__mas">
          <span className="material-symbols-rounded" aria-hidden="true">verified_user</span>
          <span className="sidebar__mas-text">Licensed &amp; Regulated by Monetary Authority of Singapore</span>
        </div>
      </div>
    </aside>
  );
}
