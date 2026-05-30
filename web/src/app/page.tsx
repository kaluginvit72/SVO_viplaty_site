import { HeroSection } from "@/components/sections/hero-section";
import { PaymentsSection } from "@/components/sections/payments-section";
import { ReviewSection } from "@/components/sections/review-section";
import { SourcesSection } from "@/components/sections/sources-section";
import { WhySection } from "@/components/sections/why-section";
import { FaqSection } from "@/components/sections/faq-section";
import { FooterSection } from "@/components/sections/footer-section";
import { HomeJsonLd } from "@/components/seo/home-json-ld";

export default function HomePage() {
  return (
    <>
      <HomeJsonLd />
      <main id="main-content" className="w-full min-w-0">
        <HeroSection />
        <PaymentsSection />
        <ReviewSection />
        <SourcesSection />
        <WhySection />
        <FaqSection />
        <FooterSection />
      </main>
    </>
  );
}
