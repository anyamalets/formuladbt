"use server";

type SubmitResult = { ok: true } | { ok: false; error: string };

export async function submitApplication(formData: FormData): Promise<SubmitResult> {
  const name = String(formData.get("name") || "").trim();
  const contactMethod = String(formData.get("contact_method") || "").trim();
  const contactValue = String(formData.get("contact_value") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const consent = formData.get("consent");

  if (!name || name.length < 2) return { ok: false, error: "Укажите имя" };
  if (!contactValue) return { ok: false, error: "Укажите контакт для связи" };
  if (!consent) return { ok: false, error: "Нужно согласие на обработку данных" };

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error("[submit] Telegram env vars not configured");
    return { ok: false, error: "Сервис временно недоступен. Напишите напрямую в Telegram @formuladbt." };
  }

  const text = [
    "🌿 <b>Новая заявка на formuladbt.ru</b>",
    "",
    `<b>Имя:</b> ${esc(name)}`,
    `<b>Способ связи:</b> ${contactMethod === "telegram" ? "Telegram" : "Телефон"}`,
    `<b>Контакт:</b> ${esc(contactValue)}`,
    message ? `\n<b>Запрос:</b>\n${esc(message)}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error("[submit] Telegram API error:", res.status, body);
      return { ok: false, error: "Не удалось отправить заявку. Попробуйте написать в Telegram напрямую." };
    }
    return { ok: true };
  } catch (e) {
    console.error("[submit] fetch error:", e);
    return { ok: false, error: "Ошибка сети. Попробуйте ещё раз." };
  }
}

function esc(s: string): string {
  return s.replace(/[&<>]/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[m]!));
}
