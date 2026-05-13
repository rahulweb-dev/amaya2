'use client'

import FormField, { inputClass, textareaClass } from './FormField'
import SubmitSuccess from './SubmitSuccess'
import { useLeadForm } from './useLeadForm'

interface BookVisitFormProps {
  context?: string
  compactSuccess?: boolean
  submitLabel?: string
}

export default function BookVisitForm({
  context,
  compactSuccess = false,
  submitLabel = 'Book a Visit',
}: BookVisitFormProps) {
  const { values, setField, errors, submitting, submitted, submit } = useLeadForm({
    leadType: 'visit',
    context,
  })

  if (submitted) {
    return (
      <SubmitSuccess
        title="We will be in touch shortly."
        body="Our team will confirm your visit within one working day."
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
      <FormField label="Your Name" error={errors.name} htmlFor="visit-name">
        <input
          id="visit-name"
          type="text"
          autoComplete="name"
          placeholder="Full name"
          className={inputClass}
          value={values.name}
          onChange={(e) => setField('name', e.target.value)}
          aria-invalid={!!errors.name}
        />
      </FormField>
      <FormField label="Phone" error={errors.phone} htmlFor="visit-phone">
        <input
          id="visit-phone"
          type="tel"
          autoComplete="tel"
          placeholder="Mobile number"
          className={inputClass}
          value={values.phone}
          onChange={(e) => setField('phone', e.target.value)}
          aria-invalid={!!errors.phone}
        />
      </FormField>
      <FormField label="Email" error={errors.email} htmlFor="visit-email">
        <input
          id="visit-email"
          type="email"
          autoComplete="email"
          placeholder="Email address"
          className={inputClass}
          value={values.email ?? ''}
          onChange={(e) => setField('email', e.target.value)}
          aria-invalid={!!errors.email}
        />
      </FormField>
      <FormField label="Preferred Date" optional htmlFor="visit-date">
        <input
          id="visit-date"
          type="date"
          className={inputClass}
          value={values.preferredDate ?? ''}
          onChange={(e) => setField('preferredDate', e.target.value)}
        />
      </FormField>
      <FormField label="Message" optional htmlFor="visit-message">
        <textarea
          id="visit-message"
          placeholder="Any questions or preferences?"
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
        {submitting ? 'Sending...' : submitLabel}
      </button>

      <p className="font-sans text-[11px] text-text-muted leading-relaxed">
        By submitting, you agree to be contacted by the Amaya team about your
        enquiry. We will not share your details with third parties.
      </p>
    </form>
  )
}
