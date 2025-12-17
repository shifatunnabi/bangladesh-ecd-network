import { MemberCardGrid } from "@/components/member-card-grid"
import { getCommitteeMembers } from "@/lib/contentful"

export default async function CommitteePage() {
  // Fetch committee members from Contentful
  const committeeMembers = await getCommitteeMembers()
  
  // Separate executive and steering committee members and sort by order
  const executiveMembers = committeeMembers
    .filter(member => member.committeeType === true)
    .sort((a, b) => a.order - b.order)
  const steeringMembers = committeeMembers
    .filter(member => member.committeeType === false)
    .sort((a, b) => a.order - b.order)

  return (
    <div className="flex flex-col">
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Committee Members</h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Our committee is composed of distinguished professionals and experts who provide strategic guidance and
              leadership to the Bangladesh ECD Network. Each member brings unique expertise and experience to advance
              our mission.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Executive Committee */}
        {executiveMembers.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Executive Committee</h2>
            <MemberCardGrid members={executiveMembers} />
          </div>
        )}

        {/* Steering Committee */}
        {steeringMembers.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-8 text-center">Steering Committee</h2>
            <MemberCardGrid members={steeringMembers} />
          </div>
        )}

        {/* Empty state */}
        {committeeMembers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No committee members found.</p>
          </div>
        )}
      </div>
    </div>
  )
}
