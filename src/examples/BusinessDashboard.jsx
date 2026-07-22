import React, { useState } from "react";
import { Sidebar } from "../components/Sidebar/Sidebar.jsx";
import { TopNavigation } from "../components/TopNavigation/TopNavigation.jsx";
import { EstimatedBalance } from "../components/EstimatedBalance/EstimatedBalance.jsx";
import { IconButton } from "../components/IconButton/IconButton.jsx";
import { AssetMark } from "../components/AssetMark/AssetMark.jsx";
import { CardSwap } from "../components/CardSwap/CardSwap.jsx";
import { OtcBanner } from "../components/OtcBanner/OtcBanner.jsx";
import { Alert } from "../components/Alert/Alert.jsx";
import { LinkButton } from "../components/LinkButton/LinkButton.jsx";
import { Logomark } from "../components/Logomark/Logomark.jsx";
import { Badge } from "../components/Badge/Badge.jsx";
import "./BusinessDashboard.css";

const NAV_ITEMS = [
  { id: "home", icon: "home", label: "Home" },
  { id: "earn", icon: "savings", label: "Earn" },
  { id: "history", icon: "receipt_long", label: "Transaction History" },
  { id: "statement", icon: "description", label: "Account Statement" },
  { id: "team", icon: "badge", label: "Team" },
  { id: "help", icon: "help", label: "Help" },
  { id: "support", icon: "support_agent", label: "Support" },
];

const STABLECOIN_ASSETS = [
  {
    symbol: "XSGD",
    subtitle: "1:1 to SGD",
    balance: "1,123,456,789.00",
    fiat: "~2,032 SGD",
    networks: ["SOLANA", "AVALANCHE", "POLYGON", "ETHEREUM"],
    extra: "+3",
  },
  {
    symbol: "XUSD",
    subtitle: "1:1 to USD",
    balance: "1,123,456,789.00",
    fiat: "~2,032 SGD",
    networks: ["BINANCE", "ETHEREUM"],
  },
  {
    symbol: "USDC",
    balance: "1,123,456,789.00",
    fiat: "~2,032 SGD",
    networks: ["POLYGON", "ETHEREUM"],
  },
  {
    symbol: "USDT",
    balance: "1,123,456,789.00",
    fiat: "~2,032 SGD",
    networks: ["TRON", "BINANCE", "ETHEREUM"],
  },
];

const CASH_ASSETS = [
  {
    symbol: "IDR",
    subtitle: "Indonesian Rupiah",
    balance: "1,123,456,789.00",
    fiat: "~95,400 SGD",
    networks: [],
  },
  {
    symbol: "SGD",
    subtitle: "Singapore Dollar",
    balance: "84,500.00",
    fiat: "~84,500 SGD",
    networks: [],
  },
];

const TRANSACTIONS = [
  {
    icon: "arrow_outward",
    title: "Blockchain Transfer Out",
    sub: " to Coinhako",
    amount: "3,211 XSGD",
    status: "Completed",
    date: "28 Jul 2021, 14.01",
  },
  {
    icon: "add",
    title: "Bank Transfer In",
    amount: "3,211 XSGD",
    status: "Completed",
    date: "28 Jul 2021, 14.01",
  },
  {
    icon: "swap_vert",
    title: "Swap from",
    sub: " -100,000 XUSD",
    amount: "+1,294,45.83 USDC",
    status: "Completed",
    date: "28 Jul 2021, 14.01",
    positive: true,
  },
];

function ActionBtn({ icon, label, variant = "primary" }) {
  return (
    <div className="ex-bd__action">
      <IconButton icon={icon} variant={variant} label={label} />
      <span className="ex-bd__action-label">{label}</span>
    </div>
  );
}

function AssetRow({ asset }) {
  return (
    <li className="ex-bd__asset-row">
      <div className="ex-bd__asset-coin">
        <AssetMark asset={asset.symbol} size={40} />
        <div className="ex-bd__coin-text">
          <span className="ex-bd__coin-symbol">{asset.symbol}</span>
          {asset.subtitle && <span className="ex-bd__coin-sub">{asset.subtitle}</span>}
        </div>
      </div>

      <div className="ex-bd__asset-balance">
        <span className="ex-bd__balance-amount">{asset.balance}</span>
        {asset.fiat && <span className="ex-bd__balance-fiat">{asset.fiat}</span>}
      </div>

      <div className="ex-bd__asset-networks">
        {asset.networks.slice(0, 4).map((n) => (
          <AssetMark key={n} asset={n} size={20} className="ex-bd__network-mark" />
        ))}
        {asset.extra && <span className="ex-bd__network-extra">{asset.extra}</span>}
      </div>

      <div className="ex-bd__asset-actions">
        <IconButton variant="secondary" size="sm" icon="add" label={`Add ${asset.symbol}`} />
        <IconButton variant="secondary" size="sm" icon="arrow_outward" label={`Send ${asset.symbol}`} />
      </div>
    </li>
  );
}

const SWAP_CURRENCY_OPTIONS = [
  { value: "XSGD", symbol: "XSGD", logo: <AssetMark asset="XSGD" size={24} /> },
  { value: "XUSD", symbol: "XUSD", logo: <AssetMark asset="XUSD" size={24} /> },
  { value: "USDC", symbol: "USDC", logo: <AssetMark asset="USDC" size={24} /> },
  { value: "USDT", symbol: "USDT", logo: <AssetMark asset="USDT" size={24} /> },
];

export function BusinessDashboard() {
  const [activeItemId, setActiveItemId] = useState("home");
  const [assetTab, setAssetTab] = useState("stable");
  const [showBanner, setShowBanner] = useState(true);
  const [swapFromAmount, setSwapFromAmount] = useState("20");
  const [swapFromCurrency, setSwapFromCurrency] = useState("XUSD");
  const [swapToCurrency, setSwapToCurrency] = useState("XSGD");
  const [navOpen, setNavOpen] = useState(false);

  const assets = assetTab === "stable" ? STABLECOIN_ASSETS : CASH_ASSETS;

  return (
    <div className="ex-bd">
      <div className={"ex-bd__sidebar-wrap" + (navOpen ? " is-open" : "")}>
        <Sidebar
          account="business"
          company={{ name: "Acme Pte. Ltd.", type: "Company" }}
          items={NAV_ITEMS}
          activeItemId={activeItemId}
          onSelect={(id) => { setActiveItemId(id); setNavOpen(false); }}
        />
        <IconButton
          icon="close"
          variant="tertiary"
          label="Close menu"
          className="ex-bd__sidebar-close"
          onClick={() => setNavOpen(false)}
        />
      </div>
      {navOpen && (
        <button
          type="button"
          className="ex-bd__backdrop"
          aria-label="Close navigation"
          onClick={() => setNavOpen(false)}
        />
      )}

      <main className="ex-bd__main">
        <header className="ex-bd__mobile-topbar">
          <IconButton icon="menu" variant="tertiary" label="Open menu" onClick={() => setNavOpen(true)} />
          <Logomark size={32} />
          <div className="ex-bd__mobile-topbar-actions">
            <Badge.Wrap badge={<Badge tone="critical" size="sm">3</Badge>}>
              <IconButton icon="notifications" variant="secondary" size="sm" label="Notifications" />
            </Badge.Wrap>
            <IconButton icon="person" variant="secondary" size="sm" label="Account" />
          </div>
        </header>

        <div className="ex-bd__head">
          <TopNavigation
            account="business"
            notifications={3}
            user={{ name: "Sarah Chen", company: "Acme Pte. Ltd." }}
          />
        </div>

        <div className="ex-bd__hero">
          <EstimatedBalance label="My Estimated Balance" amount="2,081.23" currency="SGD" />
          <div className="ex-bd__actions">
            <ActionBtn icon="add" label="Transfer In" variant="primary" />
            <ActionBtn icon="arrow_outward" label="Transfer Out" variant="primary" />
            <ActionBtn icon="receipt_long" label="Transaction History" variant="secondary" />
          </div>
        </div>

        <div className="ex-bd__grid">
          <div className="ex-bd__col">
            {/* Asset card */}
            <section className="ex-bd__asset-card">
              <div className="ex-bd__asset-header">
                <div className="ex-bd__asset-title">
                  <span>My Assets</span>
                  <button type="button" className="ex-bd__icon-btn" aria-label="Refresh">
                    <span className="material-symbols-rounded">refresh</span>
                  </button>
                </div>
                <div className="ex-bd__tab-group">
                  <button
                    type="button"
                    className={`ex-bd__tab ${assetTab === "cash" ? "ex-bd__tab--active" : ""}`}
                    onClick={() => setAssetTab("cash")}
                  >
                    Cash Wallet
                  </button>
                  <button
                    type="button"
                    className={`ex-bd__tab ${assetTab === "stable" ? "ex-bd__tab--active" : ""}`}
                    onClick={() => setAssetTab("stable")}
                  >
                    Stablecoin Wallet
                  </button>
                </div>
              </div>

              {showBanner && assetTab === "stable" && (
                <Alert tone="positive" onDismiss={() => setShowBanner(false)}>
                  XSGD and XUSD are StraitsX-issued stablecoins regulated by MAS. They are backed 1:1
                  by SGD and USD respectively
                </Alert>
              )}

              <ul className="ex-bd__asset-list">
                {assets.map((a) => (
                  <AssetRow key={a.symbol} asset={a} />
                ))}
              </ul>
            </section>

            {/* Latest transactions */}
            <section className="ex-bd__txn-card">
              <div className="ex-bd__txn-header">
                <span className="ex-bd__txn-title">Latest Transactions</span>
                <button type="button" className="ex-bd__icon-btn" aria-label="Refresh">
                  <span className="material-symbols-rounded">refresh</span>
                </button>
              </div>

              <ul className="ex-bd__txn-list">
                {TRANSACTIONS.map((t, i) => (
                  <li key={i} className="ex-bd__txn-row">
                    <span className="ex-bd__txn-icon">
                      <span className="material-symbols-rounded">{t.icon}</span>
                    </span>
                    <div className="ex-bd__txn-info">
                      <span className="ex-bd__txn-desc">
                        <strong>{t.title}</strong>{t.sub}
                      </span>
                      <span className={["ex-bd__txn-amount", t.positive && "ex-bd__txn-amount--positive"].filter(Boolean).join(" ")}>
                        {t.amount}
                      </span>
                    </div>
                    <div className="ex-bd__txn-meta">
                      <span className="ex-bd__txn-status">{t.status}</span>
                      <span className="ex-bd__txn-date">{t.date}</span>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="ex-bd__txn-footer">
                <LinkButton>View All</LinkButton>
              </div>
            </section>
          </div>

          {/* Right column */}
          <div className="ex-bd__col">
            <CardSwap
              from={{
                amount: swapFromAmount,
                currency: swapFromCurrency,
                balance: "1,300 " + swapFromCurrency,
                onMax: () => setSwapFromAmount("1300"),
                onAmountChange: setSwapFromAmount,
                options: SWAP_CURRENCY_OPTIONS,
                onCurrencyChange: setSwapFromCurrency,
              }}
              to={{
                amount: (Number(swapFromAmount || 0) * 1.273).toFixed(2),
                currency: swapToCurrency,
                balance: "1,000 " + swapToCurrency,
                options: SWAP_CURRENCY_OPTIONS,
                onCurrencyChange: setSwapToCurrency,
              }}
              rate={`1 ${swapToCurrency} ≈ 0.7233 ${swapFromCurrency}`}
            />
            <OtcBanner />
          </div>
        </div>

        <p className="ex-bd__footnote">
          XSGD, XUSD and XIDR are issued by StraitsX. &quot;STRAITSX&quot;, &quot;XSGD&quot;, &quot;XIDR&quot; and all other
          URLs, logos, and trademarks related to the StraitsX Services are either trademarks or
          registered trademarks of StraitsX or its licensors. StraitsX is the trading name of the
          StraitsX Group of Companies and its affiliated entities.
        </p>
      </main>
    </div>
  );
}
