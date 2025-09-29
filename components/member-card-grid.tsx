"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Mail, Linkedin, Twitter } from "lucide-react"
import Image from "next/image"

interface Member {
  id: string
  name: string
  title: string
  organization: string
  image: string
  bio: string
  expertise: string[]
  email?: string
  linkedin?: string
  twitter?: string
  type: "individual" | "organization"
}

interface MemberCardGridProps {
  members: Member[]
  showTypeFilter?: boolean
}

export function MemberCardGrid({ members, showTypeFilter = false }: MemberCardGridProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<"all" | "individual" | "organization">("all")

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.organization.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = selectedType === "all" || member.type === selectedType

    return matchesSearch && matchesType
  })

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search members by name, title, or organization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {showTypeFilter && (
          <div className="flex gap-2">
            <Button
              variant={selectedType === "all" ? "default" : "outline"}
              onClick={() => setSelectedType("all")}
              size="sm"
            >
              All
            </Button>
            <Button
              variant={selectedType === "individual" ? "default" : "outline"}
              onClick={() => setSelectedType("individual")}
              size="sm"
            >
              Individual
            </Button>
            <Button
              variant={selectedType === "organization" ? "default" : "outline"}
              onClick={() => setSelectedType("organization")}
              size="sm"
            >
              Organization
            </Button>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredMembers.length} of {members.length} members
      </div>

      {/* Member Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMembers.map((member) => (
          <Dialog key={member.id}>
            <DialogTrigger asChild>
              <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="relative w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">{member.title}</p>
                  <p className="text-xs text-muted-foreground mb-3">{member.organization}</p>
                  <Badge variant={member.type === "individual" ? "default" : "secondary"} className="text-xs">
                    {member.type === "individual" ? "Individual" : "Organization"}
                  </Badge>
                </CardContent>
              </Card>
            </DialogTrigger>

            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <div className="flex items-start gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <DialogTitle className="text-xl">{member.name}</DialogTitle>
                    <DialogDescription className="text-base">
                      {member.title} at {member.organization}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Biography</h4>
                  <p className="text-muted-foreground leading-relaxed">{member.bio}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Areas of Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((skill, index) => (
                      <Badge key={index} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {(member.email || member.linkedin || member.twitter) && (
                  <div>
                    <h4 className="font-semibold mb-2">Contact</h4>
                    <div className="flex gap-3">
                      {member.email && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={`mailto:${member.email}`}>
                            <Mail className="w-4 h-4 mr-2" />
                            Email
                          </a>
                        </Button>
                      )}
                      {member.linkedin && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                            <Linkedin className="w-4 h-4 mr-2" />
                            LinkedIn
                          </a>
                        </Button>
                      )}
                      {member.twitter && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={member.twitter} target="_blank" rel="noopener noreferrer">
                            <Twitter className="w-4 h-4 mr-2" />
                            Twitter
                          </a>
                        </Button>
                      )}
                    </div>
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
