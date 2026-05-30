import Link from "next/link";

const sources = [
  { label: "провыплаты.рф", href: "https://xn--80ad1akecev1fe.xn--p1ai/" },
  { label: "СОГАЗ", href: "https://www.sogaz.ru/" },
  { label: "СФР", href: "https://sfr.gov.ru/" },
  { label: "pravo.gov.ru", href: "http://pravo.gov.ru/" },
  { label: "Минобороны РФ", href: "https://mil.ru/" },
  { label: "Госуслуги", href: "https://www.gosuslugi.ru/" },
] as const;

export function SourcesSection() {
  return (
    <section className="border-b border-[var(--cool-border)] bg-white px-4 py-14 min-[360px]:px-5 md:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-[75rem] rounded-2xl border border-[var(--cool-border)] bg-[var(--neutral-surface)] p-6 md:p-8">
        <h2 className="font-serif text-2xl font-semibold text-[var(--deep-blue)] md:text-3xl">
          Нормативные основания
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)] md:text-base">
          При проверке используются действующие нормативные акты и официальные источники. Суммы и условия
          выплат могут меняться, поэтому перед разбором они подлежат повторной проверке.
        </p>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Суммы на сайте проверены по официальным источникам на 29.05.2026.
        </p>

        <ul className="mt-5 flex flex-wrap gap-2.5">
          {sources.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-full border border-[var(--cool-border)] bg-white px-3 py-1.5 text-sm font-medium text-[var(--deep-blue)] transition-colors hover:border-[var(--deep-blue)] hover:text-[var(--primary-navy)]"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
