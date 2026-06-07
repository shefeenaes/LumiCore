import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";

// Below-fold sections: dynamically imported so GSAP + Framer Motion are split
// into separate chunks and only parsed after the hero is interactive.
const InteriorSolutionsReveal = dynamic(() =>
  import("@/components/sections/InteriorSolutionsReveal").then((m) => ({
    default: m.InteriorSolutionsReveal,
  }))
);
const ProblemSection = dynamic(() =>
  import("@/components/sections/ProblemSection").then((m) => ({
    default: m.ProblemSection,
  }))
);
const PortfolioSection = dynamic(() =>
  import("@/components/sections/PortfolioSection").then((m) => ({
    default: m.PortfolioSection,
  }))
);
const WhyChooseSection = dynamic(() =>
  import("@/components/sections/WhyChooseSection").then((m) => ({
    default: m.WhyChooseSection,
  }))
);
const TestimonialsSection = dynamic(() =>
  import("@/components/sections/TestimonialsSection").then((m) => ({
    default: m.TestimonialsSection,
  }))
);
const ContactSection = dynamic(() =>
  import("@/components/sections/ContactSection").then((m) => ({
    default: m.ContactSection,
  }))
);

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <HeroSection />
        <InteriorSolutionsReveal />
        <ProblemSection />
        <PortfolioSection />
        <WhyChooseSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
