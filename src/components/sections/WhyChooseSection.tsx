"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { WHY_CHOOSE_POINTS } from "@/constants";
import { Button } from "@/components/ui/Button";
import PhoneIcon from "../ui/icons/PhoneIcon";
import { CDN } from "@/lib/cloudinary";

export function WhyChooseSection() {
  return (
    <section
      className="bg-white px-4 py-20 font-inter lg:px-8"
      aria-label="Why Villa Owners Choose Ideal Factory "
    >
      <div className="mx-auto max-w-6xl 2xl:max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl lg:h-[490px]"
          style={{
            background: "linear-gradient(360deg, #57B7C0 0%, #000000 80%)",
          }}
        >
          <div className="grid grid-cols-1 items-center gap-0 lg:h-full lg:grid-cols-2">
            {/* Left: 3D kitchen illustration — on desktop it's absolutely anchored to
                the bottom-left so its top lines up with the content while the bottom
                breaks out of the card for a 3D pop */}
            <div className="relative flex items-end justify-center pt-8 lg:block lg:self-stretch lg:pt-0">
              <Image
                src={CDN.villa3d}
                alt="3D rendered modern kitchen design illustration"
                width={692}
                height={565}
                className="relative z-10 w-full max-w-[300px] object-contain drop-shadow-2xl sm:max-w-xs lg:absolute lg:bottom-[-37px] lg:left-0 lg:w-[554px] lg:max-w-none"
                sizes="(max-width: 1024px) 80vw, 500px"
              />
            </div>

            {/* Right: content */}
            <div className="p-8 sm:p-10">
              <h2 className="font-lexend text-3xl font-bold text-white sm:text-4xl">
                Why Villa Owners Choose Ideal Factory
              </h2>

              <ul className="mt-6 space-y-3" role="list">
                {WHY_CHOOSE_POINTS.map((point) => (
                  <li key={point.id} className="flex items-start gap-3 text-base text-white">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mt-0.5 h-5 w-5 shrink-0"
                    >
                      <path
                        d="M9.58334 19.1667C10.8421 19.1682 12.0887 18.921 13.2516 18.4393C14.4145 17.9576 15.4708 17.2509 16.3597 16.3597C17.2509 15.4708 17.9576 14.4145 18.4393 13.2516C18.921 12.0887 19.1682 10.8421 19.1667 9.58334C19.1682 8.32461 18.921 7.07798 18.4393 5.91508C17.9576 4.75217 17.2509 3.6959 16.3597 2.80697C15.4708 1.91579 14.4145 1.20905 13.2516 0.727342C12.0887 0.245634 10.8421 -0.00154491 9.58334 7.26509e-06C8.32461 -0.00154491 7.07798 0.245634 5.91508 0.727342C4.75217 1.20905 3.6959 1.91579 2.80697 2.80697C1.91579 3.6959 1.20905 4.75217 0.727342 5.91508C0.245634 7.07798 -0.00154491 8.32461 7.26509e-06 9.58334C-0.00154491 10.8421 0.245634 12.0887 0.727342 13.2516C1.20905 14.4145 1.91579 15.4708 2.80697 16.3597C3.6959 17.2509 4.75217 17.9576 5.91508 18.4393C7.07798 18.921 8.32461 19.1682 9.58334 19.1667Z"
                        fill="white"
                      />
                      <path d="M5.75 9.58301L8.625 12.458L14.375 6.70801" fill="white" />
                      <path
                        d="M5.75 9.58301L8.625 12.458L14.375 6.70801"
                        stroke="#57B7C0"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    {point.text}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button variant="inverted">
                  <PhoneIcon className="h-4 w-4" color="currentColor" />
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
