import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Quote } from "lucide-react"

export function TestimonialSection() {
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
                      src="/placeholder.svg?height=96&width=96"
                      alt="Dr. Rashida Ahmed"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <Quote className="w-8 h-8 text-blue-600 mb-4 mx-auto md:mx-0" />
                  <blockquote className="text-lg md:text-xl text-blue-900 leading-relaxed mb-4">
                    "The Bangladesh ECD Network has been instrumental in bringing together diverse stakeholders to
                    create meaningful change for children and families across our country. Their evidence-based approach
                    and collaborative spirit make them an invaluable partner."
                  </blockquote>
                  <div>
                    <cite className="text-blue-700 font-semibold">Dr. Rashida Ahmed</cite>
                    <p className="text-blue-600">Director, Child Development Institute</p>
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
