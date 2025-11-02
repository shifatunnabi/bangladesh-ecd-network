import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { ProcessedHomepageFinalSection } from "@/lib/contentful-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types"
import { ReactNode } from "react"

interface DonateSectionProps {
  finalSectionData?: ProcessedHomepageFinalSection
}

export function DonateSection({ finalSectionData }: DonateSectionProps) {
  // Rich text rendering options
  const richTextOptions = {
    renderMark: {
      [MARKS.BOLD]: (text: ReactNode) => <strong className="text-blue-900 font-semibold">{text}</strong>,
      [MARKS.ITALIC]: (text: ReactNode) => <em className="italic">{text}</em>,
      [MARKS.UNDERLINE]: (text: ReactNode) => <u className="underline">{text}</u>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: ReactNode) => (
        <p className="text-lg text-blue-700 leading-relaxed mb-4">{children}</p>
      ),
      [BLOCKS.UL_LIST]: (node: any, children: ReactNode) => (
        <ul className="space-y-3 mb-6">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (node: any, children: ReactNode) => (
        <ol className="space-y-3 mb-6 list-decimal list-inside">{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (node: any, children: ReactNode) => (
        <li className="flex items-start space-x-3">
          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
          <div className="text-blue-700">{children}</div>
        </li>
      ),
      [BLOCKS.HEADING_1]: (node: any, children: ReactNode) => (
        <h1 className="text-4xl font-bold text-primary mb-4">{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (node: any, children: ReactNode) => (
        <h2 className="text-3xl font-bold text-primary mb-4">{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (node: any, children: ReactNode) => (
        <h3 className="text-2xl font-bold text-blue-900 mb-3">{children}</h3>
      ),
      [BLOCKS.HEADING_4]: (node: any, children: ReactNode) => (
        <h4 className="text-xl font-bold text-blue-900 mb-3">{children}</h4>
      ),
      [BLOCKS.HEADING_5]: (node: any, children: ReactNode) => (
        <h5 className="text-lg font-bold text-blue-900 mb-2">{children}</h5>
      ),
      [BLOCKS.HEADING_6]: (node: any, children: ReactNode) => (
        <h6 className="text-base font-bold text-blue-900 mb-2">{children}</h6>
      ),
    },
  };

  // Use Contentful data if available, otherwise use fallback data
  const title = finalSectionData?.title || "Support Our Mission";
  const thumbnailUrl = finalSectionData?.thumbnailUrl || "/images/children-ecd-program.jpg";
  const cta1Text = finalSectionData?.cta1Text || "Donate Now";
  const cta1Link = finalSectionData?.cta1Link || "/donate";
  const cta2Text = finalSectionData?.cta2Text || "Learn More";
  const cta2Link = finalSectionData?.cta2Link || "/about";
  
  // Rich text content or fallback
  const hasRichContent = finalSectionData?.contentRichText;
  const fallbackContent = "Your support helps us expand our reach and impact, ensuring that more children across Bangladesh have access to quality early childhood development programs and resources.";

  return (
    <section className="py-16 bg-gradient-to-l from-blue-50 to-slate-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-blue-200">
              <Image
                src={thumbnailUrl}
                alt="Children benefiting from ECD programs"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">{title}</h2>
              
              {/* Rich text content from Contentful or fallback */}
              <div className="rich-text-content">
                {hasRichContent ? (
                  documentToReactComponents(finalSectionData.contentRichText, richTextOptions)
                ) : (
                  <div>
                    <p className="text-lg text-blue-700 leading-relaxed mb-4">
                      {fallbackContent}
                    </p>
                    
                    {/* Fallback bullet points */}
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <div className="text-blue-700">
                          <strong className="text-blue-900 font-semibold">Research Funding:</strong> Support evidence-based research that
                          informs policy and practice.
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <div className="text-blue-700">
                          <strong className="text-blue-900 font-semibold">Training Programs:</strong> Help us train more professionals in
                          effective ECD practices.
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <div className="text-blue-700">
                          <strong className="text-blue-900 font-semibold">Resource Development:</strong> Enable us to create and distribute
                          valuable resources to communities.
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href={cta1Link}>{cta1Text}</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href={cta2Link}>{cta2Text}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
