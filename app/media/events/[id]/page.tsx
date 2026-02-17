import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, MapPin, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getEventById, transformEvent } from "@/lib/contentful";

// Enable ISR - Revalidate every 60 seconds
export const revalidate = 60;

interface EventDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getEvent(id: string) {
  try {
    const eventEntry = await getEventById(id);
    if (!eventEntry) return null;
    return transformEvent(eventEntry);
  } catch (error) {
    console.error("Error fetching event:", error);
    return null;
  }
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { id } = await params;
  const event = await getEvent(id);

  if (!event) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Hero Image */}
          <div className="relative h-[400px] w-full rounded-lg overflow-hidden mb-8">
            <Image
              src={event.thumbnail || "/placeholder.svg"}
              alt={event.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>

          {/* Event Details Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            {/* Event Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              {event.title}
            </h1>

            {/* Event Meta Information */}
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Date & Time</p>
                  <p className="text-gray-600">
                    {event.date}
                    {event.time && (
                      <>
                        <br />
                        <span className="text-sm">{event.time}</span>
                      </>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Location</p>
                  <p className="text-gray-600">{event.location}</p>
                </div>
              </div>

              {event.organizer && (
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Organizer</p>
                    <p className="text-gray-600 whitespace-pre-line">{event.organizer}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Event Description */}
            {event.description && (
              <div className="border-t pt-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  About This Event
                </h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {event.description}
                </p>
              </div>
            )}
          </div>

          {/* Event Photos */}
          {event.photos && event.photos.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Event Photos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {event.photos.map((photo, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer hover:shadow-lg transition-all"
                  >
                    <Image
                      src={photo}
                      alt={`${event.title} - Photo ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      loading={index < 6 ? "eager" : "lazy"}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Back Button */}
          <div className="text-center pb-12">
            <Button variant="outline" size="lg" asChild>
              <Link href="/media/events">← Back to Events</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
