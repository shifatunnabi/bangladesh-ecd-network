import { Card, CardContent } from "@/components/ui/card"
import { Users, Building, FileText, GraduationCap } from "lucide-react"

const stats = [
  {
    icon: Users,
    number: "150+",
    label: "Network Members",
    description: "Professionals and organizations",
  },
  {
    icon: Building,
    number: "45",
    label: "Partner Organizations",
    description: "Across Bangladesh",
  },
  {
    icon: FileText,
    number: "25",
    label: "Research Publications",
    description: "Evidence-based studies",
  },
  {
    icon: GraduationCap,
    number: "500+",
    label: "Professionals Trained",
    description: "Through our programs",
  },
]

export function StatsSection() {
  return (
    <section className="py-16 bg-[#0055a3]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Impact</h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Building a stronger early childhood development ecosystem across Bangladesh through collaboration and
            evidence-based practice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="text-center bg-white hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl border-blue-200"
            >
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-lg font-semibold text-blue-900 mb-1">{stat.label}</div>
                <p className="text-sm text-blue-700">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
