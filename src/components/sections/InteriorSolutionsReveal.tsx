"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/data/services";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Button } from "@/components/ui/Button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
  const sectionRef = useRef<HTMLElement>(null);
  const villaRef = useRef<HTMLDivElement>(null);
  const outlineGroupRef = useRef<HTMLDivElement>(null);
  const fillGroupRef = useRef<HTMLDivElement>(null);
  const heroOverlayRef = useRef<HTMLDivElement>(null);
  const blurLayerRef = useRef<HTMLDivElement>(null);
  const blurMaskRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Pins the section like the reference's GSAP-driven `<section id="solutions">`:
  // a `pin-spacer` reserves the scroll distance, the section itself is held in
  // place (transform, not CSS sticky) so its absolutely-positioned spectacle
  // layers can crossfade IN PLACE over the real content sitting beneath them —
  // then the pin releases and the section "catches up" to its natural position,
  // revealing the rest of the grid via ordinary scrolling (nothing is clipped).
  useEffect(() => {
    const ctx = gsap.context(() => {
      const wordSpans = gsap.utils.toArray<HTMLElement>(".reveal-word");

      // Batch all geometry reads BEFORE any GSAP writes so we never interleave
      // a style-write with a geometry-read (which forces a synchronous reflow).
      const heroHeading = heroOverlayRef.current?.querySelector<HTMLElement>("h2");
      const realHeading = contentRef.current?.querySelector<HTMLElement>("h2");
      const heroRect = heroHeading?.getBoundingClientRect();
      const realRect = realHeading?.getBoundingClientRect();
      const riseDistance = heroRect && realRect ? realRect.top - heroRect.top : 0;

      const maskState = { outer: 200, inner: 180 };
      const applyMask = () => {
        const m = `radial-gradient(ellipse ${maskState.outer}% ${maskState.inner}% at 50% 50%, transparent 98%, black 100%)`;
        if (blurMaskRef.current) {
          blurMaskRef.current.style.maskImage = m;
          blurMaskRef.current.style.setProperty("-webkit-mask-image", m);
        }
      };
      applyMask();

      // Cards stay hidden until the pin actually releases — geometry-based
      // triggers (whileInView, a ScrollTrigger on the grid) fire the instant
      // the pin engages, since the grid already sits within the viewport
      // behind the still-hidden hero; the reveal would finish invisibly and
      // the cards would just pop in fully-formed. `onLeave` fires exactly
      // once, the moment the user scrolls past the pinned sequence and the
      // section releases — the natural "later" beat — so the stagger plays
      // out for real, in front of the user, as its own distinct moment.
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
        // Phase 1: text mask zoom (0.05 → 0.74)
        .to(wordSpans, { fontSize: "1000px", duration: 0.65 }, 0.05)
        .to(outlineGroupRef.current, { opacity: 0, duration: 0.17 }, 0.05)
        .fromTo(fillGroupRef.current, { opacity: 0 }, { opacity: 1, duration: 0.19 }, 0.05)
        .fromTo(villaRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.5)
        .to(fillGroupRef.current, { opacity: 0, duration: 0.12 }, 0.62)
        // Phase 2: hero heading fades in CENTERED in the viewport-window (0.70 → 0.76)
        .fromTo(
          heroOverlayRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.06 },
          0.7
        )
        .fromTo(blurLayerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.12 }, 0.76)
        .to(maskState, { outer: 92, inner: 84, duration: 0.16, onUpdate: applyMask }, 0.76)
        // Phase 3: it travels straight up from center toward the exact spot
        // where the real heading sits beneath it — one continuous rise, timed
        // to land precisely as the scroll reaches that point.
        .to(heroOverlayRef.current, { y: riseDistance, duration: 0.16, ease: "power1.inOut" }, 0.78)
        // Phase 4: the instant it arrives, it cuts — fades out and the real
        // content appears immediately in the exact same spot, with no lingering
        // overlap. The "handoff" reads as instantaneous, not a slow dissolve.
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
      {/* Spectacle layers — pinned to the section's top edge and capped at exactly
          one viewport height (NOT `inset-0`, which would size to the section's
          full, taller-than-viewport height and center content far below the
          visible pinned window). This keeps "centered" content centered in the
          viewport-window itself, lining it up with the real heading beneath it
          for a true in-place crossfade. */}
      <div className="absolute inset-x-0 top-0 h-screen overflow-hidden">
        {/* Layer 0: Marble base */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/interior/marble-bg.jpg')" }}
          aria-hidden="true"
        />

        {/* Layer 1: Villa image */}
        <div
          ref={villaRef}
          style={{ opacity: 0, backgroundImage: "url('/images/interior/villa-reveal.jpg')" }}
          className="absolute inset-0 bg-cover bg-center"
          aria-hidden="true"
        />

        {/* Layer 2: Outlined text */}
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
                fontSize: "160px",
                WebkitTextStroke: "3px white",
                color: "transparent",
              }}
            >
              {w}
            </span>
          ))}
        </div>

        {/* Layer 3: Image-masked growing text */}
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
                  fontSize: "160px",
                  WebkitTextStroke: "4px white",
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
              backgroundImage: "url('/images/interior/villa-reveal.jpg')",
              backgroundSize: "cover",
              backgroundAttachment: "fixed",
              backgroundPosition: "center",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {WORDS.map((w) => (
              <span key={w} className="reveal-word" style={{ ...BASE, fontSize: "160px" }}>
                {w}
              </span>
            ))}
          </div>
        </div>

        {/* Layer 4: Hero heading overlay — lands centered in the viewport, then
            rises to land exactly on top of the real heading beneath it, where
            it cuts over to the real content in a single instantaneous beat */}
        <div
          ref={heroOverlayRef}
          style={{ opacity: 0 }}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8"
        >
          <Image
            src="/images/brand/logo-icon.png"
            alt=""
            width={72}
            height={72}
            className="pointer-events-none mb-4"
            aria-hidden="true"
          />
          <h2 className="text-4xl font-bold text-white lg:text-5xl">Our Solutions</h2>
          <p className="mt-2 text-lg font-medium text-white">We provide all types of integrated</p>
          <p className="mt-1 text-lg font-semibold" style={{ color: "#57B7C0" }}>
            KITCHEN, CLOSET, DOOR Services
          </p>
        </div>

        {/* Layer 5: Backdrop-blur oval frame */}
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

      {/* Real content — normal flow, sets the section's natural (taller-than-
          viewport) height. Its heading sits in the same screen region as the
          hero overlay above (in-place crossfade); the grid + button extend
          below the fold and reveal via ordinary scrolling once the pin releases —
          nothing here is ever forced into a fixed, clipped viewport. */}
      <div
        ref={contentRef}
        style={{ opacity: 0 }}
        className="relative z-10 w-full overflow-hidden pb-20 pt-[16vh] sm:pb-24 sm:pt-[18vh]"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/interior/villa-reveal.jpg')",
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
              src="/images/brand/logo-icon.png"
              alt=""
              width={72}
              height={72}
              className="pointer-events-none mb-4"
              aria-hidden="true"
            />
            <h2 className="text-4xl font-bold text-white lg:text-5xl">Our Solutions</h2>
            <p className="mt-2 text-lg font-medium text-white">
              We provide all types of integrated
            </p>
            <p className="mt-1 text-lg font-semibold" style={{ color: "#57B7C0" }}>
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
