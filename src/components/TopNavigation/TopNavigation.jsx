import React, { useEffect, useRef, useState } from "react";
import { Badge } from "../Badge/Badge.jsx";
import { Tag } from "../Tag/Tag.jsx";
import { IconButton } from "../IconButton/IconButton.jsx";
import { TopNavProfileMenu } from "../TopNavProfileMenu/TopNavProfileMenu.jsx";
import "./TopNavigation.css";

/**
 * TopNavigation — dashboard app-shell top bar (Figma "Top Navigation", 1998:71939).
 *
 * account: "personal" | "business" | "sandbox"
 *
 * Mobile is responsive behavior, not a prop — below the breakpoint, CSS
 * collapses the profile text and shows a hamburger automatically.
 *
 * Right cluster = notifications bell (optional count Badge) + account/profile
 *   area (avatar/initials + name + chevron). Clicking the profile area opens
 *   a TopNavProfileMenu (Figma "Top Navigation / Dropdown") anchored below
 *   it — closes on an outside click, Escape, or picking a row. Selecting a
 *   row calls `onMenuAction(id)` with "my-account" | "switch-to-sandbox" |
 *   "logout". Sandbox shows a "Sandbox" Tag indicator; Business shows the
 *   company name, Personal shows the user's name. On narrow screens, the
 *   profile text collapses and a hamburger (onMenuClick) appears.
 *
 *   <TopNavigation
 *     account="business"
 *     user={{ name: "John Doe", company: "ABC Pte. Ltd.", initials: "JD" }}
 *     notifications={3}
 *     onMenuAction={(id) => ...}
 *     onMenuClick={() => ...}
 *   />
 */
export function TopNavigation({
  account = "personal",
  user = {},
  notifications = 0,
  onMenuClick,
  onNotificationsClick,
  onMenuAction,
  className = "",
  children,
}) {
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    if (!profileOpen) return undefined;
    const onClickAway = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    const onKey = (e) => { if (e.key === "Escape") setProfileOpen(false); };
    document.addEventListener("mousedown", onClickAway);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickAway);
      document.removeEventListener("keydown", onKey);
    };
  }, [profileOpen]);

  const isSandbox = account === "sandbox";
  const isBusiness = account === "business";

  // Personal → user name; Business/Sandbox → company name (fall back to name).
  const primaryLabel = isBusiness || isSandbox
    ? (user.company || user.name || "")
    : (user.name || "");
  const initials =
    user.initials ||
    (user.name || "")
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0])
      .join("")
      .toUpperCase();

  const avatar = (
    <span className="topnav__avatar" aria-hidden="true">
      {user.avatar ? (
        <img className="topnav__avatar-img" src={user.avatar} alt="" />
      ) : initials ? (
        <span className="topnav__initials">{initials}</span>
      ) : (
        <span className="material-symbols-rounded">person</span>
      )}
    </span>
  );

  const cls = ["topnav", className].filter(Boolean).join(" ");

  return (
    <header className={cls} data-account={account}>
      <IconButton
        icon="menu"
        variant="tertiary"
        label="Open menu"
        onClick={onMenuClick}
        className="topnav__hamburger"
      />
      {isSandbox && (
        <Tag tone="warning" size="small" className="topnav__sandbox">
          Sandbox
        </Tag>
      )}

      <div className="topnav__right">
        {children}

        <Badge.Wrap
          badge={
            notifications > 0 ? (
              <Badge tone="critical" size="sm">
                {notifications}
              </Badge>
            ) : null
          }
        >
          <IconButton
            icon="notifications"
            variant="secondary"
            size="sm"
            label="Notifications"
            onClick={onNotificationsClick}
          />
        </Badge.Wrap>

        <div className="topnav__profile-wrap" ref={profileRef}>
          <button
            type="button"
            className="topnav__profile"
            onClick={() => setProfileOpen((o) => !o)}
            aria-label={primaryLabel ? `Account: ${primaryLabel}` : "Account"}
            aria-haspopup="menu"
            aria-expanded={profileOpen}
          >
            {avatar}
            {primaryLabel && (
              <span className="topnav__profile-text">
                <span className="topnav__profile-name">{primaryLabel}</span>
                {(isBusiness || isSandbox) && user.name && (
                  <span className="topnav__profile-sub">{user.name}</span>
                )}
              </span>
            )}
            <span
              className="material-symbols-rounded topnav__chevron"
              aria-hidden="true"
            >
              expand_more
            </span>
          </button>
          {profileOpen && (
            <div className="topnav__profile-menu">
              <TopNavProfileMenu
                account={account}
                onAction={(id) => {
                  setProfileOpen(false);
                  onMenuAction && onMenuAction(id);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
