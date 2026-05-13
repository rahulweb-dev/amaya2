'use client'

import { ReactNode } from 'react'
import { motion, useReducedMotion, Variants } from 'framer-motion'

interface RevealProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
  className?: string
  once?: boolean
  threshold?: number
}

export default function Reveal({
  children,
  delay = 0,
  direction = 'up',
  className,
  once = true,
  threshold = 0.12,
}: RevealProps) {
  const prefersReduced = useReducedMotion()

  const variants: Variants = {
    hidden: prefersReduced
      ? { opacity: 0 }
      : {
          opacity: 0,
          y: direction === 'up' ? 28 : 0,
          x: direction === 'left' ? -28 : direction === 'right' ? 28 : 0,
        },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.75,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-60px' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
