// src/layouts/ClientLayout.jsx
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { Outlet } from "react-router-dom";

export default function ClientLayout() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
