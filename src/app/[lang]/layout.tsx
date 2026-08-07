import type { Metadata } from "next";
//import { notFound } from "next/navigation";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import "../globals.css";

const LOCALES = ["es", "en"] as const;
//type Locale = (typeof LOCALES)[number];

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}
export const dynamicParams = false;

export const metadata: Metadata = {
  title: "Christopher A. Rajon Polanco — Software Engineer",
  description: "Construyo software completo para resolver problemas reales.",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  //if (!LOCALES.includes(lang as Locale)) notFound();

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}