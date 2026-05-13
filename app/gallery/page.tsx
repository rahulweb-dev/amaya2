'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Reveal from '@/components/ui/Reveal'
import SectionLabel from '@/components/ui/SectionLabel'
import Lightbox from '@/components/gallery/Lightbox'
import { galleryImages, type GalleryCategory } from '@/lib/siteData'

const filters: { value: 'all' | GalleryCategory; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'Architecture', label: 'Architecture' },
  { value: 'Landscape', label: 'Landscape' },
  { value: 'Amenities', label: 'Amenities' },
  { value: 'Community', label: 'Community' },
  { value: 'Wellness', label: 'Wellness' },
  { value: 'Location', label: 'Location' },
]

export default function GalleryPage() {
  const [active, setActive] = useState<(typeof filters)[number]['value']>('all')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const visible = useMemo(
    () =>
      active === 'all'
        ? galleryImages
        : galleryImages.filter((img) => img.category === active),
    [active],
  )

  return (
    <>
      <div className="bg-navy pt-28 pb-14 px-6 lg:px-16">
        <div className="max-w-[1200px] mx-auto">
          <SectionLabel light>Gallery</SectionLabel>
          <h1
            className="font-serif font-light text-limestone mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: '1.1' }}
          >
            A glimpse of Amaya.
          </h1>
          <p className="font-sans font-light text-stone/65 text-[15px] max-w-lg leading-relaxed">
            Architectural renders and visualisations. More to follow as the project develops.
          </p>
        </div>
      </div>

      <section className="bg-surface section-pad px-6 lg:px-16">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {visible.map((img, i) => {
              const realIndex = galleryImages.indexOf(img)
              return (
                <motion.button
                  key={img.src}
                  type="button"
                  onClick={() => setOpenIndex(realIndex)}
                  className="relative overflow-hidden rounded group cursor-zoom-in h-56 lg:h-64 text-left"
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{
                    duration: 0.7,
                    delay: (i % 3) * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  aria-label={`Open ${img.caption}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover object-center transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                    <div className="font-sans text-[9px] tracking-[0.22em] uppercase text-limestone/60 mb-0.5">
                      {img.label}
                    </div>
                    <div className="font-serif text-base text-limestone font-light">
                      {img.caption}
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </div>

          <Reveal className="mt-10 text-center">
            <p className="font-sans font-light text-text-muted text-[12px]">
              All images are architectural renders. The finished development may differ from
              visualisations shown.
            </p>
          </Reveal>
        </div>
      </section>

      <Lightbox
        images={galleryImages}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onPrev={() =>
          setOpenIndex((i) =>
            i === null ? null : (i - 1 + galleryImages.length) % galleryImages.length,
          )
        }
        onNext={() =>
          setOpenIndex((i) => (i === null ? null : (i + 1) % galleryImages.length))
        }
      />
    </>
  )
}
