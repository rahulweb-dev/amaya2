'use client'

import { useState } from 'react'
import { useModal } from '@/components/layout/ModalContext'
import Reveal from '@/components/ui/Reveal'
import SectionLabel from '@/components/ui/SectionLabel'
import { floorPlans } from '@/lib/siteData'

const filters = [
  { value: 'all', label: 'All' },
  { value: '1bhk', label: '1 BHK' },
  { value: '2bhk', label: '2 BHK' },
  { value: '25bhk', label: '2.5 BHK' },
  { value: '3bhk', label: '3 BHK' },
  { value: '35bhk', label: '3.5 BHK' },
]

/*
 * Floor Plans page.
 *
 * TODO(content): the floor plan cards below are placeholders. Before launch:
 *  - replace each illustrative card with the actual floor plan render
 *  - confirm carpet area and built-up area against the RERA-approved set
 *  - host RERA-approved PDFs in /public/floor-plans/<slug>.pdf and reference
 *    them via the `pdf` field on the FloorPlan type in lib/siteData.ts
 *  - add `getFloorPlanPdf(slug)` helper in lib/ if PDFs end up in S3 or a CMS
 *
 * TODO(dev): when PDFs are available, swap the modal CTA to download directly
 * via a verified-email gate, or keep the modal lead capture and email the PDF
 * after verification (preferred for tracking).
 */
export default function FloorPlansPage() {
  const [active, setActive] = useState('all')
  const { openModal } = useModal()
  const filtered = active === 'all' ? floorPlans : floorPlans.filter((p) => p.type === active)

  return (
    <>
      <div className="bg-navy pt-28 pb-14 px-6 lg:px-16">
        <div className="max-w-[1200px] mx-auto">
          <SectionLabel light>Floor Plans</SectionLabel>
          <h1
            className="font-serif font-light text-limestone mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: '1.1' }}
          >
            Explore each home in detail.
          </h1>
          <p className="font-sans font-light text-stone/65 text-[15px] max-w-lg leading-relaxed">
            Floor plan illustrations are indicative. Final plans are subject to regulatory approval
            and may differ at handover.
          </p>
        </div>
      </div>

      <section className="bg-mist section-pad px-6 lg:px-16">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex gap-2 flex-wrap mb-8">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActive(f.value)}
                className={`font-sans text-[11px] font-medium tracking-[0.08em] uppercase px-5 py-2 rounded-full border transition-all duration-200 ${
                  active === f.value
                    ? 'bg-navy text-limestone border-navy'
                    : 'bg-transparent text-text-mid border-stone hover:border-navy/40'
                }`}
                aria-pressed={active === f.value}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((plan, i) => (
              <Reveal key={`${plan.label}-${plan.variant}`} delay={i * 0.07}>
                <div
                  className={`bg-white border rounded overflow-hidden h-full flex flex-col ${
                    plan.featured ? 'border-brass' : 'border-stone'
                  }`}
                >
                  <div className="h-52 bg-surface-alt flex items-center justify-center border-b border-stone relative">
                    <div className="text-center">
                      <div className="font-serif text-3xl font-light text-charcoal/20">
                        {plan.label}
                      </div>
                      <div className="font-sans text-[10px] tracking-[0.16em] uppercase text-text-muted mt-1">
                        {plan.variant}
                      </div>
                      <div className="font-sans text-[10px] text-text-muted/70 mt-1">
                        Illustrative, subject to approval
                      </div>
                    </div>
                    {plan.featured && (
                      <div className="absolute top-3 right-3 font-sans text-[9px] tracking-[0.14em] uppercase bg-brass/15 text-brass px-2.5 py-1 rounded-full">
                        Featured
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="font-sans text-[10px] tracking-[0.18em] uppercase text-brass mb-3">
                      {plan.label} &mdash; {plan.variant}
                    </div>
                    <div className="flex gap-5 mb-5 text-[12px] font-sans font-light text-text-mid flex-wrap">
                      <span>
                        <strong className="block text-[9px] tracking-[0.1em] uppercase text-brass font-medium mb-0.5">
                          Carpet
                        </strong>
                        {plan.carpet}
                      </span>
                      <span>
                        <strong className="block text-[9px] tracking-[0.1em] uppercase text-brass font-medium mb-0.5">
                          Built-up
                        </strong>
                        {plan.buildup}
                      </span>
                      <span>
                        <strong className="block text-[9px] tracking-[0.1em] uppercase text-brass font-medium mb-0.5">
                          Balcony
                        </strong>
                        {plan.balconies}
                      </span>
                    </div>
                    <div className="flex gap-2 mt-auto flex-wrap">
                      <button
                        onClick={() =>
                          openModal('floorplan', `${plan.label} ${plan.variant}`)
                        }
                        className="font-sans text-[11px] font-medium tracking-[0.06em] uppercase bg-brass text-white px-4 py-2 rounded-sm hover:bg-opacity-88 transition-all"
                      >
                        Download Plan
                      </button>
                      <button
                        onClick={() =>
                          openModal('enquiry', `${plan.label} ${plan.variant}`)
                        }
                        className="font-sans text-[11px] font-medium tracking-[0.06em] uppercase border border-brass text-brass px-4 py-2 rounded-sm hover:bg-brass hover:text-white transition-all"
                      >
                        Enquire
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12">
            <p className="font-sans font-light text-text-muted text-[12px] text-center">
              Areas listed are indicative. RERA-approved plans will be made available on request and
              shared at the experience centre.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
