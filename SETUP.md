# Setup — Line Morelle portfolio + CMS

One Next.js app. Public site at `/`, CMS at `/cms`.

| Area | Local URL |
|---|---|
| Public site | http://localhost:3000 |
| CMS | http://localhost:3000/cms |

The public site has **no admin routes and no link to the CMS**.

---

## 1. Create a Supabase project

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard) and create a project (region close to you).
2. Wait until the database is ready.
3. Open **Project Settings → API** and copy:
   - Project URL
   - `anon` `public` key
   - `service_role` key (server only — never put this in `NEXT_PUBLIC_` vars)

---

## 2. Run the SQL schema

1. Open **SQL Editor** in Supabase.
2. Paste the entire contents of `supabase/schema.sql` and run it.
3. This creates tables, RLS, the public `media` bucket, and seeds the current site copy.

---

## 3. Environment variables

Copy `.env.example` to `.env.local` and fill in:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

RESEND_API_KEY=re_xxxxxxxxx
CONTACT_TO_EMAIL=hello@linemorelle.com
CONTACT_FROM_EMAIL=Line Morelle <noreply@your-verified-domain.com>
```

`SUPABASE_SERVICE_ROLE_KEY` is used by `/api/contact` to insert messages and by the seed script. It must never be exposed to the browser.

---

## 4. Auth — single admin, no public sign-up

1. **Authentication → Providers → Email**: enable Email.
2. **Authentication → Providers**: turn **off** any social providers you do not need.
3. **Authentication → Sign Up / Settings**:
   - Disable public sign-ups / "Allow new users to sign up".
   - Confirm email can stay on or off for a single private account; off is simpler.

Then run the seed script to create the admin user:

```bash
node supabase/seed-admin.mjs
```

This reads `.env.local` automatically and creates the auth user + `admin_users` row.

Default credentials (change after first login):
- Email: `hello@linemorelle.com`
- Password: `LM-Adm1n!Tmp2026#Xk`

Override with `ADMIN_EMAIL` and `ADMIN_PASSWORD` env vars if needed.

---

## 5. Storage check

1. **Storage** should list a bucket named `media`, **public**.
2. Policies from the SQL file allow:
   - Anyone to **read**
   - Only the admin user to **upload / update / delete**

If the bucket is missing, create it named `media`, set it public, and re-run the storage policy section of `supabase/schema.sql`.

---

## 6. Resend (contact emails)

1. Create an account at [https://resend.com](https://resend.com).
2. Verify a sending domain (or use Resend's onboarding address for tests).
3. Create an API key and set `RESEND_API_KEY`.
4. `CONTACT_FROM_EMAIL` must be from that verified domain.
5. `CONTACT_TO_EMAIL` is Line's inbox.

The contact form still **saves the message in Supabase** even if email sending fails. If Resend vars are missing, the visitor still gets success after a successful database insert.

Spam protection on `/api/contact`:

- Honeypot field (`company`)
- Minimum 2 seconds on the page before submit
- Length and email validation

---

## 7. Run locally

```bash
npm install
npm run dev
```

- Site: http://localhost:3000
- CMS: http://localhost:3000/cms (sign in with Line's email/password)

Until env vars are set, the public site keeps the current design using **built-in fallback copy** and image placeholders.

---

## 8. Deploy

Example with Vercel (any host that runs Next.js is fine).

1. New Vercel project → root directory `.`
2. Add all env vars (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, Resend keys).
3. Domain: `linemorelle.com`

In Supabase **Authentication → URL configuration**:

- Site URL: `https://linemorelle.com`
- Redirect URLs: `https://linemorelle.com/**` and `http://localhost:3000/**`

The CMS sets `noindex` via metadata and is excluded from crawlers via `robots.ts`. Do **not** add `/cms` to a sitemap.

---

## 9. First-time CMS checklist

1. Sign in at `/cms`.
2. **Home** — confirm hero text; upload portrait when you have it.
3. **Projects** — covers, featured flag, sort order.
4. **Settings** — phone, location, CV PDF, philosophy image.
5. Submit a test message on the public Contact page and confirm it in **Messages**.
