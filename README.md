# Pavan Kumar Reddy — Portfolio (v2)

A from-scratch personal portfolio for **Palla Pavan Kumar Reddy** — AI student, Python/Flask developer, and IoT builder.

## Design direction

The visual identity is called **"Circuit"** — a PCB-trace signature motif that ties directly to the AI/embedded work in the projects, rather than a generic gradient-and-glass template:

- **Palette:** ink-navy base (`#0a0e14`) with dual signal accents — teal `#35d6c4` and amber `#f0a53d` — instead of a single accent color.
- **Type:** Space Grotesk (display), IBM Plex Mono (labels, data, terminal UI), Inter (body copy).
- **Signature elements:** an animated PCB-style particle/trace canvas background, a vertical "spine" trace that runs down the page and lights up its nodes as you scroll past each section, and a terminal-window hero (typed out live, not a static screenshot).
- **No skill bars / no percentages** on the Skills section, per the brief — categorized cards instead.

This is a hand-built static site (HTML/CSS/JS, no framework, no build step) so it deploys instantly anywhere with zero dependencies to install.

## What's new in this rebuild

- Full re-theme: new color system, typography, and signature circuit-trace motif
- Custom cursor (dot + trailing ring) and mouse spotlight — desktop only, respects `prefers-reduced-motion`
- Animated PCB-style canvas background + scroll-linked "spine" progress trace
- Terminal-style hero with a live-typed intro instead of a static code block
- Tilt hover on skill cards, magnetic buttons, ripple click feedback
- **Command palette (`Ctrl/Cmd + K`)** — jump to any section, open any project case study, or run quick actions (copy email, download resume, toggle theme) without touching the mouse
- **Project case studies**, not just cards: each project opens a tabbed modal — Overview, Problem & Solution, Architecture & Stack, Features, Challenges & Lessons, Timeline & Roadmap — with a screenshot gallery and lightbox
- **Live GitHub stats** pulled client-side from the GitHub REST API: public repo count, followers, total stars, languages used, recent activity feed, and a 26-week repo-activity graph
- Toast notifications for copy actions, form validation, and theme switches
- Inline contact form validation (per-field errors) + Web3Forms integration via `fetch`/`async-await`, ready to send real email once an access key is added
- Copy-to-clipboard buttons for email and phone
- Scroll-spy navigation with numbered section indices, scroll progress bar, back-to-top
- PWA: manifest, service worker (offline shell caching), install-app banner
- Accessibility: skip link, visible focus rings, ARIA labels/roles on all interactive components, reduced-motion support throughout, keyboard support for the project grid, modal, lightbox and command palette (Escape closes all of them)
- SEO: meta tags, Open Graph, Twitter Card, JSON-LD `Person` structured data, `robots.txt`, `sitemap.xml`

## Folder structure

```
portfolio/
├── index.html                  # Full site markup
├── css/
│   └── style.css               # Design tokens, components, motion, responsive rules
├── js/
│   └── main.js                 # All interactivity — see section map below
├── assets/
│   ├── resume.pdf              # ATS-friendly resume (generated, one page)
│   ├── images/
│   │   ├── og-image.png        # Social share preview
│   │   └── projects/           # Case-study cover + gallery mockups (12 images)
│   └── icons/
│       ├── favicon.svg
│       ├── icon-192.png
│       └── icon-512.png
├── manifest.json                # PWA manifest
├── sw.js                        # Service worker (offline shell caching)
├── robots.txt
├── sitemap.xml
└── README.md
```

### `js/main.js` section map

The file is organized top-to-bottom in the order features appear on the page:

`PROJECTS` data → toasts → loader/terminal typing → theme toggle → mobile menu → navbar/scroll-spy/spine → custom cursor/spotlight → circuit canvas background → scroll reveal/counters → tilt cards → magnetic buttons/ripple → copy buttons → project render/filter/search → case-study modal → lightbox → global Escape handler → contact form validation/Web3Forms → GitHub live stats → command palette → PWA install/service worker.

Every feature is a self-contained block with its own DOM lookups, so sections can be lifted out or edited independently.

## Running locally

No build tools required:

```bash
python3 -m http.server 8000
# or
npx serve .
```

Visit `http://localhost:8000`. The service worker only activates over `http://localhost` or `https://`, not `file://`.

## Enabling the contact form (Web3Forms)

The form validates fully client-side already and submits with a plain `fetch()` call — no SDK, no extra script tag. To make it send real email:

1. Go to [web3forms.com](https://web3forms.com/) and generate a free access key with your email address — no account/signup required.
2. In `js/main.js`, replace:
   ```js
   const WEB3FORMS_ACCESS_KEY = "PASTE_ACCESS_KEY_HERE";
   ```
   with your real access key.
3. Redeploy. Until this is set, the form validates and shows a clear status message rather than failing silently or pretending to send.

Submissions post directly to `https://api.web3forms.com/submit` as `FormData` via `async/await` — the visible fields (`user_name`, `user_email`, `subject`, `message`) are kept as-is, and `name`/`email` are added alongside them so Web3Forms populates the sender fields and reply-to correctly. No mail client is ever opened; failures show a toast and log the real error to the console.

## GitHub stats

The GitHub panel calls the public REST API directly from the browser (`api.github.com/users/pavankumarreddy2006`, `.../repos`) — no server or token needed, since it only reads public data. GitHub's unauthenticated rate limit is 60 requests/hour per IP, which is more than enough for portfolio traffic. If it's ever exceeded, the panel fails gracefully with a "check back later" message instead of breaking the page.

## Deployment

Static site, deploys anywhere with zero build step.

**Render (static site):** New → Static Site → connect repo → leave Build Command empty → Publish Directory `.`.

**Vercel:** `vercel` from the project folder — auto-detected as static.

**Netlify:** drag the `portfolio` folder into [app.netlify.com/drop](https://app.netlify.com/drop), or connect the repo with an empty build command.

**GitHub Pages:** push to a repo, enable Pages on the branch/root.

After deploying, update the placeholder domain (`https://pavanpallareddy.dev/`) in `index.html`'s canonical/OG tags, `sitemap.xml`, and `robots.txt` to your real URL.

## Accessibility & performance notes

- All motion (cursor, canvas background, terminal typing, reveal animations) is disabled when the OS-level `prefers-reduced-motion: reduce` is set.
- Custom cursor and mouse spotlight are automatically skipped on touch/coarse-pointer devices.
- The GitHub panel and case-study images use `loading="lazy"` where applicable.
- Every interactive element (cards, modal, lightbox, command palette, copy buttons) is reachable and operable by keyboard, with visible focus states.

## v4 — Web3Forms migration + perf/code-quality pass

- **Replaced EmailJS with Web3Forms.** No SDK/script tag needed — the form now posts directly to `https://api.web3forms.com/submit` via `fetch()` and `async/await`. One access key, one endpoint, fewer moving parts.
- **Timeout handling** — the request aborts after 12s via `AbortController` and shows a clear "request timed out" message instead of hanging indefinitely on a bad connection.
- **Success/error button feedback** — the submit button itself pops into a green "Sent ✓" state for ~1.8s on success, or does a brief shake on failure, alongside the existing toast and status text. Both respect `prefers-reduced-motion`.
- Contact form keeps everything it had before: client-side validation, loading spinner, toast notifications, success/error states, form reset on success, and a guard against duplicate submissions (now held for the full success-animation window, not released early).
- **Perf pass:** scroll and resize listeners now use `{ passive: true }` where they don't call `preventDefault()`, and the circuit-background resize handler is debounced so rapid window resizing doesn't thrash the canvas redraw.
- Validation logic was de-duplicated — field rules now live in one `FIELD_RULES` object instead of being repeated in two places (submit-time and blur-time).

## v3 — Recruiter-focused refinement pass

This pass kept the existing structure, projects, links and resume, and tightened everything for a recruiter audience:

- **Copy pass**: hero and About rewritten shorter and more direct; long paragraphs replaced with a scannable strengths list.
- **"Currently Looking For" section**: added between About and Education — states the actual roles being targeted (AI/ML or full-stack internships, scoped freelance work) with a direct email CTA.
- **Case studies restructured** to the standard format: Overview → Problem → Solution → Tech Stack → Key Features → Challenges → Outcome. Every project now has an honest **Outcome** tab (what's actually working, what isn't, no invented metrics) and a row of **factual metric chips** (status, hosting, hardware, pipeline stage — nothing fabricated).
- **Open Source section**: links directly to the public repos referenced elsewhere on the site, framed honestly (two verifiable links, not a padded list).
- **FAQ section**: native `<details>/<summary>` accordion, zero extra JS, fully keyboard/screen-reader accessible.
- **Footer rebuilt** with real quick-navigation columns (Site / Resources / Contact) instead of a single link row.
- **Contact section**: added a one-line CTA above the form clarifying the fastest way to reach out.
- **Resume regenerated** to match: tighter professional summary, achievement-oriented bullets (what was built/solved, not vague responsibilities), tech stack listed per project, still exactly one page and ATS-plain (no tables, no icons, no columns the parser could choke on).

### Deliberately not added
- **Testimonials** — no real ones exist yet, so none were faked. Revisit when there's a genuine quote to use.
- **A separate "Development Timeline" section** — there's no reliable dated history for these projects (durations are known, exact start/end dates aren't), so a chronological timeline would have meant inventing dates. The Education timeline and each case study's Outcome/Timeline tab cover this honestly with the information that's actually available.

---
© 2026 Palla Pavan Kumar Reddy
#   P a v a n _ K u m a r _ R e d d y _ P o r t f o l i o  
 