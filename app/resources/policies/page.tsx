import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { ExternalLink, FileText } from "lucide-react"
import { getPoliciesLinks } from "@/lib/contentful"

// Enable ISR - Revalidate every 60 seconds
export const revalidate = 60;

export default async function PoliciesPage() {
  // Fetch policies from Contentful
  const policiesData = await getPoliciesLinks();

  // Group policies by type while preserving order
  const typeOrder: string[] = [];
  const groupedPolicies = policiesData.reduce((acc, policy) => {
    const type = policy.type;
    if (!acc[type]) {
      acc[type] = [];
      typeOrder.push(type); // Track the order types appear
    }
    acc[type].push(policy);
    return acc;
  }, {} as Record<string, typeof policiesData>);
  return (
    <div className="flex flex-col">
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Policies & Important Links</h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Access important policy documents, guidelines, and external resources that inform and support early
              childhood development work in Bangladesh and globally.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {Object.keys(groupedPolicies).length > 0 ? (
          <div className="space-y-12">
            {typeOrder.map((type) => {
              const policies = groupedPolicies[type];
              return (
              <div key={type}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-primary">{type}</h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {policies.map((policy) => (
                    <Card key={policy.id} className="hover:shadow-lg transition-shadow group flex flex-col">
                      {policy.imageUrl && (
                        <CardHeader className="p-0">
                          <div className="relative h-48 overflow-hidden rounded-t-lg">
                            <Image
                              src={policy.imageUrl}
                              alt={policy.title}
                              width={400}
                              height={192}
                              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        </CardHeader>
                      )}
                      <CardContent className={`${policy.imageUrl ? 'p-4' : 'p-6'} flex-1 flex flex-col`}>
                        <div className="flex-1 space-y-3">
                          <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                            {policy.title}
                          </CardTitle>
                          {policy.year && (
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{policy.year}</Badge>
                            </div>
                          )}
                        </div>
                        <Button variant="outline" size="sm" className="w-full bg-transparent mt-4" asChild>
                          <a href={policy.fileUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Access Resource
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No policies available at the moment.</p>
          </div>
        )}

        {/* Additional Resources */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto bg-muted/30">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-primary mb-4">Need More Resources?</h3>
              <p className="text-muted-foreground mb-6">
                Can't find what you're looking for? Contact our team for assistance in locating specific policy
                documents or resources.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/resources">Browse All Resources</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
