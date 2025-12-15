"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MapPin, User, Building } from "lucide-react"

interface Member {
  id: string
  organization: string
  address: string
  headName: string
  headDesignation: string
  headEmail: string
  focalName: string
  focalDesignation: string
  focalEmail: string
  division: string
}

interface MemberCardProps {
  member: Member
}

function MemberCard({ member }: MemberCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg">{member.organization}</CardTitle>
        <div className="text-xs text-primary font-medium mt-2">{member.division}</div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
            <div className="text-gray-600 line-clamp-2">{member.address}</div>
          </div>

          <div className="flex items-center gap-2">
            <Building className="h-4 w-4 text-gray-400 flex-shrink-0" />
            <span className="font-medium text-gray-900">{member.headName}</span>
          </div>
          <div className="ml-6 text-xs text-gray-600">{member.headDesignation}</div>

          {isExpanded && (
            <div className="border-t pt-3 mt-3 space-y-2">
              <div className="flex items-start gap-2">
                <User className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-gray-900">{member.focalName}</div>
                  <div className="text-xs text-gray-600">{member.focalDesignation}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <a href={`mailto:${member.headEmail}`} className="text-xs text-blue-600 hover:underline truncate">
                  {member.headEmail}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <a href={`mailto:${member.focalEmail}`} className="text-xs text-blue-600 hover:underline truncate">
                  {member.focalEmail}
                </a>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-primary hover:text-primary/80 font-medium w-full text-left"
        >
          {isExpanded ? "Show Less" : "View Details"}
        </button>
      </CardContent>
    </Card>
  )
}

interface MembersClientProps {
  initialMembers: Member[]
}

export default function MembersClient({ initialMembers }: MembersClientProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null)

  const divisions = Array.from(new Set(initialMembers.map(m => m.division))).sort()

  const filteredMembers = initialMembers.filter(member => {
    const matchesSearch = member.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.headName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.focalName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDivision = !selectedDivision || member.division === selectedDivision
    return matchesSearch && matchesDivision
  })

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="space-y-4">
        <Input
          placeholder="Search by organization name or contact person..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />

        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedDivision === null ? "default" : "outline"}
            onClick={() => setSelectedDivision(null)}
            size="sm"
          >
            All Divisions
          </Button>
          {divisions.map(division => (
            <Button
              key={division}
              variant={selectedDivision === division ? "default" : "outline"}
              onClick={() => setSelectedDivision(division)}
              size="sm"
            >
              {division}
            </Button>
          ))}
        </div>
      </div>

      {/* Results Summary */}
      <div className="text-sm text-gray-600">
        Showing {filteredMembers.length} of {initialMembers.length} member organizations
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMembers.map(member => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No member organizations found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
