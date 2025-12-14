"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search } from "lucide-react"
import Image from "next/image"
import { ProcessedCommittee, ProcessedSecretariat } from "@/lib/contentful-types"

interface MemberCardGridProps {
  members: (ProcessedCommittee | ProcessedSecretariat)[]
  showSearch?: boolean
}

export function MemberCardGrid({ members, showSearch = false }: MemberCardGridProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredMembers = members.filter((member) => {
    const professionalDetails = 'professionalDetails' in member ? member.professionalDetails : ''
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      professionalDetails.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Search */}
      {showSearch && (
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search members by name, designation, or details..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      )}

      {/* Results Count */}
      {showSearch && (
        <div className="text-sm text-muted-foreground">
          Showing {filteredMembers.length} of {members.length} members
        </div>
      )}

      {/* Member Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMembers.map((member) => (
          <Dialog key={member.id}>
            <Card className="hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="relative w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src={member.photoUrl || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                  {member.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">{member.designation}</p>
                <p className="text-xs text-muted-foreground mb-4">Bangladesh ECD Network</p>
                <DialogTrigger asChild>
                  <Button size="sm" className="text-xs px-3 py-1 h-auto">
                    View Details
                  </Button>
                </DialogTrigger>
              </CardContent>
            </Card>

            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <div className="flex items-start gap-4">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                    <Image src={member.photoUrl || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <DialogTitle className="text-2xl mb-2">{member.name}</DialogTitle>
                    <p className="text-base text-muted-foreground font-medium">
                      {member.designation}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Bangladesh ECD Network
                    </p>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-6">
                {'professionalDetails' in member && member.professionalDetails && (
                  <div>
                    <h4 className="font-semibold text-lg mb-3">Professional Details</h4>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                      {member.professionalDetails}
                    </p>
                  </div>
                )}

                {member.biography && (
                  <div>
                    <h4 className="font-semibold text-lg mb-3">Biography</h4>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                      {member.biography}
                    </p>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No members found matching your search criteria.</p>
        </div>
      )}
    </div>
  )
}
