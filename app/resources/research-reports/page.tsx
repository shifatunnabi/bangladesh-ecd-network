import { getAllResearch, transformResearch } from "@/lib/contentful"
import { ResearchReportsClient } from "./research-reports-client"

// Enable ISR - Revalidate every 60 seconds
export const revalidate = 60;

async function getResearchReports() {
  try {
    const researchEntries = await getAllResearch()
    return researchEntries.map(transformResearch)
  } catch (error) {
    console.error('Error fetching research reports:', error)
    return []
  }
}

export default async function ResearchReportsPage() {
  const researchReports = await getResearchReports()

  return (
    <div className="flex flex-col">
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Research & Reports</h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Access our comprehensive collection of research findings, policy briefs, and analytical reports on early
              childhood development in Bangladesh.
            </p>
          </div>
        </div>
      </section>

      <ResearchReportsClient researchReports={researchReports} />
    </div>
  )
}
