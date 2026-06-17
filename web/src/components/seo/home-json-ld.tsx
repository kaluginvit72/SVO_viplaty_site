import { faqItems } from "@/data/texts/landing";
import { siteMetadata } from "@/data/seo/site-metadata";
import { resolveSiteUrl } from "@/lib/site-url";

/**
 * JSON-LD главной: WebSite + FAQPage в @graph (один script, без дублирования контекста).
 */
export function HomeJsonLd() {
  const base = resolveSiteUrl();

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": `${base}/#organization`,
        name: "СВО Разбор",
        url: base,
        description: siteMetadata.defaultDescription,
        inLanguage: "ru-RU",
        areaServed: {
          "@type": "Country",
          name: "Россия",
        },
        serviceType: "Консультации по выплатам семьям погибших участников СВО",
        // sameAs: ["https://yandex.ru/maps/org/..."] — добавить после регистрации в Яндекс Бизнес
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+7-993-502-10-61",
            contactType: "customer service",
            areaServed: "RU",
            availableLanguage: "Russian",
            hoursAvailable: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              opens: "07:00",
              closes: "20:00",
            },
          },
          {
            "@type": "ContactPoint",
            telephone: "+7-922-102-63-31",
            contactType: "customer service",
            areaServed: "RU",
            availableLanguage: "Russian",
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        url: base,
        name: siteMetadata.openGraphSiteName,
        description: siteMetadata.defaultDescription,
        inLanguage: "ru-RU",
        publisher: { "@id": `${base}/#organization` },
      },
      {
        "@type": "FAQPage",
        "@id": `${base}/#faq`,
        isPartOf: { "@id": `${base}/#website` },
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
