import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { legalDownloadHref } from "@/data/legal-documents";

function ShieldLogoSmall() {
  return (
    <svg width="28" height="32" viewBox="0 0 36 40" fill="none" aria-hidden>
      <path
        d="M18 2L3 8v12c0 9.4 6.4 18.2 15 20.4C26.6 38.2 33 29.4 33 20V8L18 2z"
        fill="#0E2744"
        stroke="white"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M12 20l4 4 8-8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="3" y="37" width="30" height="2.5" rx="1.25" fill="#D71920" />
    </svg>
  );
}

const linkClass =
  "text-white/55 text-sm transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-sm";

export function FooterSection() {
  return (
    <footer
      className="border-t border-white/10 px-4 py-14 min-[360px]:px-5 lg:px-8 lg:py-16"
      style={{ background: "#061426" }}
    >
      <div className="mx-auto max-w-[75rem]">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">

          {/* Col 1: Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <ShieldLogoSmall />
              <p className="font-serif text-base font-bold text-white">СВО Разбор</p>
            </div>
            <p className="mt-3 max-w-[200px] text-sm leading-relaxed text-white/50">
              Юридическая помощь семьям погибших участников СВО
            </p>
            <p className="mt-4 text-xs text-white/30">
              © СВО Разбор, 2024–2025
            </p>
          </div>

          {/* Col 2: About */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
              О сервисе
            </p>
            <ul className="mt-4 space-y-2.5">
              {[
                { label: "Как это работает", href: "#why" },
                { label: "Выплаты", href: "#payments" },
                { label: "Что проверяется", href: "#review" },
                { label: "FAQ", href: "#faq" },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={linkClass}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Legal */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
              Правовая информация
            </p>
            <ul className="mt-4 space-y-2.5">
              <li className="flex flex-wrap items-baseline gap-x-2">
                <Link href="/privacy" className={linkClass}>
                  Политика конфиденциальности
                </Link>
                <a
                  href={legalDownloadHref.privacy}
                  download
                  className="text-xs text-white/30 hover:text-white/60 transition-colors"
                >
                  скачать
                </a>
              </li>
              <li className="flex flex-wrap items-baseline gap-x-2">
                <Link href="/consent" className={linkClass}>
                  Согласие на обработку данных
                </Link>
                <a
                  href={legalDownloadHref.consent}
                  download
                  className="text-xs text-white/30 hover:text-white/60 transition-colors"
                >
                  скачать
                </a>
              </li>
            </ul>
            <p className="mt-6 text-xs leading-relaxed text-white/30">
              Калугин Виталий Анатольевич (физическое лицо)
            </p>
          </div>

          {/* Col 4: Contacts */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
              Контакты
            </p>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="tel:88003014567"
                  className="inline-flex items-center gap-2.5 text-sm font-medium text-white/75 transition-colors hover:text-white"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/8">
                    <Phone className="h-3.5 w-3.5" strokeWidth={1.875} aria-hidden />
                  </span>
                  8 800 301-45-67
                </a>
                <p className="ml-10 mt-0.5 text-[11px] text-white/35">Пн–Пт 9:00–18:00 МСК</p>
              </li>
              <li>
                <a
                  href="mailto:iTrader7.5@yandex.ru"
                  className="inline-flex items-center gap-2.5 text-sm font-medium text-white/75 transition-colors hover:text-white"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/8">
                    <Mail className="h-3.5 w-3.5" strokeWidth={1.875} aria-hidden />
                  </span>
                  iTrader7.5@yandex.ru
                </a>
              </li>
            </ul>
            <p className="mt-4 text-xs text-white/35">Мы на связи по всей России</p>
          </div>
        </div>

        {/* Bottom disclaimer */}
        <div className="mt-10 border-t border-white/10 pt-8">
          <p className="text-xs leading-relaxed text-white/30">
            Сайт не является государственным ресурсом и не оказывает государственных услуг. Информация носит справочный характер и не заменяет очную консультацию.
          </p>
        </div>
      </div>
    </footer>
  );
}
