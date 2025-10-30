import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Quote } from "lucide-react"
import { ProcessedHomepageQuote } from "@/lib/contentful-types"

interface TestimonialSectionProps {
  quoteData?: ProcessedHomepageQuote
}

export function TestimonialSection({ quoteData }: TestimonialSectionProps) {
  // Use Contentful data if available, otherwise use default content
  const author = quoteData?.author || "Dr. Rashida Ahmed"
  const authorDesignation = quoteData?.authorDesignation || "Director, Child Development Institute"
  const authorPhoto = quoteData?.authorPhoto || "/placeholder.svg?height=96&width=96"
  const quote = quoteData?.quote || "The Bangladesh ECD Network has been instrumental in bringing together diverse stakeholders to create meaningful change for children and families across our country. Their evidence-based approach and collaborative spirit make them an invaluable partner."

  return (
    <section className="py-16 bg-gradient-to-br from-blue-100 to-blue-200">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-blue-300 shadow-xl bg-white/95 backdrop-blur-sm">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-blue-200">
                    <Image
                      src={authorPhoto}
                      alt={author}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <Quote className="w-8 h-8 text-blue-600 mb-4 mx-auto md:mx-0" />
                  <blockquote className="text-lg md:text-xl text-blue-900 leading-relaxed mb-4">
                    "{quote}"
                  </blockquote>
                  <div>
                    <cite className="text-blue-700 font-semibold">{author}</cite>
                    <p className="text-blue-600">{authorDesignation}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
