"use client";

import { useState, useTransition } from "react";
import { submitApplication } from "../actions/submit";

type ContactMethod = "telegram" | "phone";

export default function ContactForm() {
  const [contact, setContact] = useState<ContactMethod>("telegram");
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [pending, startTransition] = useTransition();

  function onSubmit(formData: FormData) {
    setStatus("idle");
    setErrorMsg("");
    startTransition(async () => {
      const res = await submitApplication(formData);
      if (res.ok) {
        setStatus("ok");
      } else {
        setStatus("error");
        setErrorMsg(res.error || "Не удалось отправить заявку. Попробуйте ещё раз или напишите в Telegram.");
      }
    });
  }

  if (status === "ok") {
    return (
      <div className="bg-[var(--color-bg-deep)] border border-[var(--color-border)] rounded-2xl p-8 md:p-10 text-center">
        <h3
          className="text-[24px] md:text-[28px] font-medium text-[var(--color-fg)] mb-3"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Заявка отправлена
        </h3>
        <p className="text-[16px] text-[var(--color-fg-muted)]">
          Координатор напишет вам в течение рабочего дня.
        </p>
      </div>
    );
  }

  return (
    <form action={onSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-[15px] font-medium text-[var(--color-fg)] mb-2">
          Имя <span className="text-[var(--color-accent-warm)]">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          minLength={2}
          className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] bg-white text-[16px] focus:outline-none focus:border-[var(--color-primary)] min-h-12"
        />
      </div>

      <div>
        <label className="block text-[15px] font-medium text-[var(--color-fg)] mb-2">
          Способ связи <span className="text-[var(--color-accent-warm)]">*</span>
        </label>
        <div className="flex gap-2 mb-3">
          {(["telegram", "phone"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setContact(m)}
              className={`px-4 py-2 rounded-lg text-[14px] font-medium transition-colors min-h-11 ${
                contact === m
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-[var(--color-bg-deep)] text-[var(--color-fg)] hover:bg-[var(--color-border)]"
              }`}
            >
              {m === "telegram" ? "Telegram" : "Телефон"}
            </button>
          ))}
        </div>
        <input type="hidden" name="contact_method" value={contact} />
        <input
          id="contact_value"
          name="contact_value"
          type={contact === "phone" ? "tel" : "text"}
          required
          placeholder={contact === "telegram" ? "@username или ссылка" : "+7..."}
          className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] bg-white text-[16px] focus:outline-none focus:border-[var(--color-primary)] min-h-12"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-[15px] font-medium text-[var(--color-fg)] mb-2">
          С чем хотите обратиться
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Например: эмоциональная нестабильность, РПП, ПРЛ, направил врач в ДБТ"
          className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] bg-white text-[16px] leading-[1.5] focus:outline-none focus:border-[var(--color-primary)] resize-none"
        />
      </div>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-1 w-5 h-5 rounded border-[var(--color-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
        />
        <span className="text-[14px] text-[var(--color-fg-muted)] leading-[1.5]">
          Согласен(на) на обработку персональных данных и ознакомлен(а) с{" "}
          <a href="/privacy-policy" className="text-[var(--color-primary)] hover:underline">
            политикой конфиденциальности
          </a>
        </span>
      </label>

      <button
        type="submit"
        disabled={pending}
        className="w-full sm:w-auto px-10 py-4 rounded-lg bg-[var(--color-primary)] text-white text-[16px] font-medium hover:bg-[var(--color-primary-dark)] transition-colors min-h-12 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {pending ? "Отправляем..." : "Записаться"}
      </button>

      {status === "error" && (
        <p role="alert" className="text-[14px] text-[var(--color-accent-warm)]">
          {errorMsg}
        </p>
      )}

      <p className="text-[13px] text-[var(--color-fg-muted)] leading-[1.5]">
        Заявка не обязывает к консультации. Нажимая «Записаться», вы соглашаетесь с политикой обработки персональных данных.
      </p>
    </form>
  );
}
