import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();

  const email = localStorage.getItem("resetEmail");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const reset = async () => {
    try {
      await axios.post(
        "https://mern-backend-f5oi.onrender.com/api/password/reset",
        {
          email,
          newPassword: password,
        }
      );

      localStorage.removeItem("resetEmail");
      navigate("/login");
    } catch (err) {
      setMsg(err.response?.data?.message || "Error resetting password");
    }
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center px-4 py-10">
      {/* Container */}
      <div className="w-full max-w-md bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-xl text-white space-y-6">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold">Create New Password</h1>
          <p className="text-gray-400 text-sm mt-1">
            Enter a strong new password for your account.
          </p>
        </div>

        {/* Error Message */}
        {msg && (
          <p className="text-red-400 text-sm bg-red-900/30 border border-red-700/40 p-2 rounded-lg">
            {msg}
          </p>
        )}

        {/* Input */}
        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 bg-gray-900 border border-gray-800 px-4 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Button */}
          <button
            onClick={reset}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 
                       hover:opacity-90 transition font-medium shadow-lg shadow-purple-500/20"
          >
            Reset Password
          </button>

          <p className="text-xs text-gray-500">
            Your password must be at least 6 characters long.
          </p>

          {/* Divider */}
          <div className="w-full h-px bg-white/10 mt-3"></div>
        </div>
      </div>
    </div>
  );
}
