/* Píxel de Meta para medir los anuncios.
   Se carga en todas las páginas. Muestra un aviso la primera vez; si la
   persona elige "No, gracias", no se vuelve a cargar en ese navegador.
   Con PIXEL_ID vacío no hace nada (ni aviso ni código de Meta).
   Al cambiar este archivo, subir el ?v= de las páginas: /assets se cachea 7 días. */
(function () {
  var PIXEL_ID = '2231648257694150';
  var KEY = 'sig_cookies';

  if (!PIXEL_ID) return;

  function get(k, store) { try { return (store || localStorage).getItem(k); } catch (_) { return null; } }
  function set(k, v, store) { try { (store || localStorage).setItem(k, v); } catch (_) {} }
  function del(k, store) { try { (store || localStorage).removeItem(k); } catch (_) {} }

  var choice = get(KEY);
  if (choice === 'no') return;

  /* Código base de Meta */
  !function (f, b, e, v, n, t, s) {
    if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
    if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
    t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
  }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  fbq('init', PIXEL_ID);
  fbq('track', 'PageView');

  /* Pedido de demo: el formulario marca la sesión antes de ir a /gracias/,
     así una visita directa a esa página no cuenta como pedido. */
  if (location.pathname.indexOf('/gracias') === 0 && get('sig_lead', sessionStorage)) {
    fbq('track', 'Lead', { content_name: 'Demo de SIG' });
    del('sig_lead', sessionStorage);
  }

  if (choice === 'ok') return;

  function banner() {
    var css = document.createElement('style');
    css.textContent =
      '.ck{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;max-width:560px;margin:0 auto;' +
      'background:#05070C;color:#F3F5F9;border-radius:14px;padding:16px 18px;font:15px/1.45 Inter,system-ui,sans-serif;' +
      'box-shadow:0 12px 40px rgba(5,7,12,.28);display:flex;gap:14px;align-items:center;flex-wrap:wrap}' +
      '.ck p{margin:0;flex:1 1 260px}.ck a{color:#A3ACBF;text-decoration:underline}' +
      '.ck div{display:flex;gap:8px}.ck button{font:inherit;font-weight:600;border:0;border-radius:999px;padding:9px 16px;cursor:pointer}' +
      '.ck .ok{background:#2457E6;color:#fff}.ck .no{background:transparent;color:#F3F5F9;box-shadow:inset 0 0 0 1px #4A5266}';
    document.head.appendChild(css);

    var el = document.createElement('div');
    el.className = 'ck';
    el.setAttribute('role', 'region');
    el.setAttribute('aria-label', 'Aviso de cookies');
    el.innerHTML =
      '<p>Usamos cookies de Meta para medir nuestros anuncios. <a href="/privacidad/">Más información</a>.</p>' +
      '<div><button type="button" class="no">No, gracias</button><button type="button" class="ok">Entendido</button></div>';
    document.body.appendChild(el);

    el.querySelector('.ok').onclick = function () { set(KEY, 'ok'); el.remove(); };
    el.querySelector('.no').onclick = function () {
      set(KEY, 'no');
      fbq('consent', 'revoke');
      el.remove();
    };
  }

  if (document.body) banner(); else document.addEventListener('DOMContentLoaded', banner);
})();
