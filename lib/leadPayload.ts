/**
 * Lead capture payload contract.
 *
 * Every form on the site (visit, brochure, callback, contact, enquiry,
 * floor-plan request) builds an object that conforms to `LeadPayload` and
 * passes it to `submitLead`. Today, `submitLead` only logs the payload to the
 * console and resolves a fake success response — that is intentional. The dev
 * team should replace the implementation in this file with a real handler
 * (CRM webhook, serverless route, Sheets API, etc.) without changing any of
 * the call sites.
 *
 * TODO(dev): wire `submitLead` to one of:
 *   1. A `/api/lead` Next.js route that forwards to Salesforce / Zoho / HubSpot
 *   2. A serverless endpoint that emails the team and stores in Google Sheets
 *   3. WhatsApp Business API for instant follow-up
 *   4. A consented analytics pipeline (GA4 / Meta CAPI) for attribution
 *
 * TODO(dev): persist the `consent` flag and timestamp alongside the lead for
 * DPDP / privacy compliance.
 */

export type LeadType =
  | 'visit'
  | 'brochure'
  | 'callback'
  | 'contact'
  | 'enquiry'
  | 'floorplan'

export interface LeadPayload {
  leadType: LeadType
  sourcePage: string
  name: string
  phone: string
  email?: string
  preferredDate?: string
  preferredTime?: string
  message?: string
  context?: string
  consent: boolean
}

export interface LeadDraft {
  leadType: LeadType
  sourcePage?: string
  name: string
  phone: string
  email?: string
  preferredDate?: string
  preferredTime?: string
  message?: string
  context?: string
  consent?: boolean
}

const PHONE_REGEX = /^[+\d][\d\s\-()]{6,16}$/
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type ValidationErrors = Partial<
  Record<
    'name' | 'phone' | 'email' | 'preferredDate' | 'preferredTime' | 'message' | 'consent',
    string
  >
>

export function validateLead(
  draft: LeadDraft,
  options: { requireEmail?: boolean } = {}
): ValidationErrors {
  const errors: ValidationErrors = {}

  if (!draft.name || draft.name.trim().length < 2) {
    errors.name = 'Please enter your name.'
  }
  if (!draft.phone || !PHONE_REGEX.test(draft.phone.trim())) {
    errors.phone = 'Please enter a valid phone number.'
  }
  if (options.requireEmail && (!draft.email || !EMAIL_REGEX.test(draft.email.trim()))) {
    errors.email = 'Please enter a valid email address.'
  } else if (draft.email && draft.email.trim() && !EMAIL_REGEX.test(draft.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }

  return errors
}

export function buildLeadPayload(draft: LeadDraft, sourcePage: string): LeadPayload {
  return {
    leadType: draft.leadType,
    sourcePage: draft.sourcePage || sourcePage,
    name: draft.name.trim(),
    phone: draft.phone.trim(),
    email: draft.email?.trim() || undefined,
    preferredDate: draft.preferredDate || undefined,
    preferredTime: draft.preferredTime || undefined,
    message: draft.message?.trim() || undefined,
    context: draft.context || undefined,
    consent: draft.consent ?? true,
  }
}

export interface LeadResult {
  ok: boolean
  message?: string
}

/**
 * The single submission entry point used by every form on the site.
 *
 * Currently logs the payload in development and returns a fake success.
 * Swap the body of this function with a real network call when the backend
 * is ready.
 */
export async function submitLead(payload: LeadPayload): Promise<LeadResult> {
  if (process.env.NODE_ENV !== 'production') {
    console.log('[Amaya lead capture]', payload)
  }

  try {
    const res = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      return {
        ok: false,
        message: data?.message || 'Submission failed. Please try again.',
      }
    }

    return { ok: true }
  } catch {
    return { ok: false, message: 'Network error. Please check your connection.' }
  }
}
