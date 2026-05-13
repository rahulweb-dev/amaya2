'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Reveal from '../ui/Reveal'
import SectionLabel from '../ui/SectionLabel'

const previewImages = [
  {
    src: '/images/12_landscape_between_blocks_wide.jpg',
    alt: 'Wide landscaped courtyard view between Amaya towers',
    label: 'Landscape',
    aspect: 'col-span-2',
  },
  {
    src: '/images/10_architecture_colonnade_detail.jpg',
    alt: 'Shaded colonnade walkway architectural detail at Amaya',
    label: 'Architecture detail',
    aspect: 'col-span-1',
  },
  {
    src: '/images/06_amenities_reflective_water_body_close.jpg',
    alt: 'Reflective water body with facade and planted edges',
    label: 'Water body',
    aspect: 'col-span-1',
  },
  {
    src: '/images/11_site_overview_courtyard_pool_aerial.jpg',
    alt: 'High angle view of pool, hobby garden, and block edge at Amaya site',
    label: 'Site overview',
    aspect: 'col-span-2',
  },
]

export default function GalleryPreview() {
  return (
    <section className="bg-surface-alt section-pad px-6 lg:px-16 overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <Reveal>
              <SectionLabel>Gallery</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                className="font-serif font-light text-navy"
                style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: '1.15' }}
              >
                A glimpse of Amaya.
              </h2>
            </Reveal>
          </div>
          <Reveal direction="right">
            <Link
              href="/gallery"
              className="hidden sm:inline-block font-sans text-[11px] font-medium tracking-[0.1em] uppercase border border-navy/30 text-navy px-6 py-3 rounded-sm hover:border-navy/70 transition-all duration-200"
            >
              View all &rarr;
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {previewImages.map((img, i) => (
            <motion.div
              key={img.src}
              className={`relative overflow-hidden rounded group ${img.aspect} h-48 lg:h-64`}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover object-center transition-transform duration-[900ms] ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              <span className="absolute bottom-4 left-4 font-sans text-[10px] tracking-[0.18em] uppercase text-white opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                {img.label}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 sm:hidden">
          <Link
            href="/gallery"
            className="inline-block font-sans text-[11px] font-medium tracking-[0.1em] uppercase border border-navy/30 text-navy px-6 py-3 rounded-sm"
          >
            View all &rarr;
          </Link>
        </div>
      </div>
    </section>
  )
}
