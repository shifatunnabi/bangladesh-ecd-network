import { ResourceCard } from "@/components/resource-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter } from "lucide-react"

const researchReports = [
  {
    title: "Early Childhood Development in Rural Bangladesh: Current State and Opportunities",
    description:
      "A comprehensive analysis of ECD programs and their effectiveness in rural communities across Bangladesh.",
    date: "March 2024",
    image: "/placeholder.svg?height=200&width=300",
    badge: "New",
    downloadUrl: "/resources/ecd-rural-bangladesh-2024.pdf",
    type: "research" as const,
    category: "Research Report",
    author: "Dr. Rashida Ahmed",
  },
  {
    title: "Impact Assessment of Community-Based ECD Centers",
    description:
      "Evaluation of the effectiveness of community-based early childhood development centers in improving child outcomes.",
    date: "February 2024",
    image: "/placeholder.svg?height=200&width=300",
    downloadUrl: "/resources/impact-assessment-ecd-centers.pdf",
    type: "research" as const,
    category: "Impact Study",
    author: "Prof. Mohammad Rahman",
  },
  {
    title: "Nutrition and Early Brain Development: Bangladesh Context",
    description:
      "Research on the relationship between nutrition interventions and cognitive development in Bangladeshi children.",
    date: "January 2024",
    image: "/placeholder.svg?height=200&width=300",
    downloadUrl: "/resources/nutrition-brain-development.pdf",
    type: "research" as const,
    category: "Health Research",
    author: "Dr. Fatima Khatun",
  },
  {
    title: "Policy Brief: Strengthening ECD Systems in Bangladesh",
    description:
      "Policy recommendations for improving early childhood development systems at national and local levels.",
    date: "December 2023",
    image: "/placeholder.svg?height=200&width=300",
    badge: "Policy",
    downloadUrl: "/resources/policy-brief-ecd-systems.pdf",
    type: "research" as const,
    category: "Policy Brief",
    author: "Bangladesh ECD Network",
  },
  {
    title: "Gender Equity in Early Childhood Education",
    description: "Analysis of gender disparities in early childhood education access and quality in Bangladesh.",
    date: "November 2023",
    image: "/placeholder.svg?height=200&width=300",
    downloadUrl: "/resources/gender-equity-ece.pdf",
    type: "research" as const,
    category: "Research Report",
    author: "Ms. Shahida Begum",
  },
  {
    title: "COVID-19 Impact on Early Childhood Development Services",
    description:
      "Assessment of how the pandemic affected ECD services and recommendations for recovery and resilience.",
    date: "October 2023",
    image: "/placeholder.svg?height=200&width=300",
    downloadUrl: "/resources/covid-impact-ecd.pdf",
    type: "research" as const,
    category: "Impact Study",
    author: "Dr. Salma Khatun",
  },
]

export default function ResearchReportsPage() {
  return (
    <div className="flex flex-col">
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Research & Reports</h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Access our comprehensive collection of research findings, policy briefs, and analytical reports on early
              childhood development in Bangladesh.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search reports by title, author, or topic..." className="pl-10" />
          </div>
          <Button variant="outline" className="sm:w-auto bg-transparent">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            All Reports
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            Research Report
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            Policy Brief
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            Impact Study
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            Health Research
          </Badge>
        </div>

        {/* Results Count */}
        <div className="text-sm text-muted-foreground mb-6">Showing {researchReports.length} reports</div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {researchReports.map((report, index) => (
            <ResourceCard key={index} {...report} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Reports
          </Button>
        </div>
      </div>
    </div>
  )
}
