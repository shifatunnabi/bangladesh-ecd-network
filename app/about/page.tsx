import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { getAbout } from "@/lib/contentful";
import { PartnersSection } from "@/components/partners-section";

export default async function AboutPage() {
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
              {aboutContent?.name || "About Bangladesh ECD Network"}
            </h1>
            <p className="text-lg md:text-xl text-blue-100">
              A collaborative organization dedicated to advancing early childhood
              development in Bangladesh 
            </p>
          </div>
        </div>
      </section>

      {/* Historical Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* First Text Block */}
          {aboutContent?.historyPara1 && (
            <div className="mb-8 space-y-4 text-muted-foreground leading-relaxed">
              <p className="whitespace-pre-line">{aboutContent.historyPara1}</p>
            </div>
          )}

          {/* Photo */}
          {aboutContent?.photo && (
            <div className="mb-8">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-[400px] w-full">
                    <Image
                      src={aboutContent.photo}
                      alt="Historical photo"
                      fill
                      className="object-contain bg-gray-50"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Second Text Block */}
          {aboutContent?.historyPara2 && (
            <div className="mb-8 space-y-4 text-muted-foreground leading-relaxed">
              <p className="whitespace-pre-line">{aboutContent.historyPara2}</p>
            </div>
          )}
        </div>
      </section>

      {/* Former Members Section */}
      {aboutContent?.formerMembers && aboutContent.formerMembers.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Headline and Subheader */}
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
                Our Legacy
              </h2>
              <p className="text-lg text-muted-foreground">
                Honoring the former members who have shaped our journey
              </p>
            </div>

            {/* Always Visible First Two Members */}
            <Card className="max-w-3xl mx-auto mb-4">
              <CardContent className="p-0">
                {aboutContent.formerMembers.slice(0, 2).map((member, index) => (
                  <div key={index}>
                    <div className="p-6 hover:bg-muted/50 transition-colors">
                      <h3 className="font-semibold text-lg text-primary mb-1">
                        {member.name}
                      </h3>
                      <p className="text-muted-foreground">
                        {member.designation}
                      </p>
                    </div>
                    {index < 1 && (
                      <div className="border-b border-border mx-6" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Collapsible for Remaining Members */}
            {aboutContent.formerMembers.length > 2 && (
              <Collapsible defaultOpen={false} className="w-full">
                <CollapsibleContent className="mb-4">
                  <Card className="max-w-3xl mx-auto">
                    <CardContent className="p-0">
                      {aboutContent.formerMembers.slice(2).map((member, index) => (
                        <div key={index}>
                          <div className="p-6 hover:bg-muted/50 transition-colors">
                            <h3 className="font-semibold text-lg text-primary mb-1">
                              {member.name}
                            </h3>
                            <p className="text-muted-foreground">
                              {member.designation}
                            </p>
                          </div>
                          {index < aboutContent.formerMembers.slice(2).length - 1 && (
                            <div className="border-b border-border mx-6" />
                          )}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </CollapsibleContent>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full max-w-3xl mx-auto flex items-center justify-center gap-2 text-lg font-semibold p-6 bg-white hover:bg-gray-50"
                  >
                    <span>View All Members</span>
                    <ChevronDown className="h-5 w-5 transition-transform duration-200" />
                  </Button>
                </CollapsibleTrigger>
              </Collapsible>
            )}
          </div>
        </section>
      )}

      {/* Partners Section */}
      {/* <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Our Partners
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We work with leading organizations across Bangladesh and
              internationally to strengthen early childhood development systems.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center mb-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300"
              >
                <Image
                  src={`/placeholder.svg?height=80&width=160`}
                  alt={`Partner ${i}`}
                  width={160}
                  height={80}
                  className="max-w-full h-auto object-contain"
                />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/about/partners">View All Partners</Link>
            </Button>
          </div>
        </div>
      </section> */}
      <PartnersSection />
    </div>
  );
}
