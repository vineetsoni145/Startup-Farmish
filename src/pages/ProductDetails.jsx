import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchProductById } from "../services/products.api";
import { useAppState } from "../context/AppStateContext";
import QuantityControl from "../components/QuantityControl";
import { formatINR } from "../utils/money";
import { usePageMetadata } from "../hooks/usePageMetadata";

function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    addProductReview,
    getReviews,
    getReviewStats,
    applyCartCoupon,
    cartCoupon,
  } = useAppState();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [reviewerName, setReviewerName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewMessage, setReviewMessage] = useState("");
  const [voucherCode, setVoucherCode] = useState("");
  const [voucherDiscount, setVoucherDiscount] = useState(0);
  const [voucherStatus, setVoucherStatus] = useState(null);
  const [voucherMessage, setVoucherMessage] = useState("");

  usePageMetadata(
    product ? product.name : "Product details",
    product?.description ||
      "Detailed view of farm products, reviews and fresh produce options.",
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const res = await fetchProductById(productId);
      if (cancelled) return;
      if (!res.ok) {
        setProduct(null);
      } else {
        setProduct(res.data);
        setQty(1);
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [productId]);

  const validCodes = {
    FARM10: { label: "10% off your order", discount: 0.1 },
    GROW15: { label: "15% off fresh produce", discount: 0.15 },
    VEG20: { label: "20% off vegetables", discount: 0.2 },
  };

  useEffect(() => {
    if (cartCoupon) {
      setVoucherCode(cartCoupon.code);
      setVoucherDiscount(cartCoupon.discount);
      setVoucherStatus("success");
      setVoucherMessage(
        `Applied ${validCodes[cartCoupon.code]?.label || cartCoupon.code}!`,
      );
    }
  }, [cartCoupon]);

  if (loading) {
    return (
      <main className="page page-pad">
        <p className="page-muted">Loading…</p>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="page page-pad">
        <p>Product not found.</p>
        <Link to="/shop">Back to shop</Link>
      </main>
    );
  }

  const buyNow = () => {
    addToCart(product, qty);
    navigate("/cart");
  };

  const inWishlist = isInWishlist(product.id);
  const reviews = getReviews(product.id);
  const reviewStats = getReviewStats(product.id);
  const averageRating =
    reviewStats.count > 0
      ? reviewStats.score
      : Number(product.ratingText?.replace(/[()]/g, "")) || 0;
  const ratingLabel =
    reviewStats.count > 0
      ? `${reviewStats.count} review${reviewStats.count === 1 ? "" : "s"}`
      : product.ratingText;

  const renderStars = (score) =>
    Array.from({ length: 5 }, (_, index) => (
      <i
        key={index}
        className={`fa${index < Math.round(score) ? "s" : "r"} fa-star`}
      />
    ));

  const submitReview = (event) => {
    event.preventDefault();
    addProductReview(product.id, {
      name: reviewerName.trim() || "Anonymous",
      rating: reviewRating,
      message: reviewMessage.trim(),
    });
    setReviewerName("");
    setReviewRating(5);
    setReviewMessage("");
  };

  const applyVoucher = (event) => {
    event.preventDefault();
    const code = voucherCode.trim().toUpperCase();
    if (!code) {
      setVoucherStatus("error");
      setVoucherMessage("Enter a coupon or voucher code to apply.");
      setVoucherDiscount(0);
      return;
    }
    const rule = validCodes[code];
    if (!rule) {
      setVoucherStatus("error");
      setVoucherMessage("This code is not valid. Try FARM10 or GROW15.");
      setVoucherDiscount(0);
      return;
    }
    const res = applyCartCoupon(code);
    if (!res.ok) {
      setVoucherStatus("error");
      setVoucherMessage(res.error);
      setVoucherDiscount(0);
      return;
    }
    setVoucherStatus("success");
    setVoucherMessage(`Applied ${rule.label}!`);
    setVoucherDiscount(res.discount);
  };

  return (
    <main className="page page-pad product-detail-page">
      <button type="button" className="link-back" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <div className="product-detail-wrap">
        <div className="product-detail-image">
          <img src={product.img} alt={product.name} />
        </div>
        <div>
          <h1 className="product-detail-name">{product.name}</h1>
          <p className="product-detail-price">
            {voucherDiscount > 0 ? (
              <>
                <span className="price-original">{product.priceDisplay}</span>
                <span className="price-discounted">
                  {formatINR(
                    Math.round(product.priceRupees * (1 - voucherDiscount)),
                  )}
                  /{product.unitLabel}
                </span>
              </>
            ) : (
              product.priceDisplay
            )}
          </p>
          <p className="product-detail-desc">{product.description}</p>
          <div className="qty-row">
            <span className="qty-row__label" id="product-qty-label">
              Quantity
            </span>
            <QuantityControl
              value={qty}
              onChange={setQty}
              label="Product quantity"
              id="product-qty"
            />
          </div>
          {voucherDiscount > 0 ? (
            <p className="product-detail-savings">
              {formatINR(product.priceRupees * qty)} →{" "}
              {formatINR(
                Math.max(
                  0,
                  Math.round(product.priceRupees * qty * (1 - voucherDiscount)),
                ),
              )}{" "}
              <span className="product-detail-savings-note">
                You saved{" "}
                {formatINR(
                  Math.round(product.priceRupees * qty * voucherDiscount),
                )}
              </span>
            </p>
          ) : null}
          <div className="product-detail-actions">
            <button type="button" className="btn btn-buy-now" onClick={buyNow}>
              Buy now
            </button>
            <button
              type="button"
              className="btn btn-add-cart"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product, qty);
              }}
            >
              Add to cart
            </button>
            <button
              type="button"
              className={`btn btn-wishlist ${inWishlist ? "active" : ""}`}
              onClick={() => toggleWishlist(product)}
              aria-pressed={inWishlist}
            >
              {inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            </button>
          </div>
          <div className="product-detail-coupon">
            <form className="voucher-form" onSubmit={applyVoucher}>
              <label htmlFor="voucher-code">Add coupon or voucher code</label>
              <div className="voucher-row">
                <input
                  id="voucher-code"
                  type="text"
                  value={voucherCode}
                  onChange={(event) => {
                    setVoucherCode(event.target.value);
                    setVoucherStatus(null);
                    setVoucherMessage("");
                  }}
                  placeholder="Enter code e.g. FARM10"
                />
                <button
                  type="submit"
                  className="btn btn-primary btn-apply-voucher"
                >
                  Apply
                </button>
              </div>
              {voucherMessage ? (
                <p
                  className={`voucher-status voucher-status--${voucherStatus}`}
                >
                  {voucherMessage}
                </p>
              ) : null}
            </form>
          </div>
          <div className="product-detail-reviews">
            <div className="product-detail-review-summary">
              <div className="product-detail-stars">
                {renderStars(averageRating)}
                <span>{averageRating.toFixed(1)} / 5</span>
              </div>
              <p className="product-detail-review-count">{ratingLabel}</p>
            </div>
            <form className="review-form" onSubmit={submitReview}>
              <h2>Write a review</h2>
              <label>
                Your name
                <input
                  type="text"
                  value={reviewerName}
                  onChange={(event) => setReviewerName(event.target.value)}
                  placeholder="Anonymous"
                />
              </label>
              <label>
                Rating
                <select
                  value={reviewRating}
                  onChange={(event) =>
                    setReviewRating(Number(event.target.value))
                  }
                >
                  {[5, 4, 3, 2, 1].map((value) => (
                    <option key={value} value={value}>
                      {value} star{value > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Review
                <textarea
                  value={reviewMessage}
                  onChange={(event) => setReviewMessage(event.target.value)}
                  placeholder="Tell other shoppers what you liked"
                />
              </label>
              <button type="submit" className="btn btn-primary">
                Submit review
              </button>
            </form>
            <section className="review-list">
              <h2>Customer reviews</h2>
              {reviews.length === 0 ? (
                <p className="page-muted">
                  No reviews yet. Be the first to share your experience.
                </p>
              ) : (
                reviews.map((review) => (
                  <article key={review.id} className="review-item">
                    <div className="review-header">
                      <strong>{review.name}</strong>
                      <span>
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="review-stars">
                      {renderStars(review.rating)}
                    </div>
                    <p>{review.message}</p>
                  </article>
                ))
              )}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
