import { MemberCardGrid } from "@/components/member-card-grid"

const committeeMembers = [
  {
    id: "1",
    name: "Dr. Rashida Ahmed",
    title: "Chairperson",
    organization: "Child Development Institute",
    image: "/placeholder.svg?height=80&width=80",
    bio: "Dr. Rashida Ahmed is a renowned expert in early childhood development with over 20 years of experience in research and policy development. She has led numerous initiatives to improve ECD outcomes in Bangladesh and has published extensively on child development topics.",
    expertise: ["Early Childhood Development", "Policy Development", "Research Methodology", "Child Psychology"],
    email: "rashida.ahmed@cdi.org.bd",
    linkedin: "https://linkedin.com/in/rashida-ahmed",
    type: "individual" as const,
  },
  {
    id: "2",
    name: "Prof. Mohammad Rahman",
    title: "Vice Chairperson",
    organization: "University of Dhaka",
    image: "/placeholder.svg?height=80&width=80",
    bio: "Professor Mohammad Rahman is a distinguished academic and researcher specializing in child development and education. He has been instrumental in developing ECD curricula and training programs across Bangladesh.",
    expertise: ["Child Development", "Education Policy", "Curriculum Development", "Teacher Training"],
    email: "m.rahman@du.ac.bd",
    linkedin: "https://linkedin.com/in/mohammad-rahman",
    type: "individual" as const,
  },
  {
    id: "3",
    name: "Dr. Fatima Khatun",
    title: "Secretary",
    organization: "Bangladesh Institute of Child Health",
    image: "/placeholder.svg?height=80&width=80",
    bio: "Dr. Fatima Khatun is a pediatrician and public health expert with extensive experience in child health and nutrition. She has worked with various international organizations to improve child health outcomes in Bangladesh.",
    expertise: ["Child Health", "Nutrition", "Public Health", "Healthcare Policy"],
    email: "fatima.khatun@bich.org.bd",
    type: "individual" as const,
  },
  {
    id: "4",
    name: "Mr. Abdul Karim",
    title: "Treasurer",
    organization: "Save the Children Bangladesh",
    image: "/placeholder.svg?height=80&width=80",
    bio: "Mr. Abdul Karim has over 15 years of experience in program management and financial oversight for child-focused organizations. He has been instrumental in managing large-scale ECD programs across rural Bangladesh.",
    expertise: ["Program Management", "Financial Management", "Rural Development", "Community Engagement"],
    email: "abdul.karim@savethechildren.org",
    type: "individual" as const,
  },
  {
    id: "5",
    name: "Dr. Nasreen Sultana",
    title: "Research Committee Chair",
    organization: "BRAC University",
    image: "/placeholder.svg?height=80&width=80",
    bio: "Dr. Nasreen Sultana is a leading researcher in early childhood education and development. She has conducted groundbreaking research on the effectiveness of community-based ECD interventions in Bangladesh.",
    expertise: ["Research Design", "Early Childhood Education", "Community Development", "Data Analysis"],
    email: "nasreen.sultana@bracu.ac.bd",
    type: "individual" as const,
  },
  {
    id: "6",
    name: "Ms. Shahida Begum",
    title: "Advocacy Committee Chair",
    organization: "Plan International Bangladesh",
    image: "/placeholder.svg?height=80&width=80",
    bio: "Ms. Shahida Begum is a passionate advocate for children's rights with extensive experience in policy advocacy and stakeholder engagement. She has been instrumental in advancing ECD policy reforms in Bangladesh.",
    expertise: ["Policy Advocacy", "Children's Rights", "Stakeholder Engagement", "Communication"],
    email: "shahida.begum@plan-international.org",
    type: "individual" as const,
  },
]

export default function CommitteePage() {
  return (
    <div className="flex flex-col">
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Committee Members</h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Our committee is composed of distinguished professionals and experts who provide strategic guidance and
              leadership to the Bangladesh ECD Network. Each member brings unique expertise and experience to advance
              our mission.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <MemberCardGrid members={committeeMembers} />
      </div>
    </div>
  )
}
