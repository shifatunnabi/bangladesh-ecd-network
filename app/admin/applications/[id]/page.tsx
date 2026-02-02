'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
    ArrowLeft,
    CheckCircle,
    XCircle,
    AlertCircle,
    RefreshCw,
    Building,
    User,
    MapPin,
    FileDown,
    Clock
} from 'lucide-react';
import Link from 'next/link';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { format } from 'date-fns';

interface ApplicationData {
    _id: string;
    status: 'pending' | 'approved' | 'rejected';
    submittedAt: string;
    reviewedAt?: string;
    reviewedBy?: string;
    rejectionReason?: string;
    formData: {
        sectionA: {
            organizationName: string;
            abbreviation?: string;
            yearEstablished?: string;
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
            organizationType?: string;
            majorActivities?: string[];
            targetNeeds?: string[];
        };
        sectionF?: {
            name?: string;
            designation?: string;
            organization?: string;
            dateOfSubmission?: string;
        };
    };
}

export default function ApplicationDetailPage() {
    const params = useParams();
    const router = useRouter();
    const applicationId = params.id as string;

    const [application, setApplication] = useState<ApplicationData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showRejectDialog, setShowRejectDialog] = useState(false);
    const [rejectionReason, setRejectionReason] = useState('');
    const [actionResult, setActionResult] = useState<{ success: boolean; message: string } | null>(null);

    const fetchApplication = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/admin/applications/${applicationId}`);
            const data = await response.json();
            if (response.ok) {
                setApplication(data.application);
            }
        } catch (error) {
            console.error('Failed to fetch application:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (applicationId) {
            fetchApplication();
        }
    }, [applicationId]);

    const handleApprove = async () => {
        try {
            setIsProcessing(true);
            setActionResult(null);

            const response = await fetch(`/api/admin/applications/${applicationId}/approve`, {
                method: 'POST',
            });

            const data = await response.json();

            if (response.ok) {
                setActionResult({ success: true, message: data.message });
                fetchApplication();
            } else {
                setActionResult({ success: false, message: data.error });
            }
        } catch (error) {
            setActionResult({ success: false, message: 'Failed to approve application' });
        } finally {
            setIsProcessing(false);
        }
    };

    const handleReject = async () => {
        try {
            setIsProcessing(true);
            setActionResult(null);

            const response = await fetch(`/api/admin/applications/${applicationId}/reject`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ reason: rejectionReason }),
            });

            const data = await response.json();

            if (response.ok) {
                setActionResult({ success: true, message: data.message });
                setShowRejectDialog(false);
                fetchApplication();
            } else {
                setActionResult({ success: false, message: data.error });
            }
        } catch (error) {
            setActionResult({ success: false, message: 'Failed to reject application' });
        } finally {
            setIsProcessing(false);
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending':
                return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" /> Pending Review</Badge>;
            case 'approved':
                return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" /> Approved</Badge>;
            case 'rejected':
                return <Badge className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" /> Rejected</Badge>;
            default:
                return <Badge>{status}</Badge>;
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <RefreshCw className="w-6 h-6 animate-spin text-gray-400" />
            </div>
        );
    }

    if (!application) {
        return (
            <div className="text-center py-12">
                <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900">Application not found</h2>
                <Link href="/admin/applications">
                    <Button variant="outline" className="mt-4">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Applications
                    </Button>
                </Link>
            </div>
        );
    }

    const { formData } = application;
    const { sectionA, sectionF } = formData;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/admin/applications">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{sectionA.organizationName}</h1>
                        <div className="flex items-center gap-2 mt-1">
                            {getStatusBadge(application.status)}
                            <span className="text-sm text-gray-500">
                                Submitted: {format(new Date(application.submittedAt), 'MMM d, yyyy h:mm a')}
                            </span>
                        </div>
                    </div>
                </div>

                {application.status === 'pending' && (
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            className="text-red-600 border-red-200 hover:bg-red-50"
                            onClick={() => setShowRejectDialog(true)}
                            disabled={isProcessing}
                        >
                            <XCircle className="w-4 h-4 mr-2" />
                            Reject
                        </Button>
                        <Button
                            className="bg-green-600 hover:bg-green-700"
                            onClick={handleApprove}
                            disabled={isProcessing}
                        >
                            {isProcessing ? (
                                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                                <CheckCircle className="w-4 h-4 mr-2" />
                            )}
                            Approve
                        </Button>
                    </div>
                )}
            </div>

            {/* Action Result */}
            {actionResult && (
                <div className={`p-4 rounded-lg ${actionResult.success
                        ? 'bg-green-50 border border-green-200 text-green-800'
                        : 'bg-red-50 border border-red-200 text-red-800'
                    }`}>
                    <div className="flex items-center gap-2">
                        {actionResult.success ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                        {actionResult.message}
                    </div>
                </div>
            )}

            {/* Rejection info if rejected */}
            {application.status === 'rejected' && application.rejectionReason && (
                <Card className="border-red-200 bg-red-50">
                    <CardHeader>
                        <CardTitle className="text-red-800">Rejection Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-red-700">{application.rejectionReason}</p>
                        {application.reviewedAt && (
                            <p className="text-sm text-red-600 mt-2">
                                Rejected on: {format(new Date(application.reviewedAt), 'MMM d, yyyy h:mm a')}
                            </p>
                        )}
                    </CardContent>
                </Card>
            )}

            {/* Organization Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Building className="w-5 h-5" />
                            Organization Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-500">Organization Name</label>
                            <p className="text-gray-900">{sectionA.organizationName}</p>
                        </div>
                        {sectionA.abbreviation && (
                            <div>
                                <label className="text-sm font-medium text-gray-500">Abbreviation</label>
                                <p className="text-gray-900">{sectionA.abbreviation}</p>
                            </div>
                        )}
                        {sectionA.yearEstablished && (
                            <div>
                                <label className="text-sm font-medium text-gray-500">Year Established</label>
                                <p className="text-gray-900">{sectionA.yearEstablished}</p>
                            </div>
                        )}
                        {sectionA.organizationType && (
                            <div>
                                <label className="text-sm font-medium text-gray-500">Organization Type</label>
                                <p className="text-gray-900">{sectionA.organizationType}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MapPin className="w-5 h-5" />
                            Head Office Address
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {sectionA.headOfficeAddress?.fullAddress && (
                            <div>
                                <label className="text-sm font-medium text-gray-500">Full Address</label>
                                <p className="text-gray-900">{sectionA.headOfficeAddress.fullAddress}</p>
                            </div>
                        )}
                        <div className="grid grid-cols-2 gap-4">
                            {sectionA.headOfficeAddress?.upazila && (
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Upazila</label>
                                    <p className="text-gray-900">{sectionA.headOfficeAddress.upazila}</p>
                                </div>
                            )}
                            {sectionA.headOfficeAddress?.district && (
                                <div>
                                    <label className="text-sm font-medium text-gray-500">District</label>
                                    <p className="text-gray-900">{sectionA.headOfficeAddress.district}</p>
                                </div>
                            )}
                            {sectionA.headOfficeAddress?.division && (
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Division</label>
                                    <p className="text-gray-900">{sectionA.headOfficeAddress.division}</p>
                                </div>
                            )}
                        </div>
                        {sectionA.headOfficeAddress?.email && (
                            <div>
                                <label className="text-sm font-medium text-gray-500">Email</label>
                                <p className="text-gray-900">{sectionA.headOfficeAddress.email}</p>
                            </div>
                        )}
                        {sectionA.headOfficeAddress?.contactNumber && (
                            <div>
                                <label className="text-sm font-medium text-gray-500">Contact Number</label>
                                <p className="text-gray-900">{sectionA.headOfficeAddress.contactNumber}</p>
                            </div>
                        )}
                        {sectionA.headOfficeAddress?.website && (
                            <div>
                                <label className="text-sm font-medium text-gray-500">Website</label>
                                <p className="text-gray-900">{sectionA.headOfficeAddress.website}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="w-5 h-5" />
                            Head of Organization
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {sectionA.headOfOrganization?.name && (
                            <div>
                                <label className="text-sm font-medium text-gray-500">Name</label>
                                <p className="text-gray-900">{sectionA.headOfOrganization.name}</p>
                            </div>
                        )}
                        {sectionA.headOfOrganization?.designation && (
                            <div>
                                <label className="text-sm font-medium text-gray-500">Designation</label>
                                <p className="text-gray-900">{sectionA.headOfOrganization.designation}</p>
                            </div>
                        )}
                        {sectionA.headOfOrganization?.email && (
                            <div>
                                <label className="text-sm font-medium text-gray-500">Email</label>
                                <p className="text-gray-900">{sectionA.headOfOrganization.email}</p>
                            </div>
                        )}
                        {sectionA.headOfOrganization?.contactNumber && (
                            <div>
                                <label className="text-sm font-medium text-gray-500">Contact Number</label>
                                <p className="text-gray-900">{sectionA.headOfOrganization.contactNumber}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="w-5 h-5" />
                            ECD Focal Person
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {sectionA.focalPersonECD?.name && (
                            <div>
                                <label className="text-sm font-medium text-gray-500">Name</label>
                                <p className="text-gray-900">{sectionA.focalPersonECD.name}</p>
                            </div>
                        )}
                        {sectionA.focalPersonECD?.designation && (
                            <div>
                                <label className="text-sm font-medium text-gray-500">Designation</label>
                                <p className="text-gray-900">{sectionA.focalPersonECD.designation}</p>
                            </div>
                        )}
                        {sectionA.focalPersonECD?.email && (
                            <div>
                                <label className="text-sm font-medium text-gray-500">Email</label>
                                <p className="text-gray-900">{sectionA.focalPersonECD.email}</p>
                            </div>
                        )}
                        {sectionA.focalPersonECD?.contactNumber && (
                            <div>
                                <label className="text-sm font-medium text-gray-500">Contact Number</label>
                                <p className="text-gray-900">{sectionA.focalPersonECD.contactNumber}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Activities */}
                {(sectionA.majorActivities?.length || sectionA.targetNeeds?.length) && (
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Activities & Target Groups</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {sectionA.majorActivities && sectionA.majorActivities.length > 0 && (
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Major Activities</label>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {sectionA.majorActivities.map((activity, idx) => (
                                            <Badge key={idx} variant="outline">{activity}</Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {sectionA.targetNeeds && sectionA.targetNeeds.length > 0 && (
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Target Needs</label>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {sectionA.targetNeeds.map((need, idx) => (
                                            <Badge key={idx} variant="outline">{need}</Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* Submission Info */}
                {sectionF && (
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Form Submission Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {sectionF.name && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Submitted By</label>
                                        <p className="text-gray-900">{sectionF.name}</p>
                                    </div>
                                )}
                                {sectionF.designation && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Designation</label>
                                        <p className="text-gray-900">{sectionF.designation}</p>
                                    </div>
                                )}
                                {sectionF.dateOfSubmission && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Date of Submission</label>
                                        <p className="text-gray-900">{sectionF.dateOfSubmission}</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Reject Dialog */}
            <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Reject Application</DialogTitle>
                        <DialogDescription>
                            Please provide a reason for rejecting this application. This will be sent to the applicant.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-4">
                        <Textarea
                            placeholder="Enter rejection reason..."
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            rows={4}
                        />
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleReject}
                            disabled={isProcessing}
                        >
                            {isProcessing ? (
                                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                                <XCircle className="w-4 h-4 mr-2" />
                            )}
                            Reject Application
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
