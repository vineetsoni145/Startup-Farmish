import React from "react";
import { Link } from "react-router-dom";
import { useAppState } from "../context/AppStateContext";

function Footer() {
  const { user } = useAppState();

  return (
    <footer className="footer">
      {/* Gold ornament bar */}
      <div
        style={{
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)",
        }}
      />

      <div className="footer-container">
        {/* Brand block */}
        <div
          style={{
            textAlign: "center",
            padding: "2.5rem 0 1.5rem",
            borderBottom: "1px solid rgba(201,168,76,0.12)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.6rem",
              fontStyle: "italic",
              fontWeight: 700,
              color: "var(--royal-gold-bright)",
              letterSpacing: "0.06em",
              marginBottom: "0.4rem",
            }}
          >
            Farmish
          </div>
          <p
            style={{
              fontFamily: "var(--font-utility)",
              fontSize: "0.68rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(201,168,76,0.5)",
            }}
          >
            Farm-Fresh · Est. 2024 · India's Fresh Grocery
          </p>
        </div>

        <div className="footer-content">
          <div className="footer-section">
            <h3>Quick Links</h3>
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/categories">Categories</Link>
            <Link to="/offers">Offers</Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            {user && user.role === "admin" && user.adminVerified ? (
              <>
                <Link to="/admin">Admin console</Link>
                <p className="footer-note">
                  Reserved for developers and inventory handlers.
                </p>
              </>
            ) : null}
          </div>

          <div className="footer-section">
            <h3>Collections</h3>
            <Link to="/shop?category=vegetables">Vegetables</Link>
            <Link to="/shop?category=fruits">Fruits</Link>
            <Link to="/shop?category=grains">Grains & Cereals</Link>
            <Link to="/shop?category=pulses">Pulses & Legumes</Link>
          </div>

          <div className="footer-section">
            <h3>Customer Care</h3>
            <Link to="/help">Help Centre</Link>
            <Link to="/orders">Track Your Order</Link>
            <Link to="/returns">Returns & Refunds</Link>
            <Link to="/shipping">Delivery Information</Link>
          </div>

          <div className="footer-section">
            <h3>Policies</h3>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/cookies">Cookie Policy</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.8rem",
              marginBottom: "0.6rem",
            }}
          >
            <span
              style={{
                color: "rgba(201,168,76,0.3)",
                fontSize: "0.5rem",
                letterSpacing: "0.3em",
              }}
            >
              — ✦ —
            </span>
          </div>
          <p>
            &copy; {new Date().getFullYear()} Farmish. All rights reserved.
            &nbsp;|&nbsp; Made with care for discerning households.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
