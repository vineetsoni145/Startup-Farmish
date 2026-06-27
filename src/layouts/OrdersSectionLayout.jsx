import React from "react";
import { Outlet } from "react-router-dom";

/** Groups /orders (list) and /orders/:orderId (detail) without extra chrome. */
function OrdersSectionLayout() {
  return <Outlet />;
}

export default OrdersSectionLayout;
