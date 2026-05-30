"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[page error]", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#f5f7fa] px-4 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-md">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
            stroke="#D71920"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div>
        <h1 className="font-serif text-2xl font-bold text-[#061426]">
          Что-то пошло не так
        </h1>
        <p className="mt-2 max-w-sm text-sm text-[#4b5563]">
          Произошла непредвиденная ошибка. Попробуйте обновить страницу или
          напишите нам напрямую.
        </p>
        {error.digest && (
          <p className="mt-1 font-mono text-[10px] text-[#9ca3af]">
            #{error.digest}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={reset}
          className="rounded-xl bg-[#D71920] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#b91520]"
        >
          Попробовать снова
        </button>
        <Link
          href="/"
          className="rounded-xl border border-[#E2E8F0] bg-white px-6 py-2.5 text-sm font-semibold text-[#163a63] transition hover:bg-[#f8fafc]"
        >
          На главную
        </Link>
      </div>
      <p className="text-xs text-[#9ca3af]">
        Или позвоните нам:{" "}
        <a href="tel:88003014567" className="underline hover:text-[#4b5563]">
          8 800 301-45-67
        </a>
      </p>
    </div>
  );
}
