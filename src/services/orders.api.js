import { mockDelay } from "./mockDelay";

/** Mirrors POST /orders — client builds payload; server would persist */
export async function apiCreateOrder(payload) {
  await mockDelay(600);
  return {
    ok: true,
    data: {
      orderId: payload.orderId,
      status: "confirmed",
    },
  };
}

/** Mirrors GET /orders/:id */
export async function apiGetOrder(orderId) {
  await mockDelay(250);
  return { ok: true, data: { orderId, status: "out_for_delivery" } };
}
