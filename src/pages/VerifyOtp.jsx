"use client";

import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function VerifyOtp() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const email = localStorage.getItem("resetEmail");
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const verify = async () => {
    const otpCode = otp.join("");

    if (otpCode.length !== 4) {
      setMsg("Enter 4-digit OTP");
      return;
    }

    try {
      setIsLoading(true);

      await axios.post("https://mern-backend-f5oi.onrender.com/api/password/verify", {
        email,
        otp: otpCode,
      });

      navigate("/reset-password");
    } catch (err) {
      setMsg(err.response?.data?.message || "Invalid OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    axios
      .post("https://mern-backend-f5oi.onrender.com/api/password/forgot", { email })
      .then(() => setMsg("OTP resent successfully"))
      .catch(() => setMsg("Error resending OTP"));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="relative w-full max-w-sm overflow-hidden rounded-3xl shadow-2xl">
        {/* Background GIF + Purple/Dark Gradient */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://media.giphy.com/media/xJT7pzbviKNqTqF1Ps/giphy.gif"
            alt="Animation"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 
            bg-gradient-to-b 
            from-purple-700/80 via-purple-900/90 to-black/95" />
        </div>

        <div className="relative z-10 p-8 py-14">
          <div className="text-center mb-8">
            <div className="w-8 h-8 mx-auto mb-6 text-white">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M13 0L4 14h6l-2 10 9-14h-6l2-10z" />
              </svg>
            </div>

            <h1 className="text-2xl font-semibold text-white mb-3">
              Enter verification code
            </h1>

            <p className="text-white/70 text-sm leading-relaxed">
              We sent a 4-digit code to  
              <br />
              <span className="text-white">{email}</span>
            </p>
          </div>

          {msg && <p className="text-red-400 text-center mb-3">{msg}</p>}

          {/* OTP Inputs */}
          <div className="flex justify-center gap-4 mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                inputMode="numeric"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="
                  w-14 h-14 text-center text-xl font-medium
                  bg-white/10 text-white border-white/20
                  focus:bg-white/20 focus:border-white/40
                  rounded-2xl outline-none transition-all"
              />
            ))}
          </div>

          {/* Resend */}
          <div className="text-center mb-8">
            <span className="text-white/60 text-sm">Didn't get the code? </span>
            <button
              onClick={handleResend}
              className="text-white/80 hover:text-white text-sm font-medium transition"
            >
              Resend
            </button>
          </div>

          {/* Verify Button */}
          <button
            onClick={verify}
            disabled={isLoading}
            className="
              w-full py-3 rounded-2xl bg-purple-600 
              hover:bg-purple-700 text-white font-semibold
              transition shadow-xl"
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>

          {/* Footer */}
          <p className="text-white/50 text-xs text-center mt-6">
            By continuing, you agree to our{" "}
            <span className="underline">Terms</span> &{" "}
            <span className="underline">Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
}
