'use client'

import FormField, { inputClass } from './FormField'
import SubmitSuccess from './SubmitSuccess'
import { useLeadForm } from './useLeadForm'

interface BrochureFormProps {
  /** Use 'floorplan' for the floor-plan download CTA on the Residences/Floor Plans pages. */
  variant?: 'brochure' | 'floorplan'
  context?: string
  compactSuccess?: boolean
}

export default function BrochureForm({
  variant = 'brochure',
  context,
  compactSuccess = false,
}: BrochureFormProps) {
  const { values, setField, errors, submitting, submitted, submit } = useLeadForm({
    leadType: variant,
    context,
  })

  if (submitted) {
    return (
      <SubmitSuccess
        title={variant === 'floorplan' ? 'Floor plan on its way.' : 'On its way.'}
        body={
          variant === 'floorplan'
            ? 'We will email you the floor plan shortly. Final plans are subject to regulatory approval.'
            : 'The brochure will be sent to your email shortly.'
        }
        compact={compactSuccess}
      />
    )
  }

  const submitLabel = variant === 'floorplan' ? 'Send me the floor plan' : 'Send me the brochure'

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault()
        submit()
      }}
      noValidate
    >
      <FormField label="Your Name" error={errors.name} htmlFor="brochure-name">
        <input
          id="brochure-name"
          type="text"
          autoComplete="name"
          placeholder="Full name"
          className={inputClass}
          value={values.name}
          onChange={(e) => setField('name', e.target.value)}
          aria-invalid={!!errors.name}
        />
      </FormField>
      <FormField label="Phone" error={errors.phone} htmlFor="brochure-phone">
        <input
          id="brochure-phone"
          type="tel"
          autoComplete="tel"
          placeholder="Mobile number"
          className={inputClass}
          value={values.phone}
          onChange={(e) => setField('phone', e.target.value)}
          aria-invalid={!!errors.phone}
        />
      </FormField>
      <FormField label="Email" error={errors.email} htmlFor="brochure-email">
        <input
          id="brochure-email"
          type="email"
          autoComplete="email"
          placeholder="Email address"
          className={inputClass}
          value={values.email ?? ''}
          onChange={(e) => setField('email', e.target.value)}
          aria-invalid={!!errors.email}
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
