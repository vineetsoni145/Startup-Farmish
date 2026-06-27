import React from "react";
import { Link } from "react-router-dom";
import { PRODUCTS } from "../data/catalog";
import { formatINR } from "../utils/money";

function AdminDashboard() {
  const revenue = PRODUCTS.reduce((s, p) => s + p.priceRupees * 12, 0);

  return (
    <main className="page page-pad admin-page">
      <div className="admin-actions">
        <Link to="/" className="btn btn--secondary">
          Back to home
        </Link>
      </div>
      <h1 className="page-title">Operations overview</h1>
      <p className="page-subtitle">
        Prototype admin — swap this view for real <code>GET /orders</code> &amp;
        analytics later.
      </p>

      <div className="admin-stats">
        <div className="card-panel admin-stat">
          <span className="page-muted">SKUs live</span>
          <strong>{PRODUCTS.length}</strong>
        </div>
        <div className="card-panel admin-stat">
          <span className="page-muted">Mock monthly GMV</span>
          <strong>{formatINR(revenue)}</strong>
        </div>
      </div>

      <h2 className="panel-title">Catalog</h2>
      <div className="table-wrap card-panel">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {PRODUCTS.map((p) => (
              <tr key={p.id}>
                <td>
                  <code>{p.id}</code>
                </td>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>{p.priceDisplay}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default AdminDashboard;
