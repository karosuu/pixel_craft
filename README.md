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

## Contact form

The contact form POSTs to [FormSubmit](https://formsubmit.co) and delivers messages to `CONTACT_EMAIL` in `src/i18n/config.ts` (currently `info@pixel-craft.dev`).

The first submission sends a confirmation email to that inbox. Open it and confirm the address before live inquiries will arrive.

## Deploy

`site` is `https://pixel-craft.dev` and `base` is `/` in `astro.config.mjs`.

- **Custom domain (this project):** leave `base: '/'`.
- **GitHub project Pages** (`username.github.io/repo/`): set `base: '/repo/'` and `site` to `https://username.github.io`.

The workflow in `.github/workflows/deploy.yml` builds `dist/` and publishes it to GitHub Pages. Enable Pages in the repo settings (Source: GitHub Actions) and set the custom domain to `pixel-craft.dev`.

If you host on Vercel or Netlify instead, you can ignore that workflow.
