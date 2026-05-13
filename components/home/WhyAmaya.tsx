'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Reveal from '../ui/Reveal'
import SectionLabel from '../ui/SectionLabel'
import { whyAmayaCards as cards } from '@/lib/siteData'

export default function WhyAmaya() {
  return (
    <section className="bg-navy-deep section-pad px-6 lg:px-16 overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-end mb-14">
          <Reveal direction="left">
            <SectionLabel light>Why Amaya</SectionLabel>
            <h2 className="font-serif font-light text-limestone mb-5" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: '1.15' }}>
              Designed around a different idea of home.
            </h2>
            <p className="font-sans font-light text-stone/65 text-[15px] max-w-md leading-relaxed">
              Not a facility. Not a resort. A residential community built for independence, with everything that makes independence feel effortless.
            </p>
          </Reveal>
          <Reveal direction="right">
            <div className="relative h-52 lg:h-64 rounded overflow-hidden">
              <Image
                src="/images/04_why_amaya_central_garden_courtyard.jpg"
                alt="Central garden courtyard between Amaya residential blocks"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-navy-deep/30" />
              <blockquote className="absolute bottom-5 left-6 right-6 font-serif text-base italic text-[#FDFCFA] leading-snug border-l-2 border-brass pl-4">
                &ldquo;A life that is social when you want it, and quiet when you need it.&rdquo;
              </blockquote>
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 border border-brass/15">
          {cards.map((card, i) => (
            <motion.div
              key={card.num}
              className={`p-8 lg:p-10 border-brass/15 relative group cursor-default transition-colors duration-400 hover:bg-brass/7 ${
                i < 2 ? 'sm:border-b' : ''
              } ${i % 2 === 0 ? 'sm:border-r' : ''}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: (i % 2) * 0.1 + Math.floor(i / 2) * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* <div className="absolute top-5 right-5 w-4 h-4 border-t border-r border-brass/25 transition-all duration-400 group-hover:border-brass group-hover:w-5 group-hover:h-5" /> */}
              <div className="font-sans text-[14px] tracking-[0.24em] text-[#FDFCFA] mb-5">{card.num}</div>
              <motion.div
                className="h-px bg-brass mb-5 origin-left"
                initial={{ scaleX: 0.3 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                style={{ width: 32 }}
              />
              <h3 className="font-serif font-light italic text-limestone text-xl mb-3">{card.title}</h3>
              <p className="font-sans font-light text-md text-stone/60 leading-[1.75]">{card.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
