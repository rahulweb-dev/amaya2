'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Reveal from '../ui/Reveal'
import SectionLabel from '../ui/SectionLabel'
import AmenityIcon from '../ui/AmenityIcon'
import { amenityGroups } from '@/lib/siteData'

export default function AmenitiesHome() {
  return (
    <section className="bg-limestone section-pad px-6 lg:px-16 overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-start">

          {/* ── Left sticky column ── */}
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <SectionLabel>Amenities</SectionLabel>
            </Reveal>

            <Reveal delay={0.1}>
              <h2
                className="font-serif font-light text-charcoal mb-5"
                style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', lineHeight: '1.15' }}
              >
                Everything that makes a day good.
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="font-sans font-light text-charcoal/70 text-base leading-relaxed mb-8">
                More than 100 planned amenities across six categories — community, wellness,
                safety, convenience, nature, and hospitality.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="relative h-52 rounded overflow-hidden mb-8">
                <Image
                  src="/images/05_amenities_pool_courtyard_canopy.jpg"
                  alt="Central pool, canopy, steps, and courtyard at Amaya amenities"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-charcoal/15" />
              </div>
            </Reveal>

            <Reveal delay={0.35}>
              <Link
                href="/amenities"
                className="inline-block font-sans text-xs font-semibold tracking-[0.1em] uppercase border border-brass/50 text-charcoal px-6 py-3 rounded-sm hover:border-brass hover:bg-brass hover:text-white transition-all duration-200"
              >
                See all amenities
              </Link>
            </Reveal>
          </div>

          {/* ── Right cards grid ── */}
          <div className="grid sm:grid-cols-2 gap-4">
            {amenityGroups.map((group, i) => (
              <motion.div
                key={group.category}
                className="bg-white/70 border border-brass/20 rounded-md p-6 transition-all duration-300 hover:bg-white hover:border-brass/50 hover:shadow-sm"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Card header */}
                <div className="flex items-start gap-3 mb-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brass/15 text-brass shrink-0 mt-0.5">
                    <AmenityIcon category={group.category} className="w-5 h-5" />
                  </span>
                  <div>
                    {/* Category label — was 14px tracking-heavy, hard to read */}
                    <div className="font-sans text-[11px] font-bold tracking-[0.18em] uppercase text-brass mb-1">
                      {group.category}
                    </div>
                    {/* Blurb — increased size, improved opacity */}
                    <p className="font-serif text-[19px] italic text-charcoal leading-snug">
                      {group.blurb}
                    </p>
                  </div>
                </div>

                {/* Items list — was 14.5px, bumped to 15px with better contrast */}
                <p className="font-sans font-light text-[15px] text-charcoal/65 leading-relaxed">
                  {group.items.slice(0, 3).join(' · ')}
                  {group.items.length > 3 && (
                    <span className="text-charcoal/40"> · +{group.items.length - 3} more</span>
                  )}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}