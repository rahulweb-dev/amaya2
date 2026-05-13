# Amaya Marketing Site — Developer Handoff

This document is the punch list for the Amaya / Vera Vita engineering team
inheriting this repository. Read it once before you start — it explains what
has been implemented, what is still placeholder, and where to plug in real
backends.

For content gaps that need verification by the Amaya team rather than by
engineers, see [CONTENT_TODO.md](./CONTENT_TODO.md).

---

## 1. Current status

- **Static frontend, no backend.** Every page renders from local data in
  `lib/siteData.ts`. No API routes, no database, no auth.
- **Forms are simulated.** They validate, build a clean JSON payload, log it
  to the browser console in development, and show a success state. They do
  not yet hit any external service.
- **Maps are placeholders.** Both the Location and Contact pages have a styled
  placeholder block where the map embed will live.
- **All routes work.** Home, Residences, Floor Plans, Club, Wellness,
  Location, Amenities, Gallery, Contact, plus a 404 page.
- **Build is green.** `npm run build` passes with all routes statically
  prerendered.

---

## 2. What has been implemented

### Pages
- `/` — Home, 11 sections (Hero, Promise, Why Amaya, Residences preview, Club
  Amaya preview, Wellness preview, Nature & Location, Amenities preview,
  Gallery preview, Visit CTA, FAQ).
- `/residences` — five configurations + senior-friendly principles + comparison
  table.
- `/floor-plans` — filterable cards for each plan (1 BHK, 2 BHK, 2.5 BHK Type
  A/B, 3 BHK, 3.5 BHK).
- `/club` — clubhouse vision and proposed spaces.
- `/wellness` — softened wellness copy, six wellness cards, three Vera Vita
  operating principles (responsibility, response, reassurance).
- `/location` — aerial parallax hero, location cards, map placeholder.
- `/amenities` — six categories (Community, Wellness, Safety, Convenience,
  Nature, Hospitality) each with an inline SVG icon.
- `/gallery` — masonry grid, category filter, lightbox with keyboard nav.
- `/contact` — visit form + brochure form + callback form + general contact
  form + verified contact info card + map placeholder.
- `not-found.tsx` — branded 404.

### Layout chrome
- `Header` with desktop nav, mobile menu, scroll-aware transparency, active
  route styling, and Book Visit + Brochure CTAs.
- `Footer` with site nav, contact details, WhatsApp deep link, and RERA line.
- `Modal` system driven by `ModalContext`. Modal types: `visit`, `brochure`,
  `floorplan`, `enquiry`. Pass `context` through `openModal('enquiry', '25bhk')`
  to capture which residence triggered the lead.

### Form system
- One `useLeadForm` hook handles values, validation, submit, errors, and
  success state for every form.
- Reusable presentational components: `FormField`, `SubmitSuccess`.
- Six form components composed from the hook: `BookVisitForm`,
  `BrochureForm` (with `variant: 'brochure' | 'floorplan'`), `CallbackForm`,
  `EnquiryForm`, `ContactForm`.

### SEO + a11y
- Per-page metadata via `app/<route>/layout.tsx` for client pages and inline
  for server pages.
- `app/sitemap.ts` and `app/robots.ts`.
- OpenGraph + Twitter card metadata in root layout.
- Skip-to-content link.
- `prefers-reduced-motion` honoured throughout via Framer Motion.

---

## 3. Backend / API integration points

### 3.1 Lead capture (high priority)

**One file to change:** [`lib/leadPayload.ts`](./lib/leadPayload.ts) →
`submitLead`.

Every form on the site already builds a clean `LeadPayload` and calls
`submitLead`. Replace the body of that function with real network code:

```ts
const res = await fetch('/api/lead', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify(payload),
})
return res.ok ? { ok: true } : { ok: false, message: 'Submission failed.' }
```

Then create `app/api/lead/route.ts` (a Next.js Route Handler) that:

1. Validates the payload server-side (do not trust the client).
2. Forwards to your **CRM** (Salesforce, Zoho, HubSpot, Leadsquared). Most
   real-estate teams use Leadsquared in India — its REST API is well
   documented.
3. Sends an **email notification** to the sales inbox via Resend, Postmark,
   or AWS SES.
4. Optionally triggers a **WhatsApp Business API** message to the lead and
   a Slack/Email notification to the team.
5. Persists `consent` and `createdAt` for **DPDP** compliance.
6. Logs to a **Google Sheet** as a redundant fallback (use a service
   account; do not commit the JSON key).

### 3.2 Brochure download
The brochure modal currently captures a lead and shows a success state. Wire
it to either:

- **Email-the-PDF flow** (recommended for tracking) — server emails the
  brochure after capture; or
- **Verified-email gate** that returns the PDF URL only after email
  confirmation.

Place the actual brochure PDF in `public/downloads/amaya-brochure.pdf` (or
host it on S3 / Cloudflare R2 if you prefer not to ship binary in the repo).

### 3.3 Floor-plan downloads
Same flow as brochure. Each floor plan has a `pdf` field on the
`FloorPlan` type in `lib/siteData.ts` — populate it once approved plans are
ready.

### 3.4 Maps

Two map placeholders exist (`/location`, `/contact`). Choose one:

- **Google Maps embed** — paste the iframe URL. Simple, but loads heavy
  third-party JS.
- **Static map** — request a static image from Google or Mapbox; lazy-load
  the interactive iframe on user click. Best for Core Web Vitals.
- **Mapbox / MapTiler** — best brand control. Pass the access token via
  `NEXT_PUBLIC_MAP_KEY`.

### 3.5 WhatsApp
The footer and contact page already include a `wa.me/` deep link using
`CONTACT.whatsappNumber` from `lib/constants.ts`. Update that constant with
the real WhatsApp Business number.

For inbound automation, set up the WhatsApp Business API and either:

- Trigger an outbound greeting message via a server-side webhook on each lead
  capture, or
- Use a third-party (AiSensy, Gallabox, Wati) to handle templating.

### 3.6 Privacy Policy
The footer links to `/contact` as a placeholder. Add a `/privacy-policy/page.tsx`
once counsel approves the policy text.

---

## 4. CMS / content strategy

The content layer (`lib/siteData.ts`) is intentionally a single TypeScript
file so it is trivial to swap for a CMS later. Recommended path:

1. **Sanity Studio** — best for marketing teams; preview-friendly; free tier
   sufficient for this site. Map each export in `siteData.ts` to a Sanity
   document type.
2. **Contentlayer / MDX** — if the team prefers writing in Markdown.
3. **Payload CMS** — if you want to self-host alongside the Next.js app.

Whatever the choice, **keep the shape of each export stable** and replace the
constants with async fetches (with `revalidate` set appropriately). The
components do not need to change.

---

## 5. Analytics, Pixel-like tracking, and consent

The site ships **without any analytics**. Before launch, add a consent-aware
analytics layer:

- **Plausible / Fathom / Umami** — privacy-first, no cookie banner needed.
  Recommended for this audience.
- **GA4** — only if needed for paid media attribution. Requires a cookie
  consent banner under DPDP. Use Google Consent Mode v2.
- **Meta Conversions API** + **Google Ads enhanced conversions** — wire from
  the server-side `/api/lead` route once it exists. Send hashed PII only.
- **GTM / Tag Manager** — convenient for marketing, but loads heavy. Prefer
  per-tool inclusion via `next/script` with `strategy="afterInteractive"`.

Whatever you pick, source variable from `NEXT_PUBLIC_*` env vars.

---

## 6. SEO notes

- `metadataBase` is set from `NEXT_PUBLIC_SITE_URL` — make sure the prod URL
  is set in Vercel.
- Each page has its own `<title>` and `<meta description>`.
- `app/sitemap.ts` and `app/robots.ts` are generated.
- Add a real OG image once the brand team supplies one (current uses the
  hero render, which works but could be improved with a typeset 1200×630).
- Add JSON-LD `Organization` and `Place` schema once verified address and
  phone are confirmed.
- Run a Lighthouse audit after the brand team supplies favicons.

---

## 7. RERA / legal review checklist

- [ ] Replace `RERA_REGISTRATION` placeholder in `lib/constants.ts` with the
      verified RERA number.
- [ ] Confirm 600-acre reserve forest phrasing — "adjoining" is used; verify
      with counsel that this is acceptable.
- [ ] Confirm 15-minute drive time from Nehru ORR (used in copy on Hero,
      Location, FAQ).
- [ ] Confirm clubhouse area (34,000 sq ft) and unit count (256).
- [ ] Confirm built-up vs carpet area in the comparison table — these must
      match the RERA-approved set.
- [ ] Confirm wording on medical and emergency response. Avoid hospital-level
      claims unless contractually backed.
- [ ] Add a real `/privacy-policy` page.
- [ ] Add a `/terms` page if needed.
- [ ] Ensure DPDP consent is captured server-side alongside every lead.

---

## 8. Image optimisation notes

- Source renders are JPG, ~200–800 kB each — acceptable for marketing.
- Next.js converts to AVIF/WebP at request time. No manual conversion needed.
- For LCP on Hero, the hero image already uses `priority` and a `100vw`
  `sizes` value.
- Consider serving an **explicit lower-resolution** variant for mobile if the
  Lighthouse mobile score is below 90 after a real-world test.
- Add a `blurDataURL` prop to large above-the-fold images for an even
  smoother LCP — optional.

---

## 9. Accessibility checklist before launch

- [ ] Run Axe DevTools on every page.
- [ ] Keyboard-navigate the entire site, including modal and lightbox.
- [ ] Test with VoiceOver / NVDA on key flows: Book Visit, Download Brochure,
      Submit Contact form.
- [ ] Verify focus traps in the modal and mobile menu.
- [ ] Verify all form errors are announced via `role="alert"` (already wired).
- [ ] Verify colour contrast on the navy / brass / sage palette against
      WCAG AA.

---

## 10. Performance checklist before launch

- [ ] Run a real-device Lighthouse on `/`, `/residences`, `/gallery`.
- [ ] Confirm `next/font` self-hosts both Cormorant and Jost (it does — just
      verify the network tab shows zero Google requests).
- [ ] If gallery LCP suffers, add `priority` to the first lightbox image.
- [ ] Watch CLS on the Hero — the parallax `y` transform should not move the
      layout out of frame.

---

## 11. Suggested follow-up tickets

- [ ] Wire `submitLead` to Leadsquared (or chosen CRM).
- [ ] Build `/api/lead` route handler with server-side validation.
- [ ] Add Google Maps embed to Location and Contact.
- [ ] Add brochure PDF and brochure download flow.
- [ ] Add RERA-approved floor plan PDFs.
- [ ] Add real WhatsApp Business number + automation.
- [ ] Add favicon set (16, 32, apple-touch-icon, manifest).
- [ ] Add Plausible (or chosen analytics).
- [ ] Move `siteData.ts` content into a CMS (Sanity recommended).
- [ ] Build `/privacy-policy` and `/terms` pages.
- [ ] Add JSON-LD structured data for SEO.
- [ ] Set up preview deployments protection on Vercel.
