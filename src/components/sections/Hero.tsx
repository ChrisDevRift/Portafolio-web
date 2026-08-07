"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import Image from "next/image";
import type { PointerEvent } from "react";
import type { Profile, Project } from "@/types/content";
import type { Lang } from "@/lib/data/client";
import type { Dictionary } from "@/types/dictionary";
import { assetUrl } from "@/lib/data/config";

const EASE = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export function Hero({
  profile,
  projects,
  lang,
  dict,
}: {
  profile: Profile;
  projects: Project[];
  lang: Lang;
  dict: Dictionary["hero"];
}) {
  // Parallax muy sutil: la posición del cursor dentro del hero mueve el
  // collage unos pocos píxeles, suavizado con un spring para que nunca
  // se sienta brusco.
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const collageX = useTransform(springX, [-0.5, 0.5], [-10, 10]);
  const collageY = useTransform(springY, [-0.5, 0.5], [-8, 8]);

  function handlePointerMove(e: PointerEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handlePointerLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <section
      id="top"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="blueprint-grid relative overflow-hidden border-b border-border"
    >
      <div className="mx-auto grid max-w-6xl gap-16 px-6 py-12 md:grid-cols-2 md:items-start">
        <div className="md:sticky md:top-16 md:flex md:min-h-[calc(100dvh-4rem)] md:items-center">
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.p
              variants={item}
              className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent"
            >
              {profile.professionalTitle}
            </motion.p>

            <motion.h1
              variants={item}
              className="text-4xl font-medium leading-[1.1] tracking-tight text-fg sm:text-5xl"
            >
              {profile.headline}
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 max-w-md text-lg text-fg-muted"
            >
              {profile.about.short}
            </motion.p>

            <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
              <a
                href="#proyectos"
                className="inline-flex items-center gap-2 rounded-full bg-fg px-5 py-3 text-sm font-medium text-bg transition-transform duration-300 hover:scale-[1.03]"
              >
                {dict.verproyectos}
                <ArrowRight size={15} />
              </a>
              <a
                href={assetUrl(profile.resume[lang])}
                className="corner-mark inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-fg transition-colors hover:text-accent"
                target="_blank"
                rel="noopener noreferrer"
              >
                {dict.downloadCV}
                <Download size={15} />
              </a>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          style={{ x: collageX, y: collageY }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12, delayChildren: 0.4 } },
          }}
          initial="hidden"
          animate="show"
          className="relative mx-auto grid w-full max-w-xs gap-3"
        >
          {projects.slice(0, 3).map((project, i) => (
            <CollageCard
              key={project.slug}
              project={project}
              offset={i % 2 === 0 ? 0 : 20}
            />
          ))} 
        </motion.div>
      </div>
    </section>
  );
}

function CollageCard({
  project,
  offset,
}: {
  project: Project;
  offset: number;
}) {
  const coverSrc = assetUrl(project.coverImage);
  return (
    <motion.div
      variants={item}
      style={{ marginLeft: offset }}
      className="corner-mark group relative w-3/4 overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-square w-full">
        {coverSrc ? (
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <Image
              src={coverSrc}
              alt={project.title}
              width={160}
              height={160}
              sizes="160px"
              className="h-auto w-auto max-h-[85%] max-w-[85%] transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="flex h-full items-center justify-center text-center text-[10px] uppercase tracking-[0.2em] text-fg-subtle">
            Sin imagen
          </div>
        )}
      </div>
      <div className="flex items-center justify-between border-t border-border px-3 py-2">
        <span className="text-sm font-medium text-fg">{project.title}</span>
        <span className="font-mono text-[10px] uppercase tracking-wider text-fg-subtle">
          {project.technologies[0]}
        </span>
      </div>
    </motion.div>
  );
}
