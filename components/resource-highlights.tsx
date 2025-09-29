import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Download, Play, ExternalLink } from "lucide-react"

const resources = [
  {
    type: "Research Report",
    title: "Early Childhood Development in Rural Bangladesh: Current State and Opportunities",
    date: "March 2024",
    image: "/images/resources/research-report-cover.jpg", // Updated to use generated research report cover
    badge: "New",
    href: "/resources/research-reports",
    action: "Download PDF",
    icon: Download,
  },
  {
    type: "Video Resource",
    title: "Best Practices in Community-Based ECD Programs",
    date: "February 2024",
    image: "/images/resources/video-thumbnail.jpg", // Updated to use generated video thumbnail
    badge: "Featured",
    href: "/resources/voices",
    action: "Watch Video",
    icon: Play,
  },
  {
    type: "Policy Brief",
    title: "Strengthening ECD Systems: Policy Recommendations for Bangladesh",
    date: "January 2024",
    image: "/images/resources/policy-brief-cover.jpg", // Updated to use generated policy brief cover
    badge: "Policy",
    href: "/resources/research-reports",
    action: "Read More",
    icon: ExternalLink,
  },
  {
    type: "Newsletter",
    title: "ECD Network Quarterly Update - Q1 2024",
    date: "March 2024",
    image: "/images/resources/newsletter-cover.jpg", // Updated to use generated newsletter cover
    badge: "Latest",
    href: "/resources/newsletter",
    action: "View Newsletter",
    icon: ExternalLink,
  },
]

export function ResourceHighlights() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Latest Resources</h2>
          <p className="text-lg text-blue-700 max-w-2xl mx-auto">
            Discover our latest research, reports, and resources on early childhood development in Bangladesh.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {resources.map((resource, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm border-blue-200 hover:border-blue-300"
            >
              <CardHeader className="p-0">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <Image
                    src={resource.image || "/placeholder.svg"}
                    alt={resource.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant={resource.badge === "New" ? "default" : "secondary"}>{resource.badge}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-blue-600">{resource.type}</p>
                    <CardTitle className="text-base leading-tight line-clamp-2 text-blue-900">
                      {resource.title}
                    </CardTitle>
                  </div>
                  <div className="flex items-center text-sm text-blue-600">
                    <Calendar className="w-4 h-4 mr-1" />
                    {resource.date}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent border-blue-300 text-blue-700 hover:bg-blue-50"
                    asChild
                  >
                    <Link href={resource.href}>
                      <resource.icon className="w-4 h-4 mr-2" />
                      {resource.action}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            variant="outline"
            className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
            asChild
          >
            <Link href="/resources">View All Resources</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
