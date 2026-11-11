// ===== Pengaturan nomor WhatsApp (ganti dengan nomor asli, format 62xxx) =====
const WA_NUMBER = '6281919122406';

// Mobile menu
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

// Hero slider
const slides = document.querySelectorAll('.slide');
const dotsWrap = document.querySelector('.dots');
let current = 0, timer;
slides.forEach((_, i) => {
  const b = document.createElement('button');
  b.setAttribute('aria-label', 'Slide ' + (i + 1));
  b.addEventListener('click', () => go(i));
  dotsWrap.appendChild(b);
});
const dots = dotsWrap.querySelectorAll('button');
function go(i) {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = (i + slides.length) % slides.length;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
  clearInterval(timer);
  timer = setInterval(() => go(current + 1), 6000);
}
document.querySelector('.prev').addEventListener('click', () => go(current - 1));
document.querySelector('.next').addEventListener('click', () => go(current + 1));
go(0);

// Portfolio filter
document.querySelectorAll('.filters button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.filters .active').classList.remove('active');
    btn.classList.add('active');
    const f = btn.dataset.filter;
    document.querySelectorAll('.pf-card').forEach(c => {
      c.classList.toggle('hide', f !== 'all' && c.dataset.cat !== f);
    });
  });
});

// Counter
const counters = document.querySelectorAll('[data-count]');
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, target = +el.dataset.count;
    const start = performance.now(), dur = 1600;
    const tick = now => {
      const p = Math.min((now - start) / dur, 1);
      el.textContent = Math.floor(target * (1 - Math.pow(1 - p, 3))).toLocaleString('id-ID');
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    counterObs.unobserve(el);
  });
}, { threshold: .5 });
counters.forEach(c => counterObs.observe(c));

// Reveal on scroll
const revealEls = document.querySelectorAll('.service-card, .step, .price-card, .pf-card, .testi, .faq details, .stat, .why-item');
revealEls.forEach(el => el.classList.add('reveal'));
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); revealObs.unobserve(e.target); } });
}, { threshold: .12 });
revealEls.forEach(el => revealObs.observe(el));

// Active nav on scroll + back to top
const sections = document.querySelectorAll('section[id]');
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  const y = window.scrollY + 120;
  sections.forEach(s => {
    if (y >= s.offsetTop && y < s.offsetTop + s.offsetHeight) {
      nav.querySelectorAll('a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + s.id));
    }
  });
  toTop.classList.toggle('show', window.scrollY > 500);
});
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Contact form -> WhatsApp
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const d = new FormData(e.target);
  const msg =
    `Halo DigitalDoc, saya ingin minta penawaran.\n\n` +
    `Nama: ${d.get('nama')}\nNo. WA: ${d.get('hp')}\nLayanan: ${d.get('layanan')}\n` +
    `Lokasi: ${d.get('lokasi') || '-'}\nPesan: ${d.get('pesan') || '-'}`;
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
});

document.getElementById('year').textContent = new Date().getFullYear();
