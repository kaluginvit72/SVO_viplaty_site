import { describe, expect, it } from "vitest";
import { getVisibleSteps, isClarifyStep, clampStepIndex } from "@/lib/quiz/steps";
import type { QuizAnswers } from "@/types/quiz";

describe("getVisibleSteps", () => {
  it("fresh: базовая цепочка без complex и без recipients_count", () => {
    const a: QuizAnswers = {
      deceasedRole: "mobilized",
      relation: "spouse",
      recipients: "only_me",
    };
    expect(getVisibleSteps("fresh", a)).toEqual([
      "deceased",
      "relation",
      "recipients",
      "documents",
      "region",
    ]);
  });

  it("fresh: relation complex добавляет relation_complex", () => {
    const a: QuizAnswers = { relation: "complex" };
    const steps = getVisibleSteps("fresh", a);
    expect(steps).toContain("relation_complex");
    expect(steps.indexOf("relation_complex")).toBe(steps.indexOf("relation") + 1);
  });

  it("fresh: me_plus_4_or_more добавляет recipients_count", () => {
    const a: QuizAnswers = { recipients: "me_plus_4_or_more" };
    const steps = getVisibleSteps("fresh", a);
    expect(steps).toContain("recipients_count");
    const i = steps.indexOf("recipients");
    expect(steps[i + 1]).toBe("recipients_count");
  });

  it("clarify: фиксированные 7 шагов", () => {
    expect(getVisibleSteps("clarify", {})).toHaveLength(7);
    expect(getVisibleSteps("clarify", {})[0]).toBe("clarify_doc_1");
    expect(getVisibleSteps("clarify", {})[6]).toBe("clarify_doc_7");
  });
});

describe("isClarifyStep", () => {
  it("определяет шаги clarify", () => {
    expect(isClarifyStep("clarify_doc_1")).toBe(true);
    expect(isClarifyStep("deceased")).toBe(false);
  });
});

describe("clampStepIndex", () => {
  it("ограничивает индекс", () => {
    expect(clampStepIndex(5, 3)).toBe(2);
    expect(clampStepIndex(-1, 5)).toBe(0);
    expect(clampStepIndex(0, 0)).toBe(0);
  });
});
