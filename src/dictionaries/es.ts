// src/dictionaries/es.ts
import type { Dictionary } from "@/types/dictionary";

export const es: Dictionary = {
  navbar: {
    sobreMi: "Sobre mí",
    proyectos: "Proyectos",
    trayectoria: "Trayectoria",
    comoTrabajo: "Cómo trabajo",
    contacto: "Contacto",
  },
  projects: {
    eyebrow: "Proyectos",
    heading: "Cada proyecto es un problema resuelto, no una fila en una tabla.",
  },
  about: {
    sobreMi: "Sobre mí",
    trayectoria: "Trayectoria",
    noSigoModas: "No sigo modas tecnológicas. Sigo al problema.",
    principles: [
      {
        description: "Resuelvo problemas reales, no colecciono tecnologías.",
      },
      {
        description: "Elijo la herramienta según lo que el proyecto necesita.",
      },
      {
        description: "Disfruto aprender lo que un problema nuevo exige.",
      },
      {
        description: "Construyo pensando en quién mantiene el código después.",
      },
    ],
  },
  hero: {
    verproyectos: "Ver proyectos",
    downloadCV: "Descargar CV",
  },
  proyects: {
    proyectos: "Proyectos",
    cadaProyecto:
      "Cada proyecto es un problema resuelto, no una fila en una tabla.",
  },
  howIWork: {
    eyebrow: "Cómo trabajo",
    heading: "Cada proyecto es un problema resuelto, no una fila en una tabla.",
    steps: [
      {
        title: "Entender el problema",
        description:
          "Antes de escribir código, entiendo qué está pasando realmente y para quién.",
      },
      {
        title: "Elegir la tecnología adecuada",
        description:
          "La herramienta se elige por lo que el proyecto necesita, no por lo que está de moda.",
      },
      {
        title: "Buscar soluciones simples",
        description:
          "La solución más simple que resuelve el problema completo, no la más impresionante.",
      },
      {
        title: "Priorizar la mantenibilidad",
        description:
          "Escribo pensando en la persona que va a leer este código en seis meses — a veces, yo mismo.",
      },
    ],
  },
  contact: {
    correo: "Correo",
    linkedin: "LinkedIn",
    github: "GitHub",
    descargarCV: "Descargar CV",
    contacto: "Contacto",
    hablemos: "¿Un problema que resolver? Hablemos.",
  },
  notFound: {
    error: "404",
    heading: "Página no encontrada",
    description: "La página que buscas no existe.",
    backToHome: "Volver al inicio",
  },
  pageProject: {
    backLink: "Todos los proyectos",
    problem: { eyebrow: "Problema", title: "¿Qué había que resolver?" },
    solution: { eyebrow: "Solución", title: "¿Cómo se resolvió?" },
    features: { eyebrow: "Características", title: "Lo que hace" },
    responsibilities: {
      eyebrow: "Responsabilidades",
      title: "Mi rol en el proyecto",
    },
    challenges: { eyebrow: "Retos técnicos", title: "Lo que no fue trivial" },
    results: { eyebrow: "Resultado", title: "Qué se logró" },
    documents: { eyebrow: "Documentos", title: "Material adicional" },
    meta: {
      role: "Rol",
      client: "Cliente",
      duration: "Duración",
      year: "Año",
      team: "Equipo",
      teamOne: "persona",
      teamOther: "personas",
    },
  },
  pageTrayectoria: {
    backLink: "Volver",
    title: "Trayectoria",
    education: { eyebrow: "Educación", title: "Mi formación académica" },
    experience: { eyebrow: "Experiencia", title: "Mi experiencia laboral" },
    skills: { eyebrow: "Habilidades", title: "Mis competencias" },
    certificates: { eyebrow: "Certificados", title: "Mis certificaciones" },
  },
};
