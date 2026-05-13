'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import type { GalleryImage } from '@/lib/siteData'

interface LightboxProps {
  images: GalleryImage[]
  index: number | null
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export default function Lightbox({ images, index, onClose, onPrev, onNext }: LightboxProps) {
  useEffect(() => {
    if (index === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [index, onClose, onPrev, onNext])

  const image = index !== null ? images[index] : null

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          className="fixed inset-0 z-[400] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          <div className="absolute inset-0 bg-navy-deep/95" onClick={onClose} />

          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-5 z-10 text-limestone/70 hover:text-limestone text-3xl leading-none"
          >
            &times;
          </button>

          <button
            onClick={onPrev}
            aria-label="Previous image"
            className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full border border-limestone/30 text-limestone/80 hover:text-limestone hover:border-limestone/70 items-center justify-center transition"
          >
            &larr;
          </button>
          <button
            onClick={onNext}
            aria-label="Next image"
            className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full border border-limestone/30 text-limestone/80 hover:text-limestone hover:border-limestone/70 items-center justify-center transition"
          >
            &rarr;
          </button>

          <motion.div
            key={image.src}
            className="relative w-full max-w-5xl mx-auto px-4"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
            <div className="text-center mt-5">
              <div className="font-sans text-[10px] tracking-[0.24em] uppercase text-brass/80 mb-1">
                {image.label}
              </div>
              <p className="font-serif text-lg text-limestone font-light">{image.caption}</p>
            </div>
            <div className="text-center mt-2 font-sans text-[11px] text-stone/40">
              {(index ?? 0) + 1} / {images.length}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
