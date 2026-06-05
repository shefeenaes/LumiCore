"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import IdealFactoryMarkIcon from "@/components/ui/icons/IdealFactoryMarkIcon";
import { services } from "@/data/services";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Button } from "@/components/ui/Button";

const BASE: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-lexend), sans-serif",
  fontWeight: 700,
  textTransform: "uppercase",
  lineHeight: "1.1",
  letterSpacing: "-0.01em",
};

const WORDS = ["OUR", "INTERIOR", "SOLUTIONS"] as const;

export function InteriorSolutionsReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // ── PHASE 1: Text mask zoom (0.00 → 0.50) ───────────────────────
  const fontSize       = useTransform(scrollYProgress, [0.04, 0.46], ["160px", "1000px"]);
  const outlineOpacity = useTransform(scrollYProgress, [0.0, 0.04, 0.14], [1, 1, 0]);
  const fillOpacity    = useTransform(scrollYProgress, [0.04, 0.16, 0.42, 0.50], [0, 1, 1, 0]);
  // Villa bg fades in mid-zoom so letter blend is seamless
  const villaBgOpacity = useTransform(scrollYProgress, [0.32, 0.46], [0, 1]);

  // ── PHASE 2: Content appears instantly, then oval closes in (0.48 → 0.72) ─
  //
  // Sequence:
  //   1. Villa bg reaches full opacity → content is immediately visible (no fade-in)
  //   2. Backdrop-blur overlay fades in from the outer EDGES of the screen
  //   3. The transparent oval hole starts HUGE (almost full-screen) so the blur
  //      is barely a ring at the edges, then CONTRACTS to standard oval size —
  //      this is the "closing in from outside" effect
  //   4. Oval stabilises, framing the content
  //
  // Content opacity: near-instant (0.47 → 0.50) so it feels "already there"
  const contentOpacity = useTransform(scrollYProgress, [0.47, 0.51], [0, 1]);

  // Blur overlay fades in as the oval closes
  const blurLayerOpacity = useTransform(scrollYProgress, [0.50, 0.60], [0, 1]);

  // Oval mask: the TRANSPARENT hole starts huge (200% × 180%) and contracts
  // to the standard framing oval (92% × 84%).  Everything OUTSIDE the hole
  // gets the blur+tint treatment.
  const ovalMask = useTransform(scrollYProgress,
    [0.52, 0.72, 1.0],
    [
      "radial-gradient(ellipse 200% 180% at 50% 50%, transparent 98%, black 100%)",
      "radial-gradient(ellipse  92%  84% at 50% 50%, transparent 98%, black 100%)",
      "radial-gradient(ellipse  92%  84% at 50% 50%, transparent 98%, black 100%)",
    ]
  );

  // ── PHASE 3: Content scrolls up through the oval window (0.76 → 1.0) ─
  // The oval stays fixed. The heading+grid block moves upward:
  // heading exits through the top of the oval, grid cards come into view.
  // No additional fade — the block is already fully visible.
  const contentY = useTransform(scrollYProgress, [0.76, 1.0], ["0vh", "-75vh"]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[1200vh]"
      aria-label="Our Interior Solutions and Services"
      id="services"
    >
      {/* clipPath clips visually without creating a scroll container;
          overflow-x-clip also removes the giant scaling text from the page's
          horizontal scroll width so it can never push past the viewport */}
      <div
        className="sticky top-0 h-screen overflow-x-clip"
        style={{ clipPath: "inset(0)" }}
      >

        {/* Layer 0: Marble base (Phase 1 background) */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/interior/marble-bg.jpg')" }}
          aria-hidden="true"
        />

        {/* Layer 1: Villa image — full screen, always */}
        <motion.div
          style={{ opacity: villaBgOpacity, backgroundImage: "url('/images/interior/villa-reveal.jpg')" }}
          className="absolute inset-0 bg-cover bg-center"
          aria-hidden="true"
        />

        {/* Layer 2: Outlined text (Phase 1 rest state) */}
        <motion.div
          style={{ opacity: outlineOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center"
          aria-hidden="true"
        >
          {WORDS.map((w) => (
            <motion.span key={w} style={{ ...BASE, fontSize, WebkitTextStroke: "3px white", color: "transparent" }}>
              {w}
            </motion.span>
          ))}
        </motion.div>

        {/* Layer 3: Image-masked growing text (Phase 1) */}
        <motion.div style={{ opacity: fillOpacity }} className="absolute inset-0">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            {WORDS.map((w) => (
              <motion.span key={w} style={{ ...BASE, fontSize, WebkitTextStroke: "4px white", color: "#0d0d0d", paintOrder: "stroke fill" }}>
                {w}
              </motion.span>
            ))}
          </div>
          <div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ backgroundImage: "url('/images/interior/villa-reveal.jpg')", backgroundSize: "cover", backgroundAttachment: "fixed", backgroundPosition: "center", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}
          >
            {WORDS.map((w) => (
              <motion.span key={w} style={{ ...BASE, fontSize }}>{w}</motion.span>
            ))}
          </div>
        </motion.div>

        {/* Layer 4: Heading + grid — appears instantly as villa bg reaches full opacity.
            The oval (Layer 5) then closes in around this content from the outside.
            contentY drives the scroll-up: heading exits top, grid reveals below. */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY, top: "10vh" }}
          className="absolute left-0 right-0"
        >
          <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">

            <div className="mb-10 pt-4 text-center">
              <IdealFactoryMarkIcon
                width={72}
                height={72}
                primaryColor="#ffffff"
                secondaryColor="#ffffff"
              />
              <h2 className="mt-4 text-4xl font-bold text-white lg:text-5xl">
                Our Solutions
              </h2>
              <p className="mt-2 text-lg font-medium text-white">
                We provide all types of integrated
              </p>
              <p className="mt-1 text-lg font-semibold" style={{ color: "#57B7C0" }}>
                KITCHEN, CLOSET, DOOR Services
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {services.map((service, i) => (
                <ServiceCard key={service.id} service={service} index={i} />
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <Button withArrow>Explore Our Projects</Button>
            </div>

          </div>
        </motion.div>

        {/* Layer 5: Backdrop-blur oval — fades in AFTER content is visible,
            starts as a huge transparent hole (barely a blur ring at edges),
            contracts to standard oval, framing the content below.         */}
        <motion.div
          style={{ opacity: blurLayerOpacity, maskImage: ovalMask, WebkitMaskImage: ovalMask }}
          className="absolute inset-0"
          aria-hidden="true"
        >
          <div
            className="absolute inset-0"
            style={{ backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", backgroundColor: "rgba(35,31,32,0.72)" }}
          />
        </motion.div>

      </div>

      <h2 className="sr-only">Our Interior Solutions</h2>
    </section>
  );
}
