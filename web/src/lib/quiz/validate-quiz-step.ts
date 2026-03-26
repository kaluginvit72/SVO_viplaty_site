import { quizFlowCopy } from "@/data/texts/quiz-copy";
import type { QuizAnswers, QuizStepId } from "@/types/quiz";

/** Проверка шага по переданному снимку ответов (для мгновенного перехода в clarify). */
export function validateQuizStep(id: QuizStepId | undefined, a: QuizAnswers): string | null {
  if (!id) return null;
  switch (id) {
    case "clarify_doc_1":
      return a.clarifyDeathCert ? null : quizFlowCopy.validation.pickOne;
    case "clarify_doc_2":
      return a.clarifyMilitaryNotice ? null : quizFlowCopy.validation.pickOne;
    case "clarify_doc_3":
      return a.clarifyKinshipDocs ? null : quizFlowCopy.validation.pickOne;
    case "clarify_doc_4":
      return a.clarifyCopiesStatus ? null : quizFlowCopy.validation.pickOne;
    case "clarify_doc_5":
      return a.clarifyFilingStatus ? null : quizFlowCopy.validation.pickOne;
    case "clarify_doc_6":
      return a.clarifyWhereSubmitted ? null : quizFlowCopy.validation.pickOne;
    case "clarify_doc_7":
      return a.clarifyConsequenceFocus ? null : quizFlowCopy.validation.pickOne;
    case "deceased":
      return a.deceasedRole ? null : quizFlowCopy.validation.pickOne;
    case "relation":
      return a.relation ? null : quizFlowCopy.validation.pickOne;
    case "relation_complex":
      return a.relationComplexSub ? null : quizFlowCopy.validation.pickCloser;
    case "recipients":
      return a.recipients ? null : quizFlowCopy.validation.pickOne;
    case "recipients_count":
      return a.recipientsExact ? null : quizFlowCopy.validation.pickRecipients;
    case "documents": {
      const d = a.documents;
      if (!d || d.length === 0) return quizFlowCopy.validation.documentsMin;
      return null;
    }
    case "region": {
      const r = (a.region ?? "").trim();
      if (r.length < 2) return quizFlowCopy.validation.regionShort;
      return null;
    }
    default:
      return null;
  }
}
