import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Wordmark from "./Wordmark";
import { useAppState } from "../context/AppStateContext";

function Navbar({ onMenuClick }) {
  const { user, cartCount, wishlist } = useAppState();
  const navigate = useNavigate();
  const [searchQ, setSearchQ] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const submitSearch = (e) => {
    e.preventDefault();
    const q = searchQ.trim();
    navigate(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  };

  return (
    <nav
      className="navbar navbar--blinkit"
      style={scrolled ? { boxShadow: "0 6px 32px rgba(7,15,11,0.32)" } : {}}
    >
      {/* Ornamental top border */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)",
          pointerEvents: "none",
        }}
      />

      <div className="nav-container">
        <i
          className="fas fa-bars nav-icon menu-toggle"
          onClick={onMenuClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onMenuClick()}
          aria-label="Open menu"
        />

        <Link to="/" className="logo logo-wordmark" aria-label="Farmish home">
          <Wordmark variant="nav" />
        </Link>

        {/* Ornamental separator */}
        <div
          style={{
            width: "1px",
            height: "22px",
            background: "rgba(201,168,76,0.25)",
            flexShrink: 0,
            display: "var(--sep-display, flex)",
          }}
          className="nav-sep"
        />

        <ul className="nav-links">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shop"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/categories"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Categories
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/offers"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Offers
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Contact
            </NavLink>
          </li>
        </ul>

        <div className="nav-right">
          <form className="nav-search-form" onSubmit={submitSearch}>
            <input
              type="search"
              className="search-bar"
              placeholder="Search the harvest…"
              aria-label="Search products"
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
            />
          </form>

          <Link to="/wishlist" className="nav-icon-link" title="Wishlist">
            <span className="nav-cart-wrap">
              <i className="fas fa-heart nav-icon" />
              {wishlist.length > 0 ? (
                <span className="nav-cart-badge nav-wishlist-badge">
                  {wishlist.length > 99 ? "99+" : wishlist.length}
                </span>
              ) : null}
            </span>
          </Link>

          <Link
            to={user ? "/account" : "/login"}
            className="nav-icon-link"
            title={user ? "Account" : "Sign in"}
          >
            <i className="fas fa-user nav-icon" />
          </Link>

          <Link to="/cart" className="nav-icon-link nav-cart-link" title="Cart">
            <span className="nav-cart-wrap">
              <i className="fas fa-shopping-basket nav-icon" />
              {cartCount > 0 ? (
                <span className="nav-cart-badge">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              ) : null}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
