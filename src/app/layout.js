import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { siteUrl } from "@/lib/site-url";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Бар Щука | Сеть баров",
    template: "%s | Бар Щука",
  },
  description:
    'Сеть баров "Щука": главная страница сети и отдельные страницы баров с меню, событиями и контактами.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={`${manrope.variable} ${cormorant.variable}`}>
        {children}
      </body>
    </html>
  );
}
