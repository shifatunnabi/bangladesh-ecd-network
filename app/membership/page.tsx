"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, FileText, CheckCircle, Mail, Building, User } from "lucide-react"

export default function MembershipPage() {
  const [activeTab, setActiveTab] = useState("individual")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Join Our Network</h1>
            <p className="text-xl text-blue-100">
              Become part of Bangladesh's leading early childhood development community
            </p>
          </div>
        </div>
      </section>

      {/* Membership Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Membership Benefits</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Card className="text-center">
                <CardHeader>
                  <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-lg">Networking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Connect with ECD professionals across Bangladesh</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-lg">Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Access exclusive research and policy documents</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-lg">Training</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Participate in professional development programs</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-lg">Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Receive regular newsletters and event notifications</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">Membership Application</CardTitle>
                <CardDescription className="text-center">
                  Choose your membership type and fill out the application form
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="individual" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Individual Membership
                    </TabsTrigger>
                    <TabsTrigger value="organizational" className="flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      Organizational Membership
                    </TabsTrigger>
                  </TabsList>

                  {/* Individual Membership Form */}
                  <TabsContent value="individual" className="space-y-6">
                    <form className="space-y-8">
                      {/* Personal Information */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-primary border-b border-blue-200 pb-2">
                          Personal Information
                        </h3>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="firstName">First Name *</Label>
                            <Input
                              id="firstName"
                              required
                              className="mt-1 border-2 border-gray-300 focus:border-primary"
                            />
                          </div>
                          <div>
                            <Label htmlFor="middleName">Middle Name</Label>
                            <Input id="middleName" className="mt-1 border-2 border-gray-300 focus:border-primary" />
                          </div>
                          <div>
                            <Label htmlFor="lastName">Last Name *</Label>
                            <Input
                              id="lastName"
                              required
                              className="mt-1 border-2 border-gray-300 focus:border-primary"
                            />
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="email">Email Address *</Label>
                            <Input
                              id="email"
                              type="email"
                              required
                              className="mt-1 border-2 border-gray-300 focus:border-primary"
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone">Phone Number *</Label>
                            <Input id="phone" required className="mt-1 border-2 border-gray-300 focus:border-primary" />
                          </div>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="dateOfBirth">Date of Birth</Label>
                            <Input
                              id="dateOfBirth"
                              type="date"
                              className="mt-1 border-2 border-gray-300 focus:border-primary"
                            />
                          </div>
                          <div>
                            <Label htmlFor="gender">Gender</Label>
                            <Select>
                              <SelectTrigger className="mt-1 border-2 border-gray-300 focus:border-primary">
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                                <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="nationality">Nationality</Label>
                            <Input
                              id="nationality"
                              defaultValue="Bangladeshi"
                              className="mt-1 border-2 border-gray-300 focus:border-primary"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Address Information */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-primary border-b border-blue-200 pb-2">
                          Address Information
                        </h3>
                        <div>
                          <Label htmlFor="address">Street Address *</Label>
                          <Input id="address" required className="mt-1 border-2 border-gray-300 focus:border-primary" />
                        </div>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="city">City *</Label>
                            <Input id="city" required className="mt-1 border-2 border-gray-300 focus:border-primary" />
                          </div>
                          <div>
                            <Label htmlFor="district">District *</Label>
                            <Input
                              id="district"
                              required
                              className="mt-1 border-2 border-gray-300 focus:border-primary"
                            />
                          </div>
                          <div>
                            <Label htmlFor="postalCode">Postal Code</Label>
                            <Input id="postalCode" className="mt-1 border-2 border-gray-300 focus:border-primary" />
                          </div>
                        </div>
                      </div>

                      {/* Professional Information */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-primary border-b border-blue-200 pb-2">
                          Professional Information
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="organization">Current Organization *</Label>
                            <Input
                              id="organization"
                              required
                              className="mt-1 border-2 border-gray-300 focus:border-primary"
                            />
                          </div>
                          <div>
                            <Label htmlFor="position">Position/Title *</Label>
                            <Input
                              id="position"
                              required
                              className="mt-1 border-2 border-gray-300 focus:border-primary"
                            />
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="sector">Sector *</Label>
                            <Select>
                              <SelectTrigger className="mt-1 border-2 border-gray-300 focus:border-primary">
                                <SelectValue placeholder="Select sector" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="government">Government</SelectItem>
                                <SelectItem value="ngo">NGO/Non-profit</SelectItem>
                                <SelectItem value="academic">Academic/Research</SelectItem>
                                <SelectItem value="private">Private Sector</SelectItem>
                                <SelectItem value="international">International Organization</SelectItem>
                                <SelectItem value="healthcare">Healthcare</SelectItem>
                                <SelectItem value="education">Education</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="experience">Years of Experience in ECD</Label>
                            <Select>
                              <SelectTrigger className="mt-1 border-2 border-gray-300 focus:border-primary">
                                <SelectValue placeholder="Select experience" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="0-1">0-1 years</SelectItem>
                                <SelectItem value="2-3">2-3 years</SelectItem>
                                <SelectItem value="4-6">4-6 years</SelectItem>
                                <SelectItem value="7-10">7-10 years</SelectItem>
                                <SelectItem value="11-15">11-15 years</SelectItem>
                                <SelectItem value="15+">15+ years</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="education">Highest Education Level</Label>
                            <Select>
                              <SelectTrigger className="mt-1 border-2 border-gray-300 focus:border-primary">
                                <SelectValue placeholder="Select education level" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                                <SelectItem value="master">Master's Degree</SelectItem>
                                <SelectItem value="phd">PhD/Doctorate</SelectItem>
                                <SelectItem value="diploma">Diploma</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="workLocation">Primary Work Location</Label>
                            <Input
                              id="workLocation"
                              placeholder="City, District"
                              className="mt-1 border-2 border-gray-300 focus:border-primary"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Areas of Interest */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-primary border-b border-blue-200 pb-2">
                          Areas of Interest & Expertise
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="health" />
                              <Label htmlFor="health">Health & Nutrition</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="education" />
                              <Label htmlFor="education">Early Learning & Education</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="protection" />
                              <Label htmlFor="protection">Child Protection & Safety</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="policy" />
                              <Label htmlFor="policy">Policy & Advocacy</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="research" />
                              <Label htmlFor="research">Research & Evaluation</Label>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="training" />
                              <Label htmlFor="training">Training & Capacity Building</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="parenting" />
                              <Label htmlFor="parenting">Parenting Support</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="disability" />
                              <Label htmlFor="disability">Inclusive ECD</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="mental-health" />
                              <Label htmlFor="mental-health">Mental Health & Wellbeing</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="community" />
                              <Label htmlFor="community">Community Engagement</Label>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Languages */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-primary border-b border-blue-200 pb-2">Languages</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="primaryLanguage">Primary Language</Label>
                            <Input
                              id="primaryLanguage"
                              defaultValue="Bengali"
                              className="mt-1 border-2 border-gray-300 focus:border-primary"
                            />
                          </div>
                          <div>
                            <Label htmlFor="otherLanguages">Other Languages (comma separated)</Label>
                            <Input
                              id="otherLanguages"
                              placeholder="English, Hindi, etc."
                              className="mt-1 border-2 border-gray-300 focus:border-primary"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Additional Information */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-primary border-b border-blue-200 pb-2">
                          Additional Information
                        </h3>
                        <div>
                          <Label htmlFor="motivation">Why do you want to join the Bangladesh ECD Network? *</Label>
                          <Textarea
                            id="motivation"
                            rows={4}
                            required
                            className="mt-1 border-2 border-gray-300 focus:border-primary"
                          />
                        </div>
                        <div>
                          <Label htmlFor="contribution">How can you contribute to the network?</Label>
                          <Textarea
                            id="contribution"
                            rows={4}
                            className="mt-1 border-2 border-gray-300 focus:border-primary"
                          />
                        </div>
                        <div>
                          <Label htmlFor="expectations">What do you hope to gain from this membership?</Label>
                          <Textarea
                            id="expectations"
                            rows={3}
                            className="mt-1 border-2 border-gray-300 focus:border-primary"
                          />
                        </div>
                      </div>

                      {/* Agreement */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-primary border-b border-blue-200 pb-2">
                          Agreement & Consent
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-start space-x-2">
                            <Checkbox id="terms" required />
                            <Label htmlFor="terms" className="text-sm leading-relaxed">
                              I agree to the terms and conditions of membership and commit to actively participate in
                              network activities *
                            </Label>
                          </div>
                          <div className="flex items-start space-x-2">
                            <Checkbox id="newsletter" />
                            <Label htmlFor="newsletter" className="text-sm leading-relaxed">
                              I would like to receive newsletters and updates from the Bangladesh ECD Network
                            </Label>
                          </div>
                          <div className="flex items-start space-x-2">
                            <Checkbox id="dataConsent" required />
                            <Label htmlFor="dataConsent" className="text-sm leading-relaxed">
                              I consent to the collection and processing of my personal data for membership purposes *
                            </Label>
                          </div>
                        </div>
                      </div>

                      <Button type="submit" size="lg" className="w-full">
                        Submit Individual Membership Application
                      </Button>
                    </form>
                  </TabsContent>

                  {/* Organizational Membership Form */}
                  <TabsContent value="organizational" className="space-y-6">
                    <form className="space-y-8">
                      {/* Organization Information */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-primary border-b border-blue-200 pb-2">
                          Organization Information
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="orgName">Organization Name *</Label>
                            <Input
                              id="orgName"
                              required
                              className="mt-1 border-2 border-gray-300 focus:border-primary"
                            />
                          </div>
                          <div>
                            <Label htmlFor="orgType">Organization Type *</Label>
                            <Select>
                              <SelectTrigger className="mt-1 border-2 border-gray-300 focus:border-primary">
                                <SelectValue placeholder="Select organization type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ngo">NGO/Non-profit</SelectItem>
                                <SelectItem value="government">Government Agency</SelectItem>
                                <SelectItem value="academic">Academic Institution</SelectItem>
                                <SelectItem value="research">Research Institute</SelectItem>
                                <SelectItem value="private">Private Company</SelectItem>
                                <SelectItem value="international">International Organization</SelectItem>
                                <SelectItem value="foundation">Foundation</SelectItem>
                                <SelectItem value="hospital">Hospital/Healthcare</SelectItem>
                                <SelectItem value="school">School/Educational Institution</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="registrationNumber">Registration Number</Label>
                            <Input
                              id="registrationNumber"
                              className="mt-1 border-2 border-gray-300 focus:border-primary"
                            />
                          </div>
                          <div>
                            <Label htmlFor="establishedYear">Year Established</Label>
                            <Input
                              id="establishedYear"
                              type="number"
                              min="1900"
                              max="2024"
                              className="mt-1 border-2 border-gray-300 focus:border-primary"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="orgWebsite">Website</Label>
                          <Input
                            id="orgWebsite"
                            type="url"
                            placeholder="https://"
                            className="mt-1 border-2 border-gray-300 focus:border-primary"
                          />
                        </div>
                      </div>

                      {/* Organization Address */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-primary border-b border-blue-200 pb-2">
                          Organization Address
                        </h3>
                        <div>
                          <Label htmlFor="orgAddress">Street Address *</Label>
                          <Input
                            id="orgAddress"
                            required
                            className="mt-1 border-2 border-gray-300 focus:border-primary"
                          />
                        </div>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="orgCity">City *</Label>
                            <Input
                              id="orgCity"
                              required
                              className="mt-1 border-2 border-gray-300 focus:border-primary"
                            />
                          </div>
                          <div>
                            <Label htmlFor="orgDistrict">District *</Label>
                            <Input
                              id="orgDistrict"
                              required
                              className="mt-1 border-2 border-gray-300 focus:border-primary"
                            />
                          </div>
                          <div>
                            <Label htmlFor="orgPostalCode">Postal Code</Label>
                            <Input id="orgPostalCode" className="mt-1 border-2 border-gray-300 focus:border-primary" />
                          </div>
                        </div>
                      </div>

                      {/* Primary Contact Person */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-primary border-b border-blue-200 pb-2">
                          Primary Contact Person
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="contactFirstName">First Name *</Label>
                            <Input
                              id="contactFirstName"
                              required
                              className="mt-1 border-2 border-gray-300 focus:border-primary"
                            />
                          </div>
                          <div>
                            <Label htmlFor="contactLastName">Last Name *</Label>
                            <Input
                              id="contactLastName"
                              required
                              className="mt-1 border-2 border-gray-300 focus:border-primary"
                            />
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="contactPosition">Position/Title *</Label>
                            <Input
                              id="contactPosition"
                              required
                              className="mt-1 border-2 border-gray-300 focus:border-primary"
                            />
                          </div>
                          <div>
                            <Label htmlFor="contactDepartment">Department</Label>
                            <Input
                              id="contactDepartment"
                              className="mt-1 border-2 border-gray-300 focus:border-primary"
                            />
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="contactEmail">Email Address *</Label>
                            <Input
                              id="contactEmail"
                              type="email"
                              required
                              className="mt-1 border-2 border-gray-300 focus:border-primary"
                            />
                          </div>
                          <div>
                            <Label htmlFor="contactPhone">Phone Number *</Label>
                            <Input
                              id="contactPhone"
                              required
                              className="mt-1 border-2 border-gray-300 focus:border-primary"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Organization Details */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-primary border-b border-blue-200 pb-2">
                          Organization Details
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="staffSize">Number of Staff</Label>
                            <Select>
                              <SelectTrigger className="mt-1 border-2 border-gray-300 focus:border-primary">
                                <SelectValue placeholder="Select staff size" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1-5">1-5 staff</SelectItem>
                                <SelectItem value="6-20">6-20 staff</SelectItem>
                                <SelectItem value="21-50">21-50 staff</SelectItem>
                                <SelectItem value="51-100">51-100 staff</SelectItem>
                                <SelectItem value="101-500">101-500 staff</SelectItem>
                                <SelectItem value="500+">500+ staff</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="annualBudget">Annual Budget (BDT)</Label>
                            <Select>
                              <SelectTrigger className="mt-1 border-2 border-gray-300 focus:border-primary">
                                <SelectValue placeholder="Select budget range" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="under-1m">Under 1 Million</SelectItem>
                                <SelectItem value="1m-5m">1-5 Million</SelectItem>
                                <SelectItem value="5m-10m">5-10 Million</SelectItem>
                                <SelectItem value="10m-50m">10-50 Million</SelectItem>
                                <SelectItem value="50m-100m">50-100 Million</SelectItem>
                                <SelectItem value="100m+">100+ Million</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="serviceAreas">Geographic Service Areas</Label>
                          <Input
                            id="serviceAreas"
                            placeholder="Districts/Regions where you operate"
                            className="mt-1 border-2 border-gray-300 focus:border-primary"
                          />
                        </div>
                      </div>

                      {/* ECD Focus Areas & Services */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-primary border-b border-blue-200 pb-2">
                          ECD Focus Areas & Services
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="orgHealth" />
                              <Label htmlFor="orgHealth">Health & Nutrition Services</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="orgEducation" />
                              <Label htmlFor="orgEducation">Early Learning Programs</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="orgProtection" />
                              <Label htmlFor="orgProtection">Child Protection Services</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="orgPolicy" />
                              <Label htmlFor="orgPolicy">Policy Development & Advocacy</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="orgResearch" />
                              <Label htmlFor="orgResearch">Research & Evaluation</Label>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="orgTraining" />
                              <Label htmlFor="orgTraining">Training & Capacity Building</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="orgParenting" />
                              <Label htmlFor="orgParenting">Parenting Support Programs</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="orgDisability" />
                              <Label htmlFor="orgDisability">Inclusive ECD Services</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="orgMentalHealth" />
                              <Label htmlFor="orgMentalHealth">Mental Health Support</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="orgCommunity" />
                              <Label htmlFor="orgCommunity">Community Mobilization</Label>
                            </div>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="targetPopulation">Target Population</Label>
                          <Textarea
                            id="targetPopulation"
                            rows={3}
                            placeholder="Describe the children and families you serve"
                            className="mt-1 border-2 border-gray-300 focus:border-primary"
                          />
                        </div>
                      </div>

                      {/* Experience & Achievements */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-primary border-b border-blue-200 pb-2">
                          Experience & Achievements
                        </h3>
                        <div>
                          <Label htmlFor="ecdExperience">Years of Experience in ECD</Label>
                          <Select>
                            <SelectTrigger className="mt-1 border-2 border-gray-300 focus:border-primary">
                              <SelectValue placeholder="Select experience" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0-2">0-2 years</SelectItem>
                              <SelectItem value="3-5">3-5 years</SelectItem>
                              <SelectItem value="6-10">6-10 years</SelectItem>
                              <SelectItem value="11-15">11-15 years</SelectItem>
                              <SelectItem value="15+">15+ years</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="keyAchievements">Key Achievements in ECD</Label>
                          <Textarea
                            id="keyAchievements"
                            rows={4}
                            placeholder="Describe your organization's major accomplishments in ECD"
                            className="mt-1 border-2 border-gray-300 focus:border-primary"
                          />
                        </div>
                        <div>
                          <Label htmlFor="currentProjects">Current ECD Projects/Programs</Label>
                          <Textarea
                            id="currentProjects"
                            rows={4}
                            placeholder="Describe your ongoing ECD initiatives"
                            className="mt-1 border-2 border-gray-300 focus:border-primary"
                          />
                        </div>
                      </div>

                      {/* Partnership & Collaboration */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-primary border-b border-blue-200 pb-2">
                          Partnership & Collaboration
                        </h3>
                        <div>
                          <Label htmlFor="currentPartners">Current Partners</Label>
                          <Textarea
                            id="currentPartners"
                            rows={3}
                            placeholder="List your key partners and collaborators"
                            className="mt-1 border-2 border-gray-300 focus:border-primary"
                          />
                        </div>
                        <div>
                          <Label htmlFor="networkMotivation">
                            Why does your organization want to join the Bangladesh ECD Network? *
                          </Label>
                          <Textarea
                            id="networkMotivation"
                            rows={4}
                            required
                            className="mt-1 border-2 border-gray-300 focus:border-primary"
                          />
                        </div>
                        <div>
                          <Label htmlFor="networkContribution">
                            How can your organization contribute to the network?
                          </Label>
                          <Textarea
                            id="networkContribution"
                            rows={4}
                            className="mt-1 border-2 border-gray-300 focus:border-primary"
                          />
                        </div>
                        <div>
                          <Label htmlFor="collaborationInterest">
                            What types of collaboration are you most interested in?
                          </Label>
                          <Textarea
                            id="collaborationInterest"
                            rows={3}
                            className="mt-1 border-2 border-gray-300 focus:border-primary"
                          />
                        </div>
                      </div>

                      {/* Agreement */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-primary border-b border-blue-200 pb-2">
                          Agreement & Consent
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-start space-x-2">
                            <Checkbox id="orgTerms" required />
                            <Label htmlFor="orgTerms" className="text-sm leading-relaxed">
                              Our organization agrees to the terms and conditions of membership and commits to actively
                              participate in network activities *
                            </Label>
                          </div>
                          <div className="flex items-start space-x-2">
                            <Checkbox id="orgNewsletter" />
                            <Label htmlFor="orgNewsletter" className="text-sm leading-relaxed">
                              We would like to receive newsletters and updates from the Bangladesh ECD Network
                            </Label>
                          </div>
                          <div className="flex items-start space-x-2">
                            <Checkbox id="orgDataConsent" required />
                            <Label htmlFor="orgDataConsent" className="text-sm leading-relaxed">
                              We consent to the collection and processing of our organization's data for membership
                              purposes *
                            </Label>
                          </div>
                          <div className="flex items-start space-x-2">
                            <Checkbox id="orgAuthority" required />
                            <Label htmlFor="orgAuthority" className="text-sm leading-relaxed">
                              I have the authority to submit this application on behalf of my organization *
                            </Label>
                          </div>
                        </div>
                      </div>

                      <Button type="submit" size="lg" className="w-full">
                        Submit Organizational Membership Application
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
