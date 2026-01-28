'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Search,
    ChevronLeft,
    ChevronRight,
    Loader2,
    Building,
    MapPin,
    Mail,
    User
} from 'lucide-react';

interface Member {
    _id: string;
    organization: string;
    address: string;
    headName: string;
    headDesignation: string;
    headEmail: string;
    focalName: string;
    focalDesignation: string;
    focalEmail: string;
    division: string;
}

const divisions = [
    'All Divisions',
    'Barishal Division',
    'Chattogram Division',
    'Dhaka Division',
    'Khulna Division',
    'Mymensingh Division',
    'Rajshahi Division',
    'Rangpur Division',
    'Sylhet Division',
];

export default function MembersPage() {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState('');
    const [division, setDivision] = useState('');
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        fetchMembers();
    }, [page, search, division]);

    const fetchMembers = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                limit: '20',
            });
            if (search) params.set('search', search);
            if (division) params.set('division', division);

            const res = await fetch(`/api/members?${params}`);
            const data = await res.json();

            if (data.success) {
                setMembers(data.members);
                setTotalPages(data.pagination.pages);
                setTotal(data.pagination.total);
            }
        } catch (error) {
            console.error('Error fetching members:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setSearch(searchInput);
        setPage(1);
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Members</h1>
                <p className="text-gray-600 mt-1">View and manage network members</p>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <form onSubmit={handleSearch} className="flex gap-2 flex-1">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search organizations..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <Button type="submit">Search</Button>
                </form>

                <select
                    value={division}
                    onChange={(e) => { setDivision(e.target.value); setPage(1); }}
                    className="px-4 py-2 border rounded-md bg-white"
                >
                    {divisions.map((div) => (
                        <option key={div} value={div === 'All Divisions' ? '' : div}>
                            {div}
                        </option>
                    ))}
                </select>
            </div>

            {/* Results count */}
            <p className="text-sm text-gray-600 mb-4">
                Showing {members.length} of {total} members
            </p>

            {/* Members grid */}
            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : members.length === 0 ? (
                <Card>
                    <CardContent className="py-12 text-center">
                        <p className="text-gray-500">No members found</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {members.map((member) => (
                        <Card key={member._id} className="hover:shadow-md transition-shadow">
                            <CardContent className="py-4">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <Building className="h-5 w-5 text-primary" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-gray-900 truncate">{member.organization}</h3>

                                        {member.division && (
                                            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                                <MapPin className="h-3 w-3" />
                                                {member.division}
                                            </p>
                                        )}

                                        {member.address && (
                                            <p className="text-xs text-gray-400 mt-1 line-clamp-2">{member.address}</p>
                                        )}

                                        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                                            {member.headName && (
                                                <div className="flex items-start gap-1">
                                                    <User className="h-3 w-3 text-gray-400 mt-0.5" />
                                                    <div>
                                                        <p className="font-medium">{member.headName}</p>
                                                        <p className="text-gray-500">{member.headDesignation || 'Head'}</p>
                                                    </div>
                                                </div>
                                            )}
                                            {member.focalName && (
                                                <div className="flex items-start gap-1">
                                                    <User className="h-3 w-3 text-gray-400 mt-0.5" />
                                                    <div>
                                                        <p className="font-medium">{member.focalName}</p>
                                                        <p className="text-gray-500">{member.focalDesignation || 'ECD Focal'}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {(member.headEmail || member.focalEmail) && (
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {member.headEmail && (
                                                    <a
                                                        href={`mailto:${member.headEmail}`}
                                                        className="text-xs text-primary hover:underline flex items-center gap-1"
                                                    >
                                                        <Mail className="h-3 w-3" />
                                                        {member.headEmail}
                                                    </a>
                                                )}
                                            </div>
                                        )}
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
