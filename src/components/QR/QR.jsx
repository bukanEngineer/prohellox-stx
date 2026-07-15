import React from "react";
import "./QR.css";

const defaultUrlBuilder = (value, size) =>
  `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(value)}`;

export function QR({
  value,
  size = 200,
  label,
  sub,
  urlBuilder = defaultUrlBuilder,
  className = "",
}) {
  return (
    <div className={"qr " + className}>
      <img
        className="qr__img"
        style={{ width: size, height: size }}
        src={urlBuilder(value, size)}
        alt={label || "QR code"}
        loading="lazy"
      />
      {label && <div className="qr__label">{label}</div>}
      {sub && <div className="qr__sub">{sub || value}</div>}
    </div>
  );
}
