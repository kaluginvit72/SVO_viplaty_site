"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Info, MessageSquare, ShieldCheck } from "lucide-react";
import { hero } from "@/data/texts/landing";

const container = {
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 360, damping: 34 } },
};

const trustIcons = [ShieldCheck, Globe, MessageSquare, MessageSquare];
const trustItems = [
  "Профессионально и конфиденциально",
  "Работаем по всей России",
  "Проверка всех оснований для выплат",
  "Сопровождение до получения выплат",
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function HeroSection() {
  return (
    <>
      <section
        className="relative min-h-[32.5rem] overflow-hidden bg-[#061426]"
        aria-labelledby="hero-title"
      >
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[48%] lg:block" aria-hidden>
          <Image
            src="/images/kartinka.png"
            alt=""
            fill
            sizes="(min-width: 1024px) 48vw, 0px"
            className="object-contain object-right-center brightness-125 contrast-110 saturate-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#061426] via-[#061426]/46 to-transparent" />
        </div>

        <div className="relative mx-auto box-border w-full max-w-[75rem] px-4 pb-16 pt-14 min-[360px]:px-5 lg:px-8 lg:pb-24 lg:pt-20">
          <motion.div variants={container} initial="hidden" animate="show" className="max-w-[640px]">
            <motion.h1
              id="hero-title"
              variants={item}
              className="mt-2 font-serif text-[clamp(2.65rem,4.25vw,3rem)] font-bold leading-[1.05] tracking-tight text-white"
            >
              Проверьте выплаты семье
              <br />
              погибшего участника СВО
            </motion.h1>

            <motion.p variants={item} className="mt-4 text-base leading-relaxed text-white/82 md:text-[1.125rem]">
              Ориентир по трём основным федеральным выплатам
            </motion.p>

            <motion.div variants={item} className="mt-8">
              <p className="mt-2 font-serif text-[clamp(3rem,6.2vw,4.5rem)] font-bold leading-none tracking-tight text-white">
                14 208 154,28 ₽
              </p>
              <div className="mt-4 flex items-start gap-2 text-white/72">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={1.875} aria-hidden />
                <p className="max-w-[36rem] text-xs leading-relaxed md:text-sm">
                  Итоговый размер выплат зависит от документов, состава семьи и официальных решений.
                </p>
              </div>
            </motion.div>

            <motion.div variants={item} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                onClick={() => scrollTo("contact-form")}
                className="inline-flex h-14 min-w-[240px] items-center justify-center gap-2 rounded-xl bg-[#D71920] px-7 text-base font-semibold text-white shadow-[0_8px_28px_-10px_rgba(215,25,32,0.6)] transition-all hover:bg-[#B9151C] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 sm:w-auto"
              >
                Получить разбор ситуации
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
              <button
                onClick={() => scrollTo("payments")}
                className="inline-flex h-14 min-w-[240px] items-center justify-center gap-2 rounded-xl border border-white/40 bg-transparent px-7 text-base font-semibold text-white transition-all hover:border-white/60 hover:bg-white/8 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 sm:w-auto"
              >
                Предварительно проверить выплаты
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            </motion.div>

            <motion.p variants={item} className="mt-5 text-[11px] leading-relaxed text-white/45 md:text-xs">
              {hero.disclaimer}
            </motion.p>
          </motion.div>
        </div>
      </section>

      <div className="border-b border-white/10 bg-[#081A2F]">
        <div className="mx-auto max-w-[75rem] px-4 min-[360px]:px-5 lg:px-8">
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-4 sm:justify-between sm:py-5">
            {trustItems.map((trustItem, i) => {
              const Icon = trustIcons[i];
              return (
                <li key={trustItem} className="flex items-center gap-2 text-xs font-medium text-white/70 sm:text-sm">
                  <Icon className="h-4 w-4 shrink-0 text-white/55" strokeWidth={1.75} aria-hidden />
                  {trustItem}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
