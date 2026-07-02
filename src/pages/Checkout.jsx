import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppState } from "../context/AppStateContext";
import { formatINR } from "../utils/money";
import { usePageMetadata } from "../hooks/usePageMetadata";
import BackButton from "../components/BackButton";

function Checkout() {
  usePageMetadata(
    "Checkout",
    "Enter delivery details and confirm your order for fresh farm produce delivery.",
  );
  const navigate = useNavigate();
  const {
    cart,
    cartSubtotal,
    user,
    createOrder,
    saveAddress,
    cartCoupon,
    applyCartCoupon,
    clearCartCoupon,
  } = useAppState();
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [line1, setLine1] = useState("");
  const [city, setCity] = useState("");
  const [pin, setPin] = useState("");
  const [selectedAddressId, setSelectedAddressId] = useState(
    user?.savedAddresses?.[0]?.id || "",
  );
  const [saveThisAddress, setSaveThisAddress] = useState(false);
  const [couponCode, setCouponCode] = useState(cartCoupon?.code || "");
  const [couponStatus, setCouponStatus] = useState(
    cartCoupon ? "success" : null,
  );
  const [couponMessage, setCouponMessage] = useState(
    cartCoupon ? `Loaded coupon ${cartCoupon.code}` : "",
  );
  const [couponDiscount, setCouponDiscount] = useState(
    cartCoupon?.discount || 0,
  );
  const [error, setError] = useState("");

  const savedAddresses = user?.savedAddresses || [];
  const selectedAddress = savedAddresses.find(
    (a) => a.id === selectedAddressId,
  );

  useEffect(() => {
    if (selectedAddress) {
      setName(selectedAddress.name);
      setPhone(selectedAddress.phone);
      setLine1(selectedAddress.line1);
      setCity(selectedAddress.city);
      setPin(selectedAddress.pin);
      setSaveThisAddress(false);
    }
  }, [selectedAddress]);

  useEffect(() => {
    if (cartCoupon) {
      setCouponCode(cartCoupon.code);
      setCouponDiscount(cartCoupon.discount);
      setCouponStatus("success");
      setCouponMessage(`Loaded coupon ${cartCoupon.code}`);
    }
  }, [cartCoupon]);

  const deliveryFee = cart.length ? 29 : 0;
  const couponRupees = Math.round(cartSubtotal * couponDiscount);
  const total = Math.max(0, cartSubtotal - couponRupees + deliveryFee);

  const applyCoupon = (e) => {
    e.preventDefault();
    const res = applyCartCoupon(couponCode);
    if (!res.ok) {
      setCouponStatus("error");
      setCouponMessage(res.error);
      setCouponDiscount(0);
      return;
    }
    setCouponStatus("success");
    setCouponMessage(`Coupon applied: ${Math.round(res.discount * 100)}% off.`);
    setCouponDiscount(res.discount);
  };

  const submit = (e) => {
    e.preventDefault();
    if (!cart.length) {
      setError("Your cart is empty.");
      return;
    }
    if (!name.trim() || !phone.trim() || !line1.trim() || !city || !pin) {
      setError("Please fill all fields.");
      return;
    }
    if (saveThisAddress) {
      saveAddress({ name, phone, line1, city, pin });
    }
    const order = createOrder({
      lines: cart.map((l) => ({ ...l })),
      address: { name, phone, line1, city, pin },
      couponCode:
        cartCoupon?.code ||
        (couponStatus === "success" ? couponCode.trim().toUpperCase() : null),
      discountRupees: couponRupees,
      subtotalRupees: cartSubtotal,
      deliveryFeeRupees: deliveryFee,
      totalRupees: total,
    });
    clearCartCoupon();
    navigate(`/payment/${order.id}`);
  };

  if (!cart.length) {
    return (
      <main className="page page-pad">
        <h1 className="page-title">Checkout</h1>
        <p className="page-muted">
          Nothing to checkout.{" "}
          <Link to="/shop" className="inline-link">
            Shop now
          </Link>
        </p>
      </main>
    );
  }

  return (
    <main className="page page-pad page-checkout">
      <BackButton label="Back to cart" />
      <h1 className="page-title">Checkout</h1>
      <p className="page-subtitle">
        Demo flow: order is stored locally (prototype for investors).
      </p>

      <div className="checkout-grid">
        <form className="card-panel checkout-form" onSubmit={submit}>
          <h2 className="panel-title">Delivery details</h2>
          {error ? <p className="form-error">{error}</p> : null}
          {savedAddresses.length > 0 ? (
            <label className="form-label">
              Use saved address
              <select
                className="input"
                value={selectedAddressId}
                onChange={(e) => setSelectedAddressId(e.target.value)}
              >
                <option value="">Select address</option>
                {savedAddresses.map((address) => (
                  <option key={address.id} value={address.id}>
                    {address.line1}, {address.city} ({address.pin})
                  </option>
                ))}
              </select>
            </label>
          ) : null}

          <label className="form-label">
            Full name
            <input
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label className="form-label">
            Phone
            <input
              className="input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </label>
          <label className="form-label">
            Address line
            <input
              className="input"
              value={line1}
              onChange={(e) => setLine1(e.target.value)}
              required
            />
          </label>
          <div className="form-row">
            <label className="form-label">
              City
              <input
                className="input"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </label>
            <label className="form-label">
              PIN
              <input
                className="input"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                maxLength={6}
                required
              />
            </label>
          </div>
          <div className="form-label">
            <label htmlFor="coupon-code">Coupon code</label>
            <div className="coupon-row">
              <input
                id="coupon-code"
                className="input"
                value={couponCode}
                onChange={(e) => {
                  setCouponCode(e.target.value);
                  setCouponStatus(null);
                  setCouponMessage("");
                }}
                placeholder="FARM10 or GROW15"
                autoComplete="off"
              />
              <button
                type="button"
                className="btn btn-secondary"
                onClick={applyCoupon}
              >
                Apply
              </button>
            </div>
            {couponMessage ? (
              <p className={`voucher-status voucher-status--${couponStatus}`}>
                {couponMessage}
              </p>
            ) : null}
          </div>
          {savedAddresses.length ? (
            <label className="form-label form-checkbox">
              <input
                type="checkbox"
                checked={saveThisAddress}
                onChange={(e) => setSaveThisAddress(e.target.checked)}
              />
              Save this address for later
            </label>
          ) : (
            <label className="form-label form-checkbox">
              <input
                type="checkbox"
                checked={saveThisAddress}
                onChange={(e) => setSaveThisAddress(e.target.checked)}
              />
              Save this address for later
            </label>
          )}
          <button type="submit" className="btn btn-buy-now">
            Place order &amp; pay
          </button>
        </form>

        <aside className="card-panel checkout-side">
          <h2 className="panel-title">Bill summary</h2>
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
            <span>Payable</span>
            <span>{formatINR(total)}</span>
          </div>
          {couponRupees > 0 ? (
            <p className="summary-note">
              You saved {formatINR(couponRupees)} with{" "}
              {cartCoupon?.code || couponCode}.
            </p>
          ) : null}
        </aside>
      </div>
    </main>
  );
}

export default Checkout;
