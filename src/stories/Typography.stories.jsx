import React from "react";
import "./tokens.css";

export default {
  title: "Foundations/Typography",
  parameters: { layout: "padded" },
};

const Row = ({ label, meta, font, sample }) => (
  <div style={{ display: "flex", alignItems: "baseline", gap: 18, borderBottom: "1px solid var(--border)", paddingBottom: 10 }}>
    <div style={{ font, color: "#002B2A", flex: 1 }}>{sample || label}</div>
    <div className="tk-meta">{meta}</div>
  </div>
);

export const Families = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
      <div>
        <div style={{ font: "700 64px/1 'Red Hat Display', sans-serif", color: "#002B2A", letterSpacing: "-0.01em" }}>Aa</div>
        <div style={{ font: "var(--label-medium)", marginTop: 8 }}>Red Hat Display</div>
        <div style={{ font: "var(--body-small)", color: "var(--text-secondary)" }}>Display · Title · Label (Bold)</div>
        <div style={{ font: "300 16px/1.4 'Red Hat Display', sans-serif", marginTop: 8 }}>
          Light · Regular · <b>Bold</b> · <span style={{ fontWeight: 900 }}>Black</span>
        </div>
      </div>
      <div>
        <div style={{ font: "400 64px/1 'Hanken Grotesk', sans-serif", color: "#002B2A" }}>Aa</div>
        <div style={{ font: "var(--label-medium)", marginTop: 8 }}>Hanken Grotesk</div>
        <div style={{ font: "var(--body-small)", color: "var(--text-secondary)" }}>Body · Headline · Label (Hanken)</div>
        <div style={{ font: "400 16px/1.4 'Hanken Grotesk', sans-serif", marginTop: 8 }}>
          Light · Regular · <b>Bold</b> · <span style={{ fontWeight: 900 }}>Black</span>
        </div>
      </div>
      <div>
        <div style={{ font: "600 56px/1 'Red Hat Mono', monospace", color: "#002B2A" }}>1234</div>
        <div style={{ font: "var(--label-medium)", marginTop: 8 }}>Red Hat Mono</div>
        <div style={{ font: "var(--body-small)", color: "var(--text-secondary)" }}>Numerals · Code · Google Fonts</div>
      </div>
    </div>
  ),
};

export const Display = {
  render: () => (
    <div className="tk-row--baseline">
      <Row label="Display L" meta="RHD Bold · 36→64 fluid" font="var(--display-large)" />
      <Row label="Display M" meta="RHD Bold · 32→45 fluid" font="var(--display-medium)" />
      <Row label="Display S" meta="RHD Bold · 28→36 fluid" font="var(--display-small)" />
      <p style={{ font: "var(--body-small)", color: "var(--text-secondary)" }}>Marketing &amp; hero use only. Avoid in dashboard. Sizes scale fluidly with viewport (360→1240px) — resize the canvas to preview.</p>
    </div>
  ),
};

export const Title = {
  render: () => (
    <div className="tk-row--baseline">
      <Row label="Title Large" meta="RHD Bold · 24→28 fluid" font="var(--title-large)" />
      <Row label="Title Medium" meta="RHD Bold · 20→24 fluid" font="var(--title-medium)" />
      <Row label="Title Small" meta="RHD Bold · 18→20 fluid" font="var(--title-small)" />
    </div>
  ),
};

export const Label = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
      <div>
        <div className="tk-meta" style={{ textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Label · Red Hat Display</div>
        <div style={{ font: "var(--label-large)", color: "#002B2A" }}>Label Large 16</div>
        <div style={{ font: "var(--label-medium)", color: "#002B2A", marginTop: 4 }}>Label Medium 14</div>
        <div style={{ font: "var(--label-small)", color: "#002B2A", marginTop: 4 }}>Label Small 12</div>
      </div>
      <div>
        <div className="tk-meta" style={{ textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Label · Hanken Grotesk</div>
        <div style={{ font: "var(--body-bold-large)", color: "#002B2A" }}>Label Large 16</div>
        <div style={{ font: "var(--body-bold-medium)", color: "#002B2A", marginTop: 4 }}>Label Medium 14</div>
        <div style={{ font: "var(--body-bold-small)", color: "#002B2A", marginTop: 4 }}>Label Small 12</div>
      </div>
    </div>
  ),
};

export const Body = {
  render: () => (
    <div className="tk-row--baseline">
      <div>
        <div style={{ font: "var(--body-large)", color: "#002B2A", maxWidth: 560 }}>
          Body Large 16 / 24 — Hanken Grotesk Regular. Used for descriptions and the secondary text under titles.
        </div>
        <div className="tk-meta" style={{ marginTop: 2 }}>Hanken · 16 / 1.5</div>
      </div>
      <div>
        <div style={{ font: "var(--body-medium)", color: "#002B2A", maxWidth: 560 }}>
          Body Medium 14 / 21 — default body. Also used for input labels and the bulk of dashboard copy.
        </div>
        <div className="tk-meta" style={{ marginTop: 2 }}>Hanken · 14 / 1.5</div>
      </div>
      <div>
        <div style={{ font: "var(--body-small)", color: "#002B2A", maxWidth: 560 }}>
          Body Small 12 / 18 — fine print, helper text, and dense table cells.
        </div>
        <div className="tk-meta" style={{ marginTop: 2 }}>Hanken · 12 / 1.5</div>
      </div>
    </div>
  ),
};
