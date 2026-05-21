/* ============================================================
   WildJourney — app.js
   All site logic: routing, rendering, admin, AI, security
   ============================================================ */

'use strict';

/* ── DB (localStorage) ─────────────────────────────────── */
const DB = {
  get(k, d) { try { const v = localStorage.getItem('wj_' + k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem('wj_' + k, JSON.stringify(v)); } catch {} }
};

/* ── Sample Data ────────────────────────────────────────── */
const SEED = [
  { id: 1, title: "The Last Migration: Wildebeest Crossing the Mara River", category: "wildlife", author: "Sarah Chen", date: "2026-05-10", views: 12847, status: "published", excerpt: "Witness the most spectacular wildlife event on Earth — millions of wildebeest braving crocodile-infested waters in their eternal quest for greener pastures.", image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=900&q=75", tags: "safari,africa,migration,wildlife", meta: "Great Wildebeest Migration — Serengeti and Masai Mara guide.", body: "<h2>Dawn Over the Mara</h2><p>The first light of dawn paints the savanna in shades of amber and rose as a sound like distant thunder begins to build. It grows — not thunder, but the rumble of hooves. Thousands of hooves. Then millions.</p><p>The Great Wildebeest Migration is underway. Every year approximately 1.5 million wildebeest, joined by 200,000 zebras, undertake a circular journey of 1,800 kilometres across the Serengeti-Mara ecosystem.</p><blockquote>\"In 35 years of wildlife photography, nothing has prepared me for the sheer scale of this moment.\" — James Oduya, Wildlife Photographer</blockquote><h2>Nature's Ultimate Gamble</h2><p>Standing at the riverbank you understand why naturalists call this nature's greatest gamble. The animals sense danger — they can smell the crocodiles — yet the imperative to cross is hardwired into their DNA. Then one animal steps forward. And the dam breaks.</p>" },
  { id: 2, title: "Into the Amazon: A Journey to Earth's Green Heart", category: "nature", author: "Marco Rivera", date: "2026-05-08", views: 9231, status: "published", excerpt: "Deep in the world's largest rainforest, ancient trees hold secrets that could change everything we know about life on Earth.", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=75", tags: "amazon,rainforest,nature,brazil", meta: "Exploring the Amazon rainforest and its incredible biodiversity.", body: "<h2>The Green Cathedral</h2><p>To enter the Amazon is to step inside a living cathedral — one built over 55 million years, with columns of ironwood reaching 50 metres into the sky and a canopy that filters sunlight into a perpetual green twilight.</p><p>Scientists estimate the Amazon harbors 10% of all species on Earth, yet we have catalogued fewer than 20% of them. New species are discovered at an average of one every two days.</p><blockquote>\"The Amazon is not a place we are discovering. It is a place that is discovering us.\" — Shapu, Matsés Guide</blockquote>" },
  { id: 3, title: "Arctic Silence: Polar Bears on Thin Ice", category: "wildlife", author: "Dr. Elena Frost", date: "2026-05-05", views: 15620, status: "published", excerpt: "Climate change is reshaping the Arctic faster than any model predicted. The polar bear's story is becoming a race against time.", image: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=900&q=75", tags: "arctic,polar bears,climate,wildlife", meta: "Polar bear conservation and climate change in the Arctic.", body: "<h2>The Patience of Predators</h2><p>A polar bear can wait. For hours, sometimes days, absolutely motionless beside a seal's breathing hole in the sea ice. This extraordinary stillness is one of evolution's great achievements.</p><p>But the platform the bears wait upon is vanishing. Arctic sea ice is declining at approximately 13% per decade according to NASA satellite data.</p><blockquote>\"In 2004, we were still debating whether this was a crisis. That debate is over.\" — Dr. Kristin Laidre, University of Washington</blockquote>" },
  { id: 4, title: "Chasing Monsoon: Motorcycle Through India's West Coast", category: "adventure", author: "Priya Sharma", date: "2026-05-01", views: 7834, status: "published", excerpt: "2,000 kilometers on a Royal Enfield through Kerala and Karnataka during the world's most dramatic weather event.", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=75", tags: "india,motorcycle,monsoon,adventure", meta: "Motorcycle adventure through India's west coast during monsoon season.", body: "<h2>The Road to Nowhere Perfect</h2><p>The Royal Enfield Himalayan has a single-cylinder engine that sounds like someone rhythmically thumping a bass drum. After two weeks of riding, you stop hearing it consciously — it becomes your heartbeat.</p><p>I wanted to ride the monsoon. Not escape it, not photograph it from a hotel balcony — ride through it, into it, with it.</p>" },
  { id: 5, title: "The Secret Life of Coral Reefs at Night", category: "wildlife", author: "Dr. Maya Patel", date: "2026-04-28", views: 8920, status: "published", excerpt: "What happens beneath the waves after sunset? Marine biologists reveal a world of bioluminescence, predation, and surprising beauty.", image: "https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=900&q=75", tags: "ocean,coral,marine,diving", meta: "Coral reef life at night — bioluminescence and nocturnal species.", body: "<h2>Entering the Night Ocean</h2><p>Sliding beneath the surface at 9 PM, torch switched off, is an act of deliberate sensory surrender. Then your eyes adjust, and the reef begins to reveal itself in ways no daytime dive ever shows.</p><p>Phosphorescence trails your hands as you move. Parrotfish sleep in mucus cocoons they secrete each evening — a biological sleeping bag that masks their scent from predators.</p>" },
  { id: 6, title: "Reindeer Herders of the Arctic Tundra", category: "lifestyle", author: "Ingrid Larsen", date: "2026-04-25", views: 5270, status: "published", excerpt: "The Sámi people of northern Scandinavia maintain a way of life unchanged for millennia — but for how long?", image: "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?w=900&q=75", tags: "sami,arctic,culture,lifestyle", meta: "Sámi reindeer herding culture in Arctic Scandinavia.", body: "<h2>Reading Snow</h2><p>Anders Eira knows twelve different words for snow in Northern Sámi, and he can tell you — from thirty metres away, at a glance — what type of crust is beneath the white surface, how deep the ice layer goes, and whether the reindeer can reach the lichen beneath it.</p><p>This is knowledge accumulated over 400 years in his family. Knowledge that cannot be Googled.</p>" },
  { id: 7, title: "Cloud Forests of Ecuador: Walking in the Mist", category: "travel", author: "Carlos Mendez", date: "2026-04-22", views: 6140, status: "published", excerpt: "At 2,000 metres above sea level, Ecuador's cloud forests are among the most biodiverse places on the planet.", image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=900&q=75", tags: "ecuador,cloud forest,travel,biodiversity", meta: "Exploring Ecuador's cloud forests — biodiversity and travel guide.", body: "<h2>The Permanent Cloud</h2><p>The cloud forest is never not mysterious. By definition, it lives in cloud — tendrils of mist that move through the canopy with the unhurried certainty of something that knows it belongs. Trees wear epiphytes like elaborate green coats. Every branch hosts a garden.</p>" },
  { id: 8, title: "Dawn Chorus: Britain's Most Magical Morning Sound", category: "nature", author: "Oliver Hughes", date: "2026-04-20", views: 4560, status: "published", excerpt: "Every spring morning, Britain's woodlands erupt into the most complex symphony on Earth — if you know how to listen.", image: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=900&q=75", tags: "birds,uk,nature,sound", meta: "The dawn chorus in British woodlands — nature's morning symphony.", body: "<h2>5:17 AM</h2><p>The blackbird always begins first. A single, liquid phrase, repeated three times with variations — as if testing the acoustics, warming up for a performance it has rehearsed ten thousand times. Then silence. Then the robin joins in, its melody simultaneously melancholic and defiant.</p><p>Within twenty minutes, you cannot distinguish individual voices. The woodland has become a single roaring instrument, and you're standing inside it.</p>" },
];

/* ── State ──────────────────────────────────────────────── */
let articles    = DB.get('articles', SEED);
let affiliates  = DB.get('affiliates', [
  { id: 1, name: "Vanguard Binoculars 10×42", link: "#", commission: "5%", clicks: 234, conversions: 12 },
  { id: 2, name: "Osprey Atmos 65 Pack",      link: "#", commission: "6%", clicks: 311, conversions: 21 },
  { id: 3, name: "ExOfficio Nylon Pants",     link: "#", commission: "8%", clicks: 189, conversions: 8  },
]);
let categories  = DB.get('cats', ['Nature','Wildlife','Travel','Adventure','Lifestyle','Conservation','Photography']);
let subscribers = DB.get('subs', []);
let adminPass   = DB.get('apass', 'admin123');
let currentCat  = 'all';
let currentPage = 'home';
let displayedCount = 6;
const PER_PAGE  = 6;
let currentArticleId = null;
let _loginAttempts = 0;
let _lockUntil     = 0;
let _autoLogoutTimer = null;
let _keyBuf = [];

/* ── Helpers ────────────────────────────────────────────── */
const $  = id => document.getElementById(id);
const fmtDate = d => { try { return new Date(d).toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'}); } catch { return d; } };
const readTime = b => Math.max(1, Math.ceil((b||'').replace(/<[^>]*>/g,'').split(/\s+/).length / 200));
const initials = n => n.split(' ').map(w=>w[0]||'').join('').toUpperCase().slice(0,2);
const catClass = c => (['nature','wildlife','travel','adventure','lifestyle','conservation','photography'].includes(c) ? c : 'nature');

function badge(cat) {
  return `<span class="cat-badge ${catClass(cat)}">${cat}</span>`;
}

function toast(title, msg, type='success') {
  const t = $('toast');
  $('toast-title').textContent = title;
  $('toast-msg').textContent   = msg;
  t.className = type;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 4000);
}

/* ── Page Routing ───────────────────────────────────────── */
function showPage(page) {
  ['home','article','admin-login','admin'].forEach(p => {
    const el = $(`page-${p === 'home' ? 'home' : p === 'article' ? 'article' : p === 'admin-login' ? 'admin-login' : 'admin'}`);
    if (el) el.style.display = 'none';
  });
  $('main-footer').style.display = 'none';
  $('nav').style.display         = 'block';

  if (page === 'home') {
    $('page-home').style.display    = 'block';
    $('main-footer').style.display  = 'block';
    window.scrollTo(0,0);
  } else if (page === 'article') {
    $('page-article').style.display  = 'block';
    $('main-footer').style.display   = 'block';
    window.scrollTo(0,0);
  } else if (page === 'admin-login') {
    $('page-admin-login').style.display = 'block';
    $('nav').style.display              = 'none';
  } else if (page === 'admin') {
    $('page-admin').style.display = 'block';
    $('nav').style.display        = 'none';
    initAdmin();
  }
  currentPage = page;
}

/* ── Nav scroll ─────────────────────────────────────────── */
window.addEventListener('scroll', () => {
  $('nav').classList.toggle('scrolled', scrollY > 50);
}, { passive: true });

/* ── Theme ──────────────────────────────────────────────── */
function applyTheme(t) {
  document.body.setAttribute('data-theme', t);
  $('theme-icon-dark').style.display  = t === 'dark'  ? 'block' : 'none';
  $('theme-icon-light').style.display = t === 'light' ? 'block' : 'none';
  DB.set('theme', t);
}
$('theme-btn').addEventListener('click', () => {
  applyTheme(document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});
applyTheme(DB.get('theme','dark'));

/* ── Mobile menu ────────────────────────────────────────── */
$('hamburger').addEventListener('click', () => {
  $('mobile-menu').classList.toggle('open');
});
document.querySelectorAll('.mobile-menu a').forEach(a => {
  a.addEventListener('click', () => $('mobile-menu').classList.remove('open'));
});

/* ── Nav links ──────────────────────────────────────────── */
document.querySelectorAll('[data-cat]').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    filterCat(el.dataset.cat);
  });
});
document.querySelectorAll('[data-page]').forEach(el => {
  el.addEventListener('click', e => { e.preventDefault(); showPage(el.dataset.page); });
});

/* ── Logo single/double click ───────────────────────────── */
$('nav-logo').addEventListener('click', e => { e.preventDefault(); showPage('home'); });
$('nav-logo').addEventListener('dblclick', e => { e.preventDefault(); if (currentPage !== 'admin') showPage('admin-login'); });

/* ── Secret keyboard shortcut: Ctrl+Shift+Z ────────────── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if ($('search-overlay').classList.contains('open')) closeSearch();
    return;
  }
  if (e.key === 'k' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); openSearch(); return; }
  _keyBuf.push(e.key); _keyBuf = _keyBuf.slice(-3);
  if (_keyBuf.join() === 'Control,Shift,Z') {
    if (currentPage !== 'admin') showPage('admin-login');
  }
});

/* ── Search ─────────────────────────────────────────────── */
function openSearch() {
  $('search-overlay').classList.add('open');
  setTimeout(() => $('search-input').focus(), 50);
}
function closeSearch() {
  $('search-overlay').classList.remove('open');
  $('search-input').value = '';
  $('search-results').innerHTML = '<div class="sres-empty">Start typing to search…</div>';
}
$('search-btn').addEventListener('click', openSearch);
$('search-close').addEventListener('click', closeSearch);
$('search-overlay').addEventListener('click', e => { if (e.target === $('search-overlay')) closeSearch(); });
$('search-input').addEventListener('input', function() {
  const q = this.value.trim().toLowerCase();
  if (!q) { $('search-results').innerHTML = '<div class="sres-empty">Start typing to search…</div>'; return; }
  const hits = articles.filter(a => a.status === 'published' && (
    a.title.toLowerCase().includes(q) || a.category.toLowerCase().includes(q) ||
    (a.tags||'').toLowerCase().includes(q) || a.author.toLowerCase().includes(q)
  )).slice(0,6);
  $('search-results').innerHTML = hits.length
    ? hits.map(a => `<div class="sres" onclick="openArticle(${a.id});closeSearch()"><img src="${a.image}" alt=""><div class="sres-text"><h4>${a.title}</h4><p>${a.category} · ${a.author}</p></div></div>`).join('')
    : '<div class="sres-empty">No results found.</div>';
});

/* ── HERO ───────────────────────────────────────────────── */
function setupHero() {
  const pub = articles.filter(a => a.status === 'published');
  if (!pub.length) return;
  const bg = $('hero-bg');
  bg.style.backgroundImage = `url('${pub[0].image}')`;
  bg.style.backgroundSize  = 'cover';
  bg.style.backgroundPosition = 'center';
  bg.style.opacity = '0.22';
}
$('hero-explore').addEventListener('click', () => document.getElementById('section-featured').scrollIntoView({behavior:'smooth'}));
$('hero-subscribe').addEventListener('click', () => document.getElementById('newsletter-section').scrollIntoView({behavior:'smooth'}));
$('scroll-cue').addEventListener('click', () => document.getElementById('section-featured').scrollIntoView({behavior:'smooth'}));

/* ── CATEGORY FILTER ────────────────────────────────────── */
function filterCat(cat) {
  currentCat = cat; displayedCount = PER_PAGE;
  document.querySelectorAll('.cat-pill').forEach(p => p.classList.toggle('active', p.dataset.cat === cat));
  document.querySelectorAll('.nav-links a[data-cat]').forEach(a => a.classList.toggle('active', a.dataset.cat === cat));
  if (currentPage !== 'home') showPage('home');
  renderArticlesGrid();
  setTimeout(() => document.getElementById('section-featured').scrollIntoView({behavior:'smooth'}), 80);
}
document.querySelectorAll('.cat-pill').forEach(p => {
  p.addEventListener('click', () => filterCat(p.dataset.cat));
});
// Footer cat links
document.querySelectorAll('.footer-links a[data-cat]').forEach(a => {
  a.addEventListener('click', e => { e.preventDefault(); filterCat(a.dataset.cat); });
});

/* ── FEATURED GRID ──────────────────────────────────────── */
function renderFeatured() {
  const pub = articles.filter(a => a.status === 'published').slice(0, 3);
  $('featured-grid').innerHTML = pub.map((a, i) => `
    <div class="feat-card ${i === 0 ? 'big' : 'sm'}" onclick="openArticle(${a.id})">
      <img src="${a.image}" alt="${a.title}" loading="${i === 0 ? 'eager' : 'lazy'}">
      <div class="feat-overlay"></div>
      <div class="feat-body">
        ${badge(a.category)}
        <div class="feat-title">${a.title}</div>
        <div class="feat-meta">
          <span>${a.author}</span><span class="dot"></span>
          <span>${fmtDate(a.date)}</span><span class="dot"></span>
          <span>${readTime(a.body)} min read</span>
        </div>
        <div class="feat-arrow">Read Story →</div>
      </div>
    </div>`).join('');
}

/* ── ARTICLES GRID ──────────────────────────────────────── */
function getFiltered() {
  return articles.filter(a => a.status === 'published' &&
    (currentCat === 'all' || a.category === currentCat || (a.tags||'').split(',').map(t=>t.trim()).includes(currentCat)));
}
function renderArticlesGrid() {
  const list = getFiltered().slice(0, displayedCount);
  $('articles-grid').innerHTML = list.map(a => `
    <article class="art-card" onclick="openArticle(${a.id})">
      <div class="art-card-img">
        <img src="${a.image}" alt="${a.title}" loading="lazy">
        <div style="position:absolute;top:.75rem;left:.75rem">${badge(a.category)}</div>
      </div>
      <div class="art-card-body">
        <h3 class="art-card-title">${a.title}</h3>
        <p class="art-card-excerpt">${a.excerpt}</p>
        <div class="art-card-foot">
          <div class="author-chip"><div class="avatar">${initials(a.author)}</div><span>${a.author}</span></div>
          <span>⏱ ${readTime(a.body)} min</span>
        </div>
      </div>
    </article>`).join('') || '<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--tm)">No articles in this category yet.</div>';
}

/* ── TRENDING ───────────────────────────────────────────── */
function renderTrending() {
  const top = [...articles].filter(a => a.status==='published').sort((a,b) => b.views - a.views).slice(0,5);
  $('trending-list').innerHTML = top.map((a,i) => `
    <div class="trending-item" onclick="openArticle(${a.id})">
      <div class="trend-num">0${i+1}</div>
      <div class="trend-content"><h4>${a.title}</h4><p>${a.category} · ${(a.views||0).toLocaleString()} views</p></div>
    </div>`).join('');
}

/* ── TAGS ───────────────────────────────────────────────── */
function renderTags() {
  const tags = ['Safari','Amazon','Arctic','Ocean','Birds','Mountains','Big 5','Coral Reefs','Migration','Rainforest'];
  $('tag-cloud').innerHTML = tags.map(t => `<button class="tag" onclick="filterCat('${t.toLowerCase()}')">${t}</button>`).join('');
}

/* ── AFFILIATES ─────────────────────────────────────────── */
function renderAffiliates() {
  $('affiliate-sidebar').innerHTML = affiliates.slice(0,3).map(af => `
    <a class="aff-item" href="${af.link}" target="_blank" rel="noopener">
      <span style="font-size:1.4rem">🎒</span>
      <div><div class="aff-item-text">${af.name}</div><div class="aff-item-sub">View on Amazon →</div></div>
    </a>`).join('');
}

/* ── LOAD MORE ──────────────────────────────────────────── */
$('load-more').addEventListener('click', () => {
  displayedCount += PER_PAGE;
  renderArticlesGrid();
});

/* ── NEWSLETTER ─────────────────────────────────────────── */
function doSubscribe(email) {
  if (!email || !email.includes('@')) { toast('Error','Please enter a valid email.','error'); return; }
  if (!subscribers.includes(email)) { subscribers.push(email); DB.set('subs', subscribers); }
  toast('Subscribed! 🎉','Welcome to WildJourney!','success');
}
$('nl-subscribe').addEventListener('click', () => { doSubscribe($('nl-email').value.trim()); $('nl-email').value=''; });
$('sidebar-subscribe').addEventListener('click', () => { doSubscribe($('sidebar-email').value.trim()); $('sidebar-email').value=''; });

/* ── SCROLL ANIMATIONS ──────────────────────────────────── */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.1, rootMargin:'0px 0px -50px 0px' });
function initObserver() { document.querySelectorAll('.fade-in').forEach(el => io.observe(el)); }

/* ── ARTICLE PAGE ───────────────────────────────────────── */
function openArticle(id) {
  const a = articles.find(x => x.id === id);
  if (!a) return;
  a.views = (a.views||0) + 1; DB.set('articles', articles);
  $('art-img').src        = a.image;
  $('art-img').alt        = a.title;
  $('art-cat-badge').innerHTML = badge(a.category);
  $('art-title').textContent   = a.title;
  $('art-author').textContent  = a.author;
  $('art-date').textContent    = fmtDate(a.date);
  $('art-read').textContent    = readTime(a.body) + ' min read';
  $('art-views').textContent   = a.views.toLocaleString() + ' views';
  $('art-body').innerHTML      = a.body || '<p>Content coming soon.</p>';
  $('comments-list').innerHTML = '';
  DB.get('cmt_'+id,[]).forEach(c => appendComment(c));
  document.title = a.title + ' — WildJourney';
  showPage('article');
  currentArticleId = id;
}

function appendComment(c, prepend=false) {
  const el = document.createElement('div');
  el.className = 'comment-item';
  el.innerHTML = `<div class="comment-author">${c.name}</div><div class="comment-date">${c.date}</div><div class="comment-text">${c.text}</div>`;
  const list = $('comments-list');
  prepend ? list.prepend(el) : list.appendChild(el);
}

$('post-comment').addEventListener('click', () => {
  const name = $('cmt-name').value.trim();
  const text = $('cmt-text').value.trim();
  if (!name || !text) { toast('Error','Please fill in name and comment.','error'); return; }
  const c = { name, text, date: new Date().toLocaleDateString() };
  const arr = DB.get('cmt_'+currentArticleId, []);
  arr.unshift(c); DB.set('cmt_'+currentArticleId, arr);
  appendComment(c, true);
  $('cmt-name').value = ''; $('cmt-text').value = '';
  toast('Posted!','Your comment has been published.','success');
});

$('back-btn').addEventListener('click', () => showPage('home'));

/* Share */
document.querySelectorAll('.share-btn[data-platform]').forEach(btn => {
  btn.addEventListener('click', () => {
    const url = encodeURIComponent(location.href);
    const title = encodeURIComponent($('art-title').textContent);
    const m = { twitter:`https://twitter.com/intent/tweet?text=${title}&url=${url}`, facebook:`https://facebook.com/sharer/sharer.php?u=${url}`, whatsapp:`https://wa.me/?text=${title}%20${url}` };
    window.open(m[btn.dataset.platform], '_blank');
  });
});
['copy-link-btn','copy-link-btn2'].forEach(id => {
  const el = $(id); if (!el) return;
  el.addEventListener('click', () => { navigator.clipboard.writeText(location.href); toast('Copied!','Link copied to clipboard.','success'); });
});

/* ── SECRET ADMIN ACCESS ────────────────────────────────── */
/* No visible button. Access via:
   1. Ctrl+Shift+Z anywhere
   2. Double-click the WildJourney logo in nav */

/* ── ADMIN AUTH ─────────────────────────────────────────── */
$('login-btn').addEventListener('click', doLogin);
$('admin-pass').addEventListener('keydown', e => { if (e.key==='Enter') doLogin(); });
$('login-back').addEventListener('click', () => showPage('home'));

function doLogin() {
  const now = Date.now();
  if (now < _lockUntil) return;
  const user = $('admin-user').value.trim();
  const pass = $('admin-pass').value;
  const btn  = $('login-btn');
  btn.disabled = true; btn.textContent = 'Verifying…';
  setTimeout(() => {
    btn.disabled = false; btn.textContent = 'Sign In Securely';
    if (user === 'admin' && pass === adminPass) {
      _loginAttempts = 0;
      $('login-error').style.display = 'none';
      $('attempts-warn').style.display = 'none';
      $('admin-pass').value = '';
      showPage('admin');
      resetAutoLogout();
    } else {
      _loginAttempts++;
      $('login-error').style.display = 'block';
      $('admin-pass').value = '';
      if (_loginAttempts >= 5) {
        _lockUntil = now + 30000; _loginAttempts = 0;
        startLockTimer(30);
      } else {
        const rem = 5 - _loginAttempts;
        $('attempts-warn').style.display = 'block';
        $('attempts-warn').textContent = `⚠ ${rem} attempt${rem===1?'':'s'} remaining before lockout.`;
      }
    }
  }, 800 + Math.random()*400);
}

function startLockTimer(secs) {
  $('lockout-banner').style.display = 'block';
  $('attempts-warn').style.display  = 'none';
  $('login-error').style.display    = 'none';
  $('login-btn').disabled = true;
  let t = secs; $('lockout-timer').textContent = t;
  const iv = setInterval(() => {
    t--; $('lockout-timer').textContent = t;
    if (t <= 0) { clearInterval(iv); $('lockout-banner').style.display='none'; $('login-btn').disabled=false; }
  }, 1000);
}

function resetAutoLogout() {
  clearTimeout(_autoLogoutTimer);
  _autoLogoutTimer = setTimeout(() => {
    if (currentPage==='admin') { doLogout(); toast('Session Expired','Logged out after 30 min inactivity.','error'); }
  }, 30 * 60 * 1000);
}
function doLogout() { clearTimeout(_autoLogoutTimer); showPage('home'); }

$('logout-btn').addEventListener('click', doLogout);
document.addEventListener('click', () => { if (currentPage==='admin') resetAutoLogout(); });

/* ── ADMIN PANEL ────────────────────────────────────────── */
function initAdmin() {
  showSection('dashboard');
  document.querySelectorAll('.anav').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.id==='logout-btn') return;
      showSection(btn.dataset.section);
      document.querySelectorAll('.anav').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
  $('dash-new-btn').addEventListener('click', () => showSection('editor'));
  $('art-new-btn').addEventListener('click', () => showSection('editor'));
}

function showSection(id) {
  document.querySelectorAll('.asec').forEach(s => s.style.display='none');
  const sec = $('asec-'+id); if (!sec) return;
  sec.style.display = 'block';
  const renderers = { dashboard:renderDashboard, analytics:renderAnalytics, articles:renderArtTable, editor:()=>{}, ai:()=>{}, categories:renderCatTable, media:renderMedia, comments:renderCmtTable, affiliate:renderAffTable, newsletter:()=>{ if($('nl-count')) $('nl-count').textContent=subscribers.length; } };
  if (renderers[id]) renderers[id]();
}

/* Dashboard */
function renderDashboard() {
  const pub = articles.filter(a=>a.status==='published');
  const totalViews = articles.reduce((s,a)=>s+(a.views||0),0);
  $('stats-grid').innerHTML = [
    ['Total Articles', articles.length, '↑ 12% this month', true],
    ['Total Views', totalViews.toLocaleString(), '↑ 24% this week', true],
    ['Subscribers', subscribers.length, '↑ 8% this month', true],
    ['Est. Revenue', '$'+(totalViews*0.002).toFixed(0), '↑ 18% this month', true],
  ].map(([l,v,c]) => `<div class="stat-card"><div class="stat-lbl">${l}</div><div class="stat-val">${v}</div><div class="stat-chg up">${c}</div></div>`).join('');

  // Bar chart
  const vals = Array.from({length:30}, ()=>Math.floor(150+Math.random()*700));
  const mx = Math.max(...vals);
  $('views-chart').innerHTML = vals.map(v=>`<div class="bar" style="height:${Math.round(v/mx*100)}%" title="${v} views"></div>`).join('');

  // Traffic sources
  const srcs = [['Organic Search',52],['Social Media',24],['Direct',14],['Referral',10]];
  $('traffic-sources').innerHTML = srcs.map(([n,p])=>`<div class="src-row"><div class="src-label"><span>${n}</span><span>${p}%</span></div><div class="src-bar-bg"><div class="src-bar-fill" style="width:${p}%"></div></div></div>`).join('');

  // Recent table
  const rows = [...articles].sort((a,b)=>new Date(b.date)-new Date(a.date)).slice(0,6);
  $('dash-tbody').innerHTML = rows.map(a=>`
    <tr>
      <td style="color:var(--tp);max-width:240px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${a.title}</td>
      <td>${badge(a.category)}</td><td>${(a.views||0).toLocaleString()}</td>
      <td><span class="status-badge ${a.status}">${a.status}</span></td>
      <td>${fmtDate(a.date)}</td>
      <td><div class="act-btns">
        <button class="abtn edit" onclick="editArticle(${a.id})">Edit</button>
        <button class="abtn view" onclick="openArticle(${a.id})">View</button>
        <button class="abtn del" onclick="deleteArticle(${a.id})">Del</button>
      </div></td>
    </tr>`).join('');
}

function renderAnalytics() {
  const countries = [['🇮🇳 India',28],['🇺🇸 USA',22],['🇬🇧 UK',14],['🇦🇺 Australia',9],['🇨🇦 Canada',7]];
  $('countries-chart').innerHTML = countries.map(([n,p])=>`<div class="src-row"><div class="src-label"><span>${n}</span><span>${p}%</span></div><div class="src-bar-bg"><div class="src-bar-fill" style="width:${p}%;background:var(--gold)"></div></div></div>`).join('');
  const devices = [['📱 Mobile',61],['💻 Desktop',31],['📟 Tablet',8]];
  $('devices-chart').innerHTML = devices.map(([n,p])=>`<div class="src-row"><div class="src-label"><span>${n}</span><span>${p}%</span></div><div class="src-bar-bg"><div class="src-bar-fill" style="width:${p}%;background:var(--blue)"></div></div></div>`).join('');
}

/* Articles table */
function renderArtTable() {
  const sorted = [...articles].sort((a,b)=>new Date(b.date)-new Date(a.date));
  $('art-tbody').innerHTML = sorted.map(a=>`
    <tr>
      <td style="color:var(--tp);max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${a.title}</td>
      <td>${badge(a.category)}</td><td>${a.author}</td><td>${(a.views||0).toLocaleString()}</td>
      <td><span class="status-badge ${a.status}">${a.status}</span></td>
      <td>${fmtDate(a.date)}</td>
      <td><div class="act-btns">
        <button class="abtn edit" onclick="editArticle(${a.id})">Edit</button>
        <button class="abtn view" onclick="openArticle(${a.id})">View</button>
        <button class="abtn del" onclick="deleteArticle(${a.id})">Del</button>
      </div></td>
    </tr>`).join('');
}
// Filter
$('art-search').addEventListener('input', function() {
  const q = this.value.toLowerCase();
  document.querySelectorAll('#art-tbody tr').forEach(r => { r.style.display = r.textContent.toLowerCase().includes(q) ? '' : 'none'; });
});
$('art-cat-filter').addEventListener('change', function() {
  renderArtTable();
  if (this.value !== 'all') {
    document.querySelectorAll('#art-tbody tr').forEach(r => { if (!r.textContent.toLowerCase().includes(this.value)) r.style.display='none'; });
  }
});

/* Editor */
function clearEditor() {
  ['ed-id','ed-title','ed-author','ed-excerpt','ed-body','ed-img','ed-tags','ed-meta'].forEach(id => { const el=$(id); if(el) el.value=''; });
  if($('ed-cat')) $('ed-cat').value='nature';
  if($('ed-status')) $('ed-status').value='published';
  if($('editor-ttl')) $('editor-ttl').textContent='New Article';
}
$('clear-editor-btn').addEventListener('click', clearEditor);

$('save-article-btn').addEventListener('click', () => {
  const title  = $('ed-title').value.trim();
  const body   = $('ed-body').value.trim();
  const author = $('ed-author').value.trim();
  if (!title||!body||!author) { toast('Error','Title, body and author are required.','error'); return; }
  const data = {
    title, body, author,
    category: $('ed-cat').value,
    excerpt:  $('ed-excerpt').value || body.replace(/<[^>]*>/g,'').slice(0,150)+'…',
    image:    $('ed-img').value || 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=75',
    tags:     $('ed-tags').value,
    meta:     $('ed-meta').value,
    status:   $('ed-status').value,
    date:     new Date().toISOString().split('T')[0],
    views:    0,
  };
  const existId = $('ed-id').value;
  if (existId) {
    const idx = articles.findIndex(a=>a.id==existId);
    if (idx!==-1) articles[idx] = {...articles[idx],...data};
  } else {
    data.id = Date.now(); articles.unshift(data);
  }
  DB.set('articles', articles);
  clearEditor(); renderHome();
  toast('Saved!','Article published successfully.','success');
});

$('preview-btn').addEventListener('click', () => {
  const title = $('ed-title').value; if (!title) { toast('Error','Add a title first.','error'); return; }
  const fake = {id:-1,title,body:$('ed-body').value,author:$('ed-author').value||'Author',date:new Date().toISOString().split('T')[0],category:$('ed-cat').value,image:$('ed-img').value||'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=75',views:0,excerpt:''};
  articles.unshift(fake); openArticle(-1); articles.shift();
});

// Toolbar
document.getElementById('editor-toolbar').addEventListener('click', e => {
  const btn = e.target.closest('button[data-tag]'); if (!btn) return;
  const ta = $('ed-body'); const tag = btn.dataset.tag;
  const sel = ta.value.substring(ta.selectionStart, ta.selectionEnd);
  const txt = sel ? `<${tag}>${sel}</${tag}>` : `<${tag}>Your text here</${tag}>`;
  const pos = ta.selectionStart;
  ta.value = ta.value.slice(0,pos)+txt+ta.value.slice(ta.selectionEnd);
  ta.focus();
});

function editArticle(id) {
  const a = articles.find(x=>x.id===id); if (!a) return;
  ['id','title','author','excerpt','body','img','tags','meta'].forEach(f => {
    const el = $('ed-'+f); if (el) el.value = a[f==='img'?'image':f==='id'?'id':f] ?? '';
  });
  $('ed-id').value     = a.id;
  $('ed-img').value    = a.image;
  $('ed-cat').value    = a.category;
  $('ed-status').value = a.status;
  $('editor-ttl').textContent = 'Edit Article';
  showSection('editor');
  document.querySelectorAll('.anav').forEach(b=>b.classList.toggle('active', b.dataset.section==='editor'));
}

function deleteArticle(id) {
  if (!confirm('Delete this article? Cannot be undone.')) return;
  articles = articles.filter(a=>a.id!==id); DB.set('articles',articles);
  renderHome(); renderDashboard(); renderArtTable();
  toast('Deleted','Article removed.','success');
}

/* AI Writer */
$('ai-generate-btn').addEventListener('click', generateAI);
$('ai-regen-btn').addEventListener('click', generateAI);
$('ai-use-btn').addEventListener('click', () => {
  const raw = $('ai-result').textContent;
  const tm = raw.match(/TITLE:\s*(.+)/);     if(tm) $('ed-title').value=tm[1].trim();
  const em = raw.match(/EXCERPT:\s*([\s\S]+?)BODY:/); if(em) $('ed-excerpt').value=em[1].trim();
  const bm = raw.match(/BODY:\s*([\s\S]+)/); if(bm) $('ed-body').value=bm[1].trim();
  $('ed-cat').value = $('ai-cat').value;
  showSection('editor');
  document.querySelectorAll('.anav').forEach(b=>b.classList.toggle('active',b.dataset.section==='editor'));
  toast('Loaded!','Review and edit before publishing.','success');
});

async function generateAI() {
  const prompt = $('ai-prompt').value.trim();
  if (!prompt) { toast('Error','Please enter a topic.','error'); return; }
  $('ai-loading').classList.add('show');
  $('ai-output').style.display = 'none';
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        model:'claude-sonnet-4-20250514', max_tokens:1000,
        messages:[{role:'user',content:`You are a professional nature and travel writer for WildJourney magazine (like National Geographic).
Write a compelling article in a ${$('ai-tone').value} tone for the category: ${$('ai-cat').value}.
Topic: ${prompt}

Format exactly as:
TITLE: [compelling headline]
EXCERPT: [2-3 sentence summary]
BODY:
[Full article using HTML: <h2> for sections, <p> for paragraphs, <blockquote> for quotes. 600-800 words total.]`}]
      })
    });
    const d = await res.json();
    const txt = (d.content||[]).map(x=>x.text||'').join('\n') || 'Could not generate. Please try again.';
    $('ai-result').textContent = txt;
    $('ai-output').style.display = 'block';
  } catch(err) {
    $('ai-result').textContent = 'Connection error. Check your internet.';
    $('ai-output').style.display = 'block';
  }
  $('ai-loading').classList.remove('show');
}

/* Categories */
function renderCatTable() {
  $('cat-tbody').innerHTML = categories.map(cat=>`
    <tr>
      <td style="color:var(--tp)">${cat}</td>
      <td style="color:var(--tm)">${cat.toLowerCase()}</td>
      <td>${articles.filter(a=>a.category===cat.toLowerCase()).length}</td>
      <td><button class="abtn del" onclick="deleteCat('${cat}')">Delete</button></td>
    </tr>`).join('');
}
$('add-cat-btn').addEventListener('click', () => {
  const v = $('new-cat').value.trim(); if (!v) return;
  categories.push(v); DB.set('cats',categories); $('new-cat').value=''; renderCatTable();
  toast('Added','Category created.','success');
});
function deleteCat(n) { categories=categories.filter(c=>c!==n); DB.set('cats',categories); renderCatTable(); }

/* Media */
function renderMedia() {
  const saved = DB.get('media',[]);
  const imgs  = [...new Set([...saved,...articles.map(a=>a.image).filter(Boolean)])].slice(0,20);
  $('media-grid').innerHTML = imgs.map(url=>`
    <div class="media-item" onclick="copyUrl('${url}')">
      <img src="${url}" alt="" loading="lazy">
      <div class="media-item-overlay">Copy URL</div>
    </div>`).join('');
}
function copyUrl(url) { navigator.clipboard.writeText(url); toast('Copied','Image URL copied.','success'); }
$('upload-zone').addEventListener('click', () => $('file-input').click());
$('file-input').addEventListener('change', function() {
  const f = this.files[0]; if (!f) return;
  const r = new FileReader();
  r.onload = e => { const m=DB.get('media',[]); m.unshift(e.target.result); DB.set('media',m.slice(0,20)); renderMedia(); toast('Uploaded!','Image added to library.','success'); };
  r.readAsDataURL(f);
});

/* Comments admin */
function renderCmtTable() {
  let all = [];
  articles.forEach(a => { DB.get('cmt_'+a.id,[]).forEach(c => all.push({...c,artTitle:a.title,artId:a.id})); });
  $('cmt-tbody').innerHTML = all.length
    ? all.map(c=>`<tr><td style="color:var(--tp)">${c.name}</td><td style="max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${c.text}</td><td style="max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--tm)">${c.artTitle}</td><td>${c.date}</td><td><button class="abtn del" onclick="delComment(${c.artId},'${c.text.slice(0,15).replace(/'/g,'')}')">Del</button></td></tr>`).join('')
    : '<tr><td colspan="5" style="text-align:center;color:var(--tm);padding:2rem">No comments yet.</td></tr>';
}
function delComment(id, frag) {
  const arr = DB.get('cmt_'+id,[]).filter(c=>!c.text.startsWith(frag));
  DB.set('cmt_'+id,arr); renderCmtTable(); toast('Deleted','Comment removed.','success');
}

/* Affiliate */
function renderAffTable() {
  $('aff-tbody').innerHTML = affiliates.map(af=>`
    <tr>
      <td style="color:var(--tp)">${af.name}</td><td style="color:var(--gold)">${af.commission}</td>
      <td>${af.clicks}</td><td>${af.conversions}</td>
      <td><button class="abtn del" onclick="delAff(${af.id})">Remove</button></td>
    </tr>`).join('');
}
$('add-aff-btn').addEventListener('click', () => {
  const name=$('aff-name').value.trim(), link=$('aff-link').value.trim();
  if(!name||!link){toast('Error','Name and link required.','error');return;}
  affiliates.push({id:Date.now(),name,link,commission:$('aff-comm').value||'5%',clicks:0,conversions:0});
  DB.set('affiliates',affiliates); renderAffTable(); renderAffiliates();
  toast('Added','Product added.','success');
});
function delAff(id) { affiliates=affiliates.filter(a=>a.id!==id); DB.set('affiliates',affiliates); renderAffTable(); }

/* Newsletter */
$('send-nl-btn').addEventListener('click', () => toast('Sent!','Newsletter queued for delivery.','success'));

/* SEO / Settings saves */
$('save-seo-btn').addEventListener('click', ()=>toast('Saved','SEO settings updated.','success'));
$('save-settings-btn').addEventListener('click', ()=>{
  const np=$('new-pass').value;
  if(np){adminPass=np;DB.set('apass',adminPass);$('new-pass').value='';}
  toast('Saved','Settings updated.','success');
});
$('save-adsense-btn').addEventListener('click',()=>toast('Saved','AdSense settings saved.','success'));

/* ── HOME RENDER ────────────────────────────────────────── */
function renderHome() {
  setupHero();
  renderFeatured();
  renderArticlesGrid();
  renderTrending();
  renderTags();
  renderAffiliates();
  initObserver();
}

/* ── INIT ───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  showPage('home');
  renderHome();
});

/* expose to HTML onclick attrs */
window.openArticle   = openArticle;
window.filterCat     = filterCat;
window.editArticle   = editArticle;
window.deleteArticle = deleteArticle;
window.deleteCat     = deleteCat;
window.delComment    = delComment;
window.delAff        = delAff;
window.closeSearch   = closeSearch;
window.copyUrl       = copyUrl;
