import { getAllNewsletters, transformNewsletter } from "@/lib/contentful"
import { NewsletterSection } from "@/components/newsletter-section"
import { NewsletterClient } from "./newsletter-client"

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

      <NewsletterClient newsletters={newsletters} />


              {/* Newsletter Subscription */}
        {/* <Card className="max-w-2xl mx-auto mb-12 bg-muted/30">
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
        </Card> */}
        <NewsletterSection />
    </div>
  )
}
