import type { FlowMode } from "@/types/quiz";

/** @deprecated для обратной совместимости старых записей */
export type StoredLeadScenario = "A" | "B" | null;

export interface StoredLeadRecord {
  id: string;
  createdAt: string;
  /** Режим воронки с сайта */
  flowMode: FlowMode | null;
  /** Зеркало: fresh→A; clarify и устаревший B на входе → null */
  scenario: StoredLeadScenario;
  statusOfDeceased: string | null;
  applicantRole: string | null;
  complexStatus: string | null;
  recipientsCount: number | null;
  documentsOnHand: string | null;
  problemType: string | null;
  submittedTo: string | null;
  monthsWaiting: number | null;
  /** Зарезервировано; не используется в текущей воронке */
  stuckSummary: string | null;
  region: string;
  baseTotal: number;
  personalShare: number;
  estimatedDelayLoss: number;
  name: string;
  /** Нормализованный номер (например +7…) */
  phone: string;
  /** Как ввёл пользователь (после trim) */
  phoneRaw: string | null;
  messenger: string | null;
  comment: string | null;
  consentAccepted: boolean;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  /** Успешная доставка в Telegram после сохранения */
  telegramSent: boolean;
}
