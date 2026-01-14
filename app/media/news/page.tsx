import { getAllNews, transformNews } from "@/lib/contentful"
import { NewsClient } from "./news-client"

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
              Stay informed with the latest news, announcements, and updates from the Bangladesh ECD Network (BEN) and our
              partners.
            </p>
          </div>
        </div>
      </section>

      <NewsClient newsArticles={newsArticles} />
    </div>
  )
}
