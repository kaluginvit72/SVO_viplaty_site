import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as Record<string, unknown>;

    const name = String(body.name ?? "").trim();
    const contact = String(body.contact ?? "").trim();
    const region = String(body.region ?? "").trim();
    const relation = String(body.relation ?? "").trim();
    const stage = String(body.stage ?? "").trim();
    const message = String(body.message ?? "").trim();
    const consent = Boolean(body.consent);

    if (!name || !contact || !consent) {
      return NextResponse.json(
        { ok: false, error: "Заполните имя, контакт и согласие." },
        { status: 400 },
      );
    }

    if (
      name.length > 80 ||
      contact.length > 120 ||
      region.length > 120 ||
      relation.length > 80 ||
      stage.length > 120 ||
      message.length > 1500
    ) {
      return NextResponse.json(
        { ok: false, error: "Слишком длинное сообщение." },
        { status: 400 },
      );
    }

    const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
    const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

    if (!token || !chatId) {
      console.error("[contact] TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не заданы");
      return NextResponse.json(
        { ok: false, error: "Telegram не настроен." },
        { status: 500 },
      );
    }

    const text = `🟦 <b>Новая заявка с svorazbor.ru</b>

<b>Имя:</b> ${escapeHtml(name)}
<b>Контакт:</b> ${escapeHtml(contact)}
<b>Регион:</b> ${escapeHtml(region || "не указан")}
<b>Статус:</b> ${escapeHtml(relation || "не указан")}
<b>Этап:</b> ${escapeHtml(stage || "не указан")}

<b>Ситуация:</b>
${escapeHtml(message || "не указана")}

<b>Согласие на ПДн:</b> да
<b>Источник:</b> сайт
<b>Время:</b> ${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })}`.trim();

    const tgResponse = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      },
    );

    if (!tgResponse.ok) {
      const tgData = await tgResponse.json().catch(() => ({})) as { description?: string };
      console.error("[contact] Telegram error:", tgData.description ?? tgResponse.status);
      return NextResponse.json(
        { ok: false, error: "Не удалось отправить заявку." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[contact] Ошибка обработки:", e);
    return NextResponse.json(
      { ok: false, error: "Ошибка обработки заявки." },
      { status: 500 },
    );
  }
}
