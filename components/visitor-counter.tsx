"use client"

import { Eye } from "lucide-react"
import { useEffect, useState } from "react"

interface VisitorCounterProps {
  mobile?: boolean
}

export function VisitorCounter({ mobile = false }: VisitorCounterProps) {
  const [visitorCount, setVisitorCount] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const incrementVisitorCount = async () => {
      try {
        // Increment visitor count on page load
        const response = await fetch("/api/visitor-count", {
          method: "POST",
        })
        if (response.ok) {
          const data = await response.json()
          setVisitorCount(data.count)
        }
      } catch (error) {
        console.error("Error updating visitor count:", error)
      } finally {
        setIsLoading(false)
      }
    }

    incrementVisitorCount()
  }, [])

  // Mobile version - single line
  if (mobile) {
    if (isLoading || visitorCount === null) {
      return (
        <div className="flex items-center gap-2">
          <Eye className="w-5 h-5" />
          <span className="text-xl font-bold">...</span>
          <span className="text-sm uppercase tracking-wide">Visitors</span>
        </div>
      )
    }

    return (
      <div className="flex items-center gap-2">
        <Eye className="w-5 h-5" />
        <span className="text-xl font-bold">{visitorCount.toLocaleString()}</span>
        <span className="text-sm uppercase tracking-wide">Visitors</span>
      </div>
    )
  }

  // Desktop version - stacked
  if (isLoading || visitorCount === null) {
    return (
      <div className="flex items-center gap-2 text-foreground/80">
        <div className="flex flex-col items-center">
            <div className="flex items-center gap-1">
                <Eye className="w-5 h-5" />
                <div className="text-2xl font-bold leading-none">...</div>
            </div>
            
          <div className="text-xs uppercase tracking-wide">VISITORS</div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 text-primary">
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <div className="text-2xl font-bold leading-none">{visitorCount.toLocaleString()}</div>
        </div>
        <div className="text-xs uppercase tracking-wide">VISITORS</div>
      </div>
    </div>
  )
}
