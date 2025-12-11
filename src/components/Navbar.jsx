import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useRef, useState } from "react";

export default function Navbar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [open, setOpen] = useState(false);

  const isLoggedIn = Boolean(localStorage.getItem("token"));

  // MENUS
  const loggedInMenu = ["Home", "About", "Contact", "Upload", "Support", "Logout"];
  const guestMenu = ["About", "Contact", "Login", "Signup"];

  const menuItems = isLoggedIn ? loggedInMenu : guestMenu;

  return (
    <motion.nav
      ref={ref}
      initial={{ y: -30, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="
        dark:bg-black/10 bg-white/10  backdrop-blur-xs top-0 z-50 border border-white/10
        fixed left-0 right-0 w-[90%] mx-auto px-10 mb-3 shadow-2xl
        dark:shadow-purple-600/10  rounded-b-xl overflow-hidden
      "
    >
      <div className="container mx-auto py-4 px-6 flex justify-between items-center">

        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide text-black dark:text-white hover:text-violet-950 dark:hover:text-violet-300 transition"
        >
          MERN Project
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 dark:text-gray-300  text-lg">
          {menuItems.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <Link
                to={
                  item === "Home"
                    ? "/home"
                    : `/${item.toLowerCase()}`
                }
                className="relative group px-1"
              >
                <span className="dark:hover:text-white hover:text-black/80 dark:font-bold transition-all duration-300">{item}</span>
                <span className="
                  absolute left-0 -bottom-1 h-[2px] w-0 
                  bg-violet-950 dark:bg-purple-400 group-hover:w-full 
                  transition-all duration-300 rounded-full
                "></span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden dark:text-white/80 text-black/80 dark:hover:text-white hover:text-black
          transition ease-in-out duration-300"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="md:hidden overflow-hidden"
      >
        <div className="flex flex-col gap-1 text-center font-bold pb-4 dark:text-gray-300  text-lg">

          {menuItems.map((item) => (
            <Link
              key={item}
              to={
                item === "Home"
                  ? "/home"
                  : `/${item.toLowerCase()}`
              }
              onClick={() => setOpen(false)}
              className="py-4 backdrop-blur-3xl bg-black/10 border-b border-white/10 hover:border-white/30 hover:bg-white/5 rounded-full dark:hover:text-white transition"
            >
              {item}
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
}



