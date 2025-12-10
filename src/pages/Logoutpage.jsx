import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LogoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear auth data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect to login
    navigate("/");
  }, [navigate]);

  return null; // No UI needed
}
