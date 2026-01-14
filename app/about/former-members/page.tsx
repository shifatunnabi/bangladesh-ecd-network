import { Card, CardContent } from "@/components/ui/card";
import { getAbout } from "@/lib/contentful";

export default async function FormerMembersPage() {
  // Fetch about content from Contentful
  const aboutContent = await getAbout();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#2563eb]">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Former Members
            </h1>
            <p className="text-lg md:text-xl text-blue-100">
              Honoring those who have shaped our journey
            </p>
          </div>
        </div>
      </section>

      {/* Former Members Section */}
      {aboutContent?.formerMembers && aboutContent.formerMembers.length > 0 ? (
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* All Members Displayed */}
            <Card className="max-w-3xl mx-auto">
              <CardContent className="p-0">
                {aboutContent.formerMembers.map((member, index) => (
                  <div key={index}>
                    <div className="p-6 hover:bg-muted/50 transition-colors">
                      <h3 className="font-semibold text-lg text-primary mb-1">
                        {member.name}
                      </h3>
                      <p className="text-muted-foreground">
                        {member.designation}
                      </p>
                    </div>
                    {index < aboutContent.formerMembers.length - 1 && (
                      <div className="border-b border-border mx-6" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>
      ) : (
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <p className="text-muted-foreground text-lg">
              No former members to display at this time.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
