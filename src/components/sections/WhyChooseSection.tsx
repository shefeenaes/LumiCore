"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, Phone } from "lucide-react";
import { WHY_CHOOSE_POINTS } from "@/constants";
import { Button } from "@/components/ui/Button";

export function WhyChooseSection() {
  return (
    <section
      className="px-4 py-20 sm:px-6 lg:px-8"
      style={{ background: "#111" }}
      aria-label="Why Villa Owners Choose Ideal Factory"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl"
          style={{
            background: "linear-gradient(360deg, #57B7C0 0%, #000000 80%)",
          }}
        >
          <div className="grid grid-cols-1 items-center gap-0 lg:grid-cols-2">
            {/* Left: 3D kitchen illustration */}
            <div className="relative flex items-end justify-center overflow-hidden pt-8 lg:h-80">
              <Image
                src="/images/why-choose/villa-3d.png"
                alt="3D rendered modern kitchen design illustration"
                width={500}
                height={380}
                className="relative z-10 w-full max-w-sm translate-y-6 object-contain drop-shadow-2xl lg:max-w-md lg:translate-y-12"
                sizes="(max-width: 1024px) 80vw, 500px"
              />
            </div>

            {/* Right: content */}
            <div className="p-8 sm:p-10">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Why Villa Owners Choose Ideal Factory
              </h2>

              <ul className="mt-6 space-y-3" role="list">
                {WHY_CHOOSE_POINTS.map((point) => (
                  <li key={point.id} className="flex items-start gap-3 text-sm text-gray-200">
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal"
                      aria-hidden="true"
                    />
                    {point.text}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button>
                  <Phone className="h-4 w-4 text-white" />
                  Start Your Free 3D Design
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
