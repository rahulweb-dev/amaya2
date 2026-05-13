import type { ReactNode } from 'react'

interface FormFieldProps {
  label: string
  error?: string
  optional?: boolean
  htmlFor?: string
  children: ReactNode
}

/**
 * Shared label + error wrapper for every form field on the site.
 * Pair with the `inputClass` constant exported below for consistent visual
 * treatment across modal forms and the contact page.
 */
export default function FormField({
  label,
  error,
  optional = false,
  htmlFor,
  children,
}: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="flex items-center justify-between font-sans text-[10px] font-medium tracking-[0.12em] uppercase text-text-mid mb-1.5"
      >
        <span>{label}</span>
        {optional && (
          <span className="font-sans text-[9px] tracking-[0.1em] uppercase text-text-muted normal-case font-light">
            optional
          </span>
        )}
      </label>
      {children}
      {error && (
        <p
          className="mt-1 font-sans text-[11px] text-[#9b3030] leading-snug"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  )
}

export const inputClass =
  'w-full border border-divider rounded-sm px-3.5 py-2.5 text-sm text-charcoal bg-white outline-none transition-colors focus:border-brass disabled:opacity-60 disabled:cursor-not-allowed font-sans font-light placeholder:text-text-muted/70'

export const textareaClass = `${inputClass} resize-none`
