/* PADELIT — wireframe interactions */
(() => {
  const $  = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => [...ctx.querySelectorAll(s)];

  /* ---------- Mega Menu (desktop, click + hover) ---------- */
  $$('.nav__item').forEach(item => {
    const link = item.querySelector('.nav__link');
    if (!link || !item.querySelector('.mega')) return;
    const open  = () => { closeAllMegas(item); item.classList.add('is-open'); link.setAttribute('aria-expanded', 'true'); };
    const close = () => { item.classList.remove('is-open'); link.setAttribute('aria-expanded', 'false'); };
    item.addEventListener('mouseenter', open);
    item.addEventListener('mouseleave', close);
    link.addEventListener('click', e => {
      e.preventDefault();
      item.classList.contains('is-open') ? close() : open();
    });
  });
  function closeAllMegas(except) {
    $$('.nav__item.is-open').forEach(el => {
      if (el !== except) { el.classList.remove('is-open'); el.querySelector('.nav__link')?.setAttribute('aria-expanded', 'false'); }
    });
  }
  document.addEventListener('click', e => {
    if (!e.target.closest('.nav__item')) closeAllMegas();
  });

  /* ---------- Drawers (generic open/close) ---------- */
  const scrim = $('#scrim');
  function openDrawer(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add('is-open');
    scrim?.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawers() {
    $$('.drawer.is-open').forEach(d => d.classList.remove('is-open'));
    scrim?.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  $$('[data-open-drawer]').forEach(b => b.addEventListener('click', e => { e.preventDefault(); openDrawer(b.dataset.openDrawer); }));
  $$('[data-close-drawer]').forEach(b => b.addEventListener('click', closeDrawers));
  scrim?.addEventListener('click', closeDrawers);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawers(); });

  /* ---------- Qty steppers ---------- */
  document.addEventListener('click', e => {
    const inc = e.target.closest('[data-qty="+"]');
    const dec = e.target.closest('[data-qty="-"]');
    if (!inc && !dec) return;
    const wrap = (inc || dec).closest('.qty');
    const input = wrap?.querySelector('input');
    if (!input) return;
    let v = parseInt(input.value || '1', 10);
    v += inc ? 1 : -1;
    if (v < 1) v = 1;
    input.value = v;
    input.dispatchEvent(new Event('change', { bubbles: true }));
  });

  /* ---------- PDP option pickers ---------- */
  $$('.opt-row, .opt-color').forEach(group => {
    group.addEventListener('click', e => {
      const btn = e.target.closest('button');
      if (!btn) return;
      group.querySelectorAll('button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const label = group.previousElementSibling?.querySelector('b');
      if (label && btn.dataset.label) label.textContent = btn.dataset.label;
    });
  });

  /* ---------- PDP gallery thumbs ---------- */
  const galMain = $('.gallery__main img');
  $$('.thumbs button').forEach(b => {
    b.addEventListener('click', () => {
      $$('.thumbs button').forEach(t => t.classList.remove('active'));
      b.classList.add('active');
      if (galMain && b.dataset.src) galMain.src = b.dataset.src;
    });
  });

  /* ---------- Tabs ---------- */
  $$('.tabs').forEach(tabs => {
    tabs.addEventListener('click', e => {
      const btn = e.target.closest('.tabs__head button');
      if (!btn) return;
      tabs.querySelectorAll('.tabs__head button').forEach(b => b.classList.remove('active'));
      tabs.querySelectorAll('.tabs__panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      tabs.querySelector(`#${btn.dataset.panel}`)?.classList.add('active');
    });
  });

  /* ---------- Sticky ATC (PDP) ---------- */
  const stickyAtc = $('.sticky-atc');
  const atcTrigger = $('.pdp__actions');
  if (stickyAtc && atcTrigger && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(([entry]) => {
      stickyAtc.classList.toggle('is-visible', !entry.isIntersecting);
    }, { threshold: 0 });
    io.observe(atcTrigger);
  }

  /* ---------- Filter chips remove (collection) ---------- */
  document.addEventListener('click', e => {
    const x = e.target.closest('.chip button');
    if (x) x.closest('.chip').remove();
  });

  /* ---------- Mobile filter drawer (collection) ---------- */
  const filters = $('#filters');
  const openFilters = () => {
    if (!filters) return;
    filters.classList.add('is-open');
    scrim?.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };
  const closeFilters = () => {
    filters?.classList.remove('is-open');
    if (!$$('.drawer.is-open').length) {
      scrim?.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  };
  $$('[data-open-filters]').forEach(b => b.addEventListener('click', openFilters));
  $$('[data-close-filters]').forEach(b => b.addEventListener('click', closeFilters));
  // Reuse global scrim click handler — already calls closeDrawers, also close filters
  scrim?.addEventListener('click', closeFilters);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeFilters(); });

  /* ---------- Wishlist toggle ---------- */
  document.addEventListener('click', e => {
    const w = e.target.closest('.pcard__wish');
    if (!w) return;
    w.classList.toggle('is-on');
    const svg = w.querySelector('svg');
    if (svg) svg.style.fill = w.classList.contains('is-on') ? 'currentColor' : 'none';
  });

  /* ---------- Search demo (collection) ---------- */
  const search = $('#searchInput');
  if (search) search.addEventListener('input', e => {
    const v = e.target.value.toLowerCase();
    $$('.search-suggest [data-keyword]').forEach(el => {
      el.style.opacity = el.dataset.keyword.toLowerCase().includes(v) || v === '' ? '1' : '.35';
    });
  });
})();
