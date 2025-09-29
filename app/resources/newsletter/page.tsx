import { ResourceCard } from "@/components/resource-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail } from "lucide-react"
import Link from "next/link"

const newsletters = [
  {
    title: "ECD Network Quarterly Update - Q1 2024",
    description: "Latest updates on network activities, research findings, upcoming events, and member spotlights.",
    date: "March 2024",
    image: "/placeholder.svg?height=200&width=300",
    badge: "Latest",
    href: "/resources/newsletter/q1-2024",
    type: "newsletter" as const,
    category: "Quarterly Update",
  },
  {
    title: "ECD Network Quarterly Update - Q4 2023",
    description: "Year-end review of achievements, new research publications, and plans for 2024.",
    date: "December 2023",
    image: "/placeholder.svg?height=200&width=300",
    href: "/resources/newsletter/q4-2023",
    type: "newsletter" as const,
    category: "Quarterly Update",
  },
  {
    title: "Special Issue: ECD Policy Developments",
    description:
      "Focus on recent policy developments and their implications for early childhood development in Bangladesh.",
    date: "November 2023",
    image: "/placeholder.svg?height=200&width=300",
    badge: "Special",
    href: "/resources/newsletter/policy-special-2023",
    type: "newsletter" as const,
    category: "Special Issue",
  },
  {
    title: "ECD Network Quarterly Update - Q3 2023",
    description: "Updates on research projects, training programs, and partnership developments.",
    date: "September 2023",
    image: "/placeholder.svg?height=200&width=300",
    href: "/resources/newsletter/q3-2023",
    type: "newsletter" as const,
    category: "Quarterly Update",
  },
  {
    title: "ECD Network Quarterly Update - Q2 2023",
    description: "Mid-year progress report, new member introductions, and upcoming conference announcements.",
    date: "June 2023",
    image: "/placeholder.svg?height=200&width=300",
    href: "/resources/newsletter/q2-2023",
    type: "newsletter" as const,
    category: "Quarterly Update",
  },
  {
    title: "ECD Network Quarterly Update - Q1 2023",
    description: "New year initiatives, research highlights, and capacity building program updates.",
    date: "March 2023",
    image: "/placeholder.svg?height=200&width=300",
    href: "/resources/newsletter/q1-2023",
    type: "newsletter" as const,
    category: "Quarterly Update",
  },
]

export default function NewsletterPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Newsletter</h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Stay informed with our quarterly newsletters featuring network activities, research insights, member
              spotlights, and important updates from the early childhood development community in Bangladesh.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Newsletter Subscription */}
        <Card className="max-w-2xl mx-auto mb-12 bg-muted/30">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-primary mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Get the latest updates delivered directly to your inbox. Join our community of ECD professionals and stay
              connected with the latest developments.
            </p>
            <Button size="lg" asChild>
              <Link href="/newsletter/subscribe">Subscribe Now</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Newsletter Archive */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Newsletter Archive</h2>
          <p className="text-muted-foreground">Browse our previous newsletters and special issues</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsletters.map((newsletter, index) => (
            <ResourceCard key={index} {...newsletter} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Issues
          </Button>
        </div>
      </div>
    </div>
  )
}
