import { describe, expect, it } from "vitest";
import { validateQuizStep } from "@/lib/quiz/validate-quiz-step";

describe("validateQuizStep", () => {
  it("deceased: пусто — ошибка", () => {
    expect(validateQuizStep("deceased", {})).not.toBeNull();
  });

  it("deceased: заполнено — ок", () => {
    expect(validateQuizStep("deceased", { deceasedRole: "mobilized" })).toBeNull();
  });

  it("relation + relation_complex", () => {
    expect(validateQuizStep("relation", {})).not.toBeNull();
    expect(validateQuizStep("relation", { relation: "spouse" })).toBeNull();
    expect(validateQuizStep("relation_complex", { relationComplexSub: "kinship_dispute" })).toBeNull();
    expect(validateQuizStep("relation_complex", {})).not.toBeNull();
  });

  it("recipients + recipients_count", () => {
    expect(validateQuizStep("recipients", {})).not.toBeNull();
    expect(validateQuizStep("recipients", { recipients: "only_me" })).toBeNull();
    expect(validateQuizStep("recipients_count", {})).not.toBeNull();
    expect(validateQuizStep("recipients_count", { recipientsExact: "4" })).toBeNull();
  });

  it("documents: минимум один пункт", () => {
    expect(validateQuizStep("documents", { documents: [] })).not.toBeNull();
    expect(validateQuizStep("documents", { documents: ["death_cert"] })).toBeNull();
  });

  it("region: длина >= 2", () => {
    expect(validateQuizStep("region", { region: "x" })).not.toBeNull();
    expect(validateQuizStep("region", { region: "Москва" })).toBeNull();
  });

  it("все clarify_doc_* требуют поля", () => {
    const ids = [
      "clarify_doc_1",
      "clarify_doc_2",
      "clarify_doc_3",
      "clarify_doc_4",
      "clarify_doc_5",
      "clarify_doc_6",
      "clarify_doc_7",
    ] as const;
    for (const id of ids) {
      expect(validateQuizStep(id, {}), id).not.toBeNull();
    }
    expect(
      validateQuizStep("clarify_doc_1", {
        clarifyDeathCert: "yes",
        clarifyMilitaryNotice: "yes",
        clarifyKinshipDocs: "complete",
        clarifyCopiesStatus: "ready",
        clarifyFilingStatus: "not_yet",
        clarifyWhereSubmitted: "not_yet",
        clarifyConsequenceFocus: "full_overview",
      }),
    ).toBeNull();
  });
});
