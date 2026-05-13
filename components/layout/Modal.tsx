'use client'

import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useModal } from './ModalContext'
import BookVisitForm from '@/components/forms/BookVisitForm'
import BrochureForm from '@/components/forms/BrochureForm'
import EnquiryForm from '@/components/forms/EnquiryForm'

const titles: Record<string, { title: string; sub: string }> = {
  visit: {
    title: 'Book a Visit',
    sub: 'Visit the Amaya experience centre and walk through the model residence, clubhouse vision, and community plan with our team.',
  },
  brochure: {
    title: 'Download Brochure',
    sub: 'Receive the Amaya project brochure directly to your inbox.',
  },
  floorplan: {
    title: 'Download Floor Plan',
    sub: 'Leave your details and we will send the illustrative floor plan to you. Final plans are subject to regulatory approval.',
  },
  enquiry: {
    title: 'Enquire About This Home',
    sub: 'Tell us which home you are interested in and we will be in touch.',
  },
}

export default function Modal() {
  const { activeModal, modalContext, closeModal } = useModal()

  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [activeModal])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [closeModal])

  const meta = activeModal ? titles[activeModal] : null

  return (
    <AnimatePresence>
      {activeModal && meta && (
        <motion.div
          className="fixed inset-0 z-[300] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="amaya-modal-title"
        >
          <div
            className="absolute inset-0 bg-navy-deep/85 backdrop-blur-sm"
            onClick={closeModal}
          />
          <motion.div
            className="relative bg-surface w-full max-w-md rounded max-h-[90vh] overflow-y-auto shadow-2xl"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-5 text-text-muted hover:text-charcoal transition-colors text-2xl leading-none z-10"
              aria-label="Close"
            >
              &times;
            </button>

            <div className="p-8 sm:p-10">
              <h2
                id="amaya-modal-title"
                className="font-serif text-2xl font-normal text-charcoal mb-2"
              >
                {meta.title}
              </h2>
              <p className="text-sm text-text-mid mb-7 leading-relaxed font-light">{meta.sub}</p>

              {activeModal === 'visit' && <BookVisitForm context={modalContext} />}
              {activeModal === 'brochure' && (
                <BrochureForm variant="brochure" context={modalContext} />
              )}
              {activeModal === 'floorplan' && (
                <BrochureForm variant="floorplan" context={modalContext} />
              )}
              {activeModal === 'enquiry' && <EnquiryForm context={modalContext} />}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
