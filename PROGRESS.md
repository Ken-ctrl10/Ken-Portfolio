# Modernization Progress

Record of the modernization pass on `ken-portfolio` (React 19 + Vite 8, deployed
to Vercel). Newest work at the top.

---

## Round 2 — Certificate gallery, About restructure, contact form

### 1. Certificates: marquee → filterable gallery

All 46 certificate images were read and transcribed into
[`src/data/certificates-data.js`](src/data/certificates-data.js) with issuer,
title, date, duration, instructor, and type.

**Six issuers**, not the two assumed:

| Issuer | Count |
|---|---|
| Udemy | 21 |
| Cognizant Learning & Development | 11 |
| DICT (Philippine Dept. of ICT) | 7 |
| Cisco Networking Academy | 3 |
| IBM SkillsBuild | 3 |
| Laguna University | 1 |

**213.1 documented hours.** `cert-14` turned out to be an *award* — Best Student
Research Paper for FILWA at the 2nd Regional Research Conference — not a course,
and is flagged `type: "award"`.

The infinite marquee was replaced with:

- a stats bar (46 certificates / 213 hours / 6 issuers)
- a highlights row for the award and the substantial courses
- issuer filter chips with live counts
- a grid of the rest, click-to-enlarge in a MUI `Dialog`

Full-resolution copies live in `public/certificates/full/` and are **only fetched
when a certificate is opened**, so the 1.9 MB of large scans cost nothing on load
(verified: 0 requests before a click, 1 after).

### 2. About: six blocks → four

The section was six stacked cards of identical visual weight with four
consecutive list-shaped blocks. Restructured by purpose:

| Block | Contents |
|---|---|
| **Profile** | Story + career snapshot merged (they answered the same question) |
| **Focus** | Skills as MUI `Chip`s instead of `<ul>` bullets, matching the project cards |
| **Journey** | A real vertical rail with markers, not a numbered list |
| **Certificates** | The gallery above |

"How I Work" was cut — five first-person affirmations that partly repeated the
story card, now redundant next to 46 certificates of actual evidence.

### 3. Contact: form + copy-to-clipboard

- [`api/contact.js`](api/contact.js) — a Vercel serverless function posting to
  Resend's REST API via `fetch` (no SDK, so no new dependency). Server-side
  validation, text-only body, `reply_to` set to the sender.
- `ContactForm` leads the section: the only channel that needs neither leaving
  the site nor a configured mail client.
- `EmailCard` has a copy button, because a bare `mailto:` silently does nothing
  on a desktop with no mail client — a dead end for exactly the visitors who
  matter. Falls back to selecting the address when the clipboard API is blocked,
  and now says so rather than selecting silently.
- Instagram removed from the contact row.

**Setup still required** (the form returns a friendly "not configured" error
until then). In the Vercel dashboard, add:

```
RESEND_API_KEY      from resend.com
CONTACT_TO_EMAIL    where messages should land
CONTACT_FROM_EMAIL  e.g. "Portfolio <onboarding@resend.dev>"
```

`/api/contact` does not exist under `vite dev` — only on Vercel, or under
`vercel dev`. Locally the form correctly shows its error state.

### Bugs found and fixed in this round

1. **Reveal broke on tall sections.** `useInView` used `threshold: 0.15`, so 15%
   of an element had to be visible. The gallery is ~7000px tall on a phone —
   15% of it exceeds the viewport, so the threshold could never be met and the
   whole section stayed at `opacity: 0`. Now `threshold: 0`. Desktop-only testing
   had hidden this.
2. **Viber QR was off-centre** — MUI's `Dialog` paper is a flex column, so the
   `text-align: center` that used to centre it no longer applied. Needed
   `align-self: center`. (Caused by the round 1 Dialog migration.)
3. **Snapshot strip rendered unstyled.** A cleanup regex, `\.about-snapshot\b`,
   matched `.about-snapshot-strip` — a hyphen counts as a word boundary — and
   deleted the new rules moments after they were written.
4. **Timeline rail sat 6px off its markers.** A stale `.about-timeline ol` rule
   outranked `.timeline-rail` on specificity (element+class beats class), forcing
   `padding-left` back to 1.2rem.
5. **ESLint had no Node config**, so `process` in `api/contact.js` failed
   `no-undef`. Added a config block for `api/**` and `scripts/**`.

### Note

The clipboard test appeared to fail in headless Chrome
(`NotAllowedError: Write permission denied`). That is a headless limitation, not
a defect — the fallback correctly selected the address. Real browsers with a user
gesture use the clipboard path.

### Cost

JS grew 421 KB → 483 KB (134 → 153 KB gzip) from the form inputs and gallery
chrome. `dist` is 3.6 MB, but 1.9 MB of that is lightbox scans never fetched on
load.

---

## Round 1 — Performance, theming, accessibility

### Why

The React port was structurally sound (data-driven, sensible component split,
real ARIA on sections), so this was an upgrade rather than a rescue. Three things
were actively hurting the site:

- it shipped **~16 MB of unoptimized images**
- dark mode **flashed light on every page load**
- the `<head>` had **no social metadata**, so the link rendered as a blank grey
  card when shared on LinkedIn — the main channel for a job-seeking portfolio

Underneath, dark mode was ~65 lines of hardcoded per-selector overrides that had
to be extended by hand for every new component, and MUI was installed but barely
used, so its components fought the existing CSS instead of inheriting from it.

### Headline result

| | Before | After |
|---|---|---|
| Production `dist/` | **17 MB** | **1.6 MB** (−91%) |
| Hero image (LCP) | 2.35 MB | 74 KB |
| Certificates | 11 MB, 82 eager `<img>` | 620 KB, lazy-loaded |
| JS bundle | 318 KB (102 KB gzip) | 412 KB (132 KB gzip) |

The JS increase is the deliberate cost of leaning into MUI (Drawer, Dialog, Chip,
Tooltip) and is dwarfed by the ~15 MB of images removed.

---

### 1. Image pipeline

- Added `sharp` as a **devDependency** plus [`scripts/optimize-images.mjs`](scripts/optimize-images.mjs)
  and an `npm run optimize:images` script.
- Every image converted to **WebP**, resized to ~2x its actual rendered CSS size
  (measured from the stylesheets, not guessed).
- Originals moved to **`_originals/`** — outside `public/` and `src/`, so Vite
  neither bundles nor deploys them, but they stay in the repo for re-export.
- The script is **idempotent**: originals are archived on first run and re-read
  on every run after, so images are never re-compressed.
- Generates a **1200x630 `og-image.jpg`** social card (cream ground, portrait,
  name and role) as part of the same run.

### 2. Lazy loading — and the marquee problem it created

The certificate marquee renders the array **doubled** for a seamless loop, so it
was mounting **82 `<img>` tags eagerly** and pulling all 11 MB.

Naive `loading="lazy"` would have **broken the animation**: `.certificate-scroller img`
used `width: auto`, and the `@keyframes cert-scroll` loop depends on
`translateX(-50%)` being exactly half the track width. Unloaded lazy images have
width 0, so the track would collapse and jump.

Fix: the scans range from **1.28 to 1.54 aspect ratio** (no shared ratio), so they
are letterboxed into a fixed **4:3 box with `object-fit: contain`**. Width became
deterministic regardless of load state.

*Verified in-browser:* both halves measure **exactly 9200 px**.

Then added `loading="lazy"`, `decoding="async"` and explicit `width`/`height` to
every image sitewide (previously **zero** images had any of these). The hero
stays eager with `fetchpriority="high"`.

*Verified:* 100 images, 93 lazy / 7 eager, **0 missing dimensions**.

### 3. `<head>` metadata

Added meta description, canonical, full Open Graph set, Twitter
`summary_large_image`, per-scheme `theme-color`, and author.

> **Outstanding:** the OG/canonical URLs currently use a **placeholder**
> (`https://ken-portfolio-kappa.vercel.app/`). These must be absolute, so the
> social preview will not work until the real Vercel URL is filled in.

### 4. Theme flash eliminated

`App.jsx` read `localStorage` into React state, so first paint was always light
and then snapped. It also ignored `prefers-color-scheme`, sending every
first-time visitor to light regardless of their OS.

Fixed with an **inline script in `index.html`** that sets a `light-mode` /
`dark-mode` class on `<html>` before the app bundle runs, using MUI's own storage
keys so `useColorScheme()` stays in sync.

> Note: MUI's `InitColorSchemeScript` is **not** usable here. It is built for SSR
> — in a Vite SPA it renders inside the React tree, which is after first paint.

*Verified:* `<html lang="en" class="dark-mode">` present before the bundle runs.

### 5. Token-based theming

Replaced ~65 lines of `.app-shell.dark-mode .a, .dark-mode .b { … }` overrides
with semantic tokens defined once on `:root` — `--surface`, `--surface-raised`,
`--surface-sunken`, `--text`, `--text-muted`, `--text-subtle`, `--border`,
`--border-strong`, `--shadow`, `--overlay`, `--hover`.

`.dark-mode` now overrides **only token values** (~15 lines). No component has a
dark-mode-specific rule any more. 26 hex values and 33 rgba values were migrated;
deliberate brand colors (LinkedIn, Instagram, Viber, GitHub) were left alone.

### 6. Font loading

Google Fonts moved from a CSS `@import` (the slowest option — it cannot start
until the stylesheet is fetched and parsed) to `preconnect` + `<link>` in
`index.html`. Roboto trimmed from the **full 100–900 italic variable range** to
the four weights actually used.

Also introduced `--font-display` / `--font-body` tokens and moved buttons off the
display face — Koulen is single-weight all-caps and was hard to read at 0.95rem.

### 7. MUI, properly wired

- Added [`src/theme.js`](src/theme.js): both color schemes mapped to the
  cream/olive palette, with `colorSchemeSelector: ".%s-mode"` matching the
  stylesheet.
- Wrapped the app in `ThemeProvider` + `CssBaseline`.
- **`ViberModal` → `Dialog`** and **mobile nav → `Drawer`**. Both hand-rolled
  versions had correct ARIA but **no focus trap, no Escape handler, and no focus
  restoration**. *Verified:* focus moves inside the drawer on open.
- Tech tags → `Chip`; theme toggle → `IconButton` + `Tooltip`.

### 8. Motion and reduced motion

- Added [`src/hooks/useInView.js`](src/hooks/useInView.js) (IntersectionObserver)
  and a `Reveal` wrapper for staggered scroll reveals. No motion library.
- **`prefers-reduced-motion` was honored nowhere**, while an infinite typing loop
  and an infinite 50s marquee ran forever. Both now stop, and reveals resolve to
  visible.
- Added a `@media print` override — printing never scrolls, so without it every
  un-revealed section would have printed blank.

*Verified under reduced motion:* typing renders complete, `animationName: none`
on the marquee, 0 hidden reveals.

---

### Bugs found and fixed along the way

1. **`cert-42` … `cert-46` never displayed.** `about-data.js` generated 41 paths
   for 46 existing files — 5 certificates were deployed but invisible. All 46 now
   render.
2. **GitHub buttons invisible in dark mode.** Both the hero button and the
   contact icon used `#181c14`, *identical* to the dark-mode page background.
   Both now invert through tokens.
3. **`target="false"` on internal links.** `target={item.external && "_blank"}`
   renders the literal string `"false"` when `external` is undefined.
4. **Latent dark-mode contrast bugs.** Rules like `.focus-card h4` had never been
   added to the old dark-mode override list, so they stayed near-black on a dark
   card. Tokenizing fixed these as a side effect.
5. **Typing effect a11y.** `aria-label` on a `<p>` is not reliably announced; the
   animating text is now `aria-hidden` with the full role exposed once via
   visually-hidden text, so screen readers do not hear it character by character.
6. **Regression caught during verification:** adding `CssBaseline` made MUI emit
   its own `body { font-family }`, which silently killed Koulen sitewide. The
   build was green — this was only found by checking computed styles in a real
   browser. Fixed with a `MuiCssBaseline` override.

### Also

- Replaced the stock Vite template README with a real project README.
- Fixed the `<TimelineSection/ >` spacing typo.

---

### Verification performed

Driven in real headless Chrome (via `puppeteer-core` installed to a scratch
directory, **not** added to this project):

| Check | Result |
|---|---|
| `npm run build` / `npm run lint` | pass, clean |
| Console / page / failed-request errors | none |
| `light-mode` / `dark-mode` class on `<html>` | correct in both schemes |
| Scroll reveals stuck hidden | 0 (light + dark, desktop + mobile) |
| Marquee half-widths | 9200 px === 9200 px |
| Drawer focus trap | focus moves inside |
| Images missing dimensions | 0 / 100 |
| Mobile header/hero overlap | none (hero top 582 > header bottom 59) |
| `_originals/` leaked into `dist/` | no |

---

### Known / outstanding

- **Real Vercel URL still needed** for the OG and canonical tags (see §3).
- `_originals/` is ~17 MB and will be committed. This was a deliberate choice
  (keep originals, exclude from deploy); the PNGs are already in git history
  either way.
- 3 `npm audit` warnings are **pre-existing dev-only transitives** (Vite's
  postcss/nanoid, ESLint's brace-expansion). Left alone rather than bundling an
  unrelated `audit fix` into this change.
- `src/assets/images/coming-soon.jpg` (1.2 MB) is unreferenced. Vite already
  excludes it from the build, so it costs nothing at runtime; left in place.

### Not done (deliberately out of scope)

Routing (the single-page anchor scroll is good UX here), TypeScript migration,
and any visual redesign — palette, layout, and content were kept as they were.
