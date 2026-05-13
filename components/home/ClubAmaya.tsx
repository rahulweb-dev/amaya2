'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  BookOpen,
  Dumbbell,
  Music,
  Palette,
  Sparkles,
  UtensilsCrossed,
} from 'lucide-react'
import Reveal from '../ui/Reveal'
import Divider from '../ui/Divider'
import SectionLabel from '../ui/SectionLabel'

const features = [
  {
    title: 'Dining and social spaces',
    icon: UtensilsCrossed,
  },
  {
    title: 'Library and reading rooms',
    icon: BookOpen,
  },
  {
    title: 'Wellness and therapy rooms',
    icon: Sparkles,
  },
  {
    title: 'Fitness and movement spaces',
    icon: Dumbbell,
  },
  {
    title: 'Arts and activity studios',
    icon: Palette,
  },
  {
    title: 'Performance and events hall',
    icon: Music,
  },
]

export default function ClubAmaya() {
  return (
    <section className="bg-stone section-pad overflow-hidden px-6 lg:px-16">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal direction="left">
            <div className="group relative h-80 overflow-hidden rounded lg:h-[480px]">
              <Image
                src="/images/08_community_amphitheatre_stepped_garden.jpg"
                alt="Club Amaya stepped amphitheatre and landscaped community garden"
                fill
                priority
                className="object-cover object-center transition-transform duration-[1200ms] group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />

              <div className="absolute bottom-5 left-5 right-5">
                <span className="rounded-full bg-navy-deep/60 px-3 py-1.5 font-sans text-[10px] uppercase tracking-[0.2em] text-limestone/70 backdrop-blur-xs">
                  Community Spaces
                </span>
              </div>
            </div>
          </Reveal>
          <Reveal direction="right">
            <SectionLabel>Club Amaya</SectionLabel>

            <h2
              className="mb-2 font-serif font-light text-charcoal"
              style={{
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                lineHeight: '1.15',
              }}
            >
              A clubhouse that earns its name.
            </h2>

            <Divider className="my-6" />

            <p className="mb-8 max-w-xl font-sans text-[15px] font-light leading-relaxed text-text-mid">
              34,000 square feet of thoughtfully designed spaces for
              dining, wellness, creativity, fitness, and community —
              all under one beautifully crafted roof.
            </p>
            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {features.map((feature) => {
                const Icon = feature.icon

                return (
                  <div
                    key={feature.title}
                    className="flex items-center gap-3 rounded-lg border border-black/5 bg-white/40 px-4 py-3 transition-all duration-300 hover:border-brass/20 hover:bg-white/70"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brass/10 text-brass">
                      <Icon size={18} strokeWidth={1.8} />
                    </div>

                    <span className="font-sans text-[13px] font-light text-text-mid">
                      {feature.title}
                    </span>
                  </div>
                )
              })}
            </div>


            <Link
              href="/club"
              className="inline-flex items-center gap-2 rounded-sm bg-brass px-6 py-3 font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-white transition-all duration-200 hover:bg-opacity-90"
            >
              Explore Club Amaya
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}