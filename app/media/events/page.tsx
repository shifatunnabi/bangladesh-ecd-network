import { getAllEvents, transformEvent } from "@/lib/contentful"
import { EventsClient } from "./events-client"

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

      <EventsClient events={events} />
    </div>
  )
}
