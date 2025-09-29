import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

export function WhoWeAreSection() {
  return (
    <section className="py-16 bg-[#0055a3]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Who We Are</h2>
              <p className="text-lg text-blue-100 leading-relaxed">
                The Bangladesh ECD Network is a collaborative platform that brings together policymakers, researchers,
                practitioners, and organizations committed to advancing early childhood development across Bangladesh.
              </p>
            </div>

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

            <Button size="lg" variant="secondary" asChild>
              <Link href="/about">Learn More About Our Work</Link>
            </Button>
          </div>

          {/* Image Card */}
          <Card className="overflow-hidden border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-0">
              <div className="relative h-[400px]">
                <Image
                  src="/images/ecd-team-meeting.jpg"
                  alt="ECD Network team meeting"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-xl font-semibold mb-2 text-blue-900">Our Vision</h3>
                <p className="text-blue-700">
                  A Bangladesh where every young child is well-nourished, healthy, happy, learning, and safe.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
