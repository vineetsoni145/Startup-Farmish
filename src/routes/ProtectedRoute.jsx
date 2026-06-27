import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppState } from "../context/AppStateContext";

/**
 * @param {{ children: React.ReactNode, requireAdmin?: boolean }} props
 */
function ProtectedRoute({ children, requireAdmin = false }) {
  const { user } = useAppState();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  if (requireAdmin) {
    // require both admin role and explicit admin verification (OTP)
    if (user.role !== "admin" || !user.adminVerified) {
      return (
        <Navigate to="/login" replace state={{ from: location.pathname }} />
      );
    }
  }

  return children;
}

export default ProtectedRoute;
