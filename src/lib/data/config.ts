/**
 * Todo el contenido del sitio proviene de `portfolio-data`, un repo
 * independiente y PRIVADO en GitHub. Este archivo es el único lugar donde
 * se arma la URL de ese repo — nada más en el frontend debe conocer su
 * ubicación ni tocar el token directamente.
 *
 * Variables de entorno (ver .env.local.example):
 *   DATA_REPO_OWNER   -> tu usuario de GitHub
 *   DATA_REPO_NAME    -> nombre del repo, por defecto "portfolio-data"
 *   DATA_REPO_BRANCH  -> rama a leer, por defecto "main"
 *   DATA_REPO_Token   -> fine-grained PAT con permiso Contents: Read-only
 *
 * Mientras no configures estas variables, se usan los JSON de ejemplo en
 * src/data/mock para poder maquetar el sitio sin depender del repo real.
 *
 * Como el repo es privado, ya no se puede leer con una URL "cruda" sin
 * autenticación (raw.githubusercontent.com no acepta el token). Todo pasa
 * por la API de contenido de GitHub, que sí soporta Authorization.
 */

export const DATA_SOURCE = {
  owner: process.env.DATA_REPO_OWNER ?? "",
  repo: process.env.DATA_REPO_NAME ?? "portfolio-data",
  branch: process.env.DATA_REPO_BRANCH ?? "main",
  token: process.env.DATA_REPO_TOKEN ?? "tu-token-de-acceso-personal-de-github",
};

export const USE_MOCK_DATA = !DATA_SOURCE.owner;

/**
 * URL de la API de contenido de GitHub para un archivo del repo de datos.
 * Solo debe llamarse desde código de servidor (ver client.ts, que ya
 * importa "server-only").
 */
export function githubContentApiUrl(path: string): string {
  const { owner, repo, branch } = DATA_SOURCE;
  return `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
}

/**
 * Headers de autenticación para la API de GitHub. El Accept en formato
 * "raw" hace que la API devuelva el archivo tal cual (bytes/JSON), sin
 * envolverlo en base64 como hace la respuesta por defecto de /contents.
 */
export function githubAuthHeaders(): HeadersInit {
  return {
    Authorization: `Bearer ${DATA_SOURCE.token}`,
    Accept: "application/vnd.github.raw+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

/**
 * Resuelve una ruta de asset (ej. "assets/projects/printcost/cover.webp")
 * declarada dentro de un JSON del repo de contenido.
 *
 * Como el repo es privado, el navegador no puede pedir la imagen
 * directamente (no puede mandar el token en un <img src>). Por eso esta
 * URL apunta a nuestra propia API route (/api/assets/...), que hace el
 * fetch autenticado en el servidor y reenvía la imagen.
 */
export function assetUrl(path?: string | null): string | undefined {
  if (!path) return undefined;
  return `/api/assets/${path.replace(/^\/+/, "")}`;
}
