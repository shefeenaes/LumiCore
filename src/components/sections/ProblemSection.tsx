"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";
import { PROBLEM_POINTS } from "@/constants";
import { ApproachSection } from "./ApproachSection";
import { DesignCTASection } from "./DesignCTASection";

export function ProblemSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section
      className="bg-white px-4 py-20 sm:px-6 lg:px-8"
      aria-label="Why villa interior projects become difficult"
    >
      <div className="mx-auto max-w-[1201px]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl bg-[#231F20] p-8 sm:p-10"
        >
          {/* Heading */}
          <h2 className="text-[40px] font-bold text-white">
            Why Villa Interior Projects Often Become Difficult?
          </h2>
          <p className="mt-3 font-inter text-lg leading-relaxed text-white">
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
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 34 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 28.5599C23.392 28.5599 28.56 23.3919 28.56 16.9999C28.56 10.6079 23.392 5.43994 17 5.43994C10.608 5.43994 5.44 10.6079 5.44 16.9999C5.44 23.3919 10.608 28.5599 17 28.5599ZM17 6.79994C22.644 6.79994 27.2 11.3559 27.2 16.9999C27.2 22.6439 22.644 27.1999 17 27.1999C11.356 27.1999 6.8 22.6439 6.8 16.9999C6.8 11.3559 11.356 6.79994 17 6.79994Z"
                    fill="white"
                  />
                  <path
                    d="M16.796 23.5958L23.392 16.9998L16.796 10.4038L15.844 11.3558L21.488 16.9998L15.844 22.6438L16.796 23.5958Z"
                    fill="white"
                  />
                  <path d="M22.44 16.3198H10.88V17.6798H22.44V16.3198Z" fill="white" />
                </svg>

                <span className="text-2xl font-semibold">{point.label}</span>
              </li>
            ))}
          </ul>

          {/* Video */}
          <div className="mt-8 overflow-hidden rounded-xl border border-white/10">
            <div className="group relative aspect-video w-full">
              {/* Poster image — hidden once playing */}
              <Image
                src="/images/problem/video-poster.png"
                alt="Craftsman working with wood — precision manufacturing"
                fill
                sizes="(max-width: 1024px) 100vw, 1115px"
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                  playing ? "opacity-0" : "opacity-100"
                }`}
              />

              {/* Video — fades in when playing */}
              <video
                src="/images/problem/customer-journey.mp4"
                playsInline
                preload="none"
                controls={playing}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                  playing ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
              >
                Your browser does not support the video tag.
              </video>

              {/* Dark overlay — hidden once playing */}
              {!playing && <div className="absolute inset-0 bg-black/20" aria-hidden="true" />}

              {/* Play button */}
              {!playing && (
                <button
                  type="button"
                  aria-label="Play customer journey video"
                  onClick={(e) => {
                    setPlaying(true);
                    const video = e.currentTarget.parentElement?.querySelector("video");
                    video?.play();
                  }}
                  className="absolute left-1/2 top-1/2 z-20 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-transparent text-white transition hover:scale-105"
                >
                  <Play className="ms-1 h-12 w-12 fill-current" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          {/* Approach content — moved here, sits under the video */}
          <ApproachSection />
        </motion.div>
      </div>
      <DesignCTASection />
    </section>
  );
}
