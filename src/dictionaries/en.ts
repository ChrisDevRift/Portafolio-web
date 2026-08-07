// src/dictionaries/en.ts
import type { Dictionary } from "@/types/dictionary";

export const en: Dictionary = {
  navbar: {
    sobreMi: "About Me",
    proyectos: "Projects",
    trayectoria: "Experience",
    comoTrabajo: "How I Work",
    contacto: "Contact",
  },
  projects: {
    eyebrow: "Projects",
    heading: "Every project is a problem solved, not a line on a list.",
  },
  about: {
    sobreMi: "About Me",
    trayectoria: "Experience",
    noSigoModas: "I don’t follow tech trends. I follow the problem.",
    principles: [
      {
        description: "I solve real problems, not collect technologies.",
      },
      {
        description: "I choose tools based on what the project actually needs.",
      },
      {
        description: "I enjoy learning whatever a new problem requires.",
      },
      {
        description: "I build with the next maintainer in mind.",
      },
    ],
  },
  hero: {
    verproyectos: "View Projects",
    downloadCV: "Download CV",
  },
  proyects: {
    proyectos: "Projects",
    cadaProyecto: "Every project is a problem solved, not a line on a list.",
  },
  howIWork: {
    eyebrow: "How I Work",
    heading: "Every project is a problem solved, not a line on a list.",
    steps: [
      {
        title: "Understand the problem",
        description:
          "Before writing code, I make sure I understand what’s really happening and who it’s for.",
      },
      {
        title: "Choose the right technology",
        description: "Tools are selected based on project needs, not trends.",
      },
      {
        title: "Find simple solutions",
        description:
          "The simplest solution that fully solves the problem, not the most impressive one.",
      },
      {
        title: "Prioritize maintainability",
        description:
          "I write code with the person who will read it in six months in mind — often myself.",
      },
    ],
  },
  contact: {
    correo: "Email",
    linkedin: "LinkedIn",
    github: "GitHub",
    descargarCV: "Download CV",
    contacto: "Contact",
    hablemos: "Got a problem to solve? Let’s talk.",
  },
  notFound: {
    error: "404",
    heading: "Page not found",
    description: "The page you are looking for does not exist.",
    backToHome: "Back to Home",
  },
  pageProject: {
    backLink: "All Projects",
    problem: { eyebrow: "Problem", title: "What needed to be solved?" },
    solution: { eyebrow: "Solution", title: "How was it solved?" },
    features: { eyebrow: "Features", title: "What it does" },
    responsibilities: {
      eyebrow: "Responsibilities",
      title: "My role in the project",
    },
    challenges: {
      eyebrow: "Technical Challenges",
      title: "What wasn’t trivial",
    },
    results: { eyebrow: "Results", title: "What was achieved" },
    documents: { eyebrow: "Documents", title: "Additional materials" },
    meta: {
      role: "Role",
      client: "Client",
      duration: "Duration",
      year: "Year",
      team: "Team",
      teamOne: "person",
      teamOther: "people",
    },
  },
  pageTrayectoria: {
    backLink: "Back",
    title: "Experience",
    education: { eyebrow: "Education", title: "My academic background" },
    experience: { eyebrow: "Experience", title: "My professional experience" },
    skills: { eyebrow: "Skills", title: "My competencies" },
    certificates: { eyebrow: "Certificates", title: "My certifications" },
  },
};
