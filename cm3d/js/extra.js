document.documentElement.classList.add('js');

// Barra de progresso de leitura
const bar = document.createElement('div');
bar.className = 'progress';
bar.setAttribute('aria-hidden', 'true');
document.body.prepend(bar);
const update = () => {
  const h = document.documentElement;
  const max = h.scrollHeight - h.clientHeight;
  bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
};
addEventListener('scroll', update, { passive: true });
update();

// Entrada suave dos blocos
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries, obs) => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
  }), { threshold: 0.12 });
  document.querySelectorAll('section > *, .stat').forEach(el => { el.classList.add('reveal'); io.observe(el); });
}

// Comparador real vs. CAD
document.querySelectorAll('[data-compare]').forEach(box => {
  const range = box.querySelector('input');
  range.addEventListener('input', () => box.style.setProperty('--pos', range.value + '%'));
});

// Filtros da galeria
const chips = document.querySelectorAll('.chip');
chips.forEach(btn => btn.addEventListener('click', () => {
  chips.forEach(c => { c.classList.toggle('on', c === btn); c.setAttribute('aria-pressed', c === btn); });
  document.querySelectorAll('[data-g]').forEach(f => { f.hidden = !(btn.dataset.f === 'all' || f.dataset.g === btn.dataset.f); });
}));
