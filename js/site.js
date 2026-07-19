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
  // ---- SOCIAL LINKS ----
  // Replace these four placeholder URLs with your real profile links (and
  // swap the WhatsApp number for your actual one, digits only, country code
  // first — no +, spaces or leading 00). This is the only place these links
  // live on the site — social icons intentionally do not appear in the header/nav.
  const SOCIAL_LINKS = {
    facebook: 'https://facebook.com/mediniwelfaresociety',
    instagram: 'https://instagram.com/mediniwelfaresociety',
    x: 'https://x.com/mediniwelfare',
    whatsapp: 'https://wa.me/910000000000'
  };
  return `
  <footer class="site-footer">
    <div class="wrap">
      <div class="footer-grid">
        <div>
          <h4 style="margin-bottom:14px;">Medini Welfare Society</h4>
          <p style="color:#cfd3df;font-size:.92rem;max-width:32ch;" data-i18n="footer.tagline">
            A registered non-profit working for social upliftment through education, health and livelihood programs.
          </p>
          <p style="color:#9aa0b4;font-size:.8rem;" data-i18n="footer.regNote">Registration No. 24560 &middot; 80G &amp; 12A registered</p>
          <div class="footer-social">
            <a href="${SOCIAL_LINKS.facebook}" target="_blank" rel="noopener" aria-label="Facebook" title="Facebook">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5 3.66 9.14 8.44 9.94v-7.03H7.9v-2.91h2.54V9.86c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.91h-2.34V22c4.78-.8 8.44-4.94 8.44-9.94z"/></svg>
            </a>
            <a href="${SOCIAL_LINKS.instagram}" target="_blank" rel="noopener" aria-label="Instagram" title="Instagram">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none"/></svg>
            </a>
            <a href="${SOCIAL_LINKS.x}" target="_blank" rel="noopener" aria-label="X (formerly Twitter)" title="X">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M18.244 2H21.5l-7.5 8.57L22.75 22h-6.94l-5.43-6.98L4.14 22H1l8.03-9.17L1.5 2h7.1l4.9 6.39L18.24 2Zm-1.22 18h1.9L7.06 4H5.02l11.99 16Z"/></svg>
            </a>
            <a href="${SOCIAL_LINKS.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp" title="WhatsApp">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M12.02 2C6.5 2 2 6.48 2 12c0 1.85.5 3.6 1.44 5.13L2 22l4.99-1.3A9.96 9.96 0 0 0 12.02 22C17.55 22 22 17.52 22 12S17.55 2 12.02 2Zm4.9 12.99c-.24.68-1.37 1.3-1.94 1.38-.51.08-1.15.11-1.86-.12a11.5 11.5 0 0 1-1.69-.62c-2.97-1.28-4.91-4.27-5.06-4.47-.15-.2-1.21-1.61-1.21-3.07 0-1.46.77-2.18 1.04-2.48.27-.3.59-.37.79-.37.19 0 .39 0 .56.01.17 0 .41-.07.65.5.25.58.83 2 .9 2.15.07.15.12.32.02.52-.09.2-.14.33-.29.5-.15.16-.31.37-.44.5-.15.15-.3.3-.13.6.16.29.74 1.24 1.6 2 1.1.98 2.03 1.28 2.32 1.43.29.15.46.13.63-.07.17-.19.72-.82.92-1.12.19-.29.39-.24.65-.14.26.09 1.67.78 1.96.93.29.15.48.22.55.35.07.12.07.7-.17 1.38z"/></svg>
            </a>
          </div>
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
          <a href="mailto:mediniwelfaresociety@gmail.com">mediniwelfaresociety@gmail.com</a>
          <a href="tel:+919572104399">+91 9572104399</a>
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
// Pass a Formspree (or similar) endpoint as the 3rd argument to actually
// send submissions there via a background fetch — the page never
// redirects, so the existing inline "Thank you" message still shows.
// Leave the endpoint out (or leave it as the "YOUR-..." placeholder in
// contact.html / volunteer.html) and the form just shows the confirmation
// locally without sending anything anywhere, same as before.
function wireForm(formId, statusId, endpoint){
  const form = document.getElementById(formId);
  const status = document.getElementById(statusId);
  if(!form) return;
  const submitBtn = form.querySelector('button[type="submit"]');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const notConfigured = !endpoint || endpoint.indexOf('YOUR-') !== -1;
    if(notConfigured){
      status.style.color = 'var(--leaf)';
      status.textContent = "Thank you — we've received your message and will be in touch shortly.";
      form.reset();
      return;
    }
    status.style.color = '';
    status.textContent = 'Sending…';
    if(submitBtn) submitBtn.disabled = true;
    try{
      // Accept: application/json tells Formspree to respond with JSON
      // instead of redirecting to their own hosted "thank you" page.
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      });
      if(res.ok){
        status.style.color = 'var(--leaf)';
        status.textContent = "Thank you — we've received your message and will be in touch shortly.";
        form.reset();
      } else {
        status.style.color = '#c0392b';
        status.textContent = 'Something went wrong sending your message — please try again, or email us directly.';
      }
    } catch(err){
      status.style.color = '#c0392b';
      status.textContent = 'Something went wrong sending your message — please try again, or email us directly.';
    } finally {
      if(submitBtn) submitBtn.disabled = false;
    }
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
