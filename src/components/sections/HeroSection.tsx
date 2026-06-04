import { Button } from "@/components/ui/Button";
import ChatIcon from "../ui/icons/ChatIcon";

export function HeroSection() {
  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden"
      aria-label="Hero — Design & Delivery of Your Villa Interiors"
    >
      {/* Background video */}
      <video
        src="/images/hero/bg-video.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/20"
        aria-hidden="true"
      />

      {/* Content card */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <div className="glass-card max-w-[632px] rounded-lg px-8 py-10 sm:px-10 sm:py-12">
          <h1
            className="text-3xl font-bold text-white sm:text-4xl lg:text-[3rem]"
            style={{ lineHeight: "120%" }}
          >
            Design &amp; Delivery of Your Villa Interiors
            <br />
            <em className="not-italic text-brand-teal" style={{ lineHeight: "135%" }}>
              Made Simple
            </em>
          </h1>
          <p className="mt-4 font-inter text-lg leading-relaxed text-white">
            Kitchens, closets, doors, and premium uPVC windows designed, manufactured, and installed
            by one trusted Emirati factory.
          </p>
          <div className="mt-8">
            <Button
              withArrow
              aria-label="Get your free 3D design consultation"
              className="text-lg font-bold"
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
        className="fixed bottom-8 right-6 z-20 flex h-16 w-16 items-center justify-center rounded-full"
      >
        <span className="bg-primary/40 absolute h-16 w-16 animate-ping rounded-full" />
        <ChatIcon />
      </a>
    </section>
  );
}
