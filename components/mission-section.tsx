import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, BookOpen, Target } from "lucide-react"

const values = [
  {
    icon: Heart,
    title: "Child-Centered Approach",
    description: "Putting children's wellbeing and development at the center of everything we do.",
  },
  {
    icon: Users,
    title: "Collaborative Network",
    description: "Building strong partnerships between organizations, researchers, and practitioners.",
  },
  {
    icon: BookOpen,
    title: "Evidence-Based Practice",
    description: "Using research and data to inform policies and improve ECD outcomes.",
  },
  {
    icon: Target,
    title: "Sustainable Impact",
    description: "Creating lasting change through systematic approaches and capacity building.",
  },
]

export function MissionSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Core Values</h2>
          <p className="text-lg text-blue-700 max-w-2xl mx-auto">
            Guided by principles that ensure every child in Bangladesh has the opportunity to thrive and reach their
            full potential.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-blue-200 hover:border-blue-300"
            >
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-blue-900">{value.title}</h3>
                <p className="text-blue-700 leading-relaxed">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
