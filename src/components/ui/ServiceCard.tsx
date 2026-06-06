"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Service } from "@/types";

type ServiceCardProps = {
  service: Service;
  index: number;
  /** Extra classes for the photo wrapper — use breakpoint-prefixed `aspect-[w/h]` + `h-auto` to override the default clamp()-based height on larger screens only. */
  imageClassName?: string;
  /** When false, skip Framer Motion's own viewport-triggered entrance — an
   * external scroll system (e.g. GSAP ScrollTrigger) drives opacity/transform
   * instead, marked via the `reveal-card` class. Needed inside pinned sections,
   * where IntersectionObserver sees the card as "in view" the instant the pin
   * engages — long before the user actually gets to see it — so the built-in
   * entrance finishes invisibly and the card just pops in fully-formed. */
  animateOnScroll?: boolean;
};

export function ServiceCard({
  service,
  index,
  imageClassName,
  animateOnScroll = true,
}: ServiceCardProps) {
  const Icon = service.icon;
  const scrollAnim = animateOnScroll
    ? {
        initial: { opacity: 0, y: 50, scale: 0.93 },
        whileInView: { opacity: 1, y: 0, scale: 1 },
        viewport: { once: true, margin: "150px 0px" },
        transition: { duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] as const },
      }
    : { initial: false as const };
  return (
    <motion.article
      {...scrollAnim}
      className={cn(
        "group flex flex-col overflow-hidden rounded-[10px] border border-white/5 bg-[rgba(35,31,32,0.8)] backdrop-blur-[2px]",
        !animateOnScroll && "reveal-card"
      )}
      aria-label={service.title}
    >
      {/* Image */}
      <div className={cn("relative h-[clamp(220px,32vh,380px)] overflow-hidden", imageClassName)}>
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          sizes="(max-width: 1024px) calc(100vw - 2.5rem), 600px"
        />

        {/* Top gradient overlay */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"
          aria-hidden="true"
        />

        {/* Service icon badge */}
        <div className="absolute left-[26px] top-[26px] flex h-14 w-14 items-center justify-center rounded-[10px] bg-white">
          <Icon className="h-[34px] w-[34px]" color="#57B7C0" />
        </div>
      </div>

      {/* Content row: text left, arrow right */}
      <div className="flex w-full flex-1 flex-row items-center justify-between px-5 py-5">
        <div>
          <h4 className="font-inter text-2xl font-semibold leading-[1.3] text-white">
            {service.title}
          </h4>
          <p className="font-inter text-base font-normal leading-[1.5] text-white/90">
            {service.description}
          </p>
        </div>

        <div className="mt-auto flex justify-end">
          <button
            type="button"
            aria-label={`Learn more about ${service.title}`}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-primary transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(87,183,192,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ArrowRight className="h-4 w-4 text-white" aria-hidden="true" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
