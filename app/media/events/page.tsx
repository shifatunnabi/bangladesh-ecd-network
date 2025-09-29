import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin, Clock, Users, Search, Filter } from "lucide-react"
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
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search events..." className="pl-10" />
          </div>
          <Button variant="outline" className="sm:w-auto bg-transparent">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            All Events
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            Upcoming
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            Conference
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            Workshop
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            Training
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            Completed
          </Badge>
        </div>

        {/* Results Count */}
        <div className="text-sm text-muted-foreground mb-6">Showing {events.length} events</div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.length > 0 ? (
            events.map((event) => (
            <Card key={event.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="p-0">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge
                      variant={
                        event.badge === "Upcoming" ? "default" : event.badge === "Completed" ? "secondary" : "outline"
                      }
                    >
                      {event.badge}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">{event.type}</p>
                    <CardTitle className="text-base leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                      {event.title}
                    </CardTitle>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="w-4 h-4 mr-2" />
                      {event.capacity}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
                      <Link href={event.href}>View Details</Link>
                    </Button>
                    {event.registrationOpen && (
                      <Button size="sm" className="flex-1">
                        Register
                      </Button>
                    )}
                  </div>
                </div>
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

        {/* Load More */}
        {events.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Events
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
