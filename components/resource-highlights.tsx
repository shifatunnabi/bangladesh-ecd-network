import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Download, Play, ExternalLink, FileText } from "lucide-react"
import type { ProcessedResearch, ProcessedVoice, ProcessedNewsletter, ProcessedPolicyLink } from "@/lib/contentful-types"

interface ResourceHighlightsProps {
  latestResearch: ProcessedResearch | null;
  latestVoice: ProcessedVoice | null;
  latestNewsletter: ProcessedNewsletter | null;
  latestPolicy: ProcessedPolicyLink | null;
}

export function ResourceHighlights({ latestResearch, latestVoice, latestNewsletter, latestPolicy }: ResourceHighlightsProps) {
  const resources = [
    latestResearch ? {
      type: "Research Report",
      title: latestResearch.title,
      date: latestResearch.date,
      image: latestResearch.image || "/images/resources/research-report-cover.jpg",
      badge: latestResearch.badge || "New",
      href: `/resources/research-reports/${latestResearch.id}`,
      action: "Download PDF",
      icon: Download,
    } : null,
    latestVoice ? {
      type: "Video Resource",
      title: latestVoice.title,
      date: latestVoice.date,
      image: latestVoice.image || "/images/resources/video-thumbnail.jpg",
      badge: latestVoice.badge || "Featured",
      href: `/resources/voices/${latestVoice.id}`,
      action: "Watch Video",
      icon: Play,
    } : null,
    latestPolicy ? {
      type: "Policy Brief",
      title: latestPolicy.title,
      date: latestPolicy.year || "Recent",
      image: latestPolicy.imageUrl || "/images/resources/policy-brief-cover.jpg",
      badge: "Policy",
      href: latestPolicy.fileUrl,
      action: "Read More",
      icon: ExternalLink,
    } : null,
    latestNewsletter ? {
      type: "Newsletter",
      title: latestNewsletter.title,
      date: latestNewsletter.date,
      image: latestNewsletter.image || "/images/resources/newsletter-cover.jpg",
      badge: latestNewsletter.badge || "Latest",
      href: latestNewsletter.href,
      action: "View Newsletter",
      icon: FileText,
    } : null,
  ].filter((resource): resource is NonNullable<typeof resource> => resource !== null);

  if (resources.length === 0) {
    return null;
  }

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
                <div className="relative h-48 overflow-hidden rounded-t-lg border-b border-blue-200">
                  <Image
                    src={resource.image || "/placeholder.svg"}
                    alt={resource.title}
                    width={400}
                    height={192}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    quality={75}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
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
