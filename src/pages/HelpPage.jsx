import React from "react";
import { Link } from "react-router-dom";
import StaticPage from "../components/StaticPage";

function HelpPage() {
  return (
    <StaticPage
      title="Help center"
      intro="Common questions — expand into a full FAQ module later."
    >
      <ul className="faq-list">
        <li className="card-panel faq-item">
          <strong>Where is my order?</strong>
          <p className="page-muted small">
            Open{" "}
            <Link to="/orders" className="inline-link">
              My orders
            </Link>{" "}
            after logging in, then tap any order for live-style tracking.
          </p>
        </li>
        <li className="card-panel faq-item">
          <strong>How do I pay?</strong>
          <p className="page-muted small">
            Checkout uses a mock payment step today; production will use Razorpay,
            Stripe, or your PSP with webhooks.
          </p>
        </li>
        <li className="card-panel faq-item">
          <strong>Delivery areas</strong>
          <p className="page-muted small">
            See <Link to="/shipping" className="inline-link">Shipping info</Link>{" "}
            for SLA and coverage (placeholder copy).
          </p>
        </li>
      </ul>
    </StaticPage>
  );
}

export default HelpPage;
