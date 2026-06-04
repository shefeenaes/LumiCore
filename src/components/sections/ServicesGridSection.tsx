"use client";

import { services } from "@/data/services";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Button } from "@/components/ui/Button";

export function ServicesGridSection() {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/bg-2-image.jpg')" }}
      aria-label="Our Services"
      id="services-grid"
    >
      <div className="absolute inset-0 bg-black/65" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-20 pt-32 sm:px-6 sm:pt-36 lg:px-8 lg:pt-40">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Our Solutions
          </h2>
          <p className="mt-3 text-gray-300">We provide all type of modular</p>
          <p className="mt-1 font-semibold text-brand-teal">
            KITCHEN, CLOSET, DOOR Services
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button withArrow>Explore Our Projects</Button>
        </div>
      </div>
    </section>
  );
}
