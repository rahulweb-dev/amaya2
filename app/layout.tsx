import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Jost } from 'next/font/google';
import './globals.css';
import { ModalProvider } from '@/components/layout/ModalContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Modal from '@/components/layout/Modal';
import { SEO, SITE } from '@/lib/constants';
import LayoutWrapper from '@/components/LayoutWrapper';
const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const jost = Jost({
  variable: '--font-jost',
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SEO.defaultTitle,
    template: SEO.titleTemplate,
  },
  description: SEO.description,
  keywords: [...SEO.keywords],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: `${SITE.name} ${SITE.byline}`,
    title: SEO.defaultTitle,
    description: SEO.description,
    url: SITE.url,
    images: [
      {
        url: SEO.ogImage,
        width: 1600,
        height: 1067,
        alt: 'Amaya by Vera Vita',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO.defaultTitle,
    description: SEO.description,
    images: [SEO.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
  // TODO(dev): add favicon, apple-touch-icon, and brand-aligned manifest in /public.
};

export const viewport: Viewport = {
  themeColor: '#23384A',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={`${cormorant.variable} ${jost.variable}`}>
      <body>
        <ModalProvider>
          <a
            href='#main'
            className='sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[300] focus:bg-brass focus:text-white focus:px-4 focus:py-2 focus:rounded-sm focus:font-sans focus:text-xs focus:tracking-wide'
          >
            Skip to content
          </a>

          <LayoutWrapper>
            <main id='main'>{children}</main>
          </LayoutWrapper>

          <Modal />
        </ModalProvider>
      </body>
    </html>
  );
}
