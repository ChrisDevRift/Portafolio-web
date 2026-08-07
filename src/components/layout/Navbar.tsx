import Link from "next/link";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { LanguageToggle } from "@/components/theme/LanguageToggle";
import type { Lang } from "@/lib/data/client";
import type { Dictionary } from "@/types/dictionary";
import { getDictionary } from "@/dictionaries";

// Los anchors llevan el segmento de idioma al frente (/es#..., /en#...)
// para no perderlo al navegar entre secciones. "Trayectoria" es una ruta
// real, no un anchor, así que también necesita el prefijo.
function buildSections(lang: Lang, dict: Dictionary["navbar"]) {
  return [
    { href: `/${lang}#sobre-mi`, label: dict.sobreMi },
    { href: `/${lang}#proyectos`, label: dict.proyectos },
    { href: `/${lang}/trayectoria`, label: dict.trayectoria },
    { href: `/${lang}#como-trabajo`, label: dict.comoTrabajo },
    { href: `/${lang}#contacto`, label: dict.contacto },
  ];
}
  

export function Navbar({ name, lang = "es" , dict = getDictionary("es").navbar}: { name: string; lang?: Lang; dict: Dictionary["navbar"] }) {
  const sections = buildSections(lang, dict);

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
        <Link
          href={`/${lang}`}
          className="font-mono text-sm tracking-tight text-fg transition-colors hover:text-accent"
        >
          {name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="text-sm text-fg-muted transition-colors hover:text-fg"
            >
              {s.label}
            </Link>
          ))}
        </nav>
        <LanguageToggle lang={lang} />
        <ThemeToggle />
      </div>
    </header>
  );
}