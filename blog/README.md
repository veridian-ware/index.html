# Blog de Veridian

Blog estático, sin build step. Cada artículo es una carpeta con un `index.html`, lo que da URLs limpias (`/blog/<slug>/`) y buen SEO (cada artículo es una página real, rastreable, con su propio título, meta y JSON-LD).

```
blog/
├── index.html                       # Índice (lista de artículos)
├── erp-on-premise-vs-nube-pyme/
│   └── index.html                   # Artículo de ejemplo
└── README.md                        # Esta guía
```

Los estilos compartidos están en `/assets/blog.css`.

## Cómo agregar un artículo nuevo

1. **Crear la carpeta** del artículo con un slug en minúsculas y guiones (con keywords):
   `blog/como-emitir-factura-afip/index.html`

2. **Copiar** `blog/erp-on-premise-vs-nube-pyme/index.html` como base y editar:
   - `<title>` y `<meta name="description">` (apuntá a lo que la gente busca; título ≤ ~60 caracteres).
   - `<link rel="canonical">`, `og:url` y `mainEntityOfPage` → la URL nueva (`https://veridian-ware.com/blog/<slug>/`).
   - El bloque JSON-LD: `headline`, `description`, `datePublished`, `dateModified`.
   - El `<h1>`, la fecha/“min de lectura” y el contenido dentro de `.prose`.

3. **Sumar la tarjeta** en `blog/index.html` (copiá un `<a class="post-card">` y apuntá el `href` a `/blog/<slug>/`).

4. **Agregar la URL** al `sitemap.xml` de la raíz (otro bloque `<url>` con la fecha en `<lastmod>`).

5. Commit + push a `main` → Vercel lo publica solo.

## Buenas prácticas SEO

- Un solo `<h1>` por artículo; subtítulos con `<h2>`/`<h3>`.
- Enlazá internamente: del artículo al sitio (`/#showcase`) y, cuando tengas varios, entre artículos relacionados.
- No inventar fechas ni datos en el JSON-LD.
- Después de publicar, en Google Search Console: **Inspección de URL → Solicitar indexación**.
