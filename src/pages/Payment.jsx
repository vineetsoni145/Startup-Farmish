import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppState } from "../context/AppStateContext";
import { apiInitiatePayment } from "../services/payment.api";
import { formatINR } from "../utils/money";
import { usePageMetadata } from "../hooks/usePageMetadata";
import BackButton from "../components/BackButton";

const PAYMENT_METHODS = [
  {
    id: "upi",
    label: "UPI",
    icon: "fa-mobile-alt",
    hint: "GPay, PhonePe, Paytm, BHIM",
  },
  {
    id: "card",
    label: "Credit / Debit card",
    icon: "fa-credit-card",
    hint: "Visa, Mastercard, RuPay",
  },
  {
    id: "netbanking",
    label: "Net banking",
    icon: "fa-university",
    hint: "All major Indian banks",
  },
  {
    id: "wallet",
    label: "Wallets",
    icon: "fa-wallet",
    hint: "Paytm, Amazon Pay, Mobikwik",
  },
  {
    id: "cod",
    label: "Cash on delivery",
    icon: "fa-money-bill-wave",
    hint: "Pay when your order arrives",
  },
];

function Payment() {
  usePageMetadata(
    "Payment",
    "Complete your payment for fresh farm items with saved wallets and cards.",
  );
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { getOrder, updateOrderPayment, user, savePaymentMethod } =
    useAppState();
  const order = getOrder(orderId);
  const savedMethods = user?.savedPaymentMethods || [];
  const [method, setMethod] = useState(
    savedMethods[0] ? `saved-${savedMethods[0].id}` : "upi",
  );
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [savePayment, setSavePayment] = useState(false);

  const selectedSavedMethod = method.startsWith("saved-")
    ? savedMethods.find((m) => m.id === method.slice(6))
    : null;

  if (!order) {
    return (
      <main className="page page-pad">
        <h1 className="page-title">Payment</h1>
        <p>Order not found.</p>
        <Link to="/shop">Shop</Link>
      </main>
    );
  }

  if (order.paymentStatus === "captured") {
    return (
      <main className="page page-pad">
        <h1 className="page-title">Already paid</h1>
        <Link to={`/orders/${order.id}`} className="inline-link">
          Track order
        </Link>
      </main>
    );
  }

  const pay = async (e) => {
    e.preventDefault();
    const activeMethod = selectedSavedMethod
      ? selectedSavedMethod.type
      : method;

    if (!selectedSavedMethod) {
      if (activeMethod === "upi" && !upiId.trim()) {
        setMsg("Enter your UPI ID to continue.");
        return;
      }
      if (activeMethod === "card") {
        if (cardNumber.replace(/\s/g, "").length !== 16) {
          setMsg("Enter a valid 16-digit card number.");
          return;
        }
        if (!cardName.trim()) {
          setMsg("Enter the cardholder name.");
          return;
        }
        if (cardExpiry.length !== 5) {
          setMsg("Enter card expiry (MM/YY).");
          return;
        }
        if (cardCvv.length !== 3) {
          setMsg("Enter 3-digit CVV.");
          return;
        }
      }
    }

    setBusy(true);
    setMsg("");
    const res = await apiInitiatePayment({
      orderId: order.id,
      amountRupees: order.totalRupees,
      method: activeMethod,
    });
    setBusy(false);
    if (!res.ok) {
      setMsg(res.error || "Payment failed");
      return;
    }

    if (!selectedSavedMethod && savePayment) {
      const last4 = cardNumber.replace(/\s/g, "").slice(-4);
      const label =
        activeMethod === "card" ? `Card ending ${last4}` : `UPI ${upiId}`;
      savePaymentMethod({
        type: activeMethod,
        label,
        details:
          activeMethod === "card" ? { last4: last4 } : { upiId: upiId.trim() },
      });
    }

    const paymentMethodLabel = selectedSavedMethod
      ? selectedSavedMethod.label
      : selected?.label || activeMethod;
    updateOrderPayment(order.id, "captured", activeMethod, paymentMethodLabel);
    navigate(`/orders/${order.id}`);
  };

  const selected = PAYMENT_METHODS.find(
    (m) => m.id === (selectedSavedMethod?.type || method),
  );

  return (
    <main className="page page-pad page-payment">
      <BackButton label="Back to checkout" />
      <h1 className="page-title">Payment</h1>
      <p className="page-subtitle">
        Choose how you want to pay — demo gateway (Razorpay-style).
      </p>

      <div className="payment-layout">
        <form className="card-panel payment-card" onSubmit={pay}>
          <div className="summary-row summary-row--total payment-amount">
            <span>Amount due</span>
            <span>{formatINR(order.totalRupees)}</span>
          </div>
          <p className="page-muted small payment-order-id">
            Order <strong>{order.id}</strong>
          </p>

          {savedMethods.length > 0 ? (
            <>
              <h2 className="panel-title">Saved payment methods</h2>
              <ul
                className="payment-methods"
                role="radiogroup"
                aria-label="Saved payment method"
              >
                {savedMethods.map((saved) => (
                  <li key={saved.id}>
                    <label
                      className={`payment-method${
                        method === `saved-${saved.id}`
                          ? " payment-method--active"
                          : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={`saved-${saved.id}`}
                        checked={method === `saved-${saved.id}`}
                        onChange={() => setMethod(`saved-${saved.id}`)}
                      />
                      <i
                        className="fas fa-lock payment-method__icon"
                        aria-hidden
                      />
                      <span className="payment-method__body">
                        <span className="payment-method__label">
                          {saved.label}
                        </span>
                        <span className="payment-method__hint">
                          Saved {saved.type.toUpperCase()} method
                        </span>
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          <h2 className="panel-title">Payment method</h2>
          <ul
            className="payment-methods"
            role="radiogroup"
            aria-label="Payment method"
          >
            {PAYMENT_METHODS.map((m) => (
              <li key={m.id}>
                <label
                  className={`payment-method${method === m.id ? " payment-method--active" : ""}`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={m.id}
                    checked={method === m.id}
                    onChange={() => setMethod(m.id)}
                  />
                  <i
                    className={`fas ${m.icon} payment-method__icon`}
                    aria-hidden
                  />
                  <span className="payment-method__body">
                    <span className="payment-method__label">{m.label}</span>
                    <span className="payment-method__hint">{m.hint}</span>
                  </span>
                </label>
              </li>
            ))}
          </ul>

          {!selectedSavedMethod ? (
            <>
              {method === "upi" ? (
                <label className="form-label">
                  UPI ID
                  <input
                    className="input"
                    placeholder="name@upi"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    autoComplete="off"
                  />
                </label>
              ) : null}

              {method === "card" ? (
                <div className="card-form">
                  <label className="form-label">
                    Card number
                    <input
                      className="input"
                      inputMode="numeric"
                      maxLength={19}
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        const formatted =
                          value.match(/.{1,4}/g)?.join(" ") || value;
                        setCardNumber(formatted);
                      }}
                      autoComplete="cc-number"
                    />
                  </label>
                  <label className="form-label">
                    Cardholder name
                    <input
                      className="input"
                      placeholder="Name on card"
                      value={cardName}
                      onChange={(e) =>
                        setCardName(e.target.value.toUpperCase())
                      }
                      autoComplete="cc-name"
                    />
                  </label>
                  <div className="card-form-row">
                    <label className="form-label">
                      Expiry date
                      <input
                        className="input"
                        inputMode="numeric"
                        maxLength={5}
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, "");
                          if (value.length >= 2) {
                            value = value.slice(0, 2) + "/" + value.slice(2, 4);
                          }
                          setCardExpiry(value);
                        }}
                        autoComplete="cc-exp"
                      />
                    </label>
                    <label className="form-label">
                      CVV
                      <input
                        className="input"
                        inputMode="numeric"
                        maxLength={3}
                        placeholder="123"
                        value={cardCvv}
                        onChange={(e) =>
                          setCardCvv(
                            e.target.value.replace(/\D/g, "").slice(0, 3),
                          )
                        }
                        autoComplete="cc-csc"
                      />
                    </label>
                  </div>
                </div>
              ) : null}

              {method === "netbanking" ? (
                <label className="form-label">
                  Select bank
                  <select className="input" defaultValue="sbi">
                    <option value="sbi">State Bank of India</option>
                    <option value="hdfc">HDFC Bank</option>
                    <option value="icici">ICICI Bank</option>
                    <option value="axis">Axis Bank</option>
                    <option value="kotak">Kotak Mahindra</option>
                  </select>
                </label>
              ) : null}

              {method === "wallet" ? (
                <label className="form-label">
                  Wallet
                  <select className="input" defaultValue="paytm">
                    <option value="paytm">Paytm</option>
                    <option value="phonepe">PhonePe</option>
                    <option value="amazon">Amazon Pay</option>
                  </select>
                </label>
              ) : null}

              {method !== "cod" ? (
                <label className="form-label form-checkbox">
                  <input
                    type="checkbox"
                    checked={savePayment}
                    onChange={(e) => setSavePayment(e.target.checked)}
                  />
                  Save this payment method for future orders
                </label>
              ) : null}
            </>
          ) : (
            <div className="saved-payment-note">
              <p className="page-muted small">
                Using saved payment method:{" "}
                <strong>{selectedSavedMethod.label}</strong>.
              </p>
            </div>
          )}

          {method === "cod" ? (
            <p className="page-muted small payment-cod-note">
              Pay {formatINR(order.totalRupees)} in cash when the delivery
              partner arrives. No online charge for this demo.
            </p>
          ) : null}

          {msg ? <p className="form-error">{msg}</p> : null}

          <button
            type="submit"
            className="btn btn-buy-now pay-btn"
            disabled={busy}
          >
            {busy
              ? "Processing…"
              : `Pay ${formatINR(order.totalRupees)}${
                  selected
                    ? ` via ${
                        selectedSavedMethod
                          ? selectedSavedMethod.label
                          : selected.label
                      }`
                    : ""
                }`}
          </button>
        </form>

        <aside className="card-panel payment-side">
          <h2 className="panel-title">Order summary</h2>
          <ul className="payment-lines">
            {order.lines.map((line) => (
              <li key={line.productId}>
                {line.name} × {line.qty}
              </li>
            ))}
          </ul>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatINR(order.subtotalRupees)}</span>
          </div>
          <div className="summary-row">
            <span>Delivery</span>
            <span>{formatINR(order.deliveryFeeRupees)}</span>
          </div>
          <div className="summary-row summary-row--total">
            <span>Total</span>
            <span>{formatINR(order.totalRupees)}</span>
          </div>
          <p className="page-muted small">
            Delivering to {order.address?.line1}, {order.address?.city} —{" "}
            {order.address?.pin}
          </p>
        </aside>
      </div>
    </main>
  );
}

export default Payment;
