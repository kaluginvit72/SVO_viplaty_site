"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { whySection, leadForm } from "@/data/texts/landing";
import { legalDownloadHref } from "@/data/legal-documents";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const schema = z.object({
  name: z.string().min(1, "Введите имя").max(80),
  contact: z.string().min(1, "Введите телефон или Telegram").max(120),
  region: z.string().max(120).optional(),
  relation: z.string().max(80).optional(),
  stage: z.string().max(120).optional(),
  message: z.string().max(1500).optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Необходимо согласие" }),
  }),
});

type FormValues = z.infer<typeof schema>;

const inputClass =
  "w-full rounded-lg border border-white/20 bg-white/10 px-3.5 py-2.5 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-white/50 focus:bg-white/15 focus:ring-2 focus:ring-white/20";

const selectClass =
  "w-full rounded-lg border border-white/20 bg-[#0b2040] px-3.5 py-2.5 text-sm text-white/80 outline-none transition focus:border-white/50 focus:ring-2 focus:ring-white/20 [&>option]:bg-[#0b2040] [&>option]:text-white";

export function WhySection() {
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      contact: "",
      region: "",
      relation: "",
      stage: "",
      message: "",
      consent: undefined as unknown as true,
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({})) as { error?: string };
        setServerError(data.error ?? leadForm.submitErrorGeneric);
        return;
      }
      setSuccess(true);
    } catch {
      setServerError("Нет связи с сервером. Проверьте интернет и попробуйте снова.");
    }
  });

  return (
    <section
      id="why"
      className="scroll-mt-20 border-b border-[var(--cool-border)] bg-white px-4 py-14 min-[360px]:px-5 md:py-20 lg:px-8 lg:py-24"
      aria-labelledby="why-title"
    >
      <div className="mx-auto max-w-[75rem]">
        <div className="grid gap-12 lg:grid-cols-[1fr_460px] lg:gap-16 xl:grid-cols-[1fr_480px]">

          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-center"
          >
            <p className="ds-section-kicker">{whySection.kicker}</p>
            <h2 id="why-title" className="ds-h2 mt-2 text-[var(--deep-blue)]">
              {whySection.title}
            </h2>
            <ul className="mt-8 space-y-5">
              {whySection.points.map((point) => (
                <li key={point} className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--icon-red-bg)]">
                    <CheckCircle2 className="h-4 w-4 text-[#D71920]" strokeWidth={2} aria-hidden />
                  </span>
                  <p className="text-base leading-relaxed text-[var(--text-secondary)]">{point}</p>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right: form on dark card */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              id="contact-form"
              className="scroll-mt-24 rounded-2xl p-6 shadow-[0_20px_60px_rgba(6,20,38,0.35)] md:p-8"
              style={{ background: "linear-gradient(160deg, #0E2744 0%, #061426 100%)" }}
            >
              {success ? (
                <div className="flex flex-col items-center gap-4 py-10 text-center">
                  <CheckCircle2 className="h-12 w-12 text-white" strokeWidth={1.5} aria-hidden />
                  <p className="text-lg font-semibold text-white">{leadForm.submitSuccess}</p>
                </div>
              ) : (
                <>
                  <p className="font-serif text-xl font-bold text-white">{whySection.formTitle}</p>
                  <p className="mt-1.5 text-sm text-white/60">{whySection.formSubtitle}</p>

                  <form
                    className="mt-6 space-y-4"
                    onSubmit={onSubmit}
                    noValidate
                    aria-busy={isSubmitting}
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label htmlFor="wf-name" className="text-xs font-medium text-white/70">
                          {leadForm.nameLabel}
                        </Label>
                        <input
                          id="wf-name"
                          className={inputClass}
                          placeholder={leadForm.namePlaceholder}
                          autoComplete="name"
                          {...register("name")}
                          aria-invalid={!!errors.name}
                        />
                        {errors.name && (
                          <p className="text-xs text-red-400">{errors.name.message}</p>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="wf-contact" className="text-xs font-medium text-white/70">
                          {leadForm.contactLabel}
                        </Label>
                        <input
                          id="wf-contact"
                          className={inputClass}
                          placeholder={leadForm.contactPlaceholder}
                          autoComplete="tel"
                          {...register("contact")}
                          aria-invalid={!!errors.contact}
                        />
                        {errors.contact && (
                          <p className="text-xs text-red-400">{errors.contact.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="wf-region" className="text-xs font-medium text-white/70">
                        {leadForm.regionLabel}{" "}
                        <span className="text-white/35">— {leadForm.regionOptional}</span>
                      </Label>
                      <input
                        id="wf-region"
                        className={inputClass}
                        placeholder={leadForm.regionPlaceholder}
                        {...register("region")}
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label htmlFor="wf-relation" className="text-xs font-medium text-white/70">
                          {leadForm.relationLabel}
                        </Label>
                        <select
                          id="wf-relation"
                          className={selectClass}
                          {...register("relation")}
                        >
                          <option value="">{leadForm.relationPlaceholder}</option>
                          {leadForm.relationOptions.map((o) => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="wf-stage" className="text-xs font-medium text-white/70">
                          {leadForm.stageLabel}
                        </Label>
                        <select
                          id="wf-stage"
                          className={selectClass}
                          {...register("stage")}
                        >
                          <option value="">{leadForm.stagePlaceholder}</option>
                          {leadForm.stageOptions.map((o) => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="wf-message" className="text-xs font-medium text-white/70">
                        {leadForm.messageLabel}{" "}
                        <span className="text-white/35">— {leadForm.messageOptional}</span>
                      </Label>
                      <textarea
                        id="wf-message"
                        rows={3}
                        className={`${inputClass} resize-none`}
                        placeholder={leadForm.messagePlaceholder}
                        {...register("message")}
                      />
                    </div>

                    {/* Consent */}
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3.5">
                      <div className="flex gap-3">
                        <Controller
                          name="consent"
                          control={control}
                          render={({ field }) => (
                            <Checkbox
                              id="wf-consent"
                              checked={Boolean(field.value)}
                              onCheckedChange={(v) => field.onChange(v === true)}
                              onBlur={field.onBlur}
                              ref={field.ref}
                              className="mt-0.5 border-white/30 data-[state=checked]:bg-[#D71920] data-[state=checked]:border-[#D71920]"
                            />
                          )}
                        />
                        <div className="min-w-0 flex-1">
                          <label htmlFor="wf-consent" className="block cursor-pointer text-xs leading-relaxed text-white/65">
                            Я согласен(на) на обработку персональных данных и ознакомлен(а) с{" "}
                            <Link href="/privacy" className="text-white/85 underline underline-offset-2 hover:text-white">
                              Политикой конфиденциальности
                            </Link>
                            {" "}
                            <a href={legalDownloadHref.privacy} download className="text-white/45 text-[10px] hover:text-white/70">скачать</a>
                            {" · "}
                            <Link href="/consent" className="text-white/85 underline underline-offset-2 hover:text-white">
                              Текст согласия
                            </Link>
                            {" "}
                            <a href={legalDownloadHref.consent} download className="text-white/45 text-[10px] hover:text-white/70">скачать</a>
                          </label>
                        </div>
                      </div>
                      {errors.consent && (
                        <p className="mt-1.5 text-xs text-red-400">{errors.consent.message}</p>
                      )}
                    </div>

                    {serverError && (
                      <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2.5 text-sm text-red-300" role="alert">
                        {serverError}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#D71920] py-3.5 text-base font-semibold text-white shadow-[0_8px_24px_-8px_rgba(215,25,32,0.6)] transition-all hover:bg-[#b91520] active:scale-[0.98] disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                    >
                      {isSubmitting ? (
                        <><Loader2 className="size-5 animate-spin" aria-hidden />{leadForm.submitSending}</>
                      ) : (
                        leadForm.submit
                      )}
                    </button>

                    <p className="text-center text-[11px] text-white/40">
                      Ваши данные используются только для связи и предварительного разбора обращения.
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
