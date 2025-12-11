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

// Security
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminRoute from "./components/AdminRoute.jsx";

// Auth
import ForgotPassword from "./pages/ForgotPassword.jsx";
import VerifyOtp from "./pages/VerifyOtp.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

function App() {
  return (
  
    <Routes>
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* 🌐 PUBLIC PAGES (Anyone can access) */}
      <Route element={<ClientLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/support" element={<SupportPage />} />
      </Route>

      {/* 🔒 PROTECTED PAGES (Only Logged-in Users) */}
      <Route element={<ClientLayout />}>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <UploadPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/logout"
          element={
            <ProtectedRoute>
              <LogoutPage />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* 🔐 AUTH PAGES (No need login) */}
      <Route element={<AuthLayout />}>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<SignInPage />} />
      </Route>

      {/* 🛠 ADMIN ONLY */}
      <Route element={<AdminLayout />}>
        <Route
          path="/admin"
          element={<AdminRoute>{/* <AdminDashboard /> */}</AdminRoute>}
        />
      </Route>
    </Routes>
  );
}

export default App;
