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
  // Fetch carousel slides from Contentful
  const carouselEntries = await getCarouselSlides();
  const carouselSlides = carouselEntries.map(transformCarousel);

  // Fetch homepage core values from Contentful
  const coreValuesEntry = await getHomepageCoreValues();
  const coreValuesData = coreValuesEntry ? transformHomepageCoreValues(coreValuesEntry) : null;

  // Fetch our impact data from Contentful
  const ourImpactData = await getHomepageOurImpact();

  // Fetch quote data from Contentful
  const quotesData = await getHomepageQuote();

  // Fetch final section data from Contentful
  const finalSectionData = await getHomepageFinalSection();

  // Fetch who we are data from Contentful
  const whoWeAreData = await getWhoWeAre();

  // Fetch latest resources from Contentful
  const latestResources = await getLatestResources();

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
