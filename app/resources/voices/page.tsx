import { ResourceCard } from "@/components/resource-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter } from "lucide-react"

const voicesResources = [
  {
    title: "Community Mothers Share Their ECD Journey",
    description:
      "Inspiring stories from mothers in rural communities about their experiences with early childhood development programs.",
    date: "March 2024",
    image: "/placeholder.svg?height=200&width=300",
    badge: "New",
    href: "/resources/voices/community-mothers-journey",
    type: "video" as const,
    category: "Community Stories",
  },
  {
    title: "Best Practices in Community-Based ECD Programs",
    description:
      "Video documentation of successful community-based early childhood development initiatives across Bangladesh.",
    date: "February 2024",
    image: "/placeholder.svg?height=200&width=300",
    badge: "Featured",
    href: "/resources/voices/best-practices-community-ecd",
    type: "video" as const,
    category: "Best Practices",
  },
  {
    title: "Teacher Training Success Stories",
    description: "ECD teachers share how professional development programs have transformed their teaching practices.",
    date: "January 2024",
    image: "/placeholder.svg?height=200&width=300",
    href: "/resources/voices/teacher-training-stories",
    type: "video" as const,
    category: "Professional Development",
  },
  {
    title: "Children's Voices: What Makes Us Happy at School",
    description:
      "Young children express their thoughts about what they enjoy most in their early learning environments.",
    date: "December 2023",
    image: "/placeholder.svg?height=200&width=300",
    href: "/resources/voices/children-voices-school",
    type: "video" as const,
    category: "Children's Perspectives",
  },
  {
    title: "Parent Engagement in ECD: Real Stories",
    description:
      "Parents share their experiences and the impact of being actively involved in their children's early education.",
    date: "November 2023",
    image: "/placeholder.svg?height=200&width=300",
    href: "/resources/voices/parent-engagement-stories",
    type: "video" as const,
    category: "Parent Engagement",
  },
  {
    title: "Innovation in Rural ECD Centers",
    description:
      "Documenting innovative approaches and creative solutions implemented in rural early childhood centers.",
    date: "October 2023",
    image: "/placeholder.svg?height=200&width=300",
    href: "/resources/voices/innovation-rural-ecd",
    type: "video" as const,
    category: "Innovation",
  },
]

export default function VoicesPage() {
  return (
    <div className="flex flex-col">
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Voices & Stories</h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Listen to the voices of children, families, practitioners, and communities as they share their experiences
              and insights about early childhood development in Bangladesh.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search videos and stories..." className="pl-10" />
          </div>
          <Button variant="outline" className="sm:w-auto bg-transparent">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            All Stories
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            Community Stories
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            Best Practices
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            Children's Perspectives
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            Parent Engagement
          </Badge>
        </div>

        {/* Results Count */}
        <div className="text-sm text-muted-foreground mb-6">Showing {voicesResources.length} videos and stories</div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {voicesResources.map((resource, index) => (
            <ResourceCard key={index} {...resource} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Stories
          </Button>
        </div>
      </div>
    </div>
  )
}
