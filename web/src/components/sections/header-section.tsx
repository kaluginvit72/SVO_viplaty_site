"use client";

import { useState } from "react";
import { Phone, Menu, X } from "lucide-react";

const navLinks = [
  { label: "О сервисе", href: "#review" },
  { label: "Как это работает", href: "#why" },
  { label: "Выплаты", href: "#payments" },
  { label: "FAQ", href: "#faq" },
  { label: "Контакты", href: "#contact-form" },
];

function ShieldLogo() {
  return (
    <svg width="36" height="40" viewBox="0 0 36 40" fill="none" aria-hidden>
      <path
        d="M18 2L3 8v12c0 9.4 6.4 18.2 15 20.4C26.6 38.2 33 29.4 33 20V8L18 2z"
        fill="#0E2744"
        stroke="white"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M18 2L3 8v12c0 9.4 6.4 18.2 15 20.4C26.6 38.2 33 29.4 33 20V8L18 2z"
        fill="url(#shield-grad)"
        fillOpacity="0.3"
      />
      <path
        d="M12 20l4 4 8-8"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="3" y="37" width="30" height="2.5" rx="1.25" fill="#D71920" />
      <defs>
        <linearGradient id="shield-grad" x1="18" y1="2" x2="18" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.15" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function scrollTo(href: string, closeFn?: () => void) {
  const id = href.replace("#", "");
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  closeFn?.();
}

export function HeaderSection() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#061426]">
      <div className="mx-auto flex max-w-[75rem] items-center justify-between gap-4 px-4 py-3 min-[360px]:px-5 lg:px-8">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="flex shrink-0 items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-lg"
          aria-label="СВО Разбор — на главную"
        >
          <ShieldLogo />
          <div>
            <p className="font-serif text-base font-bold leading-none text-white tracking-tight">
              СВО Разбор
            </p>
            <p className="mt-0.5 text-[10px] leading-tight text-white/55 hidden sm:block">
              Юридическая помощь семьям погибших
            </p>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Основная навигация">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="rounded-md px-3 py-2 text-sm font-medium text-white/75 transition-colors hover:bg-white/8 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Phone + mobile toggle */}
        <div className="flex items-center gap-3">
          <a
            href="tel:88003014567"
            className="hidden items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 xl:flex"
          >
            <Phone className="h-4 w-4 text-white/70" strokeWidth={1.875} aria-hidden />
            <span>8 800 301-45-67</span>
          </a>

          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-white/75 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
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
              href="tel:88003014567"
              className="mt-2 flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium text-white"
            >
              <Phone className="h-4 w-4 text-white/70" strokeWidth={1.875} aria-hidden />
              8 800 301-45-67
              <span className="ml-auto text-xs text-white/50">Пн–Пт 9:00–18:00 МСК</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
