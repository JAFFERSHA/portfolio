# portfolio — project guide for Claude

Personal portfolio of Syed Jaffer Sha. Plain HTML + CSS + JavaScript — **no framework, no build step, no backend, no database.**

- Live: Vercel project `portfolio` (auto-deploys on push to `main`; also `.github/workflows/vercel-deploy.yml`)
- Skills: `/implement-ticket`, `/pr-review` (in `.claude/skills/`) — DB/schema steps never apply here.

## Files
- `index.html` — sections: `#home` (hero), `#about`, `#experience`, `#projects`, `#skills`, `#certifications`, `#contact`
- `style.css` — all styles (CSS variables, responsive breakpoints, reduced-motion support)
- `script.js` — preloader, starfield canvas, 3D photo tilt, custom cursor, magnetic buttons, typing effect, counters, scroll animations, mobile menu
- `assets/img/` images · `docs/` README preview screenshots · `vercel.json` (static, `cleanUrls`)

## Commands
- Run locally: `npx serve -l 3000 .` → http://localhost:3000
- No package.json, no dependencies — don't add a framework or bundler unasked.

## Gates (instead of tsc/lint/build)
1. HTML sanity: every opened section/div closed; no broken `id`/anchor links (`#...` hrefs match a section id).
2. No JS errors in the browser console on load and while scrolling (LOCAL: check with Playwright or the browser).
3. Layout at desktop (1440px) and phone (390px) widths; `prefers-reduced-motion` still works.
4. All image paths in `assets/` exist (`git ls-files assets`).

## Surfaces
Every section above, the mobile menu, animations on scroll, contact links, page `<title>`/meta tags, README previews.

## Smoke flows
Page loads past the preloader → nav links scroll to each section → mobile menu opens/closes → contact links work.

## Gotchas
- Content is personal (name, experience, contact) — only change text the request asks for.
- Keep animations respecting `prefers-reduced-motion`.
