// Tipos que reflejan los JSON Schemas del repo `portfolio-data`.
// Si cambias un schema allá, refleja el cambio aquí.
// Datos de profile.json
export interface ProfileAbout {
  short: string;
  long: string;
}

export interface ProfileLocation {
  country: string;
  state: string;
  city: string;
}

export interface ProfileLanguage {
  name: string;
  level: string;
}

export interface ProfileResume {
  es: string;
  en: string;
}

export interface Profile {
  fullName: string;
  professionalTitle: string;
  headline: string;

  about: ProfileAbout;

  location: ProfileLocation;

  email: string;
  phone: string;
  website: string;

  avatar: string;

  resume: ProfileResume;

  languages: ProfileLanguage[];
}
// Datos de social.json
export interface SocialLinks {
  github: string;
  linkedin: string;
  email: string;
  website?: string;
  x?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  koFi?: string;
  patreon?: string;
}
// Datos de projects.json, del index de todos los proyectos
// 🔹 Centralizamos status para evitar inconsistencias
export type ProjectStatus = "development" | "completed" | "archived";

export interface ProjectIndexItem {
  id: number;
  slug: string;
  title: string;
  status: ProjectStatus;
  featured: boolean;
  order: number;
  coverImage: string;
}
// Datos de carpeta projects y de cada proyecto individual
export interface ProjectChallenge {
  title: string;
  description: string;
}

export interface ProjectDuration {
  start: string;
  end: string;
}

// 🔹 Tipado básico para links (mejor que any)
export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  id: number;
  slug: string;

  title: string;
  subtitle: string;

  featured: boolean;
  status: ProjectStatus; // ✅ unificado

  year: number;
  category: string[];

  description: string;
  shortDescription: string;

  problem: string;
  solution: string;

  coverImage: string;
  gallery: string[];

  technologies: string[];
  features: string[];
  responsibilities: string[];

  client?: string;

  duration?: ProjectDuration;
  teamSize: number;
  role: string;

  challenges: ProjectChallenge[];

  results: string[];
  lessons: string[];

  documents: string[];
  links: ProjectLink[]; // ✅ eliminado any
}
// Datos de skills.json
export interface Skill {
  name: string;
  level: number;
  years: number;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export interface SkillsData {
  categories: SkillCategory[];
}
// Datos de experience.json
export interface ExperienceEntry {
  company: string;
  position: string;

  startDate: string;
  endDate: string | null;
  featured: boolean;
  current: boolean;

  location: string;

  description: string[];

  technologies: string[];
}
// Datos de education.json
export interface EducationEntry {
  institution: string;
  degree: string;

  status: string;

  startYear?: number;
  endYear?: number;

  courses?: string[];
}
// Datos de certificates.json
export interface Certificate {
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  url?: string;
  image?: string;
}