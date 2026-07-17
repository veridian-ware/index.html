// POST /api/demo — recibe el formulario de solicitud de demo y lo envía por
// email a la casilla de contacto vía SMTP (Zoho). Config por variables de
// entorno en Vercel:
//   SMTP_HOST  (smtp.zoho.com)
//   SMTP_PORT  (465)
//   SMTP_USER  (contacto@veridian-erp.com.ar)
//   SMTP_PASS  (app password de Zoho — NO la contraseña de la cuenta)
//   DEMO_TO    (opcional; destino, default SMTP_USER)
// Acepta JSON (fetch del form) y application/x-www-form-urlencoded (sin JS,
// en cuyo caso redirige a /gracias/).

const nodemailer = require('nodemailer');

const MAX = { nombre: 120, email: 160, empresa: 160, telefono: 40, mensaje: 2000 };

function clean(value, max) {
  return String(value ?? '').trim().slice(0, max);
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const body = req.body || {};
  const isForm = (req.headers['content-type'] || '').includes('form-urlencoded');

  // honeypot: los bots completan el campo oculto; respondemos como si nada
  if (body.website) {
    return isForm ? redirect(res) : res.status(200).json({ ok: true });
  }

  const data = {
    nombre: clean(body.nombre, MAX.nombre),
    email: clean(body.email, MAX.email),
    empresa: clean(body.empresa, MAX.empresa),
    telefono: clean(body.telefono, MAX.telefono),
    mensaje: clean(body.mensaje, MAX.mensaje),
  };

  if (!data.nombre || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return res.status(400).json({ error: 'Completá tu nombre y un email válido.' });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, DEMO_TO, DEMO_DRY_RUN } = process.env;

  if (!DEMO_DRY_RUN) {
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
      console.error('demo: faltan variables SMTP_* en el entorno');
      return res.status(500).json({ error: 'El formulario no está disponible en este momento. Escribinos a contacto@veridian-erp.com.ar.' });
    }
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT || 465),
      secure: Number(SMTP_PORT || 465) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
    try {
      await transporter.sendMail({
        from: `"Veridian Web" <${SMTP_USER}>`,
        to: DEMO_TO || SMTP_USER,
        replyTo: `"${data.nombre}" <${data.email}>`,
        subject: `Solicitud de demo — ${data.nombre}${data.empresa ? ` (${data.empresa})` : ''}`,
        text: [
          `Nombre:   ${data.nombre}`,
          `Email:    ${data.email}`,
          `Empresa:  ${data.empresa || '—'}`,
          `Teléfono: ${data.telefono || '—'}`,
          '',
          'Mensaje:',
          data.mensaje || '—',
          '',
          `Enviado desde veridian-ware.com/demo/ · ${new Date().toISOString()}`,
        ].join('\n'),
      });
    } catch (err) {
      console.error('demo: fallo el envío SMTP', err?.message);
      return res.status(502).json({ error: 'No pudimos registrar tu solicitud. Escribinos a contacto@veridian-erp.com.ar.' });
    }
  }

  return isForm ? redirect(res) : res.status(200).json({ ok: true });
};

function redirect(res) {
  res.statusCode = 303;
  res.setHeader('Location', '/gracias/');
  return res.end();
}
