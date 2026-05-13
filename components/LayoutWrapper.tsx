'use client'

import { usePathname } from 'next/navigation'
import Header from './layout/Header'
import Footer from './layout/Footer'


export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname =
    usePathname()

  const isAdmin =
    pathname.startsWith(
      '/admin'
    )

  return (
    <>
      {!isAdmin && <Header />}

      <main id="main">
        {children}
      </main>

      {!isAdmin && <Footer />}
    </>
  )
}