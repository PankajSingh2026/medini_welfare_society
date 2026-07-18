// ===========================================================
// MEDINI WELFARE SOCIETY — site.js
// Handles: header/footer injection, nav toggle, active link.
// EDIT NAV LINKS in the headerHTML() function below.
// ===========================================================

function headerHTML(active){
  const link = (href, label, key) =>
    `<a href="${href}" class="${active===key ? 'active' : ''}">${label}</a>`;
  return `
  <header class="site-header">
    <nav class="nav">
      <a href="index.html" class="brand"><span class="dot"></span> Medini Welfare Society</a>
      <button class="nav-toggle" aria-label="Toggle menu" id="navToggle">☰</button>
      <ul class="nav-links" id="navLinks">
        <li>${link('index.html','Home','home')}</li>
        <li>${link('about.html','About Us','about')}</li>
        <li>${link('initiatives.html','Initiatives','initiatives')}</li>
        <li>${link('blog.html','Blog','blog')}</li>
        <li>${link('notices.html','Notices','notices')}</li>
        <li>${link('team.html','People','team')}</li>
        <li>${link('contact.html','Contact','contact')}</li>
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
          <p style="color:#cfd3df;font-size:.92rem;max-width:32ch;">
            A registered non-profit working for social upliftment through education, health and livelihood programs.
          </p>
          <p style="color:#9aa0b4;font-size:.8rem;">Registration No. XXXXXXXXX &middot; 80G &amp; 12A registered</p>
        </div>
        <div>
          <h4>Explore</h4>
          <a href="about.html">About Us</a>
          <a href="initiatives.html">Initiatives</a>
          <a href="blog.html">Blog</a>
          <a href="notices.html">Notices</a>
          <a href="team.html">Key Personnel</a>
        </div>
        <div>
          <h4>Get Involved</h4>
          <a href="donate.html">Donate</a>
          <a href="volunteer.html">Volunteer</a>
          <a href="gallery.html">Gallery</a>
          <a href="faq.html">FAQ</a>
        </div>
        <div>
          <h4>Contact</h4>
          <a href="mailto:contact@mediniwelfare.org">contact@mediniwelfare.org</a>
          <a href="tel:+910000000000">+91 00000 00000</a>
          <a href="contact.html">Contact form &rarr;</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; <span id="year"></span> Medini Welfare Society. All rights reserved.</span>
        <span><a href="privacy.html" style="color:#9aa0b4;">Privacy Policy</a> &middot; <a href="terms.html" style="color:#9aa0b4;">Terms</a> &middot; <a href="admin.html" style="color:#9aa0b4;">Admin</a></span>
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
    if(dict[key]) el.textContent = dict[key];
  });
  document.documentElement.lang = lang === 'hi' ? 'hi' : 'en';
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
  });
}
