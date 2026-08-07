import "server-only";
import fs from "node:fs";
import path from "node:path";
import { githubAuthHeaders, githubContentApiUrl, USE_MOCK_DATA } from "./config";
import type {
  Certificate,
  EducationEntry,
  ExperienceEntry,
  Profile,
  Project,
  ProjectIndexItem,
  SkillsData,
  SocialLinks,
} from "@/types/content";

// Idiomas soportados por el sitio. Se exporta desde aquí porque, por
// ahora, este es el único lugar que necesita conocer el tipo — cuando la
// Fase 3 lo use en las páginas, lo importan de este mismo archivo.
export type Lang = "es" | "en";

// Revalida el contenido cada hora: suficiente para que editar un JSON en
// el repo de datos se refleje sin necesitar un redeploy inmediato, sin
// pegarle a GitHub en cada request.
const REVALIDATE_SECONDS = 300;

function readMockFile<T>(mockPath: string): T {
  const filePath = path.join(process.cwd(), "src", "data", "mock", `${mockPath}.json`);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

async function fetchJson<T>(contentPath: string, mockPath: string): Promise<T> {
  if (USE_MOCK_DATA) {
    return readMockFile<T>(mockPath);
  }

  try {
    const res = await fetch(githubContentApiUrl(contentPath), {
      headers: githubAuthHeaders(),
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!res.ok) {
      throw new Error(`No se pudo cargar ${contentPath} desde portfolio-data (${res.status})`);
    }

    return (await res.json()) as T;
  } catch (error) {
    // Token vencido, rama/repo mal configurado, red caída, JSON corrupto,
    // etc. — cualquier falla real de conexión a portfolio-data cae al
    // mismo mock que se usa en desarrollo, para que el sitio en
    // producción no se caiga completo por un problema de credenciales.
    console.error(
      `[portfolio-data] No se pudo conectar a GitHub para ${contentPath}, usando datos de ejemplo como respaldo:`,
      error,
    );
    return readMockFile<T>(mockPath);
  }
}

/**
 * Igual que fetchJson, pero consciente del idioma: si lang es "en",
 * intenta primero la ruta bajo la carpeta en/ en la raíz del repo (y su
 * mock equivalente en src/data/mock/en/). Si esa ruta no existe todavía
 * (proyecto sin traducir, carpeta en/ incompleta), cae en silencio a la
 * ruta en español — el mismo principio de degradación elegante que ya
 * usa fetchJsonSafe, aplicado ahora también al idioma.
 */
async function fetchJsonLocalized<T>(
  contentPath: string,
  mockPath: string,
  lang: Lang,
): Promise<T> {
  if (lang === "en") {
    try {
      return await fetchJson<T>(`en/${contentPath}`, `en/${mockPath}`);
    } catch {
      // No existe la versión en inglés todavía: fallback a español.
    }
  }
  return fetchJson<T>(contentPath, mockPath);
}

/**
 * Varios archivos de portfolio-data vienen envueltos como
 * { claveDelArreglo: [...] } en vez de ser un arreglo plano en la raíz.
 * Esta función soporta ambas formas sin tronar si el archivo cambia.
 */
function unwrapArray<T>(raw: unknown, key: string): T[] {
  if (Array.isArray(raw)) return raw as T[];

  const value = (raw as Record<string, unknown> | null)?.[key];
  if (Array.isArray(value)) return value as T[];

  console.error(
    `[portfolio-data] Se esperaba un arreglo (o { ${key}: [...] }) en ese archivo, pero llegó otra cosa.`,
  );
  return [];
}

/**
 * Igual que fetchJsonLocalized, pero si falla (404, JSON mal formado,
 * carpeta EN/ y ruta en español ambas ausentes, etc.) no rompe la página
 * completa — registra el error en el servidor y regresa un valor por
 * defecto, para que esa sección simplemente no se muestre.
 */
async function fetchJsonSafe<T>(
  contentPath: string,
  mockPath: string,
  fallback: T,
  lang: Lang = "es",
): Promise<T> {
  try {
    return await fetchJsonLocalized<T>(contentPath, mockPath, lang);
  } catch (error) {
    console.error(`[portfolio-data] No se pudo cargar ${contentPath}:`, error);
    return fallback;
  }
}

export function getProfile(lang: Lang = "es") {
  return fetchJsonLocalized<Profile>("config/profile.json", "profile", lang);
}

export function getSocial(lang: Lang = "es") {
  return fetchJsonLocalized<SocialLinks>("config/social.json", "social", lang);
}

export async function getProjectsIndex(lang: Lang = "es") {
  const raw = await fetchJsonLocalized<unknown>(
    "content/projects.json",
    "projects-index",
    lang,
  );
  const list = unwrapArray<ProjectIndexItem>(raw, "projects");
  return list.slice().sort((a, b) => a.order - b.order);
}

export function getProject(slug: string, lang: Lang = "es") {
  return fetchJsonLocalized<Project>(
    `content/projects/${slug}.json`,
    `projects/${slug}`,
    lang,
  );
}

export async function getFeaturedProjects(lang: Lang = "es") {
  const index = await getProjectsIndex(lang);
  const featured = index.filter((p) => p.featured);
  return Promise.all(featured.map((p) => getProject(p.slug, lang)));
}

export function getSkills(lang: Lang = "es") {
  return fetchJsonLocalized<SkillsData>("content/skills.json", "skills", lang);
}

export async function getExperience(lang: Lang = "es") {
  const raw = await fetchJsonLocalized<unknown>("content/experience.json", "experience", lang);
  return unwrapArray<ExperienceEntry>(raw, "experience");
}

export async function getEducation(lang: Lang = "es") {
  const raw = await fetchJsonLocalized<unknown>("content/education.json", "education", lang);
  return unwrapArray<EducationEntry>(raw, "education");
}

export async function getCertificates(lang: Lang = "es") {
  const raw = await fetchJsonLocalized<unknown>(
    "content/certificates.json",
    "certificates",
    lang,
  );
  return unwrapArray<Certificate>(raw, "certificates");
}