'use client'

import FormField, { inputClass, textareaClass } from './FormField'
import SubmitSuccess from './SubmitSuccess'
import { useLeadForm } from './useLeadForm'

/**
 * General-purpose contact form for the Contact page.
 * Captures name, phone, email, and a free-form message.
 */
export default function ContactForm({ compactSuccess = false }: { compactSuccess?: boolean }) {
  const { values, setField, errors, submitting, submitted, submit } = useLeadForm({
    leadType: 'contact',
  })

  if (submitted) {
    return (
      <SubmitSuccess
        title="Message received."
        body="Thank you. We will get back to you within one working day."
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
      <div className="grid sm:grid-cols-2 gap-5">
        <FormField label="Your Name" error={errors.name} htmlFor="contact-name">
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            placeholder="Full name"
            className={inputClass}
            value={values.name}
            onChange={(e) => setField('name', e.target.value)}
            aria-invalid={!!errors.name}
          />
        </FormField>
        <FormField label="Phone" error={errors.phone} htmlFor="contact-phone">
          <input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            placeholder="Mobile number"
            className={inputClass}
            value={values.phone}
            onChange={(e) => setField('phone', e.target.value)}
            aria-invalid={!!errors.phone}
          />
        </FormField>
      </div>
      <FormField label="Email" error={errors.email} htmlFor="contact-email">
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          placeholder="Email address"
          className={inputClass}
          value={values.email ?? ''}
          onChange={(e) => setField('email', e.target.value)}
          aria-invalid={!!errors.email}
        />
      </FormField>
      <FormField label="Your Message" htmlFor="contact-message">
        <textarea
          id="contact-message"
          placeholder="How can we help?"
          className={`${textareaClass} h-28`}
          value={values.message ?? ''}
          onChange={(e) => setField('message', e.target.value)}
        />
      </FormField>

      <button
        type="submit"
        disabled={submitting}
        className="font-sans text-[11px] font-medium tracking-[0.1em] uppercase bg-brass text-white px-7 py-3.5 rounded-sm hover:bg-opacity-90 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
