"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import {
  Play,
  Clock,
  CheckCircle,
  Circle,
  FileText,
  Video,
  HelpCircle,
  Download,
  ChevronRight,
  BookOpen,
} from "lucide-react"

// Mock course data - in a real app, this would come from an API
const courseData = {
  "foundations-ecd": {
    title: "Foundations of Early Childhood Development",
    description:
      "Comprehensive introduction to early childhood development principles, theories, and best practices for professionals working with young children.",
    instructor: "Dr. Rashida Ahmed",
    duration: "6 weeks",
    level: "Beginner",
    students: 245,
    rating: 4.8,
    image: "/placeholder.svg?height=300&width=500",
    category: "Fundamentals",
    overview:
      "This course provides a comprehensive foundation in early childhood development, covering key theories, developmental milestones, and evidence-based practices. Participants will gain essential knowledge about child development from birth to age 8, learning how to support optimal growth and learning in young children.",
    learningOutcomes: [
      "Understand key theories of child development",
      "Identify developmental milestones across domains",
      "Apply evidence-based practices in ECD settings",
      "Recognize factors that influence child development",
      "Design developmentally appropriate activities",
    ],
    curriculum: [
      {
        id: 1,
        title: "Introduction to Early Childhood Development",
        type: "video",
        duration: "45 min",
        completed: true,
        lessons: [
          { id: "1-1", title: "Welcome and Course Overview", type: "video", duration: "10 min", completed: true },
          {
            id: "1-2",
            title: "What is Early Childhood Development?",
            type: "video",
            duration: "20 min",
            completed: true,
          },
          { id: "1-3", title: "Why ECD Matters", type: "text", duration: "15 min", completed: true },
        ],
      },
      {
        id: 2,
        title: "Theoretical Foundations",
        type: "video",
        duration: "60 min",
        completed: true,
        lessons: [
          {
            id: "2-1",
            title: "Piaget's Cognitive Development Theory",
            type: "video",
            duration: "25 min",
            completed: true,
          },
          {
            id: "2-2",
            title: "Vygotsky's Social Development Theory",
            type: "video",
            duration: "20 min",
            completed: true,
          },
          { id: "2-3", title: "Attachment Theory", type: "text", duration: "15 min", completed: true },
        ],
      },
      {
        id: 3,
        title: "Physical Development",
        type: "video",
        duration: "50 min",
        completed: false,
        current: true,
        lessons: [
          {
            id: "3-1",
            title: "Motor Development Milestones",
            type: "video",
            duration: "20 min",
            completed: false,
            current: true,
          },
          { id: "3-2", title: "Health and Nutrition", type: "video", duration: "20 min", completed: false },
          { id: "3-3", title: "Physical Activity and Play", type: "text", duration: "10 min", completed: false },
        ],
      },
      {
        id: 4,
        title: "Cognitive Development",
        type: "video",
        duration: "55 min",
        completed: false,
        lessons: [
          { id: "4-1", title: "Brain Development in Early Years", type: "video", duration: "25 min", completed: false },
          { id: "4-2", title: "Language and Communication", type: "video", duration: "20 min", completed: false },
          { id: "4-3", title: "Early Literacy and Numeracy", type: "text", duration: "10 min", completed: false },
        ],
      },
      {
        id: 5,
        title: "Social-Emotional Development",
        type: "video",
        duration: "45 min",
        completed: false,
        lessons: [
          { id: "5-1", title: "Emotional Regulation", type: "video", duration: "20 min", completed: false },
          { id: "5-2", title: "Social Skills Development", type: "video", duration: "15 min", completed: false },
          { id: "5-3", title: "Building Relationships", type: "text", duration: "10 min", completed: false },
        ],
      },
      {
        id: 6,
        title: "Assessment and Application",
        type: "quiz",
        duration: "30 min",
        completed: false,
        lessons: [
          { id: "6-1", title: "Developmental Assessment Tools", type: "text", duration: "15 min", completed: false },
          { id: "6-2", title: "Final Quiz", type: "quiz", duration: "15 min", completed: false },
        ],
      },
    ],
  },
}

interface CoursePageProps {
  params: {
    id: string
  }
}

export default function CoursePage({ params }: CoursePageProps) {
  const [currentLesson, setCurrentLesson] = useState("3-1")
  const course = courseData[params.id as keyof typeof courseData]

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-primary mb-4">Course Not Found</h1>
        <p className="text-muted-foreground">The course you're looking for doesn't exist.</p>
      </div>
    )
  }

  const completedLessons = course.curriculum.reduce(
    (total, module) => total + module.lessons.filter((lesson) => lesson.completed).length,
    0,
  )
  const totalLessons = course.curriculum.reduce((total, module) => total + module.lessons.length, 0)
  const progressPercentage = (completedLessons / totalLessons) * 100

  const getCurrentLesson = () => {
    for (const module of course.curriculum) {
      const lesson = module.lessons.find((l) => l.id === currentLesson)
      if (lesson) return lesson
    }
    return course.curriculum[0].lessons[0]
  }

  const currentLessonData = getCurrentLesson()

  return (
    <div className="min-h-screen bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-0">
        {/* Sidebar - Curriculum */}
        <div className="lg:col-span-1 bg-muted/30 border-r min-h-screen">
          <div className="p-6 border-b">
            <h2 className="font-bold text-lg mb-2">{course.title}</h2>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Progress</span>
                <span>
                  {completedLessons}/{totalLessons}
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
              <p className="text-xs text-muted-foreground">{Math.round(progressPercentage)}% complete</p>
            </div>
          </div>

          <div className="p-4">
            <div className="space-y-4">
              {course.curriculum.map((module) => (
                <div key={module.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-sm">{module.title}</h3>
                    <div className="flex items-center">
                      {module.completed ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : module.current ? (
                        <Circle className="w-4 h-4 text-primary" />
                      ) : (
                        <Circle className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                  </div>

                  <div className="ml-4 space-y-1">
                    {module.lessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        onClick={() => setCurrentLesson(lesson.id)}
                        className={`w-full text-left p-2 rounded text-xs hover:bg-accent transition-colors ${
                          currentLesson === lesson.id ? "bg-accent" : ""
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {lesson.type === "video" && <Video className="w-3 h-3" />}
                            {lesson.type === "text" && <FileText className="w-3 h-3" />}
                            {lesson.type === "quiz" && <HelpCircle className="w-3 h-3" />}
                            <span className="line-clamp-1">{lesson.title}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="text-muted-foreground">{lesson.duration}</span>
                            {lesson.completed ? (
                              <CheckCircle className="w-3 h-3 text-green-500" />
                            ) : 'current' in lesson && lesson.current ? (
                              <Circle className="w-3 h-3 text-primary" />
                            ) : (
                              <Circle className="w-3 h-3 text-muted-foreground" />
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Course Header */}
          <div className="border-b bg-background">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-primary mb-2">{currentLessonData.title}</h1>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {currentLessonData.duration}
                    </div>
                    <div className="flex items-center">
                      {currentLessonData.type === "video" && <Video className="w-4 h-4 mr-1" />}
                      {currentLessonData.type === "text" && <FileText className="w-4 h-4 mr-1" />}
                      {currentLessonData.type === "quiz" && <HelpCircle className="w-4 h-4 mr-1" />}
                      {currentLessonData.type.charAt(0).toUpperCase() + currentLessonData.type.slice(1)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Resources
                  </Button>
                  <Button size="sm">
                    Mark Complete
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Lesson Content */}
          <div className="p-6">
            {currentLessonData.type === "video" && (
              <div className="space-y-6">
                <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                  <Image
                    src={course.image || "/placeholder.svg"}
                    alt={currentLessonData.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button size="lg" className="rounded-full w-16 h-16">
                      <Play className="w-6 h-6" />
                    </Button>
                  </div>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Lesson Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      In this lesson, we'll explore the fundamental concepts of motor development in early childhood.
                      You'll learn about gross and fine motor skills, typical developmental milestones, and how to
                      support children's physical development through appropriate activities and environments.
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}

            {currentLessonData.type === "text" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <BookOpen className="w-5 h-5 mr-2" />
                      Reading Material
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="prose max-w-none">
                    <h3>Understanding Motor Development</h3>
                    <p>
                      Motor development refers to the progressive acquisition of movement skills and the underlying
                      changes in motor behavior throughout the lifespan. In early childhood, this development is
                      particularly rapid and forms the foundation for many other areas of development.
                    </p>

                    <h4>Gross Motor Skills</h4>
                    <p>
                      Gross motor skills involve the large muscles of the body and include activities such as walking,
                      running, jumping, and climbing. These skills develop in a predictable sequence, with children
                      typically achieving major milestones at similar ages.
                    </p>

                    <h4>Fine Motor Skills</h4>
                    <p>
                      Fine motor skills involve the small muscles of the hands and fingers and are essential for tasks
                      such as writing, drawing, and manipulating small objects. These skills develop more gradually and
                      require significant practice and refinement.
                    </p>

                    <h4>Supporting Motor Development</h4>
                    <p>
                      Caregivers and educators can support motor development by providing appropriate opportunities for
                      movement, ensuring safe environments for exploration, and offering activities that challenge
                      children at their developmental level.
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}

            {currentLessonData.type === "quiz" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <HelpCircle className="w-5 h-5 mr-2" />
                      Knowledge Check
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium mb-3">Question 1 of 5</h4>
                        <p className="mb-4">
                          Which of the following is considered a gross motor skill in early childhood development?
                        </p>
                        <div className="space-y-2">
                          <Button variant="outline" className="w-full justify-start bg-transparent">
                            A) Drawing with crayons
                          </Button>
                          <Button variant="outline" className="w-full justify-start bg-transparent">
                            B) Running and jumping
                          </Button>
                          <Button variant="outline" className="w-full justify-start bg-transparent">
                            C) Buttoning clothes
                          </Button>
                          <Button variant="outline" className="w-full justify-start bg-transparent">
                            D) Using scissors
                          </Button>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <Button variant="outline">Previous Question</Button>
                        <Button>Next Question</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
