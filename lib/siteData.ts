/**
 * Single source of truth for marketing copy and structured content.
 *
 * Every page and section reads its content from this file. Editing copy here
 * propagates everywhere — there is no hidden inline copy in the components.
 *
 * TODO(dev): when a CMS is introduced (Sanity, Contentful, Payload, Strapi or
 * a Markdown source like Contentlayer), replace these constants with fetched
 * content while keeping the shape of each export stable so the components
 * continue to work unchanged.
 *
 * TODO(content): values flagged with `// TODO(content)` need verification by
 * the Amaya / Vera Vita team before launch. See CONTENT_TODO.md.
 */

import type { ReactNode } from 'react'

// -----------------------------------------------------------------------------
// Hero — homepage
// -----------------------------------------------------------------------------
export const heroStats = [
  { value: '256', label: 'Residences' }, // TODO(content): confirm exact unit count.
  { value: '34,000', label: 'sq ft Clubhouse (planned)' }, // TODO(content): confirm clubhouse area.
  { value: '600', label: 'Acre Reserve Forest, adjoining' }, // TODO(content): confirm phrasing acceptable from a legal/RERA perspective.
  { value: '100+', label: 'Curated Amenities (planned)' },
]

// -----------------------------------------------------------------------------
// Why Amaya — homepage
// -----------------------------------------------------------------------------
export const whyAmayaCards = [
  {
    num: '01',
    title: 'Community by choice.',
    body: 'Neighbours who share your values. Spaces that make connection natural, not forced. A life that is social when you want it, and quiet when you need it.',
  },
  {
    num: '02',
    title: 'Care when needed, freedom always.',
    body: 'Support is close, discreet, and designed around your life, not the other way around. You set the terms of each day.',
  },
  {
    num: '03',
    title: 'Support, close at hand.',
    body: 'Trained staff and everyday assistance are part of the community fabric, not an emergency service. Available when needed, invisible otherwise.',
  },
  {
    num: '04',
    title: 'Reassurance built into everyday living.',
    body: 'From the width of a doorway to the design of a common space, every decision at Amaya was made with ease and dignity in mind.',
  },
]

// -----------------------------------------------------------------------------
// Vera Vita operating principles — used on Wellness and About sections
// -----------------------------------------------------------------------------
export const veraVitaPrinciples = [
  {
    title: 'Responsibility',
    body: 'A long-term commitment to the people who choose Amaya as home. Maintenance, management, and care held to a single standard, year after year.',
  },
  {
    title: 'Response',
    body: 'When something is needed, someone answers. Trained staff on site, emergency call points across the community, and clear escalation paths to nearby hospitals.',
  },
  {
    title: 'Reassurance',
    body: 'Quiet confidence, woven into everyday life. Safety in the architecture, hospitality in the service, and dignity in every interaction.',
  },
]

// -----------------------------------------------------------------------------
// Residences
// -----------------------------------------------------------------------------
export interface Residence {
  slug: string
  type: string
  title: string
  area: string
  carpet: string
  balconies: string
  body: string
  features: string[]
  featured?: boolean
}

// TODO(content): confirm exact carpet and built-up areas for each configuration.
// All areas are currently illustrative and subject to RERA approval.
export const residences: Residence[] = [
  {
    slug: '1bhk',
    type: 'One Bedroom',
    title: '1 BHK',
    area: 'Approx. 680 sq ft',
    carpet: 'Approx. 560 sq ft',
    balconies: '1',
    body: 'A well-proportioned single-bedroom apartment for independent living.',
    features: [
      'Private balcony',
      'Cross ventilation',
      'Wider doorways and lever handles',
      'Emergency call points (planned)',
    ],
  },
  {
    slug: '2bhk',
    type: 'Two Bedroom',
    title: '2 BHK',
    area: 'Approx. 950 sq ft',
    carpet: 'Approx. 780 sq ft',
    balconies: '2',
    body: 'A comfortable two-bedroom home with generous living areas and two balconies.',
    features: [
      'Two private balconies',
      'Slip-resistant flooring',
      'Wider doorways and lever handles',
      'Emergency call points (planned)',
    ],
  },
  {
    slug: '25bhk',
    type: 'Two and a Half Bedroom',
    title: '2.5 BHK',
    area: 'Approx. 1,150 sq ft',
    carpet: 'Approx. 940 sq ft',
    balconies: '2',
    body: 'Our signature mid-range residence. A dedicated study, two generous balconies, and a sense of openness throughout.',
    features: [
      'Dedicated study / flex room',
      'Two generous balconies (select units forest-facing)',
      'Wider doorways and lever handles',
      'Slip-resistant surfaces throughout',
      'Emergency call points (planned)',
    ],
    featured: true,
  },
  {
    slug: '3bhk',
    type: 'Three Bedroom',
    title: '3 BHK',
    area: 'Approx. 1,400 sq ft',
    carpet: 'Approx. 1,150 sq ft',
    balconies: '2',
    body: 'Spacious and refined, with room for family and a comfortable guest space.',
    features: [
      'Guest bedroom',
      'Large living and dining',
      'Wider doorways and lever handles',
      'Emergency call points (planned)',
    ],
  },
  {
    slug: '35bhk',
    type: 'Three and a Half Bedroom',
    title: '3.5 BHK',
    area: 'Approx. 1,700 sq ft',
    carpet: 'Approx. 1,380 sq ft',
    balconies: '3',
    body: 'Our largest residence. Three balconies, a study, and generous space for life entirely on your own terms.',
    features: [
      'Dedicated guest bedroom',
      'Study and utility room',
      'Three balconies',
      'Emergency call points (planned)',
    ],
  },
]

// -----------------------------------------------------------------------------
// Floor plans
// -----------------------------------------------------------------------------
export interface FloorPlan {
  type: string
  label: string
  variant: string
  carpet: string
  buildup: string
  balconies: string
  /** TODO(content): replace with real PDF path once approved plans are ready. */
  pdf?: string
  featured?: boolean
}

export const floorPlans: FloorPlan[] = [
  { type: '1bhk', label: '1 BHK', variant: 'Type A', carpet: 'Approx. 560 sq ft', buildup: 'Approx. 680 sq ft', balconies: '1 balcony' },
  { type: '2bhk', label: '2 BHK', variant: 'Type A', carpet: 'Approx. 780 sq ft', buildup: 'Approx. 950 sq ft', balconies: '2 balconies' },
  { type: '25bhk', label: '2.5 BHK', variant: 'Type A', carpet: 'Approx. 940 sq ft', buildup: 'Approx. 1,150 sq ft', balconies: '2 balconies', featured: true },
  { type: '25bhk', label: '2.5 BHK', variant: 'Type B', carpet: 'Approx. 960 sq ft', buildup: 'Approx. 1,170 sq ft', balconies: '2 balconies' },
  { type: '3bhk', label: '3 BHK', variant: 'Type A', carpet: 'Approx. 1,150 sq ft', buildup: 'Approx. 1,400 sq ft', balconies: '2 balconies' },
  { type: '35bhk', label: '3.5 BHK', variant: 'Type A', carpet: 'Approx. 1,380 sq ft', buildup: 'Approx. 1,700 sq ft', balconies: '3 balconies' },
]

// -----------------------------------------------------------------------------
// Club Amaya
// -----------------------------------------------------------------------------
export const clubSpaces = [
  {
    title: 'Dining and social spaces',
    body: 'A dining hall for everyday meals and celebratory gatherings alike. Informal seating, private dining, and an all-day café. Layout proposed.',
  },
  {
    title: 'Library and reading rooms',
    body: 'Quiet rooms for reading, reflection, and conversation. Well-stocked, well-lit, and designed for long mornings.',
  },
  {
    title: 'Card rooms and games',
    body: 'Dedicated spaces for cards, chess, board games, and casual play.',
  },
  {
    title: 'Wellness and therapy rooms',
    body: 'Consultation rooms, physiotherapy, and relaxation spaces. Staffing partners to be confirmed.',
  },
  {
    title: 'Fitness and movement',
    body: 'A planned fitness centre, swimming pool, yoga studio, and movement spaces designed for all levels of activity.',
  },
  {
    title: 'Arts, crafts, and activity studios',
    body: 'Purpose-built spaces for painting, pottery, music, and creative pursuits.',
  },
  {
    title: 'Performance and events hall',
    body: 'A flexible auditorium for performances, film screenings, lectures, and community celebrations.',
  },
  {
    title: 'Guest and family visit areas',
    body: 'Comfortable spaces for visiting family within the clubhouse.',
  },
]

// -----------------------------------------------------------------------------
// Wellness — copy is intentionally cautious. Do not introduce hospital-level
// or medical-outcome claims without sign-off from the Amaya team and counsel.
// -----------------------------------------------------------------------------
export const wellnessCards = [
  {
    title: 'Preventative wellness',
    body: 'Programmes designed around active ageing — movement, nutrition, and routine — supported by trained wellness staff. Specifics to be finalised with our medical partner.',
  },
  {
    title: 'Everyday support',
    body: 'Trained staff, housekeeping, laundry, and concierge services available on request. The practical parts of everyday life, quietly handled.',
  },
  {
    title: 'On-site response',
    body: 'Emergency call points planned across residences and common areas, with a trained response team on site. Specialist care will be coordinated through nearby hospitals.',
  },
  {
    title: 'Safety by design',
    body: 'Wider corridors, lever handles, slip-resistant surfaces, ramp access, and considered lighting throughout. Safety lives in the architecture itself.',
  },
  {
    title: 'Active ageing',
    body: 'Fitness, yoga, swimming, walking trails, and group activities designed for all levels. Independence is best maintained by living it every day.',
  },
  {
    title: 'Senior-friendly planning',
    body: 'Every apartment and common area planned with ease of movement in mind, from doorway widths to bathroom layouts.',
  },
]

// TODO(content): the Amaya team and Vera Vita medical partner must finalise:
//  - the precise scope of on-site medical staffing (doctor, nurse, paramedic)
//  - the partner hospital(s) and SLA / response time
//  - emergency SOPs for cardiac, fall, and other common events
// Until then, copy on the Wellness page is deliberately conservative.

// -----------------------------------------------------------------------------
// Location
// -----------------------------------------------------------------------------
export const locationFacts = [
  'Adjacent to a 600-acre reserve forest, Medchal',
  'Around 15 minutes from Nehru Outer Ring Road, Hyderabad', // TODO(content): confirm exact drive time.
  'Nearby hospitals and essential services',
  'Easy access for visiting family',
]

export const locationCards = [
  {
    title: 'The forest edge',
    body: 'Amaya sits adjoining a 600-acre reserve forest in Medchal. Morning walks, green views, and natural quiet as part of everyday life here.',
  },
  {
    title: 'Getting here',
    body: 'Around 15 minutes from Nehru Outer Ring Road, connecting to all major parts of Hyderabad. The drive in is easy. The daily noise stays outside.',
  },
  {
    title: 'Nearby essentials',
    body: 'Hospitals, pharmacies, supermarkets, and everyday conveniences are all within comfortable reach. Exact distances available on request.',
  },
  {
    title: 'For visiting family',
    body: 'Easy to reach by road from the city. Our team can help plan family visits to the experience centre. Ample parking on site.',
  },
]

// -----------------------------------------------------------------------------
// Amenities — six categories per the design brief.
// -----------------------------------------------------------------------------
export type AmenityCategory =
  | 'Community'
  | 'Wellness'
  | 'Safety'
  | 'Convenience'
  | 'Nature'
  | 'Hospitality'

export interface AmenityGroup {
  category: AmenityCategory
  blurb: string
  items: string[]
}

// TODO(content): replace with the master amenity list signed off by Amaya.
// Currently mirrors the planning document. The Amenities Master List
// spreadsheet should drive this in production.
export const amenityGroups: AmenityGroup[] = [
  {
    category: 'Community',
    blurb: 'Spaces that make everyday connection natural.',
    items: [
      'Community lounge',
      'Card and games room',
      'Performance and events hall',
      'Rooftop social space',
      'Outdoor amphitheatre',
      'Resident library',
    ],
  },
  {
    category: 'Wellness',
    blurb: 'Quiet support for an active, well-lived day.',
    items: [
      'On-site clinic (planned)',
      'Physiotherapy room',
      'Meditation pavilion',
      'Spa and relaxation',
      'Yoga and movement studio',
      'Therapy consultation rooms',
    ],
  },
  {
    category: 'Safety',
    blurb: 'Reassurance designed in, not added on.',
    items: [
      '24/7 security (planned)',
      'CCTV across common areas',
      'Emergency call points in every apartment',
      'Intercom and access control',
      'Fire safety systems',
      'Gated entry with visitor management',
    ],
  },
  {
    category: 'Convenience',
    blurb: 'The practical parts of everyday life, quietly handled.',
    items: [
      'Housekeeping service',
      'Laundry service',
      'Concierge desk',
      'In-house pharmacy (planned)',
      'ATM and banking facility',
      'EV charging (planned)',
    ],
  },
  {
    category: 'Nature',
    blurb: 'Green, open, and unhurried.',
    items: [
      'Adjoining 600-acre reserve forest',
      'Walking and jogging trails',
      'Reflective water bodies',
      'Sensory and herb gardens',
      'Shaded courtyards',
      'Bird-watching seating areas',
    ],
  },
  {
    category: 'Hospitality',
    blurb: 'A clubhouse that feels like home, not a hotel.',
    items: [
      'Main dining hall',
      'All-day café',
      'Private dining',
      'Tiffin service',
      'Guest suites for visiting family',
      'Event catering',
    ],
  },
]

// -----------------------------------------------------------------------------
// Gallery — drives the gallery page and home preview.
// -----------------------------------------------------------------------------
export type GalleryCategory =
  | 'Architecture'
  | 'Landscape'
  | 'Amenities'
  | 'Community'
  | 'Wellness'
  | 'Location'

export interface GalleryImage {
  src: string
  alt: string
  label: string
  caption: string
  category: GalleryCategory
  /** Tailwind grid spans for the masonry layout */
  span: string
  /** Tailwind height utility for the card */
  height: string
}

export const galleryImages: GalleryImage[] = [
  {
    src: '/images/01_home_hero_facade_wide.jpg',
    alt: 'Amaya towers, full facade view, Medchal Hyderabad',
    label: 'Architecture',
    caption: 'The towers',
    category: 'Architecture',
    span: 'col-span-2 row-span-2',
    height: 'h-96 lg:h-[480px]',
  },
  {
    src: '/images/12_landscape_between_blocks_wide.jpg',
    alt: 'Wide landscaped courtyard view between Amaya residential blocks',
    label: 'Landscape',
    caption: 'Between the towers',
    category: 'Landscape',
    span: 'col-span-1',
    height: 'h-48 lg:h-56',
  },
  {
    src: '/images/10_architecture_colonnade_detail.jpg',
    alt: 'Shaded colonnade walkway architectural detail',
    label: 'Architecture',
    caption: 'Colonnade detail',
    category: 'Architecture',
    span: 'col-span-1',
    height: 'h-48 lg:h-56',
  },
  {
    src: '/images/08_community_amphitheatre_stepped_garden.jpg',
    alt: 'Stepped amphitheatre and landscaped community garden',
    label: 'Community',
    caption: 'The amphitheatre',
    category: 'Community',
    span: 'col-span-1',
    height: 'h-56 lg:h-72',
  },
  {
    src: '/images/05_amenities_pool_courtyard_canopy.jpg',
    alt: 'Central pool, canopy, steps and courtyard',
    label: 'Amenities',
    caption: 'The pool',
    category: 'Amenities',
    span: 'col-span-2',
    height: 'h-56 lg:h-72',
  },
  {
    src: '/images/06_amenities_reflective_water_body_close.jpg',
    alt: 'Reflective water body with facade and planted edges',
    label: 'Amenities',
    caption: 'Water and light',
    category: 'Amenities',
    span: 'col-span-1',
    height: 'h-56 lg:h-72',
  },
  {
    src: '/images/09_wellness_quiet_seating_grove.jpg',
    alt: 'Quiet shaded grove with seating',
    label: 'Wellness',
    caption: 'The grove',
    category: 'Wellness',
    span: 'col-span-1',
    height: 'h-56 lg:h-64',
  },
  {
    src: '/images/11_site_overview_courtyard_pool_aerial.jpg',
    alt: 'High angle view of pool, hobby garden, and block edge',
    label: 'Architecture',
    caption: 'Aerial view',
    category: 'Architecture',
    span: 'col-span-2',
    height: 'h-56 lg:h-64',
  },
  {
    src: '/images/02_location_forest_context_aerial.jpg',
    alt: 'Aerial forest context showing Amaya surrounded by greenery',
    label: 'Location',
    caption: 'Forest context',
    category: 'Location',
    span: 'col-span-1',
    height: 'h-56 lg:h-64',
  },
  {
    src: '/images/03_arrival_entrance_driveway.jpg',
    alt: 'Entrance arrival with driveway, trees, and building edge',
    label: 'Architecture',
    caption: 'The entrance',
    category: 'Architecture',
    span: 'col-span-2',
    height: 'h-64 lg:h-80',
  },
  {
    src: '/images/04_why_amaya_central_garden_courtyard.jpg',
    alt: 'Central garden courtyard between Amaya residential blocks',
    label: 'Landscape',
    caption: 'Central garden',
    category: 'Landscape',
    span: 'col-span-1',
    height: 'h-64 lg:h-80',
  },
  {
    src: '/images/07_amenities_pool_reflection_alt.jpg',
    alt: 'Pool reflection alternate view at Amaya',
    label: 'Amenities',
    caption: 'Pool, reflected',
    category: 'Amenities',
    span: 'col-span-1',
    height: 'h-56 lg:h-64',
  },
]

// -----------------------------------------------------------------------------
// FAQ
// -----------------------------------------------------------------------------
export interface FAQItem {
  q: string
  a: ReactNode
}

export const faqs: FAQItem[] = [
  {
    q: 'Who is Amaya designed for?',
    a: 'Amaya is designed for independent adults, typically 55 and above, who want to live comfortably with community around them and support close at hand. You do not need to require care to live here. You simply need to want a better way to live.',
  },
  {
    q: 'What does independent living mean at Amaya?',
    a: 'It means your life, your schedule, your choices. Amaya is a residential community — not a managed care facility — with services available when you want them. You run your own household. We just make it easier.',
  },
  {
    q: 'What medical and emergency support is planned on site?',
    a: 'Emergency call points are planned across residences and common areas, with trained on-site staff and clear escalation to nearby hospitals. The exact scope of medical staffing and partner hospitals will be confirmed by the Amaya team before launch. The intent is quiet reassurance, not a clinical environment.',
  },
  {
    q: 'What apartment configurations are available?',
    a: 'Amaya offers 1 BHK, 2 BHK, 2.5 BHK, 3 BHK, and 3.5 BHK residences across three towers, each designed with generous balconies, good natural light, and cross ventilation.',
  },
  {
    q: 'Where exactly is Amaya located?',
    a: 'Amaya is located in Medchal, Hyderabad, adjoining a 600-acre reserve forest and around 15 minutes from the Nehru Outer Ring Road. The location offers a quieter, greener everyday environment while keeping the city accessible for family, healthcare, and essential needs.',
  },
  {
    q: 'Can I visit with my family before making a decision?',
    a: 'Yes. We encourage families to visit before making a decision. Our experience centre includes a model flat, and our team can walk you through the residence layouts, community plan, clubhouse vision, amenities, and location context in person.',
  },
  {
    q: 'What is the maintenance and management plan after handover?',
    a: 'Amaya is operated by Vera Vita on a long-term basis. Maintenance, hospitality, security, and community programming are all part of the ongoing operating model — not handed off to a third party.',
  },
]
