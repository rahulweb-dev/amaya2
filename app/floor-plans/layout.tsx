import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Floor Plans',
  description:
    'Illustrative floor plans for every Amaya residence configuration. Final plans are subject to regulatory approval.',
}

export default function FloorPlansLayout({ children }: { children: ReactNode }) {
  return children
}
