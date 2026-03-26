import { describe, expect, it } from "vitest";
import { preserveClarifyAnswersForFreshFlow } from "@/lib/quiz/preserve-clarify-for-fresh";
import { clampStepIndex, getVisibleSteps } from "@/lib/quiz/steps";
import { validateQuizStep } from "@/lib/quiz/validate-quiz-step";
import type { QuizAnswers } from "@/types/quiz";

describe("quiz navigation (integration)", () => {
  it("fresh: цепочка шагов меняется при relation=complex", () => {
    const simple = getVisibleSteps("fresh", { relation: "spouse" });
    expect(simple.includes("relation_complex")).toBe(false);

    const complex = getVisibleSteps("fresh", { relation: "complex" });
    expect(complex.indexOf("relation")).toBeLessThan(complex.indexOf("relation_complex"));
  });

  it("fresh: recipients_count только при me_plus_4_or_more", () => {
    const a = getVisibleSteps("fresh", { recipients: "only_me" });
    expect(a.includes("recipients_count")).toBe(false);
    const b = getVisibleSteps("fresh", { recipients: "me_plus_4_or_more" });
    expect(b.includes("recipients_count")).toBe(true);
  });

  it("clarify: ровно 7 шагов", () => {
    expect(getVisibleSteps("clarify", {}).length).toBe(7);
  });

  it("clampStepIndex", () => {
    expect(clampStepIndex(5, 3)).toBe(2);
    expect(clampStepIndex(-1, 5)).toBe(0);
    expect(clampStepIndex(0, 0)).toBe(0);
  });

  it("переключение контекста clarify→fresh: сохраняются clarify-поля для следующей цепочки", () => {
    const afterClarify: QuizAnswers = {
      clarifyFilingStatus: "full_waiting",
      clarifyWhereSubmitted: "sfr_mfc",
    };
    const preserved = preserveClarifyAnswersForFreshFlow(afterClarify);
    const merged: QuizAnswers = {
      ...preserved,
      deceasedRole: "mobilized",
      relation: "spouse",
      recipients: "only_me",
      documents: ["death_cert"],
      region: "Москва",
    };
    const steps = getVisibleSteps("fresh", merged);
    expect(steps[0]).toBe("deceased");
    expect(validateQuizStep("region", merged)).toBeNull();
  });
});
