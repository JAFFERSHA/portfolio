# Syed Jaffer Sha — Portfolio

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

## Editing content
All content is in `index.html`, grouped by section (`#about`, `#experience`, `#projects`, `#skills`, `#certifications`, `#contact`).
The typing job titles are in the `ROLES` array at the top of `script.js`.
Photos are in `assets/img/`.

## Run locally
Open `index.html` in a browser, or run:
```bash
python3 -m http.server 3000   # then open http://localhost:3000
```

## Deploy to Vercel (GitHub Actions)
`.github/workflows/vercel-deploy.yml` deploys **production on every push to `main`** and a **preview for every pull request**.
Until the secrets below exist, the workflow skips the deploy instead of failing.

One-time setup:
1. Create a token at https://vercel.com/account/tokens.
2. Get the project IDs: in Vercel → *portfolio* project → **Settings → General**, copy the **Project ID**. For the team or account ID, use **Team/Account Settings → General → ID**.
   You can also run `vercel link` in this folder and read `.vercel/project.json`.
3. In GitHub → repo **Settings → Secrets and variables → Actions → New repository secret**, add:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`
4. Go to **Actions → Deploy to Vercel → Run workflow** (or push to `main`).
