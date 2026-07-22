import { TopNavigation } from "./TopNavigation.jsx";

export default {
  title: "Components/Top Navigation",
  component: TopNavigation,
  parameters: { layout: "fullscreen" },
  argTypes: {
    account: {
      control: "inline-radio",
      options: ["personal", "business", "sandbox"],
    },
    notifications: { control: { type: "number", min: 0, max: 99 } },
  },
};

export const Personal = {
  args: {
    account: "personal",
    notifications: 3,
    user: { name: "John Doe", initials: "JD" },
    onMenuAction: () => {},
    onMenuClick: () => {},
  },
};

export const Business = {
  args: {
    account: "business",
    notifications: 12,
    user: { name: "John Doe", company: "ABC Pte. Ltd.", initials: "AB" },
    onMenuAction: () => {},
    onMenuClick: () => {},
  },
};

export const Sandbox = {
  args: {
    account: "sandbox",
    notifications: 0,
    user: { name: "John Doe", company: "ABC Pte. Ltd.", initials: "AB" },
    onMenuAction: () => {},
    onMenuClick: () => {},
  },
};

// Same props as `Business` — narrower viewport demonstrates the responsive
// (hamburger + collapsed profile) behavior; there is no separate mobile prop.
export const Responsive = {
  args: { ...Business.args },
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
