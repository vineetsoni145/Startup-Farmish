import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppState } from "../context/AppStateContext";
import QuantityControl from "./QuantityControl";

function StarRow({ full, empty, prefix }) {
  return (
    <>
      {Array.from({ length: full }, (_, i) => (
        <i key={`${prefix}-f${i}`} className="fas fa-star" aria-hidden />
      ))}
      {Array.from({ length: empty }, (_, i) => (
        <i key={`${prefix}-e${i}`} className="far fa-star" aria-hidden />
      ))}
    </>
  );
}

function ProductCard({ product, compact = false, showRating = false }) {
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist } = useAppState();
  const [qty, setQty] = useState(1);
  const inWishlist = isInWishlist(product.id);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, qty);
  };

  const buyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, qty);
    navigate("/cart");
  };

  return (
    <article
      className={`product-card${compact ? " product-card--compact" : ""}`}
    >
      <Link
        to={`/product/${product.id}`}
        className="product-image"
        aria-label={`View ${product.name}`}
      >
        <img src={product.img} alt={product.name} loading="lazy" />
      </Link>
      <div className="product-info">
        <Link to={`/product/${product.id}`} className="product-name-link">
          <div className="product-name">{product.name}</div>
        </Link>
        <div className="product-price">{product.priceDisplay}</div>
        {showRating ? (
          <div className="product-rating">
            <StarRow
              full={product.full}
              empty={product.empty}
              prefix={product.id}
            />
            <span className="rating-text">{product.ratingText}</span>
          </div>
        ) : null}
        <div className="product-card__qty">
          <QuantityControl
            value={qty}
            onChange={setQty}
            compact
            label={`Quantity for ${product.name}`}
            id={`card-qty-${product.id}`}
          />
        </div>
        <div className="product-buttons">
          <button
            type="button"
            className={`btn btn-wishlist btn--card ${inWishlist ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product);
            }}
            aria-pressed={inWishlist}
            title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <i className={inWishlist ? "fas fa-heart" : "far fa-heart"} />
          </button>
          <button
            type="button"
            className="btn btn-buy-now btn--card"
            onClick={buyNow}
          >
            Buy now
          </button>
          <button
            type="button"
            className="btn btn-add-cart btn--card"
            onClick={handleAdd}
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
