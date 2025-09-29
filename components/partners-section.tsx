import Image from "next/image"

const partners = [
  {
    name: "UNICEF Bangladesh",
    logo: "/images/partners/unicef-logo.jpg",
  },
  {
    name: "Save the Children",
    logo: "/images/partners/save-children-logo.jpg",
  },
  {
    name: "World Vision",
    logo: "/images/partners/world-vision-logo.jpg",
  },
  {
    name: "Plan International",
    logo: "/images/partners/plan-international-logo.jpg",
  },
  {
    name: "BRAC",
    logo: "/images/partners/brac-logo.jpg",
  },
  {
    name: "Dhaka University",
    logo: "/images/partners/dhaka-university-logo.jpg",
  },
]

export function PartnersSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Partners</h2>
          <p className="text-lg text-blue-700 max-w-2xl mx-auto">
            Working together with leading organizations to strengthen early childhood development in Bangladesh.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-4 rounded-lg bg-white/60 backdrop-blur-sm border border-blue-100 grayscale hover:grayscale-0 hover:bg-white hover:border-blue-200 hover:shadow-md transition-all duration-300"
            >
              <Image
                src={partner.logo || "/placeholder.svg"}
                alt={partner.name}
                width={160}
                height={80}
                className="max-w-full h-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
