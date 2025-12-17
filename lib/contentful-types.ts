import type { EntryFieldTypes, EntrySkeletonType, Asset } from 'contentful'

// Base interface for all Contentful entries
export interface ContentfulEntry extends EntrySkeletonType {
  fields: {
    title: EntryFieldTypes.Text
    slug: EntryFieldTypes.Text
    createdAt?: EntryFieldTypes.Date
    updatedAt?: EntryFieldTypes.Date
  }
}

// News Content Type (matches Contentful structure)
export interface NewsSkeleton extends EntrySkeletonType {
  contentTypeId: 'news'
  fields: {
    title: EntryFieldTypes.Text
    date: EntryFieldTypes.Text
    newsLink: EntryFieldTypes.Text
  }
}

// Event Content Type (matches Contentful structure)
export interface EventSkeleton extends EntrySkeletonType {
  contentTypeId: 'event'
  fields: {
    title: EntryFieldTypes.Symbol
    date?: EntryFieldTypes.Symbol
    time?: EntryFieldTypes.Symbol
    location?: EntryFieldTypes.Symbol
    organizer?: EntryFieldTypes.Text
    description?: EntryFieldTypes.Text
    thumbnail?: EntryFieldTypes.AssetLink
    photos?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>
  }
}

// Gallery Event Content Type
export interface GalleryEventSkeleton extends EntrySkeletonType {
  contentTypeId: 'galleryEvent'
  fields: {
    title: EntryFieldTypes.Text
    slug: EntryFieldTypes.Text
    description: EntryFieldTypes.Text
    date: EntryFieldTypes.Date
    category: EntryFieldTypes.Text
    images: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>
  }
}

// Resource Content Type
export interface ResourceSkeleton extends EntrySkeletonType {
  contentTypeId: 'resource'
  fields: {
    title: EntryFieldTypes.Text
    slug: EntryFieldTypes.Text
    description: EntryFieldTypes.Text
    content?: EntryFieldTypes.RichText
    type: EntryFieldTypes.Text // 'research-report', 'newsletter', 'policy', 'voice'
    category: EntryFieldTypes.Text
    featuredImage?: EntryFieldTypes.AssetLink
    file?: EntryFieldTypes.AssetLink
    publishDate: EntryFieldTypes.Date
    author?: EntryFieldTypes.Text
    featured?: EntryFieldTypes.Boolean
  }
}

// Hero Slide Content Type
export interface HeroSlideSkeleton extends EntrySkeletonType {
  contentTypeId: 'heroSlide'
  fields: {
    title: EntryFieldTypes.Text
    subtitle?: EntryFieldTypes.Text
    description?: EntryFieldTypes.Text
    image: EntryFieldTypes.AssetLink
    ctaText?: EntryFieldTypes.Text
    ctaLink?: EntryFieldTypes.Text
    order: EntryFieldTypes.Integer
  }
}

// Partner Content Type
export interface PartnerSkeleton extends EntrySkeletonType {
  contentTypeId: 'partner'
  fields: {
    name: EntryFieldTypes.Text
    logo: EntryFieldTypes.AssetLink
    website?: EntryFieldTypes.Text
    description?: EntryFieldTypes.Text
    category: EntryFieldTypes.Text
    featured?: EntryFieldTypes.Boolean
    order?: EntryFieldTypes.Integer
  }
}

// Testimonial Content Type
export interface TestimonialSkeleton extends EntrySkeletonType {
  contentTypeId: 'testimonial'
  fields: {
    name: EntryFieldTypes.Text
    position: EntryFieldTypes.Text
    organization?: EntryFieldTypes.Text
    content: EntryFieldTypes.Text
    avatar?: EntryFieldTypes.AssetLink
    featured?: EntryFieldTypes.Boolean
  }
}

// Page Content Type (for static pages)
export interface PageSkeleton extends EntrySkeletonType {
  contentTypeId: 'page'
  fields: {
    title: EntryFieldTypes.Text
    slug: EntryFieldTypes.Text
    content: EntryFieldTypes.RichText
    featuredImage?: EntryFieldTypes.AssetLink
    seoTitle?: EntryFieldTypes.Text
    seoDescription?: EntryFieldTypes.Text
  }
}

// Team Member Content Type
export interface TeamMemberSkeleton extends EntrySkeletonType {
  contentTypeId: 'teamMember'
  fields: {
    name: EntryFieldTypes.Text
    position: EntryFieldTypes.Text
    bio?: EntryFieldTypes.Text
    photo?: EntryFieldTypes.AssetLink
    email?: EntryFieldTypes.Text
    linkedin?: EntryFieldTypes.Text
    department: EntryFieldTypes.Text // 'committee', 'secretariat', etc.
    order?: EntryFieldTypes.Integer
  }
}

// Site Settings Content Type (for global settings)
export interface SiteSettingsSkeleton extends EntrySkeletonType {
  contentTypeId: 'siteSettings'
  fields: {
    siteName: EntryFieldTypes.Text
    siteDescription: EntryFieldTypes.Text
    logo: EntryFieldTypes.AssetLink
    contactEmail: EntryFieldTypes.Text
    contactPhone?: EntryFieldTypes.Text
    address?: EntryFieldTypes.Text
    socialMediaLinks?: EntryFieldTypes.Object
    footerText?: EntryFieldTypes.Text
  }
}

// Newsletter Content Type (matches Contentful structure)
export interface NewsletterSkeleton extends EntrySkeletonType {
  contentTypeId: 'newsletter'
  fields: {
    title: EntryFieldTypes.Text
    description?: EntryFieldTypes.Text
    date: EntryFieldTypes.Date
    category?: EntryFieldTypes.Text
    thumbnail?: EntryFieldTypes.AssetLink
    file?: EntryFieldTypes.AssetLink
  }
}

// Research & Report Content Type (matches Contentful structure)
export interface ResearchSkeleton extends EntrySkeletonType {
  contentTypeId: 'research'
  fields: {
    title: EntryFieldTypes.Text
    category?: EntryFieldTypes.Text
    authorName?: EntryFieldTypes.Text
    date: EntryFieldTypes.Date
    thumbnail: EntryFieldTypes.AssetLink
    file: EntryFieldTypes.AssetLink
  }
}

// Voice Content Type (matches Contentful structure)
export interface VoiceSkeleton extends EntrySkeletonType {
  contentTypeId: 'voice'
  fields: {
    title: EntryFieldTypes.Text
    shortDescription?: EntryFieldTypes.Text
    videoLinkYoutube?: EntryFieldTypes.Text
    thumbnail: EntryFieldTypes.AssetLink
    date: EntryFieldTypes.Date
    featured: EntryFieldTypes.Boolean
  }
}

// About Page Content Type (matches Contentful structure)
export interface AboutPageSkeleton extends EntrySkeletonType {
  contentTypeId: 'aboutPage'
  fields: {
    title: EntryFieldTypes.Text
    subtitle?: EntryFieldTypes.Text
    mission?: EntryFieldTypes.Text
    vision?: EntryFieldTypes.Text
    textSection?: EntryFieldTypes.RichText
    photoBesideText?: EntryFieldTypes.AssetLink
  }
}

// About Page Core Values Content Type (matches Contentful structure)
export interface AboutPageCoreValuesSkeleton extends EntrySkeletonType {
  contentTypeId: 'aboutPageCoreValues'
  fields: {
    title?: EntryFieldTypes.Text
    subtitle?: EntryFieldTypes.Text
    icon?: EntryFieldTypes.AssetLink
  }
}

// Homepage Carousel Content Type (matches Contentful structure)
export interface CarouselSkeleton extends EntrySkeletonType {
  contentTypeId: 'carousel'
  fields: {
    title?: EntryFieldTypes.Text
    subtitle?: EntryFieldTypes.Text
    ctaText?: EntryFieldTypes.Text
    ctaLink?: EntryFieldTypes.Text
    photo?: EntryFieldTypes.AssetLink
  }
}

// Homepage Core Values Content Type (matches Contentful structure)
export interface HomepageCoreValuesSkeleton extends EntrySkeletonType {
  contentTypeId: 'coreValues'
  fields: {
    title?: EntryFieldTypes.Text
    subtitle?: EntryFieldTypes.Text
    stat1Title?: EntryFieldTypes.Text
    stat1Subtitle?: EntryFieldTypes.Text
    stat1Icon?: EntryFieldTypes.AssetLink
    stat2Title?: EntryFieldTypes.Text
    stat2Subtitle?: EntryFieldTypes.Text
    stat2Icon?: EntryFieldTypes.AssetLink
    stat3Title?: EntryFieldTypes.Text
    stat3Subtitle?: EntryFieldTypes.Text
    stat3Icon?: EntryFieldTypes.AssetLink
    stat4Title?: EntryFieldTypes.Text
    stat4Subtitle?: EntryFieldTypes.Text
    stat4Icon?: EntryFieldTypes.AssetLink
  }
}

// Homepage Our Impact Content Type (matches Contentful structure)
export interface HomepageOurImpactSkeleton extends EntrySkeletonType {
  contentTypeId: 'ourImpact'
  fields: {
    title?: EntryFieldTypes.Text
    subtitle?: EntryFieldTypes.Text
    stat1Number?: EntryFieldTypes.Text
    stat1Title?: EntryFieldTypes.Text
    stat1Subtitle?: EntryFieldTypes.Text
    stat1Icon?: EntryFieldTypes.AssetLink
    stat2Number?: EntryFieldTypes.Text
    stat2Title?: EntryFieldTypes.Text
    stat2Subtitle?: EntryFieldTypes.Text
    stat2Icon?: EntryFieldTypes.AssetLink
    stat3Number?: EntryFieldTypes.Text
    stat3Title?: EntryFieldTypes.Text
    stat3Subtitle?: EntryFieldTypes.Text
    stat3Icon?: EntryFieldTypes.AssetLink
    stat4Number?: EntryFieldTypes.Text
    stat4Title?: EntryFieldTypes.Text
    stat4Subtitle?: EntryFieldTypes.Text
    stat4Icon?: EntryFieldTypes.AssetLink
  }
}

// Homepage Quote Content Type (matches Contentful structure)
export interface HomepageQuoteSkeleton extends EntrySkeletonType {
  contentTypeId: 'homepageQuote'
  fields: {
    author?: EntryFieldTypes.Text
    authorDesignation?: EntryFieldTypes.Text
    authorPhoto?: EntryFieldTypes.AssetLink
    quote?: EntryFieldTypes.RichText
  }
}

// Homepage Partners Content Type (matches Contentful structure)
export interface HomepagePartnerSkeleton extends EntrySkeletonType {
  contentTypeId: 'partners'
  fields: {
    title?: EntryFieldTypes.Text
    logo?: EntryFieldTypes.AssetLink
  }
}

// Gallery Content Type (matches Contentful structure)
export interface GallerySkeleton extends EntrySkeletonType {
  contentTypeId: 'gallery'
  fields: {
    title: EntryFieldTypes.Text
    typeOfContent: EntryFieldTypes.Boolean
    order?: EntryFieldTypes.Integer
    photos?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>
    youtubeLinkOnlyForVideos?: EntryFieldTypes.Symbol
  }
}

// Conference Content Type (matches Contentful structure)
export interface ConferenceSkeleton extends EntrySkeletonType {
  contentTypeId: 'conference'
  fields: {
    title: EntryFieldTypes.Text
    subtitle?: EntryFieldTypes.Text
    date?: EntryFieldTypes.Date
    venue?: EntryFieldTypes.Text
    description?: EntryFieldTypes.Text
    material?: EntryFieldTypes.AssetLink
    thumbnail?: EntryFieldTypes.AssetLink
    registrationLink?: EntryFieldTypes.Text
  }
}

// Homepage Final Section Content Type (matches Contentful structure)
export interface HomepageFinalSectionSkeleton extends EntrySkeletonType {
  contentTypeId: 'homepageFinalSection'
  fields: {
    title?: EntryFieldTypes.Text
    thumbnail?: EntryFieldTypes.AssetLink
    content?: EntryFieldTypes.RichText
    cta1Text?: EntryFieldTypes.Text
    cta1Link?: EntryFieldTypes.Text
    cta2Text?: EntryFieldTypes.Text
    cta2Link?: EntryFieldTypes.Text
  }
}

// Who We Are Content Type (matches Contentful structure)
export interface WhoWeAreSkeleton extends EntrySkeletonType {
  contentTypeId: 'whoWeAre'
  fields: {
    description: EntryFieldTypes.RichText
    photo: EntryFieldTypes.AssetLink
    vision?: EntryFieldTypes.RichText
  }
}
// Policies & Links Content Type (matches Contentful structure)
export interface PoliciesLinksSkeleton extends EntrySkeletonType {
  contentTypeId: 'policiesLinks'
  fields: {
    title: EntryFieldTypes.Text
    file: EntryFieldTypes.AssetLink
    type: EntryFieldTypes.Text
    image?: EntryFieldTypes.AssetLink
    year?: EntryFieldTypes.Text
  }
}
// Committee Content Type
export interface CommitteeSkeleton extends EntrySkeletonType {
  contentTypeId: 'committee'
  fields: {
    name: EntryFieldTypes.Text
    committeeType: EntryFieldTypes.Boolean // true = executive, false = steering
    deisgnation?: EntryFieldTypes.Text
    professionalDetails?: EntryFieldTypes.Text
    photo?: EntryFieldTypes.AssetLink
    biography?: EntryFieldTypes.RichText
    order?: EntryFieldTypes.Integer
  }
}

// Secretariat Content Type
export interface SecretariatSkeleton extends EntrySkeletonType {
  contentTypeId: 'secretariat'
  fields: {
    name: EntryFieldTypes.Text
    deisgnation?: EntryFieldTypes.Text
    biography?: EntryFieldTypes.RichText
    photo?: EntryFieldTypes.AssetLink
  }
}

// Union type for all content types
export interface HomepageFinalSectionSkeleton extends EntrySkeletonType {
  contentTypeId: 'homepageFinalSection'
  fields: {
    title?: EntryFieldTypes.Text
    thumbnail?: EntryFieldTypes.AssetLink
    content?: EntryFieldTypes.RichText
    cta1Text?: EntryFieldTypes.Text
    cta1Link?: EntryFieldTypes.Text
    cta2Text?: EntryFieldTypes.Text
    cta2Link?: EntryFieldTypes.Text
  }
}

// Union type for all content types
export type ContentfulSkeleton = 
  | NewsSkeleton
  | EventSkeleton
  | NewsletterSkeleton
  | ResearchSkeleton
  | VoiceSkeleton
  | AboutPageSkeleton
  | AboutPageCoreValuesSkeleton
  | CarouselSkeleton
  | HomepageCoreValuesSkeleton
  | HomepageOurImpactSkeleton
  | HomepageQuoteSkeleton
  | HomepagePartnerSkeleton
  | GallerySkeleton
  | ConferenceSkeleton
  | HomepageFinalSectionSkeleton
  | WhoWeAreSkeleton
  | PoliciesLinksSkeleton
  | GalleryEventSkeleton
  | ResourceSkeleton
  | HeroSlideSkeleton
  | PartnerSkeleton
  | TestimonialSkeleton
  | PageSkeleton
  | TeamMemberSkeleton
  | SiteSettingsSkeleton
  | CommitteeSkeleton
  | SecretariatSkeleton

// Helper type to extract fields from skeleton
export type ContentfulFields<T extends EntrySkeletonType> = T['fields']

// Processed/transformed types (what your components will use)
export interface ProcessedNews {
  id: string
  title: string
  date: string
  author: string
  newsLink: string
}

export interface ProcessedEvent {
  id: string
  title: string
  date: string
  time: string
  location: string
  organizer: string
  description: string
  thumbnail: string
  photos: string[]
  href: string
}
export interface ConferenceSkeleton extends EntrySkeletonType {
  contentTypeId: 'conference';
  fields: {
    title: EntryFieldTypes.Symbol;
    theme: EntryFieldTypes.Text;
    date: EntryFieldTypes.Text;
    venue: EntryFieldTypes.Symbol;
    organizer: EntryFieldTypes.Text;
    description: EntryFieldTypes.Text;
    thumbnail: EntryFieldTypes.AssetLink;
    conferencePhotos: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
  };
}

export interface ProcessedConference {
  id: string;
  title: string;
  theme: string;
  date: string;
  venue: string;
  organizer: string;
  description: string;
  thumbnail: string;
  photos: string[];
  href: string;
}
export interface ProcessedResource {
  id: string
  title: string
  slug: string
  description: string
  content?: any
  type: string
  category: string
  featuredImage?: string
  file?: string
  publishDate: string
  author?: string
  featured?: boolean
  href: string
}

export interface ProcessedNewsletter {
  id: string
  title: string
  description: string
  date: string
  image: string
  badge?: string
  href: string
  type: "newsletter"
  category: string
  file?: string
}

export interface ProcessedResearch {
  id: string
  title: string
  description: string
  date: string
  image: string
  badge?: string
  downloadUrl: string
  type: "research"
  category: string
  author: string
}

export interface ProcessedVoice {
  id: string
  title: string
  description: string
  date: string
  image: string
  badge?: string
  href: string
  type: "video"
  category: string
  videoUrl?: string
  featured?: boolean
}

export interface ProcessedAboutPage {
  id: string
  title: string
  subtitle?: string
  mission?: string
  vision?: string
  textSection?: any // Rich text content
  photo?: string
}

export interface ProcessedCoreValue {
  id: string
  title: string
  description: string
  iconUrl?: string
}

export interface ProcessedCarousel {
  id: string
  title: string
  subtitle: string
  ctaText?: string
  ctaLink?: string
  photo: string
}

export interface ProcessedHomepageCoreValues {
  id: string
  title: string
  subtitle: string
  stats: Array<{
    title: string
    subtitle: string
    iconUrl?: string
  }>
}

export interface ProcessedHomepageOurImpact {
  id: string
  sectionId?: string
  title: string
  subtitle: string
  stats: Array<{
    number: string
    title: string
    subtitle: string
    iconUrl?: string
  }>
}

export interface ProcessedHomepageQuote {
  id: string
  author: string
  authorDesignation: string
  authorPhoto: string
  quote: string // Extracted plain text from rich text
  quoteRichText?: any // Original rich text if needed
}

export interface ProcessedHomepagePartner {
  id: string
  title: string
  logoUrl: string
}

export interface ProcessedGallery {
  id: string
  title: string
  typeOfContent: boolean // true = photo, false = video
  order: number
  photos: string[]
  coverImage: string
  youtubeLink?: string
}

export interface ProcessedConference {
  id: string
  title: string
  subtitle?: string
  date: string
  venue?: string
  description?: string
  materialUrl?: string
  thumbnailUrl: string
  registrationLink?: string
  status: "upcoming" | "completed"
  badge?: string
}

export interface ProcessedHomepageFinalSection {
  id: string
  title: string
  thumbnailUrl: string
  content: string // Extracted plain text from rich text
  contentRichText?: any // Original rich text if needed
  cta1Text?: string
  cta1Link?: string
  cta2Text?: string
  cta2Link?: string
}

export interface ProcessedWhoWeAre {
  id: string
  description: string // Extracted plain text from rich text
  descriptionRichText: any // Original rich text
  photoUrl: string
  vision?: string // Extracted plain text from rich text
  visionRichText?: any // Original rich text if needed
}

export interface ProcessedPolicyLink {
  id: string
  title: string
  fileUrl: string
  type: string
  imageUrl?: string
  year?: string
}

export interface ProcessedCommittee {
  id: string
  name: string
  committeeType: boolean // true = executive, false = steering
  designation: string
  professionalDetails: string
  photoUrl: string
  biography: string // Extracted plain text from rich text
  biographyRichText?: any // Original rich text if needed
  order: number
}

export interface ProcessedSecretariat {
  id: string
  name: string
  designation: string
  photoUrl: string
  biography: string // Extracted plain text from rich text
  biographyRichText?: any // Original rich text if needed
}

export interface AboutSkeleton {
  contentTypeId: "about";
  fields: {
    name: EntryFieldTypes.Symbol;
    historyPara1: EntryFieldTypes.Text;
    historyPara2: EntryFieldTypes.Text;
    photo: EntryFieldTypes.AssetLink;
    formerMembers: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
  };
}

export interface ProcessedAbout {
  id: string;
  name: string;
  historyPara1: string;
  historyPara2: string;
  photo: string;
  formerMembers: Array<{
    name: string;
    designation: string;
  }>;
}