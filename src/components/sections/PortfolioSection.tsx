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
      className="bg-[#111] px-4 py-20 sm:px-6 lg:px-8"
      id="projects"
      aria-label="Portfolio — Designed. Built. Delivered."
    >
      <div className="mx-auto max-w-5xl">
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
                  ? "border-brand-teal bg-brand-teal text-black"
                  : "border-white/20 bg-transparent text-white hover:border-white/50"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Portfolio grid */}
        <div className="grid auto-rows-[220px] grid-cols-2 gap-3 sm:auto-rows-[260px] sm:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <PortfolioTile key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <Button variant="teal" size="lg">
            Explore Projects
          </Button>
        </div>
      </div>
    </section>
  );
}

function PortfolioTile({ item }: { item: PortfolioItem }) {
  const spanClass = {
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
      <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" aria-hidden="true" />
    </motion.div>
  );
}
