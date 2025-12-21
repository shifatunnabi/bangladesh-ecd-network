import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, BookOpen, Target, Star } from "lucide-react"
import Image from "next/image"
import { ProcessedHomepageCoreValues } from "@/lib/contentful-types"

interface MissionSectionProps {
  coreValuesData?: ProcessedHomepageCoreValues | null
}

const fallbackValues = [
  {
    title: "Child-Centered Approach",
    subtitle: "Putting children's wellbeing and development at the center of everything we do.",
    iconUrl: null,
  },
  {
    title: "Collaborative Network",
    subtitle: "Building strong partnerships between organizations, researchers, and practitioners.",
    iconUrl: null,
  },
  {
    title: "Evidence-Based Practice",
    subtitle: "Using research and data to inform policies and improve ECD outcomes.",
    iconUrl: null,
  },
  {
    title: "Sustainable Impact",
    subtitle: "Creating lasting change through systematic approaches and capacity building.",
    iconUrl: null,
  },
]

export function MissionSection({ coreValuesData }: MissionSectionProps) {
  const fallbackData = {
    title: "Our Strategic Goals",
    subtitle: "Driving impactful change in early childhood development across Bangladesh.",
    stats: fallbackValues,
  }

  const data = coreValuesData || fallbackData
  const values = data.stats.length > 0 ? data.stats : fallbackValues
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">{data.title}</h2>
          <p className="text-lg text-blue-700 max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-blue-200 hover:border-blue-300"
            >
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  {value.iconUrl && value.iconUrl !== "/placeholder.svg" ? (
                    <Image
                      src={value.iconUrl}
                      alt={value.title}
                      width={32}
                      height={32}
                      className="w-8 h-8 brightness-0 invert"
                    />
                  ) : (
                    <Star className="w-8 h-8 text-white" />
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-blue-900">{value.title}</h3>
                <p className="text-blue-700 leading-relaxed text-left">{value.subtitle}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
