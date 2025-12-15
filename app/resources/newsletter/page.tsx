import { ResourceCard } from "@/components/resource-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail } from "lucide-react"
import Link from "next/link"
import { getAllNewsletters, transformNewsletter } from "@/lib/contentful"

async function getNewsletters() {
  try {
    const newsletterEntries = await getAllNewsletters()
    return newsletterEntries.map(transformNewsletter)
  } catch (error) {
    console.error('Error fetching newsletters:', error)
    return []
  }
}

export default async function NewsletterPage() {
  const newsletters = await getNewsletters()

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
        

        {/* Newsletter Archive */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Newsletter Archive</h2>
          <p className="text-muted-foreground">Browse our previous newsletters and special issues</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsletters.length > 0 ? (
            newsletters.map((newsletter, index) => (
              <ResourceCard key={newsletter.id || index} {...newsletter} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground text-lg">No newsletters found.</p>
              <p className="text-sm text-muted-foreground mt-2">Please check back later for new issues.</p>
            </div>
          )}
        </div>

        {/* Load More */}
        {newsletters.length > 0 && (
          <div className="text-center my-12 ">
            <Button variant="outline" size="lg">
              Load More Issues
            </Button>
          </div>
        )}

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
      </div>
    </div>
  )
}
