import type { Metadata } from "next";
import { Lora, Roboto } from "next/font/google";
import "./globals.css";

const SITE_URL = "https://formuladbt.ru";

const serif = Lora({
  variable: "--font-serif",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Формула ДБТ — команда диалектико-поведенческой терапии",
  description:
    "Полная программа диалектико-поведенческой терапии: индивидуальные сессии, группа навыков, телефонный коучинг. Помощь при эмоциональной нестабильности, ПРЛ, РПП. Онлайн.",
  openGraph: {
    title: "Формула ДБТ — команда диалектико-поведенческой терапии",
    description:
      "Полная программа диалектико-поведенческой терапии: индивидуальные сессии, группа навыков, телефонный коучинг.",
    url: SITE_URL,
    siteName: "Формула ДБТ",
    locale: "ru_RU",
    type: "website",
  },
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ru"
      className={`${serif.variable} ${roboto.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="absolute left-2 -top-[999px] z-[100] px-4 py-3 rounded-lg bg-[var(--color-primary)] text-[var(--color-on-primary)] text-[15px] font-medium shadow-md focus-visible:top-2"
        >
          Перейти к содержанию
        </a>
        {children}
      </body>
    </html>
  );
}
