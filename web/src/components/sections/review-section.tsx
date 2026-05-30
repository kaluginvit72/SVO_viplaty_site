"use client";

import { motion } from "framer-motion";
import { AlertCircle, Banknote, Clock3, FileText, Scale, Users } from "lucide-react";
import type { ElementType } from "react";

const reviewCards = [
  {
    Icon: Scale,
    title: "Основания для выплат",
    body: "Проверяем возможные основания и категории выплат.",
  },
  {
    Icon: Users,
    title: "Состав семьи",
    body: "Определяем, кто может иметь право на получение выплат.",
  },
  {
    Icon: FileText,
    title: "Документы",
    body: "Смотрим комплектность и корректность имеющихся документов.",
  },
  {
    Icon: Clock3,
    title: "Сроки и риски",
    body: "Оцениваем сроки, причины задержек и возможные риски отказа.",
  },
  {
    Icon: Banknote,
    title: "Размер выплат",
    body: "Рассчитываем ориентир по федеральным и возможным дополнительным выплатам.",
  },
  {
    Icon: AlertCircle,
    title: "Отказы и задержки",
    body: "Выявляем вопросы, которые требуют отдельной проверки.",
  },
] as const;

function ReviewCard({ Icon, title, body }: { Icon: ElementType; title: string; body: string }) {
  return (
    <article className="ds-spec-card ds-spec-card-hover flex flex-col gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--cool-border)] bg-white text-[var(--deep-blue)] shadow-sm">
        <Icon className="h-5 w-5" strokeWidth={1.875} aria-hidden />
      </div>
      <p className="text-sm font-semibold leading-snug text-[var(--text-primary)]">{title}</p>
      <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{body}</p>
    </article>
  );
}

export function ReviewSection() {
  return (
    <section
      id="review"
      className="ds-section-y scroll-mt-[4.5rem] border-b border-[var(--cool-border)] bg-[var(--neutral-surface)] px-4 min-[360px]:px-5 lg:px-8"
      aria-labelledby="review-title"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <h2 id="review-title" className="ds-h2 text-[var(--deep-blue)]">
            Что проверяется на разборе
          </h2>
          <p className="ds-body mx-auto mt-4 max-w-3xl text-pretty">
            Не универсальная инструкция, а персональный разбор обстоятельств: какие основания требуют
            проверки, где могут быть риски и какие варианты действий стоит обсудить.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ delay: 0.08, duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {reviewCards.map((card) => (
            <ReviewCard key={card.title} {...card} />
          ))}
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ delay: 0.12, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 rounded-2xl border border-[var(--cool-border)] bg-white p-6 shadow-[var(--shadow-spec-card)] md:p-7"
        >
          <h3 className="font-serif text-2xl font-semibold leading-tight text-[var(--deep-blue)]">
            Что может потребовать отдельной проверки
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)] md:text-base">
            Дополнительные выплаты, компенсации расходов, региональные меры, спор о круге получателей,
            гражданский брак, фактическое воспитание, задержки и отказы требуют индивидуальной оценки.
            На разборе проверяется, какие из этих вопросов относятся к вашей ситуации.
          </p>
        </motion.article>
      </div>
    </section>
  );
}
