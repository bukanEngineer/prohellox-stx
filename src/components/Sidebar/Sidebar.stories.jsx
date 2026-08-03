import React, { useState, useEffect, useRef } from "react";
import { userEvent, within } from "storybook/test";
import { Sidebar, DEFAULT_NAV_ITEMS } from "./Sidebar.jsx";
import { IconButton } from "../IconButton/IconButton.jsx";
import "./Sidebar.stories.css";

export default {
  title: "Components/Sidebar",
  component: Sidebar,
  parameters: { layout: "fullscreen" },
  args: {
    account: "personal",
    loading: false,
    loadingCount: 8,
    // Synthetic, story-only controls (not real Sidebar props) that drive
    // the two independent axes of the `sidebar__company-wrap` section:
    // whether it renders at all, and whether it behaves as a dropdown.
    showCompany: false,
    companyDropdown: true,
  },
  argTypes: {
    account: {
      control: "select",
      options: ["personal", "business", "sandbox"],
    },
    loading: { control: "boolean" },
    loadingCount: {
      control: { type: "number", min: 1, max: 20, step: 1 },
      if: { arg: "loading" },
    },
    activeItemId: { control: "text" },
    showCompany: {
      control: "boolean",
      table: { category: "Story controls" },
    },
    companyDropdown: {
      control: "boolean",
      if: { arg: "showCompany", truthy: true },
      table: { category: "Story controls" },
    },
    items: { control: false, table: { category: "Data" } },
    company: { control: false, table: { category: "Data" } },
    companies: { control: false, table: { category: "Data" } },
    companyActions: { control: false, table: { category: "Data" } },
    onCompanyClick: { control: false, table: { category: "Events" } },
    onSwitchCompany: { control: false, table: { category: "Events" } },
    onCompanyAction: { control: false, table: { category: "Events" } },
    onSelect: { control: false, table: { category: "Events" } },
  },
};

function Frame({ children }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", height: 720, background: "var(--background)" }}>
      {children}
    </div>
  );
}

const COMPANIES = [
  { id: "abc", name: "ABC Pte. Ltd", type: "Business Account", selected: true },
  { id: "xyz", name: "XYZ Pte. Ltd", type: "Business Account" },
];

// Real product navigation is links, not buttons — so the account stories drive
// the sidebar with href-bearing items (rendered as <a>; pass `linkComponent`
// to swap in a router Link). `onSelect` still fires for active-state tracking.
const NAV_ITEMS = DEFAULT_NAV_ITEMS.map((item) => ({
  ...item,
  href: `#${item.id}`,
  subItems: item.subItems?.map((sub) => ({ ...sub, href: `#${sub.id}` })),
}));

export const Personal = {
  args: {
    account: "personal",
    activeItemId: "home",
  },
  render: (args) => {
    const { showCompany, companyDropdown, ...sidebarArgs } = args;
    const [activeItemId, setActiveItemId] = useState(args.activeItemId);
    useEffect(() => setActiveItemId(args.activeItemId), [args.activeItemId]);
    return (
      <Frame>
        <Sidebar
          // Remount whenever a control changes so seed values (active,
          // loading, account, ...) are picked up and click-driven demo
          // state restarts from the new controls.
          key={JSON.stringify(args)}
          {...sidebarArgs}
          company={showCompany ? { name: "ABC Pte. Ltd", type: "Company" } : undefined}
          companies={showCompany && companyDropdown ? COMPANIES : undefined}
          items={NAV_ITEMS}
          activeItemId={activeItemId}
          onSelect={setActiveItemId}
        />
        <div style={{ padding: 32, color: "var(--text-secondary)" }}>Personal account</div>
      </Frame>
    );
  },
};

export const BusinessWithCompanyDropdown = {
  args: {
    account: "business",
    showCompany: true,
    companyDropdown: true,
    activeItemId: "mint-buy",
  },
  render: (args) => {
    const { showCompany, companyDropdown, ...sidebarArgs } = args;
    const [activeItemId, setActiveItemId] = useState(args.activeItemId);
    useEffect(() => setActiveItemId(args.activeItemId), [args.activeItemId]);
    return (
      <Frame>
        <Sidebar
          // Remount whenever a control changes so the new seed values
          // (company visibility, dropdown-ness, ...) are picked up on mount.
          key={JSON.stringify(args)}
          {...sidebarArgs}
          company={showCompany ? { name: "ABC Pte. Ltd", type: "Company" } : undefined}
          companies={showCompany && companyDropdown ? COMPANIES : undefined}
          onSwitchCompany={companyDropdown ? (id) => console.log("switch", id) : undefined}
          onCompanyAction={companyDropdown ? (id) => console.log("action", id) : undefined}
          items={NAV_ITEMS}
          activeItemId={activeItemId}
          onSelect={setActiveItemId}
        />
        <div style={{ padding: 32, color: "var(--text-secondary)" }}>
          Business — click the company profile to open the dropdown, or use
          the &quot;showCompany&quot; / &quot;companyDropdown&quot; controls
          below.
        </div>
      </Frame>
    );
  },
};

// Opt-in per-item: opening "Mint" immediately selects its first sub-item
// ("Buy") instead of just expanding. Other groups without the flag keep the
// plain expand-only behavior shown in the Personal story.
const AUTO_SELECT_NAV_ITEMS = NAV_ITEMS.map((item) =>
  item.id === "mint" ? { ...item, autoSelectFirstSubItem: true } : item
);

export const AutoSelectFirstSubItem = {
  render: () => {
    const [activeItemId, setActiveItemId] = useState("home");
    return (
      <Frame>
        <Sidebar
          account="personal"
          items={AUTO_SELECT_NAV_ITEMS}
          activeItemId={activeItemId}
          onSelect={setActiveItemId}
        />
        <div style={{ padding: 32, color: "var(--text-secondary)" }}>
          Click &quot;Mint&quot; — it expands and auto-selects &quot;Buy&quot;
        </div>
      </Frame>
    );
  },
};

// Dropdown forced open so it's visible in static Chromatic snapshots. The
// menu is uncontrolled internal state, so it's opened the same way a real
// user would — a simulated click on the trigger right after mount — rather
// than via a "start open" prop.
export const CompanyDropdownOpen = {
  render: () => {
    const containerRef = useRef(null);
    useEffect(() => {
      containerRef.current?.querySelector(".sidebar__company")?.click();
    }, []);
    return (
      <Frame>
        <div ref={containerRef} style={{ display: "contents" }}>
          <Sidebar
            account="business"
            company={{ name: "ABC Pte. Ltd", type: "Company" }}
            companies={COMPANIES}
            activeItemId="home"
          />
          <div style={{ padding: 32, color: "var(--text-secondary)" }}>
            Company-profile dropdown (open)
          </div>
        </div>
      </Frame>
    );
  },
};

// Nav item shown in its hovered state (static for Chromatic).
export const NavHover = {
  render: () => (
    <Frame>
      <Sidebar account="personal" items={DEFAULT_NAV_ITEMS} activeItemId="home" />
      <div style={{ padding: 32, color: "var(--text-secondary)" }}>Nav item hover state</div>
    </Frame>
  ),
  play: async ({ canvasElement }) => {
    await userEvent.hover(within(canvasElement).getByRole("button", { name: "Transaction History" }));
  },
};

// Loading is controlled by the consumer's async request. This story uses a
// short fixed delay so the transition is easy to observe and visual tests
// remain deterministic.
export const Loading = {
  render: () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const timer = setTimeout(() => setLoading(false), 1500);
      return () => clearTimeout(timer);
    }, []);
    return (
      <Frame>
        <Sidebar account="personal" loading={loading} />
        <div style={{ padding: 32, color: "var(--text-secondary)" }}>
          {loading ? "Nav items loading…" : "Nav items loaded"}
        </div>
      </Frame>
    );
  },
};

// Sidebar has no built-in mobile/hamburger behavior of its own — the
// consuming screen owns the topbar trigger and the open/close state, and
// wraps Sidebar in a drawer that slides in over a backdrop (see
// `BusinessDashboard`, which this story's chrome mirrors). Viewport defaults
// to mobile1 and the drawer starts open so the pattern is visible without
// interaction; the hamburger toggles it closed/open from there.
export const Mobile = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: () => {
    const [navOpen, setNavOpen] = useState(true);
    const [activeItemId, setActiveItemId] = useState("home");
    return (
      <div className="sidebar-mobile-demo">
        <div className={"sidebar-mobile-demo__sidebar-wrap" + (navOpen ? " is-open" : "")}>
          <Sidebar
            account="business"
            company={{ name: "ABC Pte. Ltd", type: "Company" }}
            items={NAV_ITEMS}
            activeItemId={activeItemId}
            onSelect={(id) => { setActiveItemId(id); setNavOpen(false); }}
          />
          <IconButton
            icon="close"
            variant="tertiary"
            label="Close menu"
            className="sidebar-mobile-demo__close"
            onClick={() => setNavOpen(false)}
          />
        </div>
        {navOpen && (
          <button
            type="button"
            className="sidebar-mobile-demo__backdrop"
            aria-label="Close navigation"
            onClick={() => setNavOpen(false)}
          />
        )}
        <div className="sidebar-mobile-demo__main">
          <header className="sidebar-mobile-demo__topbar">
            <IconButton icon="menu" variant="tertiary" label="Open menu" onClick={() => setNavOpen(true)} />
            <span className="sidebar-mobile-demo__topbar-title">Dashboard</span>
          </header>
          <div className="sidebar-mobile-demo__content">
            Tap the hamburger to open the navigation drawer.
          </div>
        </div>
      </div>
    );
  },
};

export const Sandbox = {
  render: () => (
    <Frame>
      <Sidebar account="sandbox" company={{ name: "ABC Pte. Ltd", type: "Company" }} onCompanyClick={() => {}} items={NAV_ITEMS} activeItemId="home" />
      <div style={{ padding: 32, color: "var(--text-secondary)" }}>Sandbox environment</div>
    </Frame>
  ),
};
