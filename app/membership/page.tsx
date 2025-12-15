"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Users, FileText, Award, Target } from "lucide-react"
import BENMembershipForm from "@/components/ben-membership-form"

export default function MembershipPage() {
  const [activeTab, setActiveTab] = useState("about")

  const memberResponsibilities = [
    "Actively attend and participate in network meetings and events organized by the BEN Central Secretariat and Regional Hubs",
    "Represent BEN at the local level and foster strong relationships with other ECD partners",
    "Advocate for the network and help identify and recommend potential new members",
    "Participate in the Annual General Meeting (AGM) and Extra-Ordinary General Meeting (EGM) convened by the Executive Committee",
    "Maintain regular liaison with the Network Secretariat and contribute as an active ECD partner in advancing BEN's objectives",
    "Provide support in organizing local-level advocacy, communication, and promotional activities initiated by BEN",
    "Provide information and share relevant resource materials whenever required",
    "Contribute to the sustainability of BEN through financial support or voluntary services",
  ]

  const membershipBenefits = [
    "Access to the resourceful website of Bangladesh ECD Network (BEN) (www.ecd-bangladesh.net)",
    "Complimentary copies of the ECD Newsletter, BEN Directory, and other publications and promotional materials developed by the network",
    "Access to capacity development opportunities related to ECD offered by BEN itself and other member organizations, either free of charge or with cost-sharing",
    "Opportunities for training and orientation organized by the network or in collaboration with partner organizations and institutions",
    "Invitations to participate in regional and national conferences, seminars, webinars, technical meetings, and workshops",
    "Access to the collective expertise of the ECD community in Bangladesh through technical assistance, tailored responses to information requests, formal and informal discussions, and periodic written updates",
    "Guidance on funding opportunities for planning and implementing ECD programmes",
    "Access to technical resources and materials developed by the network at subsidized or cost-price rates",
  ]

  const eligibilityCriteria = [
    "Provides ECD services",
    "Engages in advocacy",
    "Provides training",
    "Develops learning and training materials",
    "Provides or mobilizes funds",
    "Conducts research and studies",
    "Conducts mass awareness campaigns and other communication activities",
    "Contributes to formulating policy, standards, plans and programs, and systems development in relation to ECD",
  ]

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

      {/* About BEN Membership */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="benefits">Benefits</TabsTrigger>
                <TabsTrigger value="eligibility">Who Can Apply</TabsTrigger>
                <TabsTrigger value="process">Process</TabsTrigger>
              </TabsList>

              {/* About Tab */}
              <TabsContent value="about" className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-6">About BEN Membership</h2>
                  
                  <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
                    <h3 className="text-xl font-semibold text-primary mb-4">Who are BEN Members?</h3>
                    <p className="text-gray-700 leading-relaxed">
                      BEN, a forum of organizations working for Early Childhood Development (ECD) in Bangladesh, comprises a variety of organizations, including Government agencies, UN agencies, academic institutes, research institutes, national and international organizations, and local NGOs, all engaged in promoting ECD.
                    </p>
                  </div>

                  <div className="bg-white p-8 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold text-primary mb-6">Responsibilities of Members</h3>
                    <ul className="space-y-3">
                      {memberResponsibilities.map((responsibility, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>

              {/* Benefits Tab */}
              <TabsContent value="benefits" className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Benefits of Membership</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {membershipBenefits.map((benefit, index) => (
                      <Card key={index} className="border-l-4 border-l-primary">
                        <CardContent className="pt-6">
                          <div className="flex gap-3">
                            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <p className="text-gray-700">{benefit}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Eligibility Tab */}
              <TabsContent value="eligibility" className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Who Can Apply for Membership?</h2>
                  
                  <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
                    <p className="text-gray-700 leading-relaxed mb-6">
                      Any organization, institution, agency, sectoral department, network, forum, or corporate body that promotes the holistic development of young children from conception to transition into primary education will be eligible to apply for membership of the Bangladesh ECD Network (BEN).
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-6 font-medium">
                      Interested organizations will have to fulfill one or more of the following specific criteria related to holistic development, including cognitive, linguistic, emotional, and social development of young children in Bangladesh:
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {eligibilityCriteria.map((criterion, index) => (
                      <Card key={index}>
                        <CardContent className="pt-6">
                          <div className="flex gap-3">
                            <Target className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <p className="text-gray-700 font-medium">{criterion}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Process Tab */}
              <TabsContent value="process" className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Membership Process</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-white p-8 rounded-lg shadow-sm border-l-4 border-l-primary">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold">
                            1
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">Application</h3>
                          <p className="text-gray-700">
                            Interested organizations that meet the criteria set by the network can apply online for membership.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-8 rounded-lg shadow-sm border-l-4 border-l-primary">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold">
                            2
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">Review</h3>
                          <p className="text-gray-700">
                            The executive committee will review all membership applications and make decisions regarding all membership and the fulfillment of eligibility for different categories of membership.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-8 rounded-lg shadow-sm border-l-4 border-l-primary">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold">
                            3
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">Notification</h3>
                          <p className="text-gray-700">
                            The selected members will be notified by e-mail or mail about membership decisions.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mt-8">
                      <p className="text-sm text-gray-700 mb-3">
                        <span className="font-semibold">Important Notes:</span>
                      </p>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li>• Political, religious, cultural, or ethnic identity, values, or beliefs are not considered in offering or denying membership.</li>
                        <li>• Inability to continue working on ECD for a long period of time will lead to discontinuation of membership at the Executive Committee's discretion.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Membership Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <BENMembershipForm />
        </div>
      </section>
    </div>
  )
}
