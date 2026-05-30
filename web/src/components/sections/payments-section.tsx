"use client";

import { motion } from "framer-motion";
import { Landmark, ShieldCheck, Star } from "lucide-react";
import { paymentsSection } from "@/data/texts/landing";

const cardIcons = [Star, Landmark, ShieldCheck];

export function PaymentsSection() {
  return (
    <section
      id="payments"
      className="scroll-mt-20 border-b border-[var(--cool-border)] bg-white px-4 py-14 min-[360px]:px-5 md:py-20 lg:px-8 lg:py-24"
      aria-labelledby="payments-title"
    >
      <div className="mx-auto max-w-[75rem]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <h2
              id="payments-title"
              className="ds-h2 text-[var(--deep-blue)]"
            >
              {paymentsSection.title}
            </h2>
          </div>
          <p className="text-sm text-[var(--text-secondary)] sm:text-right">
            {paymentsSection.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ delay: 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {paymentsSection.cards.map((card, i) => (
            <div
              key={card.title}
              className="relative overflow-hidden rounded-2xl border border-[var(--cool-border)] bg-white p-6 shadow-[var(--shadow-spec-card)] transition-shadow hover:shadow-[0_14px_36px_rgba(11,31,58,0.12)] md:p-7"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--icon-red-bg)] text-[#D71920]">
                  {(() => {
                    const Icon = cardIcons[i];
                    return <Icon className="h-5 w-5" strokeWidth={1.9} aria-hidden />;
                  })()}
                </span>
                <p className="font-serif text-[clamp(1.75rem,4vw,2.25rem)] font-bold leading-none tracking-tight text-[var(--primary-navy)]">
                  {card.amount}
                </p>
              </div>
              <p className="mt-4 text-base font-semibold text-[var(--text-primary)]">
                {card.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                {card.description}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="mt-6 text-[11px] leading-relaxed text-[var(--text-secondary)] sm:text-xs"
        >
          * {paymentsSection.disclaimer}
        </motion.p>
      </div>
    </section>
  );
}
