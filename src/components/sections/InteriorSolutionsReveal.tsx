"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function InteriorSolutionsReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Phase 1 → outlined text fades out
  const outlineOpacity = useTransform(scrollYProgress, [0.1, 0.35, 0.55], [1, 0.4, 0]);
  // Phase 2 → image-filled text fades in
  const fillOpacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 0.7, 1]);
  // Scale effect for depth
  const scale = useTransform(scrollYProgress, [0.1, 0.6], [0.92, 1.04]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[220vh]"
      aria-label="Our Interior Solutions"
      id="services"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden marble-bg">
        <motion.div
          style={{ scale }}
          className="relative select-none px-4 text-center"
          aria-hidden="false"
        >
          {/* Outlined text layer */}
          <motion.div
            style={{ opacity: outlineOpacity }}
            className="absolute inset-0 flex flex-col items-center justify-center"
            aria-hidden="true"
          >
            <span className="block font-poppins text-[13vw] font-black uppercase leading-none tracking-tighter text-outlined sm:text-[11vw] lg:text-[10vw]">
              OUR
            </span>
            <span className="block font-poppins text-[13vw] font-black uppercase leading-none tracking-tighter text-outlined sm:text-[11vw] lg:text-[10vw]">
              INTERIOR
            </span>
            <span className="block font-poppins text-[13vw] font-black uppercase leading-none tracking-tighter text-outlined sm:text-[11vw] lg:text-[10vw]">
              SOLUTIONS
            </span>
          </motion.div>

          {/* Image-filled text layer */}
          <motion.div
            style={{ opacity: fillOpacity }}
            className="relative flex flex-col items-center justify-center"
          >
            <span
              className="block font-poppins text-[13vw] font-black uppercase leading-none tracking-tighter text-image-filled sm:text-[11vw] lg:text-[10vw]"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&auto=format&fit=crop&q=80)",
                backgroundSize: "cover",
                backgroundPosition: "center top",
              }}
            >
              OUR
            </span>
            <span
              className="block font-poppins text-[13vw] font-black uppercase leading-none tracking-tighter text-image-filled sm:text-[11vw] lg:text-[10vw]"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&auto=format&fit=crop&q=80)",
                backgroundSize: "150%",
                backgroundPosition: "center 40%",
              }}
            >
              INTERIOR
            </span>
            <span
              className="block font-poppins text-[13vw] font-black uppercase leading-none tracking-tighter text-image-filled sm:text-[11vw] lg:text-[10vw]"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&auto=format&fit=crop&q=80)",
                backgroundSize: "cover",
                backgroundPosition: "center bottom",
              }}
            >
              SOLUTIONS
            </span>
          </motion.div>

          {/* Visible accessible heading */}
          <h2 className="sr-only">Our Interior Solutions</h2>
        </motion.div>
      </div>
    </section>
  );
}
