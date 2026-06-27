import React from "react";
import StaticPage from "../components/StaticPage";

function TermsPage() {
  return (
    <StaticPage title="Terms of service" intro="Draft placeholder — not legal advice.">
      <p>
        By using this prototype you agree it is for demonstration purposes. No real
        goods are sold through this build.
      </p>
      <p>
        Commercial terms will cover orders, pricing, delivery, and liability once
        you launch.
      </p>
    </StaticPage>
  );
}

export default TermsPage;
