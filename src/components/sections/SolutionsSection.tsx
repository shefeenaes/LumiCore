"use client";

import Image from "next/image";
import { services } from "@/data/services";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Button } from "@/components/ui/Button";

export function SolutionsSection() {
  return (
    <section className="relative overflow-hidden marble-bg py-0" aria-label="Our Solutions">
      {/* Oval intro block */}
      <div className="relative flex items-center justify-center py-20 px-4">
        <div className="relative w-full max-w-3xl">
          {/* Oval image container */}
          <div
            className="relative mx-auto overflow-hidden"
            style={{
              width: "min(800px, 90vw)",
              height: "min(500px, 60vw)",
              borderRadius: "45% / 38%",
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80"
              alt="Aerial view of luxury UAE villa with pool and landscaping"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 90vw, 800px"
            />
            {/* Dark overlay on oval */}
            <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

            {/* Logo mark centered */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
              <OvalLogoMark />
              <h2 className="text-2xl font-bold text-white sm:text-3xl">Our Solutions</h2>
              <p className="px-6 text-sm text-gray-200 sm:text-base">
                We provide all type of modular
              </p>
              <p className="font-semibold text-brand-teal sm:text-lg">
                KITCHEN, CLOSET, DOOR Services
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Services grid */}
      <div
        className="relative mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1800&auto=format&fit=crop&q=40)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay for grid area */}
        <div className="absolute inset-0 bg-black/75" aria-hidden="true" />

        <div className="relative z-10 pt-10">
          {/* Section heading */}
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Our Solutions</h2>
            <p className="mt-2 text-gray-300">We provide all type of modular</p>
            <p className="font-semibold text-brand-teal">KITCHEN, CLOSET, DOOR Services</p>
          </div>

          {/* 2-column service cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {services.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 flex justify-center">
            <Button variant="teal" size="lg" withArrow>
              Explore Our Projects
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function OvalLogoMark() {
  return (
    <svg width="70" height="70" viewBox="0 0 80 80" fill="none" aria-hidden="true">
      <rect x="4" y="10" width="18" height="60" rx="4" fill="white" opacity="0.9" />
      <rect x="31" y="24" width="18" height="46" rx="4" fill="white" opacity="0.9" />
      <rect x="58" y="4" width="18" height="72" rx="4" fill="white" />
    </svg>
  );
}
