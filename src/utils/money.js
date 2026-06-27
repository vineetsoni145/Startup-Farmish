export function formatINR(amount) {
  if (typeof amount !== "number" || Number.isNaN(amount)) return "₹0";
  return `₹${Math.round(amount).toLocaleString("en-IN")}`;
}
