import { createClient, ContentfulClientApi } from "contentful";
import type {
  Entry,
  Asset,
  EntryFieldTypes,
  EntrySkeletonType,
} from "contentful";
import type {
  NewsSkeleton,
  ProcessedNews,
  EventSkeleton,
  ProcessedEvent,
  NewsletterSkeleton,
  ProcessedNewsletter,
  ResearchSkeleton,
  ProcessedResearch,
  VoiceSkeleton,
  ProcessedVoice,
} from "./contentful-types";

// Environment variables validation
const {
  CONTENTFUL_SPACE_ID,
  CONTENTFUL_ACCESS_TOKEN,
  CONTENTFUL_PREVIEW_ACCESS_TOKEN,
  CONTENTFUL_ENVIRONMENT = "master",
  CONTENTFUL_PREVIEW = "false",
} = process.env;

// For development/build environments without Contentful
const isContentfulConfigured = CONTENTFUL_SPACE_ID && CONTENTFUL_ACCESS_TOKEN;

if (!isContentfulConfigured) {
  console.warn(
    "Contentful environment variables not configured. Using mock data for development."
  );
}

// Mock client for when Contentful is not configured
const mockClient = {
  getEntries: async () => ({ items: [] }),
  getEntry: async () => null,
};

// Create the main client for published content
export const contentfulClient = isContentfulConfigured
  ? createClient({
      space: CONTENTFUL_SPACE_ID!,
      accessToken: CONTENTFUL_ACCESS_TOKEN!,
      environment: CONTENTFUL_ENVIRONMENT,
    })
  : mockClient;

// Create preview client for draft content
export const previewClient =
  isContentfulConfigured && CONTENTFUL_PREVIEW_ACCESS_TOKEN
    ? createClient({
        space: CONTENTFUL_SPACE_ID!,
        accessToken: CONTENTFUL_PREVIEW_ACCESS_TOKEN,
        environment: CONTENTFUL_ENVIRONMENT,
        host: "preview.contentful.com",
      })
    : mockClient;

// Helper function to get the appropriate client
export function getClient(preview = false) {
  if (!isContentfulConfigured) {
    return mockClient;
  }
  if (preview && CONTENTFUL_PREVIEW_ACCESS_TOKEN) {
    return previewClient;
  }
  return contentfulClient;
}

// Generic function to fetch entries
export async function getEntries<T extends EntrySkeletonType>(
  contentType: string,
  query: any = {},
  preview = false
): Promise<Entry<T>[]> {
  try {
    const client = getClient(preview);
    const response = await client.getEntries<T>({
      content_type: contentType,
      ...query,
    });
    return response.items;
  } catch (error) {
    console.error(`Error fetching entries for ${contentType}:`, error);
    return [];
  }
}

// Generic function to fetch a single entry by ID
export async function getEntry<T extends EntrySkeletonType>(
  entryId: string,
  preview = false
): Promise<Entry<T> | null> {
  try {
    const client = getClient(preview);
    const entry = await client.getEntry<T>(entryId);
    return entry;
  } catch (error) {
    console.error(`Error fetching entry ${entryId}:`, error);
    return null;
  }
}

// Generic function to fetch a single entry by field value
export async function getEntryByField<T extends EntrySkeletonType>(
  contentType: string,
  fieldName: string,
  fieldValue: string,
  preview = false
): Promise<Entry<T> | null> {
  try {
    const client = getClient(preview);
    const query: any = {
      content_type: contentType,
      limit: 1,
    };
    query[`fields.${fieldName}`] = fieldValue;

    const response = await client.getEntries<T>(query);
    return response.items[0] || null;
  } catch (error) {
    console.error(`Error fetching entry by ${fieldName}:`, error);
    return null;
  }
}

// Helper function to extract asset URL
export function getAssetUrl(asset: Asset | undefined): string {
  if (!asset?.fields?.file?.url) {
    return "/placeholder.svg";
  }

  const url = asset.fields.file.url as string;
  return url.startsWith("//") ? `https:${url}` : url;
}

// Helper function to format date
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Helper function to extract plain text from rich text
export function extractPlainText(richText: any): string {
  if (!richText || !richText.content) return "";

  let text = "";

  function traverse(node: any) {
    if (node.nodeType === "text") {
      text += node.value;
    } else if (node.content) {
      node.content.forEach(traverse);
    }
  }

  richText.content.forEach(traverse);
  return text;
}

// News-specific functions
export async function getAllNews(
  preview = false
): Promise<Entry<NewsSkeleton>[]> {
  return getEntries<NewsSkeleton>("news", { order: ["-fields.date"] }, preview);
}

export async function getNewsByCategory(
  category: string,
  preview = false
): Promise<Entry<NewsSkeleton>[]> {
  try {
    const client = getClient(preview);
    const query: any = {
      content_type: "news",
      order: ["-fields.date"],
    };
    query["fields.category"] = category;

    const response = await client.getEntries<NewsSkeleton>(query);
    return response.items;
  } catch (error) {
    console.error(`Error fetching news by category ${category}:`, error);
    return [];
  }
}

export async function getFeaturedNews(
  limit = 3,
  preview = false
): Promise<Entry<NewsSkeleton>[]> {
  return getEntries<NewsSkeleton>(
    "news",
    {
      order: ["-fields.date"],
      limit,
    },
    preview
  );
}

export async function getNewsById(
  entryId: string,
  preview = false
): Promise<Entry<NewsSkeleton> | null> {
  return getEntry<NewsSkeleton>(entryId, preview);
}

// Transform Contentful news entry to processed format
export function transformNews(entry: Entry<NewsSkeleton>): ProcessedNews {
  const { fields, sys } = entry;

  return {
    id: sys.id,
    title: (fields.title as string) || "",
    excerpt: (fields.excerpt as string) || "",
    category: (fields.category as string) || "General",
    author: (fields.author as string) || "Bangladesh ECD Network",
    content: fields.content || null,
    image: getAssetUrl(fields.thumbnail as Asset),
    date: formatDate(fields.date as string),
    badge: determineNewsBadge(fields.date as string),
    href: `/media/news/${sys.id}`,
  };
}

// Helper function to determine badge based on date
function determineNewsBadge(dateString: string): string {
  const newsDate = new Date(dateString);
  const now = new Date();
  const daysDiff = Math.floor(
    (now.getTime() - newsDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysDiff <= 3) return "Breaking News";
  if (daysDiff <= 7) return "Recent";
  return "";
}

// Event-specific functions
export async function getAllEvents(
  preview = false
): Promise<Entry<EventSkeleton>[]> {
  return getEntries<EventSkeleton>(
    "event",
    { order: ["fields.startDate"] },
    preview
  );
}

export async function getUpcomingEvents(
  preview = false
): Promise<Entry<EventSkeleton>[]> {
  try {
    const client = getClient(preview);
    const now = new Date().toISOString();
    const query: any = {
      content_type: "event",
      order: ["fields.startDate"],
    };
    query["fields.startDate[gte]"] = now;

    const response = await client.getEntries<EventSkeleton>(query);
    return response.items;
  } catch (error) {
    console.error("Error fetching upcoming events:", error);
    return [];
  }
}

export async function getPastEvents(
  preview = false
): Promise<Entry<EventSkeleton>[]> {
  try {
    const client = getClient(preview);
    const now = new Date().toISOString();
    const query: any = {
      content_type: "event",
      order: ["-fields.startDate"],
    };
    query["fields.startDate[lt]"] = now;

    const response = await client.getEntries<EventSkeleton>(query);
    return response.items;
  } catch (error) {
    console.error("Error fetching past events:", error);
    return [];
  }
}

export async function getEventById(
  entryId: string,
  preview = false
): Promise<Entry<EventSkeleton> | null> {
  return getEntry<EventSkeleton>(entryId, preview);
}

// Transform Contentful event entry to processed format
export function transformEvent(entry: Entry<EventSkeleton>): ProcessedEvent {
  const { fields, sys } = entry;

  // Format dates
  const startDate = fields.startDate
    ? new Date(fields.startDate as string)
    : null;
  const endDate = fields.endDate ? new Date(fields.endDate as string) : null;

  // Format date range
  let dateString = "";
  let timeString = "";

  if (startDate) {
    if (endDate && startDate.toDateString() !== endDate.toDateString()) {
      // Multi-day event
      dateString = `${formatDate(fields.startDate as string)} - ${formatDate(
        fields.endDate as string
      )}`;
      timeString = "Multi-day event";
    } else {
      // Single day event
      dateString = formatDate(fields.startDate as string);
      timeString = startDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      if (endDate) {
        timeString += ` - ${endDate.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })}`;
      }
    }
  } else {
    dateString = "Date TBD";
    timeString = "Time TBD";
  }

  return {
    id: sys.id,
    title: (fields.title as string) || "",
    description: (fields.shortDescription as string) || "",
    date: dateString,
    time: timeString,
    location: (fields.address as string) || "Location TBD",
    image: getAssetUrl(fields.thumbnail as Asset),
    badge: determineEventBadge(fields.startDate as string),
    type: determineEventType(fields.title as string),
    capacity: "Registration Required",
    href: `/media/events/${sys.id}`,
    registrationOpen: isRegistrationOpen(fields.startDate as string),
    content: fields.content || null,
    entryFee: (fields.entryFee as string) || "Free",
  };
}

// Helper function to determine event badge based on date
function determineEventBadge(startDateString: string | undefined): string {
  if (!startDateString) return "TBD";

  const eventDate = new Date(startDateString);
  const now = new Date();
  const daysDiff = Math.floor(
    (eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysDiff < 0) return "Completed";
  if (daysDiff <= 7) return "Upcoming";
  if (daysDiff <= 30) return "This Month";
  return "Future";
}

// Helper function to determine event type from title
function determineEventType(title: string): string {
  const titleLower = title.toLowerCase();

  if (titleLower.includes("conference")) return "Conference";
  if (titleLower.includes("workshop")) return "Workshop";
  if (titleLower.includes("training")) return "Training";
  if (titleLower.includes("seminar")) return "Seminar";
  if (titleLower.includes("launch")) return "Launch Event";
  if (titleLower.includes("dialogue")) return "Policy Dialogue";
  if (titleLower.includes("community")) return "Community Event";

  return "Event";
}

// Helper function to check if registration is open
function isRegistrationOpen(startDateString: string | undefined): boolean {
  if (!startDateString) return false;

  const eventDate = new Date(startDateString);
  const now = new Date();

  // Registration closes 1 day before event or if event has passed
  const daysDiff = Math.floor(
    (eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );

  return daysDiff > 1;
}

// Newsletter-specific functions
export async function getAllNewsletters(
  preview = false
): Promise<Entry<NewsletterSkeleton>[]> {
  return getEntries<NewsletterSkeleton>(
    "newsletter",
    { order: ["-fields.date"] },
    preview
  );
}

export async function getNewslettersByCategory(
  category: string,
  preview = false
): Promise<Entry<NewsletterSkeleton>[]> {
  try {
    const client = getClient(preview);
    const query: any = {
      content_type: "newsletter",
      order: ["-fields.date"],
    };
    query["fields.category"] = category;

    const response = await client.getEntries<NewsletterSkeleton>(query);
    return response.items;
  } catch (error) {
    console.error(`Error fetching newsletters by category ${category}:`, error);
    return [];
  }
}

export async function getLatestNewsletters(
  limit = 5,
  preview = false
): Promise<Entry<NewsletterSkeleton>[]> {
  return getEntries<NewsletterSkeleton>(
    "newsletter",
    {
      order: ["-fields.date"],
      limit,
    },
    preview
  );
}

export async function getNewsletterById(
  entryId: string,
  preview = false
): Promise<Entry<NewsletterSkeleton> | null> {
  return getEntry<NewsletterSkeleton>(entryId, preview);
}

// Transform Contentful newsletter entry to processed format
export function transformNewsletter(
  entry: Entry<NewsletterSkeleton>
): ProcessedNewsletter {
  const { fields, sys } = entry;

  // Get file URL if available, otherwise use the href for viewing
  const fileUrl = fields.file ? getAssetUrl(fields.file as Asset) : undefined;

  return {
    id: sys.id,
    title: (fields.title as string) || "",
    description: (fields.description as string) || "",
    date: formatNewsletterDate(fields.date as string),
    image: getAssetUrl(fields.thumbnail as Asset),
    badge: determineNewsletterBadge(fields.date as string),
    href:
      fileUrl && fileUrl !== "/placeholder.svg"
        ? fileUrl
        : `/resources/newsletter/${sys.id}`,
    type: "newsletter" as const,
    category: (fields.category as string) || "Newsletter",
    file: fileUrl,
  };
}

// Helper function to format newsletter date
function formatNewsletterDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
}

// Helper function to determine newsletter badge based on date
function determineNewsletterBadge(dateString: string): string {
  const newsletterDate = new Date(dateString);
  const now = new Date();
  const monthsDiff =
    (now.getFullYear() - newsletterDate.getFullYear()) * 12 +
    (now.getMonth() - newsletterDate.getMonth());

  if (monthsDiff === 0) return "Latest";
  if (monthsDiff <= 3) return "Recent";
  return "";
}

// Research & Report-specific functions
export async function getAllResearch(
  preview = false
): Promise<Entry<ResearchSkeleton>[]> {
  return getEntries<ResearchSkeleton>(
    "research",
    { order: ["-fields.date"] },
    preview
  );
}

export async function getResearchByCategory(
  category: string,
  preview = false
): Promise<Entry<ResearchSkeleton>[]> {
  try {
    const client = getClient(preview);
    const query: any = {
      content_type: "research",
      order: ["-fields.date"],
    };
    query["fields.category"] = category;

    const response = await client.getEntries<ResearchSkeleton>(query);
    return response.items;
  } catch (error) {
    console.error(`Error fetching research by category ${category}:`, error);
    return [];
  }
}

export async function getLatestResearch(
  limit = 5,
  preview = false
): Promise<Entry<ResearchSkeleton>[]> {
  return getEntries<ResearchSkeleton>(
    "research",
    {
      order: ["-fields.date"],
      limit,
    },
    preview
  );
}

export async function getResearchById(
  entryId: string,
  preview = false
): Promise<Entry<ResearchSkeleton> | null> {
  return getEntry<ResearchSkeleton>(entryId, preview);
}

// Transform Contentful research entry to processed format
export function transformResearch(
  entry: Entry<ResearchSkeleton>
): ProcessedResearch {
  const { fields, sys } = entry;

  // Get file URL for download
  const fileUrl = getAssetUrl(fields.file as Asset);

  return {
    id: sys.id,
    title: (fields.title as string) || "",
    description: generateResearchDescription(
      fields.title as string,
      fields.category as string
    ),
    date: formatResearchDate(fields.date as string),
    image: getAssetUrl(fields.thumbnail as Asset),
    badge: determineResearchBadge(
      fields.date as string,
      fields.category as string
    ),
    downloadUrl: fileUrl,
    type: "research" as const,
    category: (fields.category as string) || "Research Report",
    author: (fields.authorName as string) || "Bangladesh ECD Network",
  };
}

// Helper function to format research date
function formatResearchDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
}

// Helper function to determine research badge based on date and category
function determineResearchBadge(dateString: string, category?: string): string {
  const researchDate = new Date(dateString);
  const now = new Date();
  const monthsDiff =
    (now.getFullYear() - researchDate.getFullYear()) * 12 +
    (now.getMonth() - researchDate.getMonth());

  // Check category-based badges first
  if (category && category.toLowerCase().includes("policy")) return "Policy";
  if (category && category.toLowerCase().includes("special")) return "Special";

  // Date-based badges
  if (monthsDiff === 0) return "New";
  if (monthsDiff <= 2) return "Recent";
  return "";
}

// Helper function to generate description when not provided
function generateResearchDescription(title: string, category?: string): string {
  const categoryText = category ? ` in the ${category.toLowerCase()}` : "";
  return `Research publication${categoryText} focusing on early childhood development in Bangladesh.`;
}

// Voice-specific functions
export async function getAllVoices(
  preview = false
): Promise<Entry<VoiceSkeleton>[]> {
  return getEntries<VoiceSkeleton>(
    "voice",
    { order: ["-fields.date"] },
    preview
  );
}

export async function getFeaturedVoices(
  preview = false
): Promise<Entry<VoiceSkeleton>[]> {
  try {
    const client = getClient(preview);
    const query: any = {
      content_type: "voice",
      order: ["-fields.date"],
    };
    query["fields.featured"] = true;

    const response = await client.getEntries<VoiceSkeleton>(query);
    return response.items;
  } catch (error) {
    console.error("Error fetching featured voices:", error);
    return [];
  }
}

export async function getLatestVoices(
  limit = 5,
  preview = false
): Promise<Entry<VoiceSkeleton>[]> {
  return getEntries<VoiceSkeleton>(
    "voice",
    {
      order: ["-fields.date"],
      limit,
    },
    preview
  );
}

export async function getVoiceById(
  entryId: string,
  preview = false
): Promise<Entry<VoiceSkeleton> | null> {
  return getEntry<VoiceSkeleton>(entryId, preview);
}

// Transform Contentful voice entry to processed format
export function transformVoice(entry: Entry<VoiceSkeleton>): ProcessedVoice {
  const { fields, sys } = entry;

  return {
    id: sys.id,
    title: (fields.title as string) || "",
    description:
      (fields.shortDescription as string) ||
      generateVoiceDescription(fields.title as string),
    date: formatVoiceDate(fields.date as string),
    image: getAssetUrl(fields.thumbnail as Asset),
    badge: determineVoiceBadge(
      fields.date as string,
      fields.featured as boolean
    ),
    href: fields.videoLinkYoutube
      ? (fields.videoLinkYoutube as string)
      : `/resources/voices/${sys.id}`,
    type: "video" as const,
    category: determineVoiceCategory(fields.title as string),
    videoUrl: fields.videoLinkYoutube as string,
    featured: fields.featured as boolean,
  };
}

// Helper function to format voice date
function formatVoiceDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
}

// Helper function to determine voice badge
function determineVoiceBadge(dateString: string, featured: boolean): string {
  if (featured) return "Featured";

  const voiceDate = new Date(dateString);
  const now = new Date();
  const monthsDiff =
    (now.getFullYear() - voiceDate.getFullYear()) * 12 +
    (now.getMonth() - voiceDate.getMonth());

  if (monthsDiff === 0) return "New";
  if (monthsDiff <= 2) return "Recent";
  return "";
}

// Helper function to determine voice category from title
function determineVoiceCategory(title: string): string {
  const titleLower = title.toLowerCase();

  if (titleLower.includes("mother") || titleLower.includes("parent"))
    return "Community Stories";
  if (titleLower.includes("teacher") || titleLower.includes("training"))
    return "Professional Development";
  if (titleLower.includes("children") || titleLower.includes("child"))
    return "Children's Perspectives";
  if (titleLower.includes("practice") || titleLower.includes("best"))
    return "Best Practices";
  if (titleLower.includes("policy") || titleLower.includes("advocacy"))
    return "Policy & Advocacy";
  if (titleLower.includes("research") || titleLower.includes("study"))
    return "Research Insights";

  return "Community Voices";
}

// Helper function to generate description when not provided
function generateVoiceDescription(title: string): string {
  return `Video content sharing perspectives and experiences from the Bangladesh ECD community.`;
}
