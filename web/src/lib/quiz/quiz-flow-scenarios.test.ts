import { describe, expect, it } from "vitest";
import { getVisibleSteps } from "@/lib/quiz/steps";
import { validateQuizStep } from "@/lib/quiz/validate-quiz-step";
import type { QuizAnswers } from "@/types/quiz";

/**
 * Снимки «полных» ответов: каждый шаг видимой цепочки должен валидироваться без ошибки.
 * Дополняет точечные тесты validate-quiz-step (сквозные сценарии).
 */
describe("quiz flow scenarios (сквозная валидация)", () => {
  it("fresh: только я, без complex", () => {
    const a: QuizAnswers = {
      deceasedRole: "mobilized",
      relation: "spouse",
      recipients: "only_me",
      documents: ["death_cert"],
      region: "Московская область",
    };
    const steps = getVisibleSteps("fresh", a);
    for (const id of steps) {
      expect(validateQuizStep(id, a), `step ${id}`).toBeNull();
    }
  });

  it("fresh: complex + recipients_count", () => {
    const a: QuizAnswers = {
      deceasedRole: "contract",
      relation: "complex",
      relationComplexSub: "cohabitation_no_marriage",
      recipients: "me_plus_4_or_more",
      recipientsExact: "5",
      documents: ["death_cert", "unit_notice"],
      region: "Санкт-Петербург",
    };
    const steps = getVisibleSteps("fresh", a);
    expect(steps).toContain("relation_complex");
    expect(steps).toContain("recipients_count");
    for (const id of steps) {
      expect(validateQuizStep(id, a), `step ${id}`).toBeNull();
    }
  });

  it("clarify: все поля заполнены", () => {
    const a: QuizAnswers = {
      clarifyDeathCert: "yes",
      clarifyMilitaryNotice: "requested_waiting",
      clarifyKinshipDocs: "partial",
      clarifyCopiesStatus: "collecting",
      clarifyFilingStatus: "full_waiting",
      clarifyWhereSubmitted: "sfr_mfc",
      clarifyConsequenceFocus: "timelines_stages",
    };
    const steps = getVisibleSteps("clarify", a);
    expect(steps).toHaveLength(7);
    for (const id of steps) {
      expect(validateQuizStep(id, a), `step ${id}`).toBeNull();
    }
  });
});
