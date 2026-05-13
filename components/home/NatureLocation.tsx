'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import Reveal from '../ui/Reveal'
import Divider from '../ui/Divider'
import SectionLabel from '../ui/SectionLabel'
import { locationFacts as facts } from '@/lib/siteData'

export default function NatureLocation() {
  const ref = useRef<HTMLElement>(null)
  const prefersReduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    [prefersReduced ? '0%' : '-12%', prefersReduced ? '0%' : '12%']
  )

  return (
    <section ref={ref} className="bg-navy overflow-hidden section-pad px-0">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-0 min-h-[500px]">
          <div className="relative h-72 lg:h-auto rounded lg:rounded-r-none overflow-hidden order-last lg:order-first">
            <motion.div style={{ y: imageY }} className="absolute inset-0 scale-110">
              <Image
                src="/images/02_location_forest_context_aerial.jpg"
                alt="Aerial view of Amaya surrounded by 600-acre reserve forest, Medchal"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-navy/40 hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent lg:hidden" />
          </div>

          <div className="py-0 lg:py-8 lg:pl-16 flex flex-col justify-center">
            <Reveal>
              <SectionLabel light>Location and nature</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                className="font-serif font-light text-limestone mb-0"
                style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: '1.15' }}
              >
                Beside a 600-acre reserve forest.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <Divider className="my-6" />
            </Reveal>
            <Reveal delay={0.25}>
              <p className="font-sans font-light text-stone/65 text-[15px] leading-relaxed mb-8">
                Medchal, around 15 minutes from Nehru Outer Ring Road. The city is accessible. The noise stays outside.
              </p>
            </Reveal>

            <div className="flex flex-col gap-3 mb-9">
              {facts.map((fact, i) => (
                <Reveal key={fact} delay={0.3 + i * 0.08}>
                  <div className="font-sans font-light text-[13.5px] text-stone/60 pl-4 border-l-2 border-sage leading-relaxed">
                    {fact}
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.55}>
              <Link
                href="/location"
                className="inline-block font-sans text-[11px] font-medium tracking-[0.1em] uppercase border border-limestone/30 text-limestone px-6 py-3 rounded-sm hover:border-limestone/70 transition-all duration-200"
              >
                See location details
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
