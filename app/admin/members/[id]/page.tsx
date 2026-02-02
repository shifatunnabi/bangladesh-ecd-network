'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    ArrowLeft,
    Mail,
    User,
    Building,
    CheckCircle,
    AlertCircle,
    RefreshCw,
    Send,
    Edit,
    X,
    Save,
    Trash2
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

interface Member {
    _id: string;
    organization: string;
    abbreviation?: string;
    address?: string;
    division?: string;
    headName?: string;
    headDesignation?: string;
    headEmail?: string;
    focalName?: string;
    focalDesignation?: string;
    focalEmail: string;
    hasPortalAccess: boolean;
    portalAccessSentAt?: string;
    username?: string;
    isSeeded: boolean;
    createdAt: string;
    updatedAt: string;
    lastLogin?: string;
}

const DIVISIONS = [
    'Barisal Division',
    'Chittagong Division',
    'Dhaka Division',
    'Khulna Division',
    'Mymensingh Division',
    'Rajshahi Division',
    'Rangpur Division',
    'Sylhet Division',
];

export default function MemberDetailPage() {
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();
    const memberId = params.id as string;

    const [member, setMember] = useState<Member | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showSendDialog, setShowSendDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [sendResult, setSendResult] = useState<{ success: boolean; message: string } | null>(null);
    const [saveResult, setSaveResult] = useState<{ success: boolean; message: string } | null>(null);

    // Edit form state
    const [editForm, setEditForm] = useState<Partial<Member>>({});

    // Check if action=send-access is in URL
    useEffect(() => {
        if (searchParams.get('action') === 'send-access') {
            setShowSendDialog(true);
        }
    }, [searchParams]);

    const fetchMember = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/admin/members/${memberId}`);
            const data = await response.json();
            if (response.ok) {
                setMember(data.member);
                setEditForm(data.member);
            }
        } catch (error) {
            console.error('Failed to fetch member:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (memberId) {
            fetchMember();
        }
    }, [memberId]);

    const handleSendAccess = async () => {
        try {
            setIsSending(true);
            setSendResult(null);

            const response = await fetch(`/api/admin/members/${memberId}/send-access`, {
                method: 'POST',
            });

            const data = await response.json();

            if (response.ok) {
                setSendResult({ success: true, message: data.message });
                fetchMember(); // Refresh member data
            } else {
                setSendResult({ success: false, message: data.error });
            }
        } catch (error) {
            setSendResult({ success: false, message: 'Failed to send access email' });
        } finally {
            setIsSending(false);
        }
    };

    const handleSaveEdit = async () => {
        try {
            setIsSaving(true);
            setSaveResult(null);

            const response = await fetch(`/api/admin/members/${memberId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editForm),
            });

            const data = await response.json();

            if (response.ok) {
                setSaveResult({ success: true, message: data.message });
                setMember(data.member);
                setIsEditing(false);
            } else {
                setSaveResult({ success: false, message: data.error });
            }
        } catch (error) {
            setSaveResult({ success: false, message: 'Failed to save changes' });
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancelEdit = () => {
        setEditForm(member || {});
        setIsEditing(false);
        setSaveResult(null);
    };

    const handleDeleteMember = async () => {
        try {
            setIsDeleting(true);

            const response = await fetch(`/api/admin/members/${memberId}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (response.ok) {
                // Redirect to members list after successful deletion
                router.push('/admin/members');
            } else {
                alert(data.error || 'Failed to delete member');
                setIsDeleting(false);
            }
        } catch (error) {
            alert('Failed to delete member');
            setIsDeleting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <RefreshCw className="w-6 h-6 animate-spin text-gray-400" />
            </div>
        );
    }

    if (!member) {
        return (
            <div className="text-center py-12">
                <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900">Member not found</h2>
                <Link href="/admin/members">
                    <Button variant="outline" className="mt-4">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Members
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/members">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{member.organization}</h1>
                        {member.abbreviation && (
                            <p className="text-gray-600">({member.abbreviation})</p>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {member.hasPortalAccess && (
                        <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Portal Access Granted
                        </Badge>
                    )}
                    {!isEditing ? (
                        <>
                            <Button onClick={() => setIsEditing(true)}>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Member
                            </Button>
                            <Button variant="destructive" onClick={() => setShowDeleteDialog(true)}>
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button variant="outline" onClick={handleCancelEdit}>
                                <X className="w-4 h-4 mr-2" />
                                Cancel
                            </Button>
                            <Button onClick={handleSaveEdit} disabled={isSaving}>
                                {isSaving ? (
                                    <>
                                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4 mr-2" />
                                        Save Changes
                                    </>
                                )}
                            </Button>
                        </>
                    )}
                </div>
            </div>

            {/* Save Result Message */}
            {saveResult && (
                <div className={`p-4 rounded-lg ${saveResult.success
                    ? 'bg-green-50 border border-green-200 text-green-800'
                    : 'bg-red-50 border border-red-200 text-red-800'
                    }`}>
                    <div className="flex items-center gap-2">
                        {saveResult.success ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                        {saveResult.message}
                    </div>
                </div>
            )}

            {/* Member Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Building className="w-5 h-5" />
                            Organization Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700">Organization Name *</label>
                            {isEditing ? (
                                <Input
                                    value={editForm.organization || ''}
                                    onChange={(e) => setEditForm({ ...editForm, organization: e.target.value })}
                                    className="mt-1"
                                    required
                                />
                            ) : (
                                <p className="text-gray-900 mt-1">{member.organization}</p>
                            )}
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700">Abbreviation</label>
                            {isEditing ? (
                                <Input
                                    value={editForm.abbreviation || ''}
                                    onChange={(e) => setEditForm({ ...editForm, abbreviation: e.target.value })}
                                    className="mt-1"
                                />
                            ) : (
                                <p className="text-gray-900 mt-1">{member.abbreviation || '-'}</p>
                            )}
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700">Address</label>
                            {isEditing ? (
                                <Input
                                    value={editForm.address || ''}
                                    onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                                    className="mt-1"
                                />
                            ) : (
                                <p className="text-gray-900 mt-1">{member.address || '-'}</p>
                            )}
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700">Division</label>
                            {isEditing ? (
                                <Select
                                    value={editForm.division || ''}
                                    onValueChange={(value) => setEditForm({ ...editForm, division: value })}
                                >
                                    <SelectTrigger className="mt-1">
                                        <SelectValue placeholder="Select division" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {DIVISIONS.map((div) => (
                                            <SelectItem key={div} value={div}>{div}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            ) : (
                                <p className="text-gray-900 mt-1">{member.division || '-'}</p>
                            )}
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Source</label>
                            <p className="text-gray-900 mt-1">
                                {member.isSeeded ? 'Imported from CSV' : 'Membership Application'}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="w-5 h-5" />
                            Contact Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Head of Organization */}
                        <div className="border-b pb-4">
                            <h4 className="font-medium text-gray-900 mb-3">Head of Organization</h4>
                            <div className="space-y-3">
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Name</label>
                                    {isEditing ? (
                                        <Input
                                            value={editForm.headName || ''}
                                            onChange={(e) => setEditForm({ ...editForm, headName: e.target.value })}
                                            className="mt-1"
                                        />
                                    ) : (
                                        <p className="text-gray-900 mt-1">{member.headName || '-'}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Designation</label>
                                    {isEditing ? (
                                        <Input
                                            value={editForm.headDesignation || ''}
                                            onChange={(e) => setEditForm({ ...editForm, headDesignation: e.target.value })}
                                            className="mt-1"
                                        />
                                    ) : (
                                        <p className="text-gray-900 mt-1">{member.headDesignation || '-'}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Email</label>
                                    {isEditing ? (
                                        <Input
                                            type="email"
                                            value={editForm.headEmail || ''}
                                            onChange={(e) => setEditForm({ ...editForm, headEmail: e.target.value })}
                                            className="mt-1"
                                        />
                                    ) : (
                                        <p className="text-gray-900 mt-1">{member.headEmail || '-'}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Focal Person */}
                        <div>
                            <h4 className="font-medium text-gray-900 mb-3">ECD Focal Person</h4>
                            <div className="space-y-3">
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Name</label>
                                    {isEditing ? (
                                        <Input
                                            value={editForm.focalName || ''}
                                            onChange={(e) => setEditForm({ ...editForm, focalName: e.target.value })}
                                            className="mt-1"
                                        />
                                    ) : (
                                        <p className="text-gray-900 mt-1">{member.focalName || '-'}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Designation</label>
                                    {isEditing ? (
                                        <Input
                                            value={editForm.focalDesignation || ''}
                                            onChange={(e) => setEditForm({ ...editForm, focalDesignation: e.target.value })}
                                            className="mt-1"
                                        />
                                    ) : (
                                        <p className="text-gray-900 mt-1">{member.focalDesignation || '-'}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Email *</label>
                                    {isEditing ? (
                                        <Input
                                            type="email"
                                            value={editForm.focalEmail || ''}
                                            onChange={(e) => setEditForm({ ...editForm, focalEmail: e.target.value })}
                                            className="mt-1"
                                            required
                                        />
                                    ) : (
                                        <p className="text-gray-900 mt-1">{member.focalEmail}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Portal Access Status */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Mail className="w-5 h-5" />
                            Portal Access Status
                        </CardTitle>
                        <CardDescription>
                            Member portal login credentials and status
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {member.hasPortalAccess ? (
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-green-600">
                                    <CheckCircle className="w-5 h-5" />
                                    <span className="font-medium">Portal access has been granted</span>
                                </div>
                                {member.username && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Username</label>
                                        <p className="text-gray-900 font-mono">{member.username}</p>
                                    </div>
                                )}
                                {member.portalAccessSentAt && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Access Sent At</label>
                                        <p className="text-gray-900">
                                            {new Date(member.portalAccessSentAt).toLocaleString()}
                                        </p>
                                    </div>
                                )}
                                {member.lastLogin && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Last Login</label>
                                        <p className="text-gray-900">
                                            {new Date(member.lastLogin).toLocaleString()}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-gray-500">
                                    <AlertCircle className="w-5 h-5" />
                                    <span>No portal access granted yet</span>
                                </div>
                                <Button onClick={() => setShowSendDialog(true)}>
                                    <Mail className="w-4 h-4 mr-2" />
                                    Send Portal Access Email
                                </Button>
                                <p className="text-sm text-gray-500">
                                    This will generate login credentials and send them to {member.focalEmail}
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Send Access Dialog */}
            <Dialog open={showSendDialog} onOpenChange={setShowSendDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Send Portal Access</DialogTitle>
                        <DialogDescription>
                            This will generate a username and temporary password for this member and send it to their focal person email.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-4">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
                            <p className="font-medium text-blue-900">{member.organization}</p>
                            <p className="text-sm text-blue-700">
                                Credentials will be sent to: <strong>{member.focalEmail}</strong>
                            </p>
                        </div>

                        {sendResult && (
                            <div className={`mt-4 p-4 rounded-lg ${sendResult.success
                                ? 'bg-green-50 border border-green-200 text-green-800'
                                : 'bg-red-50 border border-red-200 text-red-800'
                                }`}>
                                {sendResult.success ? (
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5" />
                                        {sendResult.message}
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <AlertCircle className="w-5 h-5" />
                                        {sendResult.message}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setShowSendDialog(false);
                                setSendResult(null);
                                router.push(`/admin/members/${memberId}`);
                            }}
                        >
                            {sendResult?.success ? 'Close' : 'Cancel'}
                        </Button>
                        {!sendResult?.success && (
                            <Button onClick={handleSendAccess} disabled={isSending}>
                                {isSending ? (
                                    <>
                                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4 mr-2" />
                                        Send Credentials
                                    </>
                                )}
                            </Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Member</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this member? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-4">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-2">
                            <p className="font-medium text-red-900">{member.organization}</p>
                            <p className="text-sm text-red-700">
                                All information associated with this member will be permanently deleted.
                            </p>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setShowDeleteDialog(false)}
                            disabled={isDeleting}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDeleteMember}
                            disabled={isDeleting}
                        >
                            {isDeleting ? (
                                <>
                                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                    Deleting...
                                </>
                            ) : (
                                <>
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete Member
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
