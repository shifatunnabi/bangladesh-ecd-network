import { HeroCarousel } from "@/components/hero-carousel"
import { MissionSection } from "@/components/mission-section"
import { WhoWeAreSection } from "@/components/who-we-are-section"
import { ResourceHighlights } from "@/components/resource-highlights"
import { PartnersSection } from "@/components/partners-section"
import { DonateSection } from "@/components/donate-section"
import { StatsSection } from "@/components/stats-section"
import { TestimonialSection } from "@/components/testimonial-section"
import { NewsletterSection } from "@/components/newsletter-section"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroCarousel />
      <MissionSection />
      <WhoWeAreSection />
      <ResourceHighlights />
      <StatsSection />
      <PartnersSection />
      <TestimonialSection />
      <DonateSection />
      <NewsletterSection />
    </div>
  )
}
