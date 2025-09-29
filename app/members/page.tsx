import { MemberCardGrid } from "@/components/member-card-grid"

const allMembers = [
  // Individual Members
  {
    id: "1",
    name: "Dr. Rashida Ahmed",
    title: "Director",
    organization: "Child Development Institute",
    image: "/placeholder.svg?height=80&width=80",
    bio: "Dr. Rashida Ahmed is a renowned expert in early childhood development with over 20 years of experience in research and policy development.",
    expertise: ["Early Childhood Development", "Policy Development", "Research Methodology"],
    email: "rashida.ahmed@cdi.org.bd",
    type: "individual" as const,
  },
  {
    id: "2",
    name: "Prof. Mohammad Rahman",
    title: "Professor",
    organization: "University of Dhaka",
    image: "/placeholder.svg?height=80&width=80",
    bio: "Professor Mohammad Rahman is a distinguished academic specializing in child development and education.",
    expertise: ["Child Development", "Education Policy", "Curriculum Development"],
    email: "m.rahman@du.ac.bd",
    type: "individual" as const,
  },
  {
    id: "3",
    name: "Dr. Fatima Khatun",
    title: "Senior Researcher",
    organization: "Bangladesh Institute of Child Health",
    image: "/placeholder.svg?height=80&width=80",
    bio: "Dr. Fatima Khatun is a pediatrician and public health expert with extensive experience in child health.",
    expertise: ["Child Health", "Nutrition", "Public Health"],
    email: "fatima.khatun@bich.org.bd",
    type: "individual" as const,
  },
  // Organizational Members
  {
    id: "4",
    name: "UNICEF Bangladesh",
    title: "International Organization",
    organization: "United Nations",
    image: "/placeholder.svg?height=80&width=80",
    bio: "UNICEF Bangladesh works to protect and promote the rights of children across the country, with a strong focus on early childhood development programs.",
    expertise: ["Child Rights", "Program Implementation", "Policy Advocacy", "Capacity Building"],
    email: "dhaka@unicef.org",
    type: "organization" as const,
  },
  {
    id: "5",
    name: "Save the Children Bangladesh",
    title: "International NGO",
    organization: "Save the Children",
    image: "/placeholder.svg?height=80&width=80",
    bio: "Save the Children Bangladesh implements comprehensive early childhood development programs focusing on education, health, and protection.",
    expertise: ["Child Protection", "Education", "Emergency Response", "Community Development"],
    email: "info@savethechildren.org.bd",
    type: "organization" as const,
  },
  {
    id: "6",
    name: "BRAC",
    title: "National NGO",
    organization: "BRAC",
    image: "/placeholder.svg?height=80&width=80",
    bio: "BRAC is one of the largest NGOs in Bangladesh, implementing innovative early childhood development programs in rural and urban areas.",
    expertise: ["Community Development", "Education", "Health", "Microfinance"],
    email: "info@brac.net",
    type: "organization" as const,
  },
  {
    id: "7",
    name: "Plan International Bangladesh",
    title: "International NGO",
    organization: "Plan International",
    image: "/placeholder.svg?height=80&width=80",
    bio: "Plan International Bangladesh focuses on advancing children's rights and equality for girls, with strong ECD programming.",
    expertise: ["Children's Rights", "Gender Equality", "Education", "Child Protection"],
    email: "info@plan-international.org.bd",
    type: "organization" as const,
  },
  {
    id: "8",
    name: "World Vision Bangladesh",
    title: "International NGO",
    organization: "World Vision",
    image: "/placeholder.svg?height=80&width=80",
    bio: "World Vision Bangladesh implements child-focused development programs with emphasis on early childhood development and education.",
    expertise: ["Child Development", "Community Health", "Education", "Disaster Response"],
    email: "info@wvi.org.bd",
    type: "organization" as const,
  },
]

export default function MembersPage() {
  return (
    <div className="flex flex-col">
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Members</h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              The Bangladesh ECD Network brings together a diverse community of individuals and organizations committed
              to advancing early childhood development. Our members include researchers, practitioners, policymakers,
              and organizations working across the country.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <MemberCardGrid members={allMembers} showTypeFilter={true} />
      </div>
    </div>
  )
}
