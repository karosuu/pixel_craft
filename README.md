# Pixel-Craft

Bilingual marketing site for **Pixel-Craft** (English default, Spanish at `/es`). Built with Astro and Tailwind CSS.

The brand name stays **Pixel-Craft** in both languages.

## Local development

```sh
npm install
npm run dev
```

Then open `http://localhost:4321`.

| Command           | Action                             |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Dev server                         |
| `npm run build`   | Production build to `./dist/`      |
| `npm run preview` | Preview the production build       |

## Languages and routes

English is unprefixed. Spanish uses `/es/` and translated slugs.

| Page     | English     | Spanish            |
| -------- | ----------- | ------------------ |
| Home     | `/`         | `/es`              |
| Services | `/services` | `/es/servicios`    |
| Work     | `/work`     | `/es/proyectos`    |
| About    | `/about`    | `/es/nosotros`     |
| Contact  | `/contact`  | `/es/contacto`     |

`/en/*` redirects to the unprefixed English URL.

Copy lives in `src/i18n/copy.ts`. Paths and the inbox address live in `src/i18n/config.ts`.

## Admin CRM

Private panel (not on `main` yet): work on branch `feat/admin-crm` and see [`admin/README.md`](admin/README.md). Local: `cd admin && npm install && npm run dev`. Live URL: `https://pixel-craft.dev/admin`.

## Contact form

With `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_ANON_KEY` set (see [`.env.example`](.env.example)), the contact form POSTs to the Supabase Edge Function `capture-lead`, which creates a CRM client + `presupuesto` project and emails `info@pixel-craft.dev` via Resend. GitHub Pages deploy reuses `VITE_SUPABASE_*` if the `PUBLIC_*` secrets are empty.

If those env vars are missing, the form falls back to [FormSubmit](https://formsubmit.co) → `CONTACT_EMAIL` in `src/i18n/config.ts`. The same fallback runs if `capture-lead` fails, so the inbox still gets the brief.

## Deploy

`site` is `https://pixel-craft.dev` and `base` is `/` in `astro.config.mjs`.

- **Custom domain (this project):** leave `base: '/'`.
- **GitHub project Pages** (`username.github.io/repo/`): set `base: '/repo/'` and `site` to `https://username.github.io`.

The workflow in `.github/workflows/deploy.yml` builds the marketing site, builds `admin/` with base `/admin/`, copies it to `dist/admin/`, and publishes that to GitHub Pages. Enable Pages in the repo settings (Source: GitHub Actions) and set the custom domain to `pixel-craft.dev`.

The CRM URL is `https://pixel-craft.dev/admin`. See [`admin/README.md`](admin/README.md). The old TDM subdomain workflow is manual-only.

If you host on Vercel or Netlify instead, you can ignore that workflow.

## SEO and Google

The build emits `robots.txt` and `sitemap-index.xml`. HTTPS is live at `https://pixel-craft.dev`.

1. Open [Google Search Console](https://search.google.com/search-console).
2. Add a **URL prefix** property: `https://pixel-craft.dev`.
3. Choose **HTML tag**, copy the `content` value, and paste it into `GOOGLE_SITE_VERIFICATION` in `src/i18n/config.ts`.
4. Commit, push, and wait for the deploy.
5. Click **Verify**.
6. Sitemaps → Add sitemap: `sitemap-index.xml` (full URL: `https://pixel-craft.dev/sitemap-index.xml`).
7. URL inspection → `https://pixel-craft.dev/` → **Request indexing**.

The search result icon uses `favicon-48.png` (48×48) and can take days or weeks to appear.
