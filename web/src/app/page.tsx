import { QuizProvider } from "@/contexts/quiz-context";
import { HeroSection } from "@/components/sections/hero-section";
import { IntentNavSection } from "@/components/sections/intent-nav-section";
import {
  PaymentsIntentSection,
  PayoutStructureIntentSection,
} from "@/components/sections/intent-guide-sections";
import { SourcesSection } from "@/components/sections/roadmap-section";
import { ReviewSection } from "@/components/sections/review-section";
import { QuizSectionDynamic } from "@/components/sections/quiz-section-dynamic";
import { ContactFormSection } from "@/components/sections/contact-form-section";
import { FaqSection } from "@/components/sections/faq-section";
import { FooterSection } from "@/components/sections/footer-section";
import { HomeJsonLd } from "@/components/seo/home-json-ld";

export default function HomePage() {
  return (
    <>
      <HomeJsonLd />
      <QuizProvider>
        <main id="main-content" className="w-full min-w-0">
          <HeroSection />
          <IntentNavSection />
          <PaymentsIntentSection />
          <PayoutStructureIntentSection />
          <ReviewSection />
          <SourcesSection />
          <QuizSectionDynamic />
          <ContactFormSection />
          <FaqSection />
          <FooterSection />
        </main>
      </QuizProvider>
    </>
  );
}
