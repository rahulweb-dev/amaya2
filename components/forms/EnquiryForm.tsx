'use client'

import FormField, { inputClass, textareaClass } from './FormField'
import SubmitSuccess from './SubmitSuccess'
import { useLeadForm } from './useLeadForm'

interface EnquiryFormProps {
  /** Optional context, e.g. residence type 25bhk, sent with the lead. */
  context?: string
  compactSuccess?: boolean
}

/**
 * Used for "Enquire about this home" CTA on Residences/Floor Plans.
 * Lighter than BookVisitForm: no required email, but accepts message.
 */
export default function EnquiryForm({ context, compactSuccess = false }: EnquiryFormProps) {
  const { values, setField, errors, submitting, submitted, submit } = useLeadForm({
    leadType: 'enquiry',
    context,
    requireEmail: false,
  })

  if (submitted) {
    return (
      <SubmitSuccess
        title="Enquiry received."
        body="Our team will be in touch within one working day."
        compact={compactSuccess}
      />
    )
  }

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault()
        submit()
      }}
      noValidate
    >
      <FormField label="Your Name" error={errors.name} htmlFor="enquiry-name">
        <input
          id="enquiry-name"
          type="text"
          autoComplete="name"
          placeholder="Full name"
          className={inputClass}
          value={values.name}
          onChange={(e) => setField('name', e.target.value)}
          aria-invalid={!!errors.name}
        />
      </FormField>
      <FormField label="Phone" error={errors.phone} htmlFor="enquiry-phone">
        <input
          id="enquiry-phone"
          type="tel"
          autoComplete="tel"
          placeholder="Mobile number"
          className={inputClass}
          value={values.phone}
          onChange={(e) => setField('phone', e.target.value)}
          aria-invalid={!!errors.phone}
        />
      </FormField>
      <FormField label="Email" optional error={errors.email} htmlFor="enquiry-email">
        <input
          id="enquiry-email"
          type="email"
          autoComplete="email"
          placeholder="Email address"
          className={inputClass}
          value={values.email ?? ''}
          onChange={(e) => setField('email', e.target.value)}
          aria-invalid={!!errors.email}
        />
      </FormField>
      <FormField label="Preferred Visit Date" optional htmlFor="enquiry-date">
        <input
          id="enquiry-date"
          type="date"
          className={inputClass}
          value={values.preferredDate ?? ''}
          onChange={(e) => setField('preferredDate', e.target.value)}
        />
      </FormField>
      <FormField label="Message" optional htmlFor="enquiry-message">
        <textarea
          id="enquiry-message"
          placeholder="Tell us which residence interests you, and any preferences."
          className={`${textareaClass} h-20`}
          value={values.message ?? ''}
          onChange={(e) => setField('message', e.target.value)}
        />
      </FormField>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-brass text-white font-sans text-xs font-medium tracking-[0.08em] uppercase py-3.5 rounded-sm hover:bg-opacity-90 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? 'Sending...' : 'Send Enquiry'}
      </button>
    </form>
  )
}
