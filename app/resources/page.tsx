import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResourceCard } from "@/components/resource-card"
import Link from "next/link"
import { BookOpen, Video, FileText, ExternalLink } from "lucide-react"
import { getResourceCounts } from "@/lib/contentful"

const featuredResources = [
  {
    title: "Early Childhood Development in Rural Bangladesh: Current State and Opportunities",
    description: "A comprehensive analysis of ECD programs and their effectiveness in rural communities.",
    date: "March 2024",
    image: "/placeholder.svg?height=200&width=300",
    badge: "New",
    downloadUrl: "/resources/ecd-rural-bangladesh-2024.pdf",
    type: "research" as const,
    category: "Research Report",
    author: "Dr. Rashida Ahmed",
  },
  {
    title: "Best Practices in Community-Based ECD Programs",
    description: "Video documentation of successful community-based early childhood development initiatives.",
    date: "February 2024",
    image: "/placeholder.svg?height=200&width=300",
    badge: "Featured",
    href: "/resources/voices",
    type: "video" as const,
    category: "Video Resource",
  },
  {
    title: "ECD Network Quarterly Update - Q1 2024",
    description: "Latest updates on network activities, research findings, and upcoming events.",
    date: "March 2024",
    image: "/placeholder.svg?height=200&width=300",
    badge: "Latest",
    href: "/resources/newsletter",
    type: "newsletter" as const,
    category: "Newsletter",
  },
]

const getResourceCategories = (counts: { researchCount: number; voicesCount: number; newslettersCount: number; policiesCount: number }) => [
  {
    icon: BookOpen,
    title: "Research & Reports",
    description: "Access our latest research, policy briefs, and analytical reports on ECD",
    href: "/resources/research-reports",
    count: `${counts.researchCount} Report${counts.researchCount !== 1 ? 's' : ''}`,
  },
  {
    icon: Video,
    title: "Voices & Stories",
    description: "Watch videos and read stories from practitioners, families, and communities.",
    href: "/resources/voices",
    count: `${counts.voicesCount} Video${counts.voicesCount !== 1 ? 's' : ''}`,
  },
  {
    icon: FileText,
    title: "Newsletter",
    description: "Stay updated with our newsletters featuring network activities and insights.",
    href: "/resources/newsletter",
    count: `${counts.newslettersCount} Issue${counts.newslettersCount !== 1 ? 's' : ''}`,
  },
  {
    icon: ExternalLink,
    title: "Policies & Links",
    description: "Important policy documents, guidelines, and useful external resources.",
    href: "/resources/policies",
    count: `${counts.policiesCount} Link${counts.policiesCount !== 1 ? 's' : ''}`,
  },
]

export default async function ResourcesPage() {
  const counts = await getResourceCounts();
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Resources</h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Discover our comprehensive collection of research, reports, videos, and resources on early childhood
              development in Bangladesh.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Resources
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Featured Resources</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our most recent and impactful resources highlighting key findings and insights in early childhood
              development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredResources.map((resource, index) => (
              <ResourceCard key={index} {...resource} />
            ))}
          </div>
        </div>
      </section> */}

      {/* Resource Categories */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Explore by Category</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse our resources organized by type to find exactly what you're looking for.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {getResourceCategories(counts).map((category, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 group">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <category.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">{category.description}</p>
                  <div className="text-sm font-medium text-primary">{category.count}</div>
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <Link href={category.href}>Explore</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      {/* <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">80+</div>
              <div className="text-lg font-medium">Total Resources</div>
              <p className="text-muted-foreground">Research reports, videos, and publications</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">10K+</div>
              <div className="text-lg font-medium">Downloads</div>
              <p className="text-muted-foreground">Resources accessed by professionals</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">50+</div>
              <div className="text-lg font-medium">Contributors</div>
              <p className="text-muted-foreground">Researchers and practitioners</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Call to Action */}
      {/* <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-foreground mb-4">Contribute Your Knowledge</h2>
          <p className="text-lg text-secondary-foreground/80 max-w-2xl mx-auto mb-8">
            Have research, insights, or resources to share with the ECD community? We welcome contributions from our
            network members.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="bg-white text-secondary hover:bg-white/90" asChild>
              <Link href="/contribute">Submit Resource</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 bg-transparent"
              asChild
            >
              <Link href="/members/join">Join Network</Link>
            </Button>
          </div>
        </div>
      </section> */}
    </div>
  )
}
