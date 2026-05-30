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
      <Link href="/" className="text-sm font-medium text-primary underline-offset-4 hover:underline">
        ← На главную
      </Link>
      <h1 className="mt-8 font-serif text-3xl font-semibold text-foreground">
        Согласие на обработку персональных данных
      </h1>

      <div className="prose prose-neutral mt-8 max-w-none text-sm leading-relaxed text-muted-foreground">
        <p>
          Настоящим пользователь, заполняя форму на сайте svorazbor.ru, дает согласие Калугину Виталию Анатольевичу
          на обработку персональных данных, указанных в форме заявки.
        </p>

        <h2>Перечень данных</h2>
        <ul>
          <li>имя;</li>
          <li>телефон или Telegram;</li>
          <li>email (если указан);</li>
          <li>регион;</li>
          <li>родство / статус;</li>
          <li>этап ситуации;</li>
          <li>текст сообщения;</li>
          <li>технические данные, если применимо.</li>
        </ul>

        <h2>Цели обработки</h2>
        <ul>
          <li>связь по обращению;</li>
          <li>предварительный разбор ситуации;</li>
          <li>организация консультации;</li>
          <li>ведение переписки.</li>
        </ul>

        <h2>Действия с данными</h2>
        <p>
          сбор, запись, систематизация, накопление, хранение, уточнение, использование, передача в технические
          сервисы в объеме, необходимом для работы сайта и связи с пользователем, удаление, уничтожение.
        </p>

        <h2>Telegram</h2>
        <p>
          Пользователь понимает и соглашается, что уведомление о заявке может быть направлено Оператору через
          закрытый Telegram-чат, группу или канал.
        </p>

        <h2>Срок действия согласия</h2>
        <p>Согласие действует до достижения целей обработки или до его отзыва пользователем.</p>

        <h2>Отзыв согласия</h2>
        <p>Согласие может быть отозвано путем направления письма на email: iTrader7.5@yandex.ru.</p>

        <h2>Важно</h2>
        <p>
          Не направляйте через форму паспортные данные, СНИЛС, банковские реквизиты, сканы документов и иные
          сведения, не нужные для первичного контакта.
        </p>
      </div>
    </div>
  );
}
