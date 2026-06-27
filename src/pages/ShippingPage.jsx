import React from "react";
import StaticPage from "../components/StaticPage";

function ShippingPage() {
  return (
    <StaticPage
      title="Shipping & delivery"
      intro="Placeholder policy page — replace with legal/ops copy."
    >
      <p>
        Standard delivery windows are shown at checkout. For this prototype, all
        orders are simulated locally in your browser.
      </p>
      <p>
        Production: integrate rider assignment, ETA, and customer notifications
        from your order service.
      </p>
    </StaticPage>
  );
}

export default ShippingPage;
