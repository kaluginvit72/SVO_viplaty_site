import type {
  ClarifyConsequenceFocus,
  ClarifyCopiesStatus,
  ClarifyDeathCertStatus,
  ClarifyFilingStatus,
  ClarifyKinshipDocsStatus,
  ClarifyMilitaryNoticeStatus,
  ClarifyWhereSubmitted,
} from "@/types/quiz";

export const clarifyDeathCertOptions: {
  id: ClarifyDeathCertStatus;
  label: string;
}[] = [
  { id: "yes", label: "Да, свидетельство о смерти уже на руках" },
  { id: "in_progress", label: "Заказали / получаем, ещё в процессе" },
  { id: "no", label: "Пока нет" },
];

export const clarifyMilitaryNoticeOptions: {
  id: ClarifyMilitaryNoticeStatus;
  label: string;
}[] = [
  { id: "yes", label: "Да, есть извещение или справка из части" },
  { id: "requested_waiting", label: "Запрашивали, ждём или уточняем" },
  { id: "no", label: "Пока нет" },
];

export const clarifyKinshipOptions: {
  id: ClarifyKinshipDocsStatus;
  label: string;
}[] = [
  { id: "complete", label: "Да, пакет по родству в полном объёме" },
  { id: "partial", label: "Есть часть документов, не всё" },
  { id: "none", label: "Пока нет" },
  { id: "unsure", label: "Затрудняюсь оценить, что именно нужно" },
];

export const clarifyCopiesOptions: {
  id: ClarifyCopiesStatus;
  label: string;
}[] = [
  { id: "ready", label: "Копии заверены или готовы к подаче" },
  { id: "collecting", label: "Собираем и заверяем, ещё в работе" },
  { id: "need_guidance", label: "Нужна подсказка, что заверять и в каком виде" },
];

export const clarifyFilingOptions: {
  id: ClarifyFilingStatus;
  label: string;
  hint?: string;
}[] = [
  {
    id: "not_yet",
    label: "Ещё не подавали заявление или полный пакет официально",
    hint: "Только готовим или передаём «на словах» — без отметки о приёме.",
  },
  {
    id: "partial",
    label: "Уже подавали часть документов, продолжаем доносить пакет",
    hint: "В инстанции зарегистрировано не всё, что планировали.",
  },
  {
    id: "full_waiting",
    label: "Подали комплект и ждём ответа",
    hint: "Есть подтверждение приёма или основание считать пакет у ведомства.",
  },
  {
    id: "had_feedback",
    label: "Уже были ответы: тишина долго, просят донести, отказ или часть выплат",
    hint: "Нужно разобрать, что это значит для дальнейших шагов — без обещания исхода.",
  },
];

export const clarifyWhereOptions: {
  id: ClarifyWhereSubmitted;
  label: string;
}[] = [
  { id: "not_yet", label: "Пока никуда не подавали — вопрос не про адрес подачи" },
  { id: "military_unit", label: "В воинскую часть" },
  { id: "voenkomat", label: "В военкомат" },
  { id: "sfr_mfc", label: "В СФР или МФЦ" },
  { id: "sogaz", label: "В СОГАЗ или по страховой линии" },
  { id: "several", label: "В несколько инстанций" },
  { id: "other", label: "В другое ведомство / иной канал" },
];

export const clarifyConsequenceOptions: {
  id: ClarifyConsequenceFocus;
  label: string;
  hint?: string;
}[] = [
  {
    id: "timelines_stages",
    label: "Ориентиры по срокам и типичным этапам после подачи",
    hint: "Общая логика очередности, не «гарантированные даты».",
  },
  {
    id: "incomplete_package_effects",
    label: "Что обычно тормозит при неполном пакете или пробелах в документах",
    hint: "Почему могут затягивать или возвращать на доработку.",
  },
  {
    id: "after_authority_response",
    label: "Уже был ответ ведомства — как читать ситуацию и что часто делают дальше",
    hint: "Без оценки вашего исхода как юридического результата.",
  },
  {
    id: "full_overview",
    label: "Общая картина: сбор, подача и ожидание в связке",
    hint: "Сводно, без углубления в один пункт.",
  },
];

export const clarifyStepQuestions: Record<string, string> = {
  clarify_doc_1: "Есть ли уже свидетельство о смерти?",
  clarify_doc_2: "Есть ли извещение из воинской части или аналогичная справка?",
  clarify_doc_3: "Как обстоят дела с документами, подтверждающими родство?",
  clarify_doc_4: "Копии документов и комплект для подачи — в каком состоянии?",
  clarify_doc_5: "Уже подавали документы или заявление официально?",
  clarify_doc_6: "Если уже подавали — куда направляли пакет в первую очередь?",
  clarify_doc_7: "Что для вас сейчас важнее прояснить про дальнейшие шаги?",
};

/** Короткие пояснения под заголовком шага. */
export const clarifyStepHints: Partial<Record<string, string>> = {
  clarify_doc_5:
    "От этого зависит, какие «последствия» подачи имеет смысл обсуждать: сроки, доработка пакета или работа с ответом ведомства.",
  clarify_doc_6:
    "Если официально ещё не подавали, отметьте первый пункт — так мы не перепутаем этапы.",
  clarify_doc_7:
    "Это не юридический прогноз исхода, а ориентиры, с чего обычно начинают разбор в похожих ситуациях.",
};

export const clarifyQuizCopy = {
  badge: "Документы",
  routePinned: "Маршрут зафиксирован",
  progressHint: "документы и подача",
  tapToContinue: "Выберите вариант — следующий шаг откроется сразу.",
  doneTitle: "Спасибо! Теперь ситуация ясна. Я могу помочь.",
  doneBody:
    "Когда будете готовы узнать предварительный расчёт выплат — запустите второй короткий опрос. А пока можете оставить контакты: разберём пакет, подачу и то, на что стоит обратить внимание в вашем случае.",
  ctaLead: "Оставить контакты",
  ctaCalculator: "Узнать, какие выплаты положены",
  again: "Пройти опрос про документы заново",
  /** Структурный блок после опроса (аналитический модуль). */
  diagnosticBlocks: [
    {
      title: "Что зафиксировано",
      body: "Ответы по свидетельству, извещению из части, родству и готовности копий — как опорная картина, без оценки исхода.",
    },
    {
      title: "Что уже подано",
      body: "Статус официальной подачи и направления в инстанции — чтобы не смешивать «устно передали» и зарегистрированное обращение.",
    },
    {
      title: "Где возможное узкое место",
      body: "Часто это неполный пакет, разные треки (часть / СФР / страховщик) или ожидание ответа без явной отметки о регистрации.",
    },
    {
      title: "Что важно проверить дальше",
      body: "Запрос статуса у адресата, перечень недостающего при ответе «донести», раздельный учёт по каждому основанию выплат.",
    },
  ] as const,
} as const;
