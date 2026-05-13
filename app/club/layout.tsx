import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Club Amaya',
  description:
    'Club Amaya — 34,000 square feet of clubhouse spaces planned around dining, wellness, arts, fitness, performance, and community.',
}

export default function ClubLayout({ children }: { children: ReactNode }) {
  return children
}
