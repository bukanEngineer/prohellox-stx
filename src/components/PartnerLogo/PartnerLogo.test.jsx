import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { PartnerLogo } from "./PartnerLogo.jsx";
import { AssetMark } from "../AssetMark/AssetMark.jsx";

// Regression guard for the bundler-compatibility bug this component used to
// have: logos were previously loaded via `new URL(..., import.meta.url)`
// and rendered as `<img src="...">`, which most bundlers (Webpack/Next.js,
// and even Vite for templated paths) can't statically resolve — consumers
// would get a broken image. Logos are now inlined as real SVG JSX, so these
// assertions check for actual <svg><path> markup and the absence of any
// <img>/file-URL indirection.
describe("PartnerLogo", () => {
  it.each([
    ...PartnerLogo.coins,
    ...PartnerLogo.banks,
    ...PartnerLogo.chains,
    ...PartnerLogo.partners,
  ])("renders %s as an inline <svg>, not an <img>", (slug) => {
    const { container } = render(<PartnerLogo name={slug} size={32} />);
    const svg = container.querySelector("svg");
    expect(svg, `expected ${slug} to render an inline <svg>`).toBeTruthy();
    expect(svg.querySelector("path, circle, rect, g")).toBeTruthy();
    expect(container.querySelector("img")).toBeNull();
  });

  it("renders a fallback pill (not a broken image) for unregistered names", () => {
    const { container } = render(<PartnerLogo name="some-unlisted-partner" />);
    expect(container.querySelector("svg")).toBeNull();
    expect(container.querySelector("img")).toBeNull();
    expect(container.textContent).toContain("Some Unlisted Partner");
  });

  it("sizes bank logos as a wide lockup and everything else square", () => {
    const { container: bank } = render(<PartnerLogo name="dbs" size={40} />);
    const bankSvg = bank.querySelector("svg");
    expect(bankSvg.getAttribute("width")).toBe(String(40 * 1.6));
    expect(bankSvg.getAttribute("height")).toBe("40");

    const { container: coin } = render(<PartnerLogo name="xsgd" size={40} />);
    const coinSvg = coin.querySelector("svg");
    expect(coinSvg.getAttribute("width")).toBe("40");
    expect(coinSvg.getAttribute("height")).toBe("40");
  });
});

describe("AssetMark", () => {
  it.each(["XSGD", "USDC", "ETH", "POLYGON", "SOLANA"])(
    "renders the %s network/stablecoin mark as an inline <svg>",
    (asset) => {
      const { container } = render(<AssetMark asset={asset} />);
      expect(container.querySelector("svg")).toBeTruthy();
      expect(container.querySelector("img")).toBeNull();
    },
  );
});
