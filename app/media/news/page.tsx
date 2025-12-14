import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Calendar, User, ExternalLink } from "lucide-react"
import { getAllNews, transformNews } from "@/lib/contentful"

async function getNewsArticles() {
  try {
    const newsEntries = await getAllNews()
    return newsEntries.map(transformNews)
  } catch (error) {
    console.error('Error fetching news:', error)
    return []
  }
}

export default async function NewsPage() {
  const newsArticles = await getNewsArticles()

  return (
    <div className="flex flex-col">
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">News & Updates</h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Stay informed with the latest news, announcements, and updates from the Bangladesh ECD Network and our
              partners.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Results Count */}
        <div className="text-sm text-muted-foreground mb-6">Showing {newsArticles.length} articles</div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsArticles.length > 0 ? (
            newsArticles.map((article) => (
            <Card key={article.id} className="group hover:shadow-lg transition-all duration-300 flex flex-col">
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="flex-1 space-y-4">
                  <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                    {article.title}
                  </CardTitle>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-2" />
                      {article.date}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <User className="w-4 h-4 mr-2" />
                      {article.author}
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full bg-transparent mt-4" asChild>
                  <a href={article.newsLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Read Full Article
                  </a>
                </Button>
              </CardContent>
            </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground text-lg">No news articles found.</p>
              <p className="text-sm text-muted-foreground mt-2">Please check back later for updates.</p>
            </div>
          )}
        </div>

        {/* Load More */}
        {newsArticles.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Articles
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
