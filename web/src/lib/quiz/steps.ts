import type { FlowMode, QuizAnswers, QuizStepId } from "@/types/quiz";

const CLARIFY_STEPS: QuizStepId[] = [
  "clarify_doc_1",
  "clarify_doc_2",
  "clarify_doc_3",
  "clarify_doc_4",
  "clarify_doc_5",
  "clarify_doc_6",
  "clarify_doc_7",
];

/** Порядок шагов для выбранного режима и ответов. */
export function getVisibleSteps(flowMode: FlowMode, answers: QuizAnswers): QuizStepId[] {
  const main: QuizStepId[] = ["deceased", "relation"];
  if (answers.relation === "complex") main.push("relation_complex");
  main.push("recipients");
  if (answers.recipients === "me_plus_4_or_more") main.push("recipients_count");
  main.push("documents", "region");

  if (flowMode === "clarify") {
    return [...CLARIFY_STEPS];
  }
  return [...main];
}

export function isClarifyStep(id: QuizStepId): boolean {
  return (
    id === "clarify_doc_1" ||
    id === "clarify_doc_2" ||
    id === "clarify_doc_3" ||
    id === "clarify_doc_4" ||
    id === "clarify_doc_5" ||
    id === "clarify_doc_6" ||
    id === "clarify_doc_7"
  );
}

export function clampStepIndex(index: number, stepsLength: number): number {
  if (stepsLength <= 0) return 0;
  return Math.max(0, Math.min(index, stepsLength - 1));
}
