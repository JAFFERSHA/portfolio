# Jaffer Sha — Portfolio

An animated personal portfolio site built with plain HTML, CSS and JavaScript. There are no frameworks and no build step.

![Desktop preview](docs/preview-hero.png)
![Mobile preview](docs/preview-mobile.png)

## Features
- Preloader with a progress counter, and a hero name that animates in letter by letter
- Starfield background that drifts with the cursor and draws lines to nearby stars
- Profile photo that tilts in 3D and catches a glare toward the cursor (tilt sensor on phones)
- Speech bubble that changes its message depending on where the cursor is
- Custom cursor, magnetic buttons, cards that tilt under the cursor, and an animated "Open to work" badge
- Typing effect for job titles, a scrolling tech-stack banner, number counters, skill bars and a timeline that fills as you scroll
- Responsive layout with a mobile menu, and support for the reduced-motion setting

## Make it yours
Edit `index.html` and replace these placeholders:
- **Experience** (`#experience`): company names, dates and what you achieved
- **Projects** (`#projects`): titles, descriptions, and `Code`/`Live` links
- **Skills** (`#skills`): the `data-level="90"` value on each bar
- **Contact**: `you@example.com` and your LinkedIn URL
- **Stats** (About section): the `data-count` values
- **Résumé**: put your PDF at `assets/resume.pdf`

The typing job titles are in the `ROLES` array at the top of `script.js`.
Photos are in `assets/img/` (`profile.jpg` for the hero, `working.jpg` for About).

## Run locally
Open `index.html` in a browser, or run:
```bash
python3 -m http.server 3000   # then open http://localhost:3000
```

## Deploy free on GitHub Pages
Go to repo **Settings → Pages**, set Source to **Deploy from a branch**, pick the branch and `/ (root)`, then save.
The site will be live at `https://jaffersha.github.io/portfolio/`.
