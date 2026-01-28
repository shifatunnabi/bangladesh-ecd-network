'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
    Clock,
    CheckCircle,
    Loader2,
    ChevronLeft,
    ChevronRight,
    User,
    Mail,
    Phone,
    Building,
    MessageSquare
} from 'lucide-react';

interface UpdateRequest {
    _id: string;
    name: string;
    email: string;
    phone: string;
    organization: string;
    requestedChanges: string;
    status: 'pending' | 'in-progress' | 'resolved';
    adminNotes?: string;
    createdAt: string;
    resolvedAt?: string;
}

export default function UpdateRequestsPage() {
    const [requests, setRequests] = useState<UpdateRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [activeStatus, setActiveStatus] = useState('');
    const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
    const [adminNotes, setAdminNotes] = useState('');
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        fetchRequests();
    }, [page, activeStatus]);

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                limit: '10',
            });
            if (activeStatus) {
                params.set('status', activeStatus);
            }

            const res = await fetch(`/api/update-requests?${params}`);
            const data = await res.json();

            if (data.success) {
                setRequests(data.requests);
                setTotalPages(data.pagination.pages);
                setTotal(data.pagination.total);
            }
        } catch (error) {
            console.error('Error fetching requests:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id: string, newStatus: string) => {
        setActionLoading(true);
        try {
            const res = await fetch(`/api/update-requests/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus, adminNotes }),
            });

            const data = await res.json();
            if (data.success) {
                fetchRequests();
                setSelectedRequest(null);
                setAdminNotes('');
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

    const getStatusBadge = (status: string) => {
        const styles = {
            pending: 'bg-yellow-100 text-yellow-800',
            'in-progress': 'bg-blue-100 text-blue-800',
            resolved: 'bg-green-100 text-green-800',
        };

        return (
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
                {status === 'pending' && <Clock className="h-3 w-3" />}
                {status === 'in-progress' && <Loader2 className="h-3 w-3" />}
                {status === 'resolved' && <CheckCircle className="h-3 w-3" />}
                {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
            </span>
        );
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Update Requests</h1>
                <p className="text-gray-600 mt-1">Manage member update requests</p>
            </div>

            {/* Filters */}
            <div className="flex gap-2 mb-6">
                <Button
                    variant={activeStatus === '' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => { setActiveStatus(''); setPage(1); }}
                >
                    All
                </Button>
                <Button
                    variant={activeStatus === 'pending' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => { setActiveStatus('pending'); setPage(1); }}
                >
                    Pending
                </Button>
                <Button
                    variant={activeStatus === 'in-progress' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => { setActiveStatus('in-progress'); setPage(1); }}
                >
                    In Progress
                </Button>
                <Button
                    variant={activeStatus === 'resolved' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => { setActiveStatus('resolved'); setPage(1); }}
                >
                    Resolved
                </Button>
            </div>

            {/* Results count */}
            <p className="text-sm text-gray-600 mb-4">
                Showing {requests.length} of {total} requests
            </p>

            {/* Requests list */}
            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : requests.length === 0 ? (
                <Card>
                    <CardContent className="py-12 text-center">
                        <p className="text-gray-500">No update requests found</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {requests.map((req) => (
                        <Card key={req._id} className="hover:shadow-md transition-shadow">
                            <CardContent className="py-4">
                                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3">
                                            {getStatusBadge(req.status)}
                                            <span className="text-xs text-gray-500">
                                                {new Date(req.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <div className="flex items-center gap-2">
                                                <User className="h-4 w-4 text-gray-400" />
                                                <span className="text-sm font-medium">{req.name}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Building className="h-4 w-4 text-gray-400" />
                                                <span className="text-sm">{req.organization}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Mail className="h-4 w-4 text-gray-400" />
                                                <a href={`mailto:${req.email}`} className="text-sm text-primary hover:underline">
                                                    {req.email}
                                                </a>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Phone className="h-4 w-4 text-gray-400" />
                                                <a href={`tel:${req.phone}`} className="text-sm text-primary hover:underline">
                                                    {req.phone}
                                                </a>
                                            </div>
                                        </div>

                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <div className="flex items-start gap-2">
                                                <MessageSquare className="h-4 w-4 text-gray-400 mt-0.5" />
                                                <div>
                                                    <p className="text-xs text-gray-500 mb-1">Requested Changes:</p>
                                                    <p className="text-sm whitespace-pre-wrap">{req.requestedChanges}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {req.adminNotes && (
                                            <div className="bg-blue-50 p-3 rounded-lg mt-2">
                                                <p className="text-xs text-blue-600 mb-1">Admin Notes:</p>
                                                <p className="text-sm">{req.adminNotes}</p>
                                            </div>
                                        )}
                                    </div>

                                    {req.status !== 'resolved' && (
                                        <div className="flex flex-col gap-2">
                                            {selectedRequest === req._id ? (
                                                <div className="space-y-2 min-w-[200px]">
                                                    <Textarea
                                                        placeholder="Add notes (optional)"
                                                        value={adminNotes}
                                                        onChange={(e) => setAdminNotes(e.target.value)}
                                                        className="text-sm"
                                                        rows={2}
                                                    />
                                                    <div className="flex gap-2">
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => setSelectedRequest(null)}
                                                        >
                                                            Cancel
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            onClick={() => handleStatusUpdate(req._id, 'resolved')}
                                                            disabled={actionLoading}
                                                        >
                                                            {actionLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Resolve'}
                                                        </Button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    {req.status === 'pending' && (
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => handleStatusUpdate(req._id, 'in-progress')}
                                                        >
                                                            Mark In Progress
                                                        </Button>
                                                    )}
                                                    <Button
                                                        size="sm"
                                                        onClick={() => setSelectedRequest(req._id)}
                                                    >
                                                        Mark Resolved
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-6">
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm text-gray-600">
                        Page {page} of {totalPages}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            )}
        </div>
    );
}
