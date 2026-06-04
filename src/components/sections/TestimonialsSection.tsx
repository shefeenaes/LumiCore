"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { testimonials } from "@/data/testimonials";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import ArrowCircleIcon from "@/components/ui/icons/ArrowCircleIcon";

const PER_PAGE = 2;

export function TestimonialsSection() {
  const [page, setPage] = useState(0);

  // Group testimonials into pages of PER_PAGE
  const pages = useMemo(() => {
    const out: (typeof testimonials)[] = [];
    for (let i = 0; i < testimonials.length; i += PER_PAGE) {
      out.push(testimonials.slice(i, i + PER_PAGE));
    }
    return out;
  }, []);

  const totalPages = pages.length;

  // Wrap around: past the end → back to first; before the start → last
  const prev = () => setPage((p) => (p - 1 + totalPages) % totalPages);
  const next = () => setPage((p) => (p + 1) % totalPages);

  return (
    <section
      className="bg-[#161616] px-4 py-20 sm:px-6 lg:px-8"
      id="testimonials"
      aria-label="Testimonials"
    >
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Left: label + heading + nav */}
          <div className="flex flex-col justify-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-teal">
              Testimonials
            </p>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              What They&apos;re Talking About Company ?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Real villa owners across the UAE have trusted Ideal Factory for kitchens, closets,
              doors and uPVC window systems.
            </p>

            {/* Navigation */}
            <div className="mt-6 flex gap-3" role="group" aria-label="Testimonial navigation">
              {/* Prev — inactive style (outline / transparent fill), icon mirrored */}
              <button
                onClick={prev}
                aria-label="Previous testimonials"
                className="rounded-full transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
              >
                <ArrowCircleIcon
                  width={44}
                  height={44}
                  color="white"
                  fill="transparent"
                  className="-scale-x-100"
                />
              </button>

              {/* Next — active style (teal fill) */}
              <button
                onClick={next}
                aria-label="Next testimonials"
                className="rounded-full transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
              >
                <ArrowCircleIcon width={44} height={44} color="white" fill="#57B7C0" />
              </button>
            </div>
          </div>

          {/* Right: testimonial carousel (linear scroll track) */}
          <div className="overflow-hidden lg:col-span-2">
            <motion.div
              className="flex"
              animate={{ x: `-${page * 100}%` }}
              transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
            >
              {pages.map((group, i) => (
                <div
                  key={i}
                  className="grid w-full shrink-0 grid-cols-1 gap-5 sm:grid-cols-2"
                >
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
