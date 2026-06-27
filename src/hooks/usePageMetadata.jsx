import { useEffect } from "react";

const DEFAULT_DESCRIPTION =
  "Fresh organic farm produce delivered to your door. Vegetables, fruits, and farm produce with fast delivery.";
const DEFAULT_TITLE_SUFFIX = "Farmish";

function setMetaDescription(content) {
  if (typeof document === "undefined") return;
  let meta = document.querySelector('meta[name="description"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "description";
    document.head.appendChild(meta);
  }
  meta.content = content;
}

export function usePageMetadata(title, description) {
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.title = title
      ? `${title} | ${DEFAULT_TITLE_SUFFIX}`
      : DEFAULT_TITLE_SUFFIX;
    setMetaDescription(description || DEFAULT_DESCRIPTION);
  }, [title, description]);
}
