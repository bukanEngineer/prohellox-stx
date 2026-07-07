import React from "react";
import { Badge } from "../Badge/Badge.jsx";
import { Tag } from "../Tag/Tag.jsx";
import { IconButton } from "../IconButton/IconButton.jsx";
import { Logomark } from "../Logomark/Logomark.jsx";
import "./AppTopNav.css";

/**
 * AppTopNav — top bar for both the dashboard app-shell and the marketing site
 * (Figma "Top Navigation", 1998:71939).
 *
 * variant: "app" (default) | "marketing"
 *
 * "app" variant renders the platform/account variants of the dashboard top bar:
 *   platform: "desktop" | "mobile"
 *   account:  "personal" | "business" | "sandbox"
 *
 *   Desktop layout: StraitsX logo (left) · optional center nav links ·
 *   right cluster = notifications bell (optional count Badge) + account/profile
 *   area (avatar/initials + name + chevron). The profile area triggers
 *   onProfileClick and is meant to anchor a CompanyProfileMenu dropdown.
 *   Sandbox shows a "Sandbox" Tag indicator; Business shows the company name,
 *   Personal shows the user's name.
 *
 *   Mobile layout: compact bar = hamburger (onMenuClick) + centered logo +
 *   profile avatar.
 *
 *   <AppTopNav
 *     account="business"
 *     platform="desktop"
 *     links={[{ id: "home", label: "Home", href: "#", active: true }]}
 *     user={{ name: "John Doe", company: "ABC Pte. Ltd.", initials: "JD" }}
 *     notifications={3}
 *     onProfileClick={() => ...}
 *     onMenuClick={() => ...}
 *   />
 *
 * "marketing" variant renders the public-site nav: brand + horizontal links +
 *   a right-aligned `actions` slot (e.g. Sign in / Open account buttons).
 *   Supports a `dark` appearance for hero sections.
 *
 *   <AppTopNav
 *     variant="marketing"
 *     appearance="dark"
 *     links={[{ label: "Products", href: "#products", children: true }]}
 *     activeHref="#products"
 *     actions={<><LinkButton onDark>Sign in</LinkButton><Button>Open account</Button></>}
 *   />
 */
export function AppTopNav({
  variant = "app",
  account = "personal",
  platform = "desktop",
  appearance = "light",
  brand = "StraitsX",
  logo,
  links,
  activeHref,
  actions,
  user = {},
  notifications = 0,
  onMenuClick,
  onProfileClick,
  className = "",
  children,
}) {
  const isMarketing = variant === "marketing";
  const isMobile = platform === "mobile";
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
    <span className="app-topnav__avatar" aria-hidden="true">
      {user.avatar ? (
        <img className="app-topnav__avatar-img" src={user.avatar} alt="" />
      ) : initials ? (
        <span className="app-topnav__initials">{initials}</span>
      ) : (
        <span className="material-symbols-rounded">person</span>
      )}
    </span>
  );

  const logoEl = logo || <Logomark size={32} />;

  if (isMarketing) {
    const cls = [
      "app-topnav",
      "app-topnav--marketing",
      appearance === "dark" && "app-topnav--dark",
      className,
    ].filter(Boolean).join(" ");
    return (
      <header className={cls}>
        <a href="/" className="app-topnav__brand">
          <Logomark size={28} fill={appearance === "dark" ? "#00D37E" : undefined} />
          <span>{brand}</span>
        </a>
        {Array.isArray(links) && links.length > 0 && (
          <nav className="app-topnav__nav app-topnav__nav--marketing" aria-label="Primary">
            {links.map((link) => {
              const isActive = link.active ?? (activeHref != null && link.href === activeHref);
              const cls =
                "app-topnav__link" + (isActive ? " is-active" : "");
              return link.href ? (
                <a key={link.id || link.label} href={link.href} className={cls}>
                  {link.label}
                  {link.children && (
                    <span className="material-symbols-rounded">expand_more</span>
                  )}
                </a>
              ) : (
                <button
                  key={link.id || link.label}
                  type="button"
                  className={cls}
                  onClick={link.onClick}
                >
                  {link.label}
                  {link.children && (
                    <span className="material-symbols-rounded">expand_more</span>
                  )}
                </button>
              );
            })}
          </nav>
        )}
        {actions && <div className="app-topnav__actions">{actions}</div>}
      </header>
    );
  }

  if (isMobile) {
    return (
      <header className="app-topnav app-topnav--mobile" data-account={account}>
        <IconButton
          icon="menu"
          variant="tertiary"
          label="Open menu"
          onClick={onMenuClick}
          className="app-topnav__menu"
        />
        <span className="app-topnav__logo app-topnav__logo--center">{logoEl}</span>
        <button
          type="button"
          className="app-topnav__profile app-topnav__profile--compact"
          onClick={onProfileClick}
          aria-label={primaryLabel ? `Account: ${primaryLabel}` : "Account"}
          aria-haspopup="menu"
        >
          {avatar}
        </button>
      </header>
    );
  }

  return (
    <header className="app-topnav app-topnav--desktop" data-account={account}>
      <div className="app-topnav__left">
        <span className="app-topnav__logo">{logoEl}</span>
        {isSandbox && (
          <Tag tone="warning" size="small" className="app-topnav__sandbox">
            Sandbox
          </Tag>
        )}
      </div>

      {Array.isArray(links) && links.length > 0 && (
        <nav className="app-topnav__nav" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.id || link.label}
              href={link.href || "#"}
              className={
                "app-topnav__link" + (link.active ? " is-active" : "")
              }
              aria-current={link.active ? "page" : undefined}
              onClick={link.onClick}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}

      <div className="app-topnav__right">
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
            variant="tertiary"
            label="Notifications"
          />
        </Badge.Wrap>

        <button
          type="button"
          className="app-topnav__profile"
          onClick={onProfileClick}
          aria-haspopup="menu"
        >
          {avatar}
          {primaryLabel && (
            <span className="app-topnav__profile-text">
              <span className="app-topnav__profile-name">{primaryLabel}</span>
              {(isBusiness || isSandbox) && user.name && (
                <span className="app-topnav__profile-sub">{user.name}</span>
              )}
            </span>
          )}
          <span
            className="material-symbols-rounded app-topnav__chevron"
            aria-hidden="true"
          >
            expand_more
          </span>
        </button>
      </div>
    </header>
  );
}
