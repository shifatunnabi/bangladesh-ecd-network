"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import Image from "next/image"
import { Search, Filter, Calendar, Eye, ChevronLeft, ChevronRight } from "lucide-react"

interface GalleryEvent {
  id: string
  title: string
  date: string
  description: string
  category: string
  images: string[]
  coverImage: string
  badge?: string
}

interface GalleryClientProps {
  initialGalleryEvents: GalleryEvent[]
}

// Fallback gallery events for when no Contentful data is available
const fallbackGalleryEvents: GalleryEvent[] = [
  {
    id: "1",
    title: "Annual ECD Conference 2024",
    date: "April 20-22, 2024",
    description: "Three days of learning, networking, and sharing best practices in early childhood development.",
    category: "Conference",
    badge: "New",
    coverImage: "/placeholder.svg?height=300&width=400",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
  },
  {
    id: "2",
    title: "Community ECD Center Opening",
    date: "March 10, 2024",
    description: "Inauguration ceremony for new early childhood development centers in rural communities.",
    category: "Community Event",
    coverImage: "/placeholder.svg?height=300&width=400",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
  },
  {
    id: "3",
    title: "Teacher Training Workshop",
    date: "February 25, 2024",
    description: "Intensive training workshop for early childhood development practitioners and educators.",
    category: "Training",
    coverImage: "/placeholder.svg?height=300&width=400",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
  },
  {
    id: "4",
    title: "Parent Engagement Program",
    date: "February 15, 2024",
    description: "Community program focusing on parent engagement in early childhood development.",
    category: "Community Program",
    coverImage: "/placeholder.svg?height=300&width=400",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
  },
  {
    id: "5",
    title: "Research Dissemination Event",
    date: "January 30, 2024",
    description: "Presentation of latest research findings on early childhood development in Bangladesh.",
    category: "Research Event",
    coverImage: "/placeholder.svg?height=300&width=400",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
  },
  {
    id: "6",
    title: "Partnership Signing Ceremony",
    date: "January 20, 2024",
    description: "Formal signing ceremony for new partnerships with international organizations.",
    category: "Partnership Event",
    coverImage: "/placeholder.svg?height=300&width=400",
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
  },
]

function GalleryModal({ event }: { event: GalleryEvent }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % event.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + event.images.length) % event.images.length)
  }

  return (
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle>{event.title}</DialogTitle>
        <DialogDescription>
          {event.date} • {event.category}
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
        <div className="relative">
          <div className="relative h-96 rounded-lg overflow-hidden">
            <Image
              src={event.images[currentImageIndex] || "/placeholder.svg"}
              alt={`${event.title} - Image ${currentImageIndex + 1}`}
              fill
              className="object-cover"
            />
          </div>

          {event.images.length > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={prevImage}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={nextImage}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </>
          )}

          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentImageIndex + 1} / {event.images.length}
          </div>
        </div>

        <div className="grid grid-cols-6 gap-2">
          {event.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`relative h-16 rounded overflow-hidden ${
                index === currentImageIndex ? "ring-2 ring-primary" : ""
              }`}
            >
              <Image src={image || "/placeholder.svg"} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>

        <p className="text-muted-foreground">{event.description}</p>
      </div>
    </DialogContent>
  )
}

export function GalleryClient({ initialGalleryEvents }: GalleryClientProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  
  // Use Contentful data if available, otherwise use fallback data
  const galleryEvents = initialGalleryEvents.length > 0 ? initialGalleryEvents : fallbackGalleryEvents
  
  // Pagination constants
  const ITEMS_PER_PAGE = 12

  const filteredEvents = galleryEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  // Pagination calculations
  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentPageEvents = filteredEvents.slice(startIndex, endIndex)

  // Reset to page 1 when search or filter changes
  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const categories = ["all", ...Array.from(new Set(galleryEvents.map((event) => event.category)))]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">Photo Gallery</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Explore visual documentation of our activities, events, and community engagement initiatives. Each gallery
          showcases the impact and reach of our early childhood development programs.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search photo galleries..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="sm:w-auto bg-transparent">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
            onClick={() => handleCategoryChange(category)}
          >
            {category === "all" ? "All Categories" : category}
          </Badge>
        ))}
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground mb-6">
        Showing {startIndex + 1} - {Math.min(endIndex, filteredEvents.length)} of {filteredEvents.length} photo galleries
        {totalPages > 1 && ` • Page ${currentPage} of ${totalPages}`}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPageEvents.map((event) => (
          <Dialog key={event.id}>
            <DialogTrigger asChild>
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden p-0">
                <div className="relative h-64 overflow-hidden rounded-t-lg">
                  <Image
                    src={event.coverImage || "/placeholder.svg"}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {event.badge && (
                    <div className="absolute top-3 left-3">
                      <Badge variant="default">{event.badge}</Badge>
                    </div>
                  )}
                  {/* <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded text-sm flex items-center">
                    <Eye className="w-3 h-3 mr-1" />
                    {event.images.length}
                  </div> */}
                </div>
                <div className="p-4 space-y-2">
                  <div>
                    <p className="text-sm text-muted-foreground">{event.category}</p>
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-1" />
                    {event.date}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
                </div>
              </Card>
            </DialogTrigger>
            <GalleryModal event={event} />
          </Dialog>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No photo galleries found matching your search criteria.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center">
          <Pagination>
            <PaginationContent className="flex-wrap justify-center gap-1">
              <PaginationItem>
                <PaginationPrevious 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage > 1) setCurrentPage(currentPage - 1)
                  }}
                  className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {/* First page */}
              {currentPage > 3 && (
                <>
                  <PaginationItem>
                    <PaginationLink 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault()
                        setCurrentPage(1)
                      }}
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>
                  {currentPage > 4 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                </>
              )}

              {/* Pages around current */}
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(page => {
                  if (totalPages <= 7) return true
                  return Math.abs(page - currentPage) <= 1 || page === 1 || page === totalPages
                })
                .filter(page => {
                  if (currentPage <= 3) return page <= 5
                  if (currentPage >= totalPages - 2) return page >= totalPages - 4
                  return Math.abs(page - currentPage) <= 1
                })
                .map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setCurrentPage(page)
                      }}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}

              {/* Last page */}
              {currentPage < totalPages - 2 && totalPages > 7 && (
                <>
                  {currentPage < totalPages - 3 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationLink 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault()
                        setCurrentPage(totalPages)
                      }}
                    >
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}

              <PaginationItem>
                <PaginationNext 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                  }}
                  className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}