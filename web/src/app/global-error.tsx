"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[global error]", error);
  }, [error]);

  return (
    <html lang="ru">
      <body style={{ margin: 0, fontFamily: "sans-serif", background: "#f5f7fa" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            gap: "1.5rem",
            padding: "1rem",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#061426", margin: 0 }}>
            Сервис временно недоступен
          </h1>
          <p style={{ fontSize: "0.875rem", color: "#4b5563", maxWidth: "400px", margin: 0 }}>
            Произошла критическая ошибка. Попробуйте обновить страницу или
            вернитесь позже.
          </p>
          {error.digest && (
            <p style={{ fontSize: "0.625rem", color: "#9ca3af", fontFamily: "monospace" }}>
              #{error.digest}
            </p>
          )}
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
            <button
              onClick={reset}
              style={{
                background: "#D71920",
                color: "white",
                border: "none",
                borderRadius: "0.75rem",
                padding: "0.625rem 1.5rem",
                fontSize: "0.875rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Обновить
            </button>
            <a
              href="tel:88003014567"
              style={{
                background: "white",
                color: "#163a63",
                border: "1px solid #E2E8F0",
                borderRadius: "0.75rem",
                padding: "0.625rem 1.5rem",
                fontSize: "0.875rem",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              8 800 301-45-67
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
