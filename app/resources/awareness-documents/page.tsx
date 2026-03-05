import { getAllAwarenessDocuments, transformAwarenessDocument } from "@/lib/contentful"
import { AwarenessDocumentsClient } from "./awareness-documents-client"

// Enable ISR - Revalidate every 60 seconds
export const revalidate = 60;

async function getAwarenessDocuments() {
  try {
    const entries = await getAllAwarenessDocuments()
    return entries.map(transformAwarenessDocument)
  } catch (error) {
    console.error('Error fetching awareness documents:', error)
    return []
  }
}

export default async function AwarenessDocumentsPage() {
  const documents = await getAwarenessDocuments()

  return (
    <div className="flex flex-col">
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Awareness Documents</h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Explore our collection of awareness materials and publications designed to promote
              early childhood development knowledge across Bangladesh.
            </p>
          </div>
        </div>
      </section>

      <AwarenessDocumentsClient documents={documents} />
    </div>
  )
}
