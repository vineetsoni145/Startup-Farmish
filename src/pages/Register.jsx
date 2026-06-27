import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppState } from "../context/AppStateContext";

function Register() {
  const navigate = useNavigate();
  const { register } = useAppState();
  const [method, setMethod] = useState("email");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");
    if (method === "google") {
      setInfo("Google signup is not available in this demo yet.");
      return;
    }
    const payload = {
      name,
      email: method === "email" ? email : email,
      phone: method === "mobile" ? phone : phone,
      password,
    };
    const res = await register(payload);
    if (!res.ok) {
      setError(res.error || "Could not register");
      return;
    }
    navigate("/account", { replace: true });
  };

  return (
    <div className="auth-card card-panel auth-register-card">
      <h1 className="auth-card__title">Create account</h1>
      <div className="auth-toggle-buttons">
        <button
          type="button"
          className={`tab-button ${method === "email" ? "active" : ""}`}
          onClick={() => setMethod("email")}
        >
          Email sign up
        </button>
        <button
          type="button"
          className={`tab-button ${method === "mobile" ? "active" : ""}`}
          onClick={() => setMethod("mobile")}
        >
          Mobile sign up
        </button>
        <button
          type="button"
          className={`tab-button ${method === "google" ? "active" : ""}`}
          onClick={() => setMethod("google")}
        >
          Google
        </button>
      </div>
      <p className="page-muted small">
        {method === "email"
          ? "Sign up with email and password to save your cart and orders."
          : method === "mobile"
            ? "Sign up with mobile number and password for a quick checkout flow."
            : "Google signup is currently a demo option."}
      </p>
      {info ? <p className="form-info">{info}</p> : null}
      {error ? <p className="form-error">{error}</p> : null}
      <form className="auth-form" onSubmit={submit}>
        <label className="form-label">
          Name
          <input
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        {method === "email" && (
          <label className="form-label">
            Email
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        )}
        {method === "mobile" && (
          <label className="form-label">
            Mobile number
            <input
              className="input"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="9999999999"
              required
            />
          </label>
        )}
        {method === "google" && (
          <p className="page-muted small">
            Press sign up to continue with Google in this demo.
          </p>
        )}
        <label className="form-label">
          Password
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="btn btn-buy-now auth-submit">
          Sign up
        </button>
      </form>
      <p className="auth-footer">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}

export default Register;
