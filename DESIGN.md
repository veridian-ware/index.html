# Design

Sistema visual de veridian-ware.com (landing + blog + /demo + /gracias). Sitio estático; los tokens viven como CSS custom properties en `index.html` (inline) y `assets/blog.css`.

## Theme

Claro, "enterprise B2B": fondo blanco, nav flotante en píldora, bandas de gradiente vibrantes (derivadas del lima de marca) que enmarcan capturas y video del producto. Referencia de lenguaje: Microsoft Fluent/Dynamics — denso en información pero ordenado, jerarquía clara, detalle pulido.

## Color

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#ffffff` | Fondo del body |
| `--band` | `#f5f5f4` | Bandas de sección alternadas |
| `--card` | `#ffffff` | Tarjetas y superficies |
| `--border` | `#e6e6e6` | Hairlines |
| `--border-strong` | `#d1d1d1` | Bordes de controles |
| `--ink` | `#161616` | Texto principal, casi negro |
| `--muted` | `#4f4f4f` | Texto secundario (≥4.5:1 sobre blanco) |
| `--blue` | `#0f52a2` | Acción primaria: botones, links, indicadores. Único color de acción |
| `--blue-dark` | `#0c4283` | Hover del accent |
| `--link` | `#0e62ad` | Links de texto |
| `--grad` | `linear-gradient(105deg, #cdee58 0%, #f6d75a 48%, #ffb45e 100%)` | Banda de gradiente — firma visual, derivada del lima del logo. Solo enmarca capturas/video del producto, nunca fondo de texto ni botones |

El punto del logo ("VERIDIAN.") sigue en lima `#c8f542`, intocable.

## Typography

- **UI/cuerpo/títulos:** `'Segoe UI Variable Text', 'Segoe UI', system-ui` — sin webfonts extra, carga instantánea.
- **Logo:** Bebas Neue, "VERIDIAN." con punto lima. No se cambia.
- Títulos `font-weight: 600`, sentence case (nunca MAYÚSCULAS ni Title Case), `letter-spacing: -0.01em`, `text-wrap: balance`.

## Components

- **Nav flotante en píldora**: fixed, despegada del borde, blanca, sombra que crece al hacer scroll. Logo izquierda, links centro, botón primario azul derecha.
- **Banda de gradiente + shot-card**: tarjeta blanca redondeada con sombra flotante y barra de ventana (3 puntos, el primero azul) que enmarca capturas o video del ERP.
- **Acordeón lista/detalle** (módulos): `<details>` con captura sticky que cambia según el ítem abierto.
- **Showcase de video**: tabs pill + `<video>` con doble fuente (webm/mp4) + player mínimo.
- **Botones**: primario azul, radio grande, sombra que florece al hover; secundario borde hairline.

## Motion

- Easing `cubic-bezier(0.33, 0, 0.1, 1)`. Reveals cortos (14px) con fallback: todo visible a los 1.6s si el observer no dispara.
- `prefers-reduced-motion`: todo instantáneo, videos sin autoplay.

## Layout

- Contenedor 1160px, padding lateral 32/20px.
- Ritmo por bandas: bg → band → bg → band → bg (seguridad, oscura) → bg → band → bg.

## Nota de posicionamiento

El copy sigue el reposicionamiento vigente de la marca: "plataforma de gestión empresarial" (no "PyMEs argentinas"), sin acotar el alcance geográfico de la audiencia en los textos de marca. Buenos Aires solo aparece como ubicación de la empresa (footer, JSON-LD), no como límite del público objetivo.
