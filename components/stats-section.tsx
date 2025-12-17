import { Card, CardContent } from "@/components/ui/card"
import { Users, Building, FileText, GraduationCap, Star } from "lucide-react"
import { ProcessedHomepageOurImpact } from "@/lib/contentful-types"
import Image from "next/image"

const defaultStats = [
  {
    icon: Users,
    number: "133",
    label: "Network Members",
    description: "Professionals and organizations",
  },
  {
    icon: Building,
    number: "18",
    label: "Partner Organizations",
    description: "Across Bangladesh",
  },
  
]

interface StatsSectionProps {
  impactData?: ProcessedHomepageOurImpact
}

export function StatsSection({ impactData }: StatsSectionProps) {
  // Use Contentful data if available, otherwise use default stats
  const statsToDisplay = impactData?.stats.map((stat, index) => ({
    number: stat.number,
    label: stat.title,
    description: stat.subtitle,
    iconUrl: stat.iconUrl,
    icon: defaultStats[index]?.icon || Star, // Fallback to default icon
  })) || defaultStats.map(stat => ({ ...stat, iconUrl: "" }))

  const title = impactData?.title || "Our Impact"
  const subtitle = impactData?.subtitle || "Building a stronger early childhood development ecosystem across Bangladesh through collaboration and evidence-based practice."

  return (
    <section className="py-16 bg-[#0055a3]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
            {statsToDisplay.map((stat, index) => (
              <Card
                key={index}
                className="text-center bg-white hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl border-blue-200"
              >
                <CardContent className="p-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    {stat.iconUrl ? (
                      <Image
                        src={stat.iconUrl}
                        alt={stat.label}
                        width={40}
                        height={40}
                        className="w-10 h-10 brightness-0 invert"
                      />
                    ) : (
                      <stat.icon className="w-10 h-10 text-blue-600" />
                    )}
                  </div>
                  <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                  <div className="text-xl font-semibold text-blue-900 mb-1">{stat.label}</div>
                  <p className="text-base text-blue-700">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
