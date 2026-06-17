"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const CONSENT_KEY = "svo_cookie_consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(CONSENT_KEY)) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "1");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(CONSENT_KEY, "0");
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Уведомление об использовании cookies"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#061426] px-4 py-4 min-[360px]:px-5 lg:px-8"
    >
      <div className="mx-auto flex max-w-[75rem] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-white/70">
          Сайт использует cookies и{" "}
          <span className="text-white/85">Яндекс.Метрику</span> для анализа
          посещаемости. Данные обрабатываются на серверах в России.{" "}
          <Link
            href="/privacy"
            className="text-white/85 underline underline-offset-4 transition-colors hover:text-white"
          >
            Политика конфиденциальности
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={decline}
            className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:border-white/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#061426]"
          >
            Отклонить
          </button>
          <button
            onClick={accept}
            className="rounded-lg bg-white px-5 py-2 text-sm font-semibold text-[#061426] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#061426]"
          >
            Принять
          </button>
        </div>
      </div>
    </div>
  );
}
