"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import { navItems } from "@/data/navigation";
import { MobileMenu } from "./MobileMenu";
import Image from "next/image";
import PhoneIcon from "../ui/icons/PhoneIcon";
import { Button } from "@/components/ui/Button";
import { CDN } from "@/lib/cloudinary";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-5"
        role="banner"
      >
        <nav className="relative mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-black/45 px-4 py-3 backdrop-blur-xl transition-all duration-300 sm:px-6">
          {/* Left: hamburger (mobile) + nav links (desktop) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-white/80 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal lg:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>

            <ul className="hidden items-center gap-7 text-sm font-medium text-white/85 lg:flex">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-brand-teal focus-visible:underline focus-visible:outline-none"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Center: Logo — absolutely centered in the nav bar */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
            aria-label="Ideal Factory – Home"
          >
            <Image
              src={CDN.logo}
              alt="Ideal Factory logo"
              width={155}
              height={60}
              className="h-9 w-auto object-contain"
            />
          </Link>

          {/* Right: CTA */}
          <div className="flex items-center gap-3">
            <Button href="#contact" className="hidden text-sm sm:inline-flex">
              <PhoneIcon className="h-5 w-5 shrink-0" color="currentColor" />
              Start Your Project
            </Button>
          </div>
        </nav>
      </motion.header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
