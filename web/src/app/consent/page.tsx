import type { Metadata } from "next";
import Link from "next/link";
import { consentPageDescription, siteMetadata } from "@/data/seo/site-metadata";

const pageTitle = "Согласие на обработку персональных данных";

export const metadata: Metadata = {
  title: pageTitle,
  description: consentPageDescription,
  alternates: { canonical: "/consent" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "/consent",
    siteName: siteMetadata.openGraphSiteName,
    title: `${pageTitle} · ${siteMetadata.titleTemplateSuffix}`,
    description: consentPageDescription,
  },
  twitter: {
    card: "summary",
    title: `${pageTitle} · ${siteMetadata.titleTemplateSuffix}`,
    description: consentPageDescription,
  },
  robots: { index: true, follow: true },
};

export default function ConsentPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <Link
        href="/"
        className="text-sm font-medium text-primary underline-offset-4 hover:underline"
      >
        ← На главную
      </Link>
      <h1 className="mt-8 font-serif text-3xl font-semibold text-foreground">
        Согласие на обработку персональных данных
      </h1>
      <div className="prose prose-neutral mt-8 max-w-none space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          Замените этот блок на юридически корректный текст согласия: кто
          оператор, какие данные обрабатываются, цели, сроки, способы отзыва
          согласия.
        </p>
        <p>
          Нажимая кнопку отправки формы на сайте и отмечая соответствующий
          чекбокс, пользователь подтверждает ознакомление с политикой и даёт
          согласие на обработку указанных персональных данных в заявленных целях.
        </p>
      </div>
    </div>
  );
}
