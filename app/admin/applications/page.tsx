'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Eye,
    CheckCircle,
    XCircle,
    Clock,
    Search,
    ChevronLeft,
    ChevronRight,
    Loader2
} from 'lucide-react';

interface Application {
    _id: string;
    organizationName: string;
    organizationType: string;
    status: 'pending' | 'approved' | 'rejected';
    submittedAt: string;
    sectionF: {
        name: string;
        email: string;
    };
}

export default function ApplicationsPage() {
    const searchParams = useSearchParams();
    const statusFilter = searchParams.get('status') || '';

    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [activeStatus, setActiveStatus] = useState(statusFilter);

    useEffect(() => {
        fetchApplications();
    }, [page, activeStatus]);

    const fetchApplications = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                limit: '10',
            });
            if (activeStatus) {
                params.set('status', activeStatus);
            }

            const res = await fetch(`/api/membership/apply?${params}`);
            const data = await res.json();

            if (data.success) {
                setApplications(data.applications);
                setTotalPages(data.pagination.pages);
                setTotal(data.pagination.total);
            }
        } catch (error) {
            console.error('Error fetching applications:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status: string) => {
        const styles = {
            pending: 'bg-yellow-100 text-yellow-800',
            approved: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800',
        };
        const icons = {
            pending: <Clock className="h-3 w-3" />,
            approved: <CheckCircle className="h-3 w-3" />,
            rejected: <XCircle className="h-3 w-3" />,
        };

        return (
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
                {icons[status as keyof typeof icons]}
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Membership Applications</h1>
                <p className="text-gray-600 mt-1">Review and manage membership applications</p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex gap-2">
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
                        <Clock className="h-4 w-4 mr-1" />
                        Pending
                    </Button>
                    <Button
                        variant={activeStatus === 'approved' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => { setActiveStatus('approved'); setPage(1); }}
                    >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approved
                    </Button>
                    <Button
                        variant={activeStatus === 'rejected' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => { setActiveStatus('rejected'); setPage(1); }}
                    >
                        <XCircle className="h-4 w-4 mr-1" />
                        Rejected
                    </Button>
                </div>
            </div>

            {/* Results count */}
            <p className="text-sm text-gray-600 mb-4">
                Showing {applications.length} of {total} applications
            </p>

            {/* Applications list */}
            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : applications.length === 0 ? (
                <Card>
                    <CardContent className="py-12 text-center">
                        <p className="text-gray-500">No applications found</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {applications.map((app) => (
                        <Card key={app._id} className="hover:shadow-md transition-shadow">
                            <CardContent className="py-4">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-start gap-3">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{app.organizationName}</h3>
                                                <p className="text-sm text-gray-600">{app.organizationType}</p>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    Submitted by: {app.sectionF?.name || 'N/A'} ({app.sectionF?.email || 'N/A'})
                                                </p>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    {new Date(app.submittedAt).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {getStatusBadge(app.status)}
                                        <Link href={`/admin/applications/${app._id}`}>
                                            <Button size="sm" variant="outline">
                                                <Eye className="h-4 w-4 mr-1" />
                                                View
                                            </Button>
                                        </Link>
                                    </div>
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
