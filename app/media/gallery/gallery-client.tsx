"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import Image from "next/image"
import { Search, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, X } from "lucide-react"
import { ProcessedGallery } from "@/lib/contentful-types"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination"

interface GalleryClientProps {
  initialGalleryEvents: ProcessedGallery[]
}

const ITEMS_PER_PAGE = 12

export function GalleryClient({ initialGalleryEvents }: GalleryClientProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState<"photo" | "video">("photo")
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())
  const [expandAll, setExpandAll] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [currentEventPhotos, setCurrentEventPhotos] = useState<string[]>([])
  const [currentEventTitle, setCurrentEventTitle] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCurrentPhotoIndex((prev) => (prev === 0 ? currentEventPhotos.length - 1 : prev - 1))
      } else if (e.key === "ArrowRight") {
        setCurrentPhotoIndex((prev) => (prev === currentEventPhotos.length - 1 ? 0 : prev + 1))
      } else if (e.key === "Escape") {
        setLightboxOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [lightboxOpen, currentEventPhotos.length])

  // Filter events based on search and active tab  
  const filteredEvents = initialGalleryEvents.filter((event) => {
    if (!event || !event.title) return false
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase())
    // typeOfContent: true = photo, false = video
    const matchesTab = activeTab === "photo" ? event.typeOfContent === true : event.typeOfContent === false
    return matchesSearch && matchesTab
  })

  // Reset expandAll when filtered events change
  useEffect(() => {
    setExpandAll(false)
    setExpandedSections(new Set())
    setCurrentPage(1)
  }, [activeTab, searchTerm])

  // Calculate pagination
  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentEvents = filteredEvents.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push("ellipsis")
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push("ellipsis")
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push("ellipsis")
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push("ellipsis")
        pages.push(totalPages)
      }
    }

    return pages
  }

  const toggleSection = (eventId: string) => {
    setExpandedSections(prev => {
      const newExpanded = new Set(prev)
      if (newExpanded.has(eventId)) {
        newExpanded.delete(eventId)
      } else {
        newExpanded.add(eventId)
      }
      return newExpanded
    })
  }

  const toggleExpandAll = () => {
    if (expandAll) {
      setExpandedSections(new Set())
      setExpandAll(false)
    } else {
      setExpandedSections(new Set(currentEvents.map(e => e.id)))
      setExpandAll(true)
    }
  }

  return (
    <div className="flex flex-col">
      {/* Header Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Gallery</h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Explore our collection of photos and videos from events, programs, and activities.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search gallery..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Photo/Video Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <Button
            variant={activeTab === "photo" ? "default" : "outline"}
            onClick={() => setActiveTab("photo")}
            className="min-w-[120px]"
          >
            Photo
          </Button>
          <Button
            variant={activeTab === "video" ? "default" : "outline"}
            onClick={() => setActiveTab("video")}
            className="min-w-[120px]"
          >
            Video
          </Button>
        </div>

        {/* Expand All/Collapse All Button */}
        {currentEvents.length > 0 && (
          <div className="flex justify-end mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleExpandAll}
            >
              {expandAll ? "Collapse All" : "Expand All"}
            </Button>
          </div>
        )}

        {/* Results Count */}
        {filteredEvents.length > 0 && (
          <div className="text-sm text-muted-foreground mb-6">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredEvents.length)} of {filteredEvents.length} {activeTab === "photo" ? "events" : "videos"}
          </div>
        )}

        {/* Gallery Sections */}
        {currentEvents.length > 0 ? (
          <>
            <div className={activeTab === "video" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8" : "space-y-4 mb-8"}>
              {currentEvents.map((event) => (
              activeTab === "video" && !event.typeOfContent && event.youtubeLink ? (
                /* Video Card */
                <div key={event.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-video bg-black">
                    <iframe
                      src={event.youtubeLink.replace('watch?v=', 'embed/')}
                      title={event.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{event.title}</h3>
                  </div>
                </div>
              ) : (
                /* Photo Collapsible */
                <Collapsible
                  key={event.id}
                  open={expandedSections.has(event.id)}
                  onOpenChange={() => toggleSection(event.id)}
                  className="border rounded-lg"
                >
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-left">{event.title}</h3>
                        <span className="text-sm text-muted-foreground">
                          • {event.photos?.length || 0} {(event.photos?.length || 0) === 1 ? 'item' : 'items'}
                        </span>
                      </div>
                      {expandedSections.has(event.id) ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="p-4 pt-0">
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {event.photos && event.photos.length > 0 ? (
                          event.photos.map((photo, index) => (
                            <div
                              key={index}
                              className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer hover:shadow-lg transition-all bg-muted"
                              onClick={() => {
                                setCurrentEventPhotos(event.photos || [])
                                setCurrentEventTitle(event.title)
                                setCurrentPhotoIndex(index)
                                setLightboxOpen(true)
                              }}
                            >
                              <Image
                                src={photo || "/placeholder.svg"}
                                alt={`${event.title} - Image ${index + 1}`}
                                width={400}
                                height={400}
                                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                                unoptimized
                              />
                            </div>
                          ))
                        ) : (
                          <div className="col-span-full text-center py-8 text-muted-foreground">
                            No images available
                          </div>
                        )}
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              )
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>

                {getPageNumbers().map((page, index) =>
                  page === "ellipsis" ? (
                    <PaginationItem key={`ellipsis-${index}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  ) : (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => handlePageChange(page as number)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No {activeTab === "photo" ? "photos" : "videos"} found{searchTerm ? " matching your search" : ""}.
            </p>
          </div>
        )}
      </div>

      {/* Photo Lightbox */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-[95vw] w-[95vw] h-[90vh] p-0 bg-black/95 border-0">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Previous Button */}
            {currentEventPhotos.length > 1 && (
              <button
                onClick={() => setCurrentPhotoIndex((prev) => (prev === 0 ? currentEventPhotos.length - 1 : prev - 1))}
                className="absolute left-4 z-50 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                aria-label="Previous photo"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
            )}

            {/* Image */}
            <div className="relative w-full h-full flex items-center justify-center px-20 py-16">
              {currentEventPhotos[currentPhotoIndex] && (
                <Image
                  src={currentEventPhotos[currentPhotoIndex]}
                  alt={`${currentEventTitle} - Image ${currentPhotoIndex + 1}`}
                  fill
                  className="object-contain"
                  unoptimized
                  priority
                />
              )}
            </div>

            {/* Next Button */}
            {currentEventPhotos.length > 1 && (
              <button
                onClick={() => setCurrentPhotoIndex((prev) => (prev === currentEventPhotos.length - 1 ? 0 : prev + 1))}
                className="absolute right-4 z-50 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                aria-label="Next photo"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            )}

            {/* Photo Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-black/50 text-white text-sm">
              {currentPhotoIndex + 1} / {currentEventPhotos.length}
            </div>

            {/* Event Title */}
            <div className="absolute top-4 left-4 z-50 px-4 py-2 rounded-lg bg-black/50 text-white">
              <h3 className="font-semibold">{currentEventTitle}</h3>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
