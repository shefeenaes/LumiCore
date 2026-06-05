"use client";

import { motion } from "framer-motion";
import { DESIGN_BENEFITS, DESIGN_STEPS } from "@/constants";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function DesignCTASection() {
  return (
    <section
      className="bg-white px-4 pt-10 sm:px-6 lg:px-8"
      aria-label="Design Your Villa Interiors Before Spending a Dirham"
    >
      <div className="mx-auto max-w-6xl 2xl:max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl"
        >
          {/* Background image */}
          <Image
            src="/images/design-cta/bg.jpg"
            alt="Luxury kitchen background"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
          {/* Overlay 1: flat tint */}
          <div className="absolute inset-0 bg-[#0e0e0e]/60" aria-hidden="true" />
          {/* Overlay 2: gradient tint */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#0e0e0e]/75 via-[#0e0e0e]/20 to-[#0e0e0e]/65"
            aria-hidden="true"
          />

          <div className="relative z-10 grid grid-cols-1 p-8 sm:p-10 lg:grid-cols-2 lg:items-center">
            {/* Left content */}
            <div>
              <h2 className="text-[32px] font-semibold text-white">
                Design Your Villa Interiors
                <br />
                <em className="not-italic text-primary">Before Spending a Dirham</em>
              </h2>
              <p className="mt-4 font-inter text-base font-light leading-relaxed text-white">
                Upload your villa floor plan and collaborate live with our designers to create a
                full 3D interior concept within an hour.
              </p>

              {/* Benefits */}
              <ul
                className="mt-5 grid grid-cols-1 justify-start gap-x-8 gap-y-2 sm:grid-cols-[auto_auto]"
                role="list"
              >
                {DESIGN_BENEFITS.map((benefit) => (
                  <li
                    key={benefit.id}
                    className="flex items-center gap-2 font-inter text-sm font-extralight text-white"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.50001 15C8.4851 15.0012 9.46072 14.8078 10.3708 14.4308C11.2809 14.0538 12.1076 13.5007 12.8033 12.8033C13.5007 12.1076 14.0538 11.2809 14.4308 10.3708C14.8078 9.46072 15.0012 8.4851 15 7.50001C15.0012 6.51491 14.8078 5.53929 14.4308 4.62919C14.0538 3.71909 13.5007 2.89245 12.8033 2.19676C12.1076 1.49932 11.2809 0.946213 10.3708 0.569224C9.46072 0.192235 8.4851 -0.00120906 7.50001 5.68573e-06C6.51491 -0.00120906 5.53929 0.192235 4.62919 0.569224C3.71909 0.946213 2.89245 1.49932 2.19676 2.19676C1.49932 2.89245 0.946213 3.71909 0.569224 4.62919C0.192235 5.53929 -0.00120906 6.51491 5.68573e-06 7.50001C-0.00120906 8.4851 0.192235 9.46072 0.569224 10.3708C0.946213 11.2809 1.49932 12.1076 2.19676 12.8033C2.89245 13.5007 3.71909 14.0538 4.62919 14.4308C5.53929 14.8078 6.51491 15.0012 7.50001 15Z"
                        fill="white"
                      />
                      <path
                        d="M4.5 7.5L6.75 9.75L11.25 5.25"
                        stroke="black"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    {benefit.text}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-8">
                <Button withArrow>Start Your 3D Interior Design</Button>
              </div>
            </div>

            {/* Right: step cards */}
            <div className="grid grid-cols-1 justify-items-center gap-3 pt-10 sm:grid-cols-3 sm:gap-10 md:pt-0">
              {DESIGN_STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex h-[200px] w-full flex-col items-center justify-center rounded-xl border border-primary p-4 text-center backdrop-blur-sm sm:w-[160px]"
                  >
                    <div className="rounded-full border-primary bg-primary p-4">
                      <Icon color="white" className="h-7 w-7" />
                    </div>

                    <p className="max-w-32 font-inter text-base font-light text-white">
                      {step.label}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
