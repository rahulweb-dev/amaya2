import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/constants'

const ROUTES = [
  { path: '/', priority: 1 },
  { path: '/residences', priority: 0.9 },
  { path: '/floor-plans', priority: 0.8 },
  { path: '/club', priority: 0.7 },
  { path: '/wellness', priority: 0.8 },
  { path: '/location', priority: 0.7 },
  { path: '/amenities', priority: 0.7 },
  { path: '/gallery', priority: 0.6 },
  { path: '/contact', priority: 0.9 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return ROUTES.map((r) => ({
    url: `${SITE.url}${r.path === '/' ? '' : r.path}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: r.priority,
  }))
}
