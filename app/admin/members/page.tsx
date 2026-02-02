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
import { Eye, Search, RefreshCw, Users, Mail, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface Member {
    _id: string;
    organization: string;
    division?: string;
    focalName?: string;
    focalEmail: string;
    hasPortalAccess: boolean;
    isSeeded: boolean;
    createdAt: string;
}

interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export default function MembersPage() {
    const [members, setMembers] = useState<Member[]>([]);
    const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 50, total: 0, totalPages: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [accessFilter, setAccessFilter] = useState<string>('all');
    const [divisionFilter, setDivisionFilter] = useState<string>('all');

    const fetchMembers = async (page = 1) => {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/admin/members?page=${page}&limit=50`);
            const data = await response.json();
            if (response.ok) {
                setMembers(data.members || []);
                setPagination(data.pagination || { page: 1, limit: 50, total: 0, totalPages: 0 });
            }
        } catch (error) {
            console.error('Failed to fetch members:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    // Get unique divisions for filter
    const divisions = [...new Set(members.map(m => m.division).filter(Boolean))].sort();

    const filteredMembers = members.filter((member) => {
        const matchesSearch = member.organization
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
            member.focalEmail.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesAccess = accessFilter === 'all' ||
            (accessFilter === 'yes' && member.hasPortalAccess) ||
            (accessFilter === 'no' && !member.hasPortalAccess);

        const matchesDivision = divisionFilter === 'all' || member.division === divisionFilter;

        return matchesSearch && matchesAccess && matchesDivision;
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Members</h1>
                    <p className="text-gray-600">Manage all network members</p>
                </div>
                <Button
                    variant="outline"
                    onClick={() => fetchMembers(pagination.page)}
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
                            <CardTitle>All Members</CardTitle>
                            <CardDescription>
                                {searchTerm || accessFilter !== 'all' || divisionFilter !== 'all'
                                    ? `${filteredMembers.length} of ${pagination.total} member(s) shown`
                                    : `${pagination.total} member(s) total (showing ${members.length} on page ${pagination.page})`}
                            </CardDescription>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input
                                    placeholder="Search members..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 w-full sm:w-64"
                                />
                            </div>
                            <Select value={divisionFilter} onValueChange={setDivisionFilter}>
                                <SelectTrigger className="w-full sm:w-44">
                                    <SelectValue placeholder="Filter by division" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Divisions</SelectItem>
                                    {divisions.map((div) => (
                                        <SelectItem key={div} value={div!}>{div}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select value={accessFilter} onValueChange={setAccessFilter}>
                                <SelectTrigger className="w-full sm:w-44">
                                    <SelectValue placeholder="Portal access" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Access Status</SelectItem>
                                    <SelectItem value="yes">Has Access</SelectItem>
                                    <SelectItem value="no">No Access</SelectItem>
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
                    ) : filteredMembers.length === 0 ? (
                        <div className="text-center py-12">
                            <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900">No members found</h3>
                            <p className="text-gray-500 mt-1">
                                {searchTerm || accessFilter !== 'all' || divisionFilter !== 'all'
                                    ? 'Try adjusting your filters'
                                    : 'Members will appear here when added'}
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Organization</TableHead>
                                        <TableHead>Division</TableHead>
                                        <TableHead>Focal Person</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Portal Access</TableHead>
                                        <TableHead>Source</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredMembers.map((member) => (
                                        <TableRow key={member._id}>
                                            <TableCell className="font-medium max-w-[200px] truncate">
                                                {member.organization}
                                            </TableCell>
                                            <TableCell>
                                                {member.division || '-'}
                                            </TableCell>
                                            <TableCell>
                                                {member.focalName || '-'}
                                            </TableCell>
                                            <TableCell>
                                                {member.focalEmail}
                                            </TableCell>
                                            <TableCell>
                                                {member.hasPortalAccess ? (
                                                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                                        <CheckCircle className="w-3 h-3 mr-1" />
                                                        Yes
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="outline" className="text-gray-500">
                                                        No
                                                    </Badge>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">
                                                    {member.isSeeded ? 'CSV Import' : 'Application'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link href={`/admin/members/${member._id}`}>
                                                        <Button variant="ghost" size="sm">
                                                            <Eye className="w-4 h-4 mr-1" />
                                                            View
                                                        </Button>
                                                    </Link>
                                                    {!member.hasPortalAccess && (
                                                        <Link href={`/admin/members/${member._id}?action=send-access`}>
                                                            <Button variant="outline" size="sm">
                                                                <Mail className="w-4 h-4 mr-1" />
                                                                Send Access
                                                            </Button>
                                                        </Link>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}

                    {/* Pagination Controls */}
                    {pagination.totalPages > 1 && (
                        <div className="flex items-center justify-between pt-4 border-t mt-4">
                            <p className="text-sm text-gray-600">
                                Page {pagination.page} of {pagination.totalPages}
                            </p>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => fetchMembers(pagination.page - 1)}
                                    disabled={pagination.page <= 1 || isLoading}
                                >
                                    <ChevronLeft className="w-4 h-4 mr-1" />
                                    Previous
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => fetchMembers(pagination.page + 1)}
                                    disabled={pagination.page >= pagination.totalPages || isLoading}
                                >
                                    Next
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

