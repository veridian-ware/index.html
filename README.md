<div align="center">
  <img src="./assets/logo-transparent.svg" alt="Veridian ERP" width="400"/>

  **Plataforma de gestión empresarial.**

  Sitio oficial de [Veridian ERP](https://veridian-ware.com/) — ERP on-premise con facturación electrónica AFIP.

  [🌐 Sitio en vivo](https://veridian-ware.com/) · [📧 Contacto](mailto:contacto@veridian-erp.com.ar)
</div>

---

## Sobre el proyecto

Sitio de presentación de **Veridian ERP**, el único producto de la marca: una plataforma de gestión empresarial on-premise con facturación electrónica AFIP (WSFEv1), ventas, stock, compras, producción, contabilidad, RRHH y mantenimiento.

Incluye un [blog estático](./blog/README.md) con guías SEO sobre ERP, facturación AFIP y gestión.

## Stack

Sitio estático, sin build step.

- HTML5 + CSS3 (variables, grid, animaciones nativas)
- JavaScript vanilla (cursor personalizado, scroll reveal, nav sticky)
- Fuentes: [Bebas Neue](https://fonts.google.com/specimen/Bebas+Neue) · [DM Serif Display](https://fonts.google.com/specimen/DM+Serif+Display) · [DM Sans](https://fonts.google.com/specimen/DM+Sans)

## Desarrollo local

```bash
git clone https://github.com/veridian-ware/index.html.git
cd index.html
# abrí index.html en el navegador o serví con cualquier HTTP server:
npx serve .
```

## Deploy

Desplegado en **Vercel** con auto-deploy desde `main`. Cada push actualiza el sitio en producción automáticamente.

## Formulario de demo (propio, sin Tally)

`/demo/` es un form propio que postea a la Vercel Function `api/demo.js`, que envía cada solicitud por email vía SMTP (Zoho) y redirige a `/gracias/`. Anti-spam por honeypot. Sin JS funciona igual (POST clásico + redirect 303).

Variables de entorno requeridas en Vercel (Settings → Environment Variables):

| Variable | Valor |
|---|---|
| `SMTP_HOST` | `smtp.zoho.com` |
| `SMTP_PORT` | `465` |
| `SMTP_USER` | `contacto@veridian-erp.com.ar` |
| `SMTP_PASS` | App password de Zoho (Zoho Mail → Security → App Passwords) |
| `DEMO_TO` | (opcional) casilla destino si no es la misma que `SMTP_USER` |

Sin estas variables la función responde 500 con un mensaje que sugiere escribir por email — el sitio no se rompe, pero configuralas antes de promocionar el form.

## Estructura

```
.
├── index.html              # Landing completa (HTML + CSS + JS inline)
├── demo/                   # Formulario de solicitud de demo
├── api/demo.js             # Vercel Function: envía la solicitud por email
├── blog/                   # Blog estático (índice + artículos)
├── gracias/                # Página post-envío del formulario (noindex)
├── assets/                 # Imágenes, capturas y videos del ERP, blog.css
├── sitemap.xml
└── robots.txt
```

## Identidad visual

- **Negro:** `#0a0a0a`
- **Lima (acento):** `#c8f542`
- **Teal (acento 2):** `#42f5c8`
- **Texto:** `#f0ede6`

---

<div align="center">
  © 2026 Veridian · Buenos Aires, Argentina 🇦🇷
</div>
