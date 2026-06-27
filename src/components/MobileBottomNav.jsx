import React from "react";
import { Link, useLocation } from "react-router-dom";

function MobileBottomNav({ cartCount = 0 }) {
  const { pathname } = useLocation();
  const homeActive = pathname === "/";
  const categoriesActive = pathname === "/categories";
  const searchActive = pathname === "/search";
  const cartActive = pathname === "/cart";
  const profileActive =
    pathname === "/account" || pathname === "/orders" || pathname.startsWith("/orders/");

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
      <Link to="/" className={`nav-item${homeActive ? " active" : ""}`}>
        <i className="fas fa-home" />
        <span>Home</span>
      </Link>
      <Link
        to="/categories"
        className={`nav-item${categoriesActive ? " active" : ""}`}
      >
        <i className="fas fa-th-large" />
        <span>Categories</span>
      </Link>
      <Link to="/search" className={`nav-item${searchActive ? " active" : ""}`}>
        <i className="fas fa-search" />
        <span>Search</span>
      </Link>
      <Link to="/cart" className={`nav-item${cartActive ? " active" : ""}`}>
        <div style={{ position: "relative" }}>
          <i className="fas fa-shopping-cart" />
          {cartCount > 0 ? (
            <div className="cart-badge">
              {cartCount > 99 ? "99+" : cartCount}
            </div>
          ) : null}
        </div>
        <span>Cart</span>
      </Link>
      <Link
        to="/account"
        className={`nav-item${profileActive ? " active" : ""}`}
      >
        <i className="fas fa-user" />
        <span>Profile</span>
      </Link>
    </nav>
  );
}

export default MobileBottomNav;
