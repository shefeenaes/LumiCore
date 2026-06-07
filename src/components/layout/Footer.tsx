import Link from "next/link";
import Image from "next/image";
import { Globe, Mail, Phone } from "lucide-react";
import { CONTACT_EMAIL, CONTACT_PHONE_1, CONTACT_PHONE_2, CONTACT_WEBSITE } from "@/constants";
import { CDN } from "@/lib/cloudinary";

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

// Single source of truth for footer column heading styles
function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-4 font-inter text-base font-semibold uppercase tracking-[0.2em] text-primary">
      {children}
    </h3>
  );
}

// Shared component for the two navigation link columns (Quick Links + Explore).
// Contact is intentionally NOT built from this — it's an <address>, not navigation.
function FooterLinkColumn({
  title,
  ariaLabel,
  links,
}: {
  title: string;
  ariaLabel: string;
  links: { label: string; href: string }[];
}) {
  return (
    <nav aria-label={ariaLabel}>
      <FooterHeading>{title}</FooterHeading>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="font-inter text-sm font-extralight text-white transition-colors hover:font-normal hover:text-primary focus-visible:underline focus-visible:outline-none"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden lg:h-[449px]"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${CDN.footerBg})`,
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/70" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6 lg:px-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Image
                src={CDN.logo}
                alt="Ideal Factory logo"
                width={167}
                height={64}
                className="h-14 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="font-inter text-[13px] font-extralight leading-relaxed text-white">
              Our kitchens may not be able to whisk you away to sun kissed foreign shores, but our
              collection boasts all the quality craftsmanship and style..
            </p>
          </div>

          {/* Quick Links */}
          <FooterLinkColumn title="Quick Links" ariaLabel="Quick links" links={quickLinks} />

          {/* Explore */}
          <FooterLinkColumn title="Explore" ariaLabel="Explore our services" links={exploreLinks} />

          {/* Contact */}
          <address className="not-italic">
            <FooterHeading>Contact</FooterHeading>
            <ul className="space-y-3 font-extralight">
              <li>
                <a
                  href={`https://${CONTACT_WEBSITE}`}
                  className="inline-flex items-center gap-2 font-inter text-sm text-white transition-colors focus-visible:underline focus-visible:outline-none"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Globe className="h-4 w-4 shrink-0 text-primary" />
                  {CONTACT_WEBSITE}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex items-center gap-2 font-inter text-sm text-white transition-colors focus-visible:underline focus-visible:outline-none"
                >
                  <Mail className="h-4 w-4 shrink-0 text-primary" />
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT_PHONE_1.replace(/[-\s]/g, "")}`}
                  className="inline-flex items-start gap-2 font-inter text-xs text-white transition-colors focus-visible:underline focus-visible:outline-none"
                >
                  <Phone className="h-4 w-4 shrink-0 text-primary" />
                  <span className="flex flex-row gap-x-1 sm:flex-col">
                    <span>{CONTACT_PHONE_1} , </span> <span>{CONTACT_PHONE_2}</span>
                  </span>
                </a>
              </li>
            </ul>
          </address>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t-[1px] border-[#94CED4] pt-6 sm:flex-row">
          <p className="font-inter text-sm font-light text-gray-400">
            Copyright &copy;{new Date().getFullYear()} lumicore all rights reserved
          </p>
          <div className="flex gap-6">
            <Link
              href="/terms"
              className="font-inter text-sm font-light text-gray-400 transition-colors hover:text-white focus-visible:underline focus-visible:outline-none"
            >
              Terms &amp; Condition
            </Link>
            <Link
              href="/privacy"
              className="font-inter text-sm font-light text-gray-400 transition-colors hover:text-white focus-visible:underline focus-visible:outline-none"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
