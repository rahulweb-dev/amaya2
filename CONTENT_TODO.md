# Content TODO — Amaya Marketing Site

This is the punch list for the **Amaya / Vera Vita team and counsel** before
the site can go live. Every item is something engineers cannot resolve on
their own — it needs verification by the project team.

For developer-side integration tasks, see [DEV_HANDOFF.md](./DEV_HANDOFF.md).

---

## Floor plans and residences

- [ ] **Final RERA-approved floor plans** for each configuration:
      1 BHK, 2 BHK, 2.5 BHK Type A, 2.5 BHK Type B, 3 BHK, 3.5 BHK.
- [ ] PDF copies of each plan, hosted in `public/floor-plans/<slug>.pdf`
      or on cloud storage.
- [ ] **Carpet area** vs **built-up area** for every configuration, with
      RERA-aligned numerals. The current values in
      `lib/siteData.ts` → `residences` and `floorPlans` are illustrative.
- [ ] **Total unit count** — the homepage shows "256 residences"; confirm
      before launch (see `lib/siteData.ts` → `heroStats`).
- [ ] Confirm **balcony counts** and study/guest-room availability per
      configuration (used in the comparison table on `/residences`).
- [ ] Final **specifications and amenities list per residence type** if a
      detailed spec sheet is to be published.

---

## RERA / legal copy

- [ ] **RERA registration number** for the project — replaces
      `RERA_REGISTRATION` in `lib/constants.ts`. Currently displayed as
      `[RERA Registration No. To be confirmed]` in the footer.
- [ ] Counsel sign-off on all copy that mentions:
      - the **600-acre reserve forest** ("adjoining" / "near" / "beside" —
        we currently use "adjoining" / "beside"; verify acceptable).
      - the **15-minute drive** from Nehru Outer Ring Road.
      - "**Independent senior living**" framing.
- [ ] Counsel-approved **privacy policy** (`/privacy-policy`).
- [ ] Counsel-approved **terms** if needed (`/terms`).
- [ ] **Disclaimers** to display on the floor plans page and in the brochure
      modal (currently: "Illustrative, subject to approval" — verify wording).

---

## Pricing

- [ ] **Confirm the project pricing strategy.** The site currently does **not**
      publish prices. If pricing is to be published (e.g. "starting at ₹X"),
      the Amaya team must:
      - Decide which configuration is the price-leader.
      - Provide RERA-aligned, all-inclusive vs base-price breakdown.
      - Approve placement (Residences page, Floor Plans, or Contact-only).
- [ ] If pricing remains private, keep the current "Enquire" / "Book a Visit"
      flow which is consistent with most premium real estate brand sites.

---

## Map and address

- [ ] **Verified site address** — replaces the `CONTACT.addressLine*` strings
      in `lib/constants.ts`.
- [ ] **Exact site coordinates** for the Google Maps embed.
- [ ] **Experience centre address**, phone, and contact email (separate from
      site if applicable).
- [ ] Decision on whether to embed **Google Maps** (loads third-party JS) or
      a **static map image** with click-to-load behaviour.

---

## Medical and wellness claims

- [ ] **Scope of on-site medical staffing** (doctor, nurse, paramedic,
      coverage hours). Update copy on `/wellness` and the home `WellnessHome`
      cards once finalised. Avoid hospital-level outcome claims unless
      contractually backed.
- [ ] **Partner hospital(s)** with response-time SLA. Add to copy on
      `/wellness` and to the FAQ.
- [ ] **Emergency SOPs** for cardiac, fall, and other common events.
- [ ] **Medical brochure** download, if separate from the main brochure.
- [ ] If "doctor on site 24/7" is to be claimed, secure contractual proof and
      restore the claim. The current copy is intentionally cautious.

---

## Amenities

- [ ] Final **Amenities Master List** — the current six categories and
      sample items in `lib/siteData.ts` → `amenityGroups` are based on the
      planning document. Replace with the master list signed off by Amaya.
- [ ] Confirm which amenities are **planned** vs **confirmed**. The current
      copy uses "(planned)" suffixes — adjust as appropriate.
- [ ] **Total amenity count** — homepage Hero shows "100+"; verify.

---

## Imagery

- [ ] Sign-off on all **architectural renders** in `public/images`.
- [ ] **Photography from the experience centre** when ready.
- [ ] **Brand-aligned OG image** (1200×630) for social sharing — currently
      reuses the hero render. Acceptable but improvable.
- [ ] **Favicon set** — 16/32 px favicons, apple-touch-icon, web manifest.
- [ ] **Lifestyle photography** of residents (with consent + model release)
      once the community is operational.

---

## Brochure and downloadables

- [ ] **Final brochure PDF** for the brochure modal flow.
- [ ] **Floor plan PDFs** (see Residences section above).
- [ ] **Wellness / care brochure** if separate from main brochure.

---

## Contact details

- [ ] Verified **sales phone number** — replaces `CONTACT.phoneDisplay` /
      `CONTACT.phoneTel` in `lib/constants.ts`.
- [ ] Verified **WhatsApp Business number** — replaces
      `CONTACT.whatsappNumber`.
- [ ] Verified **inbound email address** — replaces `CONTACT.email`.
- [ ] **Office hours / response SLAs** for display on `/contact`.

---

## FAQ

- [ ] Review and refine the seven FAQs in `lib/siteData.ts` → `faqs`.
- [ ] Add or remove items based on questions actually being asked at the
      experience centre.

---

## Compliance and accessibility

- [ ] **DPDP compliance** — confirm consent capture, retention period, and
      data subject rights wording. Current consent line is displayed under
      every form.
- [ ] **Cookie banner** if analytics with cookies is added (e.g. GA4).
- [ ] **Accessibility audit** sign-off — see DEV_HANDOFF.md §9.

---

## Brand and design

- [ ] **Final brand guidelines lock** — current palette (navy, limestone,
      sage, brass) and type pairing (Cormorant Garamond + Jost) match the
      provided guidelines. Confirm before launch.
- [ ] **Logo files** — currently rendered as a styled wordmark. If a
      bespoke logomark exists, replace `<Header>` and `<Footer>` wordmarks.
- [ ] **Brand voice review** of every page.

---

## Launch checklist

- [ ] All TODOs in this file resolved or explicitly accepted.
- [ ] All `// TODO(content)` comments in the codebase resolved.
- [ ] Brochure and floor-plan PDFs uploaded.
- [ ] Sales / CRM integration tested with a real lead.
- [ ] Analytics tested with a real session.
- [ ] WhatsApp deep link tested on a real device.
- [ ] Forms tested on the slowest 3G connection you can simulate.
- [ ] Site previewed on iOS Safari, Android Chrome, and a desktop browser.
