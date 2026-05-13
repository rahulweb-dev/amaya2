'use client'

import Image from 'next/image'
import { useModal } from '@/components/layout/ModalContext'
import Reveal from '@/components/ui/Reveal'
import SectionLabel from '@/components/ui/SectionLabel'
import Divider from '@/components/ui/Divider'
import { clubSpaces } from '@/lib/siteData'

export default function ClubPage() {
  const { openModal } = useModal()

  return (
    <>
      <div className="bg-navy pt-28 pb-14 px-6 lg:px-16">
        <div className="max-w-[1200px] mx-auto">
          <SectionLabel light>Club Amaya</SectionLabel>
          <h1
            className="font-serif font-light text-limestone mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: '1.1' }}
          >
            A clubhouse that earns its name.
          </h1>
          <p className="font-sans font-light text-stone/65 text-[15px] max-w-lg leading-relaxed">
            34,000 square feet planned around the life you want to live. Subject to final approvals.
            {/* TODO(content): confirm clubhouse area before launch. */}
          </p>
        </div>
      </div>

      <section className="bg-stone section-pad px-6 lg:px-16">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <div className="grid lg:grid-cols-2 gap-10 items-center mb-14">
              <div className="relative h-72 lg:h-96 rounded overflow-hidden">
                <Image
                  src="/images/08_community_amphitheatre_stepped_garden.jpg"
                  alt="Stepped amphitheatre and landscaped community garden at Club Amaya"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
              </div>
              <div className="relative h-56 lg:h-96 rounded overflow-hidden">
                <Image
                  src="/images/05_amenities_pool_courtyard_canopy.jpg"
                  alt="Central pool, canopy, steps and courtyard at Club Amaya"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
              </div>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16 mb-12">
            <div className="lg:sticky lg:top-28 self-start">
              <Reveal>
                <SectionLabel>The spaces</SectionLabel>
                <h2
                  className="font-serif font-light text-charcoal mb-4"
                  style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', lineHeight: '1.2' }}
                >
                  Spaces for every part of a well-lived day.
                </h2>
                <Divider className="mb-4" />
                <p className="font-sans font-light text-text-mid text-[14px] leading-relaxed">
                  Every space inside Club Amaya has been planned around how residents actually want
                  to spend their time. Nothing generic. Nothing for the sake of it.
                </p>
              </Reveal>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {clubSpaces.map((space, i) => (
                <Reveal key={space.title} delay={i * 0.07}>
                  <div className="bg-white border border-stone/60 rounded p-5 h-full transition-transform duration-300 hover:-translate-y-1">
                    <div className="w-8 h-px bg-sage mb-4" />
                    <h3 className="font-serif text-base font-normal text-charcoal mb-2 leading-snug">
                      {space.title}
                    </h3>
                    <p className="font-sans font-light text-[13px] text-text-mid leading-relaxed">
                      {space.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal>
            <div className="bg-navy rounded p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div>
                <p className="font-serif text-lg text-limestone mb-1">
                  See the clubhouse vision in person.
                </p>
                <p className="font-sans font-light text-stone/60 text-sm">
                  Our team can walk you through the clubhouse plans at the experience centre.
                </p>
              </div>
              <button
                onClick={() => openModal('visit')}
                className="flex-shrink-0 font-sans text-[11px] font-medium tracking-[0.1em] uppercase bg-brass text-white px-6 py-3 rounded-sm hover:bg-opacity-88 transition-all"
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
