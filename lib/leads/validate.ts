import type { LeadPayload } from '@/lib/leadPayload'

const PHONE_RE = /^[+\d][\d\s\-()\d]{6,16}$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const LEAD_TYPES = ['visit','brochure','callback','contact','enquiry','floorplan']

export function serverValidate(p: unknown): Record<string, string> | null {
  if (!p || typeof p !== 'object') return { _: 'Invalid payload.' }
  const b = p as Partial<LeadPayload>
  const errors: Record<string, string> = {}

  if (!b.leadType || !LEAD_TYPES.includes(b.leadType)) errors.leadType = 'Invalid lead type.'
  if (!b.name || b.name.trim().length < 2)             errors.name    = 'Name required.'
  if (!b.phone || !PHONE_RE.test(b.phone))              errors.phone   = 'Valid phone required.'
  if (b.email && !EMAIL_RE.test(b.email))               errors.email   = 'Invalid email.'
  if (b.consent !== true)                               errors.consent = 'Consent required.'

  return Object.keys(errors).length ? errors : null
}