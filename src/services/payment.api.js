import { mockDelay } from "./mockDelay";

/**
 * Mirrors POST /payments/initiate (Razorpay/Stripe style).
 * Prototype: always succeeds after delay.
 */
export async function apiInitiatePayment({ orderId, amountRupees }) {
  await mockDelay(800);
  if (!orderId || !amountRupees) {
    return { ok: false, error: "Invalid payment request" };
  }
  return {
    ok: true,
    data: {
      paymentId: `pay_${Date.now()}`,
      orderId,
      amountRupees,
      status: "captured",
      provider: "mock_gateway",
    },
  };
}
