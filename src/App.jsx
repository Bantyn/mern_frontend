import { Routes, Route } from "react-router-dom";

// Layouts
import ClientLayout from "./Layouts/ClientLayout.jsx";
import AuthLayout from "./Layouts/AuthLayout.jsx";
import AdminLayout from "./Layouts/AdminLayout.jsx";

// Pages
import LandingPage from "./pages/LandingPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import UploadPage from "./pages/UploadPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import SignInPage from "./pages/SigInPage.jsx";
import LogoutPage from "./pages/Logoutpage.jsx";
import SupportPage from "./pages/Supportpage.jsx";
// import AdminDashboard from "./admin/AdminDashboard.jsx";

function App() {
  return (
    <Routes>

      {/* 🌐 CLIENT SIDE (Navbar + Footer) */}
      <Route element={<ClientLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/logout" element={<LogoutPage />} />
      </Route>

      {/* 🔐 AUTH PAGES (No Navbar/Footer) */}
      <Route element={<AuthLayout />}>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<SignInPage />} />
      </Route>

      {/* 🛠 ADMIN SIDE (No client navbar/footer) */}
      <Route element={<AdminLayout />}>
        {/* <Route path="/admin" element={<AdminDashboard />} /> */}
        {/* You can add more admin pages here */}
      </Route>

    </Routes>
  );
}

export default App;
