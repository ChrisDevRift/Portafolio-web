import type { Project } from "@/types/content";
import { Reveal } from "@/components/ui/Reveal";
import type { Lang } from "@/lib/data/client";
import { ProjectCard } from "@/components/ui/ProjectCard";
import type { Dictionary } from "@/types/dictionary";

export function Projects({ projects, lang, dict }: { projects: Project[]; lang: Lang; dict: Dictionary["proyects"] }) {
  const visibleProjects = projects.filter((project) => project.featured);
  return (
    <section id="proyectos" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {dict.proyectos}
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-4 max-w-xl text-3xl font-medium leading-tight tracking-tight text-fg">
            {dict.cadaProyecto}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6">
          {visibleProjects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} delay={0.05 * i} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}
