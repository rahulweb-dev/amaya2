'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { useModal } from './ModalContext';

import { CONTACT, NAV_LINKS, RERA_REGISTRATION, SITE } from '@/lib/constants';

// ======================================================
// WHATSAPP LINK
// ======================================================

const whatsappHref = `https://wa.me/${
  CONTACT.whatsappNumber
}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`;

// ======================================================
// MAIN COMPONENT
// ======================================================

export default function Footer() {
  const { openModal } = useModal();

  return (
    <footer
      className='
        relative
        overflow-hidden
        border-t border-brass/20
        bg-navy
        px-6 lg:px-16
        pt-20 pb-8
      '
    >
      {/* ====================================================== */}
      {/* BACKGROUND GLOW */}
      {/* ====================================================== */}

      <div className='absolute inset-0 pointer-events-none'>
        <div
          className='
            absolute
            top-0 left-1/2
            -translate-x-1/2
            h-[400px] w-[400px]
            rounded-full
            bg-brass/5
            blur-3xl
          '
        />
      </div>

      {/* ====================================================== */}
      {/* CONTAINER */}
      {/* ====================================================== */}

      <div className='relative max-w-[1200px] mx-auto'>
        {/* ====================================================== */}
        {/* TOP GRID */}
        {/* ====================================================== */}

        <div
          className='
            grid
            grid-cols-1
            md:grid-cols-[1.7fr_1fr_1fr]
            gap-12
            pb-14
          '
        >
          {/* ====================================================== */}
          {/* BRAND SECTION */}
          {/* ====================================================== */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Logo */}
            <div className='mb-5'>
              <Image
                src='/images/Amaya_Logo_Final.webp'
                alt='amaya logo'
                height={100}
                width={140}
              />
            </div>

            {/* Description */}
            <p
              className='
                max-w-[360px]
                font-sans
                text-[15px]
                leading-relaxed
                font-light
                text-stone/65
                mb-6
              '
            >
              A calm residential community designed for elegant living, peaceful
              surroundings, and beautifully supported independence in Medchal,
              Hyderabad.
            </p>

            {/* Contact Info */}
            <div className='space-y-3'>
              {/* Phone */}
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className='
                  flex items-center gap-3
                  text-stone/60
                  hover:text-limestone
                  transition-colors duration-300
                '
              >
                <Phone size={16} />

                <span
                  className='
                    font-sans
                    text-sm
                    font-light
                  '
                >
                  {CONTACT.phoneDisplay}
                </span>
              </a>

              {/* Email */}
              <a
                href={`mailto:${CONTACT.email}`}
                className='
                  flex items-center gap-3
                  text-stone/60
                  hover:text-limestone
                  transition-colors duration-300
                '
              >
                <Mail size={16} />

                <span
                  className='
                    font-sans
                    text-sm
                    font-light
                  '
                >
                  {CONTACT.email}
                </span>
              </a>

              {/* Address */}
              <div
                className='
                  flex items-start gap-3
                  text-stone/60
                '
              >
                <MapPin size={16} className='mt-1' />

                <span
                  className='
                    font-sans
                    text-sm
                    leading-relaxed
                    font-light
                  '
                >
                  {CONTACT.addressLine2},
                  <br />
                  {CONTACT.addressLine3}
                </span>
              </div>
            </div>
          </motion.div>

          {/* ====================================================== */}
          {/* EXPLORE LINKS */}
          {/* ====================================================== */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.1,
            }}
          >
            <h3
              className='
                mb-6
                font-sans
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.22em]
                text-brass
              '
            >
              Explore
            </h3>

            <div className='flex flex-col gap-4'>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className='
                    group
                    flex items-center
                    justify-between

                    font-sans
                    text-sm
                    font-light
                    text-stone/65

                    hover:text-limestone

                    transition-all duration-300
                  '
                >
                  {link.label}

                  <ArrowUpRight
                    size={14}
                    className='
                      opacity-0
                      -translate-x-1

                      group-hover:opacity-100
                      group-hover:translate-x-0

                      transition-all duration-300
                    '
                  />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* ====================================================== */}
          {/* CONTACT ACTIONS */}
          {/* ====================================================== */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.2,
            }}
          >
            <h3
              className='
                mb-6
                font-sans
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.22em]
                text-brass
              '
            >
              Get in Touch
            </h3>

            <div className='flex flex-col gap-4'>
              {/* Book Visit */}
              <button
                onClick={() => openModal('visit')}
                className='
                  group
                  flex items-center
                  justify-between

                  border border-brass/20
                  px-5 py-4
                  rounded-sm

                  hover:border-brass/50
                  hover:bg-brass/5

                  transition-all duration-300
                '
              >
                <span
                  className='
                    font-sans
                    text-sm
                    font-light
                    text-limestone
                  '
                >
                  Book a Visit
                </span>

                <ArrowUpRight size={16} className='text-white' />
              </button>

              {/* Download Brochure */}
              <button
                onClick={() => openModal('brochure')}
                className='
                  group
                  flex items-center
                  justify-between

                  border border-brass/20
                  px-5 py-4
                  rounded-sm

                  hover:border-brass/50
                  hover:bg-brass/5

                  transition-all duration-300
                '
              >
                <span
                  className='
                    font-sans
                    text-sm
                    font-light
                    text-limestone
                  '
                >
                  Download Brochure
                </span>

                <ArrowUpRight size={16} className='text-white' />
              </button>

              {/* Contact */}
              <Link
                href='/contact'
                className='
                  group
                  flex items-center
                  justify-between

                  border border-brass/20
                  px-5 py-4
                  rounded-sm

                  hover:border-brass/50
                  hover:bg-brass/5

                  transition-all duration-300
                '
              >
                <span
                  className='
                    font-sans
                    text-sm
                    font-light
                    text-limestone
                  '
                >
                  Request Callback
                </span>

                <ArrowUpRight size={16} className='text-white' />
              </Link>

              {/* WhatsApp */}
              <a
                href={whatsappHref}
                target='_blank'
                rel='noopener noreferrer'
                className='
                  group
                  flex items-center
                  justify-between

                  border border-brass/20
                  px-5 py-4
                  rounded-sm

                  hover:border-brass/50
                  hover:bg-brass/5

                  transition-all duration-300
                '
              >
                <span
                  className='
                    font-sans
                    text-sm
                    font-light
                    text-limestone
                  '
                >
                  WhatsApp
                </span>

                <ArrowUpRight size={16} className='text-white' />
              </a>
            </div>
          </motion.div>
        </div>

        {/* ====================================================== */}
        {/* BOTTOM BAR */}
        {/* ====================================================== */}

        <div
          className='
            flex flex-col lg:flex-row
            items-start lg:items-center
            justify-between
            gap-4

            border-t border-limestone/10
            pt-6
          '
        >
          {/* Left */}
          <p
            className='
              max-w-[800px]
              font-sans
              text-[11px]
              leading-relaxed
              font-light
              text-stone/40
            '
          >
            {RERA_REGISTRATION}
            <span className='mx-2'>|</span>
            {SITE.legalEntity}
            <span className='mx-2'>|</span>
            {CONTACT.addressLine2}, {CONTACT.addressLine3}
          </p>

          {/* Right */}
          <div
            className='
              flex items-center gap-5
            '
          >
            <Link
              href='/contact'
              className='
                font-sans
                text-[11px]
                font-light
                text-stone/40

                hover:text-stone/70

                transition-colors duration-300
              '
            >
              Privacy Policy
            </Link>

            <Link
              href='/contact'
              className='
                font-sans
                text-[11px]
                font-light
                text-stone/40

                hover:text-stone/70

                transition-colors duration-300
              '
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
