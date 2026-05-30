"use client";

import { motion } from "framer-motion";
import { ArrowRight, Info, ShieldCheck, Globe, CheckSquare2, Heart } from "lucide-react";
import { hero, trustBar } from "@/data/texts/landing";
import { Button } from "@/components/ui/button";

const container = {
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 360, damping: 34 } },
};

const trustIcons = [ShieldCheck, Globe, CheckSquare2, Heart];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function HeroSection() {
  return (
    <>
      <section
        className="ds-hero-spec relative overflow-hidden"
        aria-labelledby="hero-title"
      >
        <div className="ds-hero-spec-lines" aria-hidden>
          <span />
          <span />
          <span />
        </div>

        {/* Decorative right panel */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] lg:block"
          aria-hidden
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#061426] via-[#061426]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0E2744]/80 via-[#0b1f3a]/50 to-[#061426]/90" />
          {/* Shield silhouette */}
          <svg
            className="absolute right-8 top-1/2 -translate-y-1/2 opacity-[0.07]"
            width="320"
            height="380"
            viewBox="0 0 320 380"
            fill="none"
          >
            <path
              d="M160 10L20 60v120c0 90 60 172 140 195C240 352 300 270 300 180V60L160 10z"
              fill="white"
            />
          </svg>
          {/* Decorative dots */}
          <svg className="absolute bottom-12 right-12 opacity-[0.12]" width="120" height="120" viewBox="0 0 120 120">
            {Array.from({ length: 6 }).map((_, row) =>
              Array.from({ length: 6 }).map((_, col) => (
                <circle
                  key={`${row}-${col}`}
                  cx={col * 20 + 10}
                  cy={row * 20 + 10}
                  r="2"
                  fill="white"
                />
              ))
            )}
          </svg>
          {/* Red accent line */}
          <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#D71920]/30 to-transparent" />
        </div>

        <div className="relative mx-auto box-border w-full max-w-[75rem] px-4 pb-16 pt-14 min-[360px]:px-5 lg:px-8 lg:pb-24 lg:pt-20">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-[600px]"
          >
            <motion.p
              variants={item}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.07] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/75 backdrop-blur-sm"
            >
              Консультационный сервис
            </motion.p>

            <motion.h1
              id="hero-title"
              variants={item}
              className="mt-5 font-serif font-bold leading-[1.08] tracking-tight text-white text-[clamp(2rem,5vw,3.25rem)]"
            >
              {hero.title}
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-4 text-base leading-relaxed text-white/70 md:text-lg"
            >
              {hero.subtitle}
            </motion.p>

            {/* Amount */}
            <motion.div variants={item} className="mt-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
                Ориентир по трём федеральным выплатам
              </p>
              <p className="mt-2 font-serif font-bold leading-none tracking-tight text-white text-[clamp(2.5rem,7vw,4.5rem)]">
                {hero.summaryAmountBadge}
              </p>
              <div className="mt-3 flex items-start gap-2 text-white/55">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={1.875} aria-hidden />
                <p className="text-xs leading-relaxed">
                  Итоговый размер выплат зависит от документов, состава семьи и официальных решений.
                </p>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={item}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            >
              <button
                onClick={() => scrollTo("contact-form")}
                className="inline-flex h-14 min-w-[220px] items-center justify-center gap-2 rounded-xl bg-[#D71920] px-7 text-base font-semibold text-white shadow-[0_8px_28px_-10px_rgba(215,25,32,0.6)] transition-all hover:bg-[#b91520] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 sm:w-auto"
              >
                {hero.ctaPrimary}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
              <button
                onClick={() => scrollTo("payments")}
                className="inline-flex h-14 min-w-[220px] items-center justify-center gap-2 rounded-xl border-2 border-white/30 bg-transparent px-7 text-base font-semibold text-white transition-all hover:border-white/50 hover:bg-white/8 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 sm:w-auto"
              >
                {hero.ctaDelay}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            </motion.div>

            <motion.p
              variants={item}
              className="mt-5 text-[11px] leading-relaxed text-white/40"
            >
              {hero.disclaimer}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Trust bar */}
      <div className="border-b border-white/10 bg-[#0b1f3a]">
        <div className="mx-auto max-w-[75rem] px-4 min-[360px]:px-5 lg:px-8">
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-4 sm:justify-between sm:py-5">
            {trustBar.map((item, i) => {
              const Icon = trustIcons[i];
              return (
                <li
                  key={item.label}
                  className="flex items-center gap-2 text-xs font-medium text-white/65 sm:text-sm"
                >
                  <Icon className="h-4 w-4 shrink-0 text-white/50" strokeWidth={1.75} aria-hidden />
                  {item.label}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
