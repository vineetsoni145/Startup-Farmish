import React from "react";
import StaticPage from "../components/StaticPage";

function AboutPage() {
  return (
    <StaticPage
      title="About Farmish"
      intro="Farmish is a prototype quick-commerce storefront for fresh produce — built to demo the full customer journey to investors."
    >
      <p>
        We partner with local farms to deliver vegetables, fruits, grains, and
        pulses in hours, not days. This website mirrors a production stack: separate
        pages for shop, categories, search, checkout, payments, and order tracking.
      </p>
      <p>
        The live product will connect these screens to your backend APIs (auth,
        catalog, cart, orders, payments) as described in your architecture
        document.
      </p>
    </StaticPage>
  );
}

export default AboutPage;
