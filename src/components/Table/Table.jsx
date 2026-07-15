import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Tooltip } from "../Tooltip/Tooltip.jsx";
import "./Table.css";

/* Resolve the active IANA zone: an explicit name (e.g. "Asia/Jakarta") when
 * given, otherwise the viewer's own zone auto-detected from the browser. */
function resolveZone(tz) {
  if (typeof tz === "string" && tz) return tz;
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    return "UTC";
  }
}

/* Describe a zone as { city, abbrev, offset } for the header label, e.g.
 * { city: "Jakarta", abbrev: null, offset: "GMT+7" } or
 * { city: "New York", abbrev: "EDT", offset: "GMT-4" }. `abbrev` is dropped when
 * it's just the offset again, so the label never repeats itself. */
function describeZone(zone, date = new Date()) {
  const namePart = (style) => {
    try {
      return new Intl.DateTimeFormat("en-US", { timeZone: zone, timeZoneName: style })
        .formatToParts(date)
        .find((p) => p.type === "timeZoneName")?.value;
    } catch {
      return undefined;
    }
  };
  const offset = namePart("shortOffset") || "";
  const abbrev = namePart("short");
  const city = zone.split("/").pop().replace(/_/g, " ");
  return { city, abbrev: abbrev && abbrev !== offset ? abbrev : null, offset };
}

const hasTimeComponent = (value) =>
  value instanceof Date || typeof value === "number" || /[T\s]\d{1,2}:\d{2}/.test(String(value));

/* Format a date value for display in the given IANA `zone`. Falls back to the
 * raw value if it isn't a parseable date. `format` overrides the Intl options. */
function formatDateInZone(value, zone, format) {
  const d = value instanceof Date ? value : new Date(value);
  if (isNaN(d.getTime())) return value;

  const opts = format || {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...(hasTimeComponent(value) ? { hour: "2-digit", minute: "2-digit" } : {}),
  };

  try {
    return d.toLocaleString(undefined, { ...opts, timeZone: zone });
  } catch {
    return d.toLocaleString(undefined, opts);
  }
}

export function Table({
  columns = [],
  rows = [],
  rowKey = "id",
  zebra = false,
  empty = "No data.",
  className = "",
  scrollX,
  scrollY,
  sort,
  defaultSort = null,
  onSortChange,
  onLoadMore,
  hasMore = false,
  loading = false,
  loadingLabel = "Loading more…",
  endLabel,
  showTimezone = false,
  timezone,
}) {
  const [internalSort, setInternalSort] = useState(defaultSort);
  const activeSort = sort !== undefined ? sort : internalSort;

  const toggleSort = (col) => {
    if (!col.sortable) return;
    let next;
    if (!activeSort || activeSort.key !== col.key) next = { key: col.key, direction: "asc" };
    else if (activeSort.direction === "asc") next = { key: col.key, direction: "desc" };
    else next = null;

    if (sort === undefined) setInternalSort(next);
    onSortChange && onSortChange(next);
  };
  const hasFixed = columns.some((c) => c.fixed === "left" || c.fixed === "right");
  const wrapRef = useRef(null);
  const headRowRef = useRef(null);
  const [offsets, setOffsets] = useState({});
  const [ping, setPing] = useState({ left: false, right: false });

  useLayoutEffect(() => {
    if (!hasFixed) return;
    const measure = () => {
      const wrap = wrapRef.current;
      const ths = headRowRef.current ? Array.from(headRowRef.current.children) : [];
      const next = {};

      let leftAcc = 0;
      columns.forEach((c, i) => {
        if (c.fixed === "left") {
          next[c.key] = { left: leftAcc };
          leftAcc += ths[i]?.offsetWidth || 0;
        }
      });

      let rightAcc = 0;
      for (let i = columns.length - 1; i >= 0; i--) {
        const c = columns[i];
        if (c.fixed === "right") {
          next[c.key] = { ...(next[c.key] || {}), right: rightAcc };
          rightAcc += ths[i]?.offsetWidth || 0;
        }
      }
      setOffsets(next);

      if (wrap) {
        setPing({
          left: wrap.scrollLeft > 0,
          right: wrap.scrollLeft + wrap.clientWidth < wrap.scrollWidth - 1,
        });
      }
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, [columns, rows, hasFixed]);

  /* ── Infinite scroll: fire onLoadMore when a sentinel row nears the viewport.
   * Consumers should memoize onLoadMore (e.g. useCallback) to avoid re-observing. ── */
  const infinite = typeof onLoadMore === "function";
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (!infinite || !hasMore || loading) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) onLoadMore();
      },
      // When the body scrolls internally (scrollY), observe within the wrap;
      // otherwise fall back to the document viewport.
      { root: scrollY ? wrapRef.current : null, rootMargin: "120px" }
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, [infinite, hasMore, loading, scrollY, rows.length, onLoadMore]);

  const lastLeftKey = columns.filter((c) => c.fixed === "left").pop()?.key;
  const firstRightKey = columns.find((c) => c.fixed === "right")?.key;

  // Active zone: the `timezone` override, else the viewer's own detected zone.
  const zone = useMemo(() => resolveZone(timezone), [timezone]);
  const zoneInfo = useMemo(() => describeZone(zone), [zone]);
  // "Jakarta, GMT+7" or "New York, EDT, GMT-4".
  const zoneLabel = [zoneInfo.city, zoneInfo.abbrev, zoneInfo.offset].filter(Boolean).join(", ");

  /* Cell content: custom render wins; when `showTimezone` is on, date columns are
   * formatted in the active zone (DST-correct via Intl). */
  const cellContent = (c, row) => {
    if (c.render) return c.render(row);
    const value = row[c.key];
    if (showTimezone && c.date && value != null && value !== "") {
      return formatDateInZone(value, zone, c.dateFormat);
    }
    return value;
  };

  /* Build the header tooltip for a column, combining its own `tooltip` config
   * with the timezone note shown on date columns when `showTimezone` is on. */
  const headerTooltip = (c) => {
    let title;
    let content;
    if (c.tooltip) {
      if (typeof c.tooltip === "string") content = c.tooltip;
      else ({ title, content } = c.tooltip);
    }
    const tz = showTimezone && c.date ? zoneLabel : null;
    if (!title && !content && !tz) return null;
    return {
      title,
      content: (
        <>
          {content && <span>{content}</span>}
          {tz && <span className="table__th-tz">Times shown in {tz}</span>}
        </>
      ),
    };
  };

  const handleScroll = (e) => {
    if (!hasFixed) return;
    const el = e.currentTarget;
    setPing({
      left: el.scrollLeft > 0,
      right: el.scrollLeft + el.clientWidth < el.scrollWidth - 1,
    });
  };

  const cellStyle = (c) => {
    const style = {};
    if (c.width) style.width = c.width;
    const offset = offsets[c.key];
    if (c.fixed === "left" && offset) style.left = offset.left;
    if (c.fixed === "right" && offset) style.right = offset.right;
    return style;
  };

  const cellClass = (c) => {
    const classes = [];
    if (c.numeric || c.align === "right") classes.push("table__num");
    if (c.fixed === "left") {
      classes.push("table__cell--fixed-left");
      if (c.key === lastLeftKey && ping.left) classes.push("table__cell--fixed-shadow");
    }
    if (c.fixed === "right") {
      classes.push("table__cell--fixed-right");
      if (c.key === firstRightKey && ping.right) classes.push("table__cell--fixed-shadow");
    }
    return classes.length ? classes.join(" ") : undefined;
  };

  return (
    <div
      className={"table-wrap " + className}
      ref={wrapRef}
      onScroll={handleScroll}
      style={scrollY ? { maxHeight: scrollY, overflowY: "auto" } : undefined}
    >
      <table
        className={"table" + (zebra ? " table--zebra" : "")}
        style={scrollX ? { minWidth: scrollX } : undefined}
      >
        <thead>
          <tr ref={headRowRef}>
            {columns.map((c) => {
              const isSorted = c.sortable && activeSort?.key === c.key;
              const direction = isSorted ? activeSort.direction : undefined;
              const tt = headerTooltip(c);
              return (
                <th
                  key={c.key}
                  className={cellClass(c)}
                  style={cellStyle(c)}
                  aria-sort={c.sortable ? (direction === "asc" ? "ascending" : direction === "desc" ? "descending" : "none") : undefined}
                >
                  <span className="table__th-inner">
                    {tt && (
                      <Tooltip title={tt.title} content={tt.content} side="top">
                        <button
                          type="button"
                          className="material-symbols-rounded table__th-info"
                          aria-label={
                            (tt.title ? tt.title + ". " : "") + "More information"
                          }
                        >
                          info
                        </button>
                      </Tooltip>
                    )}
                    {c.sortable ? (
                      <button type="button" className="table__sort-btn" onClick={() => toggleSort(c)}>
                        <span>{c.header}</span>
                        <span className={"material-symbols-rounded table__sort-icon" + (isSorted ? " is-active" : "")} aria-hidden="true">
                          {direction === "asc" ? "arrow_upward" : direction === "desc" ? "arrow_downward" : "unfold_more"}
                        </span>
                      </button>
                    ) : (
                      c.header
                    )}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td className="table__empty" colSpan={columns.length}>{empty}</td>
            </tr>
          )}
          {rows.map((row, i) => (
            <tr key={row[rowKey] ?? i}>
              {columns.map((c) => (
                <td key={c.key} className={cellClass(c)} style={cellStyle(c)}>
                  {cellContent(c, row)}
                </td>
              ))}
            </tr>
          ))}
          {infinite && rows.length > 0 && (
            <tr ref={sentinelRef} aria-hidden={!loading}>
              <td className="table__status" colSpan={columns.length}>
                {loading ? (
                  <span className="table__loading">
                    <span className="table__spinner" aria-hidden="true" />
                    {loadingLabel}
                  </span>
                ) : !hasMore && endLabel ? (
                  endLabel
                ) : null}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
