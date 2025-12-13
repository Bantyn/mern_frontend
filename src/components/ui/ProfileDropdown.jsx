"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Settings, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import clsx from "clsx";

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div ref={ref} className="relative">
      {/* Avatar Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={clsx(
          "h-9 w-9 rounded-full flex items-center justify-center",
          "bg-white/10 dark:bg-black/30",
          "border border-white/10",
          "backdrop-blur-md",
          "hover:ring-2 hover:ring-violet-400/40 transition"
        )}
      >
        <User className="h-4 w-4 text-black dark:text-white" />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className={clsx(
              "absolute right-0 mt-3 w-48 rounded-xl overflow-hidden",
              "bg-white/80 dark:bg-black/70 backdrop-blur-xl",
              "border border-white/10 shadow-xl z-50"
            )}
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-white/10">
              <p className="text-sm font-semibold text-black dark:text-white">
                My Account
              </p>
              <p className="text-xs opacity-60">user@email.com</p>
            </div>

            {/* Links */}
            <div className="py-1">
              <DropdownItem to="/profile" icon={User} label="Profile" />
              <DropdownItem to="/settings" icon={Settings} label="Settings" />

              <button
                onClick={logout}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-500/10"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Item                                                                        */
/* -------------------------------------------------------------------------- */

function DropdownItem({ to, icon: Icon, label }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-2 px-4 py-2 text-sm text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5"
    >
      <Icon size={16} />
      {label}
    </Link>
  );
}
