import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppState } from "../context/AppStateContext";
import QuantityControl from "../components/QuantityControl";
import { formatINR } from "../utils/money";
import { usePageMetadata } from "../hooks/usePageMetadata";

function Cart() {
  usePageMetadata(
    "Cart",
    "Review your cart, apply coupons, and continue to checkout for fresh farm delivery.",
  );
  const {
    cart,
    cartSubtotal,
    setLineQty,
    removeLine,
    user,
    cartCoupon,
    applyCartCoupon,
    clearCartCoupon,
  } = useAppState();

  const [couponInput, setCouponInput] = useState(cartCoupon?.code || "");
  const [couponMessage, setCouponMessage] = useState(
    cartCoupon ? `Loaded coupon ${cartCoupon.code}` : "",
  );
  const [couponStatus, setCouponStatus] = useState(
    cartCoupon ? "success" : null,
  );

  useEffect(() => {
    if (cartCoupon) {
      setCouponInput(cartCoupon.code);
      setCouponStatus("success");
      setCouponMessage(`Loaded coupon ${cartCoupon.code}`);
    } else {
      setCouponStatus(null);
      setCouponMessage("");
    }
  }, [cartCoupon]);

  const deliveryFee = cart.length ? 29 : 0;
  const couponRupees = Math.round(cartSubtotal * (cartCoupon?.discount || 0));
  const total = Math.max(0, cartSubtotal + deliveryFee - couponRupees);

  const applyCoupon = (event) => {
    event.preventDefault();
    const res = applyCartCoupon(couponInput);
    if (!res.ok) {
      setCouponStatus("error");
      setCouponMessage(res.error);
      return;
    }
    setCouponStatus("success");
    setCouponMessage(
      `Applied ${res.code}: ${Math.round(res.discount * 100)}% off.`,
    );
  };

  const removeCoupon = () => {
    clearCartCoupon();
    setCouponInput("");
    setCouponMessage("Coupon removed.");
    setCouponStatus("success");
  };

  return (
    <main className="page page-pad page-cart">
      <h1 className="page-title">Your cart</h1>
      {cart.length === 0 ? (
        <p className="page-muted">
          Cart is empty.{" "}
          <Link to="/shop" className="inline-link">
            Continue shopping
          </Link>
        </p>
      ) : (
        <>
          <form
            className="voucher-form cart-coupon-form"
            onSubmit={applyCoupon}
          >
            <label htmlFor="cart-coupon">Have a coupon?</label>
            <div className="voucher-row">
              <input
                id="cart-coupon"
                className="input"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                placeholder="FARM10 or GROW15"
                autoComplete="off"
              />
              <button type="submit" className="btn btn-secondary">
                Apply
              </button>
            </div>
            {couponMessage ? (
              <p className={`voucher-status voucher-status--${couponStatus}`}>
                {couponMessage}
                {cartCoupon ? (
                  <button
                    type="button"
                    className="link-remove"
                    onClick={removeCoupon}
                    style={{ marginLeft: "1rem" }}
                  >
                    Remove
                  </button>
                ) : null}
              </p>
            ) : null}
          </form>

          <ul className="cart-list">
            {cart.map((line) => (
              <li key={line.productId} className="cart-line">
                <img
                  src={line.img}
                  alt={line.name}
                  className="cart-line__img"
                />
                <div className="cart-line__body">
                  <div className="cart-line__title">{line.name}</div>
                  <div className="cart-line__meta">{line.priceDisplay}</div>
                  <div className="cart-line__controls">
                    <QuantityControl
                      value={line.qty}
                      onChange={(q) => setLineQty(line.productId, q)}
                      label={`Quantity for ${line.name}`}
                      id={`cart-qty-${line.productId}`}
                    />
                    <button
                      type="button"
                      className="link-remove"
                      onClick={() => removeLine(line.productId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="cart-line__sum">
                  {formatINR(line.priceRupees * line.qty)}
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-summary card-panel">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatINR(cartSubtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery</span>
              <span>{formatINR(deliveryFee)}</span>
            </div>
            {couponRupees > 0 ? (
              <>
                <div className="summary-row summary-row--original">
                  <span>Original total</span>
                  <span className="price-strikethrough">
                    {formatINR(cartSubtotal + deliveryFee)}
                  </span>
                </div>
                <div className="summary-row summary-row--discount">
                  <span>Coupon discount</span>
                  <span>-{formatINR(couponRupees)}</span>
                </div>
              </>
            ) : null}
            <div className="summary-row summary-row--total">
              <span>Total</span>
              <span>{formatINR(total)}</span>
            </div>
            {couponRupees > 0 ? (
              <p className="summary-note">
                You saved {formatINR(couponRupees)} with {cartCoupon.code}.
              </p>
            ) : null}
            <Link
              to={
                user
                  ? "/checkout"
                  : {
                      pathname: "/login",
                      state: { from: "/checkout" },
                    }
              }
              className="btn btn-buy-now checkout-cta"
            >
              {user ? "Proceed to checkout" : "Login to checkout"}
            </Link>
            {!user ? (
              <p className="page-muted small">
                Need an account? <Link to="/register">Sign up</Link> now.
              </p>
            ) : null}
          </div>
        </>
      )}
    </main>
  );
}

export default Cart;
