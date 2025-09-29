import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Search, Filter, User } from "lucide-react"

const newsArticles = [
  {
    id: "1",
    title: "Bangladesh ECD Network Launches New Research Initiative",
    excerpt:
      "A comprehensive study on early childhood development outcomes in urban and rural settings begins with support from international partners.",
    date: "March 15, 2024",
    author: "Dr. Rashida Ahmed",
    image: "/placeholder.svg?height=200&width=300",
    badge: "Breaking News",
    category: "Research",
    href: "/media/news/new-research-initiative-2024",
  },
  {
    id: "2",
    title: "Partnership Agreement Signed with UNICEF Bangladesh",
    excerpt:
      "New three-year partnership will focus on strengthening early childhood development systems across the country.",
    date: "March 10, 2024",
    author: "Communications Team",
    image: "/placeholder.svg?height=200&width=300",
    badge: "Partnership",
    category: "Partnerships",
    href: "/media/news/unicef-partnership-2024",
  },
  {
    id: "3",
    title: "Training Program Graduates 50 New ECD Practitioners",
    excerpt: "Latest cohort of early childhood development practitioners completes comprehensive training program.",
    date: "March 5, 2024",
    author: "Training Department",
    image: "/placeholder.svg?height=200&width=300",
    category: "Training",
    href: "/media/news/training-graduates-march-2024",
  },
  {
    id: "4",
    title: "New ECD Centers Open in Rural Communities",
    excerpt: "Five new community-based early childhood development centers inaugurated in remote areas of Bangladesh.",
    date: "February 28, 2024",
    author: "Field Operations",
    image: "/placeholder.svg?height=200&width=300",
    category: "Community",
    href: "/media/news/new-ecd-centers-february-2024",
  },
  {
    id: "5",
    title: "Research Findings Published in International Journal",
    excerpt:
      "Network's research on nutrition and early brain development featured in prestigious international publication.",
    date: "February 20, 2024",
    author: "Research Team",
    image: "/placeholder.svg?height=200&width=300",
    badge: "Publication",
    category: "Research",
    href: "/media/news/international-publication-february-2024",
  },
  {
    id: "6",
    title: "Annual Conference 2024 Registration Now Open",
    excerpt:
      "Join us for three days of learning, networking, and sharing best practices in early childhood development.",
    date: "February 15, 2024",
    author: "Events Team",
    image: "/placeholder.svg?height=200&width=300",
    badge: "Event",
    category: "Events",
    href: "/media/news/conference-registration-2024",
  },
]

export default function NewsPage() {
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
          {newsArticles.map((article) => (
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
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Articles
          </Button>
        </div>
      </div>
    </div>
  )
}
