import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin } from "lucide-react"
import { getAllEvents, transformEvent } from "@/lib/contentful"

async function getEvents() {
  try {
    const eventEntries = await getAllEvents()
    return eventEntries.map(transformEvent)
  } catch (error) {
    console.error('Error fetching events:', error)
    return []
  }
}

export default async function EventsPage() {
  const events = await getEvents()

  return (
    <div className="min-h-screen">
      <div className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Events</h1>
            <p className="text-lg leading-relaxed opacity-90">
              Join our upcoming conferences, workshops, training sessions, and networking events. Connect with fellow
              professionals and stay updated on the latest developments in early childhood development.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Results Count */}
        <div className="text-sm text-muted-foreground mb-6">Showing {events.length} events</div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.length > 0 ? (
            events.map((event) => (
            <Card key={event.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col" style={{ minHeight: '420px' }}>
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={event.thumbnail || "/placeholder.svg"}
                  alt={event.title}
                  width={400}
                  height={256}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  quality={75}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <CardContent className="p-5 flex-1 flex flex-col">
                <div className="space-y-3 flex-1">
                  <CardTitle className="text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                    {event.title}
                  </CardTitle>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="line-clamp-1">{event.date}{event.time && ` • ${event.time}`}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full bg-transparent mt-4" asChild>
                  <Link href={event.href}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground text-lg">No events found.</p>
              <p className="text-sm text-muted-foreground mt-2">Please check back later for upcoming events.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
