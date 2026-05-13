interface DividerProps {
  className?: string
}

export default function Divider({ className = '' }: DividerProps) {
  return <span className={`block w-10 h-px bg-brass ${className}`} />
}
