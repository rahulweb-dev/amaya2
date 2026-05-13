import type { Metadata } from 'next'
import Image from 'next/image'
import Reveal from '@/components/ui/Reveal'
import SectionLabel from '@/components/ui/SectionLabel'
import AmenityIcon from '@/components/ui/AmenityIcon'
import { amenityGroups } from '@/lib/siteData'

export const metadata: Metadata = {
  title: 'Amenities',
  description:
    'More than 100 planned amenities at Amaya, organised by community, wellness, safety, convenience, nature, and hospitality.',
}

export default function AmenitiesPage() {
  return (
    <>
      <div className="bg-navy pt-28 pb-14 px-6 lg:px-16">
        <div className="max-w-[1200px] mx-auto">
          <SectionLabel light>Amenities</SectionLabel>
          <h1
            className="font-serif font-light text-limestone mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: '1.1' }}
          >
            Everything that makes a day good.
          </h1>
          <p className="font-sans font-light text-stone/65 text-[15px] max-w-lg leading-relaxed">
            More than 100 planned amenities, organised around how you actually want to spend your
            time. Final list and availability subject to confirmation.
          </p>
        </div>
      </div>

      <section className="bg-limestone section-pad px-6 lg:px-16">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <div className="grid lg:grid-cols-2 gap-6 mb-14">
              <div className="relative h-56 lg:h-64 rounded overflow-hidden">
                <Image
                  src="/images/05_amenities_pool_courtyard_canopy.jpg"
                  alt="Central pool, canopy, steps and courtyard at Amaya amenities"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="relative h-56 lg:h-64 rounded overflow-hidden">
                <Image
                  src="/images/06_amenities_reflective_water_body_close.jpg"
                  alt="Reflective water body with facade and planted edges at Amaya"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {amenityGroups.map((group, i) => (
              <Reveal key={group.category} delay={i * 0.07}>
                <div className="bg-white border border-brass/15 rounded p-7 h-full flex flex-col group transition-all duration-400 hover:border-brass/40 hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-brass/15">
                    <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-brass/10 text-brass transition-colors group-hover:bg-brass group-hover:text-white">
                      <AmenityIcon category={group.category} />
                    </span>
                    <div>
                      <div className="font-sans text-[10px] font-semibold tracking-[0.24em] uppercase text-brass">
                        {group.category}
                      </div>
                      <p className="font-serif text-[15px] font-normal italic text-charcoal/85 leading-snug">
                        {group.blurb}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-0">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="font-sans font-light text-[13px] text-charcoal py-2 border-b border-brass/10 last:border-b-0 leading-snug"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12">
            <p className="font-sans font-light text-text-mid text-[12px] text-center">
              All amenities are planned. Details and availability are subject to final confirmation.
              {/* TODO(content): replace with the master amenity list signed off by Amaya. */}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
