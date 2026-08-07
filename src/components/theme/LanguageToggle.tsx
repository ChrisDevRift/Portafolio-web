"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Lang } from "@/lib/data/client";

const NEXT_LABEL: Record<Lang, string> = { es: "EN", en: "ES" };

export function LanguageToggle({ lang }: { lang: Lang }) {
  const pathname = usePathname();
  const nextLang: Lang = lang === "es" ? "en" : "es";
  // Reemplaza solo el primer segmento de la ruta (/es/... -> /en/...),
  // conservando la página exacta en la que estás (proyecto, trayectoria, etc.).
  const targetPath = pathname.replace(/^\/(es|en)/, `/${nextLang}`);

  return (
    <Link
      href={targetPath}
      aria-label={lang === "es" ? "Switch to English" : "Cambiar a español"}
      className="flex size-9 items-center justify-center rounded-full border border-border font-mono text-xs font-medium text-fg-muted transition-colors duration-300 hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {NEXT_LABEL[lang]}
    </Link>
  );
}