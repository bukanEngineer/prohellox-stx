import React from "react";
import "./TopNavProfileMenu.css";

/**
 * TopNavProfileMenu — Figma "Top Navigation / Dropdown" (5070:45712).
 *
 * The profile dropdown anchored by TopNavigation's profile/avatar trigger —
 * TopNavigation renders this internally, so it's rarely used standalone.
 * Distinct from CompanyProfileMenu (the Sidebar company switcher).
 *
 * account: "personal" | "business" | "sandbox" — personal adds a
 *   "Switch to Sandbox" row; business/sandbox omit it (account switching
 *   there lives in CompanyProfileMenu instead).
 *
 *   <TopNavProfileMenu account="personal" onAction={(id) => ...} />
 */
export function TopNavProfileMenu({ account = "personal", onAction, className = "" }) {
  const fire = (id) => () => onAction && onAction(id);

  return (
    <div className={"topnav-menu " + className} role="menu">
      <button type="button" role="menuitem" className="topnav-menu__row" onClick={fire("my-account")}>
        <span className="material-symbols-rounded" aria-hidden="true">settings</span>
        <span className="topnav-menu__label">My Account</span>
      </button>
      {account === "personal" && (
        <button type="button" role="menuitem" className="topnav-menu__row" onClick={fire("switch-to-sandbox")}>
          <span className="material-symbols-rounded" aria-hidden="true">toggle_on</span>
          <span className="topnav-menu__label">Switch to Sandbox</span>
        </button>
      )}
      <div className="topnav-menu__divider" role="separator" />
      <button type="button" role="menuitem" className="topnav-menu__row topnav-menu__row--critical" onClick={fire("logout")}>
        <span className="material-symbols-rounded" aria-hidden="true">logout</span>
        <span className="topnav-menu__label">Log Out</span>
      </button>
    </div>
  );
}
