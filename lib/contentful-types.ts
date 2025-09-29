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
    excerpt?: EntryFieldTypes.Text
    category?: EntryFieldTypes.Text
    author?: EntryFieldTypes.Text
    content?: EntryFieldTypes.RichText
    thumbnail?: EntryFieldTypes.AssetLink
    date: EntryFieldTypes.Date
  }
}

// Event Content Type (matches Contentful structure)
export interface EventSkeleton extends EntrySkeletonType {
  contentTypeId: 'event'
  fields: {
    title: EntryFieldTypes.Text
    shortDescription?: EntryFieldTypes.Text
    startDate?: EntryFieldTypes.Date
    endDate?: EntryFieldTypes.Date
    address?: EntryFieldTypes.Text
    locationPin?: EntryFieldTypes.Location
    entryFee?: EntryFieldTypes.Text
    thumbnail?: EntryFieldTypes.AssetLink
    content?: EntryFieldTypes.RichText
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

// Union type for all content types
export type ContentfulSkeleton = 
  | NewsSkeleton
  | EventSkeleton
  | NewsletterSkeleton
  | ResearchSkeleton
  | VoiceSkeleton
  | GalleryEventSkeleton
  | ResourceSkeleton
  | HeroSlideSkeleton
  | PartnerSkeleton
  | TestimonialSkeleton
  | PageSkeleton
  | TeamMemberSkeleton
  | SiteSettingsSkeleton

// Helper type to extract fields from skeleton
export type ContentfulFields<T extends EntrySkeletonType> = T['fields']

// Processed/transformed types (what your components will use)
export interface ProcessedNews {
  id: string
  title: string
  excerpt: string
  category: string
  author: string
  content: any // Rich text content
  image: string
  date: string
  badge?: string
  href: string
}

export interface ProcessedEvent {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  image: string
  badge: string
  type: string
  capacity: string
  href: string
  registrationOpen: boolean
  content?: any
  entryFee?: string
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