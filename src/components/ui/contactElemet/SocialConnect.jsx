import React from "react";
import { Instagram, Github, Linkedin, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
const SocialConnect = () => {
  return (
    <div className="min-h-screen dark:bg-gredient-to-br from-black-950/50 via-black-900/50 to-black-950/50 flex flex-col items-center justify-center p-4 w-full transition-all duration-500 -mt-150">

      {/* Heading */}
      <motion.div 
      initial={{ opacity: 0.0, y: 50 }}
          whileInView={{ opacity: 1, y: -40 }}
          transition={{
            duration: 0.5,
            delay: 0.2,
            ease: "easeInOut",
          }}
          viewport={{ once: true }}
      className="w-full max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 mb-6">
          Connect <span className="text-black dark:text-white">With Us</span>
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Join our community and stay updated with the latest news & exclusive content.
        </p>
      </motion.div>

      {/* Main Neon Glass Box */}
      <motion.div
      initial={{ opacity: 0.0, y: 50 }}
          whileInView={{ opacity: 1, y: -40 }}
          transition={{
            duration: 0.5,
            delay: 0.2,
            ease: "easeInOut",
          }}
          viewport={{ once: true }}
      className="w-full max-w-2xl">
        <div
          className="rounded-3xl bg-gray-100/20 dark:bg-white/5 border border-gray-300/50 dark:border-gray-700/50 
           backdrop-blur-3xl 
          p-8 transition-all duration-500 hover:scale-[1.01]"
        >
          <div className="flex flex-wrap justify-center gap-10">
            <SocialIcon
              label="Instagram"
              icon={<Instagram size={38} />}
              hoverBg="radial-gradient(circle at 30% 107%, #fdf497, #fd5949, #d6249f, #285AEB)"
              hoverShadow="0 0 20px rgba(225, 48, 108, 0.8)"
            />

            <SocialIcon
              label="Discord"
              icon={<MessageCircle size={38} />}
              hoverBg="linear-gradient(135deg, #7289da, #4e5fc3)"
              hoverShadow="0 0 20px rgba(114, 137, 218, 0.8)"
            />

            <SocialIcon
              label="GitHub"
              icon={<Github size={38} />}
              hoverBg="linear-gradient(135deg, #333, #111)"
              hoverShadow="0 0 20px rgba(255,255,255,0.4)"
            />

            <SocialIcon
              label="LinkedIn"
              icon={<Linkedin size={38} />}
              hoverBg="linear-gradient(135deg, #0077b5, #005582)"
              hoverShadow="0 0 20px rgba(0,119,181,0.8)"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
 
/* ---------------------------------------------------------
      SOCIAL ICON — with 3D Tilt + Floating + Neon Glow
---------------------------------------------------------- */
const SocialIcon = ({ label, hoverBg, hoverShadow, icon }) => {
  return (
    <a
      href="#"
      className="group flex flex-col items-center text-center transition-all duration-300"
    >
      <div
        className="
        relative w-24 h-24 rounded-full flex items-center justify-center 
        bg-gray-200/5 dark:bg-white/5 border border-gray-300 dark:border-white/10
        shadow-xl backdrop-blur-xl overflow-hidden

        /* Floating Animation */
        animate-[float_3s_ease-in-out_infinite]

        /* 3D Hover */
        transition-all duration-300
        group-hover:[transform:rotateX(18deg)_rotateY(18deg)_scale(1.15)]
        group-hover:shadow-2xl
      "
        style={{
          boxShadow: "0 0 30px rgba(255, 255, 255, 0.2)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Neon Hover Glow */}
        <div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
          style={{
            background: hoverBg,
            boxShadow: hoverShadow,
          }}
        />

        {/* Icon */}
        <div className="relative z-10 text-gray-700 dark:text-white group-hover:scale-125 transition-all duration-300">
          {icon}
        </div>
      </div>

      {/* Label */}
      <span className="mt-3 text-gray-700 dark:text-white font-medium opacity-70 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-300">
        {label}
      </span>
    </a>
  );
};

export default SocialConnect;
const floatStyle = document.createElement("style");
floatStyle.innerHTML = `
@keyframes float {
  0%   { transform: translateY(0px); }
  50%  { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}
`;
document.head.appendChild(floatStyle);
