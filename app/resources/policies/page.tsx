import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ExternalLink, FileText, Globe, BookOpen } from "lucide-react"

const policyCategories = [
  {
    title: "National ECD Policies",
    description: "Key policy documents and frameworks governing early childhood development in Bangladesh",
    icon: FileText,
    links: [
      {
        title: "National Children Policy 2011",
        description: "Comprehensive policy framework for children's rights and development",
        url: "#",
        type: "Government Policy",
        date: "2011",
      },
      {
        title: "Early Childhood Care and Development Policy",
        description: "Specific policy guidelines for early childhood care and development programs",
        url: "#",
        type: "Government Policy",
        date: "2013",
      },
      {
        title: "National Education Policy 2010",
        description: "Education policy with provisions for early childhood education",
        url: "#",
        type: "Government Policy",
        date: "2010",
      },
    ],
  },
  {
    title: "International Guidelines",
    description: "Global frameworks and guidelines relevant to early childhood development",
    icon: Globe,
    links: [
      {
        title: "UN Convention on the Rights of the Child",
        description:
          "International treaty setting out civil, political, economic, social and cultural rights of children",
        url: "https://www.unicef.org/child-rights-convention",
        type: "International Treaty",
        date: "1989",
      },
      {
        title: "SDG 4: Quality Education",
        description: "Sustainable Development Goal focusing on inclusive and equitable quality education",
        url: "https://sdgs.un.org/goals/goal4",
        type: "UN Framework",
        date: "2015",
      },
      {
        title: "WHO Early Childhood Development Guidelines",
        description: "World Health Organization guidelines for nurturing care framework",
        url: "https://www.who.int/activities/improving-early-childhood-development",
        type: "WHO Guidelines",
        date: "2018",
      },
    ],
  },
  {
    title: "Research & Evidence",
    description: "Key research publications and evidence-based resources for policy development",
    icon: BookOpen,
    links: [
      {
        title: "Lancet Series on Early Childhood Development",
        description: "Comprehensive research series on early childhood development interventions",
        url: "https://www.thelancet.com/series/ECD2016",
        type: "Research Series",
        date: "2016",
      },
      {
        title: "ECD Action Network Resources",
        description: "Global resources and tools for early childhood development programming",
        url: "https://www.ecdan.org/resources",
        type: "Resource Hub",
        date: "Ongoing",
      },
      {
        title: "World Bank ECD Resources",
        description: "World Bank resources on early childhood development investments",
        url: "https://www.worldbank.org/en/topic/earlychildhooddevelopment",
        type: "Development Resources",
        date: "Ongoing",
      },
    ],
  },
]

export default function PoliciesPage() {
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
        <div className="space-y-12">
          {policyCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <category.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-primary">{category.title}</h2>
                  <p className="text-muted-foreground">{category.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.links.map((link, linkIndex) => (
                  <Card key={linkIndex} className="hover:shadow-lg transition-shadow group">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                          {link.title}
                        </CardTitle>
                        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 ml-2" />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">{link.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{link.type}</Badge>
                        <span className="text-xs text-muted-foreground">{link.date}</span>
                      </div>
                      <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Access Resource
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

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
