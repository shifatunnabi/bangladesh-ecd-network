import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Download, Users, MapPin, Video } from "lucide-react"

const conferences = [
  {
    id: "2024",
    title: "Annual ECD Conference 2024",
    theme: "Building Resilient Early Childhood Systems",
    date: "April 20-22, 2024",
    location: "Dhaka International Conference Center",
    status: "upcoming",
    participants: "500+ Expected",
    image: "/placeholder.svg?height=300&width=400",
    description:
      "Join us for three days of learning, networking, and sharing best practices in early childhood development. This year's theme focuses on building resilient systems that can adapt to changing needs and challenges.",
    materials: [
      { title: "Conference Program", type: "PDF", url: "#" },
      { title: "Registration Information", type: "Link", url: "#" },
      { title: "Call for Abstracts", type: "PDF", url: "#" },
    ],
  },
  {
    id: "2023",
    title: "Annual ECD Conference 2023",
    theme: "Innovation in Early Childhood Development",
    date: "May 15-17, 2023",
    location: "Bangabandhu International Conference Center",
    status: "completed",
    participants: "450 Participants",
    image: "/placeholder.svg?height=300&width=400",
    description:
      "Our 2023 conference brought together leading experts, practitioners, and policymakers to explore innovative approaches to early childhood development in Bangladesh and beyond.",
    materials: [
      { title: "Conference Proceedings", type: "PDF", url: "#" },
      { title: "Keynote Presentations", type: "PDF", url: "#" },
      { title: "Workshop Materials", type: "ZIP", url: "#" },
      { title: "Conference Video Highlights", type: "Video", url: "#" },
      { title: "Photo Gallery", type: "Link", url: "/media/gallery/conference-2023" },
    ],
  },
  {
    id: "2022",
    title: "Annual ECD Conference 2022",
    theme: "Strengthening ECD Systems Post-Pandemic",
    date: "June 10-12, 2022",
    location: "Virtual Conference",
    status: "completed",
    participants: "600 Participants",
    image: "/placeholder.svg?height=300&width=400",
    description:
      "Our first virtual conference addressed the challenges and opportunities in early childhood development following the COVID-19 pandemic, with a focus on system strengthening and recovery.",
    materials: [
      { title: "Conference Proceedings", type: "PDF", url: "#" },
      { title: "Session Recordings", type: "Video", url: "#" },
      { title: "Research Presentations", type: "PDF", url: "#" },
      { title: "Policy Recommendations", type: "PDF", url: "#" },
    ],
  },
  {
    id: "2021",
    title: "Annual ECD Conference 2021",
    theme: "Adapting ECD Services in Crisis",
    date: "September 20-22, 2021",
    location: "Hybrid Event - Dhaka & Virtual",
    status: "completed",
    participants: "350 Participants",
    image: "/placeholder.svg?height=300&width=400",
    description:
      "This hybrid conference explored how early childhood development services adapted during the pandemic and identified strategies for maintaining quality care during crises.",
    materials: [
      { title: "Conference Report", type: "PDF", url: "#" },
      { title: "Best Practices Guide", type: "PDF", url: "#" },
      { title: "Panel Discussion Videos", type: "Video", url: "#" },
    ],
  },
  {
    id: "2020",
    title: "Annual ECD Conference 2020",
    theme: "Digital Innovation in Early Learning",
    date: "March 12-14, 2020",
    location: "Dhaka Regency Hotel",
    status: "completed",
    participants: "400 Participants",
    image: "/placeholder.svg?height=300&width=400",
    description:
      "Our 2020 conference focused on the role of digital technology in enhancing early learning experiences and supporting professional development in the ECD sector.",
    materials: [
      { title: "Conference Proceedings", type: "PDF", url: "#" },
      { title: "Technology Showcase", type: "PDF", url: "#" },
      { title: "Innovation Awards", type: "Link", url: "#" },
    ],
  },
]

export default function ConferencePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Conference</h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Explore materials, presentations, and documentation from our annual conferences. Each year brings together
              leading experts, practitioners, and policymakers to advance early childhood development in Bangladesh.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Conference Timeline */}
        <div className="space-y-8">
          {conferences.map((conference, index) => (
            <Card key={conference.id} className="overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                {/* Image */}
                <div className="relative h-64 lg:h-auto">
                  <Image
                    src={conference.image || "/placeholder.svg"}
                    alt={conference.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant={conference.status === "upcoming" ? "default" : "secondary"}>
                      {conference.status === "upcoming" ? "Upcoming" : "Completed"}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-2 p-6">
                  <div className="space-y-4">
                    <div>
                      <CardTitle className="text-2xl text-primary mb-2">{conference.title}</CardTitle>
                      <p className="text-lg font-medium text-muted-foreground">{conference.theme}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2" />
                        {conference.date}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-2" />
                        {conference.location}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Users className="w-4 h-4 mr-2" />
                        {conference.participants}
                      </div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">{conference.description}</p>

                    {/* Materials */}
                    <div>
                      <h4 className="font-semibold mb-3">Conference Materials</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {conference.materials.map((material, materialIndex) => (
                          <Button
                            key={materialIndex}
                            variant="outline"
                            size="sm"
                            className="justify-start bg-transparent"
                            asChild
                          >
                            <a href={material.url} target="_blank" rel="noopener noreferrer">
                              {material.type === "PDF" && <Download className="w-4 h-4 mr-2" />}
                              {material.type === "Video" && <Video className="w-4 h-4 mr-2" />}
                              {material.type === "Link" && <MapPin className="w-4 h-4 mr-2" />}
                              {material.type === "ZIP" && <Download className="w-4 h-4 mr-2" />}
                              {material.title}
                            </a>
                          </Button>
                        ))}
                      </div>
                    </div>

                    {conference.status === "upcoming" && (
                      <div className="pt-4">
                        <Button size="lg" asChild>
                          <Link href={`/media/events/annual-ecd-conference-${conference.id}`}>Register Now</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16">
          <Card className="bg-muted/30">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-primary mb-4">Join Our Next Conference</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Don't miss our upcoming Annual ECD Conference 2024. Register early to secure your spot and join the
                conversation on building resilient early childhood systems.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/media/events/annual-ecd-conference-2024">Register for 2024 Conference</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/media/events">View All Events</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
