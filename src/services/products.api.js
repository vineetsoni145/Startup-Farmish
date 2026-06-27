import { listProducts, getProductById } from "../data/catalog";
import { mockDelay } from "./mockDelay";

/** Mirrors GET /products */
export async function fetchProducts(params) {
  await mockDelay(280);
  return { ok: true, data: listProducts(params) };
}

/** Mirrors GET /products/:id */
export async function fetchProductById(id) {
  await mockDelay(200);
  const product = getProductById(id);
  if (!product) return { ok: false, error: "NOT_FOUND" };
  return { ok: true, data: product };
}
