import { HeroCarousel } from "@/components/hero-carousel"
import { MissionSection } from "@/components/mission-section"
import { WhoWeAreSection } from "@/components/who-we-are-section"
import { ResourceHighlights } from "@/components/resource-highlights"
import { PartnersSection } from "@/components/partners-section"
import { DonateSection } from "@/components/donate-section"
import { StatsSection } from "@/components/stats-section"
import { TestimonialSection } from "@/components/testimonial-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { getCarouselSlides, transformCarousel, getHomepageCoreValues, transformHomepageCoreValues, getHomepageOurImpact, getHomepageQuote, getHomepageFinalSection, getWhoWeAre, getLatestResources } from "@/lib/contentful"

export default async function HomePage() {
  // Parallelize all API calls for faster loading
  const [
    carouselEntries,
    coreValuesEntry,
    ourImpactData,
    quotesData,
    finalSectionData,
    whoWeAreData,
    latestResources,
  ] = await Promise.all([
    getCarouselSlides(),
    getHomepageCoreValues(),
    getHomepageOurImpact(),
    getHomepageQuote(),
    getHomepageFinalSection(),
    getWhoWeAre(),
    getLatestResources(),
  ]);

  const carouselSlides = carouselEntries.map(transformCarousel);
  const coreValuesData = coreValuesEntry ? transformHomepageCoreValues(coreValuesEntry) : null;

  return (
    <div className="flex flex-col">
      <HeroCarousel slides={carouselSlides} />
      <MissionSection coreValuesData={coreValuesData} />
      <WhoWeAreSection whoWeAreData={whoWeAreData} />
      <ResourceHighlights 
        latestResearch={latestResources.latestResearch}
        latestVoice={latestResources.latestVoice}
        latestNewsletter={latestResources.latestNewsletter}
        latestPolicy={latestResources.latestPolicy}
      />
      <StatsSection impactData={ourImpactData} />
      <PartnersSection />
      <TestimonialSection quotesData={quotesData} />
      {/* <DonateSection finalSectionData={finalSectionData} /> */}
      <NewsletterSection />
    </div>
  )
}
