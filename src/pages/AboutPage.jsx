"use client";

import { useRef, React } from "react";
import HeroScrollDemo from "../components/ui/scrollScreen/HeroScrollDemo";
import SocialConnect from "../components/ui/contactElemet/SocialConnect";
import { CyberneticBentoGrid } from "../components/ui/featuresGrid/CyberneticBentoGrid";
import { motion, useInView } from "motion/react";
import { Zap } from "lucide-react";

export default function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0.0}}
            whileInView={{ opacity: 1}}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: "easeInOut",
            }}
            viewport={{ once: true }}
      className="relative w-full overflow-hidden
  bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.15),transparent_60%),radial-gradient(circle_at_bottom,rgba(168,85,247,0.15),transparent_60%)]
  dark:bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_60%),radial-gradient(circle_at_bottom,rgba(168,85,247,0.12),transparent_60%)]"
    >   
      <div className="w-full">
        {/* About hero Section */}
        <AboutSection/>
        {/* About Featured grid */}
        <CyberneticBentoGrid />
        {/* About Scroll Tab */}
        <HeroScrollDemo />
        {/* Social Connect */}
        <SocialConnect />
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* About hero section                                                          */
/* -------------------------------------------------------------------------- */

/* ------------------------------------
   Reusable Timeline Animation Component
------------------------------------- */

/* <TimelineContent
  as="p"
  animationNum={0}
  timelineRef={sectionRef}
>
  Animated text
</TimelineContent>
 
we can you this time line with change as="p" || "button" || "span"
*/
export const TimelineContent = ({
  children,
  animationNum = 0,
  className = "",
  timelineRef,
  as = "div",
  customVariants,
  once = false,
  ...props
}) => {
  const defaultVariants = {
    visible: (i) => ({
      filter: "blur(0px)",
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.5,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(20px)",
      y: 0,
      opacity: 0,
    },
  };

  const variants = customVariants || defaultVariants;
  const isInView = useInView(timelineRef, { once });

  const MotionComponent = motion[as] || motion.div;

  return (
    <MotionComponent
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={animationNum}
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};
/* -------------------------------------------------------------------------- */
/* About Section                                                              */
/* -------------------------------------------------------------------------- */
export function AboutSection() {
  const heroRef = useRef(null);

  const revealVariants = {
    visible: (i) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 1.5,
        duration: 0.7,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: 40,
      opacity: 0,
    },
  };

  const textVariants = {
    visible: (i) => ({
      filter: "blur(0px)",
      opacity: 1,
      transition: {
        delay: i * 0.3,
        duration: 0.7,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      opacity: 0,
    },
  };

  return (
    <section className="py-32 px-4 mt-20 md:mt-15 min-h-screen">
      <div className="max-w-6xl mx-auto" ref={heroRef}>
        <div className="flex flex-col lg:flex-row items-start gap-8">
          <div className="flex-1">
            {/* Heading */}
            <TimelineContent
              as="h1"
              animationNum={0}
              timelineRef={heroRef}
              customVariants={revealVariants}
              className="text-2xl sm:text-4xl md:text-5xl font-semibold !leading-[110%] text-gray-900 dark:text-white/90 mb-8"
            >
              We are{" "}
              <TimelineContent
                as="span"
                animationNum={1}
                timelineRef={heroRef}
                customVariants={textVariants}
                className="text-blue-600 border-2 border-blue-500 inline-block xl:h-16 border-dotted px-2 rounded-md"
              >
                rethinking
              </TimelineContent>{" "}
              vehicle charging to be more reliable and always you-first. Our
              goal is to continually raise the bar and{" "}
              <TimelineContent
                as="span"
                animationNum={2}
                timelineRef={heroRef}
                customVariants={textVariants}
                className="text-orange-600 border-2 border-orange-500 inline-block xl:h-16 border-dotted px-2 rounded-md"
              >
                challenge
              </TimelineContent>{" "}
              how things could{" "}
              <TimelineContent
                as="span"
                animationNum={3}
                timelineRef={heroRef}
                customVariants={textVariants}
                className="text-green-600 border-2 border-green-500 inline-block xl:h-16 border-dotted px-2 rounded-md"
              >
                work for you.
              </TimelineContent>
            </TimelineContent>

            {/* Footer */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
              <TimelineContent
                as="div"
                animationNum={4}
                timelineRef={heroRef}
                customVariants={textVariants}
                className="sm:text-xl text-sm"
              >
                <div className="font-medium text-gray-900 dark:text-white/90 mb-1 capitalize">
                  We are Electra and we will
                </div>
                <div className="text-gray-600 dark:text-white/20 font-semibold uppercase">
                  take you further
                </div>
              </TimelineContent>

              <TimelineContent
                as="button"
                animationNum={5}
                timelineRef={heroRef}
                customVariants={textVariants}
                className="bg-blue-600 gap-2 font-medium shadow-lg shadow-blue-600 text-white h-12 px-6 m-auto w-40 rounded-full text-sm inline-flex md:mr-0 mx-auto items-center cursor-pointer"
              >
                <Zap fill="white" size={16} />
                About Electra
              </TimelineContent>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
