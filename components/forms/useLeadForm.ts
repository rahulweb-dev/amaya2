'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import {
  buildLeadPayload,
  submitLead,
  validateLead,
  type LeadDraft,
  type LeadType,
  type ValidationErrors,
} from '@/lib/leadPayload'

export interface UseLeadFormOptions {
  leadType: LeadType
  /** Force require email (default: visit/brochure require email, callback does not). */
  requireEmail?: boolean
  /** Optional context string sent with payload (e.g. residence slug). */
  context?: string
}

export interface UseLeadFormResult {
  values: Omit<LeadDraft, 'leadType' | 'context' | 'sourcePage'>
  setField: <
    K extends keyof Omit<LeadDraft, 'leadType' | 'context' | 'sourcePage'>,
  >(
    key: K,
    value: NonNullable<LeadDraft[K]>,
  ) => void
  errors: ValidationErrors
  submitting: boolean
  submitted: boolean
  submit: () => Promise<void>
  reset: () => void
}

const initialValues = {
  name: '',
  phone: '',
  email: '',
  preferredDate: '',
  preferredTime: '',
  message: '',
  consent: true,
}

/**
 * Centralised state, validation, and submission hook for lead forms.
 *
 * Every form component on the site uses this hook so the team can change
 * submission behaviour (CRM, analytics, success-state copy, error handling)
 * in exactly one place.
 */
export function useLeadForm(options: UseLeadFormOptions): UseLeadFormResult {
  const pathname = usePathname() || '/'
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const requireEmail =
    options.requireEmail ??
    (options.leadType === 'visit' ||
      options.leadType === 'brochure' ||
      options.leadType === 'floorplan' ||
      options.leadType === 'contact')

  function setField<K extends keyof typeof initialValues>(
    key: K,
    value: (typeof initialValues)[K],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }))
    if (errors[key as keyof ValidationErrors]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[key as keyof ValidationErrors]
        return next
      })
    }
  }

  async function submit() {
    const draft: LeadDraft = {
      leadType: options.leadType,
      context: options.context,
      ...values,
    }
    const v = validateLead(draft, { requireEmail })
    if (Object.keys(v).length > 0) {
      setErrors(v)
      return
    }
    setSubmitting(true)
    try {
      const payload = buildLeadPayload(draft, pathname)
      const res = await submitLead(payload)
      if (res.ok) {
        setSubmitted(true)
      } else {
        setErrors({ phone: res.message || 'Submission failed. Please try again.' })
      }
    } finally {
      setSubmitting(false)
    }
  }

  function reset() {
    setValues(initialValues)
    setErrors({})
    setSubmitted(false)
    setSubmitting(false)
  }

  return {
    values: values as UseLeadFormResult['values'],
    setField: setField as UseLeadFormResult['setField'],
    errors,
    submitting,
    submitted,
    submit,
    reset,
  }
}
