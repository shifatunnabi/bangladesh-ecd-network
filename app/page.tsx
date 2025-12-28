import { HeroCarousel } from "@/components/hero-carousel"
import { MissionSection } from "@/components/mission-section"
import dynamic from "next/dynamic"
import { getCarouselSlides, transformCarousel, getHomepageCoreValues, transformHomepageCoreValues, getHomepageOurImpact, getHomepageQuote, getHomepageFinalSection, getWhoWeAre, getLatestResources } from "@/lib/contentful"

// Dynamically import below-the-fold components with no SSR for faster initial load
const WhoWeAreSection = dynamic(() => import("@/components/who-we-are-section").then(mod => ({ default: mod.WhoWeAreSection })), {
  loading: () => <div className="py-16 bg-[#0055a3]" />,
})

const ResourceHighlights = dynamic(() => import("@/components/resource-highlights").then(mod => ({ default: mod.ResourceHighlights })), {
  loading: () => <div className="py-16" />,
})

const StatsSection = dynamic(() => import("@/components/stats-section").then(mod => ({ default: mod.StatsSection })), {
  loading: () => <div className="py-16" />,
})

const PartnersSection = dynamic(() => import("@/components/partners-section").then(mod => ({ default: mod.PartnersSection })), {
  loading: () => <div className="py-16" />,
})

const TestimonialSection = dynamic(() => import("@/components/testimonial-section").then(mod => ({ default: mod.TestimonialSection })), {
  loading: () => <div className="py-16" />,
})

const NewsletterSection = dynamic(() => import("@/components/newsletter-section").then(mod => ({ default: mod.NewsletterSection })), {
  loading: () => <div className="py-16" />,
})

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
