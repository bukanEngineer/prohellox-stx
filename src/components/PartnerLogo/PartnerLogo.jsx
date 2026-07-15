import React from "react";

function bankLogo(slug) {
  const src = new URL(`../../assets/partners/${slug}.svg`, import.meta.url);
  function BankLogo({ size }) {
    return <img src={src} height={size} width={size * 1.6} alt="" />;
  }
  return BankLogo;
}

function squareLogo(slug) {
  const src = new URL(`../../assets/partners/${slug}.svg`, import.meta.url);
  function SquareLogo({ size }) {
    return <img src={src} height={size} width={size} alt="" />;
  }
  return SquareLogo;
}

const LOGOS = {
  // Coins
  xsgd: squareLogo("xsgd"),
  xusd: squareLogo("xusd"),
  xidr: squareLogo("xidr"),
  usdc: squareLogo("usdc"),
  usdt: squareLogo("usdt"),

  // Banks
  uob: bankLogo("uob"),
  anz: bankLogo("anz"),
  dbs: bankLogo("dbs"),
  "standard-chartered": bankLogo("standard-chartered"),
  smbc: bankLogo("smbc"),
  mandiri: bankLogo("mandiri"),
  rhb: bankLogo("rhb"),
  cimb: bankLogo("cimb"),
  bss: bankLogo("bss"),
  "cimb-niaga": bankLogo("cimb-niaga"),
  bni: bankLogo("bni"),
  "hana-bank": bankLogo("hana-bank"),
  bri: bankLogo("bri"),
  permata: bankLogo("permata"),
  bca: bankLogo("bca"),
  danamon: bankLogo("danamon"),
  bsi: bankLogo("bsi"),

  // Blockchains
  ethereum: squareLogo("ethereum"),
  arbitrum: squareLogo("arbitrum"),
  polygon: squareLogo("polygon"),
  metamask: squareLogo("metamask"),
  bsc: squareLogo("bsc"),
  avalanche: squareLogo("avalanche"),
  tron: squareLogo("tron"),
  ripple: squareLogo("ripple"),
  zilliqa: squareLogo("zilliqa"),
  solana: squareLogo("solana"),
  base: squareLogo("base"),
  walletconnect: squareLogo("walletconnect"),
  hedera: squareLogo("hedera"),

  // Exchanges / custodians / platforms
  binance: squareLogo("binance"),
  "crypto-com": squareLogo("crypto-com"),
  zillet: squareLogo("zillet"),
  "qcp-capital": squareLogo("qcp-capital"),
  fireblocks: squareLogo("fireblocks"),
  "onchain-custodian": squareLogo("onchain-custodian"),
  uniswap: squareLogo("uniswap"),
  dextf: squareLogo("dextf"),
  coinhako: squareLogo("coinhako"),
  liquid: squareLogo("liquid"),
  "tokenize-xchange": squareLogo("tokenize-xchange"),
  bitgo: squareLogo("bitgo"),
  "ledger-vault": squareLogo("ledger-vault"),
  unagii: squareLogo("unagii"),
  coinstore: squareLogo("coinstore"),
};

const KNOWN_COINS = ["xsgd", "xusd", "xidr", "usdc", "usdt"];
const KNOWN_BANKS = [
  "uob", "anz", "dbs", "standard-chartered", "smbc", "mandiri", "rhb", "cimb",
  "bss", "cimb-niaga", "bni", "hana-bank", "bri", "permata", "bca", "danamon", "bsi",
];
const KNOWN_CHAINS = [
  "ethereum", "arbitrum", "polygon", "metamask", "bsc", "avalanche", "tron",
  "ripple", "zilliqa", "solana", "base", "walletconnect", "hedera",
];
const KNOWN_PARTNERS = [
  "binance", "crypto-com", "zillet", "qcp-capital", "fireblocks",
  "onchain-custodian", "uniswap", "dextf", "coinhako", "liquid",
  "tokenize-xchange", "bitgo", "ledger-vault", "unagii", "coinstore",
];

function prettify(slug) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function PartnerLogo({ name, size = 32, monochrome = true, className = "", style }) {
  const Custom = LOGOS[name];
  if (Custom) return <Custom size={size} monochrome={monochrome} />;

  // Fallback monochrome wordmark pill
  const bg = monochrome ? "transparent" : "var(--surface-secondary)";
  const fg = monochrome ? "var(--text-primary)" : "var(--text-primary)";
  return (
    <span
      className={"partner-logo " + className}
      title={prettify(name)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        height: size,
        padding: `0 ${Math.max(8, size / 3)}px`,
        background: bg,
        border: `1px solid var(--border)`,
        borderRadius: 4,
        font: `700 ${Math.max(10, size / 2.7)}px/1 var(--font-display)`,
        color: fg,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {prettify(name)}
    </span>
  );
}

PartnerLogo.coins = KNOWN_COINS;
PartnerLogo.banks = KNOWN_BANKS;
PartnerLogo.chains = KNOWN_CHAINS;
PartnerLogo.partners = KNOWN_PARTNERS;
