'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Eye, Search, RefreshCw, FileText } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

interface Application {
    _id: string;
    status: 'pending' | 'approved' | 'rejected';
    submittedAt: string;
    formData: {
        sectionA: {
            organizationName: string;
            focalPersonECD?: {
                email?: string;
            };
            headOfficeAddress?: {
                division?: string;
            };
        };
    };
}

export default function ApplicationsPage() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    const fetchApplications = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/admin/applications');
            const data = await response.json();
            if (response.ok) {
                setApplications(data.applications || []);
            }
        } catch (error) {
            console.error('Failed to fetch applications:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending':
                return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
            case 'approved':
                return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>;
            case 'rejected':
                return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rejected</Badge>;
            default:
                return <Badge>{status}</Badge>;
        }
    };

    const filteredApplications = applications.filter((app) => {
        const matchesSearch = app.formData.sectionA.organizationName
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Membership Applications</h1>
                    <p className="text-gray-600">Review and manage membership applications</p>
                </div>
                <Button
                    variant="outline"
                    onClick={fetchApplications}
                    disabled={isLoading}
                >
                    <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                    Refresh
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <CardTitle>Applications</CardTitle>
                            <CardDescription>
                                {filteredApplications.length} application(s) found
                            </CardDescription>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input
                                    placeholder="Search organizations..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 w-full sm:w-64"
                                />
                            </div>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-full sm:w-40">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="approved">Approved</SelectItem>
                                    <SelectItem value="rejected">Rejected</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <RefreshCw className="w-6 h-6 animate-spin text-gray-400" />
                        </div>
                    ) : filteredApplications.length === 0 ? (
                        <div className="text-center py-12">
                            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900">No applications found</h3>
                            <p className="text-gray-500 mt-1">
                                {searchTerm || statusFilter !== 'all'
                                    ? 'Try adjusting your filters'
                                    : 'Applications will appear here when submitted'}
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Organization</TableHead>
                                        <TableHead>Division</TableHead>
                                        <TableHead>Focal Email</TableHead>
                                        <TableHead>Submitted</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredApplications.map((app) => (
                                        <TableRow key={app._id}>
                                            <TableCell className="font-medium">
                                                {app.formData.sectionA.organizationName}
                                            </TableCell>
                                            <TableCell>
                                                {app.formData.sectionA.headOfficeAddress?.division || '-'}
                                            </TableCell>
                                            <TableCell>
                                                {app.formData.sectionA.focalPersonECD?.email || '-'}
                                            </TableCell>
                                            <TableCell>
                                                {format(new Date(app.submittedAt), 'MMM d, yyyy')}
                                            </TableCell>
                                            <TableCell>
                                                {getStatusBadge(app.status)}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Link href={`/admin/applications/${app._id}`}>
                                                    <Button variant="ghost" size="sm">
                                                        <Eye className="w-4 h-4 mr-1" />
                                                        View
                                                    </Button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
