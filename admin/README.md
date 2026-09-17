# Admin CRM (Pixel-Craft)

Panel privado en `https://pixel-craft.dev/admin`. Misma app, mismos datos de Supabase; el build de producción vive bajo `/admin/`.

Trabaja en la rama `feat/admin-crm`, no en `main`.

## 1. Local

```sh
cd admin
cp .env.example .env
npm install
npm run dev
```

Abre `http://localhost:5173`. Hasta que existan las keys de Supabase verás la pantalla de configuración.

`npm run build` genera el panel con `base` `/admin/` (URL de producción). `npm run preview` queda en `http://localhost:4173/admin/`.

## 2. Supabase

1. Crea un proyecto en [Supabase](https://supabase.com).
2. SQL Editor → pega y ejecuta [`supabase/schema.sql`](supabase/schema.sql).
3. Si el proyecto ya existía antes de fechas/dinero/actividades, ejecuta también [`supabase/crm-ops.sql`](supabase/crm-ops.sql).
4. Para que el icono de formularios se actualice al instante (sin esperar el poll), ejecuta [`supabase/realtime-projects.sql`](supabase/realtime-projects.sql).
5. Authentication → Users → Add user (correo y contraseña del administrador).
6. En SQL Editor:

```sql
insert into public.admins (user_id, email)
select id, email from auth.users where email = 'TU_CORREO';
```

7. Project Settings → API: copia **Project URL** y **anon public** a `admin/.env`:

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

## 3. Resend (enviar correos)

1. Crea cuenta en [Resend](https://resend.com) y verifica el dominio `pixel-craft.dev`.
2. En TDM → Zone Editor de `pixel-craft.dev`, agrega los TXT/CNAME que muestre Resend.
3. **No borres ni cambies los MX.** El buzón `info@` y `webmail.pixel-craft.dev` se quedan en TDM.
4. En Supabase → Edge Functions → secrets:

| Secret | Valor |
| --- | --- |
| `RESEND_API_KEY` | API key de Resend |
| `MAIL_FROM` | `Pixel-Craft <info@pixel-craft.dev>` |
| `LEAD_NOTIFY_TO` | `info@pixel-craft.dev` (opcional) |

`SUPABASE_URL`, `SUPABASE_ANON_KEY` y `SUPABASE_SERVICE_ROLE_KEY` ya existen en el proyecto.

5. Desde `admin/`:

```sh
npx supabase login
npx supabase link --project-ref TU_PROJECT_REF
npx supabase functions deploy send-email --no-verify-jwt=false
npx supabase functions deploy capture-lead --no-verify-jwt
```

`capture-lead` es pública (solo anon key + honeypot + rate limit) y crea clientes/proyectos desde el formulario del sitio.

Tras cambiar CORS de `send-email` (orígenes de `pixel-craft.dev`), vuelve a desplegar esa function.

En Authentication → URL configuration, agrega:

- `http://localhost:5173`
- `https://pixel-craft.dev/admin`
- `https://pixel-craft.dev/admin/login`

El subdominio `https://admin.pixel-craft.dev` se puede quitar cuando `/admin` ya esté en producción.

## 4. Formulario del sitio → CRM

En la raíz del repo (marketing):

```
PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

Copia desde [`.env.example`](../.env.example). En GitHub Actions, si `PUBLIC_SUPABASE_*` no están, el deploy reutiliza `VITE_SUPABASE_*` (las mismas del admin). Si en el build siguen vacías, el contacto usa FormSubmit y el lead no entra al CRM.

En GitHub → Settings → Secrets and variables → Actions, agrega `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`. `PUBLIC_SUPABASE_*` es opcional si esas dos ya existen.

## 5. Publicar en GitHub Pages

El workflow [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) construye el sitio y el CRM, copia `admin/dist/` a `dist/admin/` y publica `https://pixel-craft.dev/admin`.

Secrets del repo (Settings → Secrets and variables → Actions):

| Secret | Uso |
| --- | --- |
| `VITE_SUPABASE_URL` | Build del admin y, si faltan las `PUBLIC_*`, también el formulario de contacto |
| `VITE_SUPABASE_ANON_KEY` | Misma anon key del proyecto |
| `PUBLIC_SUPABASE_URL` | Opcional; si está vacía, el deploy usa `VITE_SUPABASE_URL` |
| `PUBLIC_SUPABASE_ANON_KEY` | Opcional; si está vacía, el deploy usa `VITE_SUPABASE_ANON_KEY` |

`public/404.html` reenvía `/admin/*` al SPA (GitHub Pages no usa `.htaccess`). El `robots.txt` del sitio bloquea `/admin`.

Cuando `/admin` funcione, puedes apagar el subdominio en TDM (DNS + carpeta `/admin.pixel-craft.dev`). No borres la carpeta `admin/` del repo: es el código del CRM.

El workflow [`.github/workflows/deploy-admin.yml`](../.github/workflows/deploy-admin.yml) ya no corre en cada push. Solo **Run workflow** a mano, con `npm run build:subdomain`, si hace falta el subdominio otra vez.

## 6. Seguridad

- No enlaces el admin desde el sitio público.
- `robots.txt` y `noindex` evitan buscadores.
- Solo correos en la tabla `admins` pueden entrar.
- La API key de Resend nunca va al navegador.
- `capture-lead` usa service role solo en el servidor de la Edge Function.
