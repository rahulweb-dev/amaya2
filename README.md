# Amaya by Vera Vita — Marketing Site

Production-quality Next.js 14 marketing site for **Amaya**, an independent senior
living community by Vera Vita in Medchal, Hyderabad.

This repository is the first complete frontend codebase for the Amaya web
property. It is intended to be inherited by the Amaya / Vera Vita dev team and
extended with real CMS/CRM/analytics integrations. Every placeholder, content
gap, and integration point is flagged inline with `// TODO(dev)` or
`// TODO(content)` comments and mirrored in [DEV_HANDOFF.md](./DEV_HANDOFF.md)
and [CONTENT_TODO.md](./CONTENT_TODO.md).

---

## Tech stack

| Layer            | Choice                                           |
| ---------------- | ------------------------------------------------ |
| Framework        | Next.js 14 (App Router)                          |
| Language         | TypeScript (strict)                              |
| Styling          | Tailwind CSS 3 + custom design tokens            |
| Animation        | Framer Motion                                    |
| Fonts            | Cormorant Garamond + Jost via `next/font/google` |
| Images           | `next/image` (AVIF/WebP enabled)                 |
| Forms / state    | React `useState` + a single `useLeadForm` hook   |
| Lead submission  | Stub `submitLead` in `lib/leadPayload.ts`        |

The site is a fully static frontend today. There is no backend and no
database. Forms validate locally, log a clean JSON payload to the browser
console, and show a success state.

---

## Quick start

```bash
# 1. Install dependencies (Node 20 recommended — see .nvmrc)
nvm use            # optional
npm install

# 2. Run the dev server at http://localhost:3000
npm run dev

# 3. Production build
npm run build
npm start

# 4. Lint
npm run lint
```

> If `npm run lint` fails because Next's lint config has not been initialised,
> run `npx next lint` once and commit the generated `.eslintrc.json`.

---

## Folder structure

```
amaya-website/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout (fonts, modal provider, header/footer)
│   ├── page.tsx            # Home — composes home/* sections
│   ├── not-found.tsx       # 404 page
│   ├── sitemap.ts          # Generated sitemap.xml
│   ├── robots.ts           # Generated robots.txt
│   ├── globals.css         # Tailwind + global CSS variables
│   ├── residences/
│   ├── floor-plans/
│   ├── club/
│   ├── wellness/
│   ├── location/
│   ├── amenities/
│   ├── gallery/
│   └── contact/
├── components/
│   ├── layout/             # Header, Footer, Modal, ModalContext
│   ├── home/               # Home sections (Hero, WhyAmaya, FAQ, …)
│   ├── forms/              # BookVisitForm, BrochureForm, ContactForm,
│   │                       # CallbackForm, EnquiryForm, FormField,
│   │                       # SubmitSuccess, useLeadForm
│   ├── gallery/            # Lightbox
│   └── ui/                 # Reveal, Divider, SectionLabel, AmenityIcon
├── lib/
│   ├── constants.ts        # SITE, CONTACT, SEO, NAV_LINKS, RERA
│   ├── leadPayload.ts      # Lead types, validation, submitLead stub
│   └── siteData.ts         # All marketing copy and structured content
├── public/
│   └── images/             # Architectural renders (.jpg)
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
└── package.json
```

---

## Editing content

**Almost all marketing copy lives in [`lib/siteData.ts`](./lib/siteData.ts).**

Editing copy in one place propagates everywhere — there is no inline copy in
the page components. The exception is short headings that frame each page; if
those need to move into siteData too, follow the existing pattern.

Common edits:

| What                                  | Where                                                         |
| ------------------------------------- | ------------------------------------------------------------- |
| FAQs                                  | `lib/siteData.ts` → `faqs`                                    |
| Residence configurations              | `lib/siteData.ts` → `residences`                              |
| Floor plan rows                       | `lib/siteData.ts` → `floorPlans`                              |
| Wellness cards                        | `lib/siteData.ts` → `wellnessCards`                           |
| Amenity categories                    | `lib/siteData.ts` → `amenityGroups`                           |
| Gallery images and categories         | `lib/siteData.ts` → `galleryImages`                           |
| Hero stats (256, 34,000 sq ft, etc.)  | `lib/siteData.ts` → `heroStats`                               |
| Phone, email, RERA, address           | `lib/constants.ts` → `CONTACT`, `RERA_REGISTRATION`           |
| Site URL, SEO defaults, OG image      | `lib/constants.ts` → `SITE`, `SEO`                            |
| Header / Footer nav links             | `lib/constants.ts` → `NAV_LINKS`                              |

---

## Editing images

All images live in [`public/images`](./public/images) and are referenced by
`/images/<filename>` paths.

To add or replace an image:

1. Drop the file into `public/images/`. Use compressed JPG/WebP under ~800 kB
   for renders.
2. Reference it from `lib/siteData.ts` (gallery, hero, etc.) or from the
   relevant component if it is a one-off image.
3. Always provide a meaningful `alt` string. The current images describe the
   architectural render in 6–10 words.

The `next/image` component is configured for AVIF/WebP delivery — you do not
need to convert images yourself.

---

## Forms and lead capture

Every form on the site funnels through one entry point:
[`lib/leadPayload.ts`](./lib/leadPayload.ts) → `submitLead(payload)`.

Today, `submitLead` only logs the payload to the browser console (in
development) and resolves a fake success after ~350ms. **Replace that single
function** and every form on the site is wired to your real backend.

A typical lead payload looks like:

```json
{
  "leadType": "visit",
  "sourcePage": "/contact",
  "name": "Asha Iyer",
  "phone": "+91 98000 00000",
  "email": "asha@example.com",
  "preferredDate": "2026-06-12",
  "consent": true,
  "createdAt": "2026-05-10T07:12:33.222Z"
}
```

Lead types: `visit`, `brochure`, `callback`, `contact`, `enquiry`, `floorplan`.

See [DEV_HANDOFF.md](./DEV_HANDOFF.md) for integration recommendations.

---

## Environment variables

A starter [`.env.example`](./.env.example) is included. The frontend itself
only consumes `NEXT_PUBLIC_SITE_URL` today. The other variables are listed
ready for the dev team when CRM, email, WhatsApp, maps, and analytics are
wired up.

```bash
cp .env.example .env.local
```

---

## Deployment

The site is intended to deploy to **Vercel** (zero-config). To deploy:

1. Push this repo to GitHub.
2. Import the project in Vercel.
3. Set `NEXT_PUBLIC_SITE_URL` to your production hostname.
4. Trigger the first deployment.

The included `next.config.js` enables AVIF/WebP image delivery and otherwise
uses Next.js defaults. There is no custom `vercel.json` because none is needed
for this static site.

For preview/staging, Vercel preview deployments work out of the box.

---

## Accessibility

- Skip-to-content link in the header.
- Modal has `role="dialog"` + `aria-modal` + Escape close.
- All form fields have associated labels, `aria-invalid`, and inline error
  text (`role="alert"`).
- All decorative motion is gated behind `useReducedMotion()` from Framer
  Motion. Long animations are removed for users who prefer reduced motion.
- Active route is announced via `aria-current="page"` on header links.
- Gallery lightbox supports keyboard navigation (`Esc`, `←`, `→`).

---

## Known limitations / placeholders

See [DEV_HANDOFF.md](./DEV_HANDOFF.md) and [CONTENT_TODO.md](./CONTENT_TODO.md)
for the full punch list before launch.

---

## License

Internal — Vera Vita Developments Pvt. Ltd.
