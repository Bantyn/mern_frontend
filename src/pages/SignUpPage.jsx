import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
  
  const API_URL = `${window.location.protocol}//${window.location.hostname}:5000`;

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(` ${"https://mern-backend-f5oi.onrender.com"|| API_URL}/api/auth/register`, formData);

      setMessage("Account created successfully! Redirecting...");
      setFormData({ firstName: "", lastName: "", email: "", password: "" });

      setTimeout(() => {
        window.location.href = "/login";
      }, 1200);

    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Something went wrong!");
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

      {/* Left Panel */}
      <div className="relative hidden w-1/2 p-8 lg:flex flex-col justify-center">
        <div className="h-full w-full rounded-[40px] bg-gradient-to-b from-purple-500/40 via-purple-700/40 to-black/40 backdrop-blur-xl border border-white/10 p-12 flex flex-col justify-center">
          
          <h1 className="text-4xl font-bold mb-4 tracking-wide">Flowers & Saints</h1>
          <p className="text-lg text-gray-300 mb-12">
            Begin your journey with a powerful and elegant workflow experience.
          </p>
           <p className="text-sm text-gray-500 mb-4 font-medium uppercase tracking-widest">
    ✨ Trusted by 10K+ creators worldwide
  </p>
          <div className="space-y-6">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center gap-4 p-5 bg-white/10 rounded-2xl backdrop-blur-lg hover:bg-white/20 transition">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white text-black font-bold">
                  {step}
                </div>
                <p className="text-lg font-medium">
                  {step === 1 && "Create your Account"}
                  {step === 2 && "Set up your Workspace"}
                  {step === 3 && "Complete your Profile"}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Right Panel */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6">
        <div className="w-full max-w-md rounded-[40px] px-8 py-10 bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl">
          
          <h2 className="text-3xl font-bold mb-2">Create Account</h2>
          <p className="text-gray-400 mb-8">Fill in your details to get started.</p>

          {/* Social */}
          <div className="grid gap-4 mb-8">
            <button className="flex items-center justify-center gap-3 h-12 bg-white/10 hover:bg-white/20 transition rounded-xl border border-gray-700">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-6" />
              Continue with Google
            </button>

            <button className="flex items-center justify-center gap-3 h-12 bg-white/10 hover:bg-white/20 transition rounded-xl border border-gray-700">
              <img src="https://www.svgrepo.com/show/512317/github-142.svg" className="h-6 invert" />
              Continue with GitHub
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-black text-gray-400">Or continue with email</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Name Inputs */}
            <div className="grid md:grid-cols-2 gap-4">
              <input
                name="firstName"
                type="text"
                placeholder="Dollar"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="h-12 rounded-xl bg-gray-900 border border-gray-800 px-4 focus:ring-2 focus:ring-purple-500 outline-none"
              />
              
              <input
                name="lastName"
                type="text"
                placeholder="Gill"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="h-12 rounded-xl bg-gray-900 border border-gray-800 px-4 focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>

            {/* Email */}
            <input
              name="email"
              type="email"
              placeholder="EXAMPLE@FLOWERSANDSAINTS.COM.AU"
              value={formData.email}
              onChange={handleChange}
              required
              className="h-12 w-full rounded-xl bg-gray-900 border border-gray-800 px-4 focus:ring-2 focus:ring-purple-500 outline-none"
            />

            {/* Password */}
            <div>
              <input
                name="password"
                type="password"
                placeholder="Your best Password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
                className="h-12 w-full rounded-xl bg-gray-900 border border-gray-800 px-4 focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <p className="text-sm text-gray-400 mt-1">Must be at least 8 characters.</p>
            </div>

            {/* Error / Success Message */}
            {message && (
              <p className="text-center text-sm text-purple-400">{message}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 font-medium hover:opacity-90 transition shadow-lg shadow-purple-500/20"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>

            <p className="text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-400 hover:underline">
                Log in
              </Link>
            </p>

          </form>

        </div>
      </div>
    </div>
  );
}
