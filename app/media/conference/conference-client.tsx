"use client"

import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Download, Users, MapPin, ExternalLink } from "lucide-react"
import { ProcessedConference } from "@/lib/contentful-types"

interface ConferenceClientProps {
  conferences: ProcessedConference[]
}

// Fallback conferences for when no Contentful data is available
const fallbackConferences: ProcessedConference[] = [
  {
    id: "fallback-2024",
    title: "Annual ECD Conference 2024",
    subtitle: "Building Resilient Early Childhood Systems",
    theme: "Building Resilient Early Childhood Systems",
    date: "April 20-22, 2024",
    venue: "Dhaka International Conference Center",
    organizer: "Bangladesh ECD Network",
    status: "upcoming",
    thumbnail: "/placeholder.svg?height=300&width=400",
    thumbnailUrl: "/placeholder.svg?height=300&width=400",
    photos: [],
    href: "/media/conference/fallback-2024",
    description:
      "Join us for three days of learning, networking, and sharing best practices in early childhood development. This year's theme focuses on building resilient systems that can adapt to changing needs and challenges.",
  },
  {
    id: "fallback-2023",
    title: "Annual ECD Conference 2023",
    subtitle: "Innovation in Early Childhood Development",
    theme: "Innovation in Early Childhood Development",
    date: "May 15-17, 2023",
    venue: "Bangabandhu International Conference Center",
    organizer: "Bangladesh ECD Network",
    status: "completed",
    thumbnail: "/placeholder.svg?height=300&width=400",
    thumbnailUrl: "/placeholder.svg?height=300&width=400",
    photos: [],
    href: "/media/conference/fallback-2023",
    description:
      "Our 2023 conference brought together leading experts, practitioners, and policymakers to explore innovative approaches to early childhood development in Bangladesh and beyond.",
  },
  {
    id: "fallback-2022",
    title: "Annual ECD Conference 2022",
    subtitle: "Strengthening ECD Systems Post-Pandemic",
    theme: "Strengthening ECD Systems Post-Pandemic",
    date: "June 10-12, 2022",
    venue: "Virtual Conference",
    organizer: "Bangladesh ECD Network",
    status: "completed",
    thumbnail: "/placeholder.svg?height=300&width=400",
    thumbnailUrl: "/placeholder.svg?height=300&width=400",
    photos: [],
    href: "/media/conference/fallback-2022",
    description:
      "Our first virtual conference addressed the challenges and opportunities in early childhood development following the COVID-19 pandemic, with a focus on system strengthening and recovery.",
  },
]

export function ConferenceClient({ conferences }: ConferenceClientProps) {
  // Use Contentful data if available, otherwise use fallback data
  const displayConferences = conferences.length > 0 ? conferences : fallbackConferences

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
          {displayConferences.map((conference) => (
            <Card key={conference.id} className="overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                {/* Image */}
                <div className="relative h-64 lg:h-auto bg-gray-100">
                  <Image
                    src={conference.thumbnailUrl || "/placeholder.svg"}
                    alt={conference.title}
                    fill
                    className="object-cover"
                    loading="lazy"
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant={conference.status === "upcoming" ? "default" : "secondary"}>
                      {conference.status === "upcoming" ? "Upcoming" : "Completed"}
                    </Badge>
                    {/* {conference.badge && (
                      <Badge className="ml-2" variant="destructive">
                        {conference.badge}
                      </Badge>
                    )} */}
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-2 p-6">
                  <div className="space-y-4">
                    <div>
                      <CardTitle className="text-2xl text-primary mb-2">{conference.title}</CardTitle>
                      {conference.subtitle && (
                        <p className="text-lg font-medium text-muted-foreground">{conference.subtitle}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2" />
                        {conference.date}
                      </div>
                      {conference.venue && (
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="w-4 h-4 mr-2" />
                          {conference.venue}
                        </div>
                      )}
                    </div>

                    {conference.description && (
                      <p className="text-muted-foreground leading-relaxed">{conference.description}</p>
                    )}

                    {/* No materials or registration links in new model */}
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
                Don't miss our upcoming conferences. Register early to secure your spot and join the
                conversation on advancing early childhood development in Bangladesh.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/media/events">View All Events</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}