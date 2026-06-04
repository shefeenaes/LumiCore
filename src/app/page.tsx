import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { InteriorSolutionsReveal } from "@/components/sections/InteriorSolutionsReveal";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { WhyChooseSection } from "@/components/sections/WhyChooseSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ContactSection } from "@/components/sections/ContactSection";

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
