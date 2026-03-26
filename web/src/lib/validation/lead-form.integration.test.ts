import { describe, expect, it } from "vitest";
import { leadApiSchema, leadFormSchema } from "@/lib/validation/lead";

const validFreshQuiz = {
  flowMode: "fresh" as const,
  completed: true,
  answers: {
    deceasedRole: "mobilized" as const,
    relation: "spouse" as const,
    recipients: "only_me" as const,
    documents: ["death_cert"] as const,
    region: "Москва",
  },
};

describe("leadFormSchema", () => {
  it("отклоняет пустое имя", () => {
    const r = leadFormSchema.safeParse({
      name: "  ",
      phone: "+79001234567",
      region: "Москва",
      consent: true,
    });
    expect(r.success).toBe(false);
  });

  it("отклоняет короткий телефон", () => {
    const r = leadFormSchema.safeParse({
      name: "Иван",
      phone: "123",
      region: "Москва",
      consent: true,
    });
    expect(r.success).toBe(false);
  });

  it("отклоняет без согласия", () => {
    const r = leadFormSchema.safeParse({
      name: "Иван",
      phone: "+79001234567",
      region: "Москва",
      consent: false,
    });
    expect(r.success).toBe(false);
  });

  it("валидный минимальный набор", () => {
    const r = leadFormSchema.safeParse({
      name: "Иван",
      phone: "+79001234567",
      region: "Москва",
      consent: true,
    });
    expect(r.success).toBe(true);
  });
});

describe("leadApiSchema (integration)", () => {
  it("без quiz.flowMode и scenario — отклоняется", () => {
    const r = leadApiSchema.safeParse({
      name: "Иван",
      phone: "+79001234567",
      region: "Москва",
      consent: true,
      quiz: { completed: true, answers: validFreshQuiz.answers },
    });
    expect(r.success).toBe(false);
  });

  it("happy path fresh + completed", () => {
    const r = leadApiSchema.safeParse({
      name: "Иван",
      phone: "+79001234567",
      region: "Москва",
      consent: true,
      quiz: validFreshQuiz,
    });
    expect(r.success).toBe(true);
  });

  it("clarify завершённый с полными ответами", () => {
    const r = leadApiSchema.safeParse({
      name: "Иван",
      phone: "+79001234567",
      region: "Москва",
      consent: true,
      quiz: {
        flowMode: "clarify",
        completed: true,
        answers: {
          clarifyDeathCert: "yes",
          clarifyMilitaryNotice: "yes",
          clarifyKinshipDocs: "complete",
          clarifyCopiesStatus: "ready",
          clarifyFilingStatus: "not_yet",
          clarifyWhereSubmitted: "not_yet",
          clarifyConsequenceFocus: "full_overview",
        },
      },
    });
    expect(r.success).toBe(true);
  });

  it("режим stuck на сервере допускается как clarify-ветка по superRefine", () => {
    const r = leadApiSchema.safeParse({
      name: "Иван",
      phone: "+79001234567",
      region: "Москва",
      consent: true,
      quiz: {
        flowMode: "stuck",
        completed: true,
        answers: {
          stuckProblemType: "no_response",
          stuckSubmittedItems: ["main_application"],
          stuckSubmittedToList: ["military_unit"],
          stuckResponseStatus: "silent",
          stuckMonthsWaiting: 2,
        },
      },
    });
    expect(r.success).toBe(true);
  });
});
