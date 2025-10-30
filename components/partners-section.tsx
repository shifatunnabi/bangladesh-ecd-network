import Image from "next/image"
import { ProcessedHomepagePartner } from "@/lib/contentful-types"

const defaultPartners: ProcessedHomepagePartner[] = [
  { id: "unicef", title: "UNICEF Bangladesh", logoUrl: "/images/partners/unicef-logo.jpg" },
  { id: "save-the-children", title: "Save the Children", logoUrl: "/images/partners/save-children-logo.jpg" },
  { id: "world-vision", title: "World Vision", logoUrl: "/images/partners/world-vision-logo.jpg" },
  { id: "plan-international", title: "Plan International", logoUrl: "/images/partners/plan-international-logo.jpg" },
  { id: "brac", title: "BRAC", logoUrl: "/images/partners/brac-logo.jpg" },
  { id: "dhaka-university", title: "Dhaka University", logoUrl: "/images/partners/dhaka-university-logo.jpg" },
]

interface PartnersSectionProps {
  partnersData?: ProcessedHomepagePartner[]
}

export function PartnersSection({ partnersData }: PartnersSectionProps) {
  const logos = partnersData && partnersData.length > 0 ? partnersData : defaultPartners

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Partners</h2>
          <p className="text-lg text-blue-700 max-w-2xl mx-auto">
            Working together with leading organizations to strengthen early childhood development in Bangladesh.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {logos.map((partner) => (
            <div
              key={partner.id}
              className="flex items-center justify-center p-4 rounded-lg bg-white/60 backdrop-blur-sm border border-blue-100 grayscale hover:grayscale-0 hover:bg-white hover:border-blue-200 hover:shadow-md transition-all duration-300"
            >
              <Image
                src={partner.logoUrl || "/placeholder.svg"}
                alt={partner.title}
                width={160}
                height={80}
                className="max-w-full h-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
