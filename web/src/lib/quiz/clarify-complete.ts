import type { QuizAnswers } from "@/types/quiz";

export function isClarifyQuizComplete(answers: QuizAnswers): boolean {
  return (
    answers.clarifyDeathCert != null &&
    answers.clarifyMilitaryNotice != null &&
    answers.clarifyKinshipDocs != null &&
    answers.clarifyCopiesStatus != null &&
    answers.clarifyFilingStatus != null &&
    answers.clarifyWhereSubmitted != null &&
    answers.clarifyConsequenceFocus != null
  );
}
