# Design

Sistema visual de veridian-ware.com (portada, blog, /demo, /gracias y 404). Rediseño del 2026-10-23 con Taste Skill (dirección "split stage", semilla 1330458001); reemplaza el lenguaje Microsoft Fluent anterior.

## Marca

Se presenta **SIG**, no Veridian (Veridian aparece en el pie). Mismos colores y letra que los videos de SIG.

| Token | Valor | Uso |
|---|---|---|
| `--paper` | `#F3F5F9` | Fondo |
| `--paper-2` | `#E4E9F2` | Un escalón de tono: hoja del encabezado, formulario, índice de la guía |
| `--night` / `--ink` | `#05070C` | Texto y campos oscuros (escenario, cierre, pie) |
| `--soft` | `#4A5266` | Notas secundarias |
| `--accent` | `#2457E6` | Único color de acción (botones, subrayados) |

Tipografía: **Inter** (Google Fonts), una sola familia. Cinco tamaños: display, heading, lead, body (18px) y small (15px).

## Reglas de la casa (las mide `inspect.mjs` de Taste Skill)

Títulos de dos líneas como máximo; sin etiquetas sobre los títulos; sin sombras, degradados, líneas finas ni tarjetas con íconos; botones rectos; márgenes iguales a los dos lados; las pantallas de SIG son grabaciones o capturas reales, y los fragmentos de interfaz armados en HTML llevan `data-ui`.

## Archivos

- `index.html`: portada, con estilos y script propios.
- `assets/blog.css`: estilos compartidos por el blog, /demo, /gracias y 404.
- Para revisar una página: `node ~/.claude/skills/taste-skill/scripts/inspect.mjs <archivo>` (las páginas de texto se revisan con `--allow few-pictures,no-footage,still-page`).
