import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { HowIWork } from "@/components/sections/HowIWork";
import { Contact } from "@/components/sections/Contact";
import {
  getProfile,
  getProjectsIndex,
  getProject,
  getSocial,
} from "@/lib/data/client";
import type { Lang } from "@/lib/data/client";
import type { Project } from "@/types/content";
import { getDictionary } from "@/dictionaries";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: langParam } = await params;
  const lang = langParam as Lang;
  const dict = getDictionary(lang);

  const [profile, social, projectIndex] = await Promise.all([
    getProfile(lang),
    getSocial(lang),
    getProjectsIndex(lang),
  ]);

  const projects = await Promise.all(
    projectIndex.map((p) => getProject(p.slug, lang)),
  );

  const featuredSlugs = projectIndex
    .filter((p) => p.featured)
    .sort((a, b) => a.order - b.order)
    .map((p) => p.slug);

  const featuredProjects = featuredSlugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is Project => Boolean(p));

  return (
    <>
      <Navbar name={profile.fullName} lang={lang} dict={dict.navbar}/>
      <main>
        <Hero profile={profile} projects={featuredProjects} lang={lang} dict={dict.hero} />
        <About lang={lang} dict={dict.about} />
        <Projects projects={projects} lang={lang} dict={dict.proyects} />
        <HowIWork dict={dict.howIWork} />
        <Contact profile={profile} social={social} dict={dict.contact} lang={lang} />
      </main>
      <Footer name={profile.fullName} social={social} />
    </>
  );
}
