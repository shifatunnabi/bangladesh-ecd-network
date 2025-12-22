"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ProcessedCarousel } from "@/lib/contentful-types"

interface HeroCarouselProps {
  slides?: ProcessedCarousel[]
}

const fallbackSlides = [
  {
    id: "1",
    title: "Empowering Early Childhood Development in Bangladesh",
    subtitle: "Building a stronger future for our children through collaborative networks and evidence-based practices",
    photo: "/images/hero-slide-1.jpg",
    ctaText: "Learn More",
    ctaLink: "/about",
  },
  {
    id: "2", 
    title: "Research-Driven Solutions for Better Outcomes",
    subtitle: "Advancing early childhood development through cutting-edge research and policy advocacy",
    photo: "/images/hero-slide-2.jpg",
    ctaText: "View Research",
    ctaLink: "/resources/research-reports",
  },
  {
    id: "3",
    title: "Join Our Growing Network of ECD Professionals",
    subtitle: "Connect with experts, policymakers, and practitioners working to improve children's lives across Bangladesh",
    photo: "/images/hero-slide-3.jpg",
    ctaText: "Join Network",
    ctaLink: "/membership",
  },
]

export function HeroCarousel({ slides: propSlides }: HeroCarouselProps) {
  const slides = propSlides && propSlides.length > 0 ? propSlides : fallbackSlides
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image 
              src={slide.photo || "/placeholder.svg"} 
              alt={slide.title} 
              fill
              className="object-cover"
              priority={index === 0}
              quality={75}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Content */}
          <div className="relative h-full flex items-end pb-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl text-white">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">{slide.title}</h1>
                <p className="text-lg md:text-xl mb-8 text-blue-100 text-pretty">{slide.subtitle}</p>
                {/* {slide.ctaText && slide.ctaLink && (
                  <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Link href={slide.ctaLink}>{slide.ctaText}</Link>
                  </Button>
                )} */}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
