'use client'

import Image from 'next/image'
import { useModal } from '@/components/layout/ModalContext'
import Reveal from '@/components/ui/Reveal'
import SectionLabel from '@/components/ui/SectionLabel'
import Divider from '@/components/ui/Divider'
import { veraVitaPrinciples, wellnessCards } from '@/lib/siteData'

/*
 * Wellness page copy is intentionally cautious. Avoid medical-outcome language
 * or hospital-level claims here.
 *
 * TODO(content + dev):
 *  - Confirm the precise scope of on-site medical staffing (doctor, nurse, paramedic)
 *    and update copy + cards to match.
 *  - Confirm partner hospital(s), SLA / response time, and add to copy.
 *  - Document emergency SOPs (cardiac, fall, etc.) once finalised by the medical partner.
 *  - Add a downloadable medical / wellness brochure if applicable.
 */
export default function WellnessPage() {
  const { openModal } = useModal()

  return (
    <>
      <div className="bg-navy pt-28 pb-0 px-0 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-16 pb-14">
          <SectionLabel light>Wellness and support</SectionLabel>
          <h1
            className="font-serif font-light text-limestone mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: '1.1' }}
          >
            Care when needed, freedom always.
          </h1>
          <p className="font-sans font-light text-stone/65 text-[15px] max-w-lg leading-relaxed">
            Safety that feels discreet, not clinical. Support that is present without being
            intrusive. The exact scope of medical staffing and partner hospitals is being
            finalised by our team.
          </p>
        </div>
        <div className="relative h-72 lg:h-96">
          <Image
            src="/images/09_wellness_quiet_seating_grove.jpg"
            alt="Quiet shaded grove with seating at Amaya wellness gardens"
            fill
            className="object-cover object-bottom"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-transparent to-transparent" />
        </div>
      </div>

      <section className="bg-mist section-pad px-6 lg:px-16">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
            {wellnessCards.map((card, i) => (
              <Reveal key={card.title} delay={i * 0.07}>
                <div className="bg-white border border-stone rounded p-6 h-full transition-transform duration-300 hover:-translate-y-1">
                  <div className="w-8 h-0.5 bg-sage mb-5" />
                  <h3 className="font-serif font-normal text-charcoal text-base mb-2 leading-snug">
                    {card.title}
                  </h3>
                  <p className="font-sans font-light text-[13px] text-text-mid leading-relaxed">
                    {card.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-start mb-14">
              <div>
                <SectionLabel>Vera Vita</SectionLabel>
                <h2
                  className="font-serif font-light text-charcoal mb-4"
                  style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', lineHeight: '1.2' }}
                >
                  Three operating principles.
                </h2>
                <Divider className="mb-4" />
                <p className="font-sans font-light text-text-mid text-[14px] leading-relaxed">
                  Amaya is operated by Vera Vita on a long-term basis. The way we run the community
                  rests on three commitments — held to a single standard, year after year.
                </p>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                {veraVitaPrinciples.map((p) => (
                  <div
                    key={p.title}
                    className="bg-white border border-stone rounded p-5 h-full"
                  >
                    <div className="font-sans text-[10px] tracking-[0.22em] uppercase text-brass mb-3">
                      {p.title}
                    </div>
                    <p className="font-sans font-light text-[13px] text-text-mid leading-relaxed">
                      {p.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="bg-white border border-stone rounded p-8 text-center">
              <p className="font-serif text-xl text-charcoal mb-2">
                Independent living, beautifully supported.
              </p>
              <p className="font-sans font-light text-text-mid text-sm max-w-lg mx-auto mb-6 leading-relaxed">
                At Amaya, support is designed around your life, not the other way around. You
                retain every choice. We simply make sure that choosing is easier.
              </p>
              <button
                onClick={() => openModal('visit')}
                className="font-sans text-[11px] font-medium tracking-[0.1em] uppercase bg-brass text-white px-7 py-3 rounded-sm hover:bg-opacity-88 transition-all"
              >
                Book a Visit
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
