"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";
import { PROBLEM_POINTS } from "@/constants";
import { CDN } from "@/lib/cloudinary";
import { ApproachSection } from "./ApproachSection";
import { DesignCTASection } from "./DesignCTASection";

const EASE = [0.22, 1, 0.36, 1] as const;

// Card slides in from below as soon as it enters view — reads as a direct
// continuation of the previous section's reveal rather than a soft fade.
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 120, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: EASE },
  },
};

// Stagger container for heading / copy / list / video
const stackVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

const listVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const listItemVariants: Variants = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } },
};

export function ProblemSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section
      className="bg-white px-4 py-20 sm:px-6 lg:px-8"
      aria-label="Why villa interior projects become difficult"
    >
      <div className="mx-auto max-w-6xl 2xl:max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={cardVariants}
          className="rounded-2xl bg-[#231F20] p-8 sm:p-10"
        >
          <motion.div
            variants={stackVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Heading */}
            <motion.h2
              variants={fadeUpVariants}
              className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.6rem]"
            >
              Why Villa Interior Projects Often Become Difficult?
            </motion.h2>
            <motion.p
              variants={fadeUpVariants}
              className="mt-4 max-w-4xl text-sm leading-7 text-white/80 sm:text-base"
            >
              When interior systems are sourced from multiple suppliers, the process becomes
              fragmented, making it difficult to coordinate a consistent final result. The lack of
              commitment leads to :
            </motion.p>

            {/* Problem grid */}
            <motion.ul
              variants={listVariants}
              className="mt-6 grid grid-cols-1 gap-x-12 gap-y-3 sm:grid-cols-2"
              role="list"
              aria-label="Problems caused by fragmented suppliers"
            >
              {PROBLEM_POINTS.map((point) => (
                <motion.li
                  key={point.id}
                  variants={listItemVariants}
                  className="flex items-center gap-3 text-lg font-semibold text-white"
                >
                  <svg
                    width="34"
                    height="34"
                    viewBox="0 0 34 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 28.5599C23.392 28.5599 28.56 23.3919 28.56 16.9999C28.56 10.6079 23.392 5.43994 17 5.43994C10.608 5.43994 5.44 10.6079 5.44 16.9999C5.44 23.3919 10.608 28.5599 17 28.5599ZM17 6.79994C22.644 6.79994 27.2 11.3559 27.2 16.9999C27.2 22.6439 22.644 27.1999 17 27.1999C11.356 27.1999 6.8 22.6439 6.8 16.9999C6.8 11.3559 11.356 6.79994 17 6.79994Z"
                      fill="white"
                    />
                    <path
                      d="M16.796 23.5958L23.392 16.9998L16.796 10.4038L15.844 11.3558L21.488 16.9998L15.844 22.6438L16.796 23.5958Z"
                      fill="white"
                    />
                    <path d="M22.44 16.3198H10.88V17.6798H22.44V16.3198Z" fill="white" />
                  </svg>

                  <span className="">{point.label}</span>
                </motion.li>
              ))}
            </motion.ul>

            {/* Video */}
            <motion.div
              variants={fadeUpVariants}
              className="mt-8 overflow-hidden rounded-xl border border-white/10"
            >
              <div className="group relative aspect-video w-full">
                {/* Poster image — hidden once playing */}
                <Image
                  src={CDN.videoPoster}
                  alt="Craftsman working with wood — precision manufacturing"
                  fill
                  sizes="(max-width: 1024px) 100vw, 1115px"
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                    playing ? "opacity-0" : "opacity-100"
                  }`}
                />

                {/* Video — fades in when playing */}
                <video
                  src={CDN.customerJourney}
                  playsInline
                  preload="none"
                  controls={playing}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                    playing ? "opacity-100" : "pointer-events-none opacity-0"
                  }`}
                >
                  Your browser does not support the video tag.
                </video>

                {/* Dark overlay — hidden once playing */}
                {!playing && <div className="absolute inset-0 bg-black/20" aria-hidden="true" />}

                {/* Play button */}
                {!playing && (
                  <motion.button
                    type="button"
                    aria-label="Play customer journey video"
                    onClick={(e) => {
                      setPlaying(true);
                      const video = e.currentTarget.parentElement?.querySelector("video");
                      video?.play();
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute left-1/2 top-1/2 z-20 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-transparent text-white"
                  >
                    <Play className="ms-1 h-12 w-12 fill-current" aria-hidden="true" />
                  </motion.button>
                )}
              </div>
            </motion.div>

            {/* Approach content — moved here, sits under the video */}
            <motion.div variants={fadeUpVariants}>
              <ApproachSection />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      <DesignCTASection />
    </section>
  );
}
