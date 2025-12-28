import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { ProcessedWhoWeAre } from "@/lib/contentful-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"

interface WhoWeAreSectionProps {
  whoWeAreData?: ProcessedWhoWeAre
}

export function WhoWeAreSection({ whoWeAreData }: WhoWeAreSectionProps) {
  return (
    <section className="bg-[#0055a3]">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Who We Are</h2>
            
            {whoWeAreData?.descriptionRichText ? (
              <div className="rich-text-content">
                {documentToReactComponents(whoWeAreData.descriptionRichText, {
                  renderMark: {
                    [MARKS.BOLD]: (text) => <strong className="text-white">{text}</strong>,
                    [MARKS.ITALIC]: (text) => <em className="text-blue-100">{text}</em>,
                  },
                  renderNode: {
                    [BLOCKS.PARAGRAPH]: (node, children) => (
                      <p className="text-lg text-blue-100 leading-relaxed mb-4">{children}</p>
                    ),
                    [BLOCKS.HEADING_1]: (node, children) => (
                      <h1 className="text-3xl font-bold text-white mb-4">{children}</h1>
                    ),
                    [BLOCKS.HEADING_2]: (node, children) => (
                      <h2 className="text-2xl font-bold text-white mb-3">{children}</h2>
                    ),
                    [BLOCKS.HEADING_3]: (node, children) => (
                      <h3 className="text-xl font-semibold text-white mb-3">{children}</h3>
                    ),
                    [BLOCKS.UL_LIST]: (node, children) => (
                      <ul className="space-y-4 mb-6">{children}</ul>
                    ),
                    [BLOCKS.OL_LIST]: (node, children) => (
                      <ol className="space-y-4 mb-6 list-decimal list-inside">{children}</ol>
                    ),
                    [BLOCKS.LIST_ITEM]: (node, children) => (
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-200 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-blue-100 flex-1">{children}</span>
                      </li>
                    ),
                  },
                })}
              </div>
            ) : (
              <>
                <p className="text-lg text-blue-100 leading-relaxed">
                  The Bangladesh ECD Network is a collaborative platform that brings together policymakers, researchers,
                  practitioners, and organizations committed to advancing early childhood development across Bangladesh.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-200 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-blue-100">
                      <strong className="text-white">Research & Evidence:</strong> We generate and disseminate cutting-edge
                      research to inform policy and practice.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-200 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-blue-100">
                      <strong className="text-white">Capacity Building:</strong> We provide training and resources to
                      strengthen ECD systems nationwide.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-200 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-blue-100">
                      <strong className="text-white">Policy Advocacy:</strong> We work with government and stakeholders to
                      develop effective ECD policies.
                    </p>
                  </div>
                </div>
              </>
            )}

            <Button size="lg" variant="secondary" asChild>
              <Link href="/about">Learn More About Our Work</Link>
            </Button>
          </div>

          {/* Image Card */}
          <Card className="overflow-hidden border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-0">
              <div className="relative w-full aspect-[3/2]">
                <Image
                  src={whoWeAreData?.photoUrl || "/images/ecd-team-meeting.jpg"}
                  alt="ECD Network team meeting"
                  fill
                  className="object-cover"
                  loading="lazy"
                  quality={70}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {/* <div className="p-6 bg-white">
                <h3 className="text-xl font-semibold mb-2 text-blue-900">Our Vision</h3>
                {whoWeAreData?.visionRichText ? (
                  <div className="text-blue-700">
                    {documentToReactComponents(whoWeAreData.visionRichText, {
                      renderMark: {
                        [MARKS.BOLD]: (text) => <strong className="font-semibold">{text}</strong>,
                      },
                      renderNode: {
                        [BLOCKS.PARAGRAPH]: (node, children) => (
                          <p className="text-blue-700">{children}</p>
                        ),
                      },
                    })}
                  </div>
                ) : (
                  <p className="text-blue-700">
                    {whoWeAreData?.vision || "A Bangladesh where every young child is well-nourished, healthy, happy, learning, and safe."}
                  </p>
                )}
              </div> */}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
