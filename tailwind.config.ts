import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#23384A',
        'navy-deep': '#1D2F3F',
        limestone: '#E7D8C6',
        stone: '#D8CEC3',
        mist: '#ECE8E1',
        sage: '#7C8B78',
        brass: '#A9825A',
        charcoal: '#2F2925',
        surface: '#F4F0EB',
        'surface-alt': '#EDE8E0',
        'text-head': '#23384A',
        'text-body': '#3D3530',
        'text-mid': '#6B5F57',
        'text-muted': '#9E948D',
        divider: '#D2C9BF',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-jost)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['clamp(3.5rem, 7vw, 6.25rem)', { lineHeight: '0.92', letterSpacing: '-0.01em' }],
        'display-sm': ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.0' }],
        'heading-1': ['clamp(1.8rem, 3.5vw, 3rem)', { lineHeight: '1.15' }],
        'heading-2': ['clamp(1.5rem, 2.5vw, 2.25rem)', { lineHeight: '1.2' }],
      },
      letterSpacing: {
        'eyebrow': '0.28em',
        'wide-xl': '0.22em',
        'wide-lg': '0.18em',
      },
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
      borderRadius: {
        'sm': '6px',
        DEFAULT: '10px',
      },
      backdropBlur: {
        'xs': '4px',
      },
    },
  },
  plugins: [],
}
export default config
