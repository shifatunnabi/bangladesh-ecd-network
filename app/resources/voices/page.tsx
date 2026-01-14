import { getAllVoices, transformVoice } from "@/lib/contentful"
import { VoicesClient } from "./voices-client"

async function getVoices() {
  try {
    const voiceEntries = await getAllVoices()
    return voiceEntries.map(transformVoice)
  } catch (error) {
    console.error('Error fetching voices:', error)
    return []
  }
}

export default async function VoicesPage() {
  const voices = await getVoices()

  return (
    <div className="flex flex-col">
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Voices & Stories</h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Listen to the voices of children, families, practitioners, and communities as they share their experiences
              and insights about early childhood development in Bangladesh.
            </p>
          </div>
        </div>
      </section>

      <VoicesClient voices={voices} />
    </div>
  )
}
