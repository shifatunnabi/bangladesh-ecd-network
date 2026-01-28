'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
    ArrowLeft,
    CheckCircle,
    XCircle,
    Clock,
    Download,
    Loader2,
    Building,
    User,
    Mail,
    Phone,
    MapPin,
    Calendar
} from 'lucide-react';

interface Application {
    _id: string;
    organizationName: string;
    abbreviation?: string;
    yearEstablished?: string;
    organizationType: string;
    headOfficeAddress?: {
        fullAddress?: string;
        upazila?: string;
        district?: string;
        division?: string;
        contactNumber?: string;
        email?: string;
        website?: string;
    };
    headOfOrganization?: {
        name?: string;
        designation?: string;
        contactNumber?: string;
        email?: string;
    };
    focalPersonECD?: {
        name?: string;
        designation?: string;
        contactNumber?: string;
        email?: string;
    };
    majorActivities?: string[];
    targetNeeds?: string[];
    sectionB?: {
        briefDescription?: string;
        keyActivities?: string;
        keyAchievements?: string;
        keyPartners?: string;
    };
    sectionE?: {
        motivation?: string;
        jointActivities?: string;
        contribution?: string;
    };
    sectionF: {
        name: string;
        designation: string;
        organization: string;
        email?: string;
        contactNumber?: string;
        dateOfSubmission?: string;
    };
    formData: object;
    status: 'pending' | 'approved' | 'rejected';
    submittedAt: string;
    reviewedAt?: string;
    reviewNotes?: string;
}

export default function ApplicationDetailPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = use(params);
    const router = useRouter();
    const [application, setApplication] = useState<Application | null>(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [notes, setNotes] = useState('');
    const [showRejectDialog, setShowRejectDialog] = useState(false);

    useEffect(() => {
        fetchApplication();
    }, [id]);

    const fetchApplication = async () => {
        try {
            const res = await fetch(`/api/membership/${id}`);
            const data = await res.json();
            if (data.success) {
                setApplication(data.application);
            }
        } catch (error) {
            console.error('Error fetching application:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (newStatus: 'approved' | 'rejected') => {
        setActionLoading(true);
        try {
            const res = await fetch(`/api/membership/${id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus, notes }),
            });

            const data = await res.json();
            if (data.success) {
                setApplication(prev => prev ? { ...prev, status: newStatus } : null);
                setShowRejectDialog(false);
                router.refresh();
            } else {
                alert(data.error || 'Failed to update status');
            }
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status');
        } finally {
            setActionLoading(false);
        }
    };

    const handleDownloadPDF = async () => {
        if (!application) return;

        // Dynamic import for client-side PDF generation
        const jsPDF = (await import('jspdf')).default;

        const doc = new jsPDF();
        const margin = 20;
        let y = margin;
        const lineHeight = 7;
        const pageWidth = doc.internal.pageSize.getWidth();

        const addText = (text: string, isBold = false, fontSize = 10) => {
            if (y > 270) {
                doc.addPage();
                y = margin;
            }
            doc.setFontSize(fontSize);
            doc.setFont('helvetica', isBold ? 'bold' : 'normal');
            const lines = doc.splitTextToSize(text, pageWidth - 2 * margin);
            doc.text(lines, margin, y);
            y += lines.length * lineHeight;
        };

        const addSection = (title: string) => {
            y += 5;
            addText(title, true, 12);
            y += 2;
        };

        // Header
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('Bangladesh ECD Network (BEN)', pageWidth / 2, y, { align: 'center' });
        y += 10;
        doc.setFontSize(14);
        doc.text('Membership Application Form', pageWidth / 2, y, { align: 'center' });
        y += 15;

        // Status
        addText(`Status: ${application.status.toUpperCase()}`, true);
        addText(`Submitted: ${new Date(application.submittedAt).toLocaleDateString()}`);
        y += 5;

        // Organization Info
        addSection('Section A: General Information');
        addText(`Organization Name: ${application.organizationName}`);
        if (application.abbreviation) addText(`Abbreviation: ${application.abbreviation}`);
        if (application.yearEstablished) addText(`Year Established: ${application.yearEstablished}`);
        addText(`Organization Type: ${application.organizationType}`);

        if (application.headOfficeAddress) {
            y += 3;
            addText('Head Office Address:', true);
            if (application.headOfficeAddress.fullAddress) addText(`  ${application.headOfficeAddress.fullAddress}`);
            if (application.headOfficeAddress.district) addText(`  District: ${application.headOfficeAddress.district}`);
            if (application.headOfficeAddress.division) addText(`  Division: ${application.headOfficeAddress.division}`);
            if (application.headOfficeAddress.email) addText(`  Email: ${application.headOfficeAddress.email}`);
            if (application.headOfficeAddress.contactNumber) addText(`  Phone: ${application.headOfficeAddress.contactNumber}`);
        }

        if (application.headOfOrganization?.name) {
            y += 3;
            addText('Head of Organization:', true);
            addText(`  Name: ${application.headOfOrganization.name}`);
            if (application.headOfOrganization.designation) addText(`  Designation: ${application.headOfOrganization.designation}`);
            if (application.headOfOrganization.email) addText(`  Email: ${application.headOfOrganization.email}`);
        }

        if (application.focalPersonECD?.name) {
            y += 3;
            addText('ECD Focal Person:', true);
            addText(`  Name: ${application.focalPersonECD.name}`);
            if (application.focalPersonECD.designation) addText(`  Designation: ${application.focalPersonECD.designation}`);
            if (application.focalPersonECD.email) addText(`  Email: ${application.focalPersonECD.email}`);
        }

        // Section B
        if (application.sectionB) {
            addSection('Section B: Summary Information');
            if (application.sectionB.briefDescription) {
                addText('Brief Description:', true);
                addText(application.sectionB.briefDescription);
            }
            if (application.sectionB.keyActivities) {
                addText('Key Activities:', true);
                addText(application.sectionB.keyActivities);
            }
            if (application.sectionB.keyAchievements) {
                addText('Key Achievements:', true);
                addText(application.sectionB.keyAchievements);
            }
        }

        // Section E
        if (application.sectionE) {
            addSection('Section E: Reasons for Applying');
            if (application.sectionE.motivation) {
                addText('Motivation:', true);
                addText(application.sectionE.motivation);
            }
            if (application.sectionE.jointActivities) {
                addText('Joint Activities:', true);
                addText(application.sectionE.jointActivities);
            }
            if (application.sectionE.contribution) {
                addText('Contribution:', true);
                addText(application.sectionE.contribution);
            }
        }

        // Respondent Info
        addSection('Section F: Respondent Information');
        addText(`Name: ${application.sectionF.name}`);
        addText(`Designation: ${application.sectionF.designation}`);
        addText(`Organization: ${application.sectionF.organization}`);
        if (application.sectionF.email) addText(`Email: ${application.sectionF.email}`);
        if (application.sectionF.contactNumber) addText(`Phone: ${application.sectionF.contactNumber}`);

        // Save
        doc.save(`BEN_Application_${application.organizationName.replace(/\s+/g, '_')}.pdf`);
    };

    const getStatusBadge = (status: string) => {
        const styles = {
            pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
            approved: 'bg-green-100 text-green-800 border-green-300',
            rejected: 'bg-red-100 text-red-800 border-red-300',
        };
        const icons = {
            pending: <Clock className="h-4 w-4" />,
            approved: <CheckCircle className="h-4 w-4" />,
            rejected: <XCircle className="h-4 w-4" />,
        };

        return (
            <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium border ${styles[status as keyof typeof styles]}`}>
                {icons[status as keyof typeof icons]}
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!application) {
        return (
            <div className="p-6">
                <p className="text-center text-gray-500">Application not found</p>
            </div>
        );
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <Link href="/admin/applications" className="text-sm text-primary hover:underline flex items-center gap-1 mb-2">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Applications
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">{application.organizationName}</h1>
                    <div className="flex items-center gap-3 mt-2">
                        {getStatusBadge(application.status)}
                        <span className="text-sm text-gray-500">
                            Submitted {new Date(application.submittedAt).toLocaleDateString()}
                        </span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleDownloadPDF}>
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                    </Button>
                </div>
            </div>

            {/* Action buttons for pending applications */}
            {application.status === 'pending' && (
                <Card className="mb-6 border-yellow-200 bg-yellow-50">
                    <CardContent className="py-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <p className="font-medium text-yellow-800">This application is pending review</p>
                                <p className="text-sm text-yellow-700">Review the details below and approve or reject.</p>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    className="border-red-300 text-red-700 hover:bg-red-50"
                                    onClick={() => setShowRejectDialog(true)}
                                    disabled={actionLoading}
                                >
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Reject
                                </Button>
                                <Button
                                    className="bg-green-600 hover:bg-green-700"
                                    onClick={() => handleStatusChange('approved')}
                                    disabled={actionLoading}
                                >
                                    {actionLoading ? (
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    ) : (
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                    )}
                                    Approve
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Reject dialog */}
            {showRejectDialog && (
                <Card className="mb-6 border-red-200">
                    <CardContent className="py-4">
                        <h3 className="font-medium text-red-800 mb-2">Reject Application</h3>
                        <Textarea
                            placeholder="Add notes for rejection (optional - will be sent to applicant)"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="mb-4"
                        />
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
                                Cancel
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={() => handleStatusChange('rejected')}
                                disabled={actionLoading}
                            >
                                {actionLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                                Confirm Rejection
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Application details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Organization Info */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Building className="h-5 w-5" />
                            Organization Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="text-sm text-gray-500">Organization Name</label>
                            <p className="font-medium">{application.organizationName}</p>
                        </div>
                        {application.abbreviation && (
                            <div>
                                <label className="text-sm text-gray-500">Abbreviation</label>
                                <p className="font-medium">{application.abbreviation}</p>
                            </div>
                        )}
                        <div>
                            <label className="text-sm text-gray-500">Type</label>
                            <p className="font-medium">{application.organizationType}</p>
                        </div>
                        {application.yearEstablished && (
                            <div>
                                <label className="text-sm text-gray-500">Year Established</label>
                                <p className="font-medium">{application.yearEstablished}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Address */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MapPin className="h-5 w-5" />
                            Head Office Address
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {application.headOfficeAddress?.fullAddress && (
                            <div>
                                <label className="text-sm text-gray-500">Full Address</label>
                                <p className="font-medium">{application.headOfficeAddress.fullAddress}</p>
                            </div>
                        )}
                        <div className="grid grid-cols-2 gap-4">
                            {application.headOfficeAddress?.district && (
                                <div>
                                    <label className="text-sm text-gray-500">District</label>
                                    <p className="font-medium">{application.headOfficeAddress.district}</p>
                                </div>
                            )}
                            {application.headOfficeAddress?.division && (
                                <div>
                                    <label className="text-sm text-gray-500">Division</label>
                                    <p className="font-medium">{application.headOfficeAddress.division}</p>
                                </div>
                            )}
                        </div>
                        {application.headOfficeAddress?.email && (
                            <div>
                                <label className="text-sm text-gray-500">Email</label>
                                <p className="font-medium">{application.headOfficeAddress.email}</p>
                            </div>
                        )}
                        {application.headOfficeAddress?.contactNumber && (
                            <div>
                                <label className="text-sm text-gray-500">Phone</label>
                                <p className="font-medium">{application.headOfficeAddress.contactNumber}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Head of Organization */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5" />
                            Head of Organization
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {application.headOfOrganization?.name && (
                            <div>
                                <label className="text-sm text-gray-500">Name</label>
                                <p className="font-medium">{application.headOfOrganization.name}</p>
                            </div>
                        )}
                        {application.headOfOrganization?.designation && (
                            <div>
                                <label className="text-sm text-gray-500">Designation</label>
                                <p className="font-medium">{application.headOfOrganization.designation}</p>
                            </div>
                        )}
                        {application.headOfOrganization?.email && (
                            <div>
                                <label className="text-sm text-gray-500">Email</label>
                                <p className="font-medium">{application.headOfOrganization.email}</p>
                            </div>
                        )}
                        {application.headOfOrganization?.contactNumber && (
                            <div>
                                <label className="text-sm text-gray-500">Phone</label>
                                <p className="font-medium">{application.headOfOrganization.contactNumber}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* ECD Focal Person */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5" />
                            ECD Focal Person
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {application.focalPersonECD?.name && (
                            <div>
                                <label className="text-sm text-gray-500">Name</label>
                                <p className="font-medium">{application.focalPersonECD.name}</p>
                            </div>
                        )}
                        {application.focalPersonECD?.designation && (
                            <div>
                                <label className="text-sm text-gray-500">Designation</label>
                                <p className="font-medium">{application.focalPersonECD.designation}</p>
                            </div>
                        )}
                        {application.focalPersonECD?.email && (
                            <div>
                                <label className="text-sm text-gray-500">Email</label>
                                <p className="font-medium">{application.focalPersonECD.email}</p>
                            </div>
                        )}
                        {application.focalPersonECD?.contactNumber && (
                            <div>
                                <label className="text-sm text-gray-500">Phone</label>
                                <p className="font-medium">{application.focalPersonECD.contactNumber}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Summary Information */}
                {application.sectionB && (
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Summary Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {application.sectionB.briefDescription && (
                                <div>
                                    <label className="text-sm text-gray-500">Brief Description</label>
                                    <p className="font-medium whitespace-pre-wrap">{application.sectionB.briefDescription}</p>
                                </div>
                            )}
                            {application.sectionB.keyActivities && (
                                <div>
                                    <label className="text-sm text-gray-500">Key Activities</label>
                                    <p className="font-medium whitespace-pre-wrap">{application.sectionB.keyActivities}</p>
                                </div>
                            )}
                            {application.sectionB.keyAchievements && (
                                <div>
                                    <label className="text-sm text-gray-500">Key Achievements</label>
                                    <p className="font-medium whitespace-pre-wrap">{application.sectionB.keyAchievements}</p>
                                </div>
                            )}
                            {application.sectionB.keyPartners && (
                                <div>
                                    <label className="text-sm text-gray-500">Key Partners</label>
                                    <p className="font-medium whitespace-pre-wrap">{application.sectionB.keyPartners}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* Reasons for Applying */}
                {application.sectionE && (
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Reasons for Applying</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {application.sectionE.motivation && (
                                <div>
                                    <label className="text-sm text-gray-500">Why does your organization want to become a member?</label>
                                    <p className="font-medium whitespace-pre-wrap">{application.sectionE.motivation}</p>
                                </div>
                            )}
                            {application.sectionE.jointActivities && (
                                <div>
                                    <label className="text-sm text-gray-500">What joint activities do you envision?</label>
                                    <p className="font-medium whitespace-pre-wrap">{application.sectionE.jointActivities}</p>
                                </div>
                            )}
                            {application.sectionE.contribution && (
                                <div>
                                    <label className="text-sm text-gray-500">What kind of contribution will your organization provide?</label>
                                    <p className="font-medium whitespace-pre-wrap">{application.sectionE.contribution}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* Respondent Information */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Respondent Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div>
                                <label className="text-sm text-gray-500">Name</label>
                                <p className="font-medium">{application.sectionF.name}</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-500">Designation</label>
                                <p className="font-medium">{application.sectionF.designation}</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-500">Organization</label>
                                <p className="font-medium">{application.sectionF.organization}</p>
                            </div>
                            {application.sectionF.email && (
                                <div>
                                    <label className="text-sm text-gray-500">Email</label>
                                    <p className="font-medium">{application.sectionF.email}</p>
                                </div>
                            )}
                            {application.sectionF.contactNumber && (
                                <div>
                                    <label className="text-sm text-gray-500">Phone</label>
                                    <p className="font-medium">{application.sectionF.contactNumber}</p>
                                </div>
                            )}
                            {application.sectionF.dateOfSubmission && (
                                <div>
                                    <label className="text-sm text-gray-500">Date of Submission</label>
                                    <p className="font-medium">{application.sectionF.dateOfSubmission}</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
