interface SectionLabelProps {
  children: string
  light?: boolean
}

export default function SectionLabel({ children, light = false }: SectionLabelProps) {
  return (
    <span
      className={`block font-sans text-[14px] font-semibold tracking-[0.28em] uppercase mb-3.5 ${
        light ? 'text-brass/75' : 'text-brass'
      }`}
    >
      {children}
    </span>
  )
}
