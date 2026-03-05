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
  AboutPageSkeleton,
  ProcessedAboutPage,
  AboutPageCoreValuesSkeleton,
  ProcessedCoreValue,
  CarouselSkeleton,
  ProcessedCarousel,
  HomepageCoreValuesSkeleton,
  ProcessedHomepageCoreValues,
  HomepageOurImpactSkeleton,
  ProcessedHomepageOurImpact,
  HomepageQuoteSkeleton,
  ProcessedHomepageQuote,
  HomepagePartnerSkeleton,
  ProcessedHomepagePartner,
  GallerySkeleton,
  ProcessedGallery,
  ConferenceSkeleton,
  ProcessedConference,
  HomepageFinalSectionSkeleton,
  ProcessedHomepageFinalSection,
  WhoWeAreSkeleton,
  ProcessedWhoWeAre,
  PoliciesLinksSkeleton,
  ProcessedPolicyLink,
  CommitteeSkeleton,
  ProcessedCommittee,
  SecretariatSkeleton,
  ProcessedSecretariat,
  AboutSkeleton,
  ProcessedAbout,
  AboutPageMissionVisionSkeleton,
  ProcessedMissionVision,
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
export function getAssetUrl(asset: any, width?: number, quality?: number): string {
  if (!asset) {
    return "/placeholder.svg";
  }

  // Handle both direct Asset objects and references
  const assetFields = asset.fields || asset;
  
  if (!assetFields?.file?.url) {
    return "/placeholder.svg";
  }

  let url = assetFields.file.url as string;
  
  // Ensure URL has protocol
  if (url.startsWith("//")) {
    url = `https:${url}`;
  } else if (!url.startsWith("http")) {
    url = `https:${url}`;
  }
  
  // Use Contentful's image optimization for images
  if (url.includes('images.ctfassets.net') && (width || quality)) {
    const params = new URLSearchParams();
    if (width) params.append('w', width.toString());
    if (quality) params.append('q', quality.toString());
    params.append('fm', 'webp'); // Use WebP format for better compression
    url += `?${params.toString()}`;
  }
  
  return url;
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

// Helper function to extract paragraphs from rich text content
export function extractParagraphs(richText: any): string[] {
  if (!richText || !richText.content) return [];

  const paragraphs: string[] = [];

  function extractTextFromParagraphs(content: any[]) {
    content.forEach((node) => {
      if (node.nodeType === "paragraph" && node.content) {
        let text = "";
        node.content.forEach((textNode: any) => {
          if (textNode.nodeType === "text") {
            text += textNode.value;
          }
        });
        if (text.trim()) {
          paragraphs.push(text.trim());
        }
      }
    });
  }

  extractTextFromParagraphs(richText.content);
  return paragraphs;
}

// News-specific functions
export async function getAllNews(
  preview = false
): Promise<Entry<NewsSkeleton>[]> {
  return getEntries<NewsSkeleton>("news", { order: ["-sys.createdAt"] }, preview);
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
    title: (fields.title as string) || "Untitled",
    date: (fields.date as string) || "",
    author: "Bangladesh ECD Network (BEN)",
    newsLink: (fields.newsLink as string) || "#",
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
    { order: ["sys.createdAt"] },
    preview
  );
}

export async function getUpcomingEvents(
  preview = false
): Promise<Entry<EventSkeleton>[]> {
  try {
    const client = getClient(preview);
    const query: any = {
      content_type: "event",
      order: ["sys.createdAt"],
    };

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
    const query: any = {
      content_type: "event",
      order: ["-sys.createdAt"],
    };

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

  // Extract photos URLs from the photos array
  const photos: string[] = [];
  if (fields.photos && Array.isArray(fields.photos)) {
    fields.photos.forEach((photo: any) => {
      if (photo) {
        const photoUrl = getAssetUrl(photo);
        if (photoUrl !== "/placeholder.svg") {
          photos.push(photoUrl);
        }
      }
    });
  }

  return {
    id: sys.id,
    title: (fields.title as string) || "",
    date: (fields.date as string) || "Date TBD",
    time: (fields.time as string) || "",
    location: (fields.location as string) || "Location TBD",
    organizer: (fields.organizer as string) || "",
    description: (fields.description as string) || "",
    thumbnail: getAssetUrl(fields.thumbnail as Asset),
    photos,
    href: `/media/events/${sys.id}`,
  };
}

// Helper function to determine event badge based on date
function determineEventBadge(startDateString: string | undefined): string {
  if (!startDateString) return "TBD";
  
  const startDate = new Date(startDateString);
  const now = new Date();
  const daysUntilEvent = Math.ceil((startDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysUntilEvent < 0) {
    return "Completed";
  } else if (daysUntilEvent === 0) {
    return "Today";
  } else if (daysUntilEvent <= 7) {
    return "This Week";
  } else if (daysUntilEvent <= 30) {
    return "This Month";
  } else {
    return "Upcoming";
  }
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
    author: (fields.authorName as string) || "Bangladesh ECD Network (BEN)",
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
    { order: ["sys.createdAt"] },
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
    videoUrl: (fields.videoLinkYoutube as string) || "",
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

// About Page-specific functions
export async function getAboutPage(
  preview = false
): Promise<Entry<AboutPageSkeleton> | null> {
  try {
    const client = getClient(preview);
    const response = await client.getEntries<AboutPageSkeleton>({
      content_type: "aboutPage",
      limit: 1,
    });
    return response.items[0] || null;
  } catch (error) {
    console.error("Error fetching about page:", error);
    return null;
  }
}

// Transform Contentful about page entry to processed format
export function transformAboutPage(
  entry: Entry<AboutPageSkeleton>
): ProcessedAboutPage {
  const { fields, sys } = entry;

  return {
    id: sys.id,
    title: (fields.title as string) || "About Bangladesh ECD Network (BEN)",
    subtitle: fields.subtitle as string | undefined,
    mission: fields.mission as string | undefined,
    vision: fields.vision as string | undefined,
    textSection: fields.textSection || null,
    photo: getAssetUrl(fields.photoBesideText as Asset),
  };
}

// Core Values-specific functions
export async function getCoreValues(
  preview = false
): Promise<Entry<AboutPageCoreValuesSkeleton>[]> {
  try {
    const client = getClient(preview);
    const response = await client.getEntries<AboutPageCoreValuesSkeleton>({
      content_type: "aboutPageCoreValues",
      order: ["sys.createdAt"],
    });
    return response.items;
  } catch (error) {
    console.error("Error fetching core values:", error);
    return [];
  }
}

// Transform Contentful core value entry to processed format
export function transformCoreValue(
  entry: Entry<AboutPageCoreValuesSkeleton>
): ProcessedCoreValue {
  const { fields, sys } = entry;

  return {
    id: sys.id,
    title: (fields.title as string) || "Core Value",
    description: (fields.subtitle as string) || "Description of our core value",
    iconUrl: getAssetUrl(fields.icon as Asset),
  };
}

// Carousel-specific functions
export async function getCarouselSlides(
  preview = false
): Promise<Entry<CarouselSkeleton>[]> {
  try {
    const client = getClient(preview);
    const response = await client.getEntries<CarouselSkeleton>({
      content_type: "carousel",
      order: ["sys.createdAt"],
    });
    return response.items;
  } catch (error) {
    console.error("Error fetching carousel slides:", error);
    return [];
  }
}

// Transform Contentful carousel entry to processed format
export function transformCarousel(
  entry: Entry<CarouselSkeleton>
): ProcessedCarousel {
  const { fields, sys } = entry;

  return {
    id: sys.id,
    title: (fields.title as string) || "Welcome to Bangladesh ECD Network (BEN)",
    subtitle: (fields.subtitle as string) || "Supporting early childhood development across Bangladesh",
    ctaText: fields.ctaText as string | undefined,
    ctaLink: fields.ctaLink as string | undefined,
    photo: getAssetUrl(fields.photo as Asset),
  };
}

// Homepage Core Values-specific functions
export async function getHomepageCoreValues(
  preview = false
): Promise<Entry<HomepageCoreValuesSkeleton> | null> {
  try {
    const client = getClient(preview);
    const response = await client.getEntries<HomepageCoreValuesSkeleton>({
      content_type: "coreValues",
      limit: 1,
    });
    return response.items[0] || null;
  } catch (error) {
    console.error("Error fetching homepage core values:", error);
    return null;
  }
}

// Transform Contentful homepage core values entry to processed format
export function transformHomepageCoreValues(
  entry: Entry<HomepageCoreValuesSkeleton>
): ProcessedHomepageCoreValues {
  const { fields, sys } = entry;

  const stats = [];
  
  // Collect all stats that have at least a title
  if (fields.stat1Title) {
    stats.push({
      title: fields.stat1Title as string,
      subtitle: (fields.stat1Subtitle as string) || "",
      iconUrl: getAssetUrl(fields.stat1Icon as Asset),
    });
  }
  
  if (fields.stat2Title) {
    stats.push({
      title: fields.stat2Title as string,
      subtitle: (fields.stat2Subtitle as string) || "",
      iconUrl: getAssetUrl(fields.stat2Icon as Asset),
    });
  }
  
  if (fields.stat3Title) {
    stats.push({
      title: fields.stat3Title as string,
      subtitle: (fields.stat3Subtitle as string) || "",
      iconUrl: getAssetUrl(fields.stat3Icon as Asset),
    });
  }
  
  if (fields.stat4Title) {
    stats.push({
      title: fields.stat4Title as string,
      subtitle: (fields.stat4Subtitle as string) || "",
      iconUrl: getAssetUrl(fields.stat4Icon as Asset),
    });
  }

  return {
    id: sys.id,
    title: (fields.title as string) || "Our Impact",
    subtitle: (fields.subtitle as string) || "Making a difference in early childhood development across Bangladesh",
    stats,
  };
}

// Homepage Our Impact-specific functions
export async function getHomepageOurImpact(
  preview = false
): Promise<ProcessedHomepageOurImpact> {
  try {
    const client = getClient(preview);
    const response = await client.getEntries<HomepageOurImpactSkeleton>({
      content_type: "ourImpact",
      limit: 1,
    });

    if (response.items.length === 0) {
      return {
        id: "fallback",
        sectionId: "fallback",
        title: "Our Impact",
        subtitle: "Making a Difference in Early Childhood Development",
        stats: [
          {
            number: "150+",
            title: "Network Members",
            subtitle: "Active professionals across Bangladesh",
            iconUrl: "",
          },
          {
            number: "25+",
            title: "Training Programs",
            subtitle: "Conducted nationwide",
            iconUrl: "",
          },
          
        ],
      };
    }

    return transformHomepageOurImpact(response.items[0]);
  } catch (error) {
    console.error("Error fetching homepage our impact:", error);
    return {
      id: "fallback",
      sectionId: "fallback",
      title: "Our Impact",
      subtitle: "Making a Difference in Early Childhood Development",
      stats: [
        {
          number: "150+",
          title: "Network Members",
          subtitle: "Active professionals across Bangladesh",
          iconUrl: "",
        },
        {
          number: "25+",
          title: "Training Programs",
          subtitle: "Conducted nationwide",
          iconUrl: "",
        },
        
      ],
    };
  }
}

function transformHomepageOurImpact(
  item: Entry<HomepageOurImpactSkeleton>
): ProcessedHomepageOurImpact {
  return {
    id: item.sys.id,
    sectionId: item.sys.id, // Use the entry ID as section ID
    title: (item.fields.title as string) || "Our Impact",
    subtitle: (item.fields.subtitle as string) || "Making a Difference in Early Childhood Development",
    stats: [
      {
        number: (item.fields.stat1Number as string) || "150+",
        title: (item.fields.stat1Title as string) || "Network Members",
        subtitle: (item.fields.stat1Subtitle as string) || "Active professionals across Bangladesh",
        iconUrl: item.fields.stat1Icon ? getAssetUrl(item.fields.stat1Icon as any) : "",
      },
      {
        number: (item.fields.stat2Number as string) || "25+",
        title: (item.fields.stat2Title as string) || "Training Programs",
        subtitle: (item.fields.stat2Subtitle as string) || "Conducted nationwide",
        iconUrl: item.fields.stat2Icon ? getAssetUrl(item.fields.stat2Icon as any) : "",
      },
      
    ],
  };
}

// Homepage Partners-specific functions
export async function getHomepagePartners(
  preview = false
): Promise<Entry<HomepagePartnerSkeleton>[]> {
  try {
    const client = getClient(preview);
    const response = await client.getEntries<HomepagePartnerSkeleton>({
      content_type: "partners",
      order: ["sys.createdAt"],
    });
    return response.items;
  } catch (error) {
    console.error("Error fetching homepage partners:", error);
    return [];
  }
}

// Transform Contentful partner entry to processed format
export function transformHomepagePartner(
  entry: Entry<HomepagePartnerSkeleton>
): ProcessedHomepagePartner {
  const { fields, sys } = entry;

  return {
    id: sys.id,
    title: (fields.title as string) || "Partner",
    logoUrl: fields.logo ? getAssetUrl(fields.logo as Asset) : "/placeholder.svg",
  };
}

// Homepage Quote-specific functions
export async function getHomepageQuote(
  preview = false
): Promise<ProcessedHomepageQuote[]> {
  try {
    const client = getClient(preview);
    const response = await client.getEntries<HomepageQuoteSkeleton>({
      content_type: "homepageQuote",
    });

    if (response.items.length === 0) {
      return [
        {
          id: "fallback",
          author: "Dr. Maria Rahman",
          authorDesignation: "Early Childhood Development Specialist",
          authorPhoto: "",
          quote: "The Bangladesh ECD Network (BEN) has been instrumental in bringing together professionals and creating meaningful change in early childhood development across the country.",
        },
      ];
    }

    return response.items.map(transformHomepageQuote);
  } catch (error) {
    console.error("Error fetching homepage quote:", error);
    return [
      {
        id: "fallback",
        author: "Dr. Maria Rahman",
        authorDesignation: "Early Childhood Development Specialist",
        authorPhoto: "",
        quote: "The Bangladesh ECD Network (BEN) has been instrumental in bringing together professionals and creating meaningful change in early childhood development across the country.",
      },
    ];
  }
}

function transformHomepageQuote(
  item: Entry<HomepageQuoteSkeleton>
): ProcessedHomepageQuote {
  return {
    id: item.sys.id,
    author: (item.fields.author as string) || "Dr. Maria Rahman",
    authorDesignation: (item.fields.authorDesignation as string) || "Early Childhood Development Specialist",
    authorPhoto: item.fields.authorPhoto ? getAssetUrl(item.fields.authorPhoto as any) : "",
    quote: item.fields.quote ? extractPlainText(item.fields.quote) : "The Bangladesh ECD Network (BEN) has been instrumental in bringing together professionals and creating meaningful change in early childhood development across the country.",
    quoteRichText: item.fields.quote || null,
  };
}

// Gallery-specific functions
export async function getGalleryItems(
  preview = false
): Promise<Entry<GallerySkeleton>[]> {
  try {
    const client = getClient(preview);
    const response = await client.getEntries<GallerySkeleton>({
      content_type: "gallery",
      order: ["fields.order"], // Sort by order field ascending
      include: 2, // Include linked assets (photos)
    });
    return response.items;
  } catch (error) {
    console.error("Error fetching gallery items:", error);
    return [];
  }
}

export function transformGallery(
  item: Entry<GallerySkeleton>
): ProcessedGallery {
  // Extract photos URLs from the photos array
  const photos: string[] = [];
  if (item.fields.photos && Array.isArray(item.fields.photos)) {
    item.fields.photos.forEach((photo: any) => {
      if (photo) {
        const photoUrl = getAssetUrl(photo, 800, 80);
        if (photoUrl && photoUrl !== "/placeholder.svg") {
          photos.push(photoUrl);
        }
      }
    });
  }
  
  // Use first photo as cover image, or fallback to placeholder
  const coverImage = photos.length > 0 ? photos[0] : "/placeholder.svg";

  return {
    id: item.sys.id,
    title: (item.fields.title as string) || "Gallery Event",
    typeOfContent: (item.fields.typeOfContent as boolean) ?? true, // Default to photo (true)
    order: (item.fields.order as number) || 999,
    photos,
    coverImage,
    youtubeLink: (item.fields.youtubeLinkOnlyForVideos as string) || undefined,
  };
}

// Conference-specific functions
export async function getConferences(
  preview = false
): Promise<Entry<ConferenceSkeleton>[]> {
  try {
    const client = getClient(preview);
    const response = await client.getEntries<ConferenceSkeleton>({
      content_type: "conference",
      order: ["-sys.createdAt"], // Sort by creation date descending (newest first)
      include: 2, // Include linked assets (photos)
    });
    return response.items;
  } catch (error) {
    console.error("Error fetching conferences:", error);
    return [];
  }
}

export function transformConference(
  item: Entry<ConferenceSkeleton>
): ProcessedConference {
  const thumbnailUrl = getAssetUrl(item.fields.thumbnail as any, 600, 80);
  const conferencePhotos = (item.fields.conferencePhotos || []) as any[];
  
  // Determine status based on date
  const conferenceDate = new Date(item.fields.date as string);
  const now = new Date();
  const status = conferenceDate > now ? "upcoming" : "completed";

  // Transform conference photos
  const photos: string[] = [];
  conferencePhotos.forEach((photo: any) => {
    if (photo) {
      const photoUrl = getAssetUrl(photo, 800, 80);
      if (photoUrl && photoUrl !== "/placeholder.svg") {
        photos.push(photoUrl);
      }
    }
  });

  return {
    id: item.sys.id,
    title: (item.fields.title as string) || '',
    subtitle: (item.fields.theme as string) || '',
    theme: (item.fields.theme as string) || '',
    date: (item.fields.date as string) || '',
    venue: (item.fields.venue as string) || '',
    organizer: (item.fields.organizer as string) || '',
    description: (item.fields.description as string) || '',
    thumbnail: thumbnailUrl,
    thumbnailUrl: thumbnailUrl,
    photos: photos,
    href: `/media/conference/${item.sys.id}`,
    status,
  };
}

export async function getConferenceById(id: string, preview = false): Promise<ProcessedConference | null> {
  try {
    const client = getClient(preview);
    const entry = await client.getEntry<ConferenceSkeleton>(id, {
      include: 2, // Include linked assets (photos)
    });
    if (!entry) return null;
    return transformConference(entry);
  } catch (error) {
    console.error('Error fetching conference:', error);
    return null;
  }
}

// Count helper functions for stats
export async function getMediaCounts(preview = false) {
  try {
    const [news, events, conferences, gallery] = await Promise.all([
      getAllNews(preview),
      getAllEvents(preview),
      getConferences(preview),
      getGalleryItems(preview),
    ]);

    const photoGalleries = gallery.filter(item => {
      const typeOfContent = item.fields.typeOfContent as boolean;
      return typeOfContent === true; // true = photo
    });

    const totalPhotos = photoGalleries.reduce((sum, item) => {
      const photos = item.fields.photos || [];
      const photosArray = Array.isArray(photos) ? photos : [];
      return sum + photosArray.length;
    }, 0);

    return {
      newsCount: news.length,
      eventsCount: events.length,
      conferencesCount: conferences.length,
      photosCount: totalPhotos,
    };
  } catch (error) {
    console.error('Error fetching media counts:', error);
    return {
      newsCount: 0,
      eventsCount: 0,
      conferencesCount: 0,
      photosCount: 0,
    };
  }
}

export async function getResourceCounts(preview = false) {
  try {
    const [research, voices, newsletters, policies] = await Promise.all([
      getAllResearch(preview),
      getAllVoices(preview),
      getAllNewsletters(preview),
      getPoliciesLinks(preview),
    ]);

    return {
      researchCount: research.length,
      voicesCount: voices.length,
      newslettersCount: newsletters.length,
      policiesCount: policies.length,
      totalResources: research.length + voices.length + newsletters.length,
    };
  } catch (error) {
    console.error('Error fetching resource counts:', error);
    return {
      researchCount: 0,
      voicesCount: 0,
      newslettersCount: 0,
      policiesCount: 0,
      totalResources: 0,
    };
  }
}

export async function getLatestResources(preview = false) {
  try {
    const client = getClient(preview);
    
    const [researchEntries, voiceEntries, newsletterEntries, policyEntries] = await Promise.all([
      client.getEntries<ResearchSkeleton>({
        content_type: 'research',
        order: ['-fields.date'],
        limit: 1,
      }),
      client.getEntries<VoiceSkeleton>({
        content_type: 'voice',
        order: ['-sys.createdAt'],
        limit: 1,
      }),
      client.getEntries<NewsletterSkeleton>({
        content_type: 'newsletter',
        order: ['-fields.date'],
        limit: 1,
      }),
      client.getEntries<PoliciesLinksSkeleton>({
        content_type: 'policiesLinks',
        order: ['-sys.createdAt'],
        limit: 1,
      }),
    ]);

    return {
      latestResearch: researchEntries.items.length > 0 ? transformResearch(researchEntries.items[0]) : null,
      latestVoice: voiceEntries.items.length > 0 ? transformVoice(voiceEntries.items[0]) : null,
      latestNewsletter: newsletterEntries.items.length > 0 ? transformNewsletter(newsletterEntries.items[0]) : null,
      latestPolicy: policyEntries.items.length > 0 ? transformPolicyLink(policyEntries.items[0]) : null,
    };
  } catch (error) {
    console.error('Error fetching latest resources:', error);
    return {
      latestResearch: null,
      latestVoice: null,
      latestNewsletter: null,
      latestPolicy: null,
    };
  }
}

// Homepage Final Section-specific functions
export async function getHomepageFinalSection(
  preview = false
): Promise<ProcessedHomepageFinalSection> {
  try {
    const client = getClient(preview);
    const response = await client.getEntries<HomepageFinalSectionSkeleton>({
      content_type: "homepageFinalSection",
      limit: 1,
    });

    if (response.items.length === 0) {
      return {
        id: "fallback",
        title: "Support Our Mission",
        thumbnailUrl: "/images/children-ecd-program.jpg",
        content: "Your support helps us expand our reach and impact, ensuring that more children across Bangladesh have access to quality early childhood development programs and resources.",
        cta1Text: "Donate Now",
        cta1Link: "/donate",
        cta2Text: "Learn More", 
        cta2Link: "/about",
      };
    }

    return transformHomepageFinalSection(response.items[0]);
  } catch (error) {
    console.error("Error fetching homepage final section:", error);
    return {
      id: "fallback",
      title: "Support Our Mission",
      thumbnailUrl: "/images/children-ecd-program.jpg",
      content: "Your support helps us expand our reach and impact, ensuring that more children across Bangladesh have access to quality early childhood development programs and resources.",
      cta1Text: "Donate Now",
      cta1Link: "/donate",
      cta2Text: "Learn More",
      cta2Link: "/about",
    };
  }
}

function transformHomepageFinalSection(
  item: Entry<HomepageFinalSectionSkeleton>
): ProcessedHomepageFinalSection {
  return {
    id: item.sys.id,
    title: (item.fields.title as string) || "Support Our Mission",
    thumbnailUrl: item.fields.thumbnail ? getAssetUrl(item.fields.thumbnail as any) : "/images/children-ecd-program.jpg",
    content: item.fields.content ? extractPlainText(item.fields.content) : "Your support helps us expand our reach and impact, ensuring that more children across Bangladesh have access to quality early childhood development programs and resources.",
    contentRichText: item.fields.content || null,
    cta1Text: (item.fields.cta1Text as string) || "Donate Now",
    cta1Link: (item.fields.cta1Link as string) || "/donate",
    cta2Text: (item.fields.cta2Text as string) || "Learn More",
    cta2Link: (item.fields.cta2Link as string) || "/about",
  };
}

// Who We Are-specific functions
export async function getWhoWeAre(
  preview = false
): Promise<ProcessedWhoWeAre> {
  try {
    const client = getClient(preview);
    const response = await client.getEntries<WhoWeAreSkeleton>({
      content_type: "whoWeAre",
      limit: 1,
    });

    if (response.items.length === 0) {
      return {
        id: "fallback",
        description: "The Bangladesh ECD Network (BEN) is a collaborative platform that brings together policymakers, researchers, practitioners, and organizations committed to advancing early childhood development across Bangladesh.",
        descriptionRichText: null,
        photoUrl: "/images/ecd-team-meeting.jpg",
        vision: "A Bangladesh where every young child is well-nourished, healthy, happy, learning, and safe.",
        visionRichText: null,
      };
    }

    return transformWhoWeAre(response.items[0]);
  } catch (error) {
    console.error("Error fetching who we are:", error);
    return {
      id: "fallback",
      description: "The Bangladesh ECD Network (BEN) is a collaborative platform that brings together policymakers, researchers, practitioners, and organizations committed to advancing early childhood development across Bangladesh.",
      descriptionRichText: null,
      photoUrl: "/images/ecd-team-meeting.jpg",
      vision: "A Bangladesh where every young child is well-nourished, healthy, happy, learning, and safe.",
      visionRichText: null,
    };
  }
}

function transformWhoWeAre(
  item: Entry<WhoWeAreSkeleton>
): ProcessedWhoWeAre {
  return {
    id: item.sys.id,
    description: item.fields.description ? extractPlainText(item.fields.description) : "The Bangladesh ECD Network (BEN) is a collaborative platform that brings together policymakers, researchers, practitioners, and organizations committed to advancing early childhood development across Bangladesh.",
    descriptionRichText: item.fields.description || null,
    photoUrl: item.fields.photo ? getAssetUrl(item.fields.photo as any) : "/images/ecd-team-meeting.jpg",
    vision: item.fields.vision ? extractPlainText(item.fields.vision) : "A Bangladesh where every young child is well-nourished, healthy, happy, learning, and safe.",
    visionRichText: item.fields.vision || null,
  };
}

// Policies & Links-specific functions
export async function getPoliciesLinks(
  preview = false
): Promise<ProcessedPolicyLink[]> {
  try {
    const client = getClient(preview);
    const response = await client.getEntries<PoliciesLinksSkeleton>({
      content_type: "policiesLinks",
    });

    if (response.items.length === 0) {
      return [];
    }

    const policies = response.items.map(transformPolicyLink);
    
    // Group policies by type and find minimum orderOfType for each type
    const typeOrderMap = new Map<string, number>();
    policies.forEach(policy => {
      const currentMin = typeOrderMap.get(policy.type) ?? 999;
      typeOrderMap.set(policy.type, Math.min(currentMin, policy.orderOfType));
    });
    
    // Sort by type order first, then by individual order within each type
    return policies.sort((a, b) => {
      const typeOrderA = typeOrderMap.get(a.type) ?? 999;
      const typeOrderB = typeOrderMap.get(b.type) ?? 999;
      
      if (typeOrderA !== typeOrderB) {
        return typeOrderA - typeOrderB; // Sort types by their minimum orderOfType
      }
      
      return a.order - b.order; // Within same type, sort by individual order
    });
  } catch (error) {
    console.error("Error fetching policies and links:", error);
    return [];
  }
}

function transformPolicyLink(
  item: Entry<PoliciesLinksSkeleton>
): ProcessedPolicyLink {
  return {
    id: item.sys.id,
    title: (item.fields.title as string) || "Untitled Policy",
    fileUrl: item.fields.file ? getAssetUrl(item.fields.file as any) : "#",
    type: (item.fields.type as string) || "General",
    order: (item.fields.order as number) || 999,
    orderOfType: (item.fields.orderOfType as number) || 999,
    imageUrl: item.fields.image ? getAssetUrl(item.fields.image as any) : undefined,
    year: (item.fields.year as string) || undefined,
  };
}

// Committee-specific functions
export async function getCommitteeMembers(
  preview = false
): Promise<ProcessedCommittee[]> {
  try {
    const client = getClient(preview);
    const response = await client.getEntries<CommitteeSkeleton>({
      content_type: "committee",
    });

    if (response.items.length === 0) {
      return [];
    }

    return response.items.map(transformCommittee);
  } catch (error) {
    console.error("Error fetching committee members:", error);
    return [];
  }
}

function transformCommittee(
  item: Entry<CommitteeSkeleton>
): ProcessedCommittee {
  return {
    id: item.sys.id,
    name: (item.fields.name as string) || "",
    committeeType: (item.fields.committeeType as boolean) || false,
    designation: (item.fields.deisgnation as string) || "",
    professionalDetails: (item.fields.professionalDetails as string) || "",
    photoUrl: item.fields.photo ? getAssetUrl(item.fields.photo as any) : "/placeholder.svg",
    biography: item.fields.biography ? extractPlainText(item.fields.biography) : "",
    biographyRichText: item.fields.biography || null,
    order: (item.fields.order as number) || 999,
  };
}

// Secretariat-specific functions
export async function getSecretariatMembers(
  preview = false
): Promise<ProcessedSecretariat[]> {
  try {
    const client = getClient(preview);
    const response = await client.getEntries<SecretariatSkeleton>({
      content_type: "secretariat",
    });

    if (response.items.length === 0) {
      return [];
    }

    return response.items.map(transformSecretariat);
  } catch (error) {
    console.error("Error fetching secretariat members:", error);
    return [];
  }
}

function transformSecretariat(
  item: Entry<SecretariatSkeleton>
): ProcessedSecretariat {
  return {
    id: item.sys.id,
    name: (item.fields.name as string) || "",
    designation: (item.fields.deisgnation as string) || "",
    photoUrl: item.fields.photo ? getAssetUrl(item.fields.photo as any) : "/placeholder.svg",
    biography: item.fields.biography ? extractPlainText(item.fields.biography) : "",
    biographyRichText: item.fields.biography || null,
  };
}

// About page-specific functions
function transformAbout(entry: Entry<AboutSkeleton>): ProcessedAbout {
  const photo = entry.fields.photo as Asset | undefined;
  const photoUrl = photo?.fields?.file?.url
    ? `https:${photo.fields.file.url}`
    : "/placeholder.svg";

  // Parse former members from "name, designation" format
  const formerMembersRaw = entry.fields.formerMembers as string[] | undefined;
  const formerMembers = (formerMembersRaw || []).map((member: string) => {
    const parts = member.split(",");
    const name = parts[0]?.trim() || "";
    const designation = parts[1]?.trim() || "";
    return {
      name,
      designation,
    };
  });

  return {
    id: entry.sys.id,
    name: (entry.fields.name as string) || "",
    historyPara1: (entry.fields.historyPara1 as string) || "",
    historyPara2: (entry.fields.historyPara2 as string) || "",
    photo: photoUrl,
    formerMembers,
  };
}

export async function getAbout(preview = false): Promise<ProcessedAbout | null> {
  try {
    const client = getClient(preview);
    const response = await client.getEntries<AboutSkeleton>({
      content_type: "about",
      limit: 1,
    });

    if (response.items.length === 0) {
      return null;
    }

    return transformAbout(response.items[0]);
  } catch (error) {
    console.error("Error fetching about data:", error);
    return null;
  }
}

// Transform Mission Vision entry
function transformMissionVision(entry: Entry<AboutPageMissionVisionSkeleton>): ProcessedMissionVision {
  return {
    id: entry.sys.id,
    mission: (entry.fields.mission as string) || "",
    vision: (entry.fields.vision as string) || "",
    goal: (entry.fields.goal as string) || "",
    objectives: (entry.fields.objectives as string[]) || [],
  };
}

// Fetch Mission Vision data
export async function getMissionVision(preview = false): Promise<ProcessedMissionVision | null> {
  try {
    const client = getClient(preview);
    const response = await client.getEntries<AboutPageMissionVisionSkeleton>({
      content_type: "aboutPageMissionVision",
      limit: 1,
    });

    if (response.items.length === 0) {
      return null;
    }

    return transformMissionVision(response.items[0]);
  } catch (error) {
    console.error("Error fetching mission vision data:", error);
    return null;
  }
}

// Awareness Document-specific functions
export async function getAllAwarenessDocuments(
  preview = false
): Promise<Entry<AwarenessDocumentSkeleton>[]> {
  return getEntries<AwarenessDocumentSkeleton>(
    "awarenessDocument",
    { order: ["-fields.date"] },
    preview
  );
}

// Transform Contentful awareness document entry to processed format
export function transformAwarenessDocument(
  entry: Entry<AwarenessDocumentSkeleton>
): ProcessedAwarenessDocument {
  const { fields, sys } = entry;

  const date = fields.date as string;
  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      })
    : "";

  return {
    id: sys.id,
    title: (fields.name as string) || "",
    date: formattedDate,
    image: getAssetUrl(fields.thumbnailImage as Asset),
    author: (fields.author as string) || "Bangladesh ECD Network",
    downloadUrl: getAssetUrl(fields.pdf as Asset),
    type: "awareness" as const,
  };
}
