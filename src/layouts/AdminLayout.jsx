import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Wordmark from "../components/Wordmark";

function AdminLayout() {
  const { pathname } = useLocation();

  return (
    <div className="admin-layout">
      <aside className="admin-layout__sidebar">
        <Link to="/admin" className="admin-layout__brand">
          <Wordmark variant="drawer" />
          <span className="admin-layout__badge">Admin</span>
        </Link>
        <nav className="admin-layout__nav">
          <Link to="/admin" className={pathname === "/admin" ? "active" : ""}>
            Overview
          </Link>
        </nav>
      </aside>
      <div className="admin-layout__body">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
