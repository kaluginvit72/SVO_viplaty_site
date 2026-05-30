"use client";

import { motion } from "framer-motion";
import {
  CheckSquare2,
  Clock,
  FileSearch,
  HelpCircle,
  ListChecks,
  Route,
  Users,
  AlertCircle,
  BadgeCheck,
  Banknote,
  GitBranch,
  TimerOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const reviewCards = [
  {
    Icon: FileSearch,
    title: "Какие федеральные выплаты могут относиться к ситуации",
    body: "Три основных разовых блока, дополнительные компенсации и ежемесячные строки — разбираем по каждому основанию, а не одним списком.",
  },
  {
    Icon: Users,
    title: "Кто из членов семьи может иметь право",
    body: "Круг получателей по каждой выплате свой. Проверяем родство, регистрацию, очерёдность — и что делать, если несколько заявителей.",
  },
  {
    Icon: Banknote,
    title: "Какие выплаты уже могли быть пропущены",
    body: "Региональные меры, компенсации расходов, наградное поощрение — то, что часто остаётся незамеченным при самостоятельном обращении.",
  },
  {
    Icon: AlertCircle,
    title: "Есть ли признаки задержки, отказа или неполного начисления",
    body: "Если выплаты уже подавали — смотрим, на каком этапе ситуация, где может быть узкое место и что можно уточнить.",
  },
  {
    Icon: ListChecks,
    title: "Какие документы и обстоятельства требуют отдельной проверки",
    body: "Гражданский брак, нестандартное родство, иждивение, несовершеннолетние — каждая нестандартная ситуация требует своего подхода.",
  },
  {
    Icon: Route,
    title: "Какие дальнейшие действия могут быть целесообразны",
    body: "Не универсальная инструкция, а конкретный следующий шаг в вашей ситуации: куда, в каком порядке и что фиксировать.",
  },
] as const;

const whenCards = [
  {
    Icon: HelpCircle,
    title: "Документы ещё не подавали",
    body: "Хотите понять, на какие выплаты может быть право и с чего начать — до первого обращения в инстанции.",
  },
  {
    Icon: Clock,
    title: "Документы подали, ответа нет",
    body: "Заявление ушло, но тишина. Нужно понять: ждать ли, или уже есть смысл уточнять статус.",
  },
  {
    Icon: TimerOff,
    title: "Получили отказ",
    body: "Отказ может быть обоснованным, а может — связан с документами или неверным адресатом. Стоит разобраться.",
  },
  {
    Icon: CheckSquare2,
    title: "Выплаты пришли частично",
    body: "Часть денег есть, но по другим основаниям — тишина. Проверяем, что должно быть и что ещё в работе.",
  },
  {
    Icon: BadgeCheck,
    title: "Непонятно, всё ли начислено",
    body: "Сумма пришла, но есть ощущение, что не всё. Сверяем по основаниям и обстоятельствам вашего случая.",
  },
  {
    Icon: GitBranch,
    title: "Несколько членов семьи претендуют",
    body: "Жена, родители, дети — у каждого свои основания. Помогаем разобраться, кто и что подаёт отдельно.",
  },
] as const;

const scrollToContact = () => {
  document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
};

function ReviewCard({ Icon, title, body }: { Icon: React.ElementType; title: string; body: string }) {
  return (
    <div className="ds-spec-card flex flex-col gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--cool-border)] bg-white text-[var(--deep-blue)] shadow-sm">
        <Icon className="h-5 w-5" strokeWidth={1.875} aria-hidden />
      </div>
      <p className="text-sm font-semibold leading-snug text-[var(--text-primary)]">{title}</p>
      <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{body}</p>
    </div>
  );
}

export function ReviewSection() {
  return (
    <>
      <section
        id="review"
        className="ds-section-y scroll-mt-[4.5rem] border-b border-[var(--cool-border)] bg-[var(--main-bg)] px-4 min-[360px]:px-5 lg:px-8"
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
            <p className="ds-section-kicker">Разбор</p>
            <h2 id="review-title" className="ds-h2 mt-2 text-[var(--deep-blue)]">
              Что проверяется на разборе
            </h2>
            <p className="ds-body mx-auto mt-4 max-w-xl text-pretty">
              Персональный разбор — не общая инструкция. Это анализ вашей конкретной ситуации по нескольким направлениям одновременно.
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

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ delay: 0.12, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col items-center gap-4 text-center"
          >
            <p className="max-w-lg text-sm text-[var(--text-secondary)]">
              Точный маршрут определяется после изучения ситуации. Оставьте контакт — консультант разберёт ваш конкретный случай.
            </p>
            <Button variant="cta" size="lg" className="sm:min-w-[260px]" onClick={scrollToContact}>
              Получить персональный разбор
            </Button>
          </motion.div>
        </div>
      </section>

      <section
        className="ds-section-y scroll-mt-[4.5rem] border-b border-[var(--cool-border)] bg-[var(--neutral-surface)] px-4 min-[360px]:px-5 lg:px-8"
        aria-labelledby="when-title"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <p className="ds-section-kicker">Поводы обратиться</p>
            <h2 id="when-title" className="ds-h2 mt-2 text-[var(--deep-blue)]">
              Когда стоит обратиться
            </h2>
            <p className="ds-body mx-auto mt-4 max-w-xl text-pretty">
              На разбор приходят с разными ситуациями — на любом этапе, с документами или без.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ delay: 0.08, duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {whenCards.map((card) => (
              <ReviewCard key={card.title} {...card} />
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
