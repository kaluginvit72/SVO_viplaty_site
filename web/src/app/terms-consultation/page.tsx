import type { Metadata } from "next";
import Link from "next/link";
import { siteMetadata } from "@/data/seo/site-metadata";

const pageTitle = "Условия консультации и разбора ситуации";
const description =
  "Условия консультации проекта СВО Разбор: статус проекта, предмет услуги, ограничения, стоимость и контакты.";

export const metadata: Metadata = {
  title: pageTitle,
  description,
  alternates: { canonical: "/terms-consultation" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "/terms-consultation",
    siteName: siteMetadata.openGraphSiteName,
    title: `${pageTitle} · ${siteMetadata.titleTemplateSuffix}`,
    description,
  },
  twitter: {
    card: "summary",
    title: `${pageTitle} · ${siteMetadata.titleTemplateSuffix}`,
    description,
  },
  robots: { index: true, follow: true },
};

export default function TermsConsultationPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <Link href="/" className="text-sm font-medium text-primary underline-offset-4 hover:underline">
        ← На главную
      </Link>
      <h1 className="mt-8 font-serif text-3xl font-semibold text-foreground">
        Условия консультации и разбора ситуации
      </h1>

      <div className="prose prose-neutral mt-8 max-w-none text-sm leading-relaxed text-muted-foreground">
        <h2>1. Статус проекта</h2>
        <p>
          СВО Разбор — частный информационно-консультационный проект. Сайт не является государственным ресурсом и
          не оказывает государственных услуг.
        </p>

        <h2>2. Предмет услуги</h2>
        <p>
          Исполнитель может оказывать услуги по предварительному разбору ситуации, проверке возможных выплат,
          анализу предоставленной информации, определению вопросов, требующих дополнительной проверки, и подготовке
          рекомендаций.
        </p>

        <h2>3. Что не входит в услугу</h2>
        <p>
          Исполнитель не назначает выплаты, не принимает решений вместо государственных органов, не гарантирует
          получение выплат и не влияет на решения уполномоченных органов.
        </p>

        <h2>4. Стоимость</h2>
        <p>Стоимость зависит от объема задачи и согласуется индивидуально до начала платной работы.</p>

        <h2>5. Документы</h2>
        <p>
          На этапе первичной заявки не требуется направлять паспортные данные, банковские реквизиты, СНИЛС, сканы
          документов и другие чувствительные сведения.
        </p>

        <h2>6. Результат</h2>
        <p>
          Результатом разбора является консультационная информация, оценка возможных направлений проверки и
          рекомендации по дальнейшим вопросам, а не гарантия назначения выплат.
        </p>

        <h2>7. Отказ от гарантий</h2>
        <p>
          Любые суммы на сайте указаны справочно. Итоговое решение принимается уполномоченными органами на основании
          документов и обстоятельств.
        </p>

        <h2>8. Контакты</h2>
        <p>Для связи: iTrader7.5@yandex.ru</p>
      </div>
    </div>
  );
}
