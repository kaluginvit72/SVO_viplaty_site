"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "О сервисе", href: "#review" },
  { label: "Как это работает", href: "#why" },
  { label: "Выплаты", href: "#payments" },
  { label: "Отзывы", href: "#sources" },
  { label: "FAQ", href: "#faq" },
  { label: "Контакты", href: "#contact-form" },
];

function scrollTo(href: string, closeFn?: () => void) {
  const id = href.replace("#", "");
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  closeFn?.();
}

export function HeaderSection() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-50 border-b border-[rgba(255,255,255,0.08)] bg-[#061426]">
      <div className="mx-auto hidden h-[72px] w-full max-w-[75rem] lg:block">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="absolute left-10 top-1/2 block -translate-y-1/2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          aria-label="СВО Разбор — на главную"
        >
          <Image
            src="/images/logo-shit.png"
            alt="СВО Разбор. Юридическая помощь семьям погибших участников СВО"
            width={276}
            height={72}
            priority
            className="h-auto w-[276px]"
          />
        </a>

        <nav
          className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-7"
          aria-label="Основная навигация"
        >
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-[1.04rem] font-medium text-white/85 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="absolute right-10 top-[15px] text-right">
          <p className="text-[1.1rem] font-semibold leading-tight text-white xl:text-[1.2rem]">8 (993) 502-10-61</p>
          <p className="text-[0.78rem] text-white/70 xl:text-[0.82rem]">ПНД–СБ 7:00–20:00 МСК</p>
        </div>
      </div>

      <div className="mx-auto flex h-[72px] w-full max-w-[75rem] items-center justify-between px-4 min-[360px]:px-5 lg:hidden">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          aria-label="СВО Разбор — на главную"
        >
          <Image
            src="/images/logo-shit.png"
            alt="СВО Разбор. Юридическая помощь семьям погибших участников СВО"
            width={174}
            height={46}
            className="h-auto w-[174px]"
          />
        </a>

        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-white/75 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-[#061426] px-4 pb-4 pt-2 min-[360px]:px-5 lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Мобильная навигация">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href, () => setOpen(false))}
                className="w-full rounded-lg px-4 py-3 text-left text-sm font-medium text-white/80 transition-colors hover:bg-white/8 hover:text-white"
              >
                {link.label}
              </button>
            ))}
            <a
              href="tel:+79935021061"
              className="mt-2 block rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium text-white"
            >
              8 (993) 502-10-61
              <span className="mt-0.5 block text-xs text-white/65">ПНД–СБ 7:00–20:00 МСК</span>
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
