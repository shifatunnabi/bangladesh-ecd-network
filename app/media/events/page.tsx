import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin, Clock, Users, Search, Filter } from "lucide-react"

const events = [
  {
    id: "1",
    title: "Annual ECD Conference 2024",
    description:
      "Join us for three days of learning, networking, and sharing best practices in early childhood development.",
    date: "April 20-22, 2024",
    time: "9:00 AM - 5:00 PM",
    location: "Dhaka International Conference Center",
    image: "/placeholder.svg?height=200&width=300",
    badge: "Upcoming",
    type: "Conference",
    capacity: "500 participants",
    href: "/media/events/annual-ecd-conference-2024",
    registrationOpen: true,
  },
  {
    id: "2",
    title: "ECD Practitioner Training Workshop",
    description: "Intensive training workshop for early childhood development practitioners and educators.",
    date: "April 15-16, 2024",
    time: "10:00 AM - 4:00 PM",
    location: "BRAC Learning Center, Dhaka",
    image: "/placeholder.svg?height=200&width=300",
    badge: "Training",
    type: "Workshop",
    capacity: "50 participants",
    href: "/media/events/practitioner-training-april-2024",
    registrationOpen: true,
  },
  {
    id: "3",
    title: "Community ECD Program Launch",
    description: "Launch ceremony for new community-based early childhood development programs in rural areas.",
    date: "April 10, 2024",
    time: "11:00 AM - 2:00 PM",
    location: "Rangpur Community Center",
    image: "/placeholder.svg?height=200&width=300",
    badge: "Launch Event",
    type: "Community Event",
    capacity: "200 participants",
    href: "/media/events/community-program-launch-april-2024",
    registrationOpen: false,
  },
  {
    id: "4",
    title: "Research Methodology Workshop",
    description: "Advanced workshop on research methods and data analysis for ECD professionals.",
    date: "March 25, 2024",
    time: "9:00 AM - 5:00 PM",
    location: "University of Dhaka",
    image: "/placeholder.svg?height=200&width=300",
    badge: "Completed",
    type: "Workshop",
    capacity: "30 participants",
    href: "/media/events/research-methodology-march-2024",
    registrationOpen: false,
  },
  {
    id: "5",
    title: "Parent Engagement Seminar",
    description: "Seminar focusing on effective strategies for engaging parents in early childhood development.",
    date: "March 20, 2024",
    time: "2:00 PM - 5:00 PM",
    location: "Save the Children Office, Dhaka",
    image: "/placeholder.svg?height=200&width=300",
    badge: "Completed",
    type: "Seminar",
    capacity: "80 participants",
    href: "/media/events/parent-engagement-march-2024",
    registrationOpen: false,
  },
  {
    id: "6",
    title: "Policy Dialogue on ECD Systems",
    description: "High-level dialogue on strengthening early childhood development systems in Bangladesh.",
    date: "March 15, 2024",
    time: "10:00 AM - 4:00 PM",
    location: "Ministry of Women and Children Affairs",
    image: "/placeholder.svg?height=200&width=300",
    badge: "Completed",
    type: "Policy Dialogue",
    capacity: "100 participants",
    href: "/media/events/policy-dialogue-march-2024",
    registrationOpen: false,
  },
]

export default function EventsPage() {
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
          {events.map((event) => (
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
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Events
          </Button>
        </div>
      </div>
    </div>
  )
}
