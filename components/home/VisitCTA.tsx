'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import Reveal from '../ui/Reveal'
import { useModal } from '../layout/ModalContext'

export default function VisitCTA() {
  const ref = useRef<HTMLElement>(null)
  const { openModal } = useModal()
  const prefersReduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    [prefersReduced ? '0%' : '-10%', prefersReduced ? '0%' : '10%']
  )

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="absolute inset-0">
        <motion.div style={{ y: imageY }} className="absolute inset-0 scale-110">
          <Image
            src="/images/03_arrival_entrance_driveway.jpg"
            alt="Amaya entrance arrival with driveway, trees, and building edge"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-navy-deep/75" />
      </div>

      <div className="relative section-pad px-6 lg:px-16 text-center">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <span className="block font-sans text-[10px] font-semibold tracking-[0.28em] uppercase text-brass/80 mb-5">
              Experience centre
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2
              className="font-serif font-light text-limestone mb-4 mx-auto"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', lineHeight: '1.15', maxWidth: '600px' }}
            >
              Come and see it for yourself.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="font-sans font-light text-stone/70 text-[15px] mb-9 mx-auto leading-relaxed" style={{ maxWidth: '460px' }}>
              We would be happy to show you around the experience centre. Walk through the model residence, clubhouse vision, and community plan with our team.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <button
              onClick={() => openModal('visit')}
              className="font-sans text-xs font-medium tracking-[0.1em] uppercase bg-brass text-white px-9 py-4 rounded-sm hover:bg-opacity-90 active:scale-[0.98] transition-all duration-200"
            >
              Book a Visit
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
