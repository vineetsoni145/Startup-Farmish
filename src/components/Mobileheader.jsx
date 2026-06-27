import React from "react";
import { Link } from "react-router-dom";
import Wordmark from "./Wordmark";
import { useAppState } from "../context/AppStateContext";

function Mobileheader() {
  const { wishlist } = useAppState();
  return (
    <div className="mobile-header mobile-header--blinkit">
      <Link to="/" className="mobile-logo-wordmark" aria-label="Farmish home">
        <Wordmark variant="mobile" />
      </Link>
      <div className="mobile-search">
        <i className="fas fa-search" aria-hidden />
        <input type="text" placeholder="Search for products..." />
      </div>
      <div className="mobile-actions">
        <Link to="/wishlist" className="mobile-action" aria-label="Wishlist">
          <span className="mobile-action-badge-wrap">
            <i className="fas fa-heart" aria-hidden />
            {wishlist.length > 0 ? (
              <span className="mobile-action-badge">
                {wishlist.length > 9 ? "9+" : wishlist.length}
              </span>
            ) : null}
          </span>
        </Link>
        <Link to="/account" className="mobile-action" aria-label="Account">
          <i className="fas fa-user" aria-hidden />
        </Link>
      </div>
    </div>
  );
}

export default Mobileheader;
