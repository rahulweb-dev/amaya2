import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="bg-navy min-h-[80vh] flex items-center justify-center px-6 lg:px-16 pt-24">
      <div className="max-w-xl text-center">
        <span className="block font-sans text-[10px] font-semibold tracking-[0.28em] uppercase text-brass/80 mb-5">
          404 &mdash; Page not found
        </span>
        <h1
          className="font-serif font-light text-limestone mb-5"
          style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', lineHeight: '1.1' }}
        >
          This corner of Amaya is still being built.
        </h1>
        <p className="font-sans font-light text-stone/65 text-[15px] mb-8 leading-relaxed">
          The page you are looking for does not exist or has moved. Take a moment to explore the
          residences, the clubhouse, or the gardens instead.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="font-sans text-[11px] font-medium tracking-[0.1em] uppercase bg-brass text-white px-7 py-3.5 rounded-sm hover:bg-opacity-90 transition-all"
          >
            Return home
          </Link>
          <Link
            href="/contact"
            className="font-sans text-[11px] font-medium tracking-[0.1em] uppercase border border-limestone/40 text-limestone px-7 py-3.5 rounded-sm hover:border-limestone/80 transition-all"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </section>
  )
}
