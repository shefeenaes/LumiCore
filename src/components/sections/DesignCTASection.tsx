"use client";

import { motion } from "framer-motion";
import { CheckCircle2, LayoutGrid, Palette, PlaySquare } from "lucide-react";
import { DESIGN_BENEFITS, DESIGN_STEPS } from "@/constants";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

const stepIcons: Record<string, React.ReactNode> = {
  grid: <LayoutGrid className="h-8 w-8" />,
  palette: <Palette className="h-8 w-8" />,
  "play-square": <PlaySquare className="h-8 w-8" />,
};

export function DesignCTASection() {
  return (
    <section
      className="bg-[#111] px-4 py-20 sm:px-6 lg:px-8"
      aria-label="Design Your Villa Interiors Before Spending a Dirham"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl"
        >
          {/* Background image */}
          <Image
            src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&auto=format&fit=crop&q=60"
            alt="Luxury kitchen background"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/60" aria-hidden="true" />

          <div className="relative z-10 grid grid-cols-1 gap-10 p-8 sm:p-10 lg:grid-cols-2 lg:items-center">
            {/* Left content */}
            <div>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Design Your Villa Interiors
                <br />
                <em className="not-italic text-brand-teal">Before Spending a Dirham</em>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-gray-300">
                Upload your villa floor plan and collaborate live with our designers to create a
                full 3D interior concept within an hour.
              </p>

              {/* Benefits */}
              <ul className="mt-5 grid grid-cols-2 gap-2" role="list">
                {DESIGN_BENEFITS.map((benefit) => (
                  <li key={benefit.id} className="flex items-center gap-2 text-sm text-white">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-teal" />
                    {benefit.text}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-8">
                <Button variant="primary" size="lg" withArrow>
                  Start Your 3D Interior Design
                </Button>
              </div>
            </div>

            {/* Right: step cards */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {DESIGN_STEPS.map((step, i) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex flex-col items-center gap-3 rounded-xl border border-brand-teal/30 bg-brand-teal/10 p-4 text-center backdrop-blur-sm"
                >
                  <div className="text-brand-teal">{stepIcons[step.icon]}</div>
                  <p className="text-xs font-medium text-white sm:text-sm">{step.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
