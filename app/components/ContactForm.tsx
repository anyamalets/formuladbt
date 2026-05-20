"use client";

import { useState, useTransition } from "react";
import { Loader2, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { submitApplication } from "../actions/submit";

type ContactMethod = "telegram" | "phone";
type FieldErrors = Partial<Record<"name" | "contact_value" | "consent", string>>;

export default function ContactForm() {
  const [contact, setContact] = useState<ContactMethod>("telegram");
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [pending, startTransition] = useTransition();

  function validate(formData: FormData): FieldErrors {
    const errors: FieldErrors = {};
    const name = String(formData.get("name") || "").trim();
    const contactValue = String(formData.get("contact_value") || "").trim();
    const consent = formData.get("consent");
    if (!name || name.length < 2) errors.name = "Введите имя";
    if (!contactValue) errors.contact_value = contact === "telegram" ? "Укажите @username или ссылку" : "Укажите номер телефона";
    if (!consent) errors.consent = "Нужно согласие на обработку данных";
    return errors;
  }

  function onSubmit(formData: FormData) {
    const localErrors = validate(formData);
    if (Object.keys(localErrors).length > 0) {
      setFieldErrors(localErrors);
      setStatus("error");
      setErrorMsg("Проверьте заполнение полей");
      return;
    }
    setFieldErrors({});
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
      <div className="bg-[var(--color-bg-deep)] border border-[var(--color-border)] rounded-2xl p-8 md:p-10 text-center fade-in-up">
        <h3
          className="text-[24px] md:text-[28px] font-medium text-[var(--color-fg)] mb-3"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Заявка отправлена
        </h3>
        <p className="text-[16px] text-[var(--color-fg-muted)] mb-6">
          Координатор напишет в Telegram в течение рабочего дня. По выходным — в понедельник утром.
        </p>
        <Link
          href="#about-dbt"
          className="inline-flex items-center text-[15px] font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] hover:underline underline-offset-4"
        >
          ← Вернуться к описанию программы
        </Link>
      </div>
    );
  }

  const fieldBorder = (err?: string) =>
    err
      ? "border-[var(--color-accent-warm)] focus:border-[var(--color-accent-warm)] focus:ring-[var(--color-accent-warm)]/30"
      : "border-[var(--color-border)] focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]/30";

  return (
    <form action={onSubmit} noValidate className="space-y-5">
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
          aria-invalid={!!fieldErrors.name}
          aria-describedby={fieldErrors.name ? "name-error" : undefined}
          className={`w-full px-4 py-3 rounded-lg border bg-white text-[16px] focus:outline-none focus:ring-2 min-h-12 transition-colors ${fieldBorder(fieldErrors.name)}`}
        />
        {fieldErrors.name && (
          <p id="name-error" role="alert" className="mt-1.5 text-[13px] text-[var(--color-accent-warm)]">
            {fieldErrors.name}
          </p>
        )}
      </div>

      <div>
        <label className="block text-[15px] font-medium text-[var(--color-fg)] mb-2">
          Способ связи <span className="text-[var(--color-accent-warm)]">*</span>
        </label>
        <div
          role="radiogroup"
          aria-label="Способ связи"
          className="inline-flex rounded-lg border border-[var(--color-border)] p-1 mb-3 bg-white"
        >
          {(
            [
              { id: "telegram" as const, label: "Telegram", Icon: MessageCircle },
              { id: "phone" as const, label: "Телефон", Icon: Phone },
            ]
          ).map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={contact === id}
              onClick={() => setContact(id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-[14px] font-medium transition-colors min-h-10 ${
                contact === id
                  ? "bg-[var(--color-primary)] text-white"
                  : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>
        <input type="hidden" name="contact_method" value={contact} />
        <input
          id="contact_value"
          name="contact_value"
          type={contact === "phone" ? "tel" : "text"}
          inputMode={contact === "phone" ? "tel" : "text"}
          autoComplete={contact === "phone" ? "tel" : "off"}
          required
          aria-invalid={!!fieldErrors.contact_value}
          aria-describedby={fieldErrors.contact_value ? "contact-error" : undefined}
          placeholder={contact === "telegram" ? "@username или ссылка" : "+7..."}
          className={`w-full px-4 py-3 rounded-lg border bg-white text-[16px] focus:outline-none focus:ring-2 min-h-12 transition-colors ${fieldBorder(fieldErrors.contact_value)}`}
        />
        {fieldErrors.contact_value && (
          <p id="contact-error" role="alert" className="mt-1.5 text-[13px] text-[var(--color-accent-warm)]">
            {fieldErrors.contact_value}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-[15px] font-medium text-[var(--color-fg)] mb-2">
          С чем хотите обратиться
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Например: эмоциональная нестабильность, РПП, ПРЛ; или направление от врача"
          className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] bg-white text-[16px] leading-[1.5] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)] resize-none transition-colors"
        />
        <p className="mt-2 text-[13px] text-[var(--color-fg-muted)] leading-[1.5]">
          Можно описать состояние своими словами или просто оставить пустым. Подробности обсудим в переписке.
        </p>
      </div>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          name="consent"
          required
          aria-invalid={!!fieldErrors.consent}
          className="mt-1 w-5 h-5 rounded border-[var(--color-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
        />
        <span className="text-[14px] text-[var(--color-fg-muted)] leading-[1.5]">
          Согласен(на) на обработку персональных данных и ознакомлен(а) с{" "}
          <a href="/privacy-policy" className="text-[var(--color-primary)] hover:underline">
            политикой конфиденциальности
          </a>
        </span>
      </label>
      {fieldErrors.consent && (
        <p role="alert" className="text-[13px] text-[var(--color-accent-warm)]">
          {fieldErrors.consent}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-10 py-4 rounded-lg bg-[var(--color-primary)] text-white text-[16px] font-medium hover:bg-[var(--color-primary-dark)] press-feedback min-h-12 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {pending && <Loader2 size={18} className="spin" />}
        {pending ? "Отправляем заявку..." : "Отправить заявку"}
      </button>

      {status === "error" && !Object.keys(fieldErrors).length && (
        <p role="alert" className="text-[14px] text-[var(--color-accent-warm)]">
          {errorMsg}
        </p>
      )}

      <p className="text-[13px] text-[var(--color-fg-muted)] leading-[1.5]">
        Заявка не обязывает к консультации.
      </p>
    </form>
  );
}
