import { getConferences, transformConference } from '@/lib/contentful';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default async function ConferencePage() {
  const conferenceEntries = await getConferences();
  const conferences = conferenceEntries.map(transformConference);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Conferences</h1>
        <p className="text-muted-foreground text-lg">
          Explore our conferences and knowledge-sharing events.
        </p>
      </div>

      {conferences.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">
          No conferences available at the moment.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {conferences.map((conference) => (
            <Card key={conference.id} style={{ minHeight: '420px' }} className="flex flex-col">
              {conference.thumbnail && (
                <div className="h-64 w-full overflow-hidden rounded-t-lg">
                  <Image
                    src={conference.thumbnail}
                    alt={conference.title}
                    width={400}
                    height={256}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <CardContent className="p-5 flex-1 flex flex-col">
                <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                  {conference.title}
                </h2>
                {conference.theme && (
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {conference.theme}
                  </p>
                )}
                <div className="space-y-2 mb-4 flex-1">
                  {conference.date && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      {conference.date}
                    </div>
                  )}
                  {conference.venue && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2" />
                      {conference.venue}
                    </div>
                  )}
                </div>
                <Link href={conference.href}>
                  <Button className="w-full mt-4">View Details</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
