"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { services } from "@/data/services";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Button } from "@/components/ui/Button";
import IdealFactoryMarkIcon from "@/components/ui/icons/IdealFactoryMarkIcon";

// fontSize drives the zoom (NOT scale) — background-attachment:fixed breaks
// inside CSS transform contexts, so we animate layout size instead.
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

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // PHASE 1 — Text mask zoom (0.00 → 0.58)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const fontSize = useTransform(
    scrollYProgress,
    [0.04, 0.52],
    ["160px", "1000px"],
  );

  // Outlined rest state: visible at start, fades as image fill begins
  const outlineOpacity = useTransform(
    scrollYProgress,
    [0.0, 0.04, 0.14],
    [1, 1, 0],
  );

  // Image-filled text: fades in → holds at peak → fades out as bg becomes full
  const fillOpacity = useTransform(
    scrollYProgress,
    [0.04, 0.16, 0.50, 0.58],
    [0, 1, 1, 0],
  );

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // SHARED LAYER — bg-2-image.jpg container (full screen → oval → full screen)
  //
  // This single div serves Phase 1 AND the oval animation:
  //   • Phase 1 peak: full screen (insets=0%), fades in mid-zoom so outside
  //     the letters also shows the villa image → seamless text-fade blend.
  //   • Transition: insets animate to 8%/4% + radius 50% → oval forms.
  //   • Phase 3: insets back to 0% → oval expands to fill screen again.
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const villaBgOpacity = useTransform(scrollYProgress, [0.38, 0.52], [0, 1]);

  // top / bottom inset (8% at oval peak)
  const ovalTB = useTransform(
    scrollYProgress,
    [0.56, 0.66, 0.80, 0.87],
    ["0%", "8%", "8%", "0%"],
  );
  // left / right inset (4% at oval peak — wider oval)
  const ovalLR = useTransform(
    scrollYProgress,
    [0.56, 0.66, 0.80, 0.87],
    ["0%", "4%", "4%", "0%"],
  );
  const ovalRadius = useTransform(
    scrollYProgress,
    [0.56, 0.66, 0.80, 0.87],
    ["0%", "50%", "50%", "0%"],
  );

  // Dark scrim on the oval image — makes hero text legible while framed
  const ovalOverlay = useTransform(
    scrollYProgress,
    [0.56, 0.66, 0.80, 0.87],
    [0, 0.45, 0.45, 0],
  );

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // PHASE 2 — "Our Solutions" hero card (0.68 → 0.84)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const heroOpacity = useTransform(
    scrollYProgress,
    [0.68, 0.74, 0.78, 0.84],
    [0, 1, 1, 0],
  );
  const heroY = useTransform(
    scrollYProgress,
    [0.68, 0.74, 0.78, 0.84],
    [30, 0, 0, -40],
  );

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // PHASE 3 — Services grid (0.87 → 0.94)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const gridOpacity = useTransform(scrollYProgress, [0.87, 0.94], [0, 1]);
  const gridY = useTransform(scrollYProgress, [0.87, 0.94], [60, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[700vh]"
      aria-label="Our Interior Solutions and Services"
      id="services"
    >
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ── Layer 0: Dark marble base — always visible ── */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/bg-2.jpg')" }}
          aria-hidden="true"
        />

        {/* ── Layer 1: Villa bg — full screen during text peak, contracts to oval,
            then expands back. One div drives both the blend AND the oval reveal. ── */}
        <motion.div
          style={{
            opacity: villaBgOpacity,
            position: "absolute",
            top: ovalTB,
            bottom: ovalTB,
            left: ovalLR,
            right: ovalLR,
            borderRadius: ovalRadius,
            overflow: "hidden",
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/bg-2-image.jpg')" }}
            aria-hidden="true"
          />
          {/* Scrim: darkens image when framed so text is readable */}
          <motion.div
            style={{ opacity: ovalOverlay }}
            className="absolute inset-0 bg-black"
            aria-hidden="true"
          />
        </motion.div>

        {/* ── Layer 2: Outlined text (rest state) ── */}
        <motion.div
          style={{ opacity: outlineOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center"
          aria-hidden="true"
        >
          {WORDS.map((w) => (
            <motion.span
              key={w}
              style={{
                ...BASE,
                fontSize,
                WebkitTextStroke: "3px white",
                color: "transparent",
              }}
            >
              {w}
            </motion.span>
          ))}
        </motion.div>

        {/* ── Layer 3: Image-masked growing text ──
            Two sublayers rendered at the same position/size:
            A) dark fill + white stroke (paint-order: stroke fill) — the stroke
               is painted first, then the dark fill covers the inward half, leaving
               only the outer ring. Eliminates crooked-edge artefacts on R / E / N.
            B) transparent text + background-clip:text + background-attachment:fixed
               — villa image is pinned to the viewport and revealed only through the
               letterforms. As font grows, more of the image shows through.          ── */}
        <motion.div style={{ opacity: fillOpacity }} className="absolute inset-0">

          {/* Sublayer A: clean outer stroke, dark fill */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"
          >
            {WORDS.map((w) => (
              <motion.span
                key={w}
                style={{
                  ...BASE,
                  fontSize,
                  WebkitTextStroke: "4px white",
                  color: "#0d0d0d",
                  paintOrder: "stroke fill",
                }}
              >
                {w}
              </motion.span>
            ))}
          </div>

          {/* Sublayer B: villa image clipped to letterforms */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{
              backgroundImage: "url('/images/bg-2-image.jpg')",
              backgroundSize: "cover",
              backgroundAttachment: "fixed",
              backgroundPosition: "center",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {WORDS.map((w) => (
              <motion.span key={w} style={{ ...BASE, fontSize }}>
                {w}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* ── Layer 4: "Our Solutions" hero card — shown while oval is stable ── */}
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
            We provide all types of integrated
          </p>
          <p className="mt-1 text-lg font-semibold" style={{ color: "#57B7C0" }}>
            KITCHEN, CLOSET, DOOR Services
          </p>
        </motion.div>

        {/* ── Layer 5: Services grid — fades in after oval expands to full screen ── */}
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
              <p className="font-semibold" style={{ color: "#57B7C0" }}>
                KITCHEN, CLOSET, DOOR Services
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {services.map((service, i) => (
                <ServiceCard key={service.id} service={service} index={i} />
              ))}
            </div>
            <div className="mt-12 flex justify-center">
              <Button variant="teal" size="lg" withArrow>
                Explore Our Projects
              </Button>
            </div>
          </div>
        </motion.div>

      </div>

      <h2 className="sr-only">Our Interior Solutions</h2>
    </section>
  );
}
