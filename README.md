# SCRM Media Real Estate

Marketing site for **SCRM Media Real Estate** — a premium content and marketing studio for luxury real estate agencies, top-performing agents, and boutique developers across Australia.

Built with **Next.js 15** (App Router) · **TypeScript** · **Tailwind CSS** · **Supabase** · deployed on **Vercel**.

---

## Local development

```bash
# 1. install dependencies
npm install

# 2. copy env template and fill in your Supabase keys
cp .env.example .env.local

# 3. start the dev server
npm run dev
```

Site runs on `http://localhost:3000`.

If you skip the Supabase step, the contact form will still work locally — submissions are logged to the browser console instead of being saved.

---

## Project structure

```
public/
  logo.png                  ← drop your logo here (replaces text logo)
  og.jpg                    ← 1200x630 OG image for social shares
  media/
    listings/               ← listing photography (PNG)
    landscape/              ← horizontal listing videos (MP4)
    vertical/               ← vertical reels (MP4)
    agency/                 ← agency / team videos (MOV)
src/
  app/
    layout.tsx              ← root shell, metadata, JSON-LD
    page.tsx                ← Home
    services/page.tsx
    packages/page.tsx
    work/page.tsx
    about/page.tsx
    contact/page.tsx
  components/
    Header.tsx              ← desktop nav + mobile drawer
    TopBar.tsx              ← cross-brand strip with Automotive button
    Footer.tsx              ← 4-col footer
    WhatsAppFab.tsx         ← floating WhatsApp button
    GlitchTransition.tsx    ← CRT glitch animation when Automotive clicked
    Logo.tsx                ← text-based logo placeholder
    ContactForm.tsx         ← Supabase-wired enquiry form
    WorkGallery.tsx         ← filterable masonry gallery
    FAQAccordion.tsx
    ui.tsx                  ← Container, Section, CTAButton, Eyebrow, H2
  lib/
    site.ts                 ← brand constants (phone, email, URLs)
    supabase.ts             ← Supabase client (no-op when env missing)
supabase/
  schema.sql                ← run once in the Supabase SQL editor
```

---

## Supabase setup

1. Create a new Supabase project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** and run [`supabase/schema.sql`](./supabase/schema.sql) — this creates the `contact_submissions` table with row-level security and a public-insert policy.
3. From **Project Settings → API**, copy the **Project URL** and the **anon public key**.
4. Add both to `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
NEXT_PUBLIC_SITE_URL=https://scrmrealestate.com.au
```

5. Submissions appear in **Table Editor → contact_submissions** in the Supabase dashboard.

---

## Deploying to Vercel

1. Push this folder to a GitHub repo (`scrmrealestate` recommended).
2. In Vercel: **Add New → Project → Import** that repo.
3. Framework will be auto-detected as Next.js.
4. Add the three env vars from above under **Environment Variables**.
5. Deploy.
6. Once your domain `scrmrealestate.com.au` is registered, add it under **Project Settings → Domains** and follow the DNS instructions.

Subsequent pushes to `main` will auto-deploy.

---

## Brand tokens

| Token             | Hex      | Use                                    |
| ----------------- | -------- | -------------------------------------- |
| `re-blue`         | #1C3A5E  | Primary brand, headers, dark sections  |
| `re-ivory`        | #F8F6F1  | Page background                        |
| `re-ink`          | #1A1A1A  | Body text                              |
| `re-stone`        | #8A8680  | Secondary text                         |
| `re-stone-light`  | #E8E5DF  | Borders, dividers                      |
| `re-blue-accent`  | #3B6FAA  | Labels, highlights                     |
| `re-blue-light`   | #EDF2F8  | Info panels                            |
| `re-gold-thin`    | #C4A96C  | Accent moments (badges)                |

Fonts: **Cormorant Garamond** (display) and **Inter** (everything else), both loaded via `next/font/google`.

---

## Replacing the placeholder logo

The current logo is a text/SVG render of "scrm media — REAL ESTATE" in `src/components/Logo.tsx`.

To use the proper PNG/SVG you sent:

1. Drop the file into `public/logo.png` (transparent or black background).
2. Replace the body of `Logo.tsx` with:

```tsx
import Image from "next/image";
import Link from "next/link";

export default function Logo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  return (
    <Link href="/" aria-label="SCRM Media Real Estate — Home" className="inline-flex">
      <Image
        src="/logo.png"
        alt="SCRM Media Real Estate"
        width={180}
        height={48}
        priority
        className={variant === "light" ? "" : ""}
      />
    </Link>
  );
}
```

(If the logo only works on a dark background, the placeholder text version is currently safer for the white header.)

---

## What's still placeholder content

- **Logo** — text-rendered until `public/logo.png` is added.
- **OG image** (`/og.jpg`) — drop a 1200×630 export of your hero.
- **Testimonials** — generic copy, swap with real client quotes.
- **Trust bar stats (35+, 1.5M+, $14)** — used as you described, update when figures change.
- **Social links** — Instagram and LinkedIn URLs in `src/lib/site.ts` are guesses.

---

## Useful scripts

```bash
npm run dev      # local dev server
npm run build    # production build (also runs type-check + lint)
npm run start    # serve the built output
npm run lint     # lint only
```
