import { getConferenceById } from '@/lib/contentful';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, MapPin, Building2 } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function ConferenceDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const conference = await getConferenceById(id);

  if (!conference) {
    notFound();
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Thumbnail Image */}
        {conference.thumbnail && (
          <div className="rounded-lg overflow-hidden mb-8">
            <Image
              src={conference.thumbnail}
              alt={conference.title}
              width={1200}
              height={600}
              className="w-full h-auto"
              priority
            />
          </div>
        )}

        {/* Conference Details */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-6">{conference.title}</h1>

          {conference.theme && (
            <p className="text-xl text-muted-foreground mb-6 italic">
              {conference.theme}
            </p>
          )}

          <div className="flex flex-wrap gap-6 mb-6">
            {conference.date && (
              <div className="flex items-center text-muted-foreground">
                <Calendar className="h-5 w-5 mr-2" />
                <span>
                  {conference.date}
                </span>
              </div>
            )}

            {conference.venue && (
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{conference.venue}</span>
              </div>
            )}

            {conference.organizer && (
              <div className="flex items-center text-muted-foreground">
                <Building2 className="h-5 w-5 mr-2" />
                <span>{conference.organizer}</span>
              </div>
            )}
          </div>

          {conference.description && (
            <Card className="mb-12">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">About</h2>
                <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                  {conference.description}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Conference Photos */}
        {conference.photos.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Conference Photos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {conference.photos.map((photo, index) => (
                <div
                  key={index}
                  className="relative aspect-video overflow-hidden rounded-lg bg-gray-100"
                >
                  <Image
                    src={photo}
                    alt={`${conference.title} photo ${index + 1}`}
                    width={400}
                    height={225}
                    className="object-cover w-full h-full"
                    loading="lazy"
                    unoptimized
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
