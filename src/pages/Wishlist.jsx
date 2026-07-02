import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppState } from "../context/AppStateContext";
import { usePageMetadata } from "../hooks/usePageMetadata";
import BackButton from "../components/BackButton";

function Wishlist() {
  usePageMetadata(
    "Wishlist",
    "View saved favorite products and move items to cart for checkout.",
  );
  const { wishlist, removeFromWishlist, addToCart } = useAppState();
  const navigate = useNavigate();

  const moveToCart = (product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
    navigate("/cart");
  };

  if (!wishlist || wishlist.length === 0) {
    return (
      <main className="page page-pad page-wishlist-empty">
        <BackButton />
        <div className="wishlist-empty-content">
          <div className="wishlist-empty-icon">♥</div>
          <h1>Your wishlist is empty</h1>
          <p>
            Save items to your wishlist to revisit them later. Browse the shop
            to add favorites.
          </p>
          <Link to="/shop" className="btn btn-buy-now">
            Go to shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page page-pad page-wishlist">
      <BackButton />
      <h1 className="page-title">Wishlist</h1>
      <p className="wishlist-count">
        <strong>{wishlist.length}</strong>{" "}
        {wishlist.length === 1 ? "item" : "items"} saved
      </p>
      <div className="wishlist-grid">
        {wishlist.map((p) => (
          <div key={p.id} className="wishlist-item">
            <Link to={`/product/${p.id}`} className="wishlist-media">
              <img src={p.img} alt={p.name} loading="lazy" />
            </Link>
            <div className="wishlist-body">
              <Link to={`/product/${p.id}`} className="wishlist-title">
                {p.name}
              </Link>
              <div className="wishlist-price">{p.priceDisplay}</div>
              <div className="wishlist-actions">
                <button
                  type="button"
                  className="btn btn-add-cart"
                  onClick={() => moveToCart(p)}
                >
                  Move to cart
                </button>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => removeFromWishlist(p.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Wishlist;
