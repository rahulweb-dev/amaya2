'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

import {
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from 'lucide-react'

import Reveal from '../ui/Reveal'
import SectionLabel from '../ui/SectionLabel'
import { wellnessCards } from '@/lib/siteData'

// Show only first 4 cards on homepage
const homeCards = wellnessCards.slice(0, 4)

// Optional icons for cards
const cardIcons = [
  ShieldCheck,
  HeartHandshake,
  Stethoscope,
  Sparkles,
]

export default function WellnessHome() {
  return (
    <section className="section-pad overflow-hidden bg-mist px-6 lg:px-16">
      <div className="mx-auto max-w-[1200px]">
        {/* TOP SECTION */}
        <div className="mb-14 grid items-start gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          {/* LEFT CONTENT */}
          <div>
            <Reveal>
              <SectionLabel>
                Wellness and support
              </SectionLabel>
            </Reveal>

            <Reveal delay={0.1}>
              <h2
                className="mb-5 font-serif font-light text-charcoal"
                style={{
                  fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                  lineHeight: '1.15',
                }}
              >
                Care when needed,
                <br />
                freedom always.
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mb-7 max-w-xl font-sans text-[15px] font-light leading-relaxed text-text-mid">
                Safety that feels discreet, not clinical.
                Support that is present without being
                intrusive. Reassurance that naturally
                becomes part of everyday life.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <Link
                href="/wellness"
                className="inline-flex items-center gap-2 rounded-sm border border-brass/50 px-6 py-3 font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-charcoal transition-all duration-300 hover:border-brass hover:bg-brass hover:text-white"
              >
                Explore Wellness
              </Link>
            </Reveal>
          </div>

          {/* IMAGE */}
          <Reveal direction="right" delay={0.15}>
            <div className="group relative h-60 overflow-hidden rounded lg:h-72">
              <Image
                src="/images/09_wellness_quiet_seating_grove.jpg"
                alt="Quiet shaded grove with seating at Amaya wellness gardens"
                fill
                priority
                className="object-cover object-center transition-transform duration-[1200ms] group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent" />

              <div className="absolute bottom-5 left-5">
                <span className="rounded-full bg-white/80 px-3 py-1.5 font-sans text-[10px] uppercase tracking-[0.15em] text-charcoal backdrop-blur-sm">
                  Wellness Gardens
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* WELLNESS CARDS */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {homeCards.map((card, i) => {
            const Icon = cardIcons[i]

            return (
              <motion.div
                key={card.title}
                className="group rounded-xl border border-stone bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{
                  once: true,
                  margin: '-50px',
                }}
                transition={{
                  duration: 0.65,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* ICON */}
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-sage/10 text-sage">
                  <Icon size={22} strokeWidth={1.8} />
                </div>

                {/* TITLE */}
                <h3 className="mb-3 font-serif text-lg font-normal leading-snug text-charcoal">
                  {card.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="font-sans text-[13px] font-light leading-relaxed text-text-mid">
                  {card.body}
                </p>

                {/* HOVER LINE */}
                <div className="mt-5 h-[2px] w-10 origin-left bg-sage transition-all duration-300 group-hover:w-16" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}