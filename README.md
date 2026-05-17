# Aayan Karasu Portfolio

Premium dark portfolio website for Aayan Karasu, built for job applications and freelance clients.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- Client-side GitHub repository fetching

## Project Structure

```txt
src/
  app/
    about/page.tsx
    contact/page.tsx
    experience/page.tsx
    projects/page.tsx
    services/page.tsx
    skills/page.tsx
    globals.css
    layout.tsx
    page.tsx
  components/
    contact-form.tsx
    footer.tsx
    motion.tsx
    navbar.tsx
    page-shell.tsx
    project-explorer.tsx
  lib/
    site-data.ts
```

## Setup

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
```

The build exports static files into `out/`, including `CNAME` and `.nojekyll` for GitHub Pages.

## Deploy on Vercel

1. Push this project to a GitHub repository.
2. Open Vercel and choose `New Project`.
3. Import the repository.
4. Keep the default framework setting as `Next.js`.
5. Click `Deploy`.
6. Add `aayankarasu.fun` in Vercel under Project Settings > Domains.

No backend or environment variables are required.

## Deploy on GitHub Pages

This repo includes `.github/workflows/pages.yml`.

1. Push to the `main` branch.
2. In GitHub, open Settings > Pages.
3. Set Build and deployment to `GitHub Actions`.
4. Keep the custom domain as `www.aayankarasu.fun`.

The workflow runs `npm ci`, builds the static Next.js export, and publishes `out/`.
