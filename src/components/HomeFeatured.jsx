import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { PRODUCTS } from "../data/catalog";

const FEATURED_IDS = ["carrots", "tomatoes", "apples", "dal"];

function HomeFeatured() {
  const items = PRODUCTS.filter((p) => FEATURED_IDS.includes(p.id));

  return (
    <section className="home-featured">
      <div className="categories-container">
        <div className="home-featured__head">
          <div>
            <span style={{
              display: "block",
              fontFamily: "var(--font-utility)",
              fontSize: "0.62rem",
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--royal-gold)",
              marginBottom: "0.25rem",
            }}>Handpicked Selection</span>
            <h2 className="categories-title home-featured__title">Featured Picks</h2>
          </div>
          <Link to="/shop" className="inline-link home-featured__see-all">
            View All Products →
          </Link>
        </div>
        <div className="products-grid home-featured__grid">
          {items.map((item) => (
            <ProductCard key={item.id} product={item} compact />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeFeatured;
