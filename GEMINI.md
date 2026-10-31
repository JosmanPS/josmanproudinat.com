# Josman Proudinat Blog (`josman-blog-markdown`)

Blog personal y plataforma de enseñanzas/predicaciones de **Josman Proudinat** (`www.josmanproudinat.com`), construido con **Next.js** (Pages Router), **TypeScript**, **Tailwind CSS** y **MDX**.

---

## Stack Tecnológico

- **Framework:** Next.js (Pages Router, generación estática `SSG` y rutas `SSR` puntuales)
- **Lenguaje:** TypeScript (`strict: true`, React 17)
- **Estilos:** Tailwind CSS v3 (`@tailwindcss/typography`, `@tailwindcss/forms`) + Modo Oscuro (`next-themes` con `attribute="class"`)
- **Contenido:** Obtenido dinámicamente del feed RSS de Substack (`https://josmanproudinat.substack.com/feed`) en `lib/api.ts` con Incremental Static Regeneration (`ISR`, `revalidate: 3600`).
- **SEO & Analítica:** `next-seo`, `sitemap.xml` dinámico, `robots.txt` dinámico y Google Analytics (`NEXT_PUBLIC_GOOGLE_ANALYTICS`)
- **Integraciones:**
  - **Formspree** (`@formspree/react`) para el formulario de contacto.
  - **Substack** (`SubstackCustomForm`) para suscripción al boletín.
  - **Obsidian Publish** reescrito bajo `/notas/*` mediante `vercel.json`.

---

## Comandos de Desarrollo

```bash
npm run dev        # Inicia el servidor de desarrollo en http://localhost:3000
npm run build      # Compila la aplicación para producción
npm run start      # Inicia el servidor de producción de Next.js
npm run typecheck  # Ejecuta verificación de tipos con TypeScript (tsc)
```

---

## Estructura del Proyecto

```text
├── _posts/                 # Artículos del blog en formato MDX (.mdx)
├── @types/                 # Declaraciones de tipos adicionales (ej. remark-html)
├── components/             # Componentes de interfaz y bloques personalizados MDX
│   ├── Books/              # Banners promocionales de libros (ej. Misión Posible)
│   ├── Button/             # Variantes de botones reutilizables
│   ├── Callout/            # Bloque destacado para citas bíblicas o notas en MDX
│   ├── Categories/         # Etiquetas (Tag) y elementos de lista de categorías
│   ├── ContactForm/        # Formulario de contacto conectado con Formspree
│   ├── DarkModeSwitch/     # Interruptor de tema claro/oscuro
│   ├── Intro/              # Hero principal de la página de inicio
│   ├── mdx-components/     # Mapeo de componentes disponibles dentro de archivos MDX
│   ├── PostImageHeader/    # Cabecera visual con imagen de portada difuminada
│   ├── Posts/              # Utilidades de posts (ej. cálculo de ReadingTime)
│   ├── SubstackCustomForm/ # Widget embebido de suscripción a Substack
│   ├── TweetEmbed/         # Componente para incrustar tweets en MDX
│   └── YoutubeEmbed/       # Componente para incrustar videos de YouTube en MDX
├── hooks/                  # Custom hooks (useCurrentTheme, useOpenGraphImage)
├── lib/                    # Lógica de acceso a datos y configuración
│   ├── api.ts              # Consumo del feed RSS de Substack y obtención de posts
│   ├── youtube.ts          # Obtención de predicaciones desde playlist de YouTube
│   ├── config.ts           # Dominio, puerto y construcción de URLs absolutas
│   ├── constants.ts        # Constantes globales y OG image por defecto
│   └── markdownToHtml.ts   # Conversión auxiliar con remark / remark-html
├── pages/                  # Rutas de Next.js (Pages Router)
│   ├── index.tsx           # Inicio: Intro, banner de libro, HeroPost y MoreStories
│   ├── predicaciones/      # Listado y reproductor de predicaciones de YouTube (/predicaciones)
│   ├── categorias/         # Índice de categorías (/categorias) y vista por categoría (/categorias/[slug])
│   ├── contacto/           # Página de contacto (/contacto)
│   ├── posts/              # Listado (/posts), artículo (/posts/[slug]), redirección (/posts/ultimo) y vista OG
│   ├── robots.txt.tsx      # Generación SSR de robots.txt según VERCEL_ENV
│   └── sitemap.xml.tsx     # Generación SSR del mapa del sitio XML
├── public/                 # Recursos estáticos (imágenes de posts, autores, favicons)
├── styles/                 # Estilos globales (styles/index.css) y utilidades Tailwind
├── types/                  # Definiciones TypeScript principales (PostType, Category, Author)
└── vercel.json             # Rewrites de Vercel (/notas -> Obsidian Publish)
```

---

## Arquitectura de Contenido (MDX)

### 1. Creación de un nuevo Post
Los artículos se almacenan en el directorio `_posts/` con extensión `.mdx`. El nombre del archivo determina el `slug` de la URL (`/posts/<nombre-del-archivo>`).

Cada archivo `.mdx` requiere el siguiente **frontmatter**:

```yaml
---
title: 'Título del artículo'
excerpt: 'Resumen breve para tarjetas de vista previa y meta description.'
coverImage: 'https://images.unsplash.com/... o ruta en /img/...'
date: 'YYYY-MM-DD'
tags: 'Categoría 1, Categoría 2'
author:
  name: Josman Proudinat
  picture: '/assets/blog/authors/josman.png'
ogImage:
  url: 'https://images.unsplash.com/... o ruta en /img/...'
---
```

> **Nota sobre `tags`:** `lib/api.ts` separa el campo `tags` por comas (`post.tags.trim().split(',')`) y genera el `slug` de cada categoría con `slugify(key, { trim: true, lower: true })`. Asegúrate de mantener consistencia en mayúsculas, acentos y espacios al reutilizar categorías.

### 2. Componentes disponibles en MDX
Configurados en `components/mdx-components/index.tsx` e inyectados en `components/post-body.tsx`:
- `<img>`: Renderiza automáticamente con `next/image` (`layout="responsive"`, `quality={100}`).
- `<Callout>`: Caja resaltada para pasajes bíblicos o notas importantes.
- `<YoutubeEmbed embedId="..." />`: Reproductor responsivo de YouTube.
- `<TweetEmbed tweetId="..." />`: Incrustación de tweets mediante `react-tweet-embed`.

### 3. Imágenes Externas
Si se utilizan imágenes externas en `next/image` (como `coverImage` u `ogImage`), el dominio debe estar autorizado en `next.config.js` (actualmente `images.unsplash.com` e `images.pexels.com`), o bien alojarse localmente dentro de `public/img/`.

---

## Convenciones y Consideraciones Clave

1. **Estilos y Modo Oscuro:**
   - Se utiliza la clase `dark` en el elemento raíz gestionada por `next-themes`.
   - Al añadir estilos o componentes, incluir variantes `dark:*` (por ejemplo, `dark:bg-neutral-800`, `dark:prose-invert`).
   - Las clases de botones globales `.btn-primary` y `.btn-primary-outline` están definidas en `styles/index.css`.
2. **Rutas Especiales:**
   - `/posts/ultimo` (`pages/posts/ultimo.tsx`): Redirige del lado del servidor (`getServerSideProps`) al artículo más reciente según la fecha.
   - `/notas` y `/notas/:path*`: Redirigidos de forma transparente vía `vercel.json` hacia `publish.obsidian.md`.
3. **Variables de Entorno:**
   - `NEXT_PUBLIC_GOOGLE_ANALYTICS`: ID de medición de Google Analytics cargada en `pages/_document.tsx`.
   - `VERCEL_ENV`: Utilizada en `pages/robots.txt.tsx` para permitir la indexación únicamente en `production`.
