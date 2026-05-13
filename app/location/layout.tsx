import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Location and nature',
  description:
    'Amaya is located in Medchal, Hyderabad — adjoining a 600-acre reserve forest and around 15 minutes from Nehru Outer Ring Road.',
}

export default function LocationLayout({ children }: { children: ReactNode }) {
  return children
}
