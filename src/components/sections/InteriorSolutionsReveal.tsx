"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/data/services";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Button } from "@/components/ui/Button";
import { CDN } from "@/lib/cloudinary";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const BASE: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-bebas-neue), sans-serif",
  fontWeight: 400,
  textTransform: "uppercase",
  lineHeight: "1.2",
  letterSpacing: "0",
};

const WORDS = ["OUR", "INTERIOR", "SOLUTIONS"] as const;

export function InteriorSolutionsReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const villaRef = useRef<HTMLDivElement>(null);
  const marbleFillRef = useRef<HTMLDivElement>(null);
  const outlineGroupRef = useRef<HTMLDivElement>(null);
  const fillGroupRef = useRef<HTMLDivElement>(null);
  const heroOverlayRef = useRef<HTMLDivElement>(null);
  const blurLayerRef = useRef<HTMLDivElement>(null);
  const blurMaskRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Only spans with reveal-word get fontSize animated — marbleFillRef children
      // intentionally have no reveal-word class so background-clip:text never
      // recomputes during the animation (which would cause jank).
      const wordSpans = gsap.utils.toArray<HTMLElement>(".reveal-word");

      const heroHeading = heroOverlayRef.current?.querySelector<HTMLElement>("h2");
      const realHeading = contentRef.current?.querySelector<HTMLElement>("h2");
      const heroRect = heroHeading?.getBoundingClientRect();
      const realRect = realHeading?.getBoundingClientRect();
      const riseDistance = heroRect && realRect ? realRect.top - heroRect.top : 0;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      // Mirror the CSS clamp(16px, min(18vw, 18vh), 160px) exactly so the
      // GSAP starting size always matches what the static marble layer renders.
      const startFontSize = Math.min(160, Math.max(16, Math.min(vw * 0.18, vh * 0.18)));
      const endFontSize = vw < 640 ? Math.round(vw * 1.6) : 1000;

      const maskState = { outer: 200, inner: 180 };
      const applyMask = () => {
        const m = `radial-gradient(ellipse ${maskState.outer}% ${maskState.inner}% at 50% 50%, transparent 98%, black 100%)`;
        if (blurMaskRef.current) {
          blurMaskRef.current.style.maskImage = m;
          blurMaskRef.current.style.setProperty("-webkit-mask-image", m);
        }
      };
      applyMask();
      gsap.set(wordSpans, { fontSize: startFontSize });

      const cards = gsap.utils.toArray<HTMLElement>(".reveal-card");
      gsap.set(cards, { opacity: 0, y: 50, scale: 0.93 });
      let cardsRevealed = false;
      const revealCards = () => {
        if (cardsRevealed) return;
        cardsRevealed = true;
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: "power3.out",
        });
      };

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 3}`,
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          onLeave: revealCards,
        },
      });

      tl
        // Phase 1: text zooms; marble + outline fade; villa fill reveals through letters
        .to(wordSpans, { fontSize: endFontSize, duration: 0.65 }, 0.05)
        .to(marbleFillRef.current, { opacity: 0, duration: 0.17 }, 0.05)
        .to(outlineGroupRef.current, { opacity: 0, duration: 0.17 }, 0.05)
        .fromTo(fillGroupRef.current, { opacity: 0 }, { opacity: 1, duration: 0.19 }, 0.05)
        .fromTo(villaRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.5)
        .to(fillGroupRef.current, { opacity: 0, duration: 0.12 }, 0.62)
        // Phase 2: hero heading fades in centered
        .fromTo(
          heroOverlayRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.06 },
          0.7
        )
        .fromTo(blurLayerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.12 }, 0.76)
        .to(maskState, { outer: 92, inner: 84, duration: 0.16, onUpdate: applyMask }, 0.76)
        // Phase 3: heading rises to land on real heading
        .to(heroOverlayRef.current, { y: riseDistance, duration: 0.16, ease: "power1.inOut" }, 0.78)
        // Phase 4: handoff to real content
        .to(heroOverlayRef.current, { opacity: 0, duration: 0.03 }, 0.94)
        .fromTo(contentRef.current, { opacity: 0 }, { opacity: 1, duration: 0.03 }, 0.94);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-x-clip bg-[#0d0d0d]"
      aria-label="Our Interior Solutions and Services"
      id="services"
    >
      <div className="absolute inset-x-0 top-0 h-screen overflow-hidden">
        {/* Layer 0: Marble base — full background at start */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${CDN.marbleBg})` }}
          aria-hidden="true"
        />

        {/* Layer 1: Villa image — fades in mid-animation */}
        <div
          ref={villaRef}
          style={{ opacity: 0, backgroundImage: `url(${CDN.villaReveal})` }}
          className="absolute inset-0 bg-cover bg-center"
          aria-hidden="true"
        />

        {/* Layer 2a: Marble clipped inside letters — STATIC font size so
            background-clip:text never recomputes while GSAP is running.
            GSAP only touches opacity on this ref, never fontSize. */}
        <div
          ref={marbleFillRef}
          className="absolute inset-0 flex flex-col items-center justify-center"
          aria-hidden="true"
          style={{
            backgroundImage: `url(${CDN.marbleBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {WORDS.map((w) => (
            <span key={w} style={{ ...BASE, fontSize: "clamp(16px, min(18vw, 18vh), 160px)" }}>
              {w}
            </span>
          ))}
        </div>

        {/* Layer 2b: White stroke outline — HAS reveal-word so GSAP zooms fontSize.
            No background-clip here so font-size changes cause no reflow jank. */}
        <div
          ref={outlineGroupRef}
          className="absolute inset-0 flex flex-col items-center justify-center"
          aria-hidden="true"
        >
          {WORDS.map((w) => (
            <span
              key={w}
              className="reveal-word"
              style={{
                ...BASE,
                fontSize: "clamp(16px, min(18vw, 18vh), 160px)",
                WebkitTextStroke: "0.02em white",
                color: "transparent",
              }}
            >
              {w}
            </span>
          ))}
        </div>

        {/* Layer 3: Villa image through letter shapes — fades in as scroll starts,
            fades out once villa bg is fully revealed. Two sub-layers:
            A) dark fill + white stroke (prevents marble bleeding through stroke gap)
            B) villa image clipped to letter shapes via background-clip:text */}
        <div ref={fillGroupRef} style={{ opacity: 0 }} className="absolute inset-0">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"
          >
            {WORDS.map((w) => (
              <span
                key={w}
                className="reveal-word"
                style={{
                  ...BASE,
                  fontSize: "clamp(16px, min(18vw, 18vh), 160px)",
                  WebkitTextStroke: "0.026em white",
                  color: "#0d0d0d",
                  paintOrder: "stroke fill",
                }}
              >
                {w}
              </span>
            ))}
          </div>
          <div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{
              backgroundImage: `url(${CDN.villaReveal})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {WORDS.map((w) => (
              <span
                key={w}
                className="reveal-word"
                style={{ ...BASE, fontSize: "clamp(16px, min(18vw, 18vh), 160px)" }}
              >
                {w}
              </span>
            ))}
          </div>
        </div>

        {/* Layer 4: Hero heading overlay */}
        <div
          ref={heroOverlayRef}
          style={{ opacity: 0 }}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8"
        >
          <Image
            src={CDN.logoIcon}
            alt=""
            width={72}
            height={72}
            className="pointer-events-none mb-3 h-12 w-12 sm:mb-4 sm:h-[72px] sm:w-[72px]"
            aria-hidden="true"
          />
          <h2 className="text-2xl font-bold text-white sm:text-4xl lg:text-5xl">Our Solutions</h2>
          <p className="mt-1 text-sm font-medium text-white sm:mt-2 sm:text-lg">
            We provide all types of integrated
          </p>
          <p className="mt-1 text-sm font-semibold sm:text-lg" style={{ color: "#57B7C0" }}>
            KITCHEN, CLOSET, DOOR Services
          </p>
        </div>

        {/* Layer 5: Backdrop-blur oval */}
        <div ref={blurLayerRef} style={{ opacity: 0 }} className="absolute inset-0">
          <div
            ref={blurMaskRef}
            className="absolute inset-0"
            style={{
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              backgroundColor: "rgba(35,31,32,0.72)",
            }}
          />
        </div>
      </div>

      {/* Real content */}
      <div
        ref={contentRef}
        style={{ opacity: 0 }}
        className="relative z-10 w-full overflow-hidden pb-16 pt-[12vh] sm:pb-24 sm:pt-[18vh]"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${CDN.villaReveal})`,
            filter: "blur(8px)",
            transform: "scale(1.03)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.7) 100%)",
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:max-w-[1416px]">
          <div className="flex flex-col items-center text-center">
            <Image
              src={CDN.logoIcon}
              alt=""
              width={72}
              height={72}
              className="pointer-events-none mb-3 h-12 w-12 sm:mb-4 sm:h-[72px] sm:w-[72px]"
              aria-hidden="true"
            />
            <h2 className="text-2xl font-bold text-white sm:text-4xl lg:text-5xl">Our Solutions</h2>
            <p className="mt-1 text-sm font-medium text-white sm:mt-2 sm:text-lg">
              We provide all types of integrated
            </p>
            <p className="mt-1 text-sm font-semibold sm:text-lg" style={{ color: "#57B7C0" }}>
              KITCHEN, CLOSET, DOOR Services
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {services.map((service, i) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={i}
                imageClassName="xl:aspect-[664/423] xl:h-auto"
                animateOnScroll={false}
              />
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Button withArrow>Explore Our Projects</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
