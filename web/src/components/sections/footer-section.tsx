import Link from "next/link";
import Image from "next/image";
import { Mail, PhoneCall } from "lucide-react";

const linkClass =
  "text-white/60 text-sm transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-sm";

export function FooterSection() {
  return (
    <footer className="border-t border-white/10 bg-[#061426] px-4 py-14 min-[360px]:px-5 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-[75rem]">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo-shit.png"
                alt="СВО Разбор. Юридическая помощь семьям погибших участников СВО"
                width={184}
                height={48}
                className="h-auto w-[168px]"
              />
            </div>
            <p className="mt-3 max-w-[230px] text-sm leading-relaxed text-white/55">
              Юридическая помощь семьям погибших участников СВО
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/75">О сервисе</p>
            <ul className="mt-4 space-y-2.5">
              {[
                { label: "Как это работает", href: "#why" },
                { label: "Выплаты", href: "#payments" },
                { label: "Отзывы", href: "#sources" },
                { label: "FAQ", href: "#faq" },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/75">Правовая информация</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/privacy" className={linkClass}>
                  Политика конфиденциальности
                </Link>
              </li>
              <li>
                <Link href="/consent" className={linkClass}>
                  Согласие на обработку данных
                </Link>
              </li>
              <li>
                <Link href="/terms-consultation" className={linkClass}>
                  Пользовательское соглашение
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/75">Контакты</p>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="tel:+79935021061"
                  className="inline-flex items-center gap-2.5 text-sm font-medium text-white/80 transition-colors hover:text-white"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/8">
                    <PhoneCall className="h-3.5 w-3.5" strokeWidth={1.875} aria-hidden />
                  </span>
                  8 (993) 502-10-61
                </a>
                <p className="ml-10 mt-0.5 text-xs font-medium text-white/70">Виталий</p>
                <p className="ml-10 mt-0.5 text-xs text-white/55">ПНД–СБ 7:00–20:00 МСК</p>
              </li>
              <li>
                <a
                  href="tel:+79221026331"
                  className="inline-flex items-center gap-2.5 text-sm font-medium text-white/80 transition-colors hover:text-white"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/8">
                    <PhoneCall className="h-3.5 w-3.5" strokeWidth={1.875} aria-hidden />
                  </span>
                  8 (922) 102-63-31
                </a>
                <p className="ml-10 mt-0.5 text-xs font-medium text-white/70">Владислав</p>
              </li>
              <li>
                <a
                  href="mailto:iTrader7.5@yandex.ru"
                  className="inline-flex items-center gap-2.5 text-sm font-medium text-white/80 transition-colors hover:text-white"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/8">
                    <Mail className="h-3.5 w-3.5" strokeWidth={1.875} aria-hidden />
                  </span>
                  iTrader7.5@yandex.ru
                </a>
              </li>
            </ul>
            <p className="mt-4 text-xs text-white/40">Мы на связи по всей России</p>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-8">
          <p className="text-xs text-white/35">© СВО Разбор, 2024–2026</p>
          <p className="mt-2 text-xs leading-relaxed text-white/35">
            Сайт не является государственным ресурсом и не оказывает государственных услуг.
          </p>
        </div>
      </div>
    </footer>
  );
}
