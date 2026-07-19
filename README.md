# Medini Welfare Society — Website

A ready-to-host, static multi-page website. No build step required —
plain HTML, CSS and JavaScript.

## What's included

```
index.html          Home
about.html           About Us
initiatives.html     Initiatives (list)
initiative.html      Single initiative (reads data/initiatives.json)
blog.html            Blog (list)
post.html            Single blog post (reads data/blog.json)
team.html            Key Personnel (reads data/team.json)
donate.html          Donate
volunteer.html       Volunteer application
contact.html         Contact form + map
gallery.html         Photo gallery
faq.html / privacy.html / terms.html

css/style.css        All styling + color/font tokens
js/site.js            Shared header/footer, nav menu, form handling
data/*.json           Editable content for blog, initiatives, team
images/               Placeholder images — replace these
```

## How to edit content (no coding needed)

**Blog posts** → edit `data/blog.json`. Copy an existing entry, change the
text, give it a unique `slug` (used in the URL) and a date. Posts sort
automatically, newest first.

**Initiatives** → edit `data/initiatives.json` the same way.

**Team / Key Personnel** → edit `data/team.json` the same way.

Each JSON file is a list of `{ }` objects — just copy one, paste it, edit
the text inside the quotes, and keep the commas between entries.

**Adding images:** drop the image file into `/images`, then reference it
in the JSON as `"image": "images/your-file.jpg"`.

**Text on Home, About, Donate, Contact, etc.** → open the matching
`.html` file in any text/code editor and edit the text directly. It's
plain English inside HTML tags — change the words between `<p>...</p>`
or `<h1>...</h1>` and save.

**Colors and fonts** → open `css/style.css`, top section labeled
`COLOR TOKENS`. Change the hex codes there and the whole site updates.

**Nav menu links / footer links** → edit `js/site.js`
(`headerHTML()` and `footerHTML()` functions).

## Things to replace before going live

1. **Registration number** — search for `XXXXXXXXX` in `js/site.js` and `about.html`.
2. **Address / phone / email** — in `contact.html` and `js/site.js` footer.
3. **Google Map** — in `contact.html`, replace the `q=Mumbai` part of the
   map URL with your real address.
4. **Images** — everything in `/images` is a placeholder. Swap in real
   photos (same filenames, or update the JSON/HTML references).
5. **Donate button** — `donate.html` has a placeholder button. See below.
6. **Contact / Volunteer forms** — currently just show a "thank you"
   message in the browser; they don't send anywhere yet. See below.

## Connecting the donation button (no backend needed)

Pick a payment processor that gives you a hosted checkout link or button
embed code — you paste their snippet in, no server required:

- **Razorpay** (popular in India, supports UPI/cards/netbanking) — create
  a "Payment Button" in their dashboard, copy the embed code into
  `donate.html` where the placeholder button is.
- **Instamojo** — similar, has an NGO-friendly payment page generator.
- **Stripe Payment Links** or **PayPal Donate Button** — if you also want
  international donors.

All of these host the actual payment page on their secure servers, so
you never have to write backend code or handle card data.

## Connecting the Contact / Volunteer forms

Both forms are wired up to **Formspree** (formspree.io) already — no
backend of our own needed. Submissions POST in the background via
`fetch()` (see `wireForm()` in `js/site.js`), so the page never redirects
and visitors still see the site's own inline "Thank you" message instead
of Formspree's generic one.

The endpoint is passed as the 3rd argument where each form is wired up:

```html
<!-- contact.html -->
wireForm('contactForm', 'cStatus', 'https://formspree.io/f/xkodbwlp');
<!-- volunteer.html -->
wireForm('volunteerForm', 'vStatus', 'https://formspree.io/f/xkodbwlp');
```

Both currently point at the same Formspree form, so Contact and Volunteer
submissions land in the same inbox. To split them, create a second form
in the Formspree dashboard (Integration tab → "Your form's endpoint is:")
and swap its URL into the `volunteerForm` line above.

If you ever want to disable sending again (e.g. while testing), just
remove the 3rd argument from the `wireForm(...)` call — with no endpoint,
the form shows the confirmation message locally without sending anything.

Every field that should be sent needs a `name` attribute (not just an
`id`) — that's what Formspree actually reads. Both forms already have
these set for every field.

If you'd rather have a real backend (e.g. to store submissions in a
database and trigger emails yourself), that needs a small server — happy
to build that next if you want it; options would be a lightweight
Node/Express or Python/Flask API connected to this same frontend.

## How to test locally before uploading

Browsers block `fetch()` of local JSON files when you just double-click
an HTML file (`file://` URLs), so run a tiny local server instead:

**With Python installed:**
```
cd path/to/this/folder
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

**With VS Code:** install the "Live Server" extension, right-click
`index.html`, choose "Open with Live Server."

## How to host it for real (free options)

**Netlify (easiest):**
1. Go to netlify.com, sign up free.
2. Drag this whole folder onto the "Deploy" area on your dashboard.
3. You get a live URL instantly. Add a custom domain (e.g.
   mediniwelfare.org) for free under Site Settings → Domain Management.

**Vercel:** same idea — sign up, drag-and-drop or connect a GitHub repo,
deploy.

**GitHub Pages:** push this folder to a GitHub repository, then enable
Pages in repo Settings → Pages, choose the branch, and it goes live at
`yourusername.github.io/reponame`.

For any of these, once it's live you can keep editing the same way —
edit the JSON/HTML files, re-upload (or push to GitHub, which
auto-redeploys on Netlify/Vercel).

## Going further

If down the line you want non-technical staff to edit content through a
proper dashboard instead of editing JSON files directly, the next step
up is connecting a headless CMS (e.g. Sanity or Strapi) — happy to help
wire that in when you're ready; it would replace the `data/*.json` files
with API calls but keep the rest of the site as-is.
