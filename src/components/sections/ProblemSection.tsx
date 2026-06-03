"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Image from "next/image";
import { PROBLEM_POINTS } from "@/constants";

export function ProblemSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="bg-[#111] py-20 px-4 sm:px-6 lg:px-8" aria-label="Why villa interior projects become difficult">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl bg-brand-dark-card p-8 sm:p-10"
        >
          {/* Heading */}
          <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Why Villa Interior Projects Often Become Difficult?
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-400">
            When interior systems are sourced from multiple suppliers, the process becomes
            fragmented, making it difficult to coordinate a consistent final result. The lack of
            commitment leads to :
          </p>

          {/* Problem grid */}
          <ul
            className="mt-6 grid grid-cols-1 gap-x-12 gap-y-3 sm:grid-cols-2"
            role="list"
            aria-label="Problems caused by fragmented suppliers"
          >
            {PROBLEM_POINTS.map((point) => (
              <li key={point.id} className="flex items-center gap-3 text-white">
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-white/50"
                  aria-hidden="true"
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
                <span className="font-semibold">{point.label}</span>
              </li>
            ))}
          </ul>

          {/* Video placeholder */}
          <div className="mt-8 overflow-hidden rounded-xl">
            <div className="relative aspect-video w-full cursor-pointer group" onClick={() => setPlaying(true)}>
              <Image
                src="https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1200&auto=format&fit=crop&q=80"
                alt="Craftsman working with wood — precision manufacturing"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 900px"
              />
              {!playing && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <button
                    aria-label="Play video"
                    className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-white/20 backdrop-blur-sm transition-transform group-hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <Play className="ml-1 h-8 w-8 fill-white text-white" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
