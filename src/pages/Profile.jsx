import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAppState } from "../context/AppStateContext";
import { usePageMetadata } from "../hooks/usePageMetadata";

function Profile() {
  usePageMetadata(
    "Profile",
    "Update your account details, delivery addresses and saved payment methods.",
  );
  const { user, updateUser, saveAddress, removeAddress, removePaymentMethod } =
    useAppState();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [addressPin, setAddressPin] = useState("");

  if (!user) {
    return <Navigate to="/login" replace state={{ from: "/profile" }} />;
  }

  const savedAddresses = user.savedAddresses || [];
  const savedPaymentMethods = user.savedPaymentMethods || [];
  const addressCount = savedAddresses.length;
  const paymentCount = savedPaymentMethods.length;
  const canSaveProfile = name.trim() && (email.trim() || phone.trim());

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setError("");
    setInfo("");
    if (!canSaveProfile) {
      setError("Please enter a name and either email or mobile number.");
      return;
    }
    updateUser({ name: name.trim(), email: email.trim(), phone: phone.trim() });
    setInfo("Profile updated.");
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    setError("");
    setInfo("");
    if (!addressLine.trim() || !addressCity.trim() || !addressPin.trim()) {
      setError("Please provide all address fields.");
      return;
    }
    saveAddress({
      name: user.name,
      phone: user.phone,
      line1: addressLine.trim(),
      city: addressCity.trim(),
      pin: addressPin.trim(),
    });
    setAddressLine("");
    setAddressCity("");
    setAddressPin("");
    setInfo("Address saved.");
  };

  return (
    <main className="page page-pad page-profile">
      <div className="page-header">
        <div>
          <h1 className="page-title">Profile</h1>
          <p className="page-subtitle">
            Manage your details and saved delivery addresses.
          </p>
        </div>
        <Link to="/account" className="inline-link">
          ← Back to account
        </Link>
      </div>

      <div className="profile-grid">
        <section className="card-panel profile-card">
          <h2 className="panel-title">Account details</h2>
          {error ? <p className="form-error">{error}</p> : null}
          {info ? <p className="form-info">{info}</p> : null}
          <form onSubmit={handleProfileSubmit} className="auth-form">
            <label className="form-label">
              Name
              <input
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="form-label">
              Email
              <input
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="form-label">
              Mobile number
              <input
                className="input"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </label>
            <button type="submit" className="btn btn-buy-now auth-submit">
              Save profile
            </button>
          </form>
        </section>

        <section className="card-panel profile-card">
          <h2 className="panel-title">Saved addresses</h2>
          {addressCount === 0 ? (
            <p className="page-muted">
              No saved delivery addresses yet. Add one to speed up checkout.
            </p>
          ) : (
            <ul className="address-list">
              {savedAddresses.map((address) => (
                <li key={address.id} className="address-card">
                  <div>
                    <strong>{address.name}</strong>
                    <p>{address.line1}</p>
                    <p>
                      {address.city} · {address.pin}
                    </p>
                    <p>{address.phone}</p>
                  </div>
                  <button
                    type="button"
                    className="link-remove"
                    onClick={() => removeAddress(address.id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}

          <form className="auth-form" onSubmit={handleAddAddress}>
            <label className="form-label">
              Address line
              <input
                className="input"
                value={addressLine}
                onChange={(e) => setAddressLine(e.target.value)}
              />
            </label>
            <div className="form-row">
              <label className="form-label">
                City
                <input
                  className="input"
                  value={addressCity}
                  onChange={(e) => setAddressCity(e.target.value)}
                />
              </label>
              <label className="form-label">
                PIN
                <input
                  className="input"
                  value={addressPin}
                  maxLength={6}
                  onChange={(e) => setAddressPin(e.target.value)}
                />
              </label>
            </div>
            <button type="submit" className="btn btn-buy-now auth-submit">
              Add address
            </button>
          </form>
        </section>

        <section className="card-panel profile-card">
          <h2 className="panel-title">Saved payment methods</h2>
          {paymentCount === 0 ? (
            <p className="page-muted">
              No saved payment methods yet. Pay once and choose to save a method
              at checkout.
            </p>
          ) : (
            <ul className="address-list">
              {savedPaymentMethods.map((method) => (
                <li key={method.id} className="address-card">
                  <div>
                    <strong>{method.label}</strong>
                    <p>{method.type.toUpperCase()}</p>
                    {method.details?.last4 ? (
                      <p>Card ending {method.details.last4}</p>
                    ) : null}
                    {method.details?.upiId ? (
                      <p>UPI {method.details.upiId}</p>
                    ) : null}
                  </div>
                  <button
                    type="button"
                    className="link-remove"
                    onClick={() => removePaymentMethod(method.id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

export default Profile;
