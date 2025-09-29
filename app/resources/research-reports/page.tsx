import { ResourceCard } from "@/components/resource-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter } from "lucide-react"
import { getAllResearch, transformResearch } from "@/lib/contentful"

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

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search reports by title, author, or topic..." className="pl-10" />
          </div>
          <Button variant="outline" className="sm:w-auto bg-transparent">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            All Reports
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            Research Report
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            Policy Brief
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            Impact Study
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            Health Research
          </Badge>
        </div>

        {/* Results Count */}
        <div className="text-sm text-muted-foreground mb-6">Showing {researchReports.length} reports</div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {researchReports.length > 0 ? (
            researchReports.map((report, index) => (
              <ResourceCard key={report.id || index} {...report} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground text-lg">No research reports found.</p>
              <p className="text-sm text-muted-foreground mt-2">Please check back later for new publications.</p>
            </div>
          )}
        </div>

        {/* Load More */}
        {researchReports.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Reports
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
