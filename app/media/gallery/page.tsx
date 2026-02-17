import { getGalleryItems, transformGallery } from "@/lib/contentful"
import { GalleryClient } from "./gallery-client"

// Enable ISR - Revalidate every 60 seconds
export const revalidate = 60;

export default async function GalleryPage() {
  // Fetch gallery items from Contentful
  const galleryEntries = await getGalleryItems();
  const galleryItems = galleryEntries.map(transformGallery);

  return <GalleryClient initialGalleryEvents={galleryItems} />
}
