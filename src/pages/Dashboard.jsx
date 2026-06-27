import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useAppState } from "../context/AppStateContext";

function Dashboard() {
  const { user, orders, logout, removeAddress } = useAppState();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: "/account" }} />;
  }

  const hasAddresses =
    Array.isArray(user.savedAddresses) && user.savedAddresses.length > 0;

  return (
    <main className="page page-pad page-dashboard">
      <div className="dashboard-head">
        <div>
          <h1 className="page-title">My account</h1>
          <p className="page-muted">
            {user.role !== "admin" ? (
              <>
                {user.name} · {user.email}
              </>
            ) : null}
            {user.role === "admin" && user.adminVerified ? (
              <>
                {" "}
                ·{" "}
                <Link to="/admin" className="inline-link">
                  Admin console
                </Link>
              </>
            ) : null}
          </p>
        </div>
        <button type="button" className="btn btn-add-cart" onClick={logout}>
          Log out
        </button>
      </div>

      <p className="page-subtitle">
        Each section opens its own page — same pattern as Blinkit-style apps.
      </p>

      {hasAddresses ? (
        <section className="account-section card-panel">
          <h2 className="panel-title">Saved addresses</h2>
          <ul className="address-list">
            {user.savedAddresses.map((address) => (
              <li key={address.id} className="address-card">
                <div>
                  <strong>{address.name}</strong>
                  <p>{address.line1}</p>
                  <p>
                    {address.city} · {address.pin}
                  </p>
                  <p>{address.phone}</p>
                </div>
                <button
                  type="button"
                  className="link-remove"
                  onClick={() => removeAddress(address.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="account-tiles">
        <Link to="/orders" className="account-tile card-panel">
          <i className="fas fa-receipt" aria-hidden />
          <span className="account-tile__title">My orders</span>
          <span className="page-muted small">
            {orders.length} saved {orders.length === 1 ? "order" : "orders"}
          </span>
        </Link>
        <Link to="/shop" className="account-tile card-panel">
          <i className="fas fa-shopping-basket" aria-hidden />
          <span className="account-tile__title">Shop again</span>
          <span className="page-muted small">Browse catalog</span>
        </Link>
        <Link to="/help" className="account-tile card-panel">
          <i className="fas fa-question-circle" aria-hidden />
          <span className="account-tile__title">Help center</span>
          <span className="page-muted small">FAQs &amp; support</span>
        </Link>
        <Link to="/contact" className="account-tile card-panel">
          <i className="fas fa-envelope" aria-hidden />
          <span className="account-tile__title">Contact us</span>
          <span className="page-muted small">Reach the team</span>
        </Link>
      </div>
    </main>
  );
}

export default Dashboard;
