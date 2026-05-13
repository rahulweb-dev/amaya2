import type { AmenityCategory } from '@/lib/siteData'

interface AmenityIconProps {
  category: AmenityCategory
  className?: string
}

/**
 * Lightweight inline SVG icon set for the six amenity categories.
 * Stroke-based, currentColor-aware so they pick up parent text colour.
 */
export default function AmenityIcon({ category, className = 'w-6 h-6' }: AmenityIconProps) {
  const props = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.4,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
    'aria-hidden': true,
  }

  switch (category) {
    case 'Community':
      return (
        <svg {...props}>
          <circle cx="8" cy="9" r="2.5" />
          <circle cx="16" cy="9" r="2.5" />
          <path d="M3 19c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5" />
          <path d="M11 19c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5" />
        </svg>
      )
    case 'Wellness':
      return (
        <svg {...props}>
          <path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10z" />
          <path d="M9 11h2v-2h2v2h2" strokeWidth={1.2} />
        </svg>
      )
    case 'Safety':
      return (
        <svg {...props}>
          <path d="M12 3l8 3v6c0 4.5-3.5 8-8 9-4.5-1-8-4.5-8-9V6l8-3z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      )
    case 'Convenience':
      return (
        <svg {...props}>
          <path d="M3 7h13l2 4v8H3z" />
          <circle cx="7" cy="19" r="1.6" />
          <circle cx="15" cy="19" r="1.6" />
          <path d="M16 11h5" />
        </svg>
      )
    case 'Nature':
      return (
        <svg {...props}>
          <path d="M12 21V11" />
          <path d="M12 11c-2.5-1-4-3-4-5.5C8 4 9.5 3 12 3s4 1 4 2.5c0 2.5-1.5 4.5-4 5.5z" />
          <path d="M12 14c-2 1.5-5 1.5-7 0 0 3 3 5 7 5s7-2 7-5c-2 1.5-5 1.5-7 0z" />
        </svg>
      )
    case 'Hospitality':
      return (
        <svg {...props}>
          <path d="M5 9h14l-1.5 8.5a2 2 0 0 1-2 1.5h-7a2 2 0 0 1-2-1.5L5 9z" />
          <path d="M8 9c0-2.5 1.5-4 4-4s4 1.5 4 4" />
          <path d="M3 9h18" />
        </svg>
      )
  }
}
