"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { navItems } from "@/data/navigation";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/utils";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "fixed inset-x-0 top-0 z-30 transition-all duration-300",
          scrolled
            ? "bg-black/80 backdrop-blur-md shadow-md"
            : "bg-transparent"
        )}
        role="banner"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Left: hamburger + nav links */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
            >
              <Menu className="h-5 w-5" />
            </button>

            <nav aria-label="Primary" className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-white/90 transition-colors hover:text-brand-teal focus-visible:outline-none focus-visible:underline"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Center: Logo */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
            aria-label="Ideal Factory – Home"
          >
            <div className="flex items-center gap-2">
              <IdealFactoryMark />
              <div className="leading-tight">
                <p className="text-sm font-bold text-white">Ideal</p>
                <p className="text-sm font-bold text-white">Factory</p>
              </div>
            </div>
          </Link>

          {/* Right: CTA */}
          <a
            href="#contact"
            className="hidden items-center gap-2 rounded-full border border-brand-teal px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-brand-teal hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal sm:flex"
          >
            <Phone className="h-4 w-4 text-brand-teal" />
            Start Your Project
          </a>
        </div>
      </motion.header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

function IdealFactoryMark() {
  return (
    <svg width="30" height="30" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="2" y="5" width="9" height="30" rx="2" fill="#4ECDC4" />
      <rect x="15.5" y="12" width="9" height="23" rx="2" fill="#4ECDC4" />
      <rect x="29" y="2" width="9" height="36" rx="2" fill="white" opacity="0.9" />
    </svg>
  );
}
