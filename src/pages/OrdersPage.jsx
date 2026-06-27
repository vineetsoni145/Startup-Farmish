import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useAppState } from "../context/AppStateContext";
import { formatINR } from "../utils/money";
import { usePageMetadata } from "../hooks/usePageMetadata";

function OrdersPage() {
  usePageMetadata(
    "Order history",
    "View your previous Farmish purchases and track deliveries.",
  );
  const { user, orders } = useAppState();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: "/orders" }} />;
  }

  return (
    <main className="page page-pad page-orders">
      <h1 className="page-title">My orders</h1>
      <p className="page-subtitle">
        Order history — replace with <code>GET /orders</code> for production.
      </p>
      <p className="page-muted small" style={{ marginBottom: "1rem" }}>
        <Link to="/account" className="inline-link">
          ← Account settings
        </Link>
      </p>
      {orders.length === 0 ? (
        <p className="page-muted">
          No orders yet.{" "}
          <Link to="/shop" className="inline-link">
            Start shopping
          </Link>
        </p>
      ) : (
        <ul className="order-list">
          {orders.map((o) => (
            <li key={o.id} className="order-row card-panel">
              <div>
                <strong>{o.id}</strong>
                <span className="page-muted small">
                  {" "}
                  · {new Date(o.createdAt).toLocaleString()}
                </span>
                {o.couponCode ? (
                  <div className="page-muted xsmall">
                    Coupon: {o.couponCode}
                  </div>
                ) : null}
              </div>
              <div>{formatINR(o.totalRupees)}</div>
              <div className="order-row__status">{o.paymentStatus}</div>
              <div className="order-row__actions">
                <Link to={`/orders/${o.id}`} className="inline-link">
                  Track
                </Link>
                {o.paymentStatus !== "captured" ? (
                  <>
                    {" · "}
                    <Link to={`/payment/${o.id}`} className="inline-link">
                      Pay
                    </Link>
                  </>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default OrdersPage;
