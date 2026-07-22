import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { createPortal } from "react-dom";
import { Logo } from "../Logo/Logo.jsx";
import { CompanyProfileMenu } from "../CompanyProfileMenu/CompanyProfileMenu.jsx";
import "./Sidebar.css";

/**
 * @typedef {Object} SidebarSubItem
 * @property {string} id Unique id; passed to `onSelect` and matched against `activeItemId`.
 * @property {string} label Visible text.
 * @property {string} [href] If set, the sub-item renders as a link (`<a>` by default).
 * @property {import("react").ElementType} [as] Custom element/component to render instead
 *   (e.g. a router `Link`). Overrides the sidebar-level `linkComponent`.
 * @property {Object} [linkProps] Extra props spread onto the rendered link element.
 */

/**
 * @typedef {Object} SidebarNavItem
 * @property {string} id Unique id; passed to `onSelect` and matched against `activeItemId`.
 * @property {string} label Visible text.
 * @property {import("react").ReactNode} [icon] A Material Symbols name (string) or any React
 *   node (e.g. an inline SVG). Sub-items are text-only.
 * @property {import("react").ReactNode} [tag] Optional trailing badge content.
 * @property {SidebarSubItem[]} [subItems] Expandable sub-items. Presence turns the row into a
 *   toggle instead of a link/leaf.
 * @property {boolean} [autoSelectFirstSubItem] When the group expands, also select its first sub-item.
 * @property {string} [href] Leaf-only: render the row as a link. Ignored when `subItems` is set.
 * @property {import("react").ElementType} [as] Leaf-only: custom element/component for the link.
 * @property {Object} [linkProps] Leaf-only: extra props spread onto the rendered link element.
 */

/**
 * @typedef {Object} SidebarCompany
 * @property {string} name Company display name.
 * @property {string} type Secondary line (e.g. "Business Account").
 */

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

// A string icon is a Material Symbols glyph name; anything else is rendered
// as-is (e.g. an inline SVG) inside a fixed-size, color-inheriting slot.
function renderIcon(icon) {
  if (icon == null) return null;
  if (typeof icon === "string") {
    return <span className="material-symbols-rounded" aria-hidden="true">{icon}</span>;
  }
  return <span className="nav-item__icon" aria-hidden="true">{icon}</span>;
}

export function Sidebar({
  account = "personal",
  company,
  onCompanyClick,
  companies,
  companyActions,
  onSwitchCompany,
  onCompanyAction,
  items = DEFAULT_NAV_ITEMS,
  activeItemId,
  onSelect,
  loading = false,
  loadingCount = 8,
  linkComponent,
}) {
  const isSandbox = account === "sandbox";
  const hasMenu = !!(companies || companyActions);
  const [menuOpen, setMenuOpen] = useState(false);
  const companyTriggerRef = useRef(null);
  const companyMenuRef = useRef(null);
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

  // Dismiss the company dropdown on outside-click or Escape, mirroring the
  // shared <Menu> behavior. The menu is portaled to <body>, so an outside
  // click is one that lands on neither the trigger nor the portaled menu.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onClickAway = (e) => {
      if (companyMenuRef.current && companyMenuRef.current.contains(e.target)) return;
      if (companyTriggerRef.current && companyTriggerRef.current.contains(e.target)) return;
      setMenuOpen(false);
    };
    const onKey = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("mousedown", onClickAway);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickAway);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const activeGroupId = items.find(
    (item) => item.subItems && (item.id === activeItemId || item.subItems.some((sub) => sub.id === activeItemId))
  )?.id;
  const [expanded, setExpanded] = useState({});
  const toggle = (id, isOpen) => setExpanded((current) => ({ ...current, [id]: !isOpen }));

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
                  ref={companyMenuRef}
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
                  const isOpen = expanded[item.id] ?? item.id === activeGroupId;
                  const isActive = activeItemId === item.id;

                  // Groups (with sub-items) are always toggle buttons. A leaf
                  // becomes a link when it has `href`/`as` (or a sidebar-level
                  // `linkComponent`); otherwise it stays a button.
                  const Item = hasSub
                    ? "button"
                    : item.href
                    ? item.as || linkComponent || "a"
                    : item.as || "button";
                  const isButton = Item === "button";
                  const itemProps = {
                    className: "nav-item" + (isActive ? " is-active" : ""),
                    onClick: () => {
                      if (hasSub) {
                        const willOpen = !isOpen;
                        toggle(item.id, isOpen);
                        if (willOpen && item.autoSelectFirstSubItem && onSelect) onSelect(item.subItems[0].id);
                      } else if (onSelect) onSelect(item.id);
                    },
                    ...(isButton ? { type: "button" } : {}),
                    ...(hasSub ? { "aria-expanded": isOpen } : {}),
                    ...(!hasSub && isActive ? { "aria-current": "page" } : {}),
                    ...(item.href ? { href: item.href } : {}),
                    ...item.linkProps,
                  };

                  return (
                    <div key={item.id} className="sidebar__group">
                      <Item {...itemProps}>
                        {renderIcon(item.icon)}
                        <span className="nav-item__label">{item.label}</span>
                        {item.tag && <span className="nav-item__tag">{item.tag}</span>}
                        {hasSub && (
                          <span className={"material-symbols-rounded nav-item__chevron" + (isOpen ? " is-open" : "")} aria-hidden="true">
                            keyboard_arrow_down
                          </span>
                        )}
                      </Item>
                      {hasSub && isOpen && (
                        <div className="sidebar__subnav">
                          {item.subItems.map((sub) => {
                            const subActive = activeItemId === sub.id;
                            const SubItem = sub.href
                              ? sub.as || linkComponent || "a"
                              : sub.as || "button";
                            const subIsButton = SubItem === "button";
                            const subProps = {
                              className: "subitem" + (subActive ? " is-active" : ""),
                              onClick: () => onSelect && onSelect(sub.id),
                              ...(subIsButton ? { type: "button" } : {}),
                              ...(subActive ? { "aria-current": "page" } : {}),
                              ...(sub.href ? { href: sub.href } : {}),
                              ...sub.linkProps,
                            };
                            return (
                              <SubItem key={sub.id} {...subProps}>
                                {sub.label}
                              </SubItem>
                            );
                          })}
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
