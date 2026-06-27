import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppState } from "../context/AppStateContext";
import Wordmark from "../components/Wordmark";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    login,
    validateCredentials,
    requestOtp,
    verifyOtp,
    markAdminVerified,
  } = useAppState();

  const from = location.state?.from || "/account";
  const initialMode = from.startsWith("/admin") ? "admin" : "user";
  const [mode, setMode] = useState(initialMode);

  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [adminMobile, setAdminMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [pendingAdmin, setPendingAdmin] = useState(null);
  const [otpRequested, setOtpRequested] = useState(false);
  const [info, setInfo] = useState("");
  const [error, setError] = useState("");
  const [resendAvailableAt, setResendAvailableAt] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);

  const userFlow = mode === "user";
  const adminFlow = mode === "admin";
  const isAdminMobileStep = adminFlow && pendingAdmin && !otpRequested;
  const isAdminOtpStep = adminFlow && pendingAdmin && otpRequested;

  const buttonLabel = useMemo(() => {
    if (userFlow) return "Continue";
    if (!pendingAdmin) return "Continue";
    if (isAdminMobileStep) return "Send OTP";
    return "Verify OTP";
  }, [userFlow, pendingAdmin, isAdminMobileStep]);

  useEffect(() => {
    if (!resendAvailableAt) {
      setTimeLeft(0);
      return;
    }
    const timer = window.setInterval(() => {
      const remaining = Math.max(
        0,
        Math.ceil((resendAvailableAt - Date.now()) / 1000),
      );
      setTimeLeft(remaining);
      if (remaining <= 0) {
        window.clearInterval(timer);
        setResendAvailableAt(null);
      }
    }, 250);
    return () => window.clearInterval(timer);
  }, [resendAvailableAt]);

  useEffect(() => {
    setContact("");
    setPassword("");
    setAdminMobile("");
    setOtp("");
    setPendingAdmin(null);
    setOtpRequested(false);
    setInfo("");
    setError("");
    setResendAvailableAt(null);
    setTimeLeft(0);
  }, [mode]);

  const handleModeChange = (nextMode) => setMode(nextMode);

  const handleAdminCredentials = async () => {
    if (!contact || !password) {
      setError("Enter admin username/email and password.");
      return false;
    }
    const validation = await validateCredentials(contact, password);
    if (!validation.ok) {
      setError(validation.error);
      return false;
    }
    if (validation.user.role !== "admin") {
      setError("Admin credentials are required for this flow.");
      return false;
    }
    setPendingAdmin({ contact, password });
    setInfo("Enter your admin mobile number to receive the OTP.");
    return true;
  };

  const handleSendOtp = async () => {
    if (!adminMobile || !/^\d{6,}$/.test(adminMobile.trim())) {
      setError("Enter a valid mobile number to receive the OTP.");
      return;
    }
    setError("");
    const res = await requestOtp(adminMobile);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    setOtpRequested(true);
    setInfo(res.data?.message || "OTP sent. Enter the code below.");
    setResendAvailableAt(Date.now() + 180000);
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.trim().length < 4) {
      setError("Enter the 4-digit OTP to continue.");
      return;
    }
    setError("");
    const verifyRes = await verifyOtp({ contact: adminMobile, code: otp });
    if (!verifyRes.ok) {
      setError(verifyRes.error);
      return;
    }
    const loginRes = await login(pendingAdmin.contact, pendingAdmin.password);
    if (!loginRes.ok) {
      setError(loginRes.error);
      return;
    }
    markAdminVerified();
    navigate(from, { replace: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");

    if (userFlow) {
      if (!contact || !password) {
        setError("Enter your email or mobile number and password.");
        return;
      }
      const res = await login(contact, password);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      navigate(from, { replace: true });
      return;
    }

    if (adminFlow) {
      if (!pendingAdmin) {
        await handleAdminCredentials();
        return;
      }
      if (isAdminMobileStep) {
        await handleSendOtp();
        return;
      }
      if (isAdminOtpStep) {
        await handleVerifyOtp();
        return;
      }
    }
  };

  const handleResend = async () => {
    if (timeLeft > 0) return;
    await handleSendOtp();
  };

  return (
    <div className="auth-card card-panel auth-login-card">
      <Wordmark variant="mobile" className="auth-wordmark" />
      <div className="auth-toggle-buttons">
        <button
          type="button"
          className={`tab-button ${userFlow ? "active" : ""}`}
          onClick={() => handleModeChange("user")}
        >
          User login
        </button>
        <button
          type="button"
          className={`tab-button ${adminFlow ? "active" : ""}`}
          onClick={() => handleModeChange("admin")}
        >
          Admin login
        </button>
      </div>
      <h1 className="auth-card__title">
        {userFlow ? "Customer login" : "Admin login"}
      </h1>
      <p className="page-muted small">
        {userFlow
          ? "Sign in with email or mobile to continue shopping and place orders."
          : "Secure admin access requires credentials plus a mobile OTP."}
      </p>
      {info ? <p className="form-info">{info}</p> : null}
      {error ? <p className="form-error">{error}</p> : null}
      <form className="auth-form" onSubmit={handleSubmit}>
        {!adminFlow && (
          <label className="form-label">
            Email or mobile number
            <input
              className="input"
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="name@example.com or 9999999999"
              required
            />
          </label>
        )}

        {adminFlow && !pendingAdmin && (
          <label className="form-label">
            Username or email
            <input
              className="input"
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="admin@farmish.demo"
              required
            />
          </label>
        )}

        {adminFlow && pendingAdmin && !otpRequested && (
          <label className="form-label">
            Admin mobile number
            <input
              className="input"
              type="tel"
              value={adminMobile}
              onChange={(e) => setAdminMobile(e.target.value)}
              placeholder="Enter mobile for OTP"
              required
            />
          </label>
        )}

        {(userFlow || (!pendingAdmin && adminFlow)) && (
          <label className="form-label">
            Password
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </label>
        )}

        {isAdminOtpStep && (
          <label className="form-label">
            4-digit OTP
            <input
              className="input"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              required
            />
          </label>
        )}

        <button type="submit" className="btn btn-buy-now auth-submit">
          {buttonLabel}
        </button>
      </form>

      <div className="auth-secondary-actions">
        {userFlow ? (
          <>
            <Link to="/contact" className="inline-link">
              Forgot password?
            </Link>
            <span className="auth-divider">|</span>
            <Link to="/register" className="inline-link">
              Create new account
            </Link>
          </>
        ) : null}
        {isAdminOtpStep ? (
          <div className="otp-resend-row">
            <button
              type="button"
              className="inline-link otp-resend"
              onClick={handleResend}
              disabled={timeLeft > 0}
            >
              {timeLeft > 0
                ? `Resend OTP in ${Math.floor(timeLeft / 60)}:${String(
                    timeLeft % 60,
                  ).padStart(2, "0")}`
                : "Resend OTP"}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Login;
