import { getConferences, transformConference } from '@/lib/contentful';
import { ConferenceClient } from './conference-client';

export default async function ConferencePage() {
  const conferenceEntries = await getConferences();
  const conferences = conferenceEntries.map(transformConference);

  return <ConferenceClient conferences={conferences} />;
}
