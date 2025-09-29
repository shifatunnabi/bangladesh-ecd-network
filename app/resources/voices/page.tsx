import { ResourceCard } from "@/components/resource-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter } from "lucide-react"
import { getAllVoices, transformVoice } from "@/lib/contentful"

async function getVoices() {
  try {
    const voiceEntries = await getAllVoices()
    return voiceEntries.map(transformVoice)
  } catch (error) {
    console.error('Error fetching voices:', error)
    return []
  }
}

export default async function VoicesPage() {
  const voicesResources = await getVoices()

  return (
    <div className="flex flex-col">
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Voices & Stories</h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Listen to the voices of children, families, practitioners, and communities as they share their experiences
              and insights about early childhood development in Bangladesh.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search videos and stories..." className="pl-10" />
          </div>
          <Button variant="outline" className="sm:w-auto bg-transparent">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            All Stories
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            Community Stories
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            Best Practices
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            Children's Perspectives
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            Parent Engagement
          </Badge>
        </div>

        {/* Results Count */}
        <div className="text-sm text-muted-foreground mb-6">Showing {voicesResources.length} videos and stories</div>

        {/* Videos Grid */}
        {voicesResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {voicesResources.map((resource, index) => (
              <ResourceCard key={index} {...resource} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-xl font-semibold mb-2">No Stories Available</h3>
            <p className="text-muted-foreground">
              We're working on adding inspiring voices and stories from our community.
            </p>
          </div>
        )}

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Stories
          </Button>
        </div>
      </div>
    </div>
  )
}
