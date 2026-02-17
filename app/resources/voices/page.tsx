import { Card } from "@/components/ui/card"
import { getAllVoices, transformVoice } from "@/lib/contentful"

// Enable ISR - Revalidate every 60 seconds
export const revalidate = 60;

async function getVoices() {
  try {
    const voiceEntries = await getAllVoices()
    return voiceEntries.map(transformVoice)
  } catch (error) {
    console.error('Error fetching voices:', error)
    return []
  }
}

// Helper function to extract YouTube video ID from various URL formats
function getYouTubeVideoId(url: string): string | null {
  if (!url) return null
  
  // Handle youtu.be short links
  const shortLinkMatch = url.match(/youtu\.be\/([^?]+)/)
  if (shortLinkMatch) return shortLinkMatch[1]
  
  // Handle standard youtube.com links
  const longLinkMatch = url.match(/[?&]v=([^&]+)/)
  if (longLinkMatch) return longLinkMatch[1]
  
  // Handle embed links
  const embedMatch = url.match(/embed\/([^?]+)/)
  if (embedMatch) return embedMatch[1]
  
  // If it's already just an ID
  if (url.length === 11 && !url.includes('/')) return url
  
  return null
}

export default async function VoicesPage() {
  const voices = await getVoices()

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
        {/* Results Count */}
        {voices.length > 0 && (
          <div className="text-sm text-muted-foreground mb-6">
            Showing {voices.length} {voices.length === 1 ? 'video' : 'videos'}
          </div>
        )}

        {/* Videos Grid */}
        {voices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {voices.map((voice) => {
              const videoId = getYouTubeVideoId(voice.videoUrl)
              
              return (
                <Card key={voice.id} className="overflow-hidden">
                  <div className="aspect-video">
                    {videoId ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title={voice.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted">
                        <p className="text-muted-foreground">Invalid video URL</p>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{voice.title}</h3>
                  </div>
                </Card>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-xl font-semibold mb-2">No Videos Available</h3>
            <p className="text-muted-foreground">
              We're working on adding inspiring voices and stories from our community.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
