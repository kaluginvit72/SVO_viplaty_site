import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const RATE_LIMIT_MS = 45_000;
const MIN_FILL_MS = 2_000;
const lastRequestByIp = new Map<string, number>();

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return req.headers.get("x-real-ip")?.trim() ?? "unknown";
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Record<string, unknown>;

    const name = String(body.name ?? "").trim();
    const contact = String(body.contact ?? "").trim();
    const region = String(body.region ?? "").trim();
    const relation = String(body.relation ?? "").trim();
    const stage = String(body.stage ?? "").trim();
    const message = String(body.message ?? "").trim();
    const website = String(body.website ?? "").trim();
    const formStartedAtRaw = String(body.formStartedAt ?? "").trim();
    const consent = body.consent === true;

    if (website !== "") {
      return NextResponse.json({ ok: false, error: "Заявка отклонена." }, { status: 400 });
    }

    const formStartedAt = Number(formStartedAtRaw);
    if (!Number.isFinite(formStartedAt) || Date.now() - formStartedAt < MIN_FILL_MS) {
      return NextResponse.json({ ok: false, error: "Заполните форму и отправьте ещё раз." }, { status: 400 });
    }

    const ip = getClientIp(req);
    const now = Date.now();
    const last = lastRequestByIp.get(ip);
    if (last && now - last < RATE_LIMIT_MS) {
      return NextResponse.json(
        { ok: false, error: "Слишком частые отправки. Попробуйте чуть позже." },
        { status: 429 },
      );
    }
    lastRequestByIp.set(ip, now);

    if (!name || !contact || !consent) {
      return NextResponse.json({ ok: false, error: "Заполните имя, контакт и согласие." }, { status: 400 });
    }

    if (
      name.length > 80 ||
      contact.length > 120 ||
      region.length > 120 ||
      relation.length > 80 ||
      stage.length > 120 ||
      message.length > 1500
    ) {
      return NextResponse.json({ ok: false, error: "Слишком длинные поля формы." }, { status: 400 });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
    const chatId = process.env.TELEGRAM_CHAT_ID?.trim();
    if (!token || !chatId) {
      console.error("[contact] TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не заданы");
      return NextResponse.json({ ok: false, error: "Telegram не настроен." }, { status: 500 });
    }

    const text = `🟦 Новая заявка с svorazbor.ru

Имя: ${escapeHtml(name)}
Контакт: ${escapeHtml(contact)}
Регион: ${escapeHtml(region || "не указан")}
Статус: ${escapeHtml(relation || "не указан")}
Этап: ${escapeHtml(stage || "не указан")}

Ситуация:
${escapeHtml(message || "не указана")}

Согласие на ПДн: да
Источник: сайт
Время: ${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })}`;

    const tgResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    if (!tgResponse.ok) {
      const tgData = (await tgResponse.json().catch(() => ({}))) as { description?: string };
      console.error("[contact] Telegram error:", tgData.description ?? tgResponse.status);
      return NextResponse.json({ ok: false, error: "Не удалось отправить заявку." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] Ошибка обработки:", error);
    return NextResponse.json({ ok: false, error: "Ошибка обработки заявки." }, { status: 500 });
  }
}
