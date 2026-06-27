import React from "react";
import { Link, Outlet } from "react-router-dom";
import Wordmark from "../components/Wordmark";

function AuthLayout() {
  return (
    <div className="auth-layout">
      <header className="auth-layout__header">
        <Link to="/" className="auth-layout__logo" aria-label="Farmish home">
          <Wordmark variant="mobile" />
        </Link>
      </header>
      <main className="auth-layout__main">
        <Outlet />
      </main>
    </div>
  );
}

export default AuthLayout;
