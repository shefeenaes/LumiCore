"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { services } from "@/data/services";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Button } from "@/components/ui/Button";
import IdealFactoryMarkIcon from "@/components/ui/icons/IdealFactoryMarkIcon";

export function SolutionsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // ── Oval → full rectangle ──
  // Insets shrink to 0 so the oval div expands to cover full viewport
  const ovalTop    = useTransform(scrollYProgress, [0.0, 0.28], ["8%",  "0%"]);
  const ovalBottom = useTransform(scrollYProgress, [0.0, 0.28], ["8%",  "0%"]);
  const ovalLeft   = useTransform(scrollYProgress, [0.0, 0.28], ["4%",  "0%"]);
  const ovalRight  = useTransform(scrollYProgress, [0.0, 0.28], ["4%",  "0%"]);
  const ovalRadius = useTransform(scrollYProgress, [0.0, 0.28], ["50%", "0%"]);

  // Overlay darkens the oval image slightly while framed, clears when full
  const overlayOpacity = useTransform(scrollYProgress, [0.0, 0.28], [0.45, 0.65]);

  // ── Hero text: visible at start, moves up and fades ──
  const heroOpacity = useTransform(scrollYProgress, [0.10, 0.32], [1, 0]);
  const heroY       = useTransform(scrollYProgress, [0.10, 0.32], [0, -80]);

  // ── Grid: slides up and fades in after oval is full ──
  const gridOpacity = useTransform(scrollYProgress, [0.32, 0.50], [0, 1]);
  const gridY       = useTransform(scrollYProgress, [0.32, 0.50], [60, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[450vh]"
      aria-label="Our Solutions"
      id="solutions"
    >
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Dark marble base — visible outside the oval */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/interior/marble-bg.jpg')" }}
          aria-hidden="true"
        />

        {/* Oval image frame that expands to full viewport on scroll */}
        <motion.div
          style={{
            position: "absolute",
            top: ovalTop,
            bottom: ovalBottom,
            left: ovalLeft,
            right: ovalRight,
            borderRadius: ovalRadius,
            overflow: "hidden",
          }}
        >
          {/* bg-2-image.jpg fills the oval */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/interior/villa-reveal.jpg')" }}
            aria-hidden="true"
          />
          {/* Transparent dark overlay on the image */}
          <motion.div
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 bg-black"
            aria-hidden="true"
          />
        </motion.div>

        {/* ── Hero text: centered inside the oval, moves up and fades ── */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center"
        >
          <IdealFactoryMarkIcon
            width={80}
            height={80}
            primaryColor="#ffffff"
            secondaryColor="#ffffff"
          />
          <h2 className="mt-5 text-4xl font-bold text-white lg:text-5xl">
            Our Solutions
          </h2>
          <p className="mt-3 text-lg font-medium text-white">
            We provide all type of modular
          </p>
          <p className="mt-1 text-lg font-semibold text-brand-teal">
            KITCHEN, CLOSET, DOOR Services
          </p>
        </motion.div>

        {/* ── Grid: fades in after oval is fully expanded ── */}
        <motion.div
          style={{ opacity: gridOpacity, y: gridY }}
          className="absolute inset-0 overflow-y-auto"
        >
          <div className="mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Our Solutions
              </h2>
              <p className="mt-2 text-gray-300">We provide all type of modular</p>
              <p className="font-semibold text-brand-teal">
                KITCHEN, CLOSET, DOOR Services
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {services.map((service, i) => (
                <ServiceCard key={service.id} service={service} index={i} />
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <Button withArrow>Explore Our Projects</Button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
