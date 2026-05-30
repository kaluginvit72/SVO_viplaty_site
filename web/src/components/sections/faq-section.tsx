"use client";

import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import Link from "next/link";
import { faqItems, faqSection } from "@/data/texts/landing";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

const stroke = 1.875;

export function FaqSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="ds-section-y scroll-mt-[4.5rem] border-b border-[var(--cool-border)] bg-[var(--section-bg)] px-4 min-[360px]:px-5 lg:px-8"
    >
      <div className="mx-auto grid max-w-[75rem] gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-start"
        >
          <p className="ds-section-kicker">{faqSection.kicker}</p>
          <h2 id="faq-heading" className="ds-h2 mt-2 text-[var(--deep-blue)]">
            {faqSection.title}
          </h2>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.06, duration: 0.45 }}
            className="mt-8 w-full"
          >
            <Card className="overflow-hidden rounded-3xl border border-[var(--light-blue-divider)] shadow-[var(--shadow-spec-quiz)]">
              <CardContent className="p-0">
                <Accordion type="single" collapsible className="w-full px-1">
                  {faqItems.map((item, i) => (
                    <AccordionItem
                      key={item.q}
                      value={`item-${i}`}
                      className="border-[var(--light-blue-divider)] px-4 sm:px-5"
                    >
                      <AccordionTrigger className="py-5 text-left text-base font-medium text-[var(--text-primary)] hover:no-underline md:text-[1.05rem]">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="pb-5 text-[0.9375rem] leading-relaxed text-[var(--text-secondary)]">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
            <p className="mt-4 text-sm text-[var(--text-secondary)]">
              Подробные условия:{" "}
              <Link href="/terms-consultation" className="font-medium text-[var(--deep-blue)] underline underline-offset-2">
                Условия консультации и разбора ситуации
              </Link>
            </p>
          </motion.div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.09, duration: 0.45 }}
          className="rounded-2xl border border-[var(--cool-border)] bg-white p-6 shadow-[var(--shadow-spec-card)] lg:self-start lg:sticky lg:top-24"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--cool-border)] bg-[var(--neutral-surface)] text-[var(--deep-blue)]">
            <HelpCircle className="h-5 w-5" strokeWidth={stroke} aria-hidden />
          </div>
          <h3 className="mt-4 font-serif text-2xl font-semibold text-[var(--deep-blue)]">
            Нужен персональный разбор?
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
            Оставьте заявку, чтобы обсудить ситуацию индивидуально. Первичное обращение бесплатно, условия платного
            разбора согласуются отдельно до начала работы.
          </p>
          <a
            href="#contact-form"
            className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-[#D71920] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#B9151C]"
          >
            Перейти к форме
          </a>
        </motion.aside>
      </div>
    </section>
  );
}
