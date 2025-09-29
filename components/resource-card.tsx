import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Download, Play, ExternalLink, FileText, Eye } from "lucide-react"

interface ResourceCardProps {
  title: string
  description?: string
  date: string
  image?: string
  badge?: string
  href?: string
  downloadUrl?: string
  type: "research" | "video" | "newsletter" | "policy" | "link"
  category?: string
  author?: string
}

export function ResourceCard({
  title,
  description,
  date,
  image,
  badge,
  href,
  downloadUrl,
  type,
  category,
  author,
}: ResourceCardProps) {
  const getIcon = () => {
    switch (type) {
      case "research":
        return Download
      case "video":
        return Play
      case "newsletter":
        return Eye
      case "policy":
        return FileText
      case "link":
        return ExternalLink
      default:
        return ExternalLink
    }
  }

  const getActionText = () => {
    switch (type) {
      case "research":
        return "Download PDF"
      case "video":
        return "Watch Video"
      case "newsletter":
        return "View Newsletter"
      case "policy":
        return "Read Policy"
      case "link":
        return "Visit Link"
      default:
        return "View"
    }
  }

  const Icon = getIcon()

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 h-full flex flex-col">
      {image && (
        <CardHeader className="p-0">
          <div className="relative h-48 overflow-hidden rounded-t-lg">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {badge && (
              <div className="absolute top-3 left-3">
                <Badge variant={badge === "New" ? "default" : "secondary"}>{badge}</Badge>
              </div>
            )}
          </div>
        </CardHeader>
      )}

      <CardContent className="p-4 flex-1 flex flex-col">
        <div className="flex-1 space-y-3">
          <div>
            {category && <p className="text-sm text-muted-foreground">{category}</p>}
            <CardTitle className="text-base leading-tight line-clamp-2">{title}</CardTitle>
            {description && <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{description}</p>}
          </div>

          <div className="space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 mr-1" />
              {date}
            </div>
            {author && <p className="text-sm text-muted-foreground">By {author}</p>}
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          {downloadUrl && (
            <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
              <a href={downloadUrl} download>
                <Icon className="w-4 h-4 mr-2" />
                {getActionText()}
              </a>
            </Button>
          )}
          {href && !downloadUrl && (
            <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
              <Link href={href}>
                <Icon className="w-4 h-4 mr-2" />
                {getActionText()}
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
