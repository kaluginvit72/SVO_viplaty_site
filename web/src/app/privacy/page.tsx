import type { Metadata } from "next";
import Link from "next/link";
import { privacyPageDescription, siteMetadata } from "@/data/seo/site-metadata";

const pageTitle = "Политика конфиденциальности";

export const metadata: Metadata = {
  title: pageTitle,
  description: privacyPageDescription,
  alternates: { canonical: "/privacy" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "/privacy",
    siteName: siteMetadata.openGraphSiteName,
    title: `${pageTitle} · ${siteMetadata.titleTemplateSuffix}`,
    description: privacyPageDescription,
  },
  twitter: {
    card: "summary",
    title: `${pageTitle} · ${siteMetadata.titleTemplateSuffix}`,
    description: privacyPageDescription,
  },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <Link
        href="/"
        className="text-sm font-medium text-primary underline-offset-4 hover:underline"
      >
        ← На главную
      </Link>
      <h1 className="mt-8 font-serif text-3xl font-semibold text-foreground">
        Политика обработки персональных данных
      </h1>
      <div className="prose prose-neutral mt-8 max-w-none space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          Настоящий документ описывает общие принципы обработки персональных
          данных при использовании сайта и отправке заявки. Замените этот текст
          на утверждённую юристом политику: цели обработки, категории данных,
          сроки хранения, права субъекта, контакты оператора и порядок отзыва
          согласия.
        </p>
        <p>
          Оператор: укажите ИП/организацию, ИНН, ОГРН/ОГРНИП, адрес и email для
          обращений по вопросам ПДн.
        </p>
        <p>
          Данные из формы (имя, телефон, мессенджер, регион, описание ситуации)
          используются для связи с вами и предварительного анализа обращения, если
          вы дали согласие.
        </p>
      </div>
    </div>
  );
}
