'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Reveal from '../ui/Reveal'
import SectionLabel from '../ui/SectionLabel'
import { useModal } from '../layout/ModalContext'
import { residences } from '@/lib/siteData'

const homeResidences = residences.filter((r) =>
  ['1bhk', '25bhk', '35bhk'].includes(r.slug),
)

export default function ResidencesPreview() {
  const { openModal } = useModal()

  return (
    <section className="bg-navy section-pad px-6 lg:px-16">
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <SectionLabel light>Residences</SectionLabel>
        </Reveal>
        <div className="grid lg:grid-cols-2 gap-3 items-end mb-10">
          <Reveal delay={0.1}>
            <h2
              className="font-serif font-light text-limestone"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: '1.15' }}
            >
              Homes that feel exactly like home.
            </h2>
          </Reveal>
          <Reveal direction="right" delay={0.15}>
            <p className="font-sans font-light text-stone/65 text-[15px] leading-relaxed">
              Five configurations. Every one designed for ease, light, and quiet comfort. Each
              planned with unusually generous balconies and open ventilation.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {homeResidences.map((res, i) => (
            <motion.div
              key={res.title}
              className={`border rounded overflow-hidden cursor-pointer transition-all duration-400 group ${
                res.featured ? 'border-brass/45 hover:border-brass' : 'border-brass/18 hover:border-brass/50'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
            >
              <div className="h-[170px] bg-navy-deep/60 border-b border-brass/15 flex items-center justify-center relative">
                <div className="text-center">
                  <div className="font-serif text-4xl font-light text-limestone/30 mb-1">
                    {res.title}
                  </div>
                  <div className="font-sans text-[10px] tracking-[0.18em] uppercase text-stone/30">
                    Floor plan
                  </div>
                  <div className="font-sans text-[10px] text-stone/25 mt-1">
                    Illustrative, subject to approval
                  </div>
                </div>
                {res.featured && (
                  <div className="absolute top-3 right-3 font-sans text-[9px] tracking-[0.14em] uppercase bg-brass/20 text-brass px-2.5 py-1 rounded-full">
                    Featured
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="font-sans font-bold text-[14px] tracking-[0.2rem] uppercase text-brass mb-2">
                  {res.type}
                </div>
                <h3 className="font-serif text-2xl font-normal text-limestone mb-1">{res.title}</h3>
                <div className="font-sans text-[15px] text-stone/40 mb-3">{res.area}</div>
                <p className="font-sans font-light text-[16px] text-stone/60 leading-relaxed mb-4">
                  {res.body}
                </p>
                <button
                  onClick={() => openModal('enquiry', `residence:${res.slug}`)}
                  className="font-sans text-[16px] tracking-[0.08em] text-brass transition-all duration-300 group-hover:tracking-[0.12em]"
                >
                  Explore &rarr;
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/residences"
            className="inline-block font-sans text-[11px] font-medium tracking-[0.1em] uppercase border border-limestone/30 text-limestone px-6 py-3 rounded-sm hover:border-limestone/70 transition-all duration-200"
          >
            See all residences
          </Link>
          <Link
            href="/floor-plans"
            className="inline-block font-sans text-[11px] font-medium tracking-[0.1em] uppercase bg-brass text-white px-6 py-3 rounded-sm hover:bg-opacity-88 transition-all duration-200"
          >
            View floor plans
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
