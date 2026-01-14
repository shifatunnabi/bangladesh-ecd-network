"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Printer, Download, Check, X } from "lucide-react"

interface FullApplication {
    _id: string
    sectionA: {
        organizationName: string
        abbreviation?: string
        yearEstablished?: string
        organizationType?: string
        headOfficeAddress?: {
            fullAddress?: string
            upazila?: string
            district?: string
            division?: string
            contactNumber?: string
            email?: string
            website?: string
        }
        headOfOrganization?: {
            name?: string
            designation?: string
            contactNumber?: string
            email?: string
            skypeId?: string
        }
        focalPersonECD?: {
            name?: string
            designation?: string
            contactNumber?: string
            email?: string
            skypeId?: string
        }
        majorActivities?: string[]
        targetNeeds?: string[]
        registration?: {
            authority?: string[]
            registrationNumber?: string
            yearOfRegistration?: string
        }
    }
    program0to3?: any
    program3to5?: any
    program5to6?: any
    program6to8?: any
    sectionB?: {
        briefDescription?: string
        keyActivities?: string
        scopeOfWork?: string
        keyTargetPopulation?: string
        keyAchievements?: string
        keyPartners?: string
        academicProgram?: { hasProgram?: boolean; description?: string }
        researchActivities?: { hasProgram?: boolean; description?: string }
    }
    sectionD?: {
        training?: {
            hasOwnSystem?: boolean
            trainers0to3?: boolean
            trainers3to5?: boolean
            trainers5to6?: boolean
            trainers6to8?: boolean
            totalTrainers?: { total?: string; male?: string; female?: string }
        }
        supervisionAndMonitoring?: { hasOwnSystem?: boolean; numberOfSupervisors?: string }
        funding?: string[]
        implementingPartner?: { implementationType?: string; partnerNames?: string }
    }
    sectionE?: {
        motivation?: string
        jointActivities?: string
        contribution?: string
    }
    sectionF?: {
        name?: string
        designation?: string
        organization?: string
        contactNumber?: string
        email?: string
        skypeId?: string
        dateOfSubmission?: string
    }
    status: "pending" | "approved" | "rejected"
    adminNotes?: string
    createdAt: string
    updatedAt: string
}

export default function ApplicationDetailPage() {
    const params = useParams()
    const router = useRouter()
    const printRef = useRef<HTMLDivElement>(null)
    const [application, setApplication] = useState<FullApplication | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (params.id) {
            fetchApplication(params.id as string)
        }
    }, [params.id])

    const fetchApplication = async (id: string) => {
        try {
            const res = await fetch(`/api/admin/applications/${id}`)
            if (res.ok) {
                const data = await res.json()
                setApplication(data)
            }
        } catch (error) {
            console.error("Error fetching application:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const handlePrint = () => {
        window.print()
    }

    const handleDownloadPDF = async () => {
        // Use browser's print to PDF functionality
        const printWindow = window.open('', '_blank')
        if (!printWindow) {
            alert('Please allow popups to download PDF')
            return
        }

        const content = printRef.current?.innerHTML || ''

        printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>BEN Membership Application - ${application?.sectionA?.organizationName}</title>
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: Arial, sans-serif; padding: 40px; line-height: 1.6; color: #333; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #1a365d; padding-bottom: 20px; }
            .header h1 { color: #1a365d; font-size: 24px; margin-bottom: 5px; }
            .header p { color: #666; font-size: 12px; }
            .section { margin-bottom: 25px; page-break-inside: avoid; }
            .section-title { background: #f0f4f8; padding: 10px 15px; font-weight: bold; color: #1a365d; font-size: 14px; margin-bottom: 15px; border-left: 4px solid #1a365d; }
            .field-row { display: flex; margin-bottom: 8px; font-size: 13px; }
            .field-label { font-weight: 600; color: #555; min-width: 200px; }
            .field-value { flex: 1; }
            .subsection { margin-left: 15px; margin-bottom: 15px; padding: 10px; background: #fafafa; border-radius: 4px; }
            .subsection-title { font-weight: 600; color: #333; margin-bottom: 10px; font-size: 13px; }
            .status-badge { display: inline-block; padding: 4px 12px; border-radius: 4px; font-size: 12px; font-weight: 600; }
            .status-pending { background: #fef3cd; color: #856404; }
            .status-approved { background: #d4edda; color: #155724; }
            .status-rejected { background: #f8d7da; color: #721c24; }
            .footer { margin-top: 40px; text-align: center; font-size: 11px; color: #888; border-top: 1px solid #ddd; padding-top: 20px; }
            @media print { body { padding: 20px; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Bangladesh ECD Network (BEN)</h1>
            <p>Membership Application Form</p>
          </div>
          ${content}
          <div class="footer">
            <p>Generated on ${new Date().toLocaleString()}</p>
            <p>Bangladesh ECD Network Secretariat: BRAC Institute of Educational Development (BRAC IED)</p>
          </div>
        </body>
      </html>
    `)

        printWindow.document.close()
        printWindow.focus()

        setTimeout(() => {
            printWindow.print()
        }, 500)
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "pending":
                return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Pending Review</Badge>
            case "approved":
                return <Badge className="bg-green-100 text-green-800 border-green-300">Approved</Badge>
            case "rejected":
                return <Badge className="bg-red-100 text-red-800 border-red-300">Rejected</Badge>
            default:
                return <Badge>{status}</Badge>
        }
    }

    const renderField = (label: string, value: any) => {
        if (!value || value === "") return null
        return (
            <div className="field-row flex py-1">
                <span className="field-label text-gray-600 font-medium min-w-[200px]">{label}:</span>
                <span className="field-value">{Array.isArray(value) ? value.join(", ") : value}</span>
            </div>
        )
    }

    const renderProgramSection = (title: string, program: any) => {
        if (!program || !program.hasProgram) return null
        return (
            <div className="subsection bg-gray-50 p-4 rounded-lg mb-4">
                <h4 className="subsection-title font-semibold text-gray-800 mb-3">{title}</h4>
                {renderField("Program Name", program.programName)}
                {renderField("Target Group", program.targetGroup)}
                {renderField("Start Date", program.startDate)}
                {renderField("End Date", program.endDate)}
                {renderField("Districts Covered", program.numberOfDistricts)}
                {renderField("Upazilas Covered", program.numberOfUpazilas)}
                {renderField("District Names", program.districtName)}
                {renderField("Upazila Names", program.upazilaName)}

                {program.parentingEducation && (
                    <div className="mt-2 pl-4 border-l-2 border-gray-300">
                        <p className="font-medium text-sm text-gray-700">Parenting Education:</p>
                        {renderField("Total Parents", program.parentingEducation.totalParents)}
                        {renderField("Mothers", program.parentingEducation.mothers)}
                        {renderField("Fathers", program.parentingEducation.fathers)}
                    </div>
                )}

                {program.dayCareCenter && (
                    <div className="mt-2 pl-4 border-l-2 border-gray-300">
                        <p className="font-medium text-sm text-gray-700">Day Care Centers:</p>
                        {renderField("Number of Centers", program.dayCareCenter.number)}
                        {renderField("Children Covered", program.dayCareCenter.childrenCovered)}
                        {renderField("Caregivers Per Center", program.dayCareCenter.caregiversPerCenter)}
                    </div>
                )}

                {program.earlyLearningCenter && (
                    <div className="mt-2 pl-4 border-l-2 border-gray-300">
                        <p className="font-medium text-sm text-gray-700">Early Learning Centers:</p>
                        {renderField("Home-based Centers", program.earlyLearningCenter.homeBasedCenters)}
                        {renderField("Center-based Centers", program.earlyLearningCenter.centerBasedCenters)}
                        {renderField("Children Covered", program.earlyLearningCenter.childrenCovered)}
                    </div>
                )}

                {program.disabilityProgram?.childrenCovered && (
                    <div className="mt-2 pl-4 border-l-2 border-gray-300">
                        <p className="font-medium text-sm text-gray-700">Disability Program:</p>
                        {renderField("Children Covered", program.disabilityProgram.childrenCovered)}
                        {renderField("Activities", program.disabilityProgram.activities)}
                    </div>
                )}
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className="container mx-auto py-8 px-4">
                <div className="text-center py-12">Loading application details...</div>
            </div>
        )
    }

    if (!application) {
        return (
            <div className="container mx-auto py-8 px-4">
                <div className="text-center py-12">Application not found</div>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-8 px-4">
            {/* Header - Hidden in print */}
            <div className="print:hidden mb-6 flex flex-wrap items-center justify-between gap-4">
                <Button variant="outline" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Applications
                </Button>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handlePrint}>
                        <Printer className="h-4 w-4 mr-2" />
                        Print
                    </Button>
                    <Button variant="outline" onClick={handleDownloadPDF}>
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                    </Button>
                    {application.status === "pending" && (
                        <>
                            <Button
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => router.push(`/admin/applications?action=approve&id=${application._id}`)}
                            >
                                <Check className="h-4 w-4 mr-2" />
                                Approve
                            </Button>
                            <Button
                                className="bg-red-600 hover:bg-red-700"
                                onClick={() => router.push(`/admin/applications?action=reject&id=${application._id}`)}
                            >
                                <X className="h-4 w-4 mr-2" />
                                Reject
                            </Button>
                        </>
                    )}
                </div>
            </div>

            {/* Printable Content */}
            <div ref={printRef} className="print:p-0">
                {/* Application Header */}
                <Card className="mb-6 print:shadow-none print:border-0">
                    <CardHeader className="print:pb-2">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                            <div>
                                <CardTitle className="text-2xl print:text-xl">
                                    {application.sectionA?.organizationName}
                                </CardTitle>
                                {application.sectionA?.abbreviation && (
                                    <p className="text-gray-500">({application.sectionA.abbreviation})</p>
                                )}
                            </div>
                            <div className="text-right">
                                {getStatusBadge(application.status)}
                                <p className="text-sm text-gray-500 mt-2">
                                    Submitted: {new Date(application.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </CardHeader>
                </Card>

                {/* Section A: General Information */}
                <div className="section mb-6">
                    <div className="section-title bg-blue-50 border-l-4 border-blue-600 px-4 py-2 font-semibold text-blue-900 mb-4">
                        Section A: General Information
                    </div>
                    <Card className="print:shadow-none">
                        <CardContent className="pt-4 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {renderField("Organization Name", application.sectionA?.organizationName)}
                                {renderField("Abbreviation", application.sectionA?.abbreviation)}
                                {renderField("Year Established", application.sectionA?.yearEstablished)}
                                {renderField("Organization Type", application.sectionA?.organizationType)}
                            </div>

                            <div className="subsection bg-gray-50 p-4 rounded-lg">
                                <h4 className="subsection-title font-semibold text-gray-800 mb-3">Head Office Address</h4>
                                {renderField("Full Address", application.sectionA?.headOfficeAddress?.fullAddress)}
                                {renderField("Upazila", application.sectionA?.headOfficeAddress?.upazila)}
                                {renderField("District", application.sectionA?.headOfficeAddress?.district)}
                                {renderField("Division", application.sectionA?.headOfficeAddress?.division)}
                                {renderField("Contact Number", application.sectionA?.headOfficeAddress?.contactNumber)}
                                {renderField("Email", application.sectionA?.headOfficeAddress?.email)}
                                {renderField("Website", application.sectionA?.headOfficeAddress?.website)}
                            </div>

                            <div className="subsection bg-gray-50 p-4 rounded-lg">
                                <h4 className="subsection-title font-semibold text-gray-800 mb-3">Head of Organization</h4>
                                {renderField("Name", application.sectionA?.headOfOrganization?.name)}
                                {renderField("Designation", application.sectionA?.headOfOrganization?.designation)}
                                {renderField("Contact Number", application.sectionA?.headOfOrganization?.contactNumber)}
                                {renderField("Email", application.sectionA?.headOfOrganization?.email)}
                                {renderField("Skype ID", application.sectionA?.headOfOrganization?.skypeId)}
                            </div>

                            <div className="subsection bg-gray-50 p-4 rounded-lg">
                                <h4 className="subsection-title font-semibold text-gray-800 mb-3">ECD Focal Person</h4>
                                {renderField("Name", application.sectionA?.focalPersonECD?.name)}
                                {renderField("Designation", application.sectionA?.focalPersonECD?.designation)}
                                {renderField("Contact Number", application.sectionA?.focalPersonECD?.contactNumber)}
                                {renderField("Email", application.sectionA?.focalPersonECD?.email)}
                                {renderField("Skype ID", application.sectionA?.focalPersonECD?.skypeId)}
                            </div>

                            {renderField("Major Activities", application.sectionA?.majorActivities)}
                            {renderField("Target Needs", application.sectionA?.targetNeeds)}

                            <div className="subsection bg-gray-50 p-4 rounded-lg">
                                <h4 className="subsection-title font-semibold text-gray-800 mb-3">Registration</h4>
                                {renderField("Authority", application.sectionA?.registration?.authority)}
                                {renderField("Registration Number", application.sectionA?.registration?.registrationNumber)}
                                {renderField("Year of Registration", application.sectionA?.registration?.yearOfRegistration)}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Section B: Summary Information */}
                {application.sectionB && (
                    <div className="section mb-6">
                        <div className="section-title bg-blue-50 border-l-4 border-blue-600 px-4 py-2 font-semibold text-blue-900 mb-4">
                            Section B: Summary Information
                        </div>
                        <Card className="print:shadow-none">
                            <CardContent className="pt-4 space-y-4">
                                {application.sectionB.briefDescription && (
                                    <div>
                                        <p className="font-medium text-gray-700 mb-1">Brief Description (Mission, Vision, Goals):</p>
                                        <p className="text-gray-600 whitespace-pre-wrap">{application.sectionB.briefDescription}</p>
                                    </div>
                                )}
                                {application.sectionB.keyActivities && (
                                    <div>
                                        <p className="font-medium text-gray-700 mb-1">Key Activities:</p>
                                        <p className="text-gray-600 whitespace-pre-wrap">{application.sectionB.keyActivities}</p>
                                    </div>
                                )}
                                {renderField("Scope of Work", application.sectionB.scopeOfWork)}
                                {application.sectionB.keyTargetPopulation && (
                                    <div>
                                        <p className="font-medium text-gray-700 mb-1">Key Target Population:</p>
                                        <p className="text-gray-600 whitespace-pre-wrap">{application.sectionB.keyTargetPopulation}</p>
                                    </div>
                                )}
                                {application.sectionB.keyAchievements && (
                                    <div>
                                        <p className="font-medium text-gray-700 mb-1">Key Achievements (Last 5 Years):</p>
                                        <p className="text-gray-600 whitespace-pre-wrap">{application.sectionB.keyAchievements}</p>
                                    </div>
                                )}
                                {application.sectionB.keyPartners && (
                                    <div>
                                        <p className="font-medium text-gray-700 mb-1">Key Partners:</p>
                                        <p className="text-gray-600 whitespace-pre-wrap">{application.sectionB.keyPartners}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Section C: Program Details */}
                {(application.program0to3?.hasProgram || application.program3to5?.hasProgram ||
                    application.program5to6?.hasProgram || application.program6to8?.hasProgram) && (
                        <div className="section mb-6">
                            <div className="section-title bg-blue-50 border-l-4 border-blue-600 px-4 py-2 font-semibold text-blue-900 mb-4">
                                Section C: Program Details
                            </div>
                            <Card className="print:shadow-none">
                                <CardContent className="pt-4">
                                    {renderProgramSection("Program for 0-3 Years", application.program0to3)}
                                    {renderProgramSection("Program for 3-5 Years", application.program3to5)}
                                    {renderProgramSection("Program for 5-6 Years", application.program5to6)}
                                    {renderProgramSection("Program for 6-8 Years", application.program6to8)}
                                </CardContent>
                            </Card>
                        </div>
                    )}

                {/* Section D: Training, Monitoring & Funding */}
                {application.sectionD && (
                    <div className="section mb-6">
                        <div className="section-title bg-blue-50 border-l-4 border-blue-600 px-4 py-2 font-semibold text-blue-900 mb-4">
                            Section D: Training, Monitoring & Supervision, Funding
                        </div>
                        <Card className="print:shadow-none">
                            <CardContent className="pt-4 space-y-4">
                                {application.sectionD.training && (
                                    <div className="subsection bg-gray-50 p-4 rounded-lg">
                                        <h4 className="subsection-title font-semibold text-gray-800 mb-3">Training System</h4>
                                        {renderField("Has Own Training System", application.sectionD.training.hasOwnSystem ? "Yes" : "No")}
                                        {application.sectionD.training.hasOwnSystem && (
                                            <>
                                                {renderField("Trainers for 0-3 years", application.sectionD.training.trainers0to3 ? "Yes" : "No")}
                                                {renderField("Trainers for 3-5 years", application.sectionD.training.trainers3to5 ? "Yes" : "No")}
                                                {renderField("Trainers for 5-6 years", application.sectionD.training.trainers5to6 ? "Yes" : "No")}
                                                {renderField("Trainers for 6-8 years", application.sectionD.training.trainers6to8 ? "Yes" : "No")}
                                                {application.sectionD.training.totalTrainers && (
                                                    <>
                                                        {renderField("Total Trainers", application.sectionD.training.totalTrainers.total)}
                                                        {renderField("Male Trainers", application.sectionD.training.totalTrainers.male)}
                                                        {renderField("Female Trainers", application.sectionD.training.totalTrainers.female)}
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </div>
                                )}

                                {application.sectionD.supervisionAndMonitoring && (
                                    <div className="subsection bg-gray-50 p-4 rounded-lg">
                                        <h4 className="subsection-title font-semibold text-gray-800 mb-3">Supervision & Monitoring</h4>
                                        {renderField("Has Own System", application.sectionD.supervisionAndMonitoring.hasOwnSystem ? "Yes" : "No")}
                                        {renderField("Number of Supervisors", application.sectionD.supervisionAndMonitoring.numberOfSupervisors)}
                                    </div>
                                )}

                                {renderField("Funding Sources", application.sectionD.funding)}

                                {application.sectionD.implementingPartner && (
                                    <div className="subsection bg-gray-50 p-4 rounded-lg">
                                        <h4 className="subsection-title font-semibold text-gray-800 mb-3">Implementation</h4>
                                        {renderField("Implementation Type", application.sectionD.implementingPartner.implementationType)}
                                        {renderField("Partner Names", application.sectionD.implementingPartner.partnerNames)}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Section E: Motivation */}
                {application.sectionE && (
                    <div className="section mb-6">
                        <div className="section-title bg-blue-50 border-l-4 border-blue-600 px-4 py-2 font-semibold text-blue-900 mb-4">
                            Section E: Motivation for Joining BEN
                        </div>
                        <Card className="print:shadow-none">
                            <CardContent className="pt-4 space-y-4">
                                {application.sectionE.motivation && (
                                    <div>
                                        <p className="font-medium text-gray-700 mb-1">Motivation for Joining:</p>
                                        <p className="text-gray-600 whitespace-pre-wrap">{application.sectionE.motivation}</p>
                                    </div>
                                )}
                                {application.sectionE.jointActivities && (
                                    <div>
                                        <p className="font-medium text-gray-700 mb-1">Envisioned Joint Activities:</p>
                                        <p className="text-gray-600 whitespace-pre-wrap">{application.sectionE.jointActivities}</p>
                                    </div>
                                )}
                                {application.sectionE.contribution && (
                                    <div>
                                        <p className="font-medium text-gray-700 mb-1">Contribution to BEN:</p>
                                        <p className="text-gray-600 whitespace-pre-wrap">{application.sectionE.contribution}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Section F: Respondent Information */}
                {application.sectionF && (
                    <div className="section mb-6">
                        <div className="section-title bg-blue-50 border-l-4 border-blue-600 px-4 py-2 font-semibold text-blue-900 mb-4">
                            Section F: Respondent's Information
                        </div>
                        <Card className="print:shadow-none">
                            <CardContent className="pt-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {renderField("Name", application.sectionF.name)}
                                    {renderField("Designation", application.sectionF.designation)}
                                    {renderField("Organization", application.sectionF.organization)}
                                    {renderField("Contact Number", application.sectionF.contactNumber)}
                                    {renderField("Email", application.sectionF.email)}
                                    {renderField("Skype ID", application.sectionF.skypeId)}
                                    {renderField("Date of Submission", application.sectionF.dateOfSubmission)}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Admin Notes */}
                {application.adminNotes && (
                    <div className="section mb-6 print:hidden">
                        <div className="section-title bg-orange-50 border-l-4 border-orange-600 px-4 py-2 font-semibold text-orange-900 mb-4">
                            Admin Notes
                        </div>
                        <Card>
                            <CardContent className="pt-4">
                                <p className="text-gray-600 whitespace-pre-wrap">{application.adminNotes}</p>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>

            {/* Print Styles */}
            <style jsx global>{`
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .print\\:hidden { display: none !important; }
          .print\\:shadow-none { box-shadow: none !important; }
          .print\\:border-0 { border: none !important; }
          .print\\:p-0 { padding: 0 !important; }
          .print\\:text-xl { font-size: 1.25rem !important; }
          .print\\:pb-2 { padding-bottom: 0.5rem !important; }
        }
      `}</style>
        </div>
    )
}
