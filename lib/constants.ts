/**
 * Project-wide constants for the Amaya marketing site.
 *
 * Contact details, RERA, addresses and brochure links should be sourced from
 * environment variables (see `.env.example`) once the dev team wires them up.
 *
 * TODO(dev): Replace placeholder phone, email, address, and RERA strings
 * with values verified by the Amaya / Vera Vita team. Track in CONTENT_TODO.md.
 */

export const SITE = {
  name: 'Amaya',
  byline: 'by Vera Vita',
  legalEntity: 'Vera Vita Developments Pvt. Ltd.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://amaya.veravita.com',
  description:
    'Independent senior living by Vera Vita. A calm residential community in Medchal, Hyderabad — designed around comfort, community, nature, and quiet reassurance.',
} as const

export const CONTACT = {
  // TODO(dev): replace placeholder phone with verified sales line.
  phoneDisplay: '+91 98000 98000',
  phoneTel: '+919800098000',
  // TODO(dev): replace with verified WhatsApp business number.
  whatsappNumber: '919800098000',
  whatsappMessage: 'Hello, I would like to know more about Amaya by Vera Vita.',
  // TODO(dev): replace with verified inbox.
  email: 'hello@amaya.veravita.com',
  addressLine1: 'Amaya Experience Centre',
  addressLine2: 'Medchal, Nehru Outer Ring Road',
  addressLine3: 'Hyderabad, Telangana',
} as const

export const SEO = {
  defaultTitle: 'Amaya by Vera Vita | Senior Living, Medchal Hyderabad',
  titleTemplate: '%s | Amaya by Vera Vita',
  description: SITE.description,
  keywords: [
    'senior living Hyderabad',
    'independent living Medchal',
    'Amaya by Vera Vita',
    'retirement community Hyderabad',
    'senior apartments Telangana',
  ],
  ogImage: '/images/01_home_hero_facade_wide.jpg',
} as const

// TODO(dev): confirm and replace with verified RERA registration number.
export const RERA_REGISTRATION = '[RERA Registration No. To be confirmed]'

export const NAV_LINKS = [
  { label: 'Residences', href: '/residences' },
  { label: 'Floor Plans', href: '/floor-plans' },
  { label: 'Club Amaya', href: '/club' },
  { label: 'Wellness', href: '/wellness' },
  { label: 'Location', href: '/location' },
  { label: 'Amenities', href: '/amenities' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
] as const
