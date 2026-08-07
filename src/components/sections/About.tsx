import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import type { Lang } from "@/lib/data/client";

export function About({ lang, dict }: { lang: Lang; dict: any }) {
  return (
    <section id="sobre-mi" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {dict.sobreMi}
          </p>
        </Reveal>

        <div className="mt-6 grid gap-12 md:grid-cols-2">
          <Reveal delay={0.05}>
            <h2 className="text-3xl font-medium leading-tight tracking-tight text-fg">
              {dict.noSigoModas}
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="space-y-5">
              {dict.principles.map((p: { description: string }) => (
                <li key={p.description} className="flex gap-4 text-fg-muted">
                  <span
                    className="mt-1 h-px w-6 shrink-0 bg-accent"
                    aria-hidden
                  />
                  <span>{p.description}</span>
                </li>
              ))}
            </ul>

            <Link
              href={`/${lang}/trayectoria`}
              className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-fg transition-colors hover:text-accent"
            >
              {dict.trayectoria}
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
