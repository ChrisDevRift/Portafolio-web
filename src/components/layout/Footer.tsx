import type { SocialLinks } from "@/types/content";

interface FooterLink {
  href: string;
  label: string;
}

/**
 * Arma la lista de links a partir de social.json, incluyendo solo los que
 * tienen valor. Así, activar o quitar una red social en el futuro (ej.
 * Ko-fi, Patreon cuando estén listos) es solo llenar/vaciar el campo en
 * el JSON — no requiere tocar este componente.
 */
function buildLinks(social: SocialLinks): FooterLink[] {
  const candidates: (FooterLink | null)[] = [
    { href: social.github, label: "GitHub" },
    { href: social.linkedin, label: "LinkedIn" },
    social.email ? { href: `mailto:${social.email}`, label: "Email" } : null,
    social.website ? { href: social.website, label: "Website" } : null,
    social.x ? { href: social.x, label: "X" } : null,
    social.youtube ? { href: social.youtube, label: "YouTube" } : null,
    social.facebook ? { href: social.facebook, label: "Facebook" } : null,
    social.instagram ? { href: social.instagram, label: "Instagram" } : null,
    social.koFi ? { href: social.koFi, label: "Ko-fi" } : null,
    social.patreon ? { href: social.patreon, label: "Patreon" } : null,
  ];

  return candidates.filter((link): link is FooterLink => Boolean(link));
}

export function Footer({ name, social }: { name: string; social: SocialLinks }) {
  const year = new Date().getFullYear();
  const links = buildLinks(social);

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-fg-subtle md:flex-row md:items-center md:justify-between">
        <p className="font-mono">
          © {year} {name}
        </p>
        <div className="flex flex-wrap gap-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-fg"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
