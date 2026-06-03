import Link from "next/link";
import { Globe, Mail, Phone } from "lucide-react";
import { CONTACT_EMAIL, CONTACT_PHONE_1, CONTACT_PHONE_2, CONTACT_WEBSITE } from "@/constants";

const quickLinks = [
  { label: "About Us", href: "#about" },
  { label: "Our Team", href: "#team" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Projects", href: "#projects" },
];

const exploreLinks = [
  { label: "Walk in Closet", href: "#services" },
  { label: "Wardrobe Closet", href: "#services" },
  { label: "U-Shape Kitchen", href: "#services" },
  { label: "Pantry Kitchen", href: "#services" },
  { label: "Doors", href: "#services" },
];

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden bg-[#0d0d0d]"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&auto=format&fit=crop&q=60)",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/50" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6 lg:px-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <FooterLogo />
              <div className="leading-tight">
                <p className="font-bold text-white">Ideal</p>
                <p className="font-bold text-white">Factory</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Our kitchens may not be able to whisk you away to sun kissed foreign shores, but our
              collection boasts all the quality craftsmanship and style..
            </p>
          </div>

          {/* Quick Links */}
          <nav aria-label="Quick links">
            <h3 className="mb-4 font-semibold text-brand-teal">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Explore */}
          <nav aria-label="Explore our services">
            <h3 className="mb-4 font-semibold text-brand-teal">Explore</h3>
            <ul className="space-y-2">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <address className="not-italic">
            <h3 className="mb-4 font-semibold text-brand-teal">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`https://${CONTACT_WEBSITE}`}
                  className="flex items-center gap-2 text-sm text-gray-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Globe className="h-4 w-4 shrink-0 text-brand-teal" />
                  {CONTACT_WEBSITE}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="flex items-center gap-2 text-sm text-gray-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:underline"
                >
                  <Mail className="h-4 w-4 shrink-0 text-brand-teal" />
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT_PHONE_1.replace(/[-\s]/g, "")}`}
                  className="flex items-center gap-2 text-sm text-gray-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:underline"
                >
                  <Phone className="h-4 w-4 shrink-0 text-brand-teal" />
                  <span>
                    {CONTACT_PHONE_1}
                    <br />
                    {CONTACT_PHONE_2}
                  </span>
                </a>
              </li>
            </ul>
          </address>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-sm text-gray-400">
            Copyright &copy;{new Date().getFullYear()} lumicore all rights reserved
          </p>
          <div className="flex gap-6">
            <Link
              href="/terms"
              className="text-sm text-gray-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:underline"
            >
              Terms &amp; Condition
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-gray-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:underline"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="2" y="5" width="9" height="30" rx="2" fill="#4ECDC4" />
      <rect x="15.5" y="12" width="9" height="23" rx="2" fill="#4ECDC4" />
      <rect x="29" y="2" width="9" height="36" rx="2" fill="white" opacity="0.9" />
    </svg>
  );
}
