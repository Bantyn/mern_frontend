import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function SignInPage() {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL || `${window.location.protocol}//${window.location.hostname}:5000`;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await axios.post(`${API_URL}/api/auth/login `, formData);

      // Save token + user info
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/home"); // redirect to home/dashboard
    } catch (error) {
      console.error(error);
      setErrorMsg(error.response?.data?.message || "Login failed");
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-purple-600/30 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-600/20 blur-[160px]" />
      </div>

      {/* LOGIN FORM PANEL – RIGHT SIDE */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 z-10">
        <div className="w-full max-w-md rounded-[40px] px-8 py-10 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
          <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
          <p className="text-gray-400 mb-8">Log in to continue your journey.</p>

          {/* Error Message */}
          {errorMsg && (
            <p className="text-red-400 mb-4 bg-red-900/30 py-2 px-3 rounded-lg border border-red-700/40">
              {errorMsg}
            </p>
          )}

          {/* Login Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="h-12 w-full rounded-xl bg-gray-900 border border-gray-800 px-4 focus:ring-2 focus:ring-purple-500 outline-none"
            />

            <div>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="h-12 w-full rounded-xl bg-gray-900 border border-gray-800 px-4 focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 font-medium hover:opacity-90 transition shadow-lg shadow-purple-500/20"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

            <p className="text-center text-sm text-gray-400">
              Don't have an account?{" "}
              <Link to="/signup" className="text-purple-400 hover:underline">
                Create Account
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* LEFT PANEL */}
      <div className="relative hidden w-1/2 p-8 lg:flex flex-col justify-center">
        <div className="h-full w-full rounded-[40px] bg-gradient-to-b from-purple-500/40 via-purple-700/40 to-black/40 backdrop-blur-xl border border-white/10 p-12 flex flex-col justify-center">
          <div>
            <h1 className="text-5xl font-black mb-4 tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
          </div>

          <p className="text-lg mt-4 text-gray-300 leading-relaxed max-w-md">
            Jump back into your creative workspace and pick up where you left
            off. Your projects await.
          </p>

          <p className="text-sm mt-5 text-gray-500 font-medium uppercase tracking-widest">
            ✨ Your workspace, your rules
          </p>
        </div>
      </div>
    </div>
  );
}
