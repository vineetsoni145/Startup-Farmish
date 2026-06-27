import React from "react";
import { Link } from "react-router-dom";

const LINKS = [
  {
    to: "/shop",
    icon: "fa-store",
    title: "Shop All",
    text: "Full grocery catalog",
  },
  {
    to: "/categories",
    icon: "fa-border-all",
    title: "Categories",
    text: "Browse by aisle",
  },
  {
    to: "/offers",
    icon: "fa-tag",
    title: "Special Offers",
    text: "Exclusive deals & savings",
  },
  {
    to: "/search",
    icon: "fa-magnifying-glass",
    title: "Discover",
    text: "Find any product",
  },
];

function HomeQuickLinks() {
  return (
    <section className="home-quick-links">
      <div className="home-quick-links__inner">
        <h2 className="home-quick-links__heading">What do you seek today?</h2>
        <div className="home-quick-links__grid">
          {LINKS.map((item) => (
            <Link key={item.to} to={item.to} className="home-quick-card">
              <span className="home-quick-card__icon">
                <i className={`fas ${item.icon}`} aria-hidden />
              </span>
              <span className="home-quick-card__title">{item.title}</span>
              <span className="home-quick-card__text">{item.text}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeQuickLinks;
