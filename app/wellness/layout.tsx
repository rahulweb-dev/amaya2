import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Wellness and support',
  description:
    'Preventative wellness, everyday support, on-site response, and active ageing at Amaya — independent living, beautifully supported.',
}

export default function WellnessLayout({ children }: { children: ReactNode }) {
  return children
}
