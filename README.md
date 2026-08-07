# Portafolio — Christopher A. Rajon Polanco

Portafolio profesional bilingüe (ES/EN), construido con Next.js y alimentado por un CMS headless propio.

**[Ver sitio en vivo](https://chrisdevrift.com/)** — reemplaza este link cuando esté desplegado.

---

## Stack

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript
- **Estilos:** Tailwind CSS v4
- **Animaciones:** Framer Motion
- **Iconos:** Lucide React
- **Tema claro/oscuro:** next-themes
- **Fuentes:** Geist Sans / Geist Mono
- **Despliegue:** Vercel

## Arquitectura

El proyecto usa una arquitectura de dos repos:

- **`portfolio-web`** (este repo): el frontend Next.js.
- **`portfolio-data`**: repo privado que funciona como CMS headless — todo el contenido (perfil, proyectos, experiencia, educación, skills, certificados) vive ahí como archivos JSON, versionado con git.

`portfolio-web` lee el contenido en tiempo de build/request vía la [API de contenido de GitHub](https://docs.github.com/en/rest/repos/contents), autenticado con un token de acceso de solo lectura. Como `portfolio-data` es privado, los assets (imágenes, PDFs) se sirven a través de una API route propia (`/api/assets/[...path]`) que hace de proxy autenticado — el token nunca se expone al navegador.

### Bilingüe (ES/EN)

El sitio completo está disponible en español e inglés:

- **Rutas:** cada página vive bajo `app/[lang]/...`, generadas estáticamente en build time para ambos idiomas (`generateStaticParams`).
- **Contenido:** `portfolio-data` tiene una carpeta `en/` en la raíz con los JSON traducidos. Si un archivo no existe todavía en inglés, el sitio hace fallback automático a la versión en español — ningún proyecto sin traducir rompe la página.
- **Textos de interfaz:** un diccionario propio (`src/dictionaries/`) traduce los textos fijos del código (labels, encabezados de sección, etc.), independiente del contenido de `portfolio-data`.
- **Switch de idioma:** junto al toggle de tema, cambia de idioma conservando la página exacta en la que estás.

### Modo mock

Para desarrollar sin depender del repo privado, el proyecto puede correr con datos de ejemplo locales (`src/data/mock`). Se activa automáticamente si no configuras las variables de entorno del repo de datos — ver [Variables de entorno](#variables-de-entorno).

## Estructura del proyecto

```text
src/
├── app/
│   ├── [lang]/                    # Rutas localizadas (es/en)
│   │   ├── layout.tsx             # Layout raíz (html, body, ThemeProvider)
│   │   ├── page.tsx               # Home
│   │   ├── not-found.tsx          # 404 para rutas existentes sin contenido
│   │   ├── proyectos/[slug]/      # Página de caso de estudio
│   │   └── trayectoria/           # Experiencia, educación, skills, certificados
│   ├── api/assets/[...path]/      # Proxy autenticado a assets de portfolio-data
│   └── global-not-found.tsx       # 404 para URLs sin ninguna ruta coincidente
├── components/
│   ├── layout/                    # Navbar, Footer
│   ├── sections/                  # Hero, About, Projects, HowIWork, Contact
│   ├── theme/                     # ThemeProvider, ThemeToggle, LanguageToggle
│   └── ui/                        # ProjectCard, Gallery, Reveal, etc.
├── dictionaries/                  # Textos de interfaz por idioma
├── lib/data/                      # Cliente de datos (client.ts, config.ts)
├── types/                         # Tipos que reflejan los schemas de portfolio-data
└── data/mock/                     # Datos de ejemplo para desarrollo sin repo privado
```

## Empezar

```bash
npm install
cp .env.local.example .env.local   # completa las variables si vas a usar el repo real
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) — redirige automáticamente a `/es`.

## Variables de entorno

| Variable | Descripción | Requerida |
|---|---|---|
| `DATA_REPO_OWNER` | Usuario de GitHub dueño de `portfolio-data` | Solo para usar el repo real (si no se define, corre en modo mock) |
| `DATA_REPO_NAME` | Nombre del repo de datos | No (default: `portfolio-data`) |
| `DATA_REPO_BRANCH` | Rama a leer | No (default: `main`) |
| `DATA_REPO_TOKEN` | Fine-grained PAT de GitHub con permiso `Contents: Read-only` sobre `portfolio-data` | Solo para usar el repo real |

Sin `DATA_REPO_OWNER` configurado, el sitio usa automáticamente los JSON de ejemplo en `src/data/mock`.

## Scripts

```bash
npm run dev      # servidor de desarrollo (Turbopack)
npm run build    # build de producción
npm run start    # sirve el build de producción
npm run lint     # linting
```

## Despliegue

Desplegado en Vercel. Las variables de entorno de la tabla anterior deben configurarse en el dashboard del proyecto en Vercel para que el sitio lea del repo `portfolio-data` real en producción.

## Licencia

Código de uso personal — no licenciado para reutilización sin permiso.
