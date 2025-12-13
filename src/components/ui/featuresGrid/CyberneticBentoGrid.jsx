import React, { useEffect, useRef } from "react";

/* -----------------------------
   Reusable Bento Item
-------------------------------- */
const BentoItem = ({ className = "", children }) => {
  const itemRef = useRef(null);

  useEffect(() => {
    const item = itemRef.current;
    if (!item) return;

    const handleMouseMove = (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      item.style.setProperty("--mouse-x", `${x}px`);
      item.style.setProperty("--mouse-y", `${y}px`);
    };

    const handleMouseLeave = () => {
      item.style.removeProperty("--mouse-x");
      item.style.removeProperty("--mouse-y");
    };

    item.addEventListener("mousemove", handleMouseMove);
    item.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      item.removeEventListener("mousemove", handleMouseMove);
      item.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={itemRef}
      className={`
        bento-item
        p-5 sm:p-6
        rounded-2xl
        border dark:border-amber-50/5 border-black/10
        md:hover:scale-101
        md:hover:shadow-sm
        ${className}
      `}
    >
      {children}
    </div>
  );
};

/* -----------------------------
   Main Bento Grid Component
-------------------------------- */
import { motion } from "motion/react";
export const CyberneticBentoGrid = () => {
  return (
    <motion.div 
      initial={{ opacity: 0.0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: 0.2,
        ease: "easeInOut",
      }}
      viewport={{ once: true }}
      className="main-container md:-mt-10 -mt-50 px-4 sm:px-6">
      <div className="w-full max-w-6xl z-10 mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold dark:text-white text-black/90 text-center mb-6 sm:mb-8">
          Smart D2C + AI Features
        </h1>

        <div className="bento-grid">
          {/* Big Feature */}
          <BentoItem
            className="
              col-span-1
              sm:col-span-2
              lg:col-span-2
              row-span-1
              lg:row-span-2
              flex flex-col justify-between
            "
          >
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold dark:text-white text-black/90">
                AI-Powered Business Analytics
              </h2>
              <p className="mt-2 text-sm sm:text-base text-gray-400">
                Track sales, customer behavior, conversion rates, and product
                performance using real-time AI insights to make smarter
                decisions.
              </p>
            </div>

            <div className="mt-4 h-40 sm:h-48 dark:bg-neutral-800/20 bg-neutral-800/10 rounded-xl flex items-center justify-center text-gray-500 backdrop-blur-3xl">
              Sales & Customer Insights Dashboard
            </div>
          </BentoItem>

          {/* Small Items */}
          <BentoItem>
            <h2 className="text-base sm:text-lg font-bold dark:text-white text-black/90">
              Personalized Shopping
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              AI recommends products based on user behavior, preferences, and
              purchase history to boost conversions.
            </p>
          </BentoItem>

          <BentoItem>
            <h2 className="text-base sm:text-lg font-bold dark:text-white text-black/90">
              AI Customer Support
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              24/7 AI chatbot handles customer queries, order tracking, and FAQs
              without human intervention.
            </p>
          </BentoItem>

          <BentoItem className="col-span-1 lg:row-span-2">
            <h2 className="text-base sm:text-lg font-bold dark:text-white text-black/90">
              Smart Inventory Management
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              AI predicts demand, prevents overstock or shortages, and automates
              restocking decisions.
            </p>
          </BentoItem>

          <BentoItem className="col-span-1 sm:col-span-2">
            <h2 className="text-base sm:text-lg font-bold dark:text-white text-black/90">
              Automated Marketing & Campaigns
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              AI-driven email, WhatsApp, and notification campaigns tailored to
              each customer for higher engagement.
            </p>
          </BentoItem>

          <BentoItem>
            <h2 className="text-base sm:text-lg font-bold dark:text-white text-black/90">
              Secure Payments & Orders
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              End-to-end secure checkout, order tracking, and fraud detection
              powered by intelligent systems.
            </p>
          </BentoItem>
        </div>
      </div>
    </motion.div>
  );
};
