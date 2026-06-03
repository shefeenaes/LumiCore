"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ServiceIcon } from "@/components/shared/ServiceIcon";
import type { Service } from "@/types";

type ServiceCardProps = {
  service: Service;
  index: number;
};

export function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-brand-dark-card"
      aria-label={service.title}
    >
      {/* Image */}
      <div className="relative h-64 w-full overflow-hidden sm:h-72 lg:h-80">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Service icon badge */}
        <div className="absolute left-4 top-4 z-10 rounded-xl bg-white/90 p-2.5 backdrop-blur-sm">
          <ServiceIcon id={service.icon} className="h-7 w-7 text-brand-dark" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-1.5 text-xl font-bold text-white">{service.title}</h3>
        <p className="text-sm text-gray-400">{service.description}</p>

        {/* Arrow CTA */}
        <div className="mt-auto pt-5">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-teal text-black transition-transform duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark-card"
            aria-label={`Learn more about ${service.title}`}
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
