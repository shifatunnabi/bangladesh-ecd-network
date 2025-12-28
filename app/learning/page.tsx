import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import { Search, Filter, Clock, Users, Star, Play, BookOpen } from "lucide-react"

const featuredCourses = [
  {
    id: "foundations-ecd",
    title: "Foundations of Early Childhood Development",
    description:
      "Comprehensive introduction to early childhood development principles, theories, and best practices for professionals working with young children.",
    instructor: "Dr. Rashida Ahmed",
    duration: "6 weeks",
    level: "Beginner",
    students: 245,
    rating: 4.8,
    image: "/placeholder.svg",
    badge: "Popular",
    price: "Free",
    category: "Fundamentals",
  },
  {
    id: "child-nutrition-health",
    title: "Child Nutrition and Health in Early Years",
    description:
      "Essential knowledge about nutrition, health, and physical development in early childhood, with practical applications for caregivers and professionals.",
    instructor: "Dr. Fatima Khatun",
    duration: "4 weeks",
    level: "Intermediate",
    students: 189,
    rating: 4.9,
    image: "/placeholder.svg",
    badge: "New",
    price: "Free",
    category: "Health & Nutrition",
  },
  {
    id: "parent-engagement-strategies",
    title: "Effective Parent Engagement Strategies",
    description:
      "Learn proven strategies for engaging parents and families in early childhood development programs and building strong partnerships.",
    instructor: "Ms. Shahida Begum",
    duration: "3 weeks",
    level: "Intermediate",
    students: 156,
    rating: 4.7,
    image: "/placeholder.svg",
    price: "Free",
    category: "Family Engagement",
  },
]

const allCourses = [
  ...featuredCourses,
  {
    id: "play-based-learning",
    title: "Play-Based Learning Approaches",
    description:
      "Explore the importance of play in early learning and how to implement effective play-based curricula.",
    instructor: "Prof. Mohammad Rahman",
    duration: "5 weeks",
    level: "Intermediate",
    students: 134,
    rating: 4.6,
    image: "/placeholder.svg",
    price: "Free",
    category: "Pedagogy",
  },
  {
    id: "inclusive-ecd-practices",
    title: "Inclusive Early Childhood Practices",
    description: "Learn how to create inclusive environments that support children with diverse needs and backgrounds.",
    instructor: "Dr. Salma Khatun",
    duration: "4 weeks",
    level: "Advanced",
    students: 98,
    rating: 4.8,
    image: "/placeholder.svg",
    price: "Free",
    category: "Inclusion",
  },
  {
    id: "assessment-evaluation-ecd",
    title: "Assessment and Evaluation in ECD",
    description: "Comprehensive guide to assessing child development and evaluating the effectiveness of ECD programs.",
    instructor: "Dr. Nasreen Sultana",
    duration: "6 weeks",
    level: "Advanced",
    students: 87,
    rating: 4.5,
    image: "/placeholder.svg",
    price: "Free",
    category: "Assessment",
  },
]

export default function LearningPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Learning Center</h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Enhance your knowledge and skills in early childhood development through our comprehensive online courses
              designed by leading experts in the field.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Featured Courses</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Start your learning journey with our most popular and highly-rated courses designed for ECD professionals
              at all levels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredCourses.map((course) => (
              <Card key={course.id} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="p-0">
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <Image
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {course.badge && (
                      <div className="absolute top-3 left-3">
                        <Badge variant={course.badge === "New" ? "default" : "secondary"}>{course.badge}</Badge>
                      </div>
                    )}
                    <div className="absolute top-3 right-3 bg-secondary text-secondary-foreground px-2 py-1 rounded text-sm font-medium">
                      {course.price}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">{course.category}</p>
                      <CardTitle className="text-base leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                        {course.title}
                      </CardTitle>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                    <p className="text-sm font-medium">By {course.instructor}</p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {course.duration}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {course.students}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="text-sm font-medium">{course.rating}</span>
                      </div>
                      <Badge variant="outline">{course.level}</Badge>
                    </div>
                    <Button className="w-full" asChild>
                      <Link href={`/learning/course/${course.id}`}>
                        <Play className="w-4 h-4 mr-2" />
                        Start Course
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Courses */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">All Courses</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse our complete catalog of courses covering various aspects of early childhood development.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="Search courses..." className="pl-10" />
            </div>
            <Button variant="outline" className="sm:w-auto bg-transparent">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Filter Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
              All Courses
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
              Beginner
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
              Intermediate
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
              Advanced
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
              Free
            </Badge>
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCourses.map((course) => (
              <Card key={course.id} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="p-0">
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <Image
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {course.badge && (
                      <div className="absolute top-3 left-3">
                        <Badge variant={course.badge === "New" ? "default" : "secondary"}>{course.badge}</Badge>
                      </div>
                    )}
                    <div className="absolute top-3 right-3 bg-secondary text-secondary-foreground px-2 py-1 rounded text-sm font-medium">
                      {course.price}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">{course.category}</p>
                      <CardTitle className="text-base leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                        {course.title}
                      </CardTitle>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                    <p className="text-sm font-medium">By {course.instructor}</p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {course.duration}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {course.students}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="text-sm font-medium">{course.rating}</span>
                      </div>
                      <Badge variant="outline">{course.level}</Badge>
                    </div>
                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <Link href={`/learning/course/${course.id}`}>
                        <BookOpen className="w-4 h-4 mr-2" />
                        View Course
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">15+</div>
              <div className="text-lg font-medium">Courses Available</div>
              <p className="text-muted-foreground">Expert-designed content</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">1,200+</div>
              <div className="text-lg font-medium">Students Enrolled</div>
              <p className="text-muted-foreground">Active learners</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">4.7</div>
              <div className="text-lg font-medium">Average Rating</div>
              <p className="text-muted-foreground">Student satisfaction</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">100%</div>
              <div className="text-lg font-medium">Free Access</div>
              <p className="text-muted-foreground">No cost to learners</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-foreground mb-4">Ready to Start Learning?</h2>
          <p className="text-lg text-secondary-foreground/80 max-w-2xl mx-auto mb-8">
            Join thousands of professionals who are advancing their careers and improving outcomes for children through
            our comprehensive learning programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="bg-white text-secondary hover:bg-white/90" asChild>
              <Link href="/members/join">Join Network</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 bg-transparent"
              asChild
            >
              <Link href="/learning/course/foundations-ecd">Start First Course</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
