'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useModal } from '@/components/layout/ModalContext'
import Reveal from '@/components/ui/Reveal'
import SectionLabel from '@/components/ui/SectionLabel'
import Divider from '@/components/ui/Divider'
import { locationCards } from '@/lib/siteData'

export default function LocationPage() {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const { openModal } = useModal()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    [prefersReduced ? '0%' : '-12%', prefersReduced ? '0%' : '12%'],
  )

  return (
    <>
      <div className="bg-navy pt-28 pb-14 px-6 lg:px-16">
        <div className="max-w-[1200px] mx-auto">
          <SectionLabel light>Nature and location</SectionLabel>
          <h1
            className="font-serif font-light text-limestone mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: '1.1' }}
          >
            Beside a 600-acre reserve forest.
          </h1>
          <p className="font-sans font-light text-stone/65 text-[15px] max-w-lg leading-relaxed">
            Medchal, Hyderabad. Around 15 minutes from Nehru Outer Ring Road. The city is close.
            The noise is not.
          </p>
        </div>
      </div>

      <section className="bg-mist section-pad px-6 lg:px-16">
        <div className="max-w-[1200px] mx-auto">
          <div ref={ref} className="relative h-72 lg:h-[480px] rounded overflow-hidden mb-14">
            <motion.div style={{ y: imageY }} className="absolute inset-0 scale-110">
              <Image
                src="/images/02_location_forest_context_aerial.jpg"
                alt="Aerial forest context showing Amaya surrounded by greenery in Medchal, Hyderabad"
                fill
                className="object-cover object-center"
                sizes="100vw"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
            <div className="absolute bottom-6 left-7">
              <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-limestone/70 bg-navy-deep/55 backdrop-blur-sm px-3 py-1.5 rounded-full">
                Aerial view, Medchal
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16 mb-14">
            <div className="lg:sticky lg:top-28 self-start">
              <Reveal>
                <SectionLabel>The setting</SectionLabel>
                <h2
                  className="font-serif font-light text-charcoal mb-4"
                  style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', lineHeight: '1.2' }}
                >
                  Green, quiet, and connected.
                </h2>
                <Divider className="mb-4" />
                <p className="font-sans font-light text-text-mid text-[14px] leading-relaxed">
                  Amaya is designed for a life where the city is close when you want it, and
                  invisible when you do not. The forest stays constant.
                </p>
              </Reveal>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {locationCards.map((card, i) => (
                <Reveal key={card.title} delay={i * 0.08}>
                  <div className="bg-white border border-stone rounded p-6 h-full transition-transform duration-300 hover:-translate-y-1">
                    <div className="w-8 h-0.5 bg-sage mb-4" />
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
          </div>

          {/* Map placeholder */}
          <Reveal>
            <div className="bg-white border border-stone rounded overflow-hidden mb-12">
              {/*
                TODO(dev): replace with a real Google Maps embed pointing to verified Amaya
                site coordinates. Use the official "Embed a map" share URL or a Mapbox
                static map. For better LCP, lazy-load the iframe on user interaction.
              */}
              <div className="h-72 lg:h-96 flex items-center justify-center text-center px-6 bg-surface-alt">
                <div>
                  <div className="font-sans text-[10px] tracking-[0.24em] uppercase text-brass mb-2">
                    Map placeholder
                  </div>
                  <p className="font-serif text-lg text-charcoal mb-1">Amaya by Vera Vita</p>
                  <p className="font-sans text-sm text-text-mid font-light">
                    Medchal, Nehru Outer Ring Road, Hyderabad, Telangana
                  </p>
                  <p className="font-sans text-[11px] text-text-muted font-light mt-3">
                    Replace with a verified Google Maps embed before launch.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="relative rounded overflow-hidden h-56 lg:h-72">
              <Image
                src="/images/12_landscape_between_blocks_wide.jpg"
                alt="Wide landscaped courtyard view between Amaya towers"
                fill
                className="object-cover object-center"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-navy/50" />
              <div className="absolute inset-0 flex items-center justify-center flex-col gap-5 text-center px-6">
                <p className="font-serif text-2xl lg:text-3xl font-light text-limestone italic max-w-md leading-snug">
                  The city is accessible. The noise stays outside.
                </p>
                <button
                  onClick={() => openModal('visit')}
                  className="font-sans text-[11px] font-medium tracking-[0.1em] uppercase bg-brass text-white px-7 py-3 rounded-sm hover:bg-opacity-88 transition-all"
                >
                  Book a Visit
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
