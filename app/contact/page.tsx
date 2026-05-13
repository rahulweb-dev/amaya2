import type { Metadata } from 'next'
import BookVisitForm from '@/components/forms/BookVisitForm'
import BrochureForm from '@/components/forms/BrochureForm'
import CallbackForm from '@/components/forms/CallbackForm'
import ContactForm from '@/components/forms/ContactForm'
import Reveal from '@/components/ui/Reveal'
import SectionLabel from '@/components/ui/SectionLabel'
import { CONTACT } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Book a visit, request the brochure, or get in touch with the Amaya by Vera Vita team.',
}

const whatsappHref = `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(
  CONTACT.whatsappMessage,
)}`

export default function ContactPage() {
  return (
    <>
      <div className="bg-navy pt-28 pb-14 px-6 lg:px-16">
        <div className="max-w-[1200px] mx-auto">
          <SectionLabel light>Get in touch</SectionLabel>
          <h1
            className="font-serif font-light text-limestone mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: '1.1' }}
          >
            We would love to hear from you.
          </h1>
          <p className="font-sans font-light text-stone/65 text-[15px] max-w-lg leading-relaxed">
            Book a visit to the experience centre, download the brochure, or simply send us a note.
          </p>
        </div>
      </div>

      <section className="bg-mist section-pad px-6 lg:px-16">
        <div className="max-w-[1200px] mx-auto">
          {/* Contact info + visit form */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 mb-12">
            <Reveal>
              <div className="bg-navy rounded p-7 lg:p-9 text-limestone">
                <SectionLabel light>Reach us directly</SectionLabel>
                <h2 className="font-serif text-2xl font-light text-limestone mb-5">
                  Amaya Experience Centre
                </h2>

                <div className="space-y-5 mb-8">
                  <div>
                    <div className="font-sans text-[10px] tracking-[0.2em] uppercase text-brass mb-1">
                      Phone
                    </div>
                    <a
                      href={`tel:${CONTACT.phoneTel}`}
                      className="font-serif text-lg text-limestone hover:text-stone transition-colors"
                    >
                      {CONTACT.phoneDisplay}
                    </a>
                  </div>
                  <div>
                    <div className="font-sans text-[10px] tracking-[0.2em] uppercase text-brass mb-1">
                      Email
                    </div>
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="font-sans text-sm text-stone/80 hover:text-limestone transition-colors"
                    >
                      {CONTACT.email}
                    </a>
                  </div>
                  <div>
                    <div className="font-sans text-[10px] tracking-[0.2em] uppercase text-brass mb-1">
                      Address
                    </div>
                    <p className="font-sans text-sm text-stone/80 leading-relaxed font-light">
                      {CONTACT.addressLine1}
                      <br />
                      {CONTACT.addressLine2}
                      <br />
                      {CONTACT.addressLine3}
                    </p>
                    {/* TODO(content): replace with verified, RERA-aligned address. */}
                  </div>
                </div>

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-block font-sans text-[11px] font-medium tracking-[0.1em] uppercase border border-limestone/40 text-limestone px-6 py-3 rounded-sm hover:border-limestone hover:bg-limestone/5 transition-all"
                >
                  Chat on WhatsApp &rarr;
                </a>

                <p className="font-sans text-[11px] text-stone/45 mt-6 leading-relaxed font-light">
                  We respond to enquiries within one working day. By contacting us, you agree to be
                  reached on the details you have provided.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="bg-white border border-stone rounded p-7 lg:p-9">
                <h3 className="font-serif text-xl font-normal text-charcoal mb-1">Book a Visit</h3>
                <p className="font-sans font-light text-text-mid text-sm mb-6 leading-relaxed">
                  Visit the Amaya experience centre and walk through the model residence,
                  clubhouse vision, and community plan with our team.
                </p>
                <BookVisitForm submitLabel="Book my visit" />
              </div>
            </Reveal>
          </div>

          {/* Secondary forms */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Reveal>
              <div className="bg-white border border-stone rounded p-7 h-full">
                <h3 className="font-serif text-xl font-normal text-charcoal mb-1">
                  Download Brochure
                </h3>
                <p className="font-sans font-light text-text-mid text-sm mb-5 leading-relaxed">
                  Receive the Amaya project brochure directly to your inbox.
                </p>
                <BrochureForm variant="brochure" />
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="bg-white border border-stone rounded p-7 h-full">
                <h3 className="font-serif text-xl font-normal text-charcoal mb-1">
                  Request a Callback
                </h3>
                <p className="font-sans font-light text-text-mid text-sm mb-5 leading-relaxed">
                  Prefer a conversation? Leave your number and we will call you back.
                </p>
                <CallbackForm />
              </div>
            </Reveal>
          </div>

          {/* General contact */}
          <Reveal>
            <div className="bg-white border border-stone rounded p-7 lg:p-9 mb-6">
              <h3 className="font-serif text-xl font-normal text-charcoal mb-1">Send a message</h3>
              <p className="font-sans font-light text-text-mid text-sm mb-6 leading-relaxed">
                Have a question that does not fit any of the forms above? Write to us and we will
                get back within one working day.
              </p>
              <ContactForm />
            </div>
          </Reveal>

          {/* Map placeholder */}
          <Reveal>
            <div className="bg-surface-alt border border-stone rounded overflow-hidden">
              {/*
                TODO(dev): replace this placeholder with a real Google Maps embed
                (or a more privacy-preserving alternative such as a static MapTiler
                or Mapbox tile). Suggested options:
                  1. Embed a Google Maps iframe pointed at the verified Amaya site
                     coordinates. Use the official "embed" share URL.
                  2. For better LCP, use a static map image and lazy-load the iframe
                     on click.
                  3. If using Mapbox/MapTiler, expose the API key via NEXT_PUBLIC_MAP_KEY.
              */}
              <div className="h-72 lg:h-96 flex items-center justify-center text-center px-6">
                <div>
                  <div className="font-sans text-[10px] tracking-[0.24em] uppercase text-brass mb-2">
                    Map placeholder
                  </div>
                  <p className="font-serif text-lg text-charcoal mb-1">
                    {CONTACT.addressLine1}
                  </p>
                  <p className="font-sans text-sm text-text-mid font-light">
                    {CONTACT.addressLine2}, {CONTACT.addressLine3}
                  </p>
                  <p className="font-sans text-[11px] text-text-muted font-light mt-3">
                    Replace with a verified Google Maps embed before launch.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
