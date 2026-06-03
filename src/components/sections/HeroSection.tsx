import Image from "next/image";
import { Headphones } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden"
      aria-label="Hero — Design & Delivery of Your Villa Interiors"
    >
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1800&auto=format&fit=crop&q=80"
        alt="Luxury villa interior with dark leather sofas and ambient lighting"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/20"
        aria-hidden="true"
      />

      {/* Content card */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <div className="glass-card max-w-xl rounded-2xl px-8 py-10 sm:px-10 sm:py-12">
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-[3.25rem]">
            Design &amp; Delivery of Your Villa Interiors
            <br />
            <em className="not-italic text-brand-teal">Made Simple</em>
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-gray-300 sm:text-base">
            Kitchens, closets, doors, and premium uPVC windows designed, manufactured, and
            installed by one trusted Emirati factory.
          </p>
          <div className="mt-8">
            <Button
              variant="primary"
              size="lg"
              withArrow
              aria-label="Get your free 3D design consultation"
            >
              Get Your FREE 3D Design Now
            </Button>
          </div>
        </div>
      </div>

      {/* Floating support button */}
      <a
        href="#contact"
        aria-label="Chat with our support team"
        className="fixed bottom-8 right-6 z-20 flex h-16 w-16 items-center justify-center rounded-full bg-brand-teal shadow-lg shadow-brand-teal/30 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-teal"
      >
        <Headphones className="h-7 w-7 text-black" />
      </a>
    </section>
  );
}
