"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle } from "lucide-react";
import { roadmapSection, checklistSection, sourcesSection } from "@/data/texts/roadmap";
import { cn } from "@/lib/utils";

const fade = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const },
};

export function RoadmapSection() {
  const [active, setActive] = useState<string>(roadmapSection.scenarios[0].id);
  const current = roadmapSection.scenarios.find((s) => s.id === active)!;

  return (
    <section
      id="roadmap"
      aria-labelledby="roadmap-heading"
      className="ds-section-y scroll-mt-[4.5rem] border-b border-[var(--cool-border)] bg-[var(--alt-bg)] px-4 min-[360px]:px-5 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div {...fade} className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left">
          <p className="ds-section-kicker">{roadmapSection.kicker}</p>
          <h2 id="roadmap-heading" className="ds-h2 mt-3">
            {roadmapSection.h2}
          </h2>
          <p className="ds-body mt-4">{roadmapSection.intro}</p>
        </motion.div>

        {/* Табы сценариев */}
        <div className="mt-8 flex flex-wrap gap-2">
          {roadmapSection.scenarios.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              aria-pressed={active === s.id}
              className={cn(
                "rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
                active === s.id
                  ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                  : "border-[var(--cool-border)] bg-[var(--main-bg)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]",
              )}
            >
              Сценарий {s.label}: {s.title}
            </button>
          ))}
        </div>

        {/* Шаги */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6 rounded-2xl border border-[var(--cool-border)] bg-[var(--main-bg)] p-6 shadow-[var(--shadow-spec-card)]"
        >
          <h3 className="text-base font-semibold text-[var(--text-primary)]">
            {current.title}
          </h3>
          <ol className="mt-5 space-y-4">
            {current.steps.map((step, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                className="flex gap-3"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/10 text-xs font-bold text-[var(--accent)]">
                  {i + 1}
                </span>
                <span className="ds-body text-[var(--text-secondary)]">{step}</span>
              </motion.li>
            ))}
          </ol>
        </motion.div>
      </div>
    </section>
  );
}

export function ChecklistSection() {
  return (
    <section
      id="checklists"
      aria-labelledby="checklists-heading"
      className="ds-section-y scroll-mt-[4.5rem] border-b border-[var(--cool-border)] bg-[var(--main-bg)] px-4 min-[360px]:px-5 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div {...fade} className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left">
          <p className="ds-section-kicker">{checklistSection.kicker}</p>
          <h2 id="checklists-heading" className="ds-h2 mt-3">
            {checklistSection.h2}
          </h2>
          <p className="ds-body mt-4">{checklistSection.intro}</p>
        </motion.div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {checklistSection.lists.map((list, li) => (
            <motion.div
              key={list.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: li * 0.08, duration: 0.4 }}
              className="rounded-2xl border border-[var(--cool-border)] bg-[var(--alt-bg)] p-6 shadow-[var(--shadow-spec-card)]"
            >
              <h3 className="text-base font-semibold text-[var(--text-primary)]">{list.title}</h3>
              <ul className="mt-4 space-y-3">
                {list.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Circle
                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]/40"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                    <span className="ds-body text-sm text-[var(--text-secondary)]">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SourcesSection() {
  return (
    <section
      id="sources"
      aria-labelledby="sources-heading"
      className="ds-section-y scroll-mt-[4.5rem] border-b border-[var(--cool-border)] bg-[var(--alt-bg)] px-4 min-[360px]:px-5 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div {...fade} className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left">
          <p className="ds-section-kicker">{sourcesSection.kicker}</p>
          <h2 id="sources-heading" className="ds-h2 mt-3">
            {sourcesSection.h2}
          </h2>
          <p className="ds-body mt-4">{sourcesSection.intro}</p>
        </motion.div>

        <div className="mt-8 space-y-3">
          {sourcesSection.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -6 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.05, duration: 0.35 }}
              className="flex gap-3 rounded-xl border border-[var(--cool-border)] bg-[var(--main-bg)] px-5 py-4"
            >
              <CheckCircle2
                className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]"
                strokeWidth={1.75}
                aria-hidden
              />
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">{item.label}</p>
                <p className="mt-0.5 text-sm text-[var(--text-muted)]">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-6 text-xs text-[var(--text-muted)]">{sourcesSection.dated}</p>
      </div>
    </section>
  );
}
