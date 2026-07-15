import React, { useId, useState } from "react";
import { Icon } from "../Icon/Icon.jsx";
import { Tooltip } from "../Tooltip/Tooltip.jsx";
import { IconButton } from "../IconButton/IconButton.jsx";
import { Menu } from "../Menu/Menu.jsx";
import "./InputCurrency.css";

const ASSET_GROUP_LABELS = { stablecoin: "Stablecoin", cash: "Cash" };
const ASSET_GROUP_ORDER = ["stablecoin", "cash"];

function renderAssetOptionItem(o, selectedAssetValue, commitAsset) {
  return (
    <Menu.Item
      key={o.value}
      leading={o.logo}
      selectable="single"
      selected={o.value === selectedAssetValue}
      disabled={o.disabled}
      onSelect={() => commitAsset(o.value, o)}
    >
      {o.symbol ?? o.value}
    </Menu.Item>
  );
}

function renderAssetOptions(options, selectedAssetValue, commitAsset) {
  const hasGroups = options.some((o) => o.group);
  if (!hasGroups) {
    return options.map((o) => renderAssetOptionItem(o, selectedAssetValue, commitAsset));
  }
  const nodes = [];
  ASSET_GROUP_ORDER.forEach((group, i) => {
    const groupOptions = options.filter((o) => o.group === group);
    if (groupOptions.length === 0) return;
    if (i > 0 && nodes.length > 0) nodes.push(<Menu.Divider key={`${group}-divider`} />);
    nodes.push(<Menu.Label key={`${group}-label`}>{ASSET_GROUP_LABELS[group]}</Menu.Label>);
    groupOptions.forEach((o) => nodes.push(renderAssetOptionItem(o, selectedAssetValue, commitAsset)));
  });
  return nodes;
}
export function InputCurrency({
  label,
  labelHint,
  helper,
  error,
  position = "suffix",
  value,
  defaultValue,
  onChange,
  placeholder = "0.00",
  disabled = false,
  icon,
  linkButton, // { label="Max", onClick }
  asset = {}, // { value, defaultValue, symbol, logo, dropdown=true, options, onChange, disabled }
  id: idProp,
  className = "",
  ...inputProps
}) {
  const autoId = useId();
  const id = idProp || autoId;
  const isError = !!error;
  const isPrefix = position === "prefix";

  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue ?? "");
  const currentValue = isControlled ? value : internal;
  const handleChange = (e) => {
    if (!isControlled) setInternal(e.target.value);
    onChange && onChange(e);
  };

  const {
    value: assetValue,
    defaultValue: assetDefaultValue,
    symbol: assetSymbol = "",
    logo: assetLogo,
    dropdown = true,
    options = [],
    onChange: onAssetChange,
    disabled: assetDisabled = false,
  } = asset;

  const hasOptions = options.length > 0;
  const assetIsControlled = assetValue !== undefined;
  const [internalAsset, setInternalAsset] = useState(assetDefaultValue ?? options[0]?.value);
  const selectedAssetValue = assetIsControlled ? assetValue : internalAsset;
  const selectedOption = options.find((o) => o.value === selectedAssetValue);

  const commitAsset = (val, opt) => {
    if (opt && opt.disabled) return;
    if (!assetIsControlled) setInternalAsset(val);
    onAssetChange && onAssetChange(val, opt);
  };

  const displayLogo = selectedOption?.logo ?? assetLogo;
  const displaySymbol = selectedOption?.symbol ?? assetSymbol;
  const adornmentDisabled = disabled || assetDisabled;

  const wrapCls = [
    "input-currency",
    `input-currency--${position}`,
    isError && "is-error",
    disabled && "is-disabled",
    className,
  ].filter(Boolean).join(" ");

  const adornmentContent = (open) => (
    <>
      {displayLogo && <span className="input-currency__mark" aria-hidden="true">{displayLogo}</span>}
      {displaySymbol && <span className="input-currency__symbol">{displaySymbol}</span>}
      {dropdown && (
        <Icon
          name="expand_more"
          size={24}
          className={"input-currency__chevron" + (open ? " is-open" : "")}
        />
      )}
    </>
  );

  const adornment = hasOptions ? (
    <Menu
      className="input-currency__menu-trigger"
      align={isPrefix ? "left" : "right"}
      trigger={({ onClick, open }) => (
        <button
          type="button"
          className="input-currency__adornment"
          onClick={onClick}
          disabled={adornmentDisabled}
        >
          {adornmentContent(open)}
        </button>
      )}
    >
      {renderAssetOptions(options, selectedAssetValue, commitAsset)}
    </Menu>
  ) : (
    <div className="input-currency__adornment input-currency__adornment--static" aria-hidden={!displaySymbol && !displayLogo}>
      {adornmentContent(false)}
    </div>
  );

  const field = (
    <div className="input-currency__field">
      {icon && <span className="input-currency__icon" aria-hidden="true">{icon}</span>}
      <input
        id={id}
        type="text"
        inputMode="decimal"
        className="input-currency__input"
        disabled={disabled}
        placeholder={placeholder}
        value={currentValue}
        onChange={handleChange}
        {...inputProps}
      />
      {linkButton && (
        <button
          type="button"
          className="input-currency__link"
          onClick={linkButton.onClick}
          disabled={disabled || linkButton.disabled}
        >
          {linkButton.label || "Max"}
        </button>
      )}
    </div>
  );

  return (
    <div className="field">
      {label && (
        <div className="field__label-row">
          <label htmlFor={id} className="field__label">{label}</label>
          {labelHint && (
            <Tooltip label={labelHint} side="top">
              <IconButton icon="info" variant="tertiary" size="sm" label="More information" />
            </Tooltip>
          )}
        </div>
      )}
      <div className={wrapCls}>
        {isPrefix && adornment}
        {field}
        {!isPrefix && adornment}
      </div>
      {(helper || error) && (
        <span className={"field__helper" + (isError ? " is-error" : "")}>
          {error || helper}
        </span>
      )}
    </div>
  );
}
