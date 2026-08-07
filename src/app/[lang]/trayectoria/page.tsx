import {
  Award,
  Briefcase,
  GraduationCap,
  Languages,
  MapPin,
  ArrowLeft,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";
import Link from "next/link";
import Image from "next/image";
import { assetUrl } from "@/lib/data/config";
import {
  getCertificates,
  getEducation,
  getExperience,
  getProfile,
  getSkills,
  getSocial,
} from "@/lib/data/client";
import type { Lang } from "@/lib/data/client";
import { getDictionary } from "@/dictionaries";
import type {
  EducationEntry,
  ExperienceEntry,
  SkillCategory,
} from "@/types/content";

export default async function TrayectoriaPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: langParam } = await params;
  const lang = langParam as Lang;

  const [profile, social, experience, education, skills, certificates] =
    await Promise.all([
      getProfile(lang),
      getSocial(lang),
      getExperience(lang),
      getEducation(lang),
      getSkills(lang),
      getCertificates(lang),
    ]);
  const dict = getDictionary(lang);
  const avatarUrl = assetUrl(profile.avatar);
  return (
    <>
      <Navbar name={profile.fullName} lang={lang} dict={dict.navbar}/>
      <main>
        <section className="border-b border-border">
          <div className="mx-auto max-w-4xl px-6 py-16 space-y-8">
            <Reveal>
              <Link
                href={`/${lang}#sobre-mi`}
                className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
              >
                <ArrowLeft size={14} />
                {dict.pageTrayectoria.backLink}
              </Link>
            </Reveal>
            <Reveal>
              <div className="flex items-center gap-4">
                {avatarUrl && (
                  <div className="corner-mark relative size-16 shrink-0 overflow-hidden rounded-full border border-border bg-border sm:size-20">
                    <Image
                      src={avatarUrl}
                      alt={profile.fullName}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                    {dict.pageTrayectoria.title}
                  </p>
                  <h1 className="mt-1 text-4xl font-medium tracking-tight text-fg">
                    {profile.professionalTitle}
                  </h1>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted">
                {profile.about.long}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-wider text-fg-subtle">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={13} />
                  {[
                    profile.location.city,
                    profile.location.state,
                    profile.location.country,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </span>
                {profile.languages.length > 0 && (
                  <span className="inline-flex items-center gap-1.5">
                    <Languages size={13} />
                    {profile.languages
                      .map((l) => `${l.name} (${l.level})`)
                      .join(" · ")}
                  </span>
                )}
              </div>
            </Reveal>
          </div>
        </section>

        {experience.length > 0 && (
          <TrayectoriaSection
            eyebrow={dict.pageTrayectoria.experience.eyebrow}
            title={dict.pageTrayectoria.experience.title}
            icon={Briefcase}
          >
            <div className="space-y-10">
              {experience.map((entry) => (
                <ExperienceItem
                  key={`${entry.company}-${entry.startDate}`}
                  entry={entry}
                />
              ))}
            </div>
          </TrayectoriaSection>
        )}

        {education.length > 0 && (
          <TrayectoriaSection
            eyebrow={dict.pageTrayectoria.education.eyebrow}
            title={dict.pageTrayectoria.education.title}
            icon={GraduationCap}
          >
            <div className="space-y-8">
              {education.map((entry) => (
                <EducationItem
                  key={`${entry.institution}-${entry.degree}`}
                  entry={entry}
                />
              ))}
            </div>
          </TrayectoriaSection>
        )}

        {skills.categories.length > 0 && (
          <TrayectoriaSection
            eyebrow={dict.pageTrayectoria.skills.eyebrow}
            title={dict.pageTrayectoria.skills.title}
          >
            <div className="space-y-8">
              {skills.categories.map((category) => (
                <SkillCategoryGroup key={category.name} category={category} />
              ))}
            </div>
          </TrayectoriaSection>
        )}

        {certificates.length > 0 && (
          <TrayectoriaSection
            eyebrow={dict.pageTrayectoria.certificates.eyebrow}
            title={dict.pageTrayectoria.certificates.title}
            icon={Award}
          >
            <ul className="space-y-4">
              {certificates.map((cert) => {
                const href =
                  cert.url || (cert.image ? assetUrl(cert.image) : null);

                return (
                  <li
                    key={`${cert.title}-${cert.date}`}
                    className="flex flex-wrap items-baseline gap-x-3 gap-y-1"
                  >
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-fg transition-colors hover:text-accent"
                      >
                        {cert.title}
                      </a>
                    ) : (
                      <span className="font-medium text-fg">{cert.title}</span>
                    )}
                    <span className="text-fg-muted">{cert.issuer}</span>
                    <span className="font-mono text-xs text-fg-subtle">
                      {cert.date}
                    </span>
                  </li>
                );
              })}
            </ul>
          </TrayectoriaSection>
        )}
      </main>
      <Footer name={profile.fullName} social={social} />
    </>
  );
}

function TrayectoriaSection({
  eyebrow,
  title,
  icon: Icon,
  children,
}: {
  eyebrow: string;
  title: string;
  icon?: React.ComponentType<{ size?: number }>;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-border last:border-b-0">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <Reveal>
          <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {Icon && <Icon size={13} />}
            {eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-3 text-2xl font-medium tracking-tight text-fg">
            {title}
          </h2>
        </Reveal>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

function formatDateRange(entry: ExperienceEntry) {
  const end = entry.current || !entry.endDate ? "Presente" : entry.endDate;
  return `${entry.startDate} — ${end}`;
}

function ExperienceItem({ entry }: { entry: ExperienceEntry }) {
  return (
    <Reveal className="grid gap-3 md:grid-cols-[160px_1fr] md:gap-12">
      <p className="font-mono text-xs uppercase tracking-wider text-fg-subtle">
        {formatDateRange(entry)}
      </p>
      <div>
        <h3 className="text-lg font-medium text-fg">
          {entry.position}{" "}
          <span className="text-fg-muted">· {entry.company}</span>
        </h3>
        {entry.location && (
          <p className="mt-1 text-sm text-fg-subtle">{entry.location}</p>
        )}

        {entry.description.length > 0 && (
          <ul className="mt-3 space-y-2">
            {entry.description.map((d) => (
              <li key={d} className="flex gap-3 text-fg-muted">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                {d}
              </li>
            ))}
          </ul>
        )}

        {entry.technologies.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {entry.technologies.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-fg-subtle"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </Reveal>
  );
}

function formatYearRange(entry: EducationEntry) {
  if (entry.startYear && entry.endYear)
    return `${entry.startYear} — ${entry.endYear}`;
  if (entry.startYear) return `${entry.startYear} — Presente`;
  return entry.status;
}

function EducationItem({ entry }: { entry: EducationEntry }) {
  return (
    <Reveal className="grid gap-3 md:grid-cols-[160px_1fr] md:gap-12">
      <p className="font-mono text-xs uppercase tracking-wider text-fg-subtle">
        {formatYearRange(entry)}
      </p>
      <div>
        <h3 className="text-lg font-medium text-fg">{entry.degree}</h3>
        <p className="mt-1 text-sm text-fg-muted">{entry.institution}</p>

        {entry.courses && entry.courses.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {entry.courses.map((c) => (
              <span
                key={c}
                className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-fg-subtle"
              >
                {c}
              </span>
            ))}
          </div>
        )}
      </div>
    </Reveal>
  );
}

/**
 * Las skills se muestran como tags agrupados por categoría, ordenados
 * internamente por nivel/años de mayor a menor. El número nunca se
 * muestra — solo determina el orden, no una barra ni un porcentaje.
 */
function SkillCategoryGroup({ category }: { category: SkillCategory }) {
  const sorted = category.skills
    .slice()
    .sort((a, b) => b.level - a.level || b.years - a.years);

  return (
    <Reveal className="grid gap-3 md:grid-cols-[160px_1fr] md:gap-12">
      <p className="font-mono text-xs uppercase tracking-wider text-fg-subtle">
        {category.name}
      </p>
      <div className="flex flex-wrap gap-2">
        {sorted.map((skill) => (
          <span
            key={skill.name}
            className="rounded-full border border-border px-3 py-1.5 text-sm text-fg-muted"
          >
            {skill.name}
          </span>
        ))}
      </div>
    </Reveal>
  );
}
