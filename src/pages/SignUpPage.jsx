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
  const [darkMode, setDarkMode] = useState(true); // Theme toggle

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post(
        `${"https://mern-backend-f5oi.onrender.com" || API_URL}/api/auth/register`,
        formData
      );

      setMessage("Account created successfully! Redirecting...");
      setFormData({ firstName: "", lastName: "", email: "", password: "" });

      setTimeout(() => {
        window.location.href = "/login";
      }, 1200);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong!");
    }

    setLoading(false);
  };

  return (
    <div className={`${darkMode ? "dark" : ""} flex min-h-screen relative`}>
      {/* Background Glows */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-purple-600/20 dark:bg-purple-500/40 blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-600/10 dark:bg-blue-500/30 blur-[160px] animate-pulse delay-500" />
      </div>

      {/* Left Panel */}
      <div className="relative hidden lg:flex w-1/2 p-8 flex-col justify-center z-10">
        <div className="h-full w-full rounded-[40px] bg-gradient-to-b dark:from-gray-900 dark:via-gray-800 dark:to-black from-purple-500/40 via-purple-700/40 to-black/40 backdrop-blur-xl border border-white/10 p-12 flex flex-col justify-center transition-colors duration-700">
          <h1 className="text-4xl font-bold mb-4 tracking-wide text-black dark:text-white">
            Flowers & Saints
          </h1>
          <p className="text-lg text-gray-300 dark:text-gray-400 mb-12">
            Begin your journey with a powerful and elegant workflow experience.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 font-medium uppercase tracking-widest">
            ✨ Trusted by 10K+ creators worldwide
          </p>

          <div className="space-y-6">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className="flex items-center gap-4 p-5 bg-white/10 dark:bg-gray-800/20 rounded-2xl backdrop-blur-lg hover:bg-white/20 dark:hover:bg-gray-700/30 transition"
              >
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white dark:bg-gray-200 text-black dark:text-gray-900 font-bold">
                  {step}
                </div>
                <p className="text-lg font-medium text-black dark:text-white">
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
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 z-10 relative">
        

        <div className="w-full max-w-md rounded-[40px] px-8 py-10 bg-white/20 dark:bg-black/40 backdrop-blur-xl border border-white/10 dark:border-gray-700/40 shadow-xl transition-colors duration-700">
          <h2 className="text-3xl font-bold mb-2 text-black dark:text-white">
            Create Account
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Fill in your details to get started.
          </p>

          {/* Social Login Buttons */}
          <div className="grid gap-4 mb-8">
            <button className="flex items-center text-white/50 justify-center gap-3 h-12 bg-white/10 dark:bg-gray-700/20 hover:bg-white/20 dark:hover:bg-gray-600/30 transition rounded-xl border border-gray-700">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="h-6"
              />
              Continue with Google
            </button>

            <button className="flex items-center text-white/50 justify-center gap-3 h-12 bg-white/10 dark:bg-gray-700/20 hover:bg-white/20 dark:hover:bg-gray-600/30 transition rounded-xl border border-gray-700">
              <img
                src="https://www.svgrepo.com/show/512317/github-142.svg"
                className="h-6 invert dark:invert-0"
              />
              Continue with GitHub
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-black text-gray-400 dark:text-gray-400">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                name="firstName"
                type="text"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="h-12 rounded-xl bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 px-4 focus:ring-2 focus:ring-purple-500 outline-none text-gray-900 dark:text-white transition-colors duration-500"
              />
              <input
                name="lastName"
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="h-12 rounded-xl bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 px-4 focus:ring-2 focus:ring-purple-500 outline-none text-gray-900 dark:text-white transition-colors duration-500"
              />
            </div>

            <input
              name="email"
              type="email"
              placeholder="exaple123@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="h-12 w-full rounded-xl bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 px-4 focus:ring-2 focus:ring-purple-500 outline-none text-gray-900 dark:text-white transition-colors duration-500"
            />

            <div>
              <input
                name="password"
                type="password"
                placeholder="Your best Password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
                className="h-12 w-full rounded-xl bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 px-4 focus:ring-2 focus:ring-purple-500 outline-none text-gray-900 dark:text-white transition-colors duration-500"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Must be at least 8 characters.
              </p>
            </div>

            {message && (
              <p className="text-center text-sm text-purple-500 dark:text-purple-400">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 font-medium hover:opacity-90 transition shadow-lg shadow-purple-500/20"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>

            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-purple-500 dark:text-purple-400 hover:underline"
              >
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
