import Image from "next/image"

const partners = [
  // Row 1
  { name: "Government of Bangladesh", logo: "/partnersLogo/1.png" },
  { name: "Shishu Academy", logo: "/partnersLogo/2.png" },
  { name: "ICBCCP", logo: "/partnersLogo/3.png" },
  { name: "UNICEF", logo: "/partnersLogo/4.png" },
  { name: "BRAC IED", logo: "/partnersLogo/5.png" },
  // Row 2
  { name: "Porticus", logo: "/partnersLogo/6.jpg" },
  { name: "ARNEC", logo: "/partnersLogo/7.webp" },
  { name: "Plan International", logo: "/partnersLogo/8.jpg" },
  { name: "ICHD", logo: "/partnersLogo/9.jpg" },
  // Row 3
  { name: "Save the Children", logo: "/partnersLogo/10.png" },
  { name: "CODEC", logo: "/partnersLogo/11.png" },
  { name: "CAMPE", logo: "/partnersLogo/12.jpg" },
  { name: "Jagorani Chakra Foundation", logo: "/partnersLogo/13.png" },
  { name: "CDD", logo: "/partnersLogo/14.png" },
  // Row 4
  { name: "Synergos", logo: "/partnersLogo/15.png" },
  { name: "BRAC", logo: "/partnersLogo/16.png" },
  { name: "CIPRB", logo: "/partnersLogo/17.jpg" },
  { name: "Manusher Jonno", logo: "/partnersLogo/18.jpg" },
]

export function PartnersSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">Our Key Partners</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We collaborate with government agencies, international organizations, and local partners to strengthen early childhood development in Bangladesh.
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center justify-items-center max-w-6xl mx-auto">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow duration-300 w-full h-24"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={120}
                height={60}
                className="max-h-16 w-auto object-contain"
                loading="lazy"
                quality={70}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
