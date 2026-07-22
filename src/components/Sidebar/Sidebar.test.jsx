import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Sidebar } from "./Sidebar.jsx";

describe("Sidebar", () => {
  it("highlights the item identified by activeItemId", () => {
    render(<Sidebar activeItemId="history" />);

    expect(screen.getByRole("button", { name: "Transaction History" })).toHaveClass("is-active");
  });

  it("expands the parent group when a sub-item is active", () => {
    render(<Sidebar activeItemId="mint-buy" />);

    expect(screen.getByRole("button", { name: /Mint/ })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("button", { name: "Buy" })).toHaveClass("is-active");
  });

  it("reports the selected item id", async () => {
    const onSelect = vi.fn();
    render(<Sidebar activeItemId="home" onSelect={onSelect} />);

    await userEvent.click(screen.getByRole("button", { name: "Transaction History" }));
    expect(onSelect).toHaveBeenCalledWith("history");
  });

  it("marks the active leaf item with aria-current", () => {
    render(<Sidebar activeItemId="history" />);

    expect(screen.getByRole("button", { name: "Transaction History" })).toHaveAttribute(
      "aria-current",
      "page"
    );
  });

  it("renders a leaf item as a link when it has an href", () => {
    const items = [{ id: "home", icon: "home", label: "Home", href: "/home" }];
    render(<Sidebar items={items} activeItemId="home" />);

    const link = screen.getByRole("link", { name: "Home" });
    expect(link).toHaveAttribute("href", "/home");
    expect(link).toHaveAttribute("aria-current", "page");
  });

  it("uses linkComponent for items with href", () => {
    const Link = ({ href, children, ...rest }) => (
      <a data-testid="router-link" href={href} {...rest}>{children}</a>
    );
    const items = [{ id: "home", icon: "home", label: "Home", href: "/home" }];
    render(<Sidebar items={items} linkComponent={Link} />);

    expect(screen.getByTestId("router-link")).toHaveAttribute("href", "/home");
  });

  it("renders a React node icon", () => {
    const items = [
      { id: "home", label: "Home", icon: <svg data-testid="custom-icon" /> },
    ];
    render(<Sidebar items={items} />);

    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("closes the company dropdown on Escape", async () => {
    render(
      <Sidebar
        account="business"
        company={{ name: "ABC Pte. Ltd", type: "Company" }}
        companies={[{ id: "abc", name: "ABC Pte. Ltd", type: "Business Account", selected: true }]}
      />
    );

    await userEvent.click(screen.getByRole("button", { name: /ABC Pte\. Ltd/ }));
    expect(screen.getByRole("menu")).toBeInTheDocument();

    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });
});
