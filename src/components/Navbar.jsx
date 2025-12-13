import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

// Icons
import {
  Home,
  Info,
  Phone,
  Upload,
  MessageCircle,
  LogIn,
  UserPlus,
  LogOut,
  Bot,
} from "lucide-react";
import ProfileDropdown from "./ui/ProfileDropdown.jsx";
import ActionSearchBar from "./ui/searchBar/ActionSearchBar";
import clsx from "clsx";

export default function Navbar() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("");
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  // MENU CONFIG
  const loggedInItems = [
    { name: "Home", url: "/home", icon: Home },
    { name: "About", url: "/about", icon: Info },
    { name: "Support", url: "/support", icon: Bot },
    { name: "Contact", url: "/contact", icon: Phone },
    // After put here profile
    { name: "Upload", url: "/upload", icon: Upload },
    { name: "Logout", url: "/logout", icon: LogOut },
  ];

  const guestItems = [
    { name: "Logo", url: "/", icon: Home },
    { name: "About", url: "/about", icon: Info },
    { name: "Contact", url: "/contact", icon: Phone },
    { name: "Login", url: "/login", icon: LogIn },
    { name: "Signup", url: "/signup", icon: UserPlus },
  ];

  const items = isLoggedIn ? loggedInItems : guestItems;

  // Detect active route
  useEffect(() => {
    const current = items.find((item) => location.pathname === item.url);
    if (current) setActiveTab(current.name);
  }, [location.pathname]);

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 bg-white/10 dark:bg-black/30 backdrop-blur-sm border border-white/10 px-2 py-2 rounded-full shadow-xl shadow-amber-50/3">
      <Link to="/home" className="hidden md:block px-4 text-lg font-extrabold tracking-wide bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
  ELECTRA
</Link>

        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;

          return (
            
            <Link
              key={item.name}
              to={item.url}
              onClick={() => setActiveTab(item.name)}
              className={clsx(
                "relative px-5 py-2 rounded-full text-sm font-semibold transition-colors",
                "text-black/70 dark:text-white/70 hover:text-black dark:hover:text-violet-400",
                isActive && "text-black dark:text-violet-400"
              )}
            >
              {/* Desktop Text */}
              <span className="hidden md:inline">{item.name}</span>

              {/* Mobile Icon */}
              <span className="md:hidden">
                <Icon size={20} strokeWidth={2.2} />
              </span>

              {/* Active Animated Lamp */}
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-full bg-black/10 dark:bg-violet-400/10 -z-10"
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  }}
                >
                  {/* Glow */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-black dark:bg-violet-300 rounded-t-full">
                    <div className="absolute w-12 h-6 bg-black/30 md:dark:bg-violet-400/40 dark:bg-violet-400/20 blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-black/30 md:dark:bg-violet-400/40 dark:bg-violet-400/20 blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-black/30 md:dark:bg-violet-400/40 dark:bg-violet-400/20 blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </Link>
          );
        })}
      <ActionSearchBar />
      {isLoggedIn && <ProfileDropdown />}

      </div>

    </div>
  );
}
