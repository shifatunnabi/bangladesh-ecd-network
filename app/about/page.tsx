import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"
import { getAboutPage, transformAboutPage, extractParagraphs, getCoreValues, transformCoreValue } from "@/lib/contentful"
import { ProcessedAboutPage, ProcessedCoreValue } from "@/lib/contentful-types"

export default async function AboutPage() {
  // Fetch about page data from Contentful
  const aboutPageEntry = await getAboutPage();
  const aboutPageData: ProcessedAboutPage | null = aboutPageEntry 
    ? transformAboutPage(aboutPageEntry) 
    : null;

  // Fetch core values data from Contentful
  const coreValuesEntries = await getCoreValues();
  const coreValuesData: ProcessedCoreValue[] = coreValuesEntries.map(transformCoreValue);

  // Fallback data if Contentful is not configured or entry not found
  const fallbackData = {
    title: "About Bangladesh ECD Network",
    subtitle: "We are a collaborative platform dedicated to advancing early childhood development across Bangladesh through research, advocacy, and capacity building.",
    mission: "To strengthen early childhood development systems in Bangladesh by fostering collaboration among stakeholders, generating evidence-based knowledge, and advocating for policies that ensure every child has the opportunity to thrive and reach their full potential.",
    vision: "A Bangladesh where every young child is well-nourished, healthy, happy, learning, and safe, with access to quality early childhood development services that lay the foundation for lifelong success and wellbeing.",
    textSection: null,
    photo: "/placeholder.svg?height=400&width=600"
  };

  // Fallback core values data
  const fallbackValues = [
    {
      id: "1",
      title: "Child-Centered",
      description: "Every decision we make prioritizes the wellbeing and development of children.",
      iconUrl: null
    },
    {
      id: "2", 
      title: "Collaborative",
      description: "We believe in the power of partnerships and collective action.",
      iconUrl: null
    },
    {
      id: "3",
      title: "Evidence-Based", 
      description: "Our work is grounded in research and proven best practices.",
      iconUrl: null
    },
    {
      id: "4",
      title: "Results-Oriented",
      description: "We focus on measurable outcomes and sustainable impact.",
      iconUrl: null
    },
    {
      id: "5",
      title: "Inclusive",
      description: "We ensure all children, regardless of background, have equal opportunities.", 
      iconUrl: null
    },
    {
      id: "6",
      title: "Innovative",
      description: "We embrace new ideas and approaches to solve complex challenges.",
      iconUrl: null
    },
  ];

  const data = aboutPageData || fallbackData;
  const coreValues = coreValuesData.length > 0 ? coreValuesData : fallbackValues;
  
  const purposeParagraphs = data.textSection 
    ? extractParagraphs(data.textSection)
    : [
        "The Bangladesh ECD Network was established to address the critical need for coordinated action in early childhood development across the country. We recognize that the first years of a child's life are crucial for their cognitive, social, and emotional development.",
        "Through our network, we bring together diverse stakeholders including government agencies, non-governmental organizations, academic institutions, development partners, and community-based organizations to work collectively towards improving ECD outcomes.",
        "Our work spans research and evidence generation, capacity building, policy advocacy, and knowledge sharing to create a comprehensive ecosystem that supports children and their families."
      ];
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{data.title}</h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              {data.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="h-full">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-primary mb-4">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {data.mission}
                </p>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-primary mb-4">Our Vision</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {data.vision}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Core Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These values guide our work and shape our approach to early childhood development in Bangladesh.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((value, index) => (
              <Card key={value.id} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    {value.iconUrl && value.iconUrl !== "/placeholder.svg" ? (
                      <Image
                        src={value.iconUrl}
                        alt={value.title}
                        width={32}
                        height={32}
                        className="w-8 h-8 brightness-0 invert"
                      />
                    ) : (
                      <Star className="w-8 h-8 text-white" />
                    )}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Purpose */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">Our Purpose</h2>
              <div className="space-y-4">
                {purposeParagraphs.map((paragraph, index) => (
                  <p key={index} className="text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-[400px]">
                  <Image
                    src={data.photo || "/placeholder.svg?height=400&width=600"}
                    alt="Children in early childhood development program"
                    fill
                    className="object-cover"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Partners</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We work with leading organizations across Bangladesh and internationally to strengthen early childhood
              development systems.
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
      </section>

      {/* Donate CTA */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-foreground mb-4">Support Our Mission</h2>
            <p className="text-lg text-secondary-foreground/80 max-w-2xl mx-auto mb-8">
              Your support helps us expand our reach and create lasting impact for children across Bangladesh.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="outline" className="bg-white text-secondary hover:bg-white/90" asChild>
                <Link href="/donate">Donate Now</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 bg-transparent"
                asChild
              >
                <Link href="/members/join">Join Our Network</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
