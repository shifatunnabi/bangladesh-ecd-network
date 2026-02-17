import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { getAbout, getMissionVision } from "@/lib/contentful";
import { PartnersSection } from "@/components/partners-section";
import { CheckCircle2 } from "lucide-react";

// Enable ISR - Revalidate every 60 seconds
export const revalidate = 60;

export default async function AboutPage() {
  // Fetch about content from Contentful
  const aboutContent = await getAbout();
  const missionVision = await getMissionVision();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#2563eb]">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {aboutContent?.name || "About Bangladesh ECD Network (BEN)"}
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

      {/* Mission, Vision, Goals & Objectives Section */}
      {missionVision && (
        <section className="py-16 bg-[#0055a3]">
          <div className="container mx-auto px-4 max-w-6xl">
            {/* Title and Subtitle */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Who We Are</h2>
              <p className="text-lg text-blue-100 max-w-2xl mx-auto">
                Know about our mission, vision, goal and objectives that drive our commitment to early childhood development
              </p>
            </div>

            {/* Mission, Vision, Goal in 3 columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {/* Vision */}
              <Card className="bg-white hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl border-blue-200">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-primary mb-4">Vision</h3>
                  <p className="text-blue-900 leading-relaxed">
                    {missionVision.vision}
                  </p>
                </CardContent>
              </Card>

              {/* Mission */}
              <Card className="bg-white hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl border-blue-200">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-primary mb-4">Mission</h3>
                  <p className="text-blue-900 leading-relaxed">
                    {missionVision.mission}
                  </p>
                </CardContent>
              </Card>

              {/* Goal */}
              <Card className="bg-white hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl border-blue-200">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-primary mb-4">Goal</h3>
                  <p className="text-blue-900 leading-relaxed">
                    {missionVision.goal}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Objectives in 2 columns */}
            {missionVision.objectives && missionVision.objectives.length > 0 && (
              <div>
                <h3 className="text-3xl font-bold text-white mb-6 text-center">
                  Objectives
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {missionVision.objectives.map((objective, index) => (
                    <Card key={index} className="bg-white hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl border-blue-200">
                      <CardContent className="p-4 flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                        <p className="text-blue-900 leading-relaxed">
                          {objective}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
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
