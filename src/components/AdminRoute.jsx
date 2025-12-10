import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");  // set role after login

  if (!token || role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
}
