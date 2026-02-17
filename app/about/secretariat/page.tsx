import { MemberCardGrid } from "@/components/member-card-grid"
import { getSecretariatMembers } from "@/lib/contentful"

// Enable ISR - Revalidate every 60 seconds
export const revalidate = 60;

export default async function SecretariatPage() {
  // Fetch secretariat members from Contentful
  const secretariatMembers = await getSecretariatMembers()

  return (
    <div className="flex flex-col">
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Secretariat Team</h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Our dedicated secretariat team ensures the smooth operation of the Bangladesh ECD Network (BEN). They coordinate
              activities, manage programs, and provide essential support to our members and partners.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {secretariatMembers.length > 0 ? (
          <MemberCardGrid members={secretariatMembers} />
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No secretariat members found.</p>
          </div>
        )}
      </div>
    </div>
  )
}
