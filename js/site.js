// ===========================================================
// MEDINI WELFARE SOCIETY — site.js
// Handles: header/footer injection, nav toggle, active link.
// EDIT NAV LINKS in the headerHTML() function below.
// ===========================================================

function headerHTML(active){
  const link = (href, label, key, i18n) =>
    `<a href="${href}" class="${active===key ? 'active' : ''}" data-i18n="${i18n}">${label}</a>`;
  return `
  <header class="site-header">
    <nav class="nav">
      <a href="index.html" class="brand"><img src="images/logo.png" alt="Medini Welfare Society logo" class="brand-logo"> Medini Welfare Society</a>
      <button class="nav-toggle" aria-label="Toggle menu" id="navToggle">☰</button>
      <ul class="nav-links" id="navLinks">
        <li>${link('index.html','Home','home','nav.home')}</li>
        <li>${link('about.html','About Us','about','nav.about')}</li>
        <li>${link('initiatives.html','Initiatives','initiatives','nav.initiatives')}</li>
        <li>${link('blog.html','Blog','blog','nav.blog')}</li>
        <li>${link('notices.html','Notices','notices','nav.notices')}</li>
        <li>${link('team.html','People','team','nav.team')}</li>
        <li>${link('contact.html','Contact','contact','nav.contact')}</li>
      </ul>
      <button class="lang-switch" id="langSwitch" title="Switch language">हिं / EN</button>
      <a href="donate.html" class="nav-cta" data-i18n="nav.donate">Donate</a>
    </nav>
  </header>`;
}

function footerHTML(){
  return `
  <footer class="site-footer">
    <div class="wrap">
      <div class="footer-grid">
        <div>
          <h4 style="margin-bottom:14px;">Medini Welfare Society</h4>
          <p style="color:#cfd3df;font-size:.92rem;max-width:32ch;" data-i18n="footer.tagline">
            A registered non-profit working for social upliftment through education, health and livelihood programs.
          </p>
          <p style="color:#9aa0b4;font-size:.8rem;" data-i18n="footer.regNote">Registration No. XXXXXXXXX &middot; 80G &amp; 12A registered</p>
        </div>
        <div>
          <h4 data-i18n="footer.explore">Explore</h4>
          <a href="about.html" data-i18n="nav.about">About Us</a>
          <a href="initiatives.html" data-i18n="nav.initiatives">Initiatives</a>
          <a href="blog.html" data-i18n="nav.blog">Blog</a>
          <a href="notices.html" data-i18n="nav.notices">Notices</a>
          <a href="team.html" data-i18n="footer.keyPersonnel">Key Personnel</a>
        </div>
        <div>
          <h4 data-i18n="footer.getinvolved">Get Involved</h4>
          <a href="donate.html" data-i18n="nav.donate">Donate</a>
          <a href="volunteer.html" data-i18n="footer.volunteer">Volunteer</a>
          <a href="gallery.html" data-i18n="footer.gallery">Gallery</a>
          <a href="faq.html" data-i18n="footer.faq">FAQ</a>
        </div>
        <div>
          <h4 data-i18n="footer.contact">Contact</h4>
          <a href="mailto:contact@mediniwelfare.org">contact@mediniwelfare.org</a>
          <a href="tel:+910000000000">+91 00000 00000</a>
          <a href="contact.html" data-i18n="footer.contactFormArrow">Contact form &rarr;</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; <span id="year"></span> <span data-i18n="footer.rights">Medini Welfare Society. All rights reserved.</span></span>
        <span><a href="privacy.html" style="color:#9aa0b4;" data-i18n="footer.privacy">Privacy Policy</a> &middot; <a href="terms.html" style="color:#9aa0b4;" data-i18n="footer.terms">Terms</a> &middot; <a href="admin.html" style="color:#9aa0b4;" data-i18n="footer.admin">Admin</a></span>
      </div>
    </div>
  </footer>`;
}

function mountChrome(active){
  document.getElementById('header-mount').innerHTML = headerHTML(active);
  document.getElementById('footer-mount').innerHTML = footerHTML();
  const y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if(toggle){
    toggle.addEventListener('click', () => links.classList.toggle('open'));
  } initLanguageSwitcher();
}

function fmtDate(iso){
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' });
}

async function loadJSON(path){
  const res = await fetch(path);
  if(!res.ok) throw new Error('Failed to load ' + path);
  return res.json();
}

// Simple contact/volunteer form handler.
// NOTE: this currently just shows a confirmation message — see README
// for how to wire this up to actually receive submissions (Formspree, etc.)
function wireForm(formId, statusId){
  const form = document.getElementById(formId);
  const status = document.getElementById(statusId);
  if(!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    status.textContent = "Thank you — we've received your message and will be in touch shortly.";
    status.style.color = 'var(--leaf)';
    form.reset();
  });
}
let translationsCache = null;

async function getTranslations(){
  if(translationsCache) return translationsCache;
  translationsCache = await loadJSON('translations.json');
  return translationsCache;
}

function getCurrentLang(){
  return localStorage.getItem('medini_lang') || 'en';
}

async function applyTranslations(lang){
  let dict;
  try{
    const all = await getTranslations();
    dict = all[lang] || all.en;
  } catch(err){
    return;
  }
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    // innerHTML (not textContent) so entries that include simple formatting
    // (e.g. <strong>, <br>, a mailto link) render correctly. Translation
    // strings are all site-authored (from translations.json), never raw
    // user input, so this is safe.
    if(dict[key]) el.innerHTML = dict[key];
  });
  document.documentElement.lang = lang === 'hi' ? 'hi' : 'en';
}

// Short-string translator for text built inside JS templates (card links like
// "Read more →" that get re-rendered from fetched data, not static HTML).
// Returns null if Hindi isn't active yet or translations haven't loaded —
// callers should fall back to the hardcoded English string in that case.
function tt(key){
  if(getCurrentLang() !== 'hi' || !translationsCache || !translationsCache.hi) return null;
  return translationsCache.hi[key] || null;
}

function initLanguageSwitcher(){
  const btn = document.getElementById('langSwitch');
  const lang = getCurrentLang();
  applyTranslations(lang);
  if(!btn) return;
  btn.addEventListener('click', () => {
    const next = getCurrentLang() === 'en' ? 'hi' : 'en';
    localStorage.setItem('medini_lang', next);
    applyTranslations(next);
    // Let any page-level code (blog posts, initiatives, notices) know it should
    // re-render already-loaded content in the new language — see t() below.
    document.dispatchEvent(new CustomEvent('medini:langchange', { detail: { lang: next } }));
  });
}

// Picks the Hindi version of a field on admin-posted content (blog posts,
// initiatives, notices) when the site is set to Hindi and that field has a
// Hindi value saved — otherwise falls back to the English field. Hindi
// fields are named with a "Hi" suffix, e.g. a post's "title" has an optional
// "titleHi" saved alongside it from the admin dashboard.
// Usage: t(post, 'title') instead of post.title.
function t(obj, field){
  if(!obj) return '';
  if(getCurrentLang() === 'hi' && obj[field + 'Hi']) return obj[field + 'Hi'];
  return obj[field] || '';
}

// Pulls the 11-character video ID out of any common YouTube URL shape
// (watch?v=, youtu.be/, embed/, shorts/) so we can build a thumbnail image
// URL without needing an API call. Returns '' if the link doesn't match.
function extractYouTubeId(url){
  if(!url) return '';
  const m = String(url).match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  return m ? m[1] : '';
}
