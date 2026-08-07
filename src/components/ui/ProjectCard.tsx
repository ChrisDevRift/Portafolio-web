import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/content";
import { assetUrl } from "@/lib/data/config";
import { Reveal } from "@/components/ui/Reveal"; 
import type { Lang } from "@/lib/data/client";

export function ProjectCard({
  project,
  delay = 0,
  lang,
}: {
  project: Project;
  delay?: number;
  lang: Lang;
}) {
  const coverSrc = assetUrl(project.coverImage);
  return (
    <Reveal delay={delay}>
      <Link
        href={`/${lang}/proyectos/${project.slug}`}
        className="corner-mark group grid gap-0 overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:grid-cols-5"
      >
        <div className="blueprint-grid relative aspect-square w-full overflow-hidden border-b border-border md:col-span-2 md:aspect-auto md:border-b-0 md:border-r">
          <div className="absolute inset-0 flex items-center justify-center bg-bg/40 p-8">
            {coverSrc && (
              <Image
                src={coverSrc}
                alt={project.title}
                width={220}
                height={220}
                className="h-auto w-auto max-w-[85%] max-h-[85%] transition-transform duration-500 group-hover:scale-105"
              />
            )}
          </div>
        </div>

        <div className="flex flex-col justify-center p-6 md:col-span-3 md:p-8 ">
          <div className="">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-xl font-medium text-fg">{project.title}</h3>
              <ArrowUpRight
                size={18}
                className="mt-1 shrink-0 text-fg-subtle transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
              />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-fg-muted">
              {project.shortDescription}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-fg-subtle"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
