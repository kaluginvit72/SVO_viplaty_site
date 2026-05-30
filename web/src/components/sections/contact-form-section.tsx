"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { CheckCircle2, Loader2, Lock, MessageCircleHeart, ShieldCheck } from "lucide-react";
import { z } from "zod";
import { legalDownloadHref } from "@/data/legal-documents";
import { leadForm } from "@/data/texts/landing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const contactSchema = z.object({
  name: z.string().min(1, "Введите имя").max(80),
  contact: z.string().min(1, "Введите телефон или Telegram").max(120),
  region: z.string().max(120).optional(),
  relation: z.string().max(80).optional(),
  stage: z.string().max(120).optional(),
  message: z.string().max(1500).optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Необходимо согласие на обработку данных" }),
  }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactFormSection() {
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
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
    let res: Response;
    try {
      res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
    } catch {
      setServerError("Нет связи с сервером. Проверьте интернет и попробуйте снова.");
      return;
    }

    if (!res.ok) {
      const data = await res.json().catch(() => ({})) as { error?: string };
      setServerError(data.error ?? leadForm.submitErrorGeneric);
      return;
    }

    setSuccess(true);
  });

  const selectClass =
    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground";

  return (
    <section
      id="contact-form"
      className="ds-section-y scroll-mt-[4.5rem] border-b border-[var(--cool-border)] bg-[var(--main-bg)] px-4 min-[360px]:px-5 lg:px-8"
      aria-labelledby="contact-form-title"
    >
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--cool-border)] bg-white text-[var(--deep-blue)] shadow-[var(--shadow-spec-card)]">
            <MessageCircleHeart className="h-7 w-7" strokeWidth={1.875} aria-hidden />
          </div>
          <p className="ds-section-kicker mt-6">{leadForm.kicker}</p>
          <h2 id="contact-form-title" className="ds-h2 mt-2 text-[var(--deep-blue)]">
            {leadForm.title}
          </h2>
          <p className="ds-body mx-auto mt-4 max-w-lg text-pretty">{leadForm.subtitle}</p>
          <ul className="mx-auto mt-6 flex flex-wrap justify-center gap-2 text-xs font-medium text-[var(--text-secondary)] md:text-sm">
            {leadForm.chips.map((text, i) => {
              const Icon = i === 0 ? ShieldCheck : Lock;
              return (
                <li
                  key={text}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--cool-border)] bg-white px-3 py-1.5 shadow-sm"
                >
                  <Icon className="h-3.5 w-3.5 text-[var(--deep-blue)]" strokeWidth={1.875} aria-hidden />
                  {text}
                </li>
              );
            })}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ delay: 0.08, duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10"
        >
          {success ? (
            <div className="flex flex-col items-center gap-4 rounded-3xl border border-[var(--cool-border)] bg-white px-8 py-12 text-center shadow-[var(--shadow-spec-card)]">
              <CheckCircle2 className="h-12 w-12 text-[var(--deep-blue)]" strokeWidth={1.5} aria-hidden />
              <p className="text-lg font-semibold text-[var(--deep-blue)]">
                {leadForm.submitSuccess}
              </p>
            </div>
          ) : (
            <Card className="relative overflow-hidden rounded-3xl border-[var(--cool-border)] shadow-[var(--shadow-spec-form)]">
              <CardHeader className="border-b border-[var(--light-blue-divider)] bg-[var(--neutral-surface)] pb-5 md:pb-6">
                <CardTitle className="text-base font-semibold text-[var(--deep-blue)] md:text-lg">
                  {leadForm.sectionTitle}
                </CardTitle>
              </CardHeader>
              <CardContent className="bg-white pt-6 md:pt-8">
                <form
                  className="space-y-6 md:space-y-7"
                  onSubmit={onSubmit}
                  noValidate
                  aria-busy={isSubmitting}
                >
                  <div className="grid gap-5 md:grid-cols-2 md:gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="cf-name" className="text-sm font-medium">
                        {leadForm.nameLabel}
                      </Label>
                      <Input
                        id="cf-name"
                        autoComplete="name"
                        placeholder={leadForm.namePlaceholder}
                        {...register("name")}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "cf-name-err" : undefined}
                      />
                      {errors.name && (
                        <p id="cf-name-err" className="text-xs text-destructive">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cf-contact" className="text-sm font-medium">
                        {leadForm.contactLabel}
                      </Label>
                      <Input
                        id="cf-contact"
                        autoComplete="tel"
                        placeholder={leadForm.contactPlaceholder}
                        {...register("contact")}
                        aria-invalid={!!errors.contact}
                        aria-describedby={errors.contact ? "cf-contact-err" : undefined}
                      />
                      {errors.contact && (
                        <p id="cf-contact-err" className="text-xs text-destructive">
                          {errors.contact.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cf-region" className="text-sm font-medium">
                      {leadForm.regionLabel}{" "}
                      <span className="font-normal text-muted-foreground">— {leadForm.regionOptional}</span>
                    </Label>
                    <Input
                      id="cf-region"
                      placeholder={leadForm.regionPlaceholder}
                      {...register("region")}
                    />
                  </div>

                  <div className="grid gap-5 md:grid-cols-2 md:gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="cf-relation" className="text-sm font-medium">
                        {leadForm.relationLabel}
                      </Label>
                      <select
                        id="cf-relation"
                        className={selectClass}
                        {...register("relation")}
                      >
                        <option value="">{leadForm.relationPlaceholder}</option>
                        {leadForm.relationOptions.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cf-stage" className="text-sm font-medium">
                        {leadForm.stageLabel}
                      </Label>
                      <select
                        id="cf-stage"
                        className={selectClass}
                        {...register("stage")}
                      >
                        <option value="">{leadForm.stagePlaceholder}</option>
                        {leadForm.stageOptions.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cf-message" className="text-sm font-medium">
                      {leadForm.messageLabel}{" "}
                      <span className="font-normal text-muted-foreground">— {leadForm.messageOptional}</span>
                    </Label>
                    <Textarea
                      id="cf-message"
                      placeholder={leadForm.messagePlaceholder}
                      {...register("message")}
                    />
                  </div>

                  <div className="rounded-xl border border-[var(--light-blue-divider)] bg-[var(--neutral-surface)] p-4 md:p-5">
                    <div className="flex gap-4">
                      <Controller
                        name="consent"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            id="cf-consent"
                            checked={Boolean(field.value)}
                            onCheckedChange={(v) => field.onChange(v === true)}
                            onBlur={field.onBlur}
                            ref={field.ref}
                            aria-invalid={!!errors.consent}
                            className="mt-0.5"
                          />
                        )}
                      />
                      <div className="min-w-0 flex-1 space-y-2">
                        <label
                          htmlFor="cf-consent"
                          className="block cursor-pointer text-sm leading-relaxed text-foreground"
                        >
                          {leadForm.consentLead}{" "}
                          <span className="text-muted-foreground">на обработку персональных данных и ознакомлен(а) с</span>
                        </label>
                        <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm">
                          <span className="inline-flex flex-wrap items-baseline gap-x-1.5">
                            <Link
                              href="/privacy"
                              className="font-medium text-[var(--deep-blue)] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--deep-blue)_35%,transparent)] focus-visible:ring-offset-2 rounded-sm"
                            >
                              {leadForm.privacyLink}
                            </Link>
                            <a
                              href={legalDownloadHref.privacy}
                              download
                              className="text-xs font-medium text-muted-foreground underline-offset-4 hover:text-[var(--deep-blue)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--deep-blue)_35%,transparent)] focus-visible:ring-offset-2 rounded-sm"
                            >
                              {leadForm.legalDownloadShort}
                            </a>
                          </span>
                          <span className="text-[var(--text-secondary)]">·</span>
                          <span className="inline-flex flex-wrap items-baseline gap-x-1.5">
                            <Link
                              href="/consent"
                              className="font-medium text-[var(--deep-blue)] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--deep-blue)_35%,transparent)] focus-visible:ring-offset-2 rounded-sm"
                            >
                              {leadForm.consentLink}
                            </Link>
                            <a
                              href={legalDownloadHref.consent}
                              download
                              className="text-xs font-medium text-muted-foreground underline-offset-4 hover:text-[var(--deep-blue)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--deep-blue)_35%,transparent)] focus-visible:ring-offset-2 rounded-sm"
                            >
                              {leadForm.legalDownloadShort}
                            </a>
                          </span>
                        </p>
                      </div>
                    </div>
                    {errors.consent && (
                      <p className="mt-2 text-xs text-destructive" role="alert">
                        {errors.consent.message}
                      </p>
                    )}
                  </div>

                  {serverError && (
                    <p
                      className="rounded-xl border border-[color-mix(in_srgb,var(--accent-red)_35%,var(--cool-border))] bg-[var(--soft-red-bg)] px-3.5 py-2.5 text-sm text-[var(--status-alert)]"
                      role="alert"
                      aria-live="assertive"
                    >
                      {serverError}
                    </p>
                  )}

                  <Button
                    type="submit"
                    variant="cta"
                    size="touch"
                    className="text-base font-semibold sm:min-h-12"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="size-5 shrink-0 animate-spin" aria-hidden />
                        {leadForm.submitSending}
                      </>
                    ) : (
                      leadForm.submit
                    )}
                  </Button>
                  <p className="text-center text-sm text-muted-foreground">
                    {leadForm.note}
                  </p>
                </form>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </section>
  );
}
