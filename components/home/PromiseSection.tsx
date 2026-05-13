import Reveal from '../ui/Reveal'
import Divider from '../ui/Divider'
import SectionLabel from '../ui/SectionLabel'

export default function PromiseSection() {
  return (
    <section className="bg-limestone section-pad px-6 lg:px-16 text-center">
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <SectionLabel>Our promise</SectionLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-serif font-light text-charcoal max-w-2xl mx-auto mb-0" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: '1.2' }}>
            A calm residential community where independence feels beautifully supported.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <Divider className="mx-auto my-7" />
        </Reveal>
        <Reveal delay={0.3}>
          <p className="font-sans font-light text-text-mid text-base lg:text-[17px] max-w-lg mx-auto leading-relaxed">
            Thoughtful homes for easier everyday living. A place where the rhythm of each day is yours to set, and where community, care, and nature are simply close at hand.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
