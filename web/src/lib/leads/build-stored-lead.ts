import { AMOUNTS, getRecipientsCount } from "@/lib/calculator";
import { federalTotalForHeadline } from "@/lib/calculator/payout-view";
import {
  resolveApplicantRole,
  resolveClarifyDocumentsSummary,
  resolveComplexStatus,
  resolveDocumentsOnHand,
  resolveProblemType,
  resolveStatusOfDeceased,
  resolveSubmittedTo,
} from "@/lib/leads/label-resolvers";
import type { LeadApiPayload } from "@/lib/validation/lead";
import type { FlowMode, QuizAnswers } from "@/types/quiz";
import type { StoredLeadRecord } from "@/types/stored-lead";

export type LeadPhoneFields = { raw: string; normalized: string };

function newLeadId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
}

function resolveFlowMode(payload: LeadApiPayload): FlowMode | null {
  const q = payload.quiz;
  if (q?.flowMode === "fresh" || q?.flowMode === "clarify") return q.flowMode;
  /** @deprecated API: старый stuck на сайте = теперь clarify */
  if (q?.flowMode === "stuck") return "clarify";
  if (q?.scenario === "B") return "clarify";
  if (q?.scenario === "A") return "fresh";
  return null;
}

export function buildStoredLeadRecord(
  payload: LeadApiPayload,
  phoneFields: LeadPhoneFields,
): StoredLeadRecord {
  const quiz = payload.quiz;
  const flowMode = resolveFlowMode(payload);
  const answers: QuizAnswers = { ...(quiz?.answers ?? {}) };

  const scenario =
    flowMode === "clarify" ? null : flowMode === "fresh" ? "A" : null;

  if (flowMode === "clarify") {
    const docSummary = resolveClarifyDocumentsSummary(answers);
    return {
      id: newLeadId(),
      createdAt: new Date().toISOString(),
      flowMode,
      scenario,
      statusOfDeceased: null,
      applicantRole: null,
      complexStatus: null,
      recipientsCount: null,
      documentsOnHand: docSummary,
      problemType: null,
      submittedTo: null,
      monthsWaiting: null,
      stuckSummary: null,
      region: payload.region.trim(),
      baseTotal: 0,
      personalShare: 0,
      estimatedDelayLoss: 0,
      name: payload.name.trim(),
      phone: phoneFields.normalized,
      phoneRaw: phoneFields.raw || null,
      messenger: payload.messenger ?? null,
      comment: payload.situation ?? null,
      consentAccepted: payload.consent === true,
      utm_source: payload.utm_source ?? null,
      utm_medium: payload.utm_medium ?? null,
      utm_campaign: payload.utm_campaign ?? null,
      telegramSent: false,
    };
  }

  const recipientsCount = getRecipientsCount(answers);
  const federalTotal = federalTotalForHeadline();
  const personalShare = federalTotal / recipientsCount;

  let problemType: string | null = null;
  let submittedTo: string | null = null;
  if (quiz?.scenario === "B") {
    problemType = resolveProblemType(answers);
    submittedTo = resolveSubmittedTo(answers);
  }

  return {
    id: newLeadId(),
    createdAt: new Date().toISOString(),
    flowMode,
    scenario: flowMode === "fresh" ? "A" : null,
    statusOfDeceased: resolveStatusOfDeceased(answers),
    applicantRole: resolveApplicantRole(answers),
    complexStatus: resolveComplexStatus(answers),
    recipientsCount,
    documentsOnHand: resolveDocumentsOnHand(answers),
    problemType,
    submittedTo,
    monthsWaiting: quiz?.scenario === "B" ? null : null,
    stuckSummary: null,
    region: payload.region.trim(),
    baseTotal: AMOUNTS.baseTotal,
    personalShare,
    estimatedDelayLoss: 0,
    name: payload.name.trim(),
    phone: phoneFields.normalized,
    phoneRaw: phoneFields.raw || null,
    messenger: payload.messenger ?? null,
    comment: payload.situation ?? null,
    consentAccepted: payload.consent === true,
    utm_source: payload.utm_source ?? null,
    utm_medium: payload.utm_medium ?? null,
    utm_campaign: payload.utm_campaign ?? null,
    telegramSent: false,
  };
}
