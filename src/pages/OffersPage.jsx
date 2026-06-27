import React from "react";
import { Link } from "react-router-dom";

const DEALS = [
  {
    title: "Winter vegetables · up to 30% off",
    text: "Seasonal picks from partner farms.",
    to: "/shop?category=vegetables",
    badge: "30%",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
    theme: "offer-card--veg",
  },
  {
    title: "Fruits basket",
    text: "Apples, bananas & more.",
    to: "/shop?category=fruits",
    badge: "Deal",
    image:
      "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
    theme: "offer-card--fruit",
  },
  {
    title: "Kitchen staples",
    text: "Rice, dal, grains.",
    to: "/shop?category=grains",
    badge: "Save",
    image:
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
    theme: "offer-card--grain",
  },
];

function OffersPage() {
  return (
    <main className="page page-pad page-offers">
      <h1 className="page-title">Offers</h1>
      <p className="page-subtitle">
        Promotions page — wire to CMS or <code>/promotions</code> API when live.
      </p>
      <div className="offers-hero card-panel">
        <h2 className="offers-hero__title">Farmish member deals</h2>
        <p className="page-muted">
          Prototype banners; each card opens a filtered shop view.
        </p>
      </div>
      <div className="offers-grid">
        {DEALS.map((d) => (
          <Link
            key={d.title}
            to={d.to}
            className={`offer-card card-panel ${d.theme}`}
          >
            <div
              className="offer-card__media"
              style={{ backgroundImage: `url(${d.image})` }}
            />
            <div className="offer-card__body">
              <span className="offer-card__badge">{d.badge}</span>
              <h3 className="offer-card__title">{d.title}</h3>
              <p className="page-muted small">{d.text}</p>
              <span className="inline-link">Shop now →</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

export default OffersPage;
