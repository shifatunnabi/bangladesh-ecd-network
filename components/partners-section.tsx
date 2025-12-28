"use client"

import Link from "next/link"
import Image from "next/image"
import { useRef } from "react"

// const partners = [
//   // Row 1
//   { name: "Government of Bangladesh", logo: "/partnersLogo/1.png" },
//   { name: "Shishu Academy", logo: "/partnersLogo/2.png" },
//   { name: "ICBCCP", logo: "/partnersLogo/3.png" },
//   { name: "UNICEF", logo: "/partnersLogo/4.png" },
//   { name: "BRAC IED", logo: "/partnersLogo/5.png" },
//   // Row 2
//   { name: "Porticus", logo: "/partnersLogo/6.jpg" },
//   { name: "ARNEC", logo: "/partnersLogo/7.webp" },
//   { name: "Plan International", logo: "/partnersLogo/8.jpg" },
//   { name: "ICHD", logo: "/partnersLogo/9.jpg" },
//   // Row 3
//   { name: "Save the Children", logo: "/partnersLogo/10.png" },
//   { name: "CODEC", logo: "/partnersLogo/11.png" },
//   { name: "CAMPE", logo: "/partnersLogo/12.jpg" },
//   { name: "Jagorani Chakra Foundation", logo: "/partnersLogo/13.png" },
//   { name: "CDD", logo: "/partnersLogo/14.png" },
//   // Row 4
//   { name: "Synergos", logo: "/partnersLogo/15.png" },
//   { name: "BRAC", logo: "/partnersLogo/16.png" },
//   { name: "CIPRB", logo: "/partnersLogo/17.jpg" },
//   { name: "Manusher Jonno", logo: "/partnersLogo/18.jpg" },
// ]

const partners =[
  { name: "Government of Bangladesh", logo: "/partnersLogo/1.png", link: "https://bangladesh.gov.bd" },
  { name: "Shishu Academy", logo: "/partnersLogo/2.png", link: "https://shishuacademy.gov.bd" },
  { name: "ICBCCP", logo: "/partnersLogo/3.png", link: "https://mowca.gov.bd" },
  { name: "UNICEF", logo: "/partnersLogo/4.png", link: "https://www.unicef.org/bangladesh" },
  { name: "BRAC IED", logo: "/partnersLogo/5.png", link: "https://bracied.com" },
  // Row 2
  { name: "Porticus", logo: "/partnersLogo/6.jpg", link: "https://www.porticus.com" },
  { name: "ARNEC", logo: "/partnersLogo/7.webp", link: "https://arnec.net" },
  { name: "Plan International", logo: "/partnersLogo/8.jpg", link: "https://plan-international.org/bangladesh" },
  { name: "ICHD", logo: "/partnersLogo/9.jpg", link: "http://ichdbd.org" },
  // Row 3
  { name: "Save the Children", logo: "/partnersLogo/10.png", link: "https://bangladesh.savethechildren.net" },
  { name: "CODEC", logo: "/partnersLogo/11.png", link: "https://codec.org.bd" },
  { name: "CAMPE", logo: "/partnersLogo/12.jpg", link: "https://www.campebd.org" },
  { name: "Jagorani Chakra Foundation", logo: "/partnersLogo/13.png", link: "https://jcf.org.bd" },
  { name: "CDD", logo: "/partnersLogo/14.png", link: "https://cdd.org.bd" },
  // Row 4
  { name: "Synergos", logo: "/partnersLogo/15.png", link: "https://www.synergos.org" },
  { name: "BRAC", logo: "/partnersLogo/16.png", link: "https://www.brac.net" },
  { name: "CIPRB", logo: "/partnersLogo/17.jpg", link: "https://www.ciprb.org" },
  { name: "Manusher Jonno", logo: "/partnersLogo/18.jpg", link: "https://www.manusherjonno.org" }
]

export function PartnersSection() {
  // Duplicate partners array for seamless infinite scroll
  const duplicatedPartners = [...partners, ...partners]
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollContainerRef.current
    if (!container) return
    
    const startX = e.pageX - container.offsetLeft
    const scrollLeft = container.scrollLeft

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault()
      const x = e.pageX - container.offsetLeft
      const walk = (x - startX) * 2
      container.scrollLeft = scrollLeft - walk
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      container.style.cursor = 'grab'
    }

    container.style.cursor = 'grabbing'
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

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
          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
          >
            <div className="flex gap-4 md:gap-8 animate-scroll-left">
            {duplicatedPartners.map((partner, index) => (
              <Link href={partner.link} key={index} target="_blank" rel="noopener noreferrer">
                <div
                  className="flex-shrink-0 flex items-center justify-center p-3 md:p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-32 h-24 md:w-48 md:h-32"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={150}
                    height={80}
                    className="max-h-12 md:max-h-20 w-auto object-contain"
                    loading="lazy"
                    quality={60}
                  />
                </div>
              </Link>
            ))}
            </div>
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
          animation: scroll-left 35s linear infinite;
        }

        .animate-scroll-left:hover {
          animation-play-state: paused;
        }

        @media (min-width: 768px) {
          .animate-scroll-left {
            animation: scroll-left 80s linear infinite;
          }
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
