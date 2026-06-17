import type { Metadata, Viewport } from "next";
import { Onest, PT_Serif } from "next/font/google";
import { CookieBanner } from "@/components/analytics/cookie-banner";
// GA4 временно отключён (см. комментарий ниже) — импорт сохранён для быстрого возврата
// import { GoogleAnalyticsApp } from "@/components/analytics/google-analytics-app";
import { YandexMetrika } from "@/components/analytics/yandex-metrika";
import { HeaderSection } from "@/components/sections/header-section";
import { siteMetadata } from "@/data/seo/site-metadata";
import { runtimeYmCounterId } from "@/lib/runtime-analytics-env";
import { resolveSiteUrl } from "@/lib/site-url";
import "./globals.css";

const sans = Onest({
  subsets: ["latin", "cyrillic"],
  variable: "--font-onest",
  display: "swap",
});

const serif = PT_Serif({
  subsets: ["latin", "cyrillic"],
  variable: "--font-pt-serif",
  weight: ["400", "700"],
  display: "swap",
});

const siteUrlRaw = resolveSiteUrl();

const { defaultTitle, defaultDescription, applicationName, titleTemplateSuffix, openGraphSiteName } =
  siteMetadata;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrlRaw),
  title: {
    default: defaultTitle,
    template: `%s · ${titleTemplateSuffix}`,
  },
  description: defaultDescription,
  applicationName,
  keywords: [...siteMetadata.keywords],
  authors: [{ name: applicationName }],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "/",
    siteName: openGraphSiteName,
    title: defaultTitle,
    description: defaultDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: false,
  },
  verification: {
    google: "jxvFiJhE0mUBMhhuXGrlgTOHMGNjmZIT__aqsNR8a7o",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f7fa" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1f3a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const ymId = runtimeYmCounterId();

  return (
    <html lang="ru">
      <body
        className={`${sans.variable} ${serif.variable} min-h-screen min-w-0 antialiased font-sans`}
      >
        {ymId ? (
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__SVO_YM_ID=${JSON.stringify(ymId)};`,
            }}
          />
        ) : null}
        {/* GA4 временно отключён — раскомментить когда будет уведомление в РКН о трансграничной передаче */}
        {/* {gaId ? <GoogleAnalyticsApp gaId={gaId} /> : null} */}
        {ymId ? <YandexMetrika counterId={ymId} /> : null}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          К основному содержимому
        </a>
        <HeaderSection />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
