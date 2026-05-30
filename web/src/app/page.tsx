import { HeroSection } from "@/components/sections/hero-section";
import { ScenarioSection } from "@/components/sections/scenario-section";
import { QuizSectionDynamic } from "@/components/sections/quiz-section-dynamic";
import { PaymentsSection } from "@/components/sections/payments-section";
import { ReviewSection } from "@/components/sections/review-section";
import { SourcesSection } from "@/components/sections/sources-section";
import { WhySection } from "@/components/sections/why-section";
import { FaqSection } from "@/components/sections/faq-section";
import { FooterSection } from "@/components/sections/footer-section";
import { HomeJsonLd } from "@/components/seo/home-json-ld";
import { QuizProvider } from "@/contexts/quiz-context";

export default function HomePage() {
  return (
    <>
      <HomeJsonLd />
      <main id="main-content" className="w-full min-w-0">
        <QuizProvider>
          <HeroSection />
          <ScenarioSection />
          <QuizSectionDynamic />
          <PaymentsSection />
          <ReviewSection />
          <SourcesSection />
          <WhySection />
          <FaqSection />
          <FooterSection />
        </QuizProvider>
      </main>
    </>
  );
}
