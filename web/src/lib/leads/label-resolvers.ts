import {
  deceasedOptions,
  documentOptions,
  relationComplexOptions,
  relationOptions,
  statusNowOptions,
  submittedWhereOptions,
} from "@/data/texts/quiz-copy";
import {
  clarifyConsequenceOptions,
  clarifyCopiesOptions,
  clarifyDeathCertOptions,
  clarifyFilingOptions,
  clarifyKinshipOptions,
  clarifyMilitaryNoticeOptions,
  clarifyWhereOptions,
} from "@/data/texts/clarify-quiz-copy";
import {
  stuckProblemOptions,
  stuckSubmittedItemOptions,
  stuckSubmittedToOptions,
} from "@/data/texts/stuck-quiz-copy";
import type { QuizAnswers } from "@/types/quiz";

function pickLabel<T extends string>(
  rows: readonly { id: T; label: string }[],
  id: T | undefined,
): string | null {
  if (id === undefined) return null;
  return rows.find((r) => r.id === id)?.label ?? id;
}

export function resolveStatusOfDeceased(answers: QuizAnswers): string | null {
  return pickLabel(deceasedOptions, answers.deceasedRole);
}

export function resolveApplicantRole(answers: QuizAnswers): string | null {
  return pickLabel(relationOptions, answers.relation);
}

export function resolveComplexStatus(answers: QuizAnswers): string | null {
  if (answers.relation !== "complex") return null;
  return pickLabel(relationComplexOptions, answers.relationComplexSub);
}

export function resolveDocumentsOnHand(answers: QuizAnswers): string | null {
  const ids = answers.documents;
  if (!ids?.length) return null;
  const parts = ids.map(
    (id) => documentOptions.find((d) => d.id === id)?.label ?? id,
  );
  return parts.join("; ");
}

/** Сводка по блоку «Прояснить ситуацию»: документы, подача, фокус разбора. */
export function resolveClarifyDocumentsSummary(answers: QuizAnswers): string | null {
  const parts: string[] = [];
  const d1 = pickLabel(clarifyDeathCertOptions, answers.clarifyDeathCert);
  const d2 = pickLabel(clarifyMilitaryNoticeOptions, answers.clarifyMilitaryNotice);
  const d3 = pickLabel(clarifyKinshipOptions, answers.clarifyKinshipDocs);
  const d4 = pickLabel(clarifyCopiesOptions, answers.clarifyCopiesStatus);
  const d5 = pickLabel(clarifyFilingOptions, answers.clarifyFilingStatus);
  const d6 = pickLabel(clarifyWhereOptions, answers.clarifyWhereSubmitted);
  const d7 = pickLabel(clarifyConsequenceOptions, answers.clarifyConsequenceFocus);
  if (d1) parts.push(`Свидетельство о смерти: ${d1}`);
  if (d2) parts.push(`Документы из части: ${d2}`);
  if (d3) parts.push(`Родство: ${d3}`);
  if (d4) parts.push(`Копии и комплект: ${d4}`);
  if (d5) parts.push(`Подача: ${d5}`);
  if (d6) parts.push(`Куда направляли: ${d6}`);
  if (d7) parts.push(`Что прояснить: ${d7}`);
  return parts.length ? parts.join(". ") : null;
}

/** Устаревший сценарий B. */
export function resolveProblemType(answers: QuizAnswers): string | null {
  return pickLabel(statusNowOptions, answers.statusNow);
}

/** Устаревший сценарий B. */
export function resolveSubmittedTo(answers: QuizAnswers): string | null {
  return pickLabel(submittedWhereOptions, answers.submittedWhere);
}

export function resolveStuckProblemLabel(answers: QuizAnswers): string | null {
  return pickLabel(stuckProblemOptions, answers.stuckProblemType);
}

export function resolveStuckSubmittedItems(answers: QuizAnswers): string | null {
  const ids = answers.stuckSubmittedItems;
  if (!ids?.length) return null;
  return ids
    .map((id) => stuckSubmittedItemOptions.find((o) => o.id === id)?.label ?? id)
    .join("; ");
}

export function resolveStuckSubmittedToList(answers: QuizAnswers): string | null {
  const ids = answers.stuckSubmittedToList;
  if (!ids?.length) return null;
  return ids
    .map((id) => stuckSubmittedToOptions.find((o) => o.id === id)?.label ?? id)
    .join("; ");
}
