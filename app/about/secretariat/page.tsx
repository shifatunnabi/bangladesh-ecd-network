import { MemberCardGrid } from "@/components/member-card-grid"

const secretariatMembers = [
  {
    id: "1",
    name: "Ms. Tahmina Akter",
    title: "Executive Director",
    organization: "Bangladesh ECD Network",
    image: "/placeholder.svg?height=80&width=80",
    bio: "Ms. Tahmina Akter leads the day-to-day operations of the Bangladesh ECD Network. With over 12 years of experience in program management and organizational development, she ensures effective coordination among network members and implementation of strategic initiatives.",
    expertise: ["Program Management", "Organizational Development", "Strategic Planning", "Partnership Building"],
    email: "tahmina.akter@bangladeshecdnetwork.org",
    linkedin: "https://linkedin.com/in/tahmina-akter",
    type: "individual" as const,
  },
  {
    id: "2",
    name: "Mr. Rafiqul Islam",
    title: "Program Manager",
    organization: "Bangladesh ECD Network",
    image: "/placeholder.svg?height=80&width=80",
    bio: "Mr. Rafiqul Islam oversees the implementation of network programs and initiatives. He has extensive experience in project management and has successfully coordinated multiple ECD projects across different regions of Bangladesh.",
    expertise: ["Project Management", "Program Implementation", "Monitoring & Evaluation", "Capacity Building"],
    email: "rafiqul.islam@bangladeshecdnetwork.org",
    type: "individual" as const,
  },
  {
    id: "3",
    name: "Dr. Salma Khatun",
    title: "Research Coordinator",
    organization: "Bangladesh ECD Network",
    image: "/placeholder.svg?height=80&width=80",
    bio: "Dr. Salma Khatun coordinates research activities and knowledge management for the network. She has a PhD in Child Development and has published numerous research papers on ECD practices in Bangladesh.",
    expertise: ["Research Coordination", "Knowledge Management", "Data Analysis", "Publication Management"],
    email: "salma.khatun@bangladeshecdnetwork.org",
    type: "individual" as const,
  },
  {
    id: "4",
    name: "Ms. Ruma Begum",
    title: "Communications Manager",
    organization: "Bangladesh ECD Network",
    image: "/placeholder.svg?height=80&width=80",
    bio: "Ms. Ruma Begum manages all communications and outreach activities for the network. She has a background in journalism and communications, with specialized experience in health and development communications.",
    expertise: ["Communications Strategy", "Media Relations", "Content Development", "Digital Marketing"],
    email: "ruma.begum@bangladeshecdnetwork.org",
    twitter: "https://twitter.com/ruma_begum",
    type: "individual" as const,
  },
  {
    id: "5",
    name: "Mr. Aminul Haque",
    title: "Finance Manager",
    organization: "Bangladesh ECD Network",
    image: "/placeholder.svg?height=80&width=80",
    bio: "Mr. Aminul Haque manages the financial operations and ensures fiscal responsibility across all network activities. He is a certified accountant with extensive experience in non-profit financial management.",
    expertise: ["Financial Management", "Budget Planning", "Compliance", "Financial Reporting"],
    email: "aminul.haque@bangladeshecdnetwork.org",
    type: "individual" as const,
  },
  {
    id: "6",
    name: "Ms. Nasir Uddin",
    title: "Administrative Assistant",
    organization: "Bangladesh ECD Network",
    image: "/placeholder.svg?height=80&width=80",
    bio: "Ms. Nasir Uddin provides administrative support to ensure smooth operations of the network. She coordinates meetings, manages documentation, and supports various administrative functions.",
    expertise: ["Administrative Support", "Event Coordination", "Documentation", "Office Management"],
    email: "nasir.uddin@bangladeshecdnetwork.org",
    type: "individual" as const,
  },
]

export default function SecretariatPage() {
  return (
    <div className="flex flex-col">
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Secretariat Team</h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Our dedicated secretariat team ensures the smooth operation of the Bangladesh ECD Network. They coordinate
              activities, manage programs, and provide essential support to our members and partners.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <MemberCardGrid members={secretariatMembers} />
      </div>
    </div>
  )
}
