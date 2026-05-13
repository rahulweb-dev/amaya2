'use client'

import FormField, { inputClass } from './FormField'
import SubmitSuccess from './SubmitSuccess'
import { useLeadForm } from './useLeadForm'

export default function CallbackForm({ compactSuccess = false }: { compactSuccess?: boolean }) {
  const { values, setField, errors, submitting, submitted, submit } = useLeadForm({
    leadType: 'callback',
    requireEmail: false,
  })

  if (submitted) {
    return (
      <SubmitSuccess
        title="We will call you soon."
        body="Our team will call you at the time you have selected."
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
      <FormField label="Your Name" error={errors.name} htmlFor="callback-name">
        <input
          id="callback-name"
          type="text"
          autoComplete="name"
          placeholder="Full name"
          className={inputClass}
          value={values.name}
          onChange={(e) => setField('name', e.target.value)}
          aria-invalid={!!errors.name}
        />
      </FormField>
      <FormField label="Phone" error={errors.phone} htmlFor="callback-phone">
        <input
          id="callback-phone"
          type="tel"
          autoComplete="tel"
          placeholder="Mobile number"
          className={inputClass}
          value={values.phone}
          onChange={(e) => setField('phone', e.target.value)}
          aria-invalid={!!errors.phone}
        />
      </FormField>
      <FormField label="Best Time to Call" htmlFor="callback-time">
        <select
          id="callback-time"
          className={inputClass}
          value={values.preferredTime || 'morning'}
          onChange={(e) => setField('preferredTime', e.target.value)}
        >
          <option value="morning">Morning (9am to 12pm)</option>
          <option value="afternoon">Afternoon (12pm to 3pm)</option>
          <option value="evening">Evening (3pm to 6pm)</option>
        </select>
      </FormField>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-brass text-white font-sans text-xs font-medium tracking-[0.08em] uppercase py-3.5 rounded-sm hover:bg-opacity-90 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? 'Sending...' : 'Request a Callback'}
      </button>
    </form>
  )
}
