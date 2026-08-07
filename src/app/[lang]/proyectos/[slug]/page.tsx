import type { ReactNode } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  FileText,
  Github,
  Globe,
  Link2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { assetUrl } from "@/lib/data/config";
import { Gallery } from "@/components/ui/Gallery";
import {
  getProfile,
  getProject,
  getProjectsIndex,
  getSocial,
} from "@/lib/data/client";
import type { Lang } from "@/lib/data/client";
import type {Dictionary} from "@/types/dictionary";
import { getDictionary } from "@/dictionaries";

export async function generateStaticParams() {
  const index = await getProjectsIndex();
  const projects = await Promise.all(index.map((p) => getProject(p.slug)));
  return projects.filter((p) => p.featured).map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
  params
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: langParam, slug } = await params;
  const lang = langParam as Lang;
  const [profile, social] = await Promise.all([
    getProfile(lang),
    getSocial(lang),
  ]);

  const project = await getProject(slug, lang).catch(() => null);
  if (!project || !project.featured) notFound();
  
  const dict = getDictionary(lang);
  const heroSrc = assetUrl(project.coverImage);

  return (
    <>
      <Navbar name={profile.fullName} lang={lang} dict={dict.navbar} />
      <main>
        <section className="border-b border-border">
          <div className="mx-auto max-w-4xl px-6 py-16">
            <Reveal>
              <Link
                href={`/${lang}#proyectos`}
                className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
              >
                <ArrowLeft size={14} />
                {dict.pageProject.backLink}
              </Link>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="mt-6 text-4xl font-medium tracking-tight text-fg">
                {project.title}
              </h1>
            </Reveal>

            {project.subtitle && (
              <Reveal delay={0.08}>
                <p className="mt-3 text-lg text-fg-muted">{project.subtitle}</p>
              </Reveal>
            )}

            <Reveal delay={0.1}>
              <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-wider text-fg-subtle">
                <MetaItem label={dict.pageProject.meta.role} value={project.role} />
                <MetaItem label={dict.pageProject.meta.client} value={project.client} />
                <MetaItem
                  label={dict.pageProject.meta.duration}
                  value={
                    project.duration &&
                    `${project.duration.start} — ${project.duration.end}`
                  }
                />
                <MetaItem label={dict.pageProject.meta.year} value={String(project.year)} />
                <MetaItem
                  label={dict.pageProject.meta.team}
                  value={
                    project.teamSize
                      ? `${project.teamSize} ${project.teamSize === 1 ? "persona" : "personas"}`
                      : undefined
                  }
                />
              </dl>
            </Reveal>

            {project.category.length > 0 && (
              <Reveal delay={0.12}>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.category.map((c) => (
                    <span
                      key={c}
                      className="rounded-full bg-border/60 px-2.5 py-1 text-[10px] uppercase tracking-wider text-fg-muted"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </Reveal>
            )}

            <Reveal delay={0.1}>
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
            </Reveal>

            {project.links.length > 0 && (
              <Reveal delay={0.15}>
                <div className="mt-6 flex flex-wrap gap-4">
                  {project.links.map((link) =>
                    link.url?.trim() ? (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-accent"
                      >
                        <LinkIcon label={link.label} />
                        {link.label}
                        <ArrowUpRight size={12} />
                      </a>
                    ) : null,
                  )}
                </div>
              </Reveal>
            )}
          </div>
        </section>

        <Reveal>
          <div className="mx-auto my-16 flex max-w-4xl items-center justify-center rounded-xl border border-border p-10">
            {heroSrc && (
              <Image
                src={heroSrc}
                alt={project.title}
                width={500}
                height={500}
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="h-auto max-h-150 w-auto max-w-full"
                priority
              />
            )}
          </div>
        </Reveal>

        <section className="mx-auto grid max-w-4xl gap-16 px-6 pb-24">
          <CaseStudySection eyebrow={dict.pageProject.problem.eyebrow} title={dict.pageProject.problem.title}>
            <p>{project.problem}</p>
          </CaseStudySection>

          <CaseStudySection eyebrow={dict.pageProject.solution.eyebrow} title={dict.pageProject.solution.title}>
            <p>{project.solution}</p>
          </CaseStudySection>

          {project.features.length > 0 && (
            <CaseStudySection eyebrow={dict.pageProject.features.eyebrow} title={dict.pageProject.features.title}>
              <ul className="grid gap-3 sm:grid-cols-2">
                {project.features.map((f) => (
                  <li key={f} className="flex gap-3 text-fg-muted">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {f}
                  </li>
                ))}
              </ul>
            </CaseStudySection>
          )}

          {project.responsibilities.length > 0 && (
            <CaseStudySection
              eyebrow={dict.pageProject.responsibilities.eyebrow}
              title={dict.pageProject.responsibilities.title}
            >
              <ul className="grid gap-3 sm:grid-cols-2">
                {project.responsibilities.map((r) => (
                  <li key={r} className="flex gap-3 text-fg-muted">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-fg-subtle" />
                    {r}
                  </li>
                ))}
              </ul>
            </CaseStudySection>
          )}

          {project.challenges.length > 0 && (
            <CaseStudySection
              eyebrow={dict.pageProject.challenges.eyebrow}
              title={dict.pageProject.challenges.title}
            >
              <div className="space-y-6">
                {project.challenges.map((c, index) => (
                  <div key={`${c.title}-${index}`}>
                    <h4 className="font-medium text-fg">{c.title}</h4>
                    <p className="mt-1 text-fg-muted">{c.description}</p>
                  </div>
                ))}
              </div>
            </CaseStudySection>
          )}

          <CaseStudySection eyebrow={dict.pageProject.results.eyebrow} title={dict.pageProject.results.title}>
            <ul className="space-y-2">
              {project.results.map((r) => (
                <li key={r} className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {r}
                </li>
              ))}
            </ul>
            {project.lessons.length > 0 && (
              <ul className="mt-4 space-y-2">
                {project.lessons.map((l) => (
                  <li key={l} className="flex gap-3 text-fg-muted">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-fg-subtle" />
                    {l}
                  </li>
                ))}
              </ul>
            )}
          </CaseStudySection>

          {project.gallery.length > 0 && (
            <Gallery
              images={project.gallery
                .map((src) => assetUrl(src))
                .filter((url): url is string => Boolean(url))}
              alt={project.title}
            />
          )}

          {project.documents.length > 0 && (
            <CaseStudySection eyebrow={dict.pageProject.documents.eyebrow} title={dict.pageProject.documents.title}>
              <ul className="space-y-2">
                {project.documents.map((doc) => (
                  <li key={doc}>
                    <a
                      href={assetUrl(doc)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-fg-muted transition-colors hover:text-accent"
                    >
                      <FileText size={14} />
                      {documentLabel(doc)}
                    </a>
                  </li>
                ))}
              </ul>
            </CaseStudySection>
          )}
        </section>
      </main>
      <Footer name={profile.fullName} social={social} />
    </>
  );
}

function CaseStudySection({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <Reveal className="grid gap-4 md:grid-cols-[200px_1fr] md:gap-12">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </p>
        <h3 className="mt-2 text-lg font-medium text-fg">{title}</h3>
      </div>
      <div className="leading-relaxed text-fg-muted">{children}</div>
    </Reveal>
  );
}

/** Un dato de metadata (rol, cliente, duración...). No se renderiza si falta el valor. */
function MetaItem({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex items-baseline gap-1.5">
      <dt className="text-accent">{label}</dt>
      <dd className="normal-case tracking-normal text-fg-muted">{value}</dd>
    </div>
  );
}

/** Icono según el tipo de link (GitHub, demo, sitio web, o genérico). */
function LinkIcon({ label }: { label: string }) {
  const l = label.toLowerCase();
  if (l.includes("github")) return <Github size={14} />;
  if (l.includes("demo") || l.includes("live"))
    return <ArrowUpRight size={14} />;
  if (l.includes("web") || l.includes("site") || l.includes("sitio"))
    return <Globe size={14} />;
  return <Link2 size={14} />;
}

/** Nombre legible a partir de la ruta del documento (sin carpeta ni extensión). */
function documentLabel(path: string) {
  const fileName = path.split("/").pop() ?? path;
  return fileName.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
}
