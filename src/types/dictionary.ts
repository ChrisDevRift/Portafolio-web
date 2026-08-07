// src/types/dictionary.ts
export interface Dictionary {
  navbar: {
    sobreMi: string;
    proyectos: string;
    trayectoria: string;
    comoTrabajo: string;
    contacto: string;
  };
  projects: {
    eyebrow: string;
    heading: string;
  };
  about: {
    sobreMi: string;
    trayectoria: string;
    noSigoModas: string;
    principles: {
      description: string;
    }[];
  };
  hero: {
    verproyectos: string;
    downloadCV: string;
  };
  proyects: {
    proyectos: string;
    cadaProyecto: string;
  };
  howIWork: {
    eyebrow: string;
    heading: string;
    steps: {
      title: string;
      description: string;
    }[];
  };
  contact: {
    correo: string;
    linkedin: string;
    github: string;
    descargarCV: string;
    contacto: string;
    hablemos: string;
  };
  // types/dictionary.ts — agregar dentro de Dictionary
  pageProject: {
    backLink: string; // "Todos los proyectos"
    problem: { eyebrow: string; title: string };
    solution: { eyebrow: string; title: string };
    features: { eyebrow: string; title: string };
    responsibilities: { eyebrow: string; title: string };
    challenges: { eyebrow: string; title: string };
    results: { eyebrow: string; title: string };
    documents: { eyebrow: string; title: string };
    meta: {
      role: string;
      client: string;
      duration: string;
      year: string;
      team: string;
      teamOne: string; // "persona"
      teamOther: string; // "personas"
    };
  };
  pageTrayectoria: {
    backLink: string; 
    title: string;
    education: { eyebrow: string; title: string };
    experience: { eyebrow: string; title: string };
    skills: { eyebrow: string; title: string };
    certificates: { eyebrow: string; title: string };
  };
  notFound: {
    error: string;
    heading: string;
    description: string;
    backToHome: string;
  };
}
