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

Tipografía: **Archivo ancha** (`font-stretch: 115%`) en los títulos e **Inter** en el texto, las dos servidas desde `/assets/fonts`. Cinco tamaños: display, heading, lead, body (17px) y small (15px).

## Portada (rediseño del 2026-10-27)

Reemplaza a la dirección "split stage" en `index.html`; el blog, /demo, /gracias y 404 siguen con `assets/blog.css`.

- **Solo dos pantallas del sistema** (decisión del dueño, 2026-11-04): Dashboard y Producción, debajo del recorrido, en `assets/sig/` (WebP 900 y 1600 px, sacadas de la demo). Nada más de interfaz: el resto se cuenta con texto, circuitos y datos verificables.
- **Inicio:** video de una línea de montaje (Pexels 32386521, licencia libre) a pantalla completa, con velo noche + tinte azul. Al bajar se apaga, se aleja y sube más lento. Versiones en `assets/hero/`: 1440p VP9 (pantallas ≥1600px), 1080p H.264, 720p para celular, loop sin corte a media velocidad. Corre solo mientras se ve.
- **Sin botones en el inicio ni en la barra.** En celular y tableta, un ícono de auricular (sin círculo) abre el panel de Asistencia con "Pedir una demo" y el mail. El único botón de demo de la página está en el cierre.
- **Animaciones sutiles:** título palabra por palabra, cinta de módulos, panel del recorrido con un punto que recorre el circuito, título del área activa que crece, luz que sigue al mouse en las tarjetas, números que cuentan, línea de implementación que se dibuja, preguntas desplegables. Todo se apaga con `prefers-reduced-motion`.
- Los mails no llevan subrayado (`.mail-link`).

## Slop Score (antiwebslop.com)

El 2026-11-04 marcaba 20 %: letra de siempre, halo de luz, franja de color en las tarjetas y sin imágenes del producto. Por eso no hay halos (`.glow`) ni luz que sigue al mouse en el inicio, el recorrido destaca el área activa con el tamaño del título (sin franja al costado) y los títulos van en Archivo.

## Archivos

- `index.html`: portada, con estilos y script propios.
- `assets/blog.css`: estilos compartidos por el blog, /demo, /gracias y 404.
- Para revisar una página: `node ~/.claude/skills/taste-skill/scripts/inspect.mjs <archivo>` (las páginas de texto se revisan con `--allow few-pictures,no-footage,still-page`).
