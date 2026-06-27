import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Mobileheader from "../components/Mobileheader";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MobileBottomNav from "../components/MobileBottomNav";
import CartToast from "../components/CartToast";
import { useAppState } from "../context/AppStateContext";

function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { cartCount } = useAppState();

  return (
    <>
      <Mobileheader />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Navbar onMenuClick={() => setSidebarOpen(true)} />

      <Outlet />

      <CartToast />
      <Footer />
      <MobileBottomNav cartCount={cartCount} />
    </>
  );
}

export default MainLayout;
