"use client"

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
  // Duplicate partners array for seamless infinite scroll
  const duplicatedPartners = [...partners, ...partners]

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">Our Key Partners</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We collaborate with government agencies, international organizations, and local partners to strengthen early childhood development in Bangladesh.
          </p>
        </div>
        
        <div className="relative">
          {/* Gradient overlays for fade effect */}
          {/* <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" /> */}
          
          {/* Scrolling container */}
          <div className="flex gap-8 animate-scroll-left">
            {duplicatedPartners.map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex items-center justify-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-48 h-32"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={150}
                  height={80}
                  className="max-h-20 w-auto object-contain"
                  loading="lazy"
                  quality={70}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 40s linear infinite;
        }

        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
