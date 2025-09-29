import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Search, Filter, User } from "lucide-react"
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
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search news articles..." className="pl-10" />
          </div>
          <Button variant="outline" className="sm:w-auto bg-transparent">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            All News
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            Research
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            Partnerships
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            Training
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            Community
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            Events
          </Badge>
        </div>

        {/* Results Count */}
        <div className="text-sm text-muted-foreground mb-6">Showing {newsArticles.length} articles</div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsArticles.length > 0 ? (
            newsArticles.map((article) => (
            <Card key={article.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="p-0">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {article.badge && (
                    <div className="absolute top-3 left-3">
                      <Badge variant={article.badge === "Breaking News" ? "destructive" : "default"}>
                        {article.badge}
                      </Badge>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">{article.category}</p>
                    <CardTitle className="text-base leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </CardTitle>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-3">{article.excerpt}</p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-1" />
                      {article.date}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <User className="w-4 h-4 mr-1" />
                      {article.author}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                    <Link href={article.href}>Read Full Article</Link>
                  </Button>
                </div>
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
