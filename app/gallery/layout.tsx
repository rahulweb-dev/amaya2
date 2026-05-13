import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Architectural renders and visualisations of Amaya by Vera Vita.',
}

export default function GalleryLayout({ children }: { children: ReactNode }) {
  return children
}
