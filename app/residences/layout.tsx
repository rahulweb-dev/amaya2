import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Residences',
  description:
    'Five senior-friendly residence configurations at Amaya — 1, 2, 2.5, 3, and 3.5 BHK — designed for accessibility, light, and quiet comfort.',
}

export default function ResidencesLayout({ children }: { children: ReactNode }) {
  return children
}
