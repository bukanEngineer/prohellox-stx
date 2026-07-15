import React from "react";
import "./ListSupportedNetwork.css";

export function ListSupportedNetwork({
  networks = [],
  overflow = 0,
  isNew = false,
  className = "",
  ...rest
}) {
  const cls = ["supported-network", className].filter(Boolean).join(" ");
  return (
    <div className={cls} {...rest}>
      <div className="supported-network__stack">
        {networks.map((node, i) => (
          <span className="supported-network__icon" key={i}>
            {node}
          </span>
        ))}
      </div>
      {overflow > 0 && (
        <span className="supported-network__more">+{overflow}</span>
      )}
      {isNew && <span className="supported-network__badge">NEW</span>}
    </div>
  );
}
