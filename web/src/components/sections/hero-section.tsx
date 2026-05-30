"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { hero } from "@/data/texts/landing";
import { Button } from "@/components/ui/button";
import { useQuiz } from "@/contexts/quiz-context";

const container = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 380, damping: 32 },
  },
};

const iconStroke = 1.875;

export function HeroSection() {
  const { startFlow } = useQuiz();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="ds-hero-spec relative overflow-hidden border-b border-[color-mix(in_srgb,white_12%,transparent)]"
      aria-labelledby="hero-title"
    >
      <div className="ds-hero-spec-lines" aria-hidden>
        <span />
        <span />
        <span />
      </div>

      <div className="relative mx-auto box-border w-full max-w-6xl px-4 pb-14 pt-12 min-[360px]:px-5 sm:px-6 lg:grid lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-center lg:gap-16 lg:px-8 lg:pb-28 lg:pt-20">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center lg:text-left"
        >
          <motion.p
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.08] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/85 backdrop-blur-sm min-[360px]:text-xs"
          >
            <Shield className="h-3.5 w-3.5 text-white/90" strokeWidth={iconStroke} aria-hidden />
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            id="hero-title"
            variants={item}
            className="mt-6 text-balance font-serif font-semibold leading-[1.1] tracking-tight text-white text-[clamp(2.125rem,5.5vw,3.75rem)]"
          >
            {hero.title}
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-white/80 md:text-lg lg:mx-0 lg:max-w-[38rem]"
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start"
          >
            <Button
              variant="cta"
              size="lg"
              className="w-full sm:w-auto sm:min-w-[240px]"
              onClick={() => scrollToSection("contact-form")}
            >
              {hero.ctaPrimary}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full border-2 border-white/85 bg-transparent text-white shadow-none hover:bg-white/10 hover:text-white sm:w-auto sm:min-w-[220px]"
              onClick={() => {
                startFlow("fresh");
                scrollToSection("quiz-calculator");
              }}
            >
              {hero.ctaDelay}
            </Button>
          </motion.div>

          <motion.p
            variants={item}
            className="mx-auto mt-5 max-w-xl text-center text-[11px] leading-relaxed text-white/50 lg:mx-0 lg:text-left"
          >
            {hero.disclaimer}
          </motion.p>

          <motion.p
            variants={item}
            className="mx-auto mt-3 text-center text-xs font-medium text-white/55 lg:mx-0 lg:text-left"
          >
            {hero.trustLine.join(" · ")}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 28 }}
          className="mt-14 lg:mt-0"
        >
          <div className="ds-spec-card ds-spec-card-hover mx-auto max-w-md lg:max-w-none">
            <p className="border-b border-[var(--light-blue-divider)] pb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">
              {hero.summaryCardTitle}
            </p>
            <p className="mt-5 font-serif font-semibold leading-none tracking-tight text-[var(--deep-blue)] text-[clamp(1.75rem,4vw,2.5rem)]">
              {hero.summaryAmountBadge}
            </p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">
              {hero.summaryAmountNote}
            </p>
            <ul className="mt-5 space-y-2.5">
              {hero.summaryBreakdown.map((row) => (
                <li
                  key={row.label}
                  className="flex items-baseline justify-between gap-3 border-b border-[var(--light-blue-divider)] pb-2.5 last:border-0 last:pb-0"
                >
                  <span className="text-sm text-[var(--text-secondary)]">{row.label}</span>
                  <span className="shrink-0 font-mono text-sm font-semibold text-[var(--text-primary)]">
                    {row.amount}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[11px] leading-relaxed text-[var(--text-muted)]">
              {hero.summaryDisclaimer}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
