"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { testimonials } from "@/data/testimonials";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import ArrowCircleIcon from "@/components/ui/icons/ArrowCircleIcon";

const ACTIVE_FILL = "#57B7C0";

// Tracks whether a CSS media query currently matches (SSR-safe)
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);
  return matches;
}

export function TestimonialsSection() {
  const [page, setPage] = useState(0);
  // Which arrow was last clicked; null means none yet → Next stays active by default
  const [active, setActive] = useState<"prev" | "next" | null>(null);

  // 1 card per page on mobile, 2 from the `sm` breakpoint (640px) up
  const isSmUp = useMediaQuery("(min-width: 640px)");
  const perPage = isSmUp ? 2 : 1;

  // Group testimonials into pages of perPage
  const pages = useMemo(() => {
    const out: (typeof testimonials)[] = [];
    for (let i = 0; i < testimonials.length; i += perPage) {
      out.push(testimonials.slice(i, i + perPage));
    }
    return out;
  }, [perPage]);

  const totalPages = pages.length;

  // When perPage changes the page count changes — keep the index in range
  useEffect(() => {
    setPage((p) => Math.min(p, totalPages - 1));
  }, [totalPages]);

  // Wrap around: past the end → back to first; before the start → last
  const prev = () => {
    setActive("prev");
    setPage((p) => (p - 1 + totalPages) % totalPages);
  };
  const next = () => {
    setActive("next");
    setPage((p) => (p + 1) % totalPages);
  };

  // Next is active by default (active === null); otherwise the last-clicked arrow is active
  const prevFill = active === "prev" ? ACTIVE_FILL : "transparent";
  const nextFill = active === "prev" ? "transparent" : ACTIVE_FILL;

  return (
    <section
      className="bg-[#161616] px-4 py-20 sm:px-6 lg:px-8"
      id="testimonials"
      aria-label="Testimonials"
    >
      <div className="mx-auto max-w-6xl 2xl:max-w-7xl">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Left: label + heading + nav */}
          <div className="flex flex-col justify-start">
            <p className="mb-2 font-inter text-2xl tracking-widest text-primary">Testimonials</p>
            <h2 className="font-inter text-2xl text-white sm:text-2xl">
              What They&apos;re Talking About Company ?
            </h2>

            {/* Navigation */}
            <div className="mt-6 flex gap-3" role="group" aria-label="Testimonial navigation">
              {/* Prev — inactive style (outline / transparent fill), icon mirrored */}
              <button
                onClick={prev}
                aria-label="Previous testimonials"
                className="rounded-full transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <ArrowCircleIcon
                  width={44}
                  height={44}
                  color="white"
                  fill={prevFill}
                  className="-scale-x-100"
                />
              </button>

              {/* Next — active style (teal fill) */}
              <button
                onClick={next}
                aria-label="Next testimonials"
                className="rounded-full transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <ArrowCircleIcon width={44} height={44} color="white" fill={nextFill} />
              </button>
            </div>
          </div>

          {/* Right: testimonial carousel (linear scroll track).
              overflow-x-clip hides the off-screen slides horizontally while
              leaving the cards' top/bottom glow shadow visible. */}
          <div className="overflow-x-clip lg:col-span-2">
            <motion.div
              className="flex"
              animate={{ x: `-${page * 100}%` }}
              transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
            >
              {pages.map((group, i) => (
                <div key={i} className="grid w-full shrink-0 grid-cols-1 gap-5 sm:grid-cols-2">
                  {group.map((testimonial) => (
                    <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
