import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TestimonialsColumn } from "../components/ui/testominals/testimonials-columns-1.jsx";

// Testimonials Datas fetching Reviews API in Future 
const testimonials = [
  {
    text: "This Web3-powered platform transformed the way our organization operates. From smart automation to real-time finance tracking, everything feels futuristic and incredibly efficient.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Briana Patton",
    role: "Operations Manager",
  },
  {
    text: "The AI-driven insights are on another level. Integrating the MERN stack with Gemini AI gives us unmatched speed, reliability, and automation across our workflows.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Bilal Ahmed",
    role: "IT Manager",
  },
  {
    text: "Their support team is outstanding. From onboarding to optimization, they helped us unlock the full power of AI automation in our operations.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Saman Malik",
    role: "Customer Support Lead",
  },
  {
    text: "The seamless Web3 integration and AI-powered modules drastically improved our data security, efficiency, and decision-making. Truly next-gen technology.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Omar Raza",
    role: "CEO",
  },
  {
    text: "With intelligent dashboards and real-time analytics, our team works faster and smarter. This solution boosted our productivity like never before.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Zainab Hussain",
    role: "Project Manager",
  },
  {
    text: "Implementation was incredibly smooth. The platform is built with clean UI, powerful features, and outstanding AI capabilities. Highly recommended!",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Aliza Khan",
    role: "Business Analyst",
  },
  {
    text: "Our marketing operations improved instantly. The AI workflows automate repetitive tasks and help us make data-driven decisions effortlessly.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Farhan Siddiqui",
    role: "Marketing Director",
  },
  {
    text: "They understood our requirements perfectly and delivered a high-performance platform that blends AI, security, and Web3 capabilities flawlessly.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Sana Sheikh",
    role: "Sales Manager",
  },
  {
    text: "Our online performance doubled after switching. With smart automation and seamless AI tools, our conversions and workflow efficiency skyrocketed.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Hassan Ali",
    role: "E-commerce Manager",
  },
];

// Splitting Testimonials into 3 Columns
const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

// Icons
import {
  MdAdminPanelSettings,
  MdSecurity,
  MdSettings,
  MdSupervisorAccount,
  MdVerifiedUser,
  MdSupportAgent,
} from "react-icons/md";
import { section } from "framer-motion/client";

export default function Web3HeroAnimated() {
 

  return (
    <>
      {/* LandingHero Section */}
      <LandingHero/>

      {/* Second Section */}
      <SecondaryHero/>

      {/* Testimonial */}
      <Testimonials/>

      {/* Last Part */}
      <LastPart/>
    </>
  );
}


// ===============================
// Landing Hero Page Section
// ===============================
export const LandingHero = () => {
  const [isMounted, setIsMounted] = useState(false);
   const pillars = [
    92, 84, 78, 70, 62, 54, 46, 34, 18, 34, 46, 54, 62, 70, 78, 84, 92,
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);
  return(<>
      <section className="relative w-full pt-20 isolate h-screen overflow-hidden bg-white/90 dark:bg-black text-black dark:text-white transition-all duration-500">
        {/* Background gradients */}
        <div
          aria-hidden
          className="absolute inset-0 -z-30 transition-all duration-500"
          style={{
            backgroundImage: [
              "radial-gradient(60% 50% at 50% 50%, rgba(255,255,255,0.35), rgba(245,245,245,0.00))",
              "radial-gradient(55% 45% at 20% 10%, rgba(255,228,210,0.20), transparent 70%)",
              "radial-gradient(55% 50% at 85% 20%, rgba(205,225,255,0.18), transparent 65%)",
              "linear-gradient(to bottom, rgba(0,0,0,0.06), rgba(0,0,0,0))",
            ].join(","),
          }}
        />

        {/* 🌙 Dark Mode override */}
        <div
          className="absolute inset-0 -z-20 hidden dark:block transition-all duration-500"
          style={{
            backgroundImage: [
              "radial-gradient(70% 50% at 50% 50%, rgba(170,240,230,0.22), rgba(160,150,255,0.18), rgba(255,180,150,0.17), rgba(50,40,10,0.85))",
              "radial-gradient(60% 45% at 18% 10%, rgba(130,220,210,0.18), rgba(190,170,255,0.12), transparent 70%)",
              "radial-gradient(55% 45% at 88% 20%, rgba(255,190,170,0.14), rgba(240,220,120,0.12), transparent 60%)",
              "linear-gradient(to bottom, rgba(0,0,0,0.32), transparent 40%)",
            ].join(","),
          }}
        />

        <div className="absolute inset-0 -z-20 bg-[radial-gradient(140%_120%_at_50%_0%,transparent_60%,rgba(0,0,0,0.85))]" />

        {/* Grid overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 mix-blend-screen opacity-30"
          style={{
            backgroundImage: [
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.09) 0 1px, transparent 1px 96px)",
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 24px)",
              "repeating-radial-gradient(80% 55% at 50% 52%, rgba(255,255,255,0.08) 0 1px, transparent 1px 120px)",
            ].join(","),
          }}
        />

        {/* HERO TEXT */}
        <div className="relative z-10 mx-auto max-w-5xl text-center px-6 py-20">
          <div className={`${isMounted ? "animate-fadeInUp" : "opacity-0"}`}>
            <span className="inline-flex items-center gap-2 rounded-full bg-black/5 dark:bg-white/5 px-3 py-1 text-[11px] uppercase text-black/70 dark:text-white/70 ring-1 ring-black/10 dark:ring-white/10 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-black/70 dark:bg-white/70 "></span>
              Introducing the Future of Business Intelligence
            </span>

            <h1
              style={{ animationDelay: "200ms" }}
              className={`${
                isMounted ? "animate-fadeInUp" : "opacity-0"
              } mt-6 text-4xl font-bold md:text-6xl`}
            >
              MERN + Geminiai AI Powered{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                Web3
              </span>{" "}
              Platform
            </h1>

            <p
              style={{ animationDelay: "300ms" }}
              className={`${
                isMounted ? "animate-fadeInUp" : "opacity-0"
              } mx-auto mt-5 max-w-2xl text-black/80 md:text-lg dark:text-white/80`}
            >
              A next-generation ecosystem that blends the power of the MERN
              stack with Gemini AI and Web3 technology. Automate workflows,
              enhance security, and scale your business with intelligent
              decentralized solutions.
            </p>

            <div
              style={{ animationDelay: "400ms" }}
              className={`${
                isMounted ? "animate-fadeInUp" : "opacity-0"
              } mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row`}
            >
              <Link
                to="/login"
                className="dark:text-black/80 dark:bg-white/80 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-black/20 hover:text-black transition-all duration-350"
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                className="rounded-full border border-black/50 dark:border-white/40 px-6 py-3 text-sm font-semibold  text-black/70 dark:text-white/80 hover:bg-black/90 dark:hover:bg-white/90 dark:hover:text-black transition-all duration-350 hover:text-white "
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>

        {/* PARTNERS */}
        <div className="relative z-10 mx-auto mt-10 max-w-6xl px-6 pb-24 opacity-70">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-6">
            {[
              "MongoDB Atlas",
              "Node.js",
              "React.js",
              "Express.js",
              "Firebase",
              "Vercel",
              "OpenAI Gemini",
              "Solidity / Web3.js",
            ].map((brand) => (
              <div
                key={brand}
                className="text-xs uppercase tracking-wider text-black/70 dark:text-white/70"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>

        {/* PULSE GLOW */}
        <div className="absolute bottom-[128px] left-1/2 z-0 h-36 w-28 -translate-x-1/2 rounded-md bg-gradient-to-b from-white/75 via-rose-100/60 to-transparent animate-pulse-soft" />

        {/* PILLARS */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[54vh]">
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 dark:from-black dark:via-black/70 to-transparent"></div>

          <div className="absolute inset-x-0 bottom-0 flex h-full items-end gap-px px-[2px]">
            {pillars.map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-black/10 dark:bg-black dark:hover:bg-black transition-all duration-[1000ms]"
                style={{
                  height: isMounted ? `${h}%` : "0%",
                  transitionDelay: `${
                    Math.abs(i - Math.floor(pillars.length / 2)) * 60
                  }ms`,
                }}
              />
            ))}
          </div>
        </div>
      </section>
  </>)
}

// ===============================
// Secondary Hero Page Section
// ===============================
const SecondaryHero = () =>  {
  return(
    <>
      <section className="bg-white/90 dark:bg-black text-black dark:text-white transition-all duration-500">
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative flex flex-col mt-50 gap-4 items-center justify-center px-4"
        >
          <div className="text-3xl md:text-7xl font-bold  dark:text-white text-center">
            Lightning-Fast, AI-Enhanced & Future-Ready
          </div>
          <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
            Experience unmatched performance, smooth animations, and intelligent
            automation designed for modern businesses.
          </div>

          {/* <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
            Explore Features
          </button> */}
        </motion.div>
      </section>
    </>
  )
} 
// ===============================
// Testimonials Section
// =============================== 
const Testimonials = () => {
  return(
    <>
      <section className="bg-background my-20 relative  bg-white/90 dark:bg-black text-black dark:text-white transition-all duration-500">
        <div className="container z-10 mx-auto">
          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: "easeInOut",
            }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
          >
            <div className="flex justify-center">
              <div className="border py-1 px-4 mt-30 rounded-lg dark:text-white/50  dark:hover:text-white/80 text-black/30 bg-amber-50/5 hover:text-black transition-all ease-in-out duration-150 hover:scale-105">
                Testimonials
              </div>
            </div>

            <h2 className="text-black/90 text-xl dark:text-white/80 sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5">
              What Our Clients Say
            </h2>
            <p className="text-black/90 text-center mt-5 opacity-75 dark:text-white/75">
              Real feedback from teams who transformed their workflow with our
              AI-powered Web3 platform.
            </p>
          </motion.div>

          <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
            <TestimonialsColumn testimonials={firstColumn} duration={15} />
            <TestimonialsColumn
              testimonials={secondColumn}
              className=" hidden md:block"
              duration={19}
            />
            <TestimonialsColumn
              testimonials={thirdColumn}
              className="hidden lg:block"
              duration={17}
            />
          </div>
        </div>
      </section>
    </>
  )
}
// ===============================
// Last Part Section
// ===============================
const LastPart = () => {
  return(
    <>
      <section>
        <div className="h-screen -mb-150 w-full overflow-hidden">
          <div className="mx-auto mt-32  w-full max-w-2xl">
            <motion.div
              initial={{ opacity: 0.0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.35,
                ease: "easeInOut",
              }}
              viewport={{ once: true }}
              className="text-center text-4xl text-foreground"
            >
              <span className="text-indigo-900 dark:text-indigo-200">
                Trusted by Industry Leaders
                <br />
                <span>Empowering teams across the globe</span>
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0.0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: "easeInOut",
              }}
              viewport={{ once: true }}
              className="mt-34 -mb-70 grid grid-cols-5 text-zinc-900 text-center dark:text-white z-20"
            >
              <div className="flex flex-col items-center  gap-2">
                <MdAdminPanelSettings
                  size={40}
                  className="text-black/80 dark:text-white/80 hover:text-purple-400"
                />
                <span className="text-sm hover:text-black/80 font-extrabold text-gray-500 dark:hover:text-white ">
                  Admin <br /> Control
                </span>
              </div>

              <div className="flex flex-col items-center  gap-2">
                <MdSecurity
                  size={40}
                  className="text-black/80 dark:text-white/80 hover:text-purple-400"
                />
                <span className="text-sm hover:text-black/80 font-extrabold text-gray-500 dark:hover:text-white ">
                  Security <br /> Shield
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <MdSupportAgent
                  size={40}
                  className="text-black/80 dark:text-white/80 hover:text-purple-400"
                />
                <span className="text-sm hover:text-black/80 font-extrabold  text-gray-500 dark:hover:text-white ">
                  AI <br />
                  Support
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <MdSettings
                  size={40}
                  className="text-black/80 dark:text-white/80 hover:text-purple-400"
                />
                <span className="text-sm hover:text-black/80 font-extrabold text-gray-500 dark:hover:text-white ">
                  System <br />
                  Settings
                </span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <MdSupervisorAccount
                  size={40}
                  className="text-black/80 dark:text-white/80 hover:text-purple-400"
                />
                <span className="text-sm hover:text-black/80 font-extrabold text-gray-500 dark:hover:text-white ">
                  Supervision Panel
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0.0, y: 50 }}
          whileInView={{ opacity: 1, y: -40 }}
          transition={{
            duration: 0.8,
            delay: 0.45,
            ease: "easeInOut",
          }}
          viewport={{ once: true }}
          className="relative mt-32  h-100 w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)]"
        >
          <div className="absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#8350e8,transparent_70%)] before:opacity-40" />
          <div className="absolute -left-1/2 top-1/2 aspect-[1/0.7] z-10 w-[200%] rounded-[100%] border-t border-zinc-900/20 dark:border-white/20 bg-white dark:bg-zinc-900" />
        </motion.div>
      </section>
    </>
  )
}