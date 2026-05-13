import Hero from '@/components/home/Hero'
import PromiseSection from '@/components/home/PromiseSection'
import WhyAmaya from '@/components/home/WhyAmaya'
import ResidencesPreview from '@/components/home/ResidencesPreview'
import ClubAmaya from '@/components/home/ClubAmaya'
import WellnessHome from '@/components/home/WellnessHome'
import NatureLocation from '@/components/home/NatureLocation'
import AmenitiesHome from '@/components/home/AmenitiesHome'
import GalleryPreview from '@/components/home/GalleryPreview'
import VisitCTA from '@/components/home/VisitCTA'
import FAQ from '@/components/home/FAQ'

export default function HomePage() {
  return (
    <>
      <Hero />
      <PromiseSection />
      <WhyAmaya />
      <ResidencesPreview />
      <ClubAmaya />
      <WellnessHome />
      <NatureLocation />
      <AmenitiesHome />
      <GalleryPreview />
      <VisitCTA />
      <FAQ />
    </>
  )
}
