import React from "react";
import { Link, useParams } from "react-router-dom";
import { useAppState } from "../context/AppStateContext";
import { formatINR } from "../utils/money";
import { usePageMetadata } from "../hooks/usePageMetadata";

const STEPS = [
  { key: "placed", label: "Order placed", icon: "fa-clipboard-check" },
  { key: "paid", label: "Payment confirmed", icon: "fa-credit-card" },
  { key: "packed", label: "Packed at store", icon: "fa-box" },
  { key: "out", label: "Out for delivery", icon: "fa-truck" },
  { key: "delivered", label: "Delivered", icon: "fa-home" },
];

function stepIndex(order) {
  if (order.status === "delivered") return 4;
  if (order.status === "out_for_delivery") return 3;
  if (order.status === "packed") return 2;
  if (order.paymentStatus === "captured") return 1;
  return 0;
}

function methodLabel(id) {
  const labels = {
    upi: "UPI",
    card: "Card",
    netbanking: "Net banking",
    wallet: "Wallet",
    cod: "Cash on delivery",
  };
  return labels[id] || id || "—";
}

function OrderTracking() {
  const { orderId } = useParams();
  const { getOrder } = useAppState();
  const order = getOrder(orderId);

  usePageMetadata(
    order ? `Track order ${order.id}` : "Track order",
    order
      ? `Track your Farmish order ${order.id} and view the latest delivery status.`
      : "Track your Farmish order.",
  );

  if (!order) {
    return (
      <main className="page page-pad">
        <h1 className="page-title">Track order</h1>
        <p>We could not find this order.</p>
        <Link to="/account">My orders</Link>
      </main>
    );
  }

  const paid = order.paymentStatus === "captured";
  const active = stepIndex(order);
  const eta = paid ? "25–40 mins" : "Awaiting payment";

  return (
    <main className="page page-pad page-tracking">
      <h1 className="page-title">Track order</h1>
      <p className="page-subtitle">
        Live status for your delivery — demo timeline (maps API later).
      </p>

      <div className="tracking-layout">
        <div className="card-panel tracking-main">
          <p className="tracking-id">
            <span className="page-muted">Order ID</span>
            <strong>{order.id}</strong>
          </p>
          <div className={`status-pill${paid ? " status-pill--ok" : ""}`}>
            {paid ? `On the way · ETA ${eta}` : "Payment pending"}
          </div>
          <p className="page-muted small">
            Placed {new Date(order.createdAt).toLocaleString()}
            {order.paymentMethodLabel
              ? ` · Paid via ${order.paymentMethodLabel}`
              : order.paymentMethod
                ? ` · Paid via ${methodLabel(order.paymentMethod)}`
                : null}
          </p>

          <ol className="tracking-timeline" aria-label="Delivery progress">
            {STEPS.map((step, i) => {
              const done = i <= active;
              const current = i === active;
              return (
                <li
                  key={step.key}
                  className={`tracking-step${done ? " tracking-step--done" : ""}${current ? " tracking-step--current" : ""}`}
                >
                  <span className="tracking-step__dot" aria-hidden>
                    <i className={`fas ${step.icon}`} />
                  </span>
                  <span className="tracking-step__label">{step.label}</span>
                </li>
              );
            })}
          </ol>

          <p className="page-muted small tracking-address">
            Delivering to <strong>{order.address?.name}</strong>,{" "}
            {order.address?.line1}, {order.address?.city} — {order.address?.pin}
          </p>
          <p className="page-muted small">Phone: {order.address?.phone}</p>
        </div>

        <aside className="card-panel tracking-side">
          <h2 className="panel-title">Items</h2>
          <ul className="tracking-lines">
            {order.lines.map((line) => (
              <li key={line.productId}>
                {line.name} × {line.qty} —{" "}
                {formatINR(line.priceRupees * line.qty)}
              </li>
            ))}
          </ul>
          {order.discountRupees > 0 ? (
            <div className="summary-row">
              <span>Discount</span>
              <span>-{formatINR(order.discountRupees)}</span>
            </div>
          ) : null}
          <div className="summary-row summary-row--total">
            <span>Total</span>
            <span>{formatINR(order.totalRupees)}</span>
          </div>
          {order.couponCode ? (
            <p className="page-muted small">
              Coupon <strong>{order.couponCode}</strong> applied.
            </p>
          ) : null}
          {!paid ? (
            <Link
              to={`/payment/${order.id}`}
              className="btn btn-buy-now tracking-pay-link"
            >
              Complete payment
            </Link>
          ) : null}
          <Link to="/shop" className="inline-link tracking-shop-link">
            Continue shopping
          </Link>
        </aside>
      </div>
    </main>
  );
}

export default OrderTracking;
