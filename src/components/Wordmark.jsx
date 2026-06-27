import React from "react";
import { BRAND_WORD } from "../constants/brand";

/**
 * @param {"nav" | "mobile" | "drawer"} variant
 */
function Wordmark({ variant = "nav", className = "" }) {
  const rootClass = `wordmark wordmark--${variant}${className ? ` ${className}` : ""}`;
  return (
    <span className={rootClass}>
      <span className="wordmark__base">{BRAND_WORD.base}</span>
      <span className="wordmark__accent">{BRAND_WORD.accent}</span>
    </span>
  );
}

export default Wordmark;
