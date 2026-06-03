"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Phone } from "lucide-react";
import Link from "next/link";
import { navItems } from "@/data/navigation";

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
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.nav
            key="panel"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 left-0 z-50 w-72 bg-brand-dark-card shadow-2xl"
            aria-label="Mobile navigation"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div className="flex items-center gap-2">
                <IdealFactoryLogo />
              </div>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="rounded-full p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Links */}
            <ul className="flex flex-col gap-1 p-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block rounded-xl px-4 py-3 text-sm font-medium text-gray-200 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 p-6">
              <a
                href="#contact"
                onClick={onClose}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-teal px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-brand-teal-dark"
              >
                <Phone className="h-4 w-4" />
                Start Your Project
              </a>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}

function IdealFactoryLogo() {
  return (
    <div className="flex items-center gap-2">
      <svg width="28" height="28" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <rect x="2" y="5" width="9" height="30" rx="2" fill="#4ECDC4" />
        <rect x="15.5" y="12" width="9" height="23" rx="2" fill="#4ECDC4" />
        <rect x="29" y="2" width="9" height="36" rx="2" fill="white" opacity="0.9" />
      </svg>
      <div className="leading-tight">
        <p className="text-sm font-bold text-white">Ideal</p>
        <p className="text-sm font-bold text-white">Factory</p>
      </div>
    </div>
  );
}
