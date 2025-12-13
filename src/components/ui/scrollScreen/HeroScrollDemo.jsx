"use client";
import React from "react";
import { ContainerScroll } from "./container-scroll-animation";
import { motion } from "framer-motion";
export default function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden pb-[200px] pt-[10px]">
      <ContainerScroll
        titleComponent={
          <>
            <motion.div
              initial={{ opacity: 0.0, y: 50 }}
              whileInView={{ opacity: 1, y: -40 }}
              transition={{
                duration: 0.4,
                delay: 0.3,
                ease: "easeInOut",
              }}
              viewport={{ once: true }}
            >
              <h1 className="text-4xl font-semibold text-black dark:text-white">
                Unleash the power of <br />
                <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                  Scroll Animations
                </span>
              </h1>
            </motion.div>
          </>
        }
      >
        <img
          src="https://miro.medium.com/max/1400/0*E5in3inmExe6N9WK"
          alt="hero"
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable="false"
        />
      </ContainerScroll>
    </div>
  );
}
