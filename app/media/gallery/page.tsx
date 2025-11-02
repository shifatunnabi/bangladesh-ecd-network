import { getGalleryItems, transformGallery } from "@/lib/contentful"
import { GalleryClient } from "./gallery-client"

export default async function GalleryPage() {
  // Fetch gallery items from Contentful
  const galleryEntries = await getGalleryItems();
  const galleryItems = galleryEntries.map(transformGallery);

  // Convert to the format expected by GalleryClient
  const galleryEvents = galleryItems.map(item => ({
    id: item.id,
    title: item.title,
    date: item.date,
    description: item.description || "",
    category: item.category,
    images: item.photos,
    coverImage: item.coverImage,
    badge: item.badge,
  }));

  return <GalleryClient initialGalleryEvents={galleryEvents} />
}
