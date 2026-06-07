"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { navItems } from "@/data/navigation";
import PhoneIcon from "../ui/icons/PhoneIcon";
import { Button } from "@/components/ui/Button";
import { CDN } from "@/lib/cloudinary";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Floating panel */}
          <motion.div
            key="panel"
            initial={{ y: "-110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-110%", opacity: 0 }}
            transition={{ type: "spring", damping: 32, stiffness: 280 }}
            className="fixed inset-x-3 top-3 z-50 overflow-hidden rounded-2xl bg-[#0d0d0d] shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            {/* Top row: close | logo | spacer */}
            <div className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-black/75 px-4 py-3 shadow-xl shadow-black/30 backdrop-blur-xl transition-all duration-300 sm:px-6">
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex flex-1 justify-center">
                <Image
                  src={CDN.logo}
                  alt="Ideal Factory"
                  width={155}
                  height={60}
                  className="h-9 w-auto object-contain"
                />
              </div>

              <div className="h-10 w-10" aria-hidden="true" />
            </div>

            {/* Inner card: nav links + CTA */}
            <div className="mx-auto mt-2 max-w-7xl rounded-2xl border border-white/10 bg-black/90 p-5 backdrop-blur-xl lg:hidden">
              <nav aria-label="Mobile primary navigation">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className="block px-5 py-4 text-base text-white transition-colors last:border-0 hover:text-primary focus-visible:text-primary focus-visible:outline-none"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* CTA */}
              <div className="p-3">
                <Button href="#contact" onClick={onClose} className="mt-2 w-full text-sm">
                  <PhoneIcon className="h-5 w-5 shrink-0" />
                  Start Your Project
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
