import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Camera, Newspaper, Users } from "lucide-react"
import { getMediaCounts } from "@/lib/contentful"
import { NewsletterSection } from "@/components/newsletter-section"

const featuredContent = [
  {
    type: "news",
    title: "Bangladesh ECD Network Launches New Research Initiative",
    description: "Comprehensive study on early childhood development outcomes in urban and rural settings begins.",
    date: "March 15, 2024",
    image: "/placeholder.svg?height=200&width=300",
    badge: "Breaking News",
    href: "/media/news/new-research-initiative-2024",
  },
  {
    type: "event",
    title: "Annual ECD Conference 2024",
    description:
      "Join us for three days of learning, networking, and sharing best practices in early childhood development.",
    date: "April 20-22, 2024",
    image: "/placeholder.svg?height=200&width=300",
    badge: "Upcoming",
    href: "/media/events/annual-ecd-conference-2024",
  },
  {
    type: "gallery",
    title: "Community ECD Center Opening Ceremony",
    description: "Photos from the inauguration of new early childhood development centers in rural communities.",
    date: "March 10, 2024",
    image: "/placeholder.svg?height=200&width=300",
    badge: "New Photos",
    href: "/media/gallery/community-ecd-center-opening",
  },
]

const getMediaCategories = (counts: { newsCount: number; eventsCount: number; conferencesCount: number; photosCount: number }) => [
  {
    icon: Newspaper,
    title: "News & Updates",
    description: "Latest news, announcements, and updates from the BEN.",
    href: "/media/news",
    count: `${counts.newsCount} Article${counts.newsCount !== 1 ? 's' : ''}`,
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Calendar,
    title: "Events",
    description: "Upcoming conferences, workshops, training sessions, and networking events.",
    href: "/media/events",
    count: `${counts.eventsCount} Event${counts.eventsCount !== 1 ? 's' : ''}`,
    color: "bg-green-50 text-green-600",
  },
  {
    icon: Users,
    title: "Conference",
    description: "Conference materials, presentations, and docs from past events.",
    href: "/media/conference",
    count: `${counts.conferencesCount} Conference${counts.conferencesCount !== 1 ? 's' : ''}`,
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: Camera,
    title: "Gallery",
    description: "Visual documentation of our activities, events, and community initiatives.",
    href: "/media/gallery",
    count: `${counts.photosCount} Photo${counts.photosCount !== 1 ? 's' : ''}`,
    color: "bg-orange-50 text-orange-600",
  },
]

export default async function MediaPage() {
  const counts = await getMediaCounts();
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Media Hub</h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Stay connected with the latest news, events, and visual stories from the Bangladesh ECD Network and our
              community of partners.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Content */}
      {/* <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Featured Content</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Highlights from our recent activities, announcements, and community engagement initiatives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredContent.map((content, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="p-0">
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <Image
                      src={content.image || "/placeholder.svg"}
                      alt={content.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant={content.badge === "Breaking News" ? "destructive" : "default"}>
                        {content.badge}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground capitalize">{content.type}</p>
                      <CardTitle className="text-base leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                        {content.title}
                      </CardTitle>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{content.description}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-1" />
                      {content.date}
                    </div>
                    <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                      <Link href={content.href}>Read More</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* Media Categories */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Explore Media Categories</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse our comprehensive collection of news, events, conference materials, and photo galleries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {getMediaCategories(counts).map((category, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 group">
                <CardHeader>
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${category.color} group-hover:scale-110 transition-transform`}
                  >
                    <category.icon className="w-8 h-8" />
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">50+</div>
              <div className="text-lg font-medium">News Articles</div>
              <p className="text-muted-foreground">Published this year</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">20+</div>
              <div className="text-lg font-medium">Events Hosted</div>
              <p className="text-muted-foreground">Training and conferences</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">500+</div>
              <div className="text-lg font-medium">Photos Shared</div>
              <p className="text-muted-foreground">Community activities</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">1000+</div>
              <div className="text-lg font-medium">People Reached</div>
              <p className="text-muted-foreground">Through our media</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Newsletter Signup */}
      {/* <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-foreground mb-4">Stay Updated</h2>
          <p className="text-lg text-secondary-foreground/80 max-w-2xl mx-auto mb-8">
            Subscribe to our newsletter to receive the latest news, event announcements, and updates directly in your
            inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="bg-white text-secondary hover:bg-white/90" asChild>
              <Link href="/resources/newsletter">View All Resources</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 bg-transparent"
              asChild
            >
              <Link href="/media/news">View All News</Link>
            </Button>
          </div>
        </div>
      </section> */}

      <NewsletterSection />
    </div>
  )
}
