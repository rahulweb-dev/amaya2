'use client';

import Image from 'next/image';
import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { useModal } from '../layout/ModalContext';
import { heroStats as stats } from '@/lib/siteData';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { openModal } = useModal();
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', prefersReduced ? '0%' : '18%'],
  );
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', prefersReduced ? '0%' : '6%'],
  );
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.55, 0.78]);

  return (
    <section
      ref={ref}
      className='relative h-screen min-h-[640px] overflow-hidden bg-navy-deep'
    >
      <motion.div
        style={{ y: imageY }}
        className='absolute inset-0 scale-110 origin-center'
      >
        <Image
          src='/images/01_home_hero_facade_wide.jpg'
          alt='Amaya by Vera Vita, Medchal, Hyderabad — exterior facade wide view'
          fill
          priority
          className='object-cover object-center'
          sizes='100vw'
          quality={85}
        />
      </motion.div>

      {/* <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/60 to-navy-deep/20 pointer-events-none"
      /> */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className='absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none'
      />
      <div className='absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-black/30 pointer-events-none' />

      <motion.div
        style={{ y: contentY }}
        className='relative h-full flex flex-col justify-end pb-0'
      >
        <div className='max-w-[1200px] mx-auto px-6 lg:px-16 w-full pb-0'>
          <div className='max-w-xl pb-16 lg:pb-24'>
            {/* <motion.span
              className="block font-sans text-[14px] font-semibold tracking-[0.4em] uppercase text-brass/80 mb-7"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Medchal, Hyderabad
            </motion.span> */}

            <motion.h1
              className='font-serif font-light text-white leading-[0.92] mb-5'
              style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.38,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Where life <br />
              finds its
              <br />
              <em className='text-limestone/70 not-italic'>perfect rhythm.</em>
            </motion.h1>

            <motion.p
              className='font-sans font-light text-stone/75 text-base lg:text-[19px] leading-relaxed max-w-md mb-9'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Independent senior living by Vera Vita, designed around comfort,
              community, nature, and quiet reassurance.
            </motion.p>

            <motion.div
              className='flex gap-3 flex-wrap'
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <button
                onClick={() => openModal('visit')}
                className='font-sans text-xs font-medium tracking-[0.1em] uppercase bg-brass text-white px-7 py-3.5 rounded-sm hover:bg-opacity-88 active:scale-[0.98] transition-all duration-200'
              >
                Book a Visit
              </button>
              <button
                onClick={() => openModal('brochure')}
                className='font-sans text-xs font-medium tracking-[0.1em] uppercase bg-transparent text-limestone border border-limestone/40 px-7 py-3.5 rounded-sm hover:border-limestone/80 transition-all duration-200'
              >
                Download Brochure
              </button>
            </motion.div>
          </div>
        </div>

        <motion.div
          className='border-t border-white/8 w-full'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <div className='max-w-[1200px] mx-auto px-6 lg:px-16'>
            <div className='grid grid-cols-2 lg:grid-cols-4'>
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`py-5 ${i < 3 ? 'lg:border-r border-white/7' : ''} ${i > 0 ? 'pl-5 lg:pl-7' : ''}`}
                >
                  <div className='font-serif text-3xl font-normal text-limestone/80'>
                    {stat.value}
                  </div>
                  <div className='font-sans text-[16px] font-light text-stone/50 tracking-[0.04em] mt-0.5 leading-snug'>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
