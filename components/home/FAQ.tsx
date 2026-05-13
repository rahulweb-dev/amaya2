'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, MessageCircleQuestion } from 'lucide-react'
import Reveal from '../ui/Reveal'
import SectionLabel from '../ui/SectionLabel'
import { faqs } from '@/lib/siteData'

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="section-pad bg-mist px-6 lg:px-16">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-20">

          {/* ── LEFT COLUMN ── */}
          <div>
            <Reveal>
              <SectionLabel>Questions</SectionLabel>
            </Reveal>

            <Reveal delay={0.1}>
              <h2
                className="mb-6 font-serif font-light text-charcoal"
                style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', lineHeight: '1.15' }}
              >
                A few things
                <br />
                people often ask.
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="max-w-sm font-sans text-[16px] font-light leading-relaxed text-charcoal/65">
                If your question is not listed here, feel free to contact us or schedule
                a visit to experience Amaya personally.
              </p>
            </Reveal>

            {/* HELP CARD */}
            <Reveal delay={0.3}>
              <div className="mt-8 flex items-center gap-4 rounded-xl border border-brass/15 bg-white/70 p-6 shadow-sm">
                <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full bg-brass/12 text-brass">
                  <MessageCircleQuestion size={24} strokeWidth={1.6} />
                </div>
                <div>
                  <p className="font-serif text-[18px] text-charcoal leading-snug">
                    Need more help?
                  </p>
                  <p className="font-sans text-[14.5px] font-light text-charcoal/60 mt-0.5">
                    Our team is happy to assist you.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ── FAQ ACCORDION ── */}
          <div className="rounded-2xl border border-stone/60 bg-white/75 backdrop-blur-sm">
            {faqs.map((faq, i) => (
              <Reveal key={faq.q} delay={i * 0.06}>
                <div className="border-b border-stone/60 last:border-none">

                  {/* QUESTION ROW */}
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="flex w-full items-start justify-between gap-5 px-7 py-6 text-left transition-colors duration-200 hover:bg-white/60"
                    aria-expanded={open === i}
                  >
                    <span className="font-serif text-[19px] leading-snug text-charcoal">
                      {faq.q}
                    </span>

                    <span
                      className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        open === i
                          ? 'rotate-180 border-brass bg-brass text-white'
                          : 'border-brass/35 bg-white text-brass'
                      }`}
                    >
                      <ChevronDown size={18} />
                    </span>
                  </button>

                  {/* ANSWER */}
                  <AnimatePresence initial={false}>
                    {open === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-7 pb-7 pr-14 font-sans text-[16px] font-light leading-[1.85] text-charcoal/70">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}