import React from "react";
import { Link } from "react-router-dom";
import { useAppState } from "../context/AppStateContext";

function CartToast() {
  const { cartNotice, dismissCartNotice } = useAppState();

  if (!cartNotice) return null;

  return (
    <div className="cart-toast" role="status" aria-live="polite">
      <span>
        <strong>{cartNotice.name}</strong> added to cart
      </span>
      <Link to="/cart" className="cart-toast__link" onClick={dismissCartNotice}>
        View cart
      </Link>
      <button
        type="button"
        className="cart-toast__close"
        onClick={dismissCartNotice}
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
}

export default CartToast;
