import { ArrowUpRight } from "lucide-react";
import type { Profile, SocialLinks } from "@/types/content";
import { assetUrl } from "@/lib/data/config";
import { Reveal } from "@/components/ui/Reveal";
import type { Dictionary } from "@/types/dictionary";
import type { Lang } from "@/lib/data/client";

export function Contact({ profile, social, dict, lang }: { profile: Profile; social: SocialLinks; dict: Dictionary["contact"]; lang: Lang }) {
  const links = [
    { label: dict.correo, href: `mailto:${social.email}` },
    { label: dict.linkedin, href: social.linkedin },
    { label: dict.github, href: social.github },
    { label: dict.descargarCV, href: assetUrl(profile.resume[lang]) }, 
  ];

  return (
    <section id="contacto">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {dict.contacto}
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-4 max-w-xl text-3xl font-medium leading-tight tracking-tight text-fg">
            {dict.hablemos}
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap gap-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank" 
                rel="noopener noreferrer"
                className="corner-mark group inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-medium text-fg transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                {link.label}
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
