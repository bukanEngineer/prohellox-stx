import React from "react";
import { PartnerLogo } from "../PartnerLogo/PartnerLogo.jsx";
import "./AssetMark.css";

/* Brand constants for third-party assets/networks (official brand colors —
 * these are brand identities, not themeable design tokens). StraitsX
 * stablecoins resolve to the design-system brand tokens. `logo` points to a
 * registered PartnerLogo slug — when present, the real brand mark is shown
 * instead of the glyph fallback. */
const ASSETS = {
  XSGD: { glyph: "S$", var: "--brand-xsgd", logo: "xsgd" },
  XIDR: { glyph: "Rp", var: "--brand-xidr", logo: "xidr" },
  XUSD: { glyph: "$",  var: "--brand-xusd", logo: "xusd" },
  SGD:  { glyph: "S$", var: "--brand-xsgd", logo: "xsgd" },
  IDR:  { glyph: "Rp", var: "--brand-xidr", logo: "xidr" },
  USD:  { glyph: "$",  var: "--brand-xusd", logo: "xusd" },
  USDC: { glyph: "C",  color: "#2775CA", logo: "usdc" },
  USDT: { glyph: "T",  color: "#26A17B", logo: "usdt" },
  ETH:  { glyph: "Ξ",  color: "#627EEA", logo: "ethereum" },
  ETHEREUM: { glyph: "Ξ", color: "#627EEA", logo: "ethereum" },
  POLYGON: { glyph: "P", color: "#6C00F6", logo: "polygon" },
  ARBITRUM: { glyph: "A", color: "#28A0F0", logo: "arbitrum" },
  BASE: { glyph: "B", color: "#0052FF", logo: "base" },
  SOLANA: { glyph: "◎", color: "#14F195", logo: "solana" },
  TRON: { glyph: "T", color: "#EB0029", logo: "tron" },
  BNB: { glyph: "B", color: "#F3BA2F", logo: "binance" },
  BINANCE: { glyph: "B", color: "#F3BA2F", logo: "binance" },
  XRP: { glyph: "✕", color: "#23292F", logo: "ripple" },
  RIPPLE: { glyph: "✕", color: "#23292F", logo: "ripple" },
  HBAR: { glyph: "ℏ", color: "#222222", logo: "hedera" },
  HEDERA: { glyph: "ℏ", color: "#222222", logo: "hedera" },
  AVAX: { glyph: "A", color: "#E84142", logo: "avalanche" },
  AVALANCHE: { glyph: "A", color: "#E84142", logo: "avalanche" },
  MATIC: { glyph: "M", color: "#6C00F6", logo: "polygon" },
  METAMASK: { glyph: "M", color: "#E2761B", logo: "metamask" },
  WALLETCONNECT: { glyph: "W", color: "#3B99FC", logo: "walletconnect" },
};

export function AssetMark({ asset, label, color, size = 40, tone = "brand", className = "", children }) {
  const def = asset ? ASSETS[asset.toUpperCase()] : undefined;
  const glyph = label ?? def?.glyph ?? (asset ? asset.slice(0, 2).toUpperCase() : "?");
  const isWhite = tone === "white";
  // Real PartnerLogo marks are licensed full-color assets, so they only
  // apply when nothing overrides the look (no children/label/color/white tone).
  const useLogo = !children && !label && !color && !isWhite && def?.logo;
  const bg = color ?? (def?.var ? `var(${def.var})` : def?.color) ?? "var(--surface-secondary)";
  const hasBrand = !!(color || def);
  const style = {
    width: size,
    height: size,
    background: useLogo || isWhite ? "transparent" : bg,
    color: isWhite
      ? "currentColor"
      : hasBrand
        ? "var(--text-inverse)"
        : "var(--text-secondary)",
    fontSize: Math.round(size * 0.4),
  };
  const cls = "asset-mark" + (isWhite ? " asset-mark--white" : "") + (className ? " " + className : "");
  return (
    <span className={cls} style={style} aria-label={asset || label} role="img">
      {children ?? (useLogo ? <PartnerLogo name={def.logo} size={size} /> : glyph)}
    </span>
  );
}
