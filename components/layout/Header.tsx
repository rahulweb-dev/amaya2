'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from './ModalContext';
import { NAV_LINKS } from '@/lib/constants';
import Image from 'next/image';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openModal } = useModal();
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const navBg = isHome
    ? scrolled
      ? 'bg-[#1D2F3F] backdrop-blur-md border-brass/20'
      : 'bg-[#1D2F3F] border-transparent'
    : 'bg-navy-deep/97 backdrop-blur-md border-brass/20';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-500 border-b ${navBg}`}
      >
        <div className='max-w-[1450px] mx-auto px-6 lg:px-16 flex items-center justify-between h-16'>
          <Link
            href='/'
            className='flex flex-col leading-none group'
            aria-label='Amaya by Vera Vita — Home'
          >
            <Image
              src='/images/Amaya_Logo_Final.webp'
              alt='amaya logo'
              height={100}
              width={140}
            />
          </Link>

          <nav
            className='hidden lg:flex items-center gap-7'
            aria-label='Primary'
          >
            {NAV_LINKS.filter((l) => l.href !== '/contact').map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative font-sans text-xs font-medium tracking-[0.18em] uppercase transition-colors duration-200 ${
                    active
                      ? 'text-limestone'
                      : 'text-stone/70 hover:text-limestone'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  {link.label}
                  {active && (
                    <span
                      className='absolute -bottom-1 left-0 right-0 h-px bg-brass'
                      aria-hidden
                    />
                  )}
                </Link>
              );
            })}
            <button
              onClick={() => openModal('visit')}
              className='ml-2 font-sans text-[10px] font-medium tracking-[0.1em] uppercase bg-brass  text-white px-5 py-2.5 rounded-sm hover:bg-opacity-88 active:scale-[0.98] transition-all duration-200'
            >
              Book a Visit
            </button>
            <button
              onClick={() => openModal('brochure')}
              className='font-sans text-[10px] border border-limestone/40 px-5 py-2.5 rounded-sm font-medium hover:border-limestone/80 tracking-[0.18em] uppercase text-stone/70 hover:text-limestone transition-colors'
            >
              Brochure
            </button>
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className='lg:hidden flex flex-col gap-[5px] p-1'
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <motion.span
              className='block w-5 h-px bg-limestone'
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className='block w-5 h-px bg-limestone'
              animate={{ opacity: menuOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className='block w-5 h-px bg-limestone'
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className='fixed inset-0 z-[190] bg-navy-deep flex flex-col items-center justify-center gap-6 px-6'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {NAV_LINKS.map((link, i) => {
              const active = pathname === link.href;
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: i * 0.06,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    className={`font-serif text-2xl font-normal tracking-wide ${
                      active ? 'text-brass' : 'text-limestone'
                    }`}
                    aria-current={active ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              );
            })}
            <motion.div
              className='flex flex-col sm:flex-row gap-3 mt-3'
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: NAV_LINKS.length * 0.06,
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <button
                onClick={() => {
                  openModal('visit');
                  setMenuOpen(false);
                }}
                className='font-sans text-xs font-medium tracking-[0.12em] uppercase bg-brass text-white px-8 py-3.5 rounded-sm'
              >
                Book a Visit
              </button>
              <button
                onClick={() => {
                  openModal('brochure');
                  setMenuOpen(false);
                }}
                className='font-sans text-xs font-medium tracking-[0.12em] uppercase border border-limestone/50 text-limestone px-8 py-3.5 rounded-sm'
              >
                Download Brochure
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
