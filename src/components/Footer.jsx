export default function Footer() {
  return (
    <footer className="dark:bg-black dark:text-white/70 py-20 mt-20 relative overflow-hidden border-t border-gray-900">

      {/* Glow Background Animated */}
      <div className="absolute -top-20 left-0 h-56 w-56 bg-purple-500/20 blur-[120px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-0 right-0 h-56 w-56 bg-blue-500/20 blur-[120px] rounded-full animate-pulse"></div>
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-16 relative z-10">

        {/* Brand Section */}
        <div className="animate-fadeInUp">
          <h2 className="text-4xl font-extrabold dark:text-white/70 mb-6 tracking-wide">
            MERN Project
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            A modern full-stack solution built with React, Node, Express & MongoDB.
            Fast, elegant, and highly scalable.
          </p>
        </div>

        {/* Quick Links */}
        <div className="animate-fadeInUp delay-150">
          <h3 className="text-2xl font-semibold dark:text-white/70 mb-6">
            Quick Links
          </h3>
          <ul className="space-y-3 text-lg">
            {["Home", "About", "Contact", "Upload"].map((link) => (
              <li key={link} className="group">
                <a
                  href="#"
                  className="relative text-gray-700 hover:dark:text-white/70 transition-all"
                >
                  {link}

                  {/* Animated underline */}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Policies */}
        <div className="animate-fadeInUp delay-300">
          <h3 className="text-2xl font-semibold dark:text-white/70 mb-6">
            Legal
          </h3>
          <ul className="space-y-3 text-lg">
            {["Privacy Policy", "Terms of Service", "Support"].map((link) => (
              <li key={link} className="group">
                <a
                  href="#"
                  className="relative text-gray-700 hover:dark:text-white/70 transition-all"
                >
                  {link}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-gray-600 mt-16 pt-6 border-t border-gray-900 animate-fadeIn">
        &copy; {new Date().getFullYear()} MERN Project. All rights reserved.
      </div>
    </footer>
  );
}
