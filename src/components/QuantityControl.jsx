import React, { useEffect, useState } from "react";

const MAX_QTY = 99;
const MIN_QTY = 1;

function clampQty(n, min, max) {
  return Math.max(min, Math.min(max, Number(n) || min));
}

function QuantityControl({
  value,
  onChange,
  min = MIN_QTY,
  max = MAX_QTY,
  compact = false,
  label = "Quantity",
  id,
}) {
  const [draft, setDraft] = useState(String(value));

  useEffect(() => {
    setDraft(String(value));
  }, [value]);

  const commit = (raw) => {
    const next = clampQty(raw === "" ? min : raw, min, max);
    onChange(next);
  };

  const inputId = id || `qty-${label.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div
      className={`qty-control${compact ? " qty-control--compact" : ""}`}
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        className="qty-btn"
        onClick={() => commit(value - 1)}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <input
        id={inputId}
        type="number"
        className="qty-input"
        min={min}
        max={max}
        inputMode="numeric"
        aria-label={label}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={() => commit(draft)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.currentTarget.blur();
          }
        }}
      />
      <button
        type="button"
        className="qty-btn"
        onClick={() => commit(value + 1)}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}

export default QuantityControl;
