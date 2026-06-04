"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioItems } from "@/data/portfolio";
import { Button } from "@/components/ui/Button";
import type { PortfolioCategory, PortfolioItem } from "@/types";
import { cn } from "@/lib/utils";

const categories: { id: PortfolioCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "kitchen", label: "Kitchen" },
  { id: "door", label: "Door" },
  { id: "closet", label: "Closet" },
  { id: "upvc-windows", label: "uPVC Windows" },
];

export function PortfolioSection() {
  const [active, setActive] = useState<PortfolioCategory>("all");

  const filtered = useMemo(
    () =>
      active === "all"
        ? portfolioItems
        : portfolioItems.filter((item) => item.category === active || item.category === "all"),
    [active]
  );

  return (
    <section
      className="relative overflow-hidden bg-[#231F20] px-4 py-20 sm:px-6 lg:px-8"
      id="projects"
      aria-label="Portfolio — Designed. Built. Delivered."
    >
      {/* Decorative top-left background — masked & tinted to primary color */}
      <div
        className="bg-primary pointer-events-none absolute left-0 top-0 z-0 h-[280px] w-[200px] sm:h-[450px] sm:w-[320px] lg:h-[1020px] lg:w-[296px] xl:h-full xl:w-full"
        style={{
          WebkitMaskImage: "url('/images/portfolio/section-bg.png')",
          maskImage: "url('/images/portfolio/section-bg.png')",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "left top",
          maskPosition: "left top",
          WebkitMaskSize: "contain",
          maskSize: "contain",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Designed. Built. Delivered</h2>
        </div>

        {/* Filter tabs */}
        <div
          className="mb-8 flex flex-wrap justify-center gap-2"
          role="tablist"
          aria-label="Filter portfolio by category"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={active === cat.id}
              onClick={() => setActive(cat.id)}
              className={cn(
                "rounded-full border px-5 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal",
                active === cat.id
                  ? "border-primary bg-primary text-black"
                  : "border-white/20 bg-transparent text-white hover:border-white/50"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Portfolio grid */}
        <div className="grid auto-rows-[150px] grid-cols-2 gap-4 sm:auto-rows-[316px] sm:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <PortfolioTile key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <Button withArrow>Explore Projects</Button>
        </div>
      </div>
    </section>
  );
}

function PortfolioTile({ item }: { item: PortfolioItem }) {
  const spanClass = {
    feature: "col-span-2 row-span-2",
    tall: "row-span-2",
    wide: "col-span-2",
    normal: "",
  }[item.span ?? "normal"];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className={cn("group relative overflow-hidden rounded-xl", spanClass)}
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 400px"
      />
      <div
        className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20"
        aria-hidden="true"
      />
    </motion.div>
  );
}
