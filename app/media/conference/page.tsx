import { getConferences, transformConference } from '@/lib/contentful';
import { ConferenceClient } from './conference-client';

// Enable ISR - Revalidate every 60 seconds
export const revalidate = 60;

export default async function ConferencePage() {
  const conferenceEntries = await getConferences();
  const conferences = conferenceEntries.map(transformConference);

  return <ConferenceClient conferences={conferences} />;
}
