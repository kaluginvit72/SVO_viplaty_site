/** Режим: полный расчёт выплат или короткий опрос только про документы (без расчёта на сайте). */
export type FlowMode = "fresh" | "clarify";

export type DeceasedRole =
  | "contract"
  | "mobilized"
  | "volunteer"
  | "rosgvardia"
  | "unknown";

export type Relation =
  | "spouse"
  | "mother"
  | "father"
  | "child_under_18"
  | "child_student"
  | "family_rep"
  | "complex";

export type RelationComplexSub =
  | "cohabitation_no_marriage"
  | "kinship_dispute"
  | "need_status_help";

export type Recipients =
  | "only_me"
  | "me_plus_1"
  | "me_plus_2"
  | "me_plus_3"
  | "me_plus_4_or_more";

export type RecipientsExact = "4" | "5" | "6" | "7_plus";

export type DocumentOption =
  | "death_cert"
  | "unit_notice"
  | "kinship_docs"
  | "almost_all"
  | "nothing_yet"
  | "unsure";

/** Устаревшие поля сценария B (могут прийти из старых лидов). */
export type StatusNow =
  | "no_response"
  | "incomplete_package"
  | "refusal"
  | "partial_paid"
  | "stuck_unknown";

export type SubmittedWhere =
  | "military_unit"
  | "voenkomat"
  | "sogaz"
  | "sfr_mfc"
  | "multiple";

export type WaitingOption = "lt1m" | "1to3m" | "3to6m" | "gt6m";

/** Блок «Прояснить ситуацию» — документы, подача, ориентиры по последствиям. */
export type ClarifyDeathCertStatus = "yes" | "in_progress" | "no";
export type ClarifyMilitaryNoticeStatus = "yes" | "requested_waiting" | "no";
export type ClarifyKinshipDocsStatus = "complete" | "partial" | "none" | "unsure";
export type ClarifyCopiesStatus = "ready" | "collecting" | "need_guidance";

/** Уже подавали ли пакет / заявление официально. */
export type ClarifyFilingStatus =
  | "not_yet"
  | "partial"
  | "full_waiting"
  | "had_feedback";

/** Куда направляли (если ещё не подавали — отдельный пункт). */
export type ClarifyWhereSubmitted =
  | "not_yet"
  | "military_unit"
  | "voenkomat"
  | "sfr_mfc"
  | "sogaz"
  | "several"
  | "other";

/** Что важнее прояснить про дальнейшие шаги и последствия (не юридический исход). */
export type ClarifyConsequenceFocus =
  | "timelines_stages"
  | "incomplete_package_effects"
  | "after_authority_response"
  | "full_overview";

/** Шаг 1 диагностики «застрявшего» потока. */
export type StuckProblemType =
  | "no_response"
  | "incomplete_package"
  | "refusal"
  | "partial_paid"
  | "stuck_unknown"
  | "full_review";

/** Шаг 2: что уже подавали (multi). */
export type StuckSubmittedItem =
  | "main_application"
  | "docs_military_unit"
  | "docs_voenkomat"
  | "docs_sogaz"
  | "docs_sfr_mfc"
  | "complaints"
  | "unclear_submitted";

/** Шаг 3: куда обращались (multi). */
export type StuckSubmittedTo =
  | "military_unit"
  | "voenkomat"
  | "sogaz"
  | "sfr"
  | "mfc"
  | "social_region"
  | "prosecutor"
  | "court"
  | "multiple_unsure";

/** Шаг 4: ответы. */
export type StuckResponseStatus =
  | "silent"
  | "oral_wait"
  | "request_more_docs"
  | "written_refusal"
  | "partial_payments"
  | "unclear_response";

/** Шаг 5: интервал ожидания → далее в расчёт месяцев 1 / 2 / 4 / 6. */
export type StuckWaitingBucket = "lt1m" | "1to3m" | "3to6m" | "gt6m";

export interface QuizAnswers {
  deceasedRole?: DeceasedRole;
  relation?: Relation;
  relationComplexSub?: RelationComplexSub;
  recipients?: Recipients;
  recipientsExact?: RecipientsExact;
  documents?: DocumentOption[];
  region?: string;
  /** @deprecated старый сценарий B; не используется в новом потоке */
  statusNow?: StatusNow;
  /** @deprecated */
  submittedWhere?: SubmittedWhere;
  /** @deprecated */
  waiting?: WaitingOption;

  stuckProblemType?: StuckProblemType;
  stuckSubmittedItems?: StuckSubmittedItem[];
  stuckSubmittedToList?: StuckSubmittedTo[];
  stuckResponseStatus?: StuckResponseStatus;
  /** 1 | 2 | 4 | 6 — после шага «сколько ждёте» */
  stuckMonthsWaiting?: number;

  clarifyDeathCert?: ClarifyDeathCertStatus;
  clarifyMilitaryNotice?: ClarifyMilitaryNoticeStatus;
  clarifyKinshipDocs?: ClarifyKinshipDocsStatus;
  clarifyCopiesStatus?: ClarifyCopiesStatus;
  clarifyFilingStatus?: ClarifyFilingStatus;
  clarifyWhereSubmitted?: ClarifyWhereSubmitted;
  clarifyConsequenceFocus?: ClarifyConsequenceFocus;
}

export interface QuizPersistedState {
  version: 4;
  flowMode: FlowMode | null;
  stepIndex: number;
  answers: QuizAnswers;
  completed: boolean;
}

export type QuizStepId =
  | "clarify_doc_1"
  | "clarify_doc_2"
  | "clarify_doc_3"
  | "clarify_doc_4"
  | "clarify_doc_5"
  | "clarify_doc_6"
  | "clarify_doc_7"
  | "deceased"
  | "relation"
  | "relation_complex"
  | "recipients"
  | "recipients_count"
  | "documents"
  | "region";
