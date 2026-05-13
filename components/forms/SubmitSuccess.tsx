'use client'

import { motion } from 'framer-motion'

interface SubmitSuccessProps {
  title: string
  body: string
  compact?: boolean
}

export default function SubmitSuccess({ title, body, compact = false }: SubmitSuccessProps) {
  return (
    <motion.div
      className={`text-center ${compact ? 'py-4' : 'py-8'}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      role="status"
      aria-live="polite"
    >
      <div className={`text-sage ${compact ? 'text-2xl mb-2' : 'text-4xl mb-4'}`}>&#10003;</div>
      <h3 className={`font-serif text-charcoal mb-1 ${compact ? 'text-base' : 'text-xl'}`}>
        {title}
      </h3>
      <p className="font-sans text-sm text-text-mid font-light max-w-sm mx-auto leading-relaxed">
        {body}
      </p>
    </motion.div>
  )
}
