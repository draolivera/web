// ============================================================
// Dra. Olivera — Estudio Jurídico
// ============================================================

// ---------- Menú mobile ----------
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ---------- Tabs de servicios ----------
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;

    tabButtons.forEach(b => {
      b.classList.remove('is-active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('is-active');
    btn.setAttribute('aria-selected', 'true');

    tabPanels.forEach(panel => {
      panel.classList.toggle('is-active', panel.dataset.panel === target);
    });
  });
});

// ---------- Texto que aparece al scrollear ----------
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ---------- Contacto directo por WhatsApp ----------
const WHATSAPP_NUMBER = '5491159532573'; // 1159532573 con código de país (54) y de celular (9)

const whatsappForm = document.getElementById('whatsapp-form');

whatsappForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const nombre = document.getElementById('wf-nombre').value.trim();
  const servicio = document.getElementById('wf-servicio').value;
  const detalle = document.getElementById('wf-detalle').value.trim();

  if (!nombre || !servicio) {
    whatsappForm.reportValidity();
    return;
  }

  let mensaje = `Hola, mi nombre es ${nombre}. Necesito asesoramiento en ${servicio.toLowerCase()}.`;
  if (detalle) {
    mensaje += ` ${detalle}`;
  }

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank', 'noopener');
});
