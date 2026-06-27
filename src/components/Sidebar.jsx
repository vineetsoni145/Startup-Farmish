import React, { useState } from "react";
import { Link } from "react-router-dom";
import Wordmark from "./Wordmark";
import { useAppState } from "../context/AppStateContext";

function Sidebar({ open, onClose }) {
  const { user, logout } = useAppState();
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <>
      <div
        className={`sidebar-overlay${open ? " open" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`sidebar${open ? " open" : ""}`}
        id="mobileSidebar"
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        aria-label="Navigation menu"
      >
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <Wordmark variant="drawer" />
            <span className="sidebar-brand__label">Menu</span>
          </div>
          <i
            className="fas fa-times sidebar-close"
            onClick={onClose}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onClose()}
            aria-label="Close menu"
          />
        </div>
        <nav className="sidebar-nav">
          <Link to="/" onClick={onClose}>
            Home
          </Link>
          <Link to="/shop" onClick={onClose}>
            Shop
          </Link>
          <Link to="/categories" onClick={onClose}>
            Categories
          </Link>
          <Link to="/search" onClick={onClose}>
            Search
          </Link>
          <Link to="/cart" onClick={onClose}>
            Cart
          </Link>
          <Link to="/wishlist" onClick={onClose}>
            Wishlist
          </Link>
          <Link to={user ? "/account" : "/login"} onClick={onClose}>
            {user ? "My account" : "Log in"}
          </Link>

          <button
            type="button"
            className="sidebar-more-toggle"
            onClick={() => setMoreOpen((s) => !s)}
            aria-expanded={moreOpen}
          >
            More
            <i
              className={`fas ${moreOpen ? "fa-chevron-up" : "fa-chevron-down"}`}
              style={{ marginLeft: 8 }}
            />
          </button>

          {moreOpen ? (
            <div className="sidebar-more">
              <Link to="/offers" onClick={onClose}>
                Offers
              </Link>
              <Link to="/orders" onClick={onClose}>
                My orders
              </Link>
              <Link to="/help" onClick={onClose}>
                Help
              </Link>
              <Link to="/contact" onClick={onClose}>
                Contact
              </Link>
              {user?.role === "admin" ? (
                <Link to="/admin" onClick={onClose}>
                  Admin
                </Link>
              ) : null}
            </div>
          ) : null}
          {user ? (
            <button
              type="button"
              className="sidebar-logout"
              onClick={() => {
                logout();
                onClose();
              }}
            >
              Log out
            </button>
          ) : null}
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
