# Design

Sistema visual de veridian-ware.com (landing + blog + /gracias). Sitio estático; los tokens viven como CSS custom properties en `index.html` (inline) y `assets/blog.css`.

## Theme

Claro, "tech premium": precisión tipo Stripe sobre paleta clara con el verde viridian como color de marca. El producto (UI oscura del ERP) aparece en video/capturas y aporta el contraste.

## Color

| Token | Valor | Uso |
|---|---|---|
| `--paper` | `#f9faf8` | Fondo del body (off-white con tinte verde, hue de marca) |
| `--surface` | `#eff2ee` | Bandas de sección alternadas |
| `--card` | `#ffffff` | Tarjetas y superficies elevadas |
| `--border` | `#e2e6e0` | Hairlines y bordes |
| `--border-strong` | `#c9d0c8` | Bordes de controles |
| `--ink` | `#17211c` | Texto principal |
| `--muted` | `#55605a` | Texto secundario (≥4.5:1 sobre paper) |
| `--accent` | `#0e6f56` | Verde viridian: botones, links, marca |
| `--accent-dark` | `#0a523f` | Hover del accent |
| `--teal` | `#0d9488` | Solo atmósferas de gradiente, nunca texto |
| `--lime` | `#c8f542` | Punto del logo. Intocable, no usar para otra cosa |

Sección oscura (Seguridad) usa `--ink` como fondo con texto `#a9b8b0`/blanco y acento `#7fd6ba`.

## Typography

- **Display:** Fraunces (560/640, itálica para el énfasis de una palabra por título). Committed: la marca ya la adoptó; no reemplazar por reflejo.
- **Cuerpo/UI:** Instrument Sans 400/500/600.
- **Logo:** Bebas Neue, "VERIDIAN." con punto lima. No se cambia.
- `text-wrap: balance` en títulos; énfasis con itálica + accent, nunca gradient text.

## Components

- **Window frame:** barra con 3 puntos (primero verde) + título; contiene video o captura del ERP. Sombra en capas tintada de ink.
- **Demo player (estilo Odoo):** tabs pill por módulo + `<video>` autoplay/muted/loop + control mínimo (pausa + barra de progreso fina).
- **Botones:** primario verde con sombra que florece al hover; secundario borde hairline sobre card.
- **Módulos:** grilla con jerarquía — Facturación AFIP como tarjeta destacada, el resto estándar. Sin números decorativos.
- **Pasos de implementación:** numerados 01-03 (secuencia real, permitido).

## Motion

- Easing `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out). Reveals cortos (16px) con fallback: todo visible a los 1.6s aunque el observer no dispare.
- Micro-interacciones en hover (lift 2px + sombra), transiciones 0.2-0.3s.
- `prefers-reduced-motion`: todo instantáneo, videos sin autoplay.

## Layout

- Contenedor 1160px, padding lateral 32/20px.
- Ritmo por bandas: paper → surface → paper → ink (seguridad) → paper → surface (FAQ) → paper.
- Sin eyebrows repetidos por sección: los títulos cargan la jerarquía solos.
