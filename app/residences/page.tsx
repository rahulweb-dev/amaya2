'use client';

import { useModal } from '@/components/layout/ModalContext';
import Reveal from '@/components/ui/Reveal';
import SectionLabel from '@/components/ui/SectionLabel';
import { residences } from '@/lib/siteData';

export default function ResidencesPage() {
  const { openModal } = useModal();

  return (
    <>
      <div className='bg-navy pt-28 pb-14 px-6 lg:px-16'>
        <div className='max-w-[1200px] mx-auto'>
          <SectionLabel light>Residences</SectionLabel>
          <h1
            className='font-serif font-light text-limestone mb-4'
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: '1.1' }}
          >
            Homes designed for the life you want to live.
          </h1>
          <p className='font-sans font-light text-stone/65 text-[15px] max-w-lg leading-relaxed'>
            Five configurations. Every one designed for accessibility, light,
            ventilation, privacy, and quiet comfort. Floor plan illustrations
            are indicative and subject to final regulatory approval.
          </p>
        </div>
      </div>

      <section className='bg-mist section-pad px-6 lg:px-16'>
        <div className='max-w-[1200px] mx-auto'>
          <Reveal>
            <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-16'>
              {[
                {
                  title: 'Senior-friendly design',
                  body: 'Wider doorways, lever handles, slip-resistant floors, ramp access, and thoughtfully planned lighting.',
                  number: '01',
                },
                {
                  title: 'Light and air',
                  body: 'Cross ventilation, generous balconies, and expansive windows create naturally bright interiors.',
                  number: '02',
                },
                {
                  title: 'Privacy by layout',
                  body: 'Residences are carefully planned to maintain quiet privacy while staying connected to community spaces.',
                  number: '03',
                },
                {
                  title: 'Maintenance, handled',
                  body: 'Long-term maintenance and daily management handled seamlessly by the Vera Vita team.',
                  number: '04',
                },
              ].map((p, i) => (
                <div
                  key={p.title}
                  className='
          group
          relative
          overflow-hidden

          rounded-2xl
          border border-stone/70

          bg-white

          p-7

          shadow-sm

          transition-all duration-500

          hover:-translate-y-1
          hover:border-brass/30
          hover:shadow-xl
        '
                >
                  {/* BACKGROUND NUMBER */}
                  <div
                    className='
            absolute
            right-5
            top-4

            font-serif
            text-6xl
            font-light

            text-charcoal/[0.04]

            transition-all duration-500
            group-hover:text-brass/[0.08]
          '
                  >
                    {p.number}
                  </div>

                  {/* TOP LINE */}
                  <div className='mb-5 h-[2px] w-12 bg-brass/70 transition-all duration-300 group-hover:w-20' />

                  {/* TITLE */}
                  <h3
                    className='
            relative
            z-10

            mb-4

            font-serif
            text-[22px]
            font-light
            leading-snug

            text-charcoal
          '
                  >
                    {p.title}
                  </h3>

                  {/* BODY */}
                  <p
                    className='
            relative
            z-10

            font-sans
            text-[14px]
            font-light
            leading-[1.9]

            text-text-mid
          '
                  >
                    {p.body}
                  </p>

                  {/* HOVER GLOW */}
                  <div
                    className='
            pointer-events-none
            absolute
            inset-0

            opacity-0

            bg-gradient-to-br
            from-brass/[0.03]
            to-transparent

            transition-opacity duration-500

            group-hover:opacity-100
          '
                  />
                </div>
              ))}
            </div>
          </Reveal>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12'>
            {residences.map((res, i) => (
              <Reveal key={res.title} delay={i * 0.08}>
                <div
                  className={`bg-white border rounded overflow-hidden h-full flex flex-col ${
                    res.featured ? 'border-brass' : 'border-stone'
                  }`}
                >
                  <div className='h-44 bg-surface-alt flex items-center justify-center border-b border-stone relative'>
                    <div className='text-center'>
                      <div className='font-serif text-3xl font-light text-charcoal/20 mb-1'>
                        {res.title}
                      </div>
                      <div className='font-sans text-[10px] tracking-[0.18em] uppercase text-text-muted'>
                        Floor plan illustrative
                      </div>
                    </div>
                    {res.featured && (
                      <div className='absolute top-3 right-3 font-sans text-[9px] tracking-[0.14em] uppercase bg-brass/15 text-brass px-2.5 py-1 rounded-full'>
                        Featured
                      </div>
                    )}
                  </div>
                  <div className='p-6 flex flex-col flex-1'>
                    <div className='font-sans text-[10px] tracking-[0.2em] uppercase text-brass mb-2'>
                      {res.type}
                    </div>
                    <h3 className='font-serif text-xl font-normal text-charcoal mb-1'>
                      {res.title}
                    </h3>
                    <p className='font-sans font-light text-[13px] text-text-mid mb-4 leading-relaxed'>
                      {res.body}
                    </p>
                    <div className='flex gap-6 mb-4 text-[12px] font-sans font-light text-text-mid'>
                      <span>
                        <strong className='block text-[9px] tracking-[0.1em] uppercase text-brass font-medium mb-0.5'>
                          Built-up
                        </strong>
                        {res.area}
                      </span>
                      <span>
                        <strong className='block text-[9px] tracking-[0.1em] uppercase text-brass font-medium mb-0.5'>
                          Balconies
                        </strong>
                        {res.balconies}
                      </span>
                    </div>
                    <ul className='space-y-1.5 mb-5 flex-1'>
                      {res.features.map((f) => (
                        <li
                          key={f}
                          className='font-sans font-light text-[12.5px] text-text-mid border-b border-stone/50 pb-1.5'
                        >
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className='flex gap-2 flex-wrap'>
                      <button
                        onClick={() =>
                          openModal('floorplan', `residence:${res.slug}`)
                        }
                        className='font-sans text-[11px] font-medium tracking-[0.06em] uppercase bg-brass text-white px-4 py-2 rounded-sm hover:bg-opacity-88 transition-all'
                      >
                        Floor Plan
                      </button>
                      <button
                        onClick={() =>
                          openModal('enquiry', `residence:${res.slug}`)
                        }
                        className='font-sans text-[11px] font-medium tracking-[0.06em] uppercase border border-brass text-brass px-4 py-2 rounded-sm hover:bg-brass hover:text-white transition-all'
                      >
                        Enquire
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className='bg-white border border-stone rounded p-6 lg:p-8 overflow-x-auto'>
              <SectionLabel>Compare residences</SectionLabel>
              <p className='font-sans font-light text-text-mid text-sm mb-5'>
                All areas and specifications are indicative and subject to final
                approval.
              </p>
              <table className='w-full font-sans text-sm border-collapse min-w-[560px]'>
                <thead>
                  <tr className='border-b-2 border-stone'>
                    <th className='text-left py-2.5 px-3 text-[10px] tracking-[0.12em] uppercase text-brass font-medium'>
                      Feature
                    </th>
                    {['1 BHK', '2 BHK', '2.5 BHK', '3 BHK', '3.5 BHK'].map(
                      (t, i) => (
                        <th
                          key={t}
                          className={`py-2.5 px-3 text-[12px] font-medium ${
                            i === 2 ? 'text-brass' : 'text-text-mid'
                          }`}
                        >
                          {t}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      label: 'Approx. built-up',
                      values: [
                        '680 sq ft',
                        '950 sq ft',
                        '1,150 sq ft',
                        '1,400 sq ft',
                        '1,700 sq ft',
                      ],
                    },
                    { label: 'Balconies', values: ['1', '2', '2', '2', '3'] },
                    {
                      label: 'Study / flex room',
                      values: ['-', '-', 'Yes', 'Yes', 'Yes'],
                    },
                    {
                      label: 'Guest bedroom',
                      values: ['-', '-', '-', 'Yes', 'Yes'],
                    },
                  ].map((row) => (
                    <tr key={row.label} className='border-b border-mist'>
                      <td className='py-2.5 px-3 text-text-mid font-light'>
                        {row.label}
                      </td>
                      {row.values.map((v, i) => (
                        <td
                          key={i}
                          className={`py-2.5 px-3 text-center font-light ${
                            i === 2
                              ? 'font-medium text-charcoal'
                              : v === '-'
                                ? 'text-text-muted'
                                : 'text-text-mid'
                          }`}
                        >
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
