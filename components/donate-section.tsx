import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

export function DonateSection() {
  return (
    <section className="py-16 bg-gradient-to-l from-blue-50 to-slate-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <Card className="overflow-hidden border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="relative h-[400px]">
                  <Image
                    src="/images/children-ecd-program.jpg"
                    alt="Children benefiting from ECD programs"
                    fill
                    className="object-cover"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Support Our Mission</h2>
              <p className="text-lg text-blue-700 leading-relaxed">
                Your support helps us expand our reach and impact, ensuring that more children across Bangladesh have
                access to quality early childhood development programs and resources.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-blue-700">
                  <strong className="text-blue-900">Research Funding:</strong> Support evidence-based research that
                  informs policy and practice.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-blue-700">
                  <strong className="text-blue-900">Training Programs:</strong> Help us train more professionals in
                  effective ECD practices.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-blue-700">
                  <strong className="text-blue-900">Resource Development:</strong> Enable us to create and distribute
                  valuable resources to communities.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/donate">Donate Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
